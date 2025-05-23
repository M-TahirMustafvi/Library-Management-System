import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { RootLayout } from "./pages/Root";
import { HomePage } from "./pages/screens/Home";
import { AuthPage } from "./pages/screens/Authentication";
import DataContextProvider from "./store/data-context";
import Book from "./pages/screens/Books";
import Requests from "./pages/screens/Requests";
import Libraries from "./pages/screens/Libraries";
import Members from "./pages/screens/Members";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage /> },
      {path: "auth", element: <AuthPage /> },
      {path: "books", element: <Book />},
      {path: "requests", element: <Requests />},
      {path: "libraries", element: <Libraries />},
      {path: "members", element: <Members />},
    ],
  },
]);

function App() {
  return (
    <DataContextProvider>
      <RouterProvider router={router} />
    </DataContextProvider>
  );
}

export default App;
