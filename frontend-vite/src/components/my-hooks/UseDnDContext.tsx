import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
 
type DnDContextType = [string | null, Dispatch<SetStateAction<string | null>>];
const DnDContext = createContext<DnDContextType | undefined>(undefined);
 
export const DnDProvider = ({ children } : { children : ReactNode }) => {
  const [type, setType] = useState<string | null>(null);
 
  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
}
 
export default DnDContext;
 
export const useDnD = (): DnDContextType => {
  const context = useContext(DnDContext);
  if (!context) {
    throw new Error('useDnD must be used within a DnDProvider');
  }
  return context;
};