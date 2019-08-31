import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    border-bottom: 1px solid #d0d0d0;
    color: #fff;
    background: #001529;
    height: 45px;

    a {
        color: #fff;
    }
`;

interface IndexProps {
    className?: string,
}

const Index: React.FC<IndexProps> = (props) => {
    return (
        <Header {...props}>
            {props.children}
        </Header>
    )
}

export default Index;