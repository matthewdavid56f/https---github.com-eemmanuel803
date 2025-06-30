
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { PlusCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useChild } from "@/contexts/child-context"
import { pairNewDevice } from "@/lib/data"

const pairDeviceSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name cannot be longer than 50 characters."}),
})

export default function PairDevicePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addNewChild } = useChild()

  const form = useForm<z.infer<typeof pairDeviceSchema>>({
    resolver: zodResolver(pairDeviceSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof pairDeviceSchema>) {
    try {
      const newChild = await pairNewDevice(values.name)
      if (newChild) {
        addNewChild(newChild)
        toast({
          title: "Device Paired Successfully",
          description: `${values.name}'s device is now being monitored.`,
        })
        router.push("/dashboard")
      } else {
        throw new Error("Failed to get new child data back from the service.")
      }
    } catch (error) {
      toast({
        title: "Pairing Failed",
        description: `Could not pair device: ${error instanceof Error ? error.message : "Please try again."}`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-1 flex-col h-full p-6 md:p-8">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
            <PlusCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Pair a New Device</h1>
            <p className="text-muted-foreground">Follow the steps to connect a new child device to your account.</p>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Enter Device Details</CardTitle>
            <CardDescription>
              In a real application, you would scan a QR code from the child's app. For now, just provide a name for the child.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Child's Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Alex, Chloe..." {...field} disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                  Pair Device
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
