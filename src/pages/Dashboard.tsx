import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Card } from 'ui-components';
import Map from 'components/Map';
import OrderList from 'components/OrderList';

const DashboardContent = styled.div`
    background: #f0f2f5;
`

const Dashboard: React.FC = () => {
    const [orderSelected, setOrder] = useState(null);
    return (
        <DashboardContent className="flex flexContainerColumn">
            <Header className="flexCenterTotal">
                <Link to="/">Back</Link>
                <div className="flex">
                    Dashboard
                </div>
            </Header>
            <div className="flex flexContainer">
                <Card className="flex2">
                    <Map orderSelected={orderSelected} />
                </Card>
                <div className="flex">
                    <Card >
                        <OrderList setOrder={setOrder}/>
                    </Card>
                </div>
            </div>
        </DashboardContent>
    )
}

export default Dashboard;