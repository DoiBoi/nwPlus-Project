import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import * as fs from "fs";

const initializeMap = () => {
  mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  let washroomsParsed;
  let washrooms;
  if (fs.existsSync("./public/public-washrooms.json")) {
    washrooms = fs.readFileSync("./public/public-washrooms.json")
  }

  if (washrooms) {
    washroomsParsed = new Washroom()

  }


  // Clean up on unmount
  return () => map.remove();
};

const MapLogic = () => {
  useEffect(() => {
    initializeMap();
  }, []); // Run only once on mount

  return <div id="map" style={{ width: '100%', height: '400px' }} />;


};




export default MapLogic;
