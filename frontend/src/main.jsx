import React from "react";
import { createRoot } from "react-dom/client" 
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css';

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(
    <Router>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
            <App />
        </GoogleOAuthProvider>
    </Router>
);
