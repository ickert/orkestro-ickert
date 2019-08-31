import React from 'react';
import styled from 'styled-components';

const CardContent = styled.div<{width?: number, height?: number}>`
    ${props => {
        if (props.width) {
            return `width: ${props.width}px`
        }
    }}
    ${props => {
        if (props.height) {
            return `height: ${props.height}px`
        }
    }}
    border-radius: 4px;

`;

interface CardProps {
    width?: number,
    height?: number
}

const Card: React.FC<CardProps> = ({width, height, children}) => {
    return (
        <CardContent width={width} height={height}>
            {children}
        </CardContent>
    )
}

export default Card;