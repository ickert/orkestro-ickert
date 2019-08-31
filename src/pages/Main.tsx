import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import background from 'assets/images/orkestropic2.jpg';

const Content = styled.div`
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${background});
    background-size: cover;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    h1, a {
        color: #fff;
    }
`;

const Index: React.FC = () => {
    return (
        <Content>
            <div>
                <h1>
                    Frontend Engineer Exercise - Felipe Ickert
                </h1>
                <Link to="/dashboard">Enter to the Dashboard</Link>
            </div>
        </Content>
    )
}

export default Index;