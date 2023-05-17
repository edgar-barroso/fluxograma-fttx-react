import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { ProjectsContainer } from "./style";
import { ButtonContainer } from "../Diagram/components/Flow/style";
import { setupAPIClient } from "../../lib/api";

interface InfoProject {
    name: string;
    id: string;
    updatedAt: Date;
}

export function UserProjects() {
    
    const navigate = useNavigate();
    const [arrayProjects, setArrayProjects] = useState<InfoProject[]>([]);
    async function fetchGetProjects() {
        const api = setupAPIClient();
        const response = await api.get("projects/listing", {
        });
        const listOfProjects:InfoProject[] = await response.data.listOfProjects;
        if (listOfProjects) {
            setArrayProjects(listOfProjects);
        }
    }

    useEffect(() => {
        fetchGetProjects();
    }, []);

    return (
        <ProjectsContainer>
            {arrayProjects.map((item) => {
                return (
                    <ButtonContainer onClick={() => {
                        navigate(`/diagram/${item.id}`)
                        }} key={item.id}>
                        {item.name}
                    </ButtonContainer   >
                );
            })}
        </ProjectsContainer>
    );
}
