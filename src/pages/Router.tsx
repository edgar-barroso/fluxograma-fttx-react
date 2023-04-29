import { Routes, Route, Navigate } from "react-router-dom";
import { Diagram } from "./Diagram";
import { Login } from "./Login";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { UserProjects } from "./UserProjects";

export function Router() {
    const { projectId } = useContext(UserContext);
    return (
        <Routes>
            { projectId && (
                <Route path="/diagram" element={<Diagram />} />
            )}
            { <Route path="/my-projects" element={<UserProjects />} />}
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
