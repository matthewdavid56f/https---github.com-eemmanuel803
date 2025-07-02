
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

  // This effect runs once to get the list of children and set the first one.
  React.useEffect(() => {
    const fetchChildren = async () => {
      const childrenList = await getChildren();
      setChildrenData(childrenList);
      // Set the first child as selected. The next effect will load it.
      // If there are no children, selectedChildId will be null, and the next effect will handle it.
      setSelectedChildId(childrenList.length > 0 ? childrenList[0].id : null);
    };
    fetchChildren();
  }, []);

  // This effect runs whenever the selected child ID changes.
  React.useEffect(() => {
    const fetchChildData = async () => {
      // If there's no ID, it means there are no children. Stop all loading.
      if (!selectedChildId) {
        setSelectedChild(null);
        setIsLoading(false);
        setIsSwitching(false);
        return;
      }

      // If we are here, we have an ID to load.
      // If `isLoading` is true, it's the initial load. Otherwise, it's a switch.
      if (!isLoading) {
        setIsSwitching(true);
      }
      setSelectedChild(null); // Clear old data to trigger loading states in components

      const childData = await getChildById(selectedChildId);
      setSelectedChild(childData);
      
      // We are finished loading, whether initial or a switch.
      setIsLoading(false);
      setIsSwitching(false);
    };

    fetchChildData();
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
