import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStye = {
    width: "100%",
    height: "500px"
};

export function MapWithMarker({ onLocationChange }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    const [center, setCenter] = useState({ lat: -12.9714, lng: -38.5014 });
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const userLocation = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    };
                    setCenter(userLocation);
                    setMarker(userLocation);
                    if (onLocationChange) onLocationChange(userLocation);
                }
            );
        }
    }, [onLocationChange]);

    const handleMapClick = (e) => {
        const newPosition = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        setMarker(newPosition);
        if (onLocationChange) onLocationChange(newPosition);
    };

    if (!isLoaded) return <p>Carregando...</p>;

    return (
            <GoogleMap
                mapContainerStyle={containerStye}
                center={center}
                zoom={17}
                onClick={handleMapClick}
            >
                {marker && <Marker position={marker}/>}
            </GoogleMap>
    );

}
