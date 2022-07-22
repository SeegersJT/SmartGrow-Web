import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate as navigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { database } from "../util/firebase";
import { onValue, ref } from "firebase/database";
import { Line } from "react-chartjs-2";
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
    const [dawid, setDawid] = useState([]);
    const [hanno, setHanno] = useState([]);
    const { user, logOut } = useUserAuth();

    //read device data based on uid
    useEffect(() => {
        if(user){
            onValue(ref(database, "/devices/"), snapshot => {
                const data = snapshot.val();
                if(data !== null) {
                    setDawid(Object.values(data.LDlrNOnaLFcnBeGEq9zdGXTBMQj2.readings));
                    setHanno(Object.values(data.uFBi6L0Kp0XgBLH72ewIlkOWqGG3.readings));
                }
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
        }
    };

    const data = {
        labels: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        datasets: [
            {
                label: "Hanno - ESP",
                data: hanno.map((x) => x.heatindex),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)"
            },
            {
                label: "Dawid - ESP",
                data: dawid.map((x) => x.heatindex),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)"
            }
        ]
    };

    return (
        <>
            <h1>Welcome {user.email}</h1>
            <p>This is live temperature data pulled from ESP's</p>
            <Line options={options} data={data} />
            <br/>
            <Button variant="primary" onClick={handleLogOut}>
                Log Out
            </Button>
        </>
    );
};

export default Home;