import React from "react";
import {ArcElement, Chart} from 'chart.js'
import MiniBoxes from "./MiniBoxes/MiniBoxes";
import UserTable from "./UserTable/UserTable";

Chart.register(ArcElement);

const Dashboard = () => {


    return (
        <div>

            <MiniBoxes/>

            <UserTable/>

        </div>
    );
}

export default Dashboard;