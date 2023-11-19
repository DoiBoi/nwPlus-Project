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


    return () => map.remove();
};

const addPoint = (map, coord) => {
    map.on('load', () => {
        map.addSource('point', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: coord // Longitude and latitude of the point
                        },
                        properties: {
                            title: 'My Point',
                            description: 'This is a sample point.'
                        }
                    }
                ]
            }
        });

        // Add a layer to render the point on the map
        map.addLayer({
            id: 'point',
            type: 'circle',
            source: 'point',
            paint: {
                'circle-radius': 8,
                'circle-color': '#FF0000' // Red color for the point
            }
        });

        // Create a popup for the point
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        // Display a popup when the point is clicked
        map.on('mouseenter', 'point', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const { title, description } = e.features[0].properties;

            popup.setLngLat(coordinates)
                .setHTML(`<h3>${title}</h3><p>${description}</p>`)
                .addTo(map);
        });

        // Hide the popup when the mouse leaves the point
        map.on('mouseleave', 'point', () => {
            popup.remove();
        });
    });
}

const Map = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/public-washrooms.json');
                const data = await response.json();

                const cleanupMap = initializeMap();
                return cleanupMap;
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        };
        fetchData();
    }, []);
    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;


