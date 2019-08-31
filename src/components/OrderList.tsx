import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { svgPackage, svgFood } from 'core/mapSvg';
import { getOrderList } from 'core/orderFunctions';

const OrderLine = styled.div`
    border-bottom: 1px solid #d0d0d0;
    cursor: pointer;
    padding-left: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    &:hover {
        background: #d0d0d0;
    }
    span {
        line-height: 34px;
        margin-right: 10px;
    }
    .caption {
        opacity: .4;
        font-size: 12px;
    }

    img {
        padding-right: 10px;
        opacity: .6;
    }
`
const OrderHeader = styled.div`
    border-bottom: 1px solid #d0d0d0;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
`

interface OrderListProps {
    setOrder: Function
}

const OrderList: React.FC<OrderListProps> = props => {
    const orders = getOrderList();
    return (
        <div>
            <OrderHeader>
                Oder List
            </OrderHeader>
            {
                orders.map(order => {
                    return (
                        <OrderLine key={order.id} onClick={() => props.setOrder(order)}>
                            <div className="flexContainer">
                                <span><b>Name: </b>{order.name}</span>   
                                <span className="caption">({order.type})</span>
                                <span className="flex"/>
                                <img src={order.type === 'package' ? `data:image/svg+xml;charset=utf-8;base64,${btoa(svgPackage)}` : `data:image/svg+xml;charset=utf-8;base64,${btoa(svgFood)}` } />
                            </div>
                            <div className="flexContainer">
                                <span><b>PickupTime: </b>{moment(order.pickUpTime).format("HH:mm")}</span>
                                <span className="caption">{order.packageSize}</span>
                            </div>
                            <div className="flexContainer">
                                <span><b>PickupAddress: </b>{order.pickupAddress}</span>
                            </div>
                        </OrderLine>
                    )
                })
            }
        </div>
    )
}

export default OrderList;