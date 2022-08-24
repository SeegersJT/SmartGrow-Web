import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import "./custom.scss";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
    return (
        <>
            <UserAuthContextProvider>
                <Routes>
                    <Route
                        path="/home"
                        element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/redirect"
                        element={ <Navigate to="/" /> }
                    />
                </Routes>
            </UserAuthContextProvider>
        </>
    );
}

export default App;