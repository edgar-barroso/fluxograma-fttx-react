import { useState, useEffect } from "react";
import { Button, ContainerLogin, Form, Input } from "./style";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setupAPIClient } from "../../lib/api";
import { AxiosError } from "axios";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            email,
            password,
        };
        const api = setupAPIClient();
        try {
            const response = await api.post("/sessions", data, {
                withCredentials: true,
            });
            const tokenUser = await response.data.token;

            if (tokenUser) {
                Cookies.set("auth.diagram.token", tokenUser);
                navigate("/my-projects");
            }
        } catch (err:any) {
            if (err.response.status === 400) {
                setError("Usuário não encontrado");
            }
        }
    };

    return (
        <ContainerLogin>
            <Form onSubmit={handleSubmit}>
                <label>Email</label>
                <Input
                    type="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Senha</label>
                <Input
                    minLength={6}
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Login</Button>
                {error !== "" && <p>{error}</p>}

                <a href="/register">Registrar-se</a>
            </Form>
        </ContainerLogin>
    );
}
