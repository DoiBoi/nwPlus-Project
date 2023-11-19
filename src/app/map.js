import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
    const [map, setMap] = useState(null);
    const [data, setData] = useState(null);

    const initializeMap = (data) => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2FsY2l1bS1kb2kiLCJhIjoiY2xwNXBxZnI5MWh1bTJqbzh2bW81bW4xNyJ9.lmPvaF2IOnm9glibmNPrFw';

        // Check if map already exists
        if (!map) {
            const newMap = new mapboxgl.Map({
                container: 'map', // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: [-123.1216, 49.2827], // Vancouver, BC coordinates [lng, lat]
                zoom: 9, // starting zoom
            });

            setMap(newMap);
        }

        // Update map data
        if (map && data) {
            addPointsToMap(map, data);
        }
    };

    const addPointsToMap = (map, washrooms) => {
        let id = 0;
        washrooms.forEach((washroom) => {
            let coord = [washroom.geo_point_2d.lon, washroom.geo_point_2d.lat];
            addPoint(map, coord, id.toString(), washroom);
            id = id + 1;
        });
    };

    const addPoint = (map, coord, id, washroomProperties) => {
        map.addSource(`point-${id}`, {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: coord,
                        },
                        properties: washroomProperties,
                    },
                ],
            },
        });

        map.addLayer({
            id: `point-${id}`,
            type: 'circle',
            source: `point-${id}`,
            paint: {
                'circle-radius': 4,
                'circle-color': '#FF0000',
            },
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/public-washrooms.json');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            initializeMap(data);
        }
    }, [data]);

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
