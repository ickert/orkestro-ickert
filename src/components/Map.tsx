import React, { useEffect, useState } from 'react';
import { MAP_ACCESS_TOKEN } from 'core/constants';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { svg, svgHighlighted, svgPackage, svgFood } from 'core/mapSvg';
import { getDriverList, getClosestDriverListFromOrder} from 'core/driversFunctions';

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
            containerStyle={{
                height: '100%',
                width: '100%',
                borderRadius: 4,
            }}
        >
            <Layer type="symbol" id="marker" {...driverLayer}>
            {drivers.map((driver, index) => (
                <Feature
                key={driver.id}
                // onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                // onMouseLeave={this.onToggleHover.bind(this, '')}
                // onClick={this.markerClick.bind(this, stations[stationK])}
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
                        // onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                        // onMouseLeave={this.onToggleHover.bind(this, '')}
                        // onClick={this.markerClick.bind(this, stations[stationK])}
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
                            // onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                            // onMouseLeave={this.onToggleHover.bind(this, '')}
                            // onClick={this.markerClick.bind(this, stations[stationK])}
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
                            // onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                            // onMouseLeave={this.onToggleHover.bind(this, '')}
                            // onClick={this.markerClick.bind(this, stations[stationK])}
                            coordinates={orderSelected.position}
                        />
                    </Layer>
                )
            }
        </Map>
    )
}

export default MapApp;