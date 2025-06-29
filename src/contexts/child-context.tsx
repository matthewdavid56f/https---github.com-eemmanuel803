
"use client"

import * as React from 'react';
import { ShieldAlert, FileImage, Smartphone, ClipboardCopy, Globe, Youtube, Instagram, Gamepad2, Music, Shield, Home, School } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Activity } from "@/components/activity-feed";
import type { ScreenTimeData } from "@/components/screen-time-chart";

// Types for all mock data
export type Contact = {
  name: string;
  phone: string;
  avatar: string;
  avatarImage?: string;
};

export type CallLog = {
  id: string;
  name: string;
  number: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration: string;
  time: string;
};

export type SmsMessage = {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
};

export type App = {
  name: string;
  icon: React.ReactNode;
  version: string;
  packageName: string;
};

export type FileSystemItem = {
  name: string;
  type: 'folder' | 'file';
  fileType?: 'image' | 'video' | 'audio' | 'document' | 'other';
  size?: string;
  modified?: string;
  thumbnail?: string;
  hint?: string;
};

export type FileSystem = Record<string, FileSystemItem[]>;

export type LocationData = {
  address: string;
  coordinates: string;
  lastUpdated: string;
  mapImage: string;
};

export type Geofence = {
  name: string;
  address: string;
  icon: React.ReactNode;
  isInside: boolean;
};

export type Child = {
  id: string;
  name: string;
  avatar: string;
  deviceName: string;
  isOnline: boolean;
  batteryLevel: number;
  metrics: {
    alerts: string;
    alertsDescription: string;
    screenTime: string;
    screenTimeDescription: string;
    appsChecked: string;
    appsCheckedDescription: string;
  };
  activities: Activity[];
  screenTimeData: ScreenTimeData;
  contacts: Contact[];
  callLogs: CallLog[];
  smsMessages: SmsMessage[];
  installedApps: App[];
  fileSystem: FileSystem;
  location: LocationData;
  geofences: Geofence[];
};

