import React from 'react';
import { MAP_ACCESS_TOKEN } from 'core/constants';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { Driver, getDriverList, getClosestDriverListFromPoint, DriverDict, svg, svgHighlighted} from 'core/driversData';

const Map = ReactMapboxGl({
    accessToken: MAP_ACCESS_TOKEN
});

// Define layout to use in Layer component
const layoutLayer = { 'icon-image': 'londonCycle' };

// Create an image for the Layer
const image = new Image();
image.className="pulse-car";
image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svg);
const images: any = ['londonCycle', image];

const image2 = new Image();
image.className="pulse-car";
image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svgHighlighted);
const images2: any = ['londonCycle', image2];

const MapApp: React.FC = () => {
    const drivers = getDriverList()
    const closest = getClosestDriverListFromPoint(4)
    console.log(closest)
    return (
        <Map
            style="mapbox://styles/mapbox/streets-v11"
            center={[-0.120973687, 51.53005939]}
            containerStyle={{
                height: '100%',
                width: '100%'
            }}
        >
            <Layer type="symbol" id="marker" layout={layoutLayer} images={images}>
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
            {/* <Layer type="symbol" id="marker" layout={layoutLayer} images={images}>
            {closest.map((driver, index) => (
                <Feature
                key={driver.id}
                // onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                // onMouseLeave={this.onToggleHover.bind(this, '')}
                // onClick={this.markerClick.bind(this, stations[stationK])}
                coordinates={driver.position}
                />
            ))}
            </Layer> */}
            {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
            </Layer> */}
        </Map>
    )
}

export default MapApp;