import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

interface AxiosErrorResponse {
    status?: number;
    code?: string;
}

export function setupAPIClient() {
    const cookieToken = Cookies.get("auth.diagram.token");
    const api = axios.create({
        baseURL: "http://localhost:3333",
        headers: {
            Authorization: `Bearer ${cookieToken}`,
        },
    });

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error: AxiosError<AxiosErrorResponse>) => {
            if (
                error.response?.status === 401 &&
                error?.response.statusText === "Unauthorized"
            ) {
                try {
                    const response = await api.patch("token/refresh");
                    const newToken = await response.data.token;
                    Cookies.set("auth.diagram.token", newToken);

                    // Retorna a resposta atualizada e o erro
                    return Promise.reject({ response, error });
                } catch {
                    Cookies.remove("auth.diagram.token");
                }
            }

            // Retorna apenas o erro original
            return Promise.reject(error);
        }
    );

    return api;
}
