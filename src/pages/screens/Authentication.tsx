import { useState, useContext } from "react";

import SignupForm from "../../components/Auth/Signup";
import LoginForm from "../../components/Auth/Login";
import { DataContext } from "../../store/data-context";
import { Navigate } from "react-router-dom";

export function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const dataCtx = useContext(DataContext);

    function toggleAuthMode() {
        setIsLogin((prev) => !prev);
    }

    return (
        <>
            {!dataCtx.user.email ? (
                isLogin ? (
                    <SignupForm onLogin={toggleAuthMode} />
                ) : (
                    <LoginForm onSignup={toggleAuthMode} />
                )
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
}
