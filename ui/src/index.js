import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './components/Home';
import Login from './components/Login';
import FileUploadPage from './components/FileUploadPage';
import ErrorPage from './components/ErrorPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index:true, element: <Home />},
      {
        path:"/home",
        element: <Home />,
      },
      {
        path:"/login",
        element: <Login />,
      },
      {
        path:"/fileuploadpage",
        element: <FileUploadPage />
      }
    ]
  }
  
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);


