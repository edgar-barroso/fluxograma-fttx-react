import { useState, useEffect } from "react";
import { Button, ContainerLogin, Form, Input } from "./style";
import { useNavigate } from "react-router-dom";
import { setupAPIClient } from "../../lib/api";

export function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (password !== confirmPassword) {
            setError("A senha e a confirmação devem ser iguais!");
        } else {
            setError("");
        }
    }, [password, confirmPassword]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = {
            name,
            email,
            password,
        };
        const api = setupAPIClient();
        try {
            const response = await api.post("/users", data, {
                withCredentials: true,
            });        
            navigate("/login");
            
        } catch (err:any) {
            if (err.response.status === 409) {
                setError("Email já cadastrado");
                setEmail("")
            }
        }
    };

    return (
        <ContainerLogin>
            <Form onSubmit={handleSubmit}>
                <label>Nome</label>
                <Input
                    type="text"
                    minLength={6}
                    placeholder=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Email</label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Senha</label>
                <Input
                    minLength={6}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Confirmar Senha</label>
                <Input
                    minLength={6}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error!=="" && <p>{error}</p>}
                <Button type="submit">Registrar</Button>
            </Form>
        </ContainerLogin>
    );
}
