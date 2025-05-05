import React, { useEffect, useState, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/css/MapPage.css';
import { Alert } from '../components/ModalAlert';

export const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const mapsLoaded = useRef(false);

  // Obtener ubicación del usuario
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setLoading(false);
          },
          (err) => {
            console.error("Error de geolocalización:", err);
            setError("No se pudo obtener tu ubicación. Mostrando ubicación por defecto.");
            setUserLocation({ lat: -29.379, lng: -136.604 });
            setLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000
          }
        );
      } else {
        setError("Tu navegador no soporta geolocalización. Mostrando ubicación por defecto.");
        setUserLocation({ lat: -29.379, lng: -136.604 });
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  // Cargar e inicializar Google Maps API
  useEffect(() => {
    if (!userLocation || mapsLoaded.current) return;

    // Verificar si la API ya está cargada
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Función global para inicializar el mapa
    window.initMap = initializeMap;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD7hTh2iDt3rt_aHNRp9E-GhJC8JOQKXIc&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setError("Error al cargar Google Maps. Por favor recarga la página.");
      setLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      // Limpieza al desmontar
      delete window.initMap;
      if (markerInstance.current) {
        markerInstance.current.setMap(null);
      }
    };
  }, [userLocation]);

  const initializeMap = () => {
    try {
      // Verificar que todo esté cargado correctamente
      if (!window.google || !window.google.maps || !mapRef.current) {
        throw new Error("Google Maps API no está disponible");
      }

      // Crear instancia del mapa
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 15,
        gestureHandling: 'greedy',
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
      });

      // Crear marcador (usando AdvancedMarkerElement si está disponible)
      if (window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
        markerInstance.current = new window.google.maps.marker.AdvancedMarkerElement({
          map: mapInstance.current,
          position: userLocation,
          title: "Tu ubicación actual"
        });
      } else {
        // Fallback a Marker tradicional
        markerInstance.current = new window.google.maps.Marker({
          position: userLocation,
          map: mapInstance.current,
          title: "Tu ubicación actual"
        });
      }

      mapsLoaded.current = true;
    } catch (err) {
      console.error("Error al inicializar el mapa:", err);
      setError("Error al cargar el mapa. Por favor recarga la página.");
      setLoading(false);
    }
  };

  return (
    <div className="Fondo" data-theme='default'>
      <div className="container">
        <div className="wrapper-map">
          <div className="map-header text-center mb-4">
            <h3 className="spanLog">Tu Ubicación Actual</h3>
          </div>
          
          {error && (
            <Alert type="warning" message={error} onClose={() => setError(null)} />
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando mapa...</span>
              </div>
            </div>
          ) : (
            <div 
              ref={mapRef} 
              id="map" 
              className="map-container"
              style={{ height: '70vh', minHeight: '500px' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};