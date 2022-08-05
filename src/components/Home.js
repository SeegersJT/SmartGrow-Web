import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate as navigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { database } from "../util/firebase";
import { onValue, ref } from "firebase/database";
import { Line } from "react-chartjs-2";
import EspCard from "./EspCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const [mergedArray, setMergedArray] = useState([]);

    const { user, logOut } = useUserAuth();

    //read device data based on uid
    useEffect(() => {
        if(user){
            onValue(ref(database, "/devices/"), snapshot => {
                const data = snapshot.val();
                if(data !== null) {
                    // This will change completely when RTDB is restructured
                    const hannoArray = Object.values(data.uFBi6L0Kp0XgBLH72ewIlkOWqGG3.readings);
                    const dawidArray = Object.values(data.LDlrNOnaLFcnBeGEq9zdGXTBMQj2.readings);
                    setMergedArray([...hannoArray, ...dawidArray].sort((a, b) => {
                            if(a.timestamp < b.timestamp) { return -1; }
                            if(a.timestamp > b.timestamp) { return 1; }
                            return 0;
                        }
                    ));
                }
                console.log(data);
            });
        }
    }, [user]);

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    }

   

    console.log(mergedArray);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: user.email
          }
        },
    };

    const data = {
        labels: mergedArray.map((x) => x.timestamp),
        datasets: [
            {
                label: "Hanno - ESP",
                data: mergedArray.map((x) => {
                    if(x.device === "ESP32-HANNO") { return x.heatindex; }
                    return null;
                }),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                spanGaps: true,
                tension: 0.2,
            },
            {
                label: "Dawid - ESP",
                data: mergedArray.map((x) => {
                    if(x.device === "ESP32S") { return x.heatindex; }
                    return null;
                }),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                spanGaps: true,
                tension: 0.2,
            }
        ]
    };

    return (
        <>

            <EspCard />
{/* 
            <h1>Welcome {user.email}</h1>
            <p>This is live temperature data pulled from ESP's</p>
            <Line options={options} data={data} />
            <br/>
            <Button variant="primary" onClick={handleLogOut}>
                Log Out
            </Button> */}
        </>
    );
};

export default Home;