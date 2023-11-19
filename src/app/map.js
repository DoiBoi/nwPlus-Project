"use client";
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const initializeMap = () => {
  mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

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
