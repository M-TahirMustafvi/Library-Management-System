import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { RootLayout } from "./pages/Root";
import { HomePage } from "./pages/screens/Home";
import { AuthPage } from "./pages/screens/Authentication";
import UserContextProvider from "./store/user-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
