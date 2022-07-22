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
    const [device, setDevice] = useState([]);
    const { user, logOut } = useUserAuth();

    //read device data based on uid
    useEffect(() => {
        if(user){
            onValue(ref(database, "/devices/" + user.uid + "/readings"), snapshot => {
                const data = snapshot.val();
                if(data !== null) {
                    setDevice(Object.values(data));
                }
                console.log(data)
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
        labels: device.map((x) => x.timestamp),
        datasets: [
            {
                label: "Temperature",
                data: device.map((x) => x.temperature),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)"
            },
            {
                label: "Real Feel",
                data: device.map((x) => x.heatindex),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)"
            }
        ]
    };

    return (
        <>
            <Line options={options} data={data} />
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