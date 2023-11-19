import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
    const initializeMap = (data) => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2FsY2l1bS1kb2kiLCJhIjoiY2xwNXBxZnI5MWh1bTJqbzh2bW81bW4xNyJ9.lmPvaF2IOnm9glibmNPrFw';

        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-123.1216, 49.2827], // Vancouver, BC coordinates [lng, lat]
            zoom: 9, // starting zoom
        });

        addPointsToMap(map, data);
        return () => map.remove();
    };

    const addPoint = (map, coord, id, washroomProperties) => {
        map.on('load', () => {
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

            // Add event listeners for popups, etc., outside the on load event
            map.on('click', `point-${id}`, (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.name;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });

            map.on('mouseenter', `point-${id}`, () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', `point-${id}`, () => {
                map.getCanvas().style.cursor = '';
            });

        });
    };


    const addPointsToMap = (map, washrooms) => {
        let id = 0;
        washrooms.forEach((washroom) => {
            let coord = [washroom.geo_point_2d.lon, washroom.geo_point_2d.lat];
            addPoint(map, coord, id.toString(), washroom);
            id = id + 1;
        });
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/public-washrooms.json');
                return await response.json();
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        };

        const fetchDataAndInitializeMap = async () => {
            const data = await fetchData();
            initializeMap(data);
        };

        fetchDataAndInitializeMap();
    }, []);



    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;


