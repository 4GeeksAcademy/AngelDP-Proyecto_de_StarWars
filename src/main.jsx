import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  
import { router } from "./routes"; 
import { StoreProvider } from './hooks/useGlobalReducer';  
import { RouterProvider } from "react-router-dom";

const Main = () => {
    return (
        <React.StrictMode>  
            <StoreProvider> 
                <RouterProvider router={router}>
                </RouterProvider>
            </StoreProvider>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
