
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, serverTimestamp, type Timestamp, deleteDoc } from 'firebase/firestore';
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

export type DiscoveredDevice = {
  id: string;
  name: string;
};


// Initialize Firestore
const db = getFirestore(app);

// A default structure for a Child object to prevent crashes on incomplete data
const defaultChildData: Omit<Child, 'id' | 'name' | 'avatar'> = {
  deviceName: 'Device',
  isOnline: false,
  batteryLevel: 0,
  metrics: {
    alerts: '0',
    alertsDescription: 'No alerts recorded',
    screenTime: '0h 0m',
    screenTimeDescription: 'No usage recorded',
    appsChecked: '0',
    appsCheckedDescription: 'No apps checked',
  },
  activities: [],
  screenTimeData: [],
  contacts: [],
  callLogs: [],
  smsMessages: [],
  installedApps: [],
  fileSystem: { '/': [] },
  location: {
    address: 'Not available',
    coordinates: '0.0, 0.0',
    lastUpdated: 'Never',
    mapImage: 'https://placehold.co/800x600.png',
  },
  geofences: [],
};


const handleFirestoreError = (error: any, context: string) => {
    if (error.code === 'permission-denied') {
      console.warn(
        `Firestore Permission Warning in ${context}: The security rules for your project are preventing the app from accessing Firestore. ` +
        `To fix this for development, go to your Firebase project's Firestore 'Rules' tab and allow reads/writes. ` +
        `For example: \`rules_version = '2'; service cloud.firestore { match /databases/{database}/documents { match /{document=**} { allow read, write: if true; } } }\` (NOTE: This is insecure and for development only).`
      );
    } else {
      console.error(`Error in ${context}:`, error);
    }
}

export async function getDiscoveredDevices(): Promise<DiscoveredDevice[]> {
  try {
    const devicesCol = collection(db, 'discovered_devices');
    const devicesSnapshot = await getDocs(devicesCol);
    const devicesList = devicesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as DiscoveredDevice));
    return devicesList;
  } catch (error) {
    handleFirestoreError(error, "getDiscoveredDevices");
    return [];
  }
}

export async function getChildren(): Promise<ChildSummary[]> {
  try {
    const childrenCol = collection(db, 'children');
    const childrenSnapshot = await getDocs(childrenCol);
    const childrenList = childrenSnapshot.docs.map(doc => {
      const data = doc.data();
      const name = data.name || 'Unnamed Device';
      return { 
        id: doc.id, 
        name: name,
        avatar: data.avatar || name.charAt(0).toUpperCase(),
        deviceName: data.deviceName || 'Device',
        isOnline: data.isOnline ?? false,
        batteryLevel: data.batteryLevel ?? 0,
      } as ChildSummary
    });
    return childrenList;
  } catch (error) {
    handleFirestoreError(error, "getChildren");
    return [];
  }
}

export async function getChildById(id: string): Promise<Child | null> {
  try {
    const childDocRef = doc(db, 'children', id);
    const childDocSnap = await getDoc(childDocRef);
    if (childDocSnap.exists()) {
      const data = childDocSnap.data();
      const name = data.name || 'Unnamed Device';

      // Deep merge the fetched data with defaults to prevent errors
      const fullChildData: Child = {
        ...defaultChildData,
        ...data,
        id: childDocSnap.id,
        name: name,
        avatar: data.avatar || name.charAt(0).toUpperCase(),
        metrics: {
            ...defaultChildData.metrics,
            ...(data.metrics || {}),
        },
        location: {
            ...defaultChildData.location,
            ...(data.location || {}),
        }
      };
      
      return fullChildData;
    } else {
      return null;
    }
  } catch(error) {
    handleFirestoreError(error, `getChildById(${id})`);
    return null;
  }
}

export async function pairNewDevice(childName: string, device: DiscoveredDevice): Promise<Child | null> {
  const name = childName.trim();
  const avatar = name.charAt(0).toUpperCase() || 'D';

  const newChildData: Omit<Child, 'id' | 'createdAt'> = {
    name,
    avatar,
    deviceName: device.name,
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

  try {
    const docDataWithTimestamp = { ...newChildData, createdAt: serverTimestamp() };
    const docRef = await addDoc(collection(db, "children"), docDataWithTimestamp);
    
    // After pairing, remove the device from the discovered list
    const deviceToDeleteRef = doc(db, 'discovered_devices', device.id);
    await deleteDoc(deviceToDeleteRef);
    
    // When live, we get the real object back with its ID from firestore
    const newChild = await getChildById(docRef.id);
    return newChild;

  } catch (error) {
    handleFirestoreError(error, "pairNewDevice");
    return null;
  }
}
