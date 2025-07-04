
"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { MessageSquare, RefreshCw, Loader2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { useChild } from "@/contexts/child-context"
import { sendDeviceCommand } from "@/ai/flows/device-commands"
import { NoDeviceConnected } from "@/components/no-device-connected"

const messageSchema = z.object({
  recipient: z.string().min(1, { message: "Recipient phone number is required." }),
  message: z.string().min(1, { message: "Message cannot be empty." }),
})

export default function SmsMessagesPage() {
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const { toast } = useToast()
  const { selectedChild, isSwitching } = useChild()

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      recipient: "",
      message: "",
    },
  })

  const fetchMessages = React.useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1200)
  }, [])

  React.useEffect(() => {
    if (selectedChild) {
      fetchMessages()
    }
  }, [selectedChild, fetchMessages])
  
  if (isSwitching) {
    return <div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  if (!selectedChild) {
    return <NoDeviceConnected />;
  }

  async function onSubmit(values: z.infer<typeof messageSchema>) {
    if (!selectedChild) return;

    try {
      const result = await sendDeviceCommand({
        childId: selectedChild.id,
        command: 'sendSms',
        payload: {
          recipient: values.recipient,
          message: values.message,
        },
      });

      if (result.success) {
        toast({
          title: 'Command Sent',
          description: result.message,
        });
        form.reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: 'Error Sending Message',
        description: `Could not send command: ${error instanceof Error ? error.message : "Please try again."}`,
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      <header className="p-6 md:p-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{selectedChild.name}'s SMS Messages</h1>
                    <p className="text-muted-foreground">Read messages and issue commands to send new ones.</p>
                </div>
            </div>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8 p-6 pt-0">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Message History</h2>
            <Button variant="outline" onClick={fetchMessages} disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <Card className="h-[600px] flex flex-col">
            <CardContent className="p-0 flex-1">
              {isRefreshing ? (
                 <div className="flex flex-col items-center justify-center h-full">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Loading messages...</p>
                 </div>
              ) : (
                <ScrollArea className="h-full">
                   <div className="p-6 space-y-4">
                     {selectedChild.smsMessages.map((msg) => (
                       <div key={msg.id} className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>{msg.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-muted/50 p-3 rounded-lg">
                              <div className="flex items-baseline justify-between">
                                <p className="font-semibold">{msg.sender}</p>
                                <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{msg.content}</p>
                          </div>
                       </div>
                     ))}
                   </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Send New Message</h2>
            <Card>
                <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="recipient"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Recipient Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., 555-0103" {...field} disabled={form.formState.isSubmitting}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Type your message here..."
                                className="resize-none h-32"
                                {...field}
                                disabled={form.formState.isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                            Send Message Command
                        </Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  )
}
