import { useState, useContext } from "react";

import SignupForm from "../../components/Auth/Signup";
import LoginForm from "../../components/Auth/Login";
import { UserContext } from "../../store/user-context";
import { Navigate } from "react-router-dom";

export function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const userCtx = useContext(UserContext);

    function toggleAuthMode() {
        setIsLogin((prev) => !prev);
    }

    return (
        <>
            {!userCtx.user.email ? (
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
