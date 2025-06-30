
// In a real app, these imports would connect to a live Firebase instance.
// import { getFirestore, collection, getDocs, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
// import { app } from './firebase';

import type { Activity } from "@/components/activity-feed";
import type { ScreenTimeData } from "@/components/screen-time-chart";

// Types for all data structures
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


// This array acts as our in-memory "database".
// It starts empty, reflecting a new, live system.
const childrenData: Child[] = [];

// Simulate an async API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getChildren(): Promise<ChildSummary[]> {
  // Real implementation:
  // const db = getFirestore(app);
  // const childrenCol = collection(db, 'children');
  // const childrenSnapshot = await getDocs(childrenCol);
  // const childrenList = childrenSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChildSummary));
  // return childrenList;

  await delay(250); // Simulate network latency
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
  // Real implementation:
  // const db = getFirestore(app);
  // const childDocRef = doc(db, 'children', id);
  // const childDocSnap = await getDoc(childDocRef);
  // if (childDocSnap.exists()) {
  //   return { id: childDocSnap.id, ...childDocSnap.data() } as Child;
  // } else {
  //   return null;
  // }
  
  await delay(250); // Simulate network latency
  const child = childrenData.find(c => c.id === id);
  return child || null;
}

export async function pairNewDevice(childName: string): Promise<Child | null> {
  // Real implementation:
  // const db = getFirestore(app);
  // const docRef = await addDoc(collection(db, "children"), newChildData);
  // return { id: docRef.id, ...newChildData };

  await delay(1000); // Simulate pairing process
  
  const newChildId = `child_${Date.now()}`;
  const newChild: Child = {
    id: newChildId,
    name: childName,
    avatar: '',
    deviceName: `${childName}'s Device`,
    isOnline: true,
    batteryLevel: Math.floor(Math.random() * 40) + 60, // 60-100%
    metrics: {
      alerts: '0',
      alertsDescription: 'No alerts today',
      screenTime: '0h 0m',
      screenTimeDescription: 'No usage recorded yet',
      appsChecked: '0',
      appsCheckedDescription: 'System apps verified',
    },
    activities: [],
    screenTimeData: [],
    contacts: [],
    callLogs: [],
    smsMessages: [],
    installedApps: [
      { name: 'Browser', icon: 'Globe', version: '1.0', packageName: 'com.android.chrome', iconClassName: 'text-blue-500' },
      { name: 'Phone', icon: 'Phone', version: '1.0', packageName: 'com.android.dialer', iconClassName: 'text-green-500' },
      { name: 'Messages', icon: 'MessageSquare', version: '1.0', packageName: 'com.android.messaging', iconClassName: 'text-primary' },
      { name: 'Camera', icon: 'Camera', version: '1.0', packageName: 'com.android.camera', iconClassName: 'text-muted-foreground' },
    ],
    fileSystem: {
      '/': [
        { name: 'DCIM', type: 'folder' },
        { name: 'Pictures', type: 'folder' },
        { name: 'Download', type: 'folder' },
      ],
      '/DCIM': [],
      '/Pictures': [],
      '/Download': [],
    },
    location: {
      address: 'Location not yet available',
      coordinates: '0.0, 0.0',
      lastUpdated: 'Never',
      mapImage: 'https://placehold.co/800x600.png',
    },
    geofences: [],
  };

  childrenData.push(newChild);
  return newChild;
}