// Centralized mock data
const childrenData: Child[] = [
    {
    id: 'alex',
    name: 'Alex',
    avatar: 'https://placehold.co/40x40.png',
    deviceName: 'Galaxy S22',
    isOnline: true,
    batteryLevel: 82,
    metrics: {
      alerts: '3',
      alertsDescription: '2 new since last login',
      screenTime: '4h 32m',
      screenTimeDescription: '+15m from yesterday',
      appsChecked: '12',
      appsCheckedDescription: 'All apps are safe'
    },
    activities: [
      {
        icon: <ShieldAlert className="size-5 text-destructive" />,
        title: "Harmful Content Detected",
        description: "AI detected a potentially harmful message in a chat application.",
        time: "2m ago",
        details: { source: "Notification", reason: "The message contains bullying language.", isHarmful: true },
        badge: <Badge variant="destructive">Urgent</Badge>
      },
      {
        icon: <FileImage className="size-5" />,
        title: "New Screenshot Captured",
        description: "A screenshot of a social media post was taken.",
        time: "15m ago",
        details: { source: "Screenshot", reason: "The screenshot contains a picture of a vape pen.", isHarmful: true },
      },
      {
        icon: <Smartphone className="size-5 text-blue-500" />,
        title: "New App Installed",
        description: "'Clash of Clans' was installed from the Play Store.",
        time: "1h ago",
        badge: <Badge variant="secondary">Info</Badge>
      },
    ],
    screenTimeData: [
      { app: "youtube", minutes: 125, fill: "var(--color-youtube)" },
      { app: "tiktok", minutes: 90, fill: "var(--color-tiktok)" },
      { app: "minecraft", minutes: 60, fill: "var(--color-minecraft)" },
      { app: "chrome", minutes: 45, fill: "var(--color-chrome)" },
      { app: "instagram", minutes: 32, fill: "var(--color-instagram)" },
      { app: "other", minutes: 20, fill: "var(--color-other)" },
    ],
    contacts: [
      { name: 'Mom', phone: '555-0101', avatar: 'M', avatarImage: 'https://placehold.co/40x40.png' },
      { name: 'Dad', phone: '555-0102', avatar: 'D', avatarImage: 'https://placehold.co/40x40.png' },
      { name: 'Alex Johnson', phone: '555-0103', avatar: 'A', avatarImage: 'https://placehold.co/40x40.png' },
      { name: 'Emily Carter', phone: '555-0107', avatar: 'EC' },
    ],
    callLogs: [
      { id: '1', name: 'Alex Johnson', number: '555-0103', type: 'outgoing', duration: '5m 12s', time: '10:45 AM' },
      { id: '2', name: 'Mom', number: '555-0101', type: 'incoming', duration: '12m 3s', time: '10:30 AM' },
      { id: '3', name: 'Unknown', number: '555-0123', type: 'missed', duration: '0m 0s', time: '9:15 AM' },
    ],
    smsMessages: [
       { id: '1', sender: 'Alex', content: "Hey, are we still on for the movies tonight?", timestamp: "5min ago", avatar: "A" },
       { id: '2', sender: 'Mom', content: "Don't forget to take out the trash before you leave!", timestamp: "1hr ago", avatar: "M" },
    ],
    installedApps: [
      { name: 'Google Chrome', packageName: 'com.android.chrome', icon: <Globe className="w-8 h-8 text-muted-foreground" />, version: '125.0.6422.112' },
      { name: 'YouTube', packageName: 'com.google.android.youtube', icon: <Youtube className="w-8 h-8 text-red-500" />, version: '19.23.35' },
      { name: 'Minecraft', packageName: 'com.mojang.minecraftpe', icon: <Gamepad2 className="w-8 h-8 text-green-600" />, version: '1.20.81.01' },
      { name: 'Clash of Clans', packageName: 'com.supercell.clashofclans', icon: <Shield className="w-8 h-8 text-yellow-500" />, version: '16.253.20' },
    ],
    fileSystem: {
        '/': [ { name: 'DCIM', type: 'folder' }, { name: 'Download', type: 'folder' } ],
        '/DCIM': [ { name: 'Camera', type: 'folder' } ],
        '/DCIM/Camera': [ { name: 'IMG_Alex_1.jpg', type: 'file', fileType: 'image', size: '4.5 MB', modified: '2024-05-20 10:30', thumbnail: 'https://placehold.co/40x40.png', hint: 'beach sunset' } ],
        '/Download': [ { name: 'project.pdf', type: 'file', fileType: 'document', size: '1.2 MB', modified: '2024-05-15 09:00' } ]
    },
    location: {
        address: '123 Maple Street, Springfield, USA',
        coordinates: '40.7128° N, 74.0060° W',
        lastUpdated: '2 mins ago',
        mapImage: 'https://placehold.co/800x600.png'
    },
    geofences: [
        { name: 'Home', address: '123 Maple Street, Springfield', icon: <Home className="w-6 h-6 text-green-500" />, isInside: true },
        { name: 'School', address: '456 Oak Avenue, Springfield', icon: <School className="w-6 h-6 text-blue-500" />, isInside: false },
    ]
  },
  {
    id: 'ben',
    name: 'Ben',
    avatar: 'https://placehold.co/40x40.png',
    deviceName: 'Pixel 6a',
    isOnline: false,
    batteryLevel: 45,
    metrics: {
      alerts: '1',
      alertsDescription: 'No new alerts',
      screenTime: '2h 10m',
      screenTimeDescription: '-30m from yesterday',
      appsChecked: '15',
      appsCheckedDescription: 'All apps are safe'
    },
    activities: [
       {
        icon: <ShieldAlert className="size-5 text-amber-500" />,
        title: "Suspicious Website Visited",
        description: "AI flagged a website with unmoderated chat features.",
        time: "3h ago",
        details: { source: "Screenshot", reason: "The website contains a public chat room which may expose the child to strangers.", isHarmful: true },
        badge: <Badge variant="outline" className="border-amber-500 text-amber-500">Warning</Badge>
      },
      {
        icon: <ClipboardCopy className="size-5" />,
        title: "Clipboard Content Copied",
        description: "A URL was copied to the clipboard: https://gaming-forum.com/...",
        time: "4h ago",
        details: { source: "Clipboard", reason: "This links to an unmoderated gaming forum.", isHarmful: false },
      },
    ],
    screenTimeData: [
      { app: "roblox", minutes: 70, fill: "var(--color-roblox)" },
      { app: "chrome", minutes: 30, fill: "var(--color-chrome)" },
      { app: "messages", minutes: 20, fill: "var(--color-messages)" },
      { app: "other", minutes: 10, fill: "var(--color-other)" },
    ],
    contacts: [
      { name: 'Mom', phone: '555-0101', avatar: 'M' },
      { name: 'Grandma', phone: '555-0105', avatar: 'G' },
      { name: 'David Lee', phone: '555-0108', avatar: 'DL' },
    ],
    callLogs: [
       { id: '1', name: 'Grandma', number: '555-0105', type: 'incoming', duration: '25m 42s', time: 'Yesterday' },
       { id: '2', name: 'David Lee', number: '555-0108', type: 'outgoing', duration: '3m 1s', time: '2 days ago' },
    ],
    smsMessages: [
       { id: '1', sender: 'David Lee', content: "Yo, you free to play later?", timestamp: "2h ago", avatar: "D" },
       { id: '2', sender: 'Unknown', content: "Your pizza is on the way.", timestamp: "3hr ago", avatar: "#" },
    ],
    installedApps: [
      { name: 'Google Chrome', packageName: 'com.android.chrome', icon: <Globe className="w-8 h-8 text-muted-foreground" />, version: '125.0.6422.112' },
      { name: 'TikTok', packageName: 'com.zhiliaoapp.musically', icon: <Music className="w-8 h-8 text-cyan-400" />, version: '34.8.4' },
    ],
    fileSystem: {
        '/': [ { name: 'Pictures', type: 'folder' } ],
        '/Pictures': [ { name: 'Screenshots', type: 'folder' } ],
        '/Pictures/Screenshots': [ { name: 'Screenshot_Ben_1.png', type: 'file', fileType: 'image', size: '1.8 MB', modified: '2024-05-19 12:00', thumbnail: 'https://placehold.co/40x40.png', hint: 'app interface' } ]
    },
    location: {
        address: '456 Oak Avenue, Springfield, USA',
        coordinates: '40.7145° N, 74.0081° W',
        lastUpdated: '3 hours ago',
        mapImage: 'https://placehold.co/800x600.png'
    },
    geofences: [
        { name: 'Home', address: '123 Maple Street, Springfield', icon: <Home className="w-6 h-6 text-green-500" />, isInside: false },
        { name: 'School', address: '456 Oak Avenue, Springfield', icon: <School className="w-6 h-6 text-blue-500" />, isInside: true },
    ]
  },
  {
    id: 'chloe',
    name: 'Chloe',
    avatar: 'https://placehold.co/40x40.png',
    deviceName: 'iPhone 13',
    isOnline: true,
    batteryLevel: 95,
    metrics: {
      alerts: '0',
      alertsDescription: 'No alerts today',
      screenTime: '5h 5m',
      screenTimeDescription: '+45m from yesterday',
      appsChecked: '10',
      appsCheckedDescription: 'All apps are safe'
    },
    activities: [
      {
        icon: <Smartphone className="size-5 text-blue-500" />,
        title: "New App Installed",
        description: "'BeReal' was installed from the App Store.",
        time: "2h ago",
        badge: <Badge variant="secondary">Info</Badge>
      },
      {
        icon: <FileImage className="size-5" />,
        title: "New Screenshot Captured",
        description: "A screenshot of a FaceTime call was taken.",
        time: "5h ago",
        details: { source: "Screenshot", reason: "N/A", isHarmful: false },
      },
    ],
    screenTimeData: [
      { app: "tiktok", minutes: 180, fill: "var(--color-tiktok)" },
      { app: "instagram", minutes: 75, fill: "var(--color-instagram)" },
      { app: "safari", minutes: 30, fill: "var(--color-safari)" },
      { app: "facetime", minutes: 20, fill: "var(--color-facetime)" },
    ],
    contacts: [
      { name: 'Mom', phone: '555-0101', avatar: 'M' },
      { name: 'Dad', phone: '555-0102', avatar: 'D' },
      { name: 'Jessica', phone: '555-0110', avatar: 'J' },
    ],
    callLogs: [
        { id: '1', name: 'Jessica', number: '555-0110', type: 'outgoing', duration: '32m 8s', time: '4:30 PM' },
        { id: '2', name: 'Dad', number: '555-0102', type: 'missed', duration: '0m 0s', time: '1:00 PM' },
    ],
    smsMessages: [
        { id: '1', sender: 'Jessica', content: "omg did u see that new post?", timestamp: "15min ago", avatar: "J" },
    ],
    installedApps: [
      { name: 'Instagram', packageName: 'com.instagram.android', icon: <Instagram className="w-8 h-8 text-pink-500" />, version: '339.0.0.12.112' },
      { name: 'TikTok', packageName: 'com.zhiliaoapp.musically', icon: <Music className="w-8 h-8 text-cyan-400" />, version: '34.8.4' },
    ],
    fileSystem: {
        '/': [ { name: 'DCIM', type: 'folder' } ],
        '/DCIM': [ { name: 'iMessage Photos', type: 'folder' } ],
        '/DCIM/iMessage Photos': [ { name: 'photo_from_jessica.jpg', type: 'file', fileType: 'image', size: '3.1 MB', modified: '2024-05-22 18:00', thumbnail: 'https://placehold.co/40x40.png', hint: 'friends selfie' } ],
    },
    location: {
        address: '789 Pine Lane, Springfield, USA',
        coordinates: '40.7100° N, 74.0020° W',
        lastUpdated: '15 mins ago',
        mapImage: 'https://placehold.co/800x600.png'
    },
    geofences: [
        { name: 'Home', address: '789 Pine Lane, Springfield', icon: <Home className="w-6 h-6 text-green-500" />, isInside: true },
        { name: 'Mall', address: '101 Mall Road, Springfield', icon: <School className="w-6 h-6 text-blue-500" />, isInside: false },
    ]
  }
];


type ChildContextType = {
  childrenData: Child[];
  selectedChild: Child;
  setSelectedChildId: (id: string) => void;
};

const ChildContext = React.createContext<ChildContextType | undefined>(undefined);

export const ChildProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedChildId, setSelectedChildId] = React.useState(childrenData[0].id);

  const selectedChild = childrenData.find(c => c.id === selectedChildId) || childrenData[0];

  const value = { childrenData, selectedChild, setSelectedChildId };

  return (
    <ChildContext.Provider value={value}>
      {children}
    </ChildContext.Provider>
  );
};

export const useChild = () => {
  const context = React.useContext(ChildContext);
  if (context === undefined) {
    throw new Error('useChild must be used within a ChildProvider');
  }
  return context;
};
