import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
    useEffect(() => {
        const fetchDataAndInitializeMap = async () => {
            try {
                mapboxgl.accessToken = 'pk.eyJ1IjoiY2FsY2l1bS1kb2kiLCJhIjoiY2xwNXBxZnI5MWh1bTJqbzh2bW81bW4xNyJ9.lmPvaF2IOnm9glibmNPrFw';

                const response = await fetch('/public-washrooms.json');
                const washrooms = await response.json();

                const map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [-123.1216, 49.2827],
                    zoom: 9,
                });

                map.on('load', () => {
                    addPointsToMap(map, washrooms);
                });

                return () => map.remove(); // Cleanup function
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        };

        fetchDataAndInitializeMap();
    }, []);

    const addPointsToMap = (map, washrooms) => {
        washrooms.forEach((washroom, index) => {
            const coordinates = [washroom.geo_point_2d.lon, washroom.geo_point_2d.lat];
            const id = index.toString();

            map.addSource(`point-${id}`, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: coordinates,
                            },
                            properties: {
                                title: 'My Point',
                                description: 'This is a sample point.',
                            },
                        },
                    ],
                },
            });

            map.addLayer({
                id: `point-${id}`,
                type: 'circle',
                source: `point-${id}`,
                paint: {
                    'circle-radius': 8,
                    'circle-color': '#FF0000',
                },
            });
        });
    };

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
