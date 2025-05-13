import React, { type ReactNode, useEffect } from "react";
import { createContext, useState } from "react";
import User from "../types/Lib_Types.ts";
// import { useSearchParams } from 'react-router-dom';

type userType = {
  user: User;
  signUp: (email: string, pwd: string) => boolean;
  login: (email: string, pwd: string) => boolean;
  logout: ()=>void
};

const defaultUser = new User("", "");

export const UserContext = createContext<userType>({
  user: defaultUser,
  signUp: () => true,
  login: () => true,
  logout: ()=> {}
});

const UserContextProvider: React.FC<{ children: ReactNode }> = (props) => {
  
    const [activeUser, setActiveUser] = useState<User>(defaultUser);

    useEffect(() => {
        const storedUser = localStorage.getItem("activeUser");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setActiveUser(new User(parsedUser.email, parsedUser.password));
        }
      }, []);


    const signUpHandler = (email: string, password: string) => {
        const newUser = new User(email, password);

        const storedUsers = localStorage.getItem("userArray");
        const usersArray = storedUsers ? JSON.parse(storedUsers) : [];

        const userExists = usersArray.some((user: User) => user.email === email);
        if (userExists) return false;

        const updatedUser = [...usersArray, newUser];
        localStorage.setItem("userArray", JSON.stringify(updatedUser));

        setActiveUser(newUser);
        localStorage.setItem("activeUser", JSON.stringify(newUser));

        return true;
    };

    const loginHandler = (email: string, password: string) => {
        const storedUsers = localStorage.getItem("userArray");
        const usersArray = storedUsers ? JSON.parse(storedUsers) : [];

        const foundUser = usersArray.find(
            (user: { email: string; password: string }) =>
            user.email === email && user.password === password
        );

        if (foundUser) {
            const loggedInUser = new User(foundUser.email, foundUser.password);
            setActiveUser(loggedInUser);
            localStorage.setItem("activeUser", JSON.stringify(loggedInUser));
            return true;
        }

        console.warn("Invalid email or password.");
        return false;
    };

    const logoutHandler = ()=> {
        localStorage.removeItem('activeUser');
        setActiveUser(new User('', ''));
    }

    const contextValue: userType = {
        user: activeUser,
        signUp: signUpHandler,
        login: loginHandler,
        logout: logoutHandler
    };

  return <UserContext value={contextValue}>{props.children}</UserContext>;
};

export default UserContextProvider;
