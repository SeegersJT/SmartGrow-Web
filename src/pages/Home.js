
import React, { useState, useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";

import { auth, db } from "../services/Firebase";
import { AuthContext } from "../services/AuthProvider";

import "../styles/Home.scss";

function Home() {
    const { currentUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            const starCountRef = ref(db, "users/" + currentUser.uid);
            onValue(starCountRef, (snapshot) => {
                if (snapshot.exists()) {
                    var data = snapshot.val();
                    setUsername(data.firstName + " " + data.lastName);
                }
            });
        }
    }, [currentUser]);

    const clickLogin = () => {
        if (currentUser) {
            signOut(auth);
        } else {
            navigate("/login");
        }
    };

    return (
        <>
            {username && <div className="mainContainer">
                <h1>Home</h1>
                <p>Welcome, {username}</p>
                <div className="buttons">
                    <button onClick={clickLogin}>
                        {currentUser ? "Log Out" : "Login"}
                    </button>
                </div>
            </div>}
        </>
    );
}

export default Home;