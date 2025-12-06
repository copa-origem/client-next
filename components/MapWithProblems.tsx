import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { useAuth } from "../hooks/useAuth";
import { useSearchParams } from "next/navigation";


const containerStyle = {
    width: "100%",
    height: "100%",
};

function MapWithProblems() {
    const [center, setCenter] = useState({ lat: -12.9714, lng: -38.5014});
    const [problems, setProblems] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const { user } = useAuth();

    const params = useSearchParams();

    const latParam = params.get("lat");
    const lngParam = params.get("lng");

    const lat = latParam ? parseFloat(latParam) : null;
    const lng = lngParam ? parseFloat(lngParam) : null;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const res = await fetch("http://localhost:5000/get");
                const data = await res.json();
                setProblems(data);
                if (lat && lng) {
                    setCenter({ lat: lat, lng: lng });
                } else if (data.length > 0) {
                    setCenter({ lat: data[0].lat, lng: data[0].lng });
                }
            } catch (error) {
                console.error("Erro ao buscar problemas:", error);
            }
        };

        fetchProblems();
    }, []);

    const vote = async (id, status) => {
        try {
            const token = await user.getIdToken();

            const res = await fetch("http://localhost:5000/vote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ problemId: id, status: status})
            });

            const data = await res.json();
            console.log(data);
            if (!res.ok) throw new Error(data.error);
            
            alert(data.message);
        } catch (error) {
            console.error("Erro: " + error.message);
        }
    }

    if (!isLoaded) return <p>Carregando...</p>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
        >
            {problems.map((p) => (
                <Marker 
                    key={p.id}
                    position={{ lat: p.lat, lng: p.lng }}
                    title={`${p.type} - ${p.description}`}
                    onMouseOver={() => setActiveMarker(p.id)}
                    onClick={() => setActiveMarker(p.id)}
                >
                {activeMarker === p.id && (
                    <InfoWindow
                        position={{ lat: p.lat, lng: p.lng }}
                        onCloseClick={() => setActiveMarker(null)}                    
                    >
                        <div>
                            <>
                            <p><b>{p.type}</b></p>
                            <p>{p.description}</p>
                            {p.imageUrl && (
                                <img 
                                    src={p.imageUrl} 
                                    alt={p.description}
                                    style={{ width: "100%", borderRadius: "5px"}} 
                                />
                            )}
                            { user ? (
                                <>
                                <button onClick={() => vote(p.id, "exists")}>Problema ainda existente</button>
                                <button onClick={() => vote(p.id, "not_exists")}>Problema não existente {p.votes_not_exists}/3</button>
                                </>
                            ) : (
                                <>
                                <p>Você deve estar logado para poder votar!</p>
                                </>
                            )}
                            </>
                        </div>
                    </InfoWindow>
                )}
                </Marker>
            ))}
        </GoogleMap>
    );
}

export default MapWithProblems;