import React, { useEffect, useState } from 'react';
import { MAP_ACCESS_TOKEN } from 'core/constants';
import styled from 'styled-components';
import moment from 'moment';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import { svg, svgHighlighted, svgPackage, svgFood } from 'core/mapSvg';
import { getDriverList, getClosestDriverListFromOrder} from 'core/driversFunctions';

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;

  span {
    opacity: .6;
  }
`;

const Map = ReactMapboxGl({
    accessToken: MAP_ACCESS_TOKEN
});

const getLayerData = (name, svg) => {
    const layout = { 'icon-image': name };    
    const image = new Image();
    image.src = `data:image/svg+xml;charset=utf-8;base64,${btoa(svg)}`;
    const images: any = [name, image];

    return {
        layout,
        images
    }
}

const driverLayer = getLayerData('layoutLayerDrivers', svg);
const driverHighligtedLayer = getLayerData('layoutLayerClosest', svgHighlighted);
const packageLayer = getLayerData('layoutLayerPackage', svgPackage);
const foodLayer = getLayerData('layoutLayerFood', svgFood);

interface MapProps {
    orderSelected: any
}

const MapApp: React.FC<MapProps>= ({orderSelected}) => {
    const drivers = getDriverList()
    const closest = getClosestDriverListFromOrder(orderSelected)
    const [zoom, setZoom] = useState<number>(10);
    const [center, setCenter] = useState<[number, number]>([-0.120973687, 51.53005939]);
    const [selection, setSelecion] = useState(null)

    useEffect(() => {
        if (orderSelected) {
            setZoom(16);
            setCenter([orderSelected.long, orderSelected.lat]);
        }
      },[orderSelected]);

    return (
        <Map
            style="mapbox://styles/ickert/cjzzs2qxv1tk31crwwo7a75cw"
            center={center}
            zoom={[zoom]}
            onDrag={() => setSelecion(undefined)}
            containerStyle={{
                height: '100%',
                width: '100%',
                borderRadius: 4,
            }}
        >
            {selection && (
                <Popup key={selection.id} coordinates={selection.position}>
                    <StyledPopup>
                        <div><b>Name: </b>{selection.name}</div>
                        {selection.pickUpTime && (
                            <React.Fragment>
                                <div>
                                    <b>Pickup Time: </b> {moment(selection.pickUpTime).format('HH:mm')} / <span>({selection.packageSize})</span>
                                </div>
                                <div>
                                    <b>Pickup Address: </b> {selection.pickUpAddress}
                                </div>
                            </React.Fragment>
                        )}
                    </StyledPopup>
                </Popup>
            )}
            <Layer type="symbol" id="marker" {...driverLayer}>
                {drivers.map((driver, index) => (
                    <Feature
                        key={driver.id}
                        onClick={() => setSelecion(driver)}
                        coordinates={driver.position}
                    />
                ))}
            </Layer>
            {
                !!closest.length && (
                    <Layer type="symbol" id="markerHighlighted" {...driverHighligtedLayer}>
                    {closest.map((driver, index) => (
                        <Feature
                            key={driver.id}
                            onClick={() => setSelecion(driver)}
                            coordinates={driver.position}
                        />
                    ))}
                    </Layer>
                )
            }
            {
                orderSelected && orderSelected.type === 'package' && (
                    <Layer type="symbol" id="markerPackage" {...packageLayer}>
                        <Feature
                            key={orderSelected.id}
                            onClick={() => setSelecion(orderSelected)}
                            coordinates={orderSelected.position}
                        />
                    </Layer>
                )
            }
            {
                orderSelected && orderSelected.type === 'food' && (
                    <Layer type="symbol" id="markerFood" {...foodLayer}>
                        <Feature
                            key={orderSelected.id}
                            onClick={() => setSelecion(orderSelected)}
                            coordinates={orderSelected.position}
                        />
                    </Layer>
                )
            }
        </Map>
    )
}

export default MapApp;