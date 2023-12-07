import styled from "styled-components";

export const ProjectsContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  gap:10px;
  align-items: center;
`;

export const ProjectButton = styled.button`
  display: flex;
    padding: 0.5rem;
    font-size: 1.5rem;
    align-items: center;
    justify-content: center;
    border: 0;
    z-index: 10;
    background: transparent;
    border: 1px solid ${(props) => props.theme["green-300"]};
    color: ${(props) => props.theme["green-300"]};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

  &:hover {
    background:${(props) => props.theme["green-300"]};
    color:white;
  }
`;