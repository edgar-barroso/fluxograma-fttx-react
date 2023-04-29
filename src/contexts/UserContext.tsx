import { ReactNode, createContext, useEffect, useState } from "react";
import { Edge, NodeFttx } from "reactflow";

interface UserContextType {
    projectId: string | null;
    handleSetProjectId: (id: string) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserProvider({ children }: UserProviderProps) {
    const [projectId, setProjectId] = useState<string | null>(null);

    const handleSetProjectId = (id: string) => {
        setProjectId(id);
    };

    return (
        <UserContext.Provider value={{ projectId, handleSetProjectId }}>
            {children}
        </UserContext.Provider>
    );
}
