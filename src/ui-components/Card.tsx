import React from 'react';
import styled from 'styled-components';

const CardContent = styled.div<{width?: number, height?: number}>`
    border-radius: 4px;
    border: 1px solid #d0d0d0;
    margin: 20px;
    background: #fff;
`;

interface CardProps {
    className?: string,
}

const Card: React.FC<CardProps> = (props) => {
    return (
        <CardContent {...props}>
            {props.children}
        </CardContent>
    )
}

export default Card;