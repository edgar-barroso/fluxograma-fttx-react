import { Routes, Route} from "react-router-dom";
import { Diagram } from "./Diagram";
import { Login } from "./Login";
import { UserProjects } from "./UserProjects";

export function Router() {
    return (
        <Routes>
            <Route
                path="/diagram/:projectId"
                element={<Diagram />}
            />
            <Route path="/my-projects" element={<UserProjects />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
