import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    border-bottom: 1px solid #d0d0d0;
    heigth: 45px;
`;

interface IndexProps {
}

const Index: React.FC<IndexProps> = ({ children }) => {
    return (
        <Header>
            {children}
        </Header>
    )
}

export default Index;