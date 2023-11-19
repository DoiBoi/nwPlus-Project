import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const initializeMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FsY2l1bS1kb2kiLCJhIjoiY2xwNXBxZnI5MWh1bTJqbzh2bW81bW4xNyJ9.lmPvaF2IOnm9glibmNPrFw';

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
    });

    // Clean up on unmount
    return () => map.remove();
};

const Map = () => {
    useEffect(() => {
        initializeMap();
    }, []); // Run only once on mount

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
