import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { JSX } from "react";
import './App.css'

function RequireAuth({ children }: { children: JSX.Element }) {
    const navigate = useNavigate();
    const [checking, setChecking] = React.useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                registerUser();
                setChecking(false);
                return;
            }
            // 認証チェックのためのAPI呼び出し
            try {
                const response = await fetch(`/api/auth/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${userId}`,
                    }
                });

                if (response.status === 200) {
                    setChecking(false);
                    return;
                }
                if(response.status === 204) {
                    registerUser();
                    return;
                }
                if(response.status === 404) {
                    navigate("/unauthorized");
                    return;
                }
                if (response.status === 500) {
                    navigate("/internal-server-error");
                    return;
                }
                throw new Error(`想定外のステータスコード: ${response.status}`);
            } catch (error) {
                console.error(error);
                navigate("/unexpected-error");
                return;
            }
        };
        checkAuth();
    }, [navigate]);

    const registerUser = async () => {
        // 認証チェックのためのAPI呼び出し
        try {
            const response = await fetch(`/api/auth/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (response.status === 201) {
                // ここでユーザーIDを保存
                setChecking(false);
                return;
            }
            if (response.status === 500) {
                navigate("/internal-server-error");
                return;
            }
            throw new Error(`想定外のステータスコード: ${response.status}`);
        } catch (error) {
            console.error(error);
            navigate("/unexpected-error");
            return;
        }
    }

    if (checking) return <div>認証中...</div>;
    return children;
}

export default RequireAuth