import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate as navigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
    const { user, logOut } = useUserAuth();

    console.log(user);

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="p-4 box mt-3 text-center">
                Hello Welcome <br />
                { user && user.email}
            </div>
            <div className="d-grid gap-2">
                <Button variant="primary" onClick={handleLogOut}>
                    Log Out
                </Button>
            </div>
        </>
    );
};

export default Home;