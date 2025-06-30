
"use client"

import * as React from 'react';
import { getChildren, getChildById, ChildSummary } from '@/lib/data';
import type { Child } from '@/lib/data';
import { Loader2 } from 'lucide-react';
export type { App, CallLog, Contact, FileSystem, FileSystemItem, Geofence, LocationData, SmsMessage } from '@/lib/data';


type ChildContextType = {
  childrenData: ChildSummary[];
  selectedChild: Child | null;
  setSelectedChildId: (id: string | null) => void;
  addNewChild: (child: Child) => void;
  isLoading: boolean; // For the very initial load of the child list
  isSwitching: boolean; // For when switching between children
};

const ChildContext = React.createContext<ChildContextType | undefined>(undefined);

export const ChildProvider = ({ children }: { children: React.ReactNode }) => {
  const [childrenData, setChildrenData] = React.useState<ChildSummary[]>([]);
  const [selectedChildId, setSelectedChildId] = React.useState<string | null>(null);
  const [selectedChild, setSelectedChild] = React.useState<Child | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSwitching, setIsSwitching] = React.useState(false);

  React.useEffect(() => {
    const fetchChildren = async () => {
      setIsLoading(true);
      const childrenList = await getChildren();
      setChildrenData(childrenList);
      setSelectedChildId(childrenList.length > 0 ? childrenList[0].id : null);
      setIsLoading(false);
    };
    fetchChildren();
  }, []);

  React.useEffect(() => {
    if (selectedChildId) {
      setIsSwitching(true);
      setSelectedChild(null); // Clear previous child data
      const fetchChildData = async () => {
        const childData = await getChildById(selectedChildId);
        setSelectedChild(childData);
        setIsSwitching(false);
      };
      const timer = setTimeout(() => fetchChildData(), 150);
      return () => clearTimeout(timer);
    } else {
      setSelectedChild(null);
      setIsSwitching(false);
    }
  }, [selectedChildId]);
  
  const addNewChild = (newChild: Child) => {
    const summary: ChildSummary = {
      id: newChild.id,
      name: newChild.name,
      avatar: newChild.avatar,
      deviceName: newChild.deviceName,
      isOnline: newChild.isOnline,
      batteryLevel: newChild.batteryLevel,
    };
    setChildrenData(prevData => [...prevData, summary]);
    setSelectedChildId(newChild.id);
  };

  const value = { childrenData, selectedChild, setSelectedChildId, addNewChild, isLoading, isSwitching };

  if (isLoading) {
     return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

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
