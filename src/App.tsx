import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css'
import { RootLayout } from './assets/pages/Root';
import { HomePage } from './assets/pages/screens/Home'


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage />},

    ]
  }
]);

function App() {
  
  return (
    <RouterProvider router = {router} />
  )
}

export default App
