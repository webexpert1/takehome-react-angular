import React, { useState } from "react";
import ActivityList from "../components/ActivityList";
import SearchBar from "../components/SearchBar";

const Dashboard: React.FC = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="container">
            <h1>Real-Time Activity Tracker</h1>
            <SearchBar onSearch={setSearch} />
            <ActivityList filter={search} />
        </div>
    );
};

export default Dashboard;
