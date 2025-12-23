"use client"
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { useAuth } from "../hooks/useAuth";
import { useSearchParams } from "next/navigation";


const containerStyle = {
    width: "100%",
    height: "100%",
};

function MapWithProblemsContent() {
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
                const res = await fetch("http://20.63.25.230:3000/problems/map");
                const data = await res.json();
                setProblems(data);
                if (lat && lng) {
                    setCenter({ lat: lat, lng: lng });
                } else if (data.length > 0) {
                    setCenter({ lat: data[0].latitude, lng: data[0].longitude });
                }
            } catch (error) {
                console.error("Erro ao buscar problemas:", error);
            }
        };

        fetchProblems();
    }, []);

    const vote = async (id, type) => {
        try {
            const token = await user.getIdToken();

            const res = await fetch("http://20.63.25.230:3000/votes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ problemId: id, type: type})
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            
            alert("Voto Registrado com sucesso!");
        } catch (error) {
            alert(error.message)
            console.error("Erro:", error);
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
                    position={{ lat: p.latitude, lng: p.longitude }}
                    title={`${p.issueType.title} - ${p.description}`}
                    onMouseOver={() => setActiveMarker(p.id)}
                    onClick={() => setActiveMarker(p.id)}
                >
                {activeMarker === p.id && (
                    <InfoWindow
                        position={{ lat: p.latitude, lng: p.longitude }}
                        onCloseClick={() => setActiveMarker(null)}                    
                    >
                        <div>
                            <>
                            <p><b>{p.issueType.title}</b></p>
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
                                <button style={{ cursor: "pointer" }} onClick={() => vote(p.id, "CONFIRMATION")}>Problema ainda existente</button>
                                <br/>
                                <button style={{ cursor: "pointer" }} onClick={() => vote(p.id, "NON_EXISTENT")}>Problema não existente {p.votesNotExistsCount}/3</button>
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

export default MapWithProblemsContent;