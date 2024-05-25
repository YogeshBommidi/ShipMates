// src/MapComponent.js
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const FitBounds = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);

  return null;
};

const MapComponent = ({ fromAddress, toAddress }) => {
  const [addresses, setAddresses] = useState({
    fromAddress: `${fromAddress}`,
    toAddress: `${toAddress}`,
  });
  const [coords, setCoords] = useState({ start: null, end: null });

  useEffect(() => {
    if (addresses.fromAddress && addresses.toAddress) {
      // Geocode addresses
      const geocodeAddress = async (address) => {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        return response.data[0];
      };

      Promise.all([
        geocodeAddress(addresses.fromAddress),
        geocodeAddress(addresses.toAddress),
      ])
        .then((results) => {
          setCoords({
            start: {
              lat: parseFloat(results[0].lat),
              lng: parseFloat(results[0].lon),
            },
            end: {
              lat: parseFloat(results[1].lat),
              lng: parseFloat(results[1].lon),
            },
          });
        })
        .catch((error) => {
          console.error("Error geocoding addresses:", error);
        });
    }
  }, [addresses]);

  const position = [20.5937, 78.9629]; // Center of India
  const bounds = coords.start && coords.end ? [
    [coords.start.lat, coords.start.lng],
    [coords.end.lat, coords.end.lng]
  ] : [];

  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{ height: "17.5rem", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {coords.start && <Marker position={coords.start} />}
      {coords.end && <Marker position={coords.end} />}
      {bounds.length > 0 && <FitBounds bounds={bounds} />}
    </MapContainer>
  );
};

export default MapComponent;
