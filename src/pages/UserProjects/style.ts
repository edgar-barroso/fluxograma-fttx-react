import styled from "styled-components";

export const ProjectsContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  gap:10px;
  align-items: center;
`;

export const ProjectButton = styled.button`
  background-color: #4CAF50;    
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;

  &:hover {
    background-color: #3e8e41;
  }
`;