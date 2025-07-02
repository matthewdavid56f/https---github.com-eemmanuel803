
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, serverTimestamp, type Timestamp } from 'firebase/firestore';
import { app } from './firebase';

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
  isHidden: boolean;
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
  createdAt?: Timestamp;
};

export type ChildSummary = Pick<Child, 'id' | 'name' | 'avatar' | 'deviceName' | 'isOnline' | 'batteryLevel'>;


// Initialize Firestore and handle environment limitations
let db;
try {
  db = getFirestore(app);
} catch (e) {
  console.error("Firebase could not be initialized. This is expected in the Studio environment. The app will use temporary in-memory data for UI interactions, but data will not be persisted.");
}

export async function getChildren(): Promise<ChildSummary[]> {
  if (!db) return [];

  try {
    const childrenCol = collection(db, 'children');
    const childrenSnapshot = await getDocs(childrenCol);
    const childrenList = childrenSnapshot.docs.map(doc => {
      const data = doc.data();
      return { 
        id: doc.id, 
        name: data.name,
        avatar: data.avatar,
        deviceName: data.deviceName,
        isOnline: data.isOnline,
        batteryLevel: data.batteryLevel,
      } as ChildSummary
    });
    return childrenList;
  } catch (error) {
    console.error("Error fetching children from Firestore:", error);
    return [];
  }
}

export async function getChildById(id: string): Promise<Child | null> {
  if (!db) return null;
  
  // Prevent trying to fetch temporary local-only data from Firestore
  if (id.startsWith('temp_')) return null;

  try {
    const childDocRef = doc(db, 'children', id);
    const childDocSnap = await getDoc(childDocRef);
    if (childDocSnap.exists()) {
      return { id: childDocSnap.id, ...childDocSnap.data() } as Child;
    } else {
      return null;
    }
  } catch(error) {
    console.error(`Error fetching child by ID "${id}" from Firestore:`, error);
    return null;
  }
}

export async function pairNewDevice(name: string, deviceName: string): Promise<Child | null> {
  const newChildData: Omit<Child, 'id' | 'createdAt'> = {
    name,
    avatar: name.charAt(0).toUpperCase(),
    deviceName,
    isOnline: true,
    batteryLevel: Math.floor(Math.random() * 40) + 60,
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
      { name: 'Browser', icon: 'Globe', version: '1.0', packageName: 'com.android.chrome', iconClassName: 'text-blue-500', isHidden: false },
      { name: 'Phone', icon: 'Phone', version: '1.0', packageName: 'com.android.dialer', iconClassName: 'text-green-500', isHidden: false },
    ],
    fileSystem: {
      '/': [
        { name: 'DCIM', type: 'folder' },
        { name: 'Download', type: 'folder' },
      ],
      '/DCIM': [],
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

  if (db) {
    try {
      const docDataWithTimestamp = { ...newChildData, createdAt: serverTimestamp() };
      const docRef = await addDoc(collection(db, "children"), docDataWithTimestamp);
      // When live, we get the real object back with its ID from firestore
      return { id: docRef.id, ...newChildData };
    } catch (error) {
      console.error("Error adding document to Firestore: ", error);
      // Fall through to return a temporary object if the save fails
    }
  }

  // If DB isn't available (like in Studio) or the save fails, 
  // we return a temporary object so the UI can still update.
  // This data will not be persisted.
  console.warn("Returning temporary object for pairNewDevice. This will not be saved.");
  const tempId = `temp_${Date.now()}`;
  return { id: tempId, ...newChildData };
}
