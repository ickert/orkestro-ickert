import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from 'pages/Main';
import Dashboard from 'pages/Dashboard';

const RouteApp: React.FC = () => {
    return (
        <Router>
            <Route path="/" exact component={Index} />
            <Route path="/dashboard" component={Dashboard} />
        </Router>
    )
}

export default RouteApp;