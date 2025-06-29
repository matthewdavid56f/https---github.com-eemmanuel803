
"use client"

import * as React from 'react';
import { getChildren, getChildById, ChildSummary } from '@/lib/data';
import type { Child } from '@/lib/data';
import { Loader2 } from 'lucide-react';
export type { App, CallLog, Contact, FileSystem, FileSystemItem, Geofence, LocationData, SmsMessage } from '@/lib/data';


type ChildContextType = {
  childrenData: ChildSummary[];
  selectedChild: Child | null;
  setSelectedChildId: (id: string) => void;
  isLoading: boolean;
};

const ChildContext = React.createContext<ChildContextType | undefined>(undefined);

export const ChildProvider = ({ children }: { children: React.ReactNode }) => {
  const [childrenData, setChildrenData] = React.useState<ChildSummary[]>([]);
  const [selectedChildId, setSelectedChildId] = React.useState<string | null>(null);
  const [selectedChild, setSelectedChild] = React.useState<Child | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchChildren = async () => {
      const childrenList = await getChildren();
      setChildrenData(childrenList);
      if (childrenList.length > 0) {
        setSelectedChildId(childrenList[0].id);
      } else {
        setIsLoading(false);
      }
    };
    fetchChildren();
  }, []);

  React.useEffect(() => {
    if (selectedChildId) {
      setIsLoading(true);
      const fetchChildData = async () => {
        const childData = await getChildById(selectedChildId);
        setSelectedChild(childData);
        setIsLoading(false);
      };
      fetchChildData();
    }
  }, [selectedChildId]);
  
  const value = { childrenData, selectedChild, setSelectedChildId: (id: string) => setSelectedChildId(id), isLoading };

  if (isLoading && !selectedChild) {
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
