
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Users, RefreshCw, Phone, MessageSquare, Search } from "lucide-react"

type Contact = {
  name: string
  phone: string
  avatar: string
  avatarImage?: string
}

const mockContacts: Contact[] = [
  { name: 'Mom', phone: '555-0101', avatar: 'M', avatarImage: 'https://placehold.co/40x40.png' },
  { name: 'Dad', phone: '555-0102', avatar: 'D', avatarImage: 'https://placehold.co/40x40.png' },
  { name: 'Alex Johnson', phone: '555-0103', avatar: 'A', avatarImage: 'https://placehold.co/40x40.png' },
  { name: 'Dr. Smith (Pediatrician)', phone: '555-0104', avatar: 'DS' },
  { name: 'Grandma', phone: '555-0105', avatar: 'G' },
  { name: 'Coach Miller', phone: '555-0106', avatar: 'CM' },
  { name: 'Pizza Palace', phone: '555-0199', avatar: 'PP' },
  { name: 'Emily Carter', phone: '555-0107', avatar: 'EC' },
  { name: 'David Lee', phone: '555-0108', avatar: 'DL' },
]

export default function ContactsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = React.useState("")

  const handleAction = (message: string) => {
    toast({
      title: "Action Simulated",
      description: message,
    })
  }
  
  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  )

  return (
    <div className="flex flex-1 flex-col h-full">
      <header className="p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Contacts</h1>
            <p className="text-muted-foreground">View and manage the device's contacts.</p>
          </div>
        </div>
      </header>
      <main className="flex-1 px-6 pb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Contacts
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[350px]">Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.phone}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          {contact.avatarImage && <AvatarImage src={contact.avatarImage} alt={contact.name} data-ai-hint="person avatar" />}
                          <AvatarFallback>{contact.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{contact.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{contact.phone}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleAction(`Simulating call to ${contact.name}`)}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction(`Simulating opening SMS to ${contact.name}`)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
