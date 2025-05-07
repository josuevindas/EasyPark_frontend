import React, { useEffect, useState, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/css/MapPage.css';

export const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationInfo, setLocationInfo] = useState('');
  const [nearbyParkings, setNearbyParkings] = useState([]);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización");
      setUserLocation({ lat: -29.379, lng: -136.604 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        await getLocationInfo(location);
      },
      (err) => {
        console.error("Error de geolocalización:", err);
        setError("No se pudo obtener tu ubicación");
        setUserLocation({ lat: -29.379, lng: -136.604 });
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  const getLocationInfo = async (location) => {
    if (!window.google || !window.google.maps) return;

    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          let city = '';
          let province = '';

          for (const component of results[0].address_components) {
            if (component.types.includes('locality')) {
              city = component.long_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
              province = component.long_name;
            }
          }

          setLocationInfo(`${city}, ${province}`);
        }
      });
    } catch (err) {
      console.error("Error en geocodificación inversa:", err);
    }
  };

  useEffect(() => {
    if (!userLocation || !mapRef.current) return;

    const initMap = () => {
      try {
        if (!window.google || !window.google.maps) {
          throw new Error("Google Maps API no está disponible");
        }

        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 14,
          disableDefaultUI: true,
          gestureHandling: "greedy"
        });

        new window.google.maps.Marker({
          position: userLocation,
          map: mapInstance.current,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "white"
          }
        });

        setLoading(false);
      } catch (err) {
        console.error("Error al inicializar el mapa:", err);
        setError("Error al cargar el mapa. Recarga la página.");
        setLoading(false);
      }
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD7hTh2iDt3rt_aHNRp9E-GhJC8JOQKXIc&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        setError("Error al cargar Google Maps");
        setLoading(false);
      };

      window.initMap = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (window.initMap) delete window.initMap;
    };
  }, [userLocation]);

  useEffect(() => {
    if (!userLocation || !window.google || !window.google.maps) return;

    const findNearbyParkings = () => {
      const service = new window.google.maps.places.PlacesService(mapInstance.current);
    
      const request = {
        location: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
        radius: 10000, // 10km
        type: 'parking',
        keyword: 'parqueo'
      };
    
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const parkingsWithDistance = results.map(place => {
            const distance = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              place.geometry.location.lat(),
              place.geometry.location.lng()
            );
    
            // Crear marcador con ícono azul cuadrado
            new window.google.maps.Marker({
              position: place.geometry.location,
              map: mapInstance.current,
              title: place.name,
              icon: {
                path: "M 0 -10 L 10 10 L -10 10 Z",
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: "#2a65c4",
                scale: 1
              }
            });
    
            return {
              id: place.place_id,
              name: place.name,
              distance,
              location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              }
            };
          });
    
          setNearbyParkings(parkingsWithDistance);
        }
      });
    };
    

    findNearbyParkings();
  }, [userLocation]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const focusOnParking = (parking) => {
    mapInstance.current.setCenter(parking.location);
    mapInstance.current.setZoom(16);
  };

  return (
    <div className="map-fullscreen-container">
      {error && (
        <div className="alert alert-danger">
          {error}
          <button onClick={() => setError(null)} className="close">&times;</button>
        </div>
      )}

      {loading && (
        <div className="map-loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando mapa...</span>
          </div>
        </div>
      )}

      <div className="location-info-box">
        <span className="location-text">{locationInfo || "Obteniendo ubicación..."}</span>
        <button className="search-circle-button" aria-label="Buscar" />
      </div>

      {/* Lista de parqueos superpuesta */}
      <div className="parkings-list-container">
        <h5 className="parkings-list-title">Parqueos cercanos </h5>
        <div className="parkings-list">
          {nearbyParkings.length > 0 ? (
            nearbyParkings.map(parking => (
              <div
                key={parking.id}
                className="parking-item"
                onClick={() => focusOnParking(parking)}
              >
                <div className="parking-name">{parking.name}</div>
                <div className="parking-distance">{parking.distance} km</div>
              </div>
            ))
          ) : (
            <div className="no-parkings">No se encontraron parqueos cercanos</div>
          )}
        </div>
      </div>

      {/* Mapa al fondo */}
      <div ref={mapRef} className="map-fullscreen"></div>
    </div>
  );
};
