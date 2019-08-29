import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from 'pages/Index';
import Dashboard from 'pages/Dashboard';

const RouteApp: React.FC = () => {
    return (
        <Router>
            <div>
                <Route path="/" exact component={Index} />
                <Route path="/dashboard" component={Dashboard} />
            </div>
        </Router>
    )
}

export default RouteApp;