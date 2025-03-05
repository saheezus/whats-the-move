import React, { useEffect, useRef, useState } from 'react';

const MapComponent = () => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (mapRef.current && !map) {
            const mapInstance = new window.google.maps.Map(mapRef.current, {
                zoom: 7,
                center: { lat: 47.6, lng: -122 },
            });
            setMap(mapInstance);
        }
    }, [map]);
    
    return (
        <div ref={mapRef} style={{width: '60vw', height: '80vh', borderRadius: '0.5rem'}} />
    )
}

export default MapComponent;