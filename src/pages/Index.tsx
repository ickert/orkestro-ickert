import React from 'react';
import { Link } from "react-router-dom";

const Index: React.FC = () => {
    return (
        <div>
            <Link to="/dashboard">Enter to the Dashboard</Link>
        </div>
    )
}

export default Index;