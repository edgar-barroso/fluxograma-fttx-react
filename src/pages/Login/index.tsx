import { useState, useEffect } from "react";
import { Button, ContainerLogin, Form, Input } from "./style";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setupAPIClient } from "../../lib/api";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("admin@admin.com");
    const [password, setPassword] = useState("123456");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            email,
            password,
        };
        const api = setupAPIClient();
        const response = await api.post("sessions", data, {
            withCredentials: true,
        });
        const tokenUser = await response.data.token;

        if (tokenUser) {
            Cookies.set("auth.diagram.token", tokenUser);
            navigate("/my-projects");
        }
    };

    return (
        <ContainerLogin>
            
            <Form onSubmit={handleSubmit}>
                <label>Email</label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Senha</label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Login</Button>
            </Form>
        </ContainerLogin>
    );
}
