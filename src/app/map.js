import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const PointDetails = ({ details, onClose }) => {
    const isWheelchairAccessible = details.wheel_access.toLowerCase() === 'yes';
    const is24h = (details.summer_hours.toLowerCase() === "24 hrs" || details.winter_hours.toLowerCase() === "24 hrs");


    return (
        <div className="point-details  rounded-md p-4">


            <div className="white-box">
                {/* Make name bold with a faint border line under the title */}
                <h3 className="font-bold border-b border-gray-300">{details.name}</h3>

                {/* Other information with smaller font */}
                <h5 className="text-xs mt-2">{details.geo_local_area}</h5>
                <h5 className="text-xs">{details.address}</h5>
                <h5 className="text-xs">{details.location}</h5>
                <br />
                <h5 className="text-xs font-semibold">Accessibility: </h5>
                <h5 className={`text-xs ${isWheelchairAccessible ? 'text-green-800' : 'text-red-800'}`}>
                    {isWheelchairAccessible ? 'Wheelchair accessible' : 'Not wheelchair accessible'}
                </h5>
                <h5 className={`text-xs ${is24h ? 'text-green-800' : 'text-red-800'}`}>
                    {is24h  ? 'Available 24h' : 'Not available 24h'}
                </h5>

            </div>
        </div>
    );
};


const Map = () => {
    const [map, setMap] = useState(null);
    const [data, setData] = useState(null);
    const [selectedPoint, setSelectedPoint] = useState(null);

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
                    'icon-size': 1.5,
                    'icon-anchor': 'bottom',
                },
            });

            map.on('mouseenter', `point-${id}`, () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', `point-${id}`, () => {
                map.getCanvas().style.cursor = '';
            });


            map.on('click', `point-${id}`, (e) => {
                const features = map.queryRenderedFeatures(e.point, { layers: [`point-${id}`] });

                if (!features.length) {
                    return;
                }
                map.flyTo({
                    center: coord,
                    zoom: 12, // Adjust the zoom level as needed
                    speed: 1, // Adjust the flying speed
                });

                // Set the selected point information in the state
                setSelectedPoint(washroomProperties);
                
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

        // Cleanup function
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (data) {
            initializeMap(data);
        }
    }, [data]);

    return (
        <div className="flex items-center justify-center">
            <div className="centered-container flex-row">
                <div id="map" className="mr-4 rounded-full" style={{ width: '700px', height: '450px' }} />

                {selectedPoint && (
                    <PointDetails
                        details={selectedPoint}
                        onClose={() => setSelectedPoint(null)}
                        className="ml-4" // Adjust the size as needed
                    />
                )}
            </div>
        </div>
    );

};

export default Map;
