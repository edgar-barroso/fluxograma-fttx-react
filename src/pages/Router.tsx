import { Routes, Route, Navigate} from "react-router-dom";
import { Diagram } from "./Diagram";
import { Login } from "./Login";
import { UserProjects } from "./UserProjects";
import { Register } from "./Register";

export function Router() {
    return (
        <Routes>
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            <Route
                path="/diagram/:projectId"
                element={<Diagram />}
            />
            <Route path="/my-projects" element={<UserProjects />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    );
}
