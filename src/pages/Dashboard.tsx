import React from 'react';
import Header from 'components/Header';
import Card from 'components/Card';
import Map from 'components/Map';
import OrderList from 'components/OrderList';

const Dashboard: React.FC = () => {
    return (
        <div>
            <Header>asdads</Header>
            <div className="flexCenter">
                <Card width={500} height={500}>
                    <Map />
                </Card>
                <Card>
                    <OrderList />
                </Card>
            </div>
        </div>
    )
}

export default Dashboard;