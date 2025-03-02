/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";

export function useCreateUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const createUser = async (userName: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post("/api/create-user", { userName });
            setSuccess(response.data.message);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    return { createUser, loading, error, success };
}
