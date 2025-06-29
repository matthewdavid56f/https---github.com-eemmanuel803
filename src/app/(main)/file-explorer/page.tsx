
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { useToast } from "@/hooks/use-toast"
import { Folder as FolderIcon, File as FileIcon, FileImage, FileVideo, FileText, Music, ArrowLeft, RefreshCw, Download } from "lucide-react"

type FileSystemItem = {
  name: string
  type: 'folder' | 'file'
  fileType?: 'image' | 'video' | 'audio' | 'document' | 'other'
  size?: string
  modified?: string
  thumbnail?: string
  hint?: string
}

const mockFileSystem: Record<string, FileSystemItem[]> = {
  '/': [
    { name: 'DCIM', type: 'folder' },
    { name: 'Download', type: 'folder' },
    { name: 'Pictures', type: 'folder' },
    { name: 'Music', type: 'folder' },
    { name: 'Documents', type: 'folder' },
  ],
  '/DCIM': [
    { name: 'Camera', type: 'folder' },
  ],
  '/DCIM/Camera': [
    { name: 'IMG_20240520.jpg', type: 'file', fileType: 'image', size: '4.5 MB', modified: '2024-05-20 10:30', thumbnail: 'https://placehold.co/40x40.png', hint: 'beach sunset' },
    { name: 'IMG_20240521.jpg', type: 'file', fileType: 'image', size: '5.1 MB', modified: '2024-05-21 11:45', thumbnail: 'https://placehold.co/40x40.png', hint: 'family portrait' },
    { name: 'VID_20240522.mp4', type: 'file', fileType: 'video', size: '55.2 MB', modified: '2024-05-22 15:20' },
  ],
  '/Download': [
    { name: 'homework.pdf', type: 'file', fileType: 'document', size: '1.2 MB', modified: '2024-05-15 09:00' },
    { name: 'song.mp3', type: 'file', fileType: 'audio', size: '3.8 MB', modified: '2024-05-14 18:00' },
    { name: 'archive.zip', type: 'file', fileType: 'other', size: '12.3 MB', modified: '2024-05-18 20:00' },
  ],
  '/Pictures': [
      { name: 'Screenshots', type: 'folder' },
      { name: 'vacation.jpg', type: 'file', fileType: 'image', size: '3.2 MB', modified: '2024-05-01 14:00', thumbnail: 'https://placehold.co/40x40.png', hint: 'mountain landscape' },
  ],
  '/Pictures/Screenshots': [
      { name: 'Screenshot_20240519.png', type: 'file', fileType: 'image', size: '1.8 MB', modified: '2024-05-19 12:00', thumbnail: 'https://placehold.co/40x40.png', hint: 'app interface' },
  ],
   '/Music': [
    { name: 'lofi-beats.mp3', type: 'file', fileType: 'audio', size: '4.1 MB', modified: '2024-05-10 11:00' },
    { name: 'rock-anthem.wav', type: 'file', fileType: 'audio', size: '10.5 MB', modified: '2024-05-11 12:00' },
  ],
  '/Documents': [
    { name: 'School Project.docx', type: 'file', fileType: 'document', size: '256 KB', modified: '2024-05-17 19:30'},
    { name: 'Book Report.txt', type: 'file', fileType: 'document', size: '12 KB', modified: '2024-05-16 14:00'},
  ]
}

const getFileIcon = (item: FileSystemItem) => {
    if (item.type === 'folder') {
        return <FolderIcon className="w-6 h-6 text-primary" />;
    }
    switch (item.fileType) {
        case 'image': return <FileImage className="w-6 h-6 text-green-500" />;
        case 'video': return <FileVideo className="w-6 h-6 text-purple-500" />;
        case 'audio': return <Music className="w-6 h-6 text-pink-500" />;
        case 'document': return <FileText className="w-6 h-6 text-blue-500" />;
        default: return <FileIcon className="w-6 h-6 text-muted-foreground" />;
    }
}


export default function FileExplorerPage() {
  const { toast } = useToast()
  const [currentPath, setCurrentPath] = React.useState('/')
  const [history, setHistory] = React.useState<string[]>(['/'])

  const handleItemClick = (item: FileSystemItem) => {
    if (item.type === 'folder') {
      const newPath = (currentPath === '/' ? '' : currentPath) + '/' + item.name
      setHistory([...history, newPath])
      setCurrentPath(newPath)
    } else {
      // Potentially open a preview modal in the future
      toast({ title: "File Clicked", description: `You clicked on ${item.name}` })
    }
  }

  const handleBackClick = () => {
    if (history.length > 1) {
      const newHistory = [...history]
      newHistory.pop()
      const newPath = newHistory[newHistory.length - 1]
      setHistory(newHistory)
      setCurrentPath(newPath)
    }
  }
  
  const handleDownload = (itemName: string) => {
      toast({ title: "Command Sent", description: `Downloading ${itemName}...` })
  }

  const currentItems = mockFileSystem[currentPath] || []

  return (
    <div className="flex flex-1 flex-col h-full">
      <header className="p-6 md:p-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
                    <FolderIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">File Explorer</h1>
                    <p className="text-muted-foreground">Browse files and folders on the device.</p>
                </div>
            </div>
            <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
        </div>
      </header>

      <main className="flex-1 px-6 pb-6">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={handleBackClick} disabled={history.length <= 1}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="bg-muted px-3 py-2 rounded-md text-sm text-muted-foreground font-mono flex-1">
                        {currentPath}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60%]">Name</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Last Modified</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems.map((item) => (
                            <TableRow key={item.name} onClick={() => handleItemClick(item)} className={item.type === 'folder' ? 'cursor-pointer' : ''}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        {item.fileType === 'image' && item.thumbnail ? (
                                            <Avatar className="rounded-md">
                                                <AvatarImage src={item.thumbnail} alt={item.name} data-ai-hint={item.hint}/>
                                                <AvatarFallback className="rounded-md">{getFileIcon(item)}</AvatarFallback>
                                            </Avatar>
                                        ) : (
                                            <div className="w-10 h-10 flex items-center justify-center">
                                                {getFileIcon(item)}
                                            </div>
                                        )}
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{item.size || '—'}</TableCell>
                                <TableCell className="text-muted-foreground">{item.modified || '—'}</TableCell>
                                <TableCell className="text-right">
                                     {item.type === 'file' && (
                                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleDownload(item.name) }}>
                                            <Download className="mr-2 h-4 w-4" /> Download
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {currentItems.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <FolderIcon className="mx-auto h-12 w-12" />
                        <p className="mt-4">This folder is empty.</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </main>
    </div>
  )
}
