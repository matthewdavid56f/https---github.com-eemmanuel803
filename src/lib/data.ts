
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
// An empty array simulates a new, live system with no devices paired yet.
const childrenData: Child[] = [];

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
