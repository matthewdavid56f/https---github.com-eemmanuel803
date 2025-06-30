
// import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
// import { app } from './firebase';
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
  icon: string;
  iconClassName?: string;
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
  icon: string;
  iconClassName?: string;
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

export type ChildSummary = Pick<Child, 'id' | 'name' | 'avatar' | 'deviceName' | 'isOnline' | 'batteryLevel'>;


// Centralized mock data
// In a real app, this data would live in your Firestore database.
const childrenData: Child[] = [
    {
    id: 'child1',
    name: 'Child 1',
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
        icon: "ShieldAlert",
        iconClassName: "text-destructive",
        title: "Harmful Content Detected",
        description: "AI detected a potentially harmful message in a chat application.",
        time: "2m ago",
        details: { source: "Notification", reason: "The message contains bullying language.", isHarmful: true },
      },
      {
        icon: "FileImage",
        title: "New Screenshot Captured",
        description: "A screenshot of a social media post was taken.",
        time: "15m ago",
        details: { source: "Screenshot", reason: "The screenshot contains a picture of a vape pen.", isHarmful: true },
      },
      {
        icon: "Smartphone",
        iconClassName: "text-blue-500",
        title: "New App Installed",
        description: "'Clash of Clans' was installed from the Play Store.",
        time: "1h ago",
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
      { name: 'Parent 1', phone: '555-0101', avatar: 'P1', avatarImage: 'https://placehold.co/40x40.png' },
      { name: 'Parent 2', phone: '555-0102', avatar: 'P2', avatarImage: 'https://placehold.co/40x40.png' },
      { name: 'Chris Smith', phone: '555-0103', avatar: 'CS', avatarImage: 'https://placehold.co/40x40.png' },
      { name: 'Emily Carter', phone: '555-0107', avatar: 'EC' },
    ],
    callLogs: [
      { id: '1', name: 'Chris Smith', number: '555-0103', type: 'outgoing', duration: '5m 12s', time: '10:45 AM' },
      { id: '2', name: 'Parent 1', number: '555-0101', type: 'incoming', duration: '12m 3s', time: '10:30 AM' },
      { id: '3', name: 'Unknown', number: '555-0123', type: 'missed', duration: '0m 0s', time: '9:15 AM' },
    ],
    smsMessages: [
       { id: '1', sender: 'Chris Smith', content: "Hey, are we still on for the movies tonight?", timestamp: "5min ago", avatar: "CS" },
       { id: '2', sender: 'Parent 1', content: "Don't forget to take out the trash before you leave!", timestamp: "1hr ago", avatar: "P1" },
    ],
    installedApps: [
      { name: 'Google Chrome', packageName: 'com.android.chrome', icon: 'Globe', iconClassName: 'text-muted-foreground', version: '125.0.6422.112' },
      { name: 'YouTube', packageName: 'com.google.android.youtube', icon: 'Youtube', iconClassName: 'text-red-500', version: '19.23.35' },
      { name: 'Minecraft', packageName: 'com.mojang.minecraftpe', icon: 'Gamepad2', iconClassName: 'text-green-600', version: '1.20.81.01' },
      { name: 'Clash of Clans', packageName: 'com.supercell.clashofclans', icon: 'Shield', iconClassName: 'text-yellow-500', version: '16.253.20' },
    ],
    fileSystem: {
        '/': [ { name: 'DCIM', type: 'folder' }, { name: 'Download', type: 'folder' } ],
        '/DCIM': [ { name: 'Camera', type: 'folder' } ],
        '/DCIM/Camera': [ { name: 'IMG_20240520.jpg', type: 'file', fileType: 'image', size: '4.5 MB', modified: '2024-05-20 10:30', thumbnail: 'https://placehold.co/40x40.png', hint: 'beach sunset' } ],
        '/Download': [ { name: 'project.pdf', type: 'file', fileType: 'document', size: '1.2 MB', modified: '2024-05-15 09:00' } ]
    },
    location: {
        address: '123 Maple Street, Springfield, USA',
        coordinates: '40.7128° N, 74.0060° W',
        lastUpdated: '2 mins ago',
        mapImage: 'https://placehold.co/800x600.png'
    },
    geofences: [
        { name: 'Home', address: '123 Maple Street, Springfield', icon: 'Home', iconClassName: 'text-green-500', isInside: true },
        { name: 'School', address: '456 Oak Avenue, Springfield', icon: 'School', iconClassName: 'text-blue-500', isInside: false },
    ]
  },
  {
    id: 'child2',
    name: 'Child 2',
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
        icon: "ShieldAlert",
        iconClassName: "text-amber-500",
        title: "Suspicious Website Visited",
        description: "AI flagged a website with unmoderated chat features.",
        time: "3h ago",
        details: { source: "Screenshot", reason: "The website contains a public chat room which may expose the child to strangers.", isHarmful: true },
      },
      {
        icon: "ClipboardCopy",
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
      { name: 'Parent 1', phone: '555-0101', avatar: 'P1' },
      { name: 'Grandparent', phone: '555-0105', avatar: 'G' },
      { name: 'David Lee', phone: '555-0108', avatar: 'DL' },
    ],
    callLogs: [
       { id: '1', name: 'Grandparent', number: '555-0105', type: 'incoming', duration: '25m 42s', time: 'Yesterday' },
       { id: '2', name: 'David Lee', number: '555-0108', type: 'outgoing', duration: '3m 1s', time: '2 days ago' },
    ],
    smsMessages: [
       { id: '1', sender: 'David Lee', content: "Yo, you free to play later?", timestamp: "2h ago", avatar: "DL" },
       { id: '2', sender: 'Unknown', content: "Your pizza is on the way.", timestamp: "3hr ago", avatar: "#" },
    ],
    installedApps: [
      { name: 'Google Chrome', packageName: 'com.android.chrome', icon: 'Globe', iconClassName: 'text-muted-foreground', version: '125.0.6422.112' },
      { name: 'TikTok', packageName: 'com.zhiliaoapp.musically', icon: 'Music', iconClassName: 'text-cyan-400', version: '34.8.4' },
    ],
    fileSystem: {
        '/': [ { name: 'Pictures', type: 'folder' } ],
        '/Pictures': [ { name: 'Screenshots', type: 'folder' } ],
        '/Pictures/Screenshots': [ { name: 'Screenshot_20240519.png', type: 'file', fileType: 'image', size: '1.8 MB', modified: '2024-05-19 12:00', thumbnail: 'https://placehold.co/40x40.png', hint: 'app interface' } ]
    },
    location: {
        address: '456 Oak Avenue, Springfield, USA',
        coordinates: '40.7145° N, 74.0081° W',
        lastUpdated: '3 hours ago',
        mapImage: 'https://placehold.co/800x600.png'
    },
    geofences: [
        { name: 'Home', address: '123 Maple Street, Springfield', icon: 'Home', iconClassName: 'text-green-500', isInside: false },
        { name: 'School', address: '456 Oak Avenue, Springfield', icon: 'School', iconClassName: 'text-blue-500', isInside: true },
    ]
  },
  {
    id: 'child3',
    name: 'Child 3',
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
        icon: "Smartphone",
        iconClassName: "text-blue-500",
        title: "New App Installed",
        description: "'BeReal' was installed from the App Store.",
        time: "2h ago",
      },
      {
        icon: "FileImage",
        title: "New Screenshot Captured",
        description: "A FaceTime call was taken.",
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
      { name: 'Parent 1', phone: '555-0101', avatar: 'P1' },
      { name: 'Parent 2', phone: '555-0102', avatar: 'P2' },
      { name: 'Jessica', phone: '555-0110', avatar: 'J' },
    ],
    callLogs: [
        { id: '1', name: 'Jessica', number: '555-0110', type: 'outgoing', duration: '32m 8s', time: '4:30 PM' },
        { id: '2', name: 'Parent 2', number: '555-0102', type: 'missed', duration: '0m 0s', time: '1:00 PM' },
    ],
    smsMessages: [
        { id: '1', sender: 'Jessica', content: "omg did u see that new post?", timestamp: "15min ago", avatar: "J" },
    ],
    installedApps: [
      { name: 'Instagram', packageName: 'com.instagram.android', icon: 'Instagram', iconClassName: 'text-pink-500', version: '339.0.0.12.112' },
      { name: 'TikTok', packageName: 'com.zhiliaoapp.musically', icon: 'Music', iconClassName: 'text-cyan-400', version: '34.8.4' },
    ],
    fileSystem: {
        '/': [ { name: 'DCIM', type: 'folder' } ],
        '/DCIM': [ { name: 'iMessage Photos', type: 'folder' } ],
        '/DCIM/iMessage Photos': [ { name: 'IMG_0522.jpg', type: 'file', fileType: 'image', size: '3.1 MB', modified: '2024-05-22 18:00', thumbnail: 'https://placehold.co/40x40.png', hint: 'friends selfie' } ],
    },
    location: {
        address: '789 Pine Lane, Springfield, USA',
        coordinates: '40.7100° N, 74.0020° W',
        lastUpdated: '15 mins ago',
        mapImage: 'https://placehold.co/800x600.png'
    },
    geofences: [
        { name: 'Home', address: '789 Pine Lane, Springfield', icon: 'Home', iconClassName: 'text-green-500', isInside: true },
        { name: 'Mall', address: '101 Mall Road, Springfield', icon: 'School', iconClassName: 'text-blue-500', isInside: false },
    ]
  }
];

// In a real app, the functions below would be async and would
// fetch data from Firestore instead of returning mock data.
// Example:
// const db = getFirestore(app);

// Simulate an async API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getChildren(): Promise<ChildSummary[]> {
  // Real implementation would be:
  // const childrenCol = collection(db, 'children');
  // const childrenSnapshot = await getDocs(childrenCol);
  // const childrenList = childrenSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChildSummary));
  // return childrenList;

  await delay(500); // Simulate network latency
  return childrenData.map(({ id, name, avatar, deviceName, isOnline, batteryLevel }) => ({
    id,
    name,
    avatar,
    deviceName,
    isOnline,
    batteryLevel,
  }));
}

export async function getChildById(id: string): Promise<Child | null> {
  // Real implementation would be:
  // const childDocRef = doc(db, 'children', id);
  // const childDocSnap = await getDoc(childDocRef);
  // if (childDocSnap.exists()) {
  //   return { id: childDocSnap.id, ...childDocSnap.data() } as Child;
  // } else {
  //   return null;
  // }
  
  await delay(500); // Simulate network latency
  const child = childrenData.find(c => c.id === id);
  return child || null;
}
