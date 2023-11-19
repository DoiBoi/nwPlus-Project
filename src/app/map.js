import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const initializeMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FsY2l1bS1kb2kiLCJhIjoiY2xwNXBxZnI5MWh1bTJqbzh2bW81bW4xNyJ9.lmPvaF2IOnm9glibmNPrFw';

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-123.1216, 49.2827], // Vancouver, BC coordinates [lng, lat]
        zoom: 9, // starting zoom
    });
    // Clean up on unmount
    return () => map.remove();
};

const getWashrooms = () => {
    
}



const Map = () => {
    const [washrooms, setWashrooms] = useState(null);


    useEffect(() => {
        const cleanupMap = initializeMap();
        setWasherooms(getWashrooms);
        return cleanupMap;
    }, []); // Run only once on mount

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
