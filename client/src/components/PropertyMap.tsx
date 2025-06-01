import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
const defaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

type PropertyMapProps = {
  center: [number, number];
  zoom: number;
  propertyLocation: [number, number];
  propertyTitle: string;
};

const PropertyMap = ({ center, zoom, propertyLocation, propertyTitle }: PropertyMapProps) => {
  useEffect(() => {
    // Initialize the map only on client-side
    const map = L.map('map').setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add property marker
    const marker = L.marker(propertyLocation, { icon: defaultIcon }).addTo(map);
    marker.bindPopup(`<b>${propertyTitle}</b><br>Property Location`).openPopup();

    return () => {
      map.remove();
    };
  }, [center, zoom, propertyLocation, propertyTitle]);

  return <div id="map" style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }} />;
};

export default PropertyMap;