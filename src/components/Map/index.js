import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet library for creating custom icons
import "leaflet/dist/leaflet.css";
import "./index.css";
import customIconUrl from "../../assets/location.png";

const Map = () => {
  const lat = JSON.parse(localStorage.getItem("lat"));
  const lon = JSON.parse(localStorage.getItem("lon"));

  // Define custom icon
  const customIcon = L.icon({
    iconUrl: customIconUrl,
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  });

  return (
    <MapContainer center={[lat, lon]} zoom={5} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <TileLayer
        url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=6c4491a211373a20beee56bb95b1c85d"
        attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
      />
      {/* Marker component with custom icon */}
      <Marker position={[lat, lon]} icon={customIcon}>
        {/* Optional: Popup */}
        <Popup>
          A marker with a custom icon at [{lat.toFixed(4)}, {lon.toFixed(4)}]
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
