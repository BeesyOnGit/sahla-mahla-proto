import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ContextProvider, { Contexts } from "./Contexts/Contexts";
import App from "./App";
import "./index.css";

// Without this, any render error unmounts the whole tree and leaves a white screen
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: unknown }> {
    state = { error: null as unknown };
    static getDerivedStateFromError(error: unknown) {
        return { error };
    }
    render() {
        if (!this.state.error) return this.props.children;
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <p>Something went wrong.</p>
                <button onClick={() => location.reload()}>Reload</button>
            </div>
        );
    }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary>
            <ContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ContextProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
