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
                center: [-123.1216, 49.4827], // Vancouver, BC coordinates [lng, lat]
                zoom: 5, // starting zoom (adjust as needed)
                maxBounds: [
                    [-123.3316, 49.0015], // Southwest coordinates of Greater Vancouver
                    [-122.8561, 49.5]  // Northeast coordinates of Greater Vancouver
                ],
            });

            setMap(newMap);


        }

        // Update map data
        if (map && data) {
            addPointsToMap(map, data);


            navigator.geolocation.getCurrentPosition(function(position) {
                const userLocationCoord = [position.coords.longitude, position.coords.latitude];
                addUserLocationPoint(map, userLocationCoord);
                // alert("here!");

                // map.flyTo({
                //     center: [position.coords.longitude, position.coords.latitude],
                //     zoom: 8,
                //     speed: 0.2,
                //     curve: 1,
                //     duration: 1200,
                //     easing(t) {
                //         return t;
                //     }
                // });

                map.fitBounds([
                    [position.coords.longitude-0.005, position.coords.latitude-0.005], // southwestern corner of the bounds
                    [position.coords.longitude+0.005, position.coords.latitude+0.005] // northeastern corner of the bounds
                ]);
                // console.log("Longitude is :", );
            });
        }


    };

    const addUserLocationPoint = (map, coord) => {
        map.loadImage('userLocationMarker.png', (error, image) => {
            if (error) throw error;

            map.addImage(`userLocationMarker`, image);

            map.addSource(`userLocationPoint`, {
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
                            // properties: washroomProperties,
                        },
                    ],
                },
            });

            map.addLayer({
                id: `userLocationPoint`,
                type: 'symbol',
                source: `userLocationPoint`,
                layout: {
                    'icon-image': `userLocationMarker`,
                    'icon-size': 0.2, // Adjust the size as needed
                    'icon-anchor': 'bottom', // Adjust the anchor point as needed
                },
            });

            // Add hover effect
            map.on('mouseenter', `userLocationPoint`, () => {
                map.getCanvas().style.cursor = 'pointer'; // Change cursor on hover
                map.setPaintProperty(`userLocationPoint`, 'icon-color', '#00F'); // Change color on hover
            });

            map.on('mouseleave', `userLocationPoint`, () => {
                map.getCanvas().style.cursor = ''; // Revert cursor on mouseout
                map.setPaintProperty(`userLocationPoint`, 'icon-color', '#FF0000'); // Revert color on mouseout
            });
        });
    }

    const addPointsToMap = (map, washrooms) => {
        let id = 0;
        washrooms.forEach((washroom) => {
            let coord = [washroom.geo_point_2d.lon, washroom.geo_point_2d.lat];
            addPoint(map, coord, id.toString(), washroom);
            id = id + 1;
        });
    };

    const addPoint = (map, coord, id, washroomProperties) => {
        map.loadImage('marker.png', (error, image) => {
            if (error) throw error;

            map.addImage(`marker-${id}`, image);

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
                type: 'symbol',
                source: `point-${id}`,
                layout: {
                    'icon-image': `marker-${id}`,
                    'icon-size': 1.5, // Adjust the size as needed
                    'icon-anchor': 'bottom', // Adjust the anchor point as needed
                },
            });

            // Add hover effect
            map.on('mouseenter', `point-${id}`, () => {
                map.getCanvas().style.cursor = 'pointer'; // Change cursor on hover
                map.setPaintProperty(`point-${id}`, 'icon-color', '#00F'); // Change color on hover
            });

            map.on('mouseleave', `point-${id}`, () => {
                map.getCanvas().style.cursor = ''; // Revert cursor on mouseout
                map.setPaintProperty(`point-${id}`, 'icon-color', '#FF0000'); // Revert color on mouseout
            });
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

    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.permissions
    //             .query({ name: "geolocation" })
    //             .then(function (result) {
    //                 console.log(result);
    //             });
    //     } else {
    //         console.log("Geolocation is not supported by this browser.");
    //     }
    //
    //
    // }, []);

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
