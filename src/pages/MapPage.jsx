import React, { useEffect, useState, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/css/MapPage.css';
import garajeimg from "../assets/img/garage.png";
import parqueoimg from "../assets/img/parking.png";
import { Alert, Confirm } from '../components/ModalAlert';


export const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationInfo, setLocationInfo] = useState('');
  const [nearbyParkings, setNearbyParkings] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);
  const [mostrarLista, setMostrarLista] = useState(true);
const [showConfirm, setShowConfirm] = useState(false);

const [duracionViaje, setDuracionViaje] = useState('');
  const [formData, setFormData] = useState({
    origin: '',
    destination: ''
  });
  const [userModifiedOrigin, setUserModifiedOrigin] = useState(false);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const directionsRenderer = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización");
      setUserLocation({ lat: 10.003649986156336 , lng: -84.14259788597299 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
      },
      (err) => {
        console.error("Error de geolocalización:", err);
        setError("No se pudo obtener tu ubicación");
        setUserLocation({ lat: 10.003649986156336 , lng: -84.14259788597299 });
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      getLocationInfo(userLocation);
      console.log("📍 Mi ubicación actual es:", userLocation);
    }
  }, [userLocation]);

  const calcularDuracion = (origen, destino) => {
  const service = new window.google.maps.DirectionsService();
  service.route({
    origin: origen,
    destination: destino,
    travelMode: 'DRIVING'
  }, (result, status) => {
    if (status === 'OK') {
      const duracion = result.routes[0].legs[0].duration.text;
      setDuracionViaje(duracion);
    } else {
      setDuracionViaje('No disponible');
    }
  });
};

  const getLocationInfo = async (location) => {
    if (!window.google || !window.google.maps) return;

    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const formatted = results[0].formatted_address;
          if (!userModifiedOrigin) {
            setFormData((prev) => ({ ...prev, origin: formatted }));
          }

          let district = '';
          let province = '';

          for (const component of results[0].address_components) {
            if (component.types.includes('sublocality') || component.types.includes('administrative_area_level_2')) {
              district = component.long_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
              province = component.long_name;
            }
          }

          if (district || province) {
            setLocationInfo(`${district}${district && province ? ', ' : ''}${province}`);
          } else {
            setLocationInfo('Ubicación desconocida');
          }
        } else {
          if (!userModifiedOrigin) {
            setFormData((prev) => ({ ...prev, origin: 'Ubicación desconocida' }));
          }
          setLocationInfo('Ubicación desconocida');
        }
      });
    } catch (err) {
      console.error("Error en geocodificación inversa:", err);
      if (!userModifiedOrigin) {
        setFormData((prev) => ({ ...prev, origin: 'Ubicación desconocida' }));
      }
      setLocationInfo('Ubicación desconocida');
    }
  };

  useEffect(() => {
    if (!userLocation || !mapRef.current) return;

    const initMap = async () => {
      try {
        if (!window.google || !window.google.maps) {
          throw new Error("Google Maps API no está disponible");
        }

        await window.google.maps.importLibrary("marker");

        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 14,
          disableDefaultUI: true,
          gestureHandling: "greedy",
          mapId: 'f145ef9e17dfd1237ec834e9' 
        });

        const { AdvancedMarkerElement } = window.google.maps.marker;
        const userIcon = document.createElement('div');
        userIcon.style.width = '40px';
        userIcon.style.height = '40px';
        userIcon.style.borderRadius = '50%';
        userIcon.style.backgroundColor = '#4285F4';
        userIcon.style.border = '2px solid white';

        new AdvancedMarkerElement({
          map: mapInstance.current,
          position: userLocation,
          title: "Tu ubicación",
          content: userIcon
        });

        setLoading(false);
        findNearbyParkings();

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
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD7hTh2iDt3rt_aHNRp9E-GhJC8JOQKXIc&libraries=places&callback=initMap&loading=async`;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "origin") setUserModifiedOrigin(true);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearch = () => {
    if (!formData.destination || !mapInstance.current) return;

    const service = new window.google.maps.places.PlacesService(mapInstance.current);
    const request = {
      query: formData.destination,
      fields: ['name', 'geometry']
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
        const location = results[0].geometry.location;
        mapInstance.current.setCenter(location);
        mapInstance.current.setZoom(16);
        setUserLocation({ lat: location.lat(), lng: location.lng() });
        setShowSearchModal(false);
      }
    });
  };
const handleMarkerClick = (parking) => {
  setSelectedParking(parking);
  calcularDuracion(userLocation, { lat: parking.latitud, lng: parking.longitud });
};

  const findNearbyParkings = async () => {
    if (!userLocation) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/propiedades/cercanas`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('easypark_token')}`
        }
      });

      const data = await response.json();
      console.log("Datos de parqueos cercanos:", data);
      const { AdvancedMarkerElement } = window.google.maps.marker;

      const cercanos = data
        .map(parking => {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            parking.latitud,
            parking.longitud
          );

          if (distance <= 10) {
            const iconUrl = parking.tipo === 'Garaje'
              ? garajeimg
              : parqueoimg;
           
            const img = document.createElement('img');
            img.src = iconUrl;
            img.style.width = '40px';
            img.style.height = '40px';

            new AdvancedMarkerElement({
              map: mapInstance.current,
              position: { lat: parking.latitud, lng: parking.longitud },
              title: parking.nombre ?? 'Garaje',
              content: img
            });

            return {
              id: parking.id,
              name: parking.nombre,
              tipo: parking.tipo,
              distance,
              location: {
                lat: parking.latitud,
                lng: parking.longitud
              }
            };
          }
          return null;
        })
        .filter(p => p !== null);

      setNearbyParkings(cercanos);
    } catch (err) {
      console.error("Error al buscar parqueos:", err);
      setError("No se pudieron cargar parqueos cercanos");
    }
  };

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
    if (!mapInstance.current || !window.google || !userLocation) return;

    if (directionsRenderer.current) {
      directionsRenderer.current.setMap(null);
      directionsRenderer.current = null;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsRenderer.current = new window.google.maps.DirectionsRenderer({
      map: mapInstance.current,
      suppressMarkers: false
    });

    const origin = new window.google.maps.LatLng(userLocation.lat, userLocation.lng);
    const destination = new window.google.maps.LatLng(parking.location.lat, parking.location.lng);

    const request = {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.current.setDirections(result);
      } else {
        console.error("No se pudo obtener la ruta:", status);
      }
    });

    mapInstance.current.setCenter(destination);
    mapInstance.current.setZoom(15);
  };

  const handleReservar = async () => {
  setShowConfirm(true); // Mostrar el modal personalizado
};

const confirmarReserva = async () => {
  setShowConfirm(false); // Cerrar el modal

  const token = localStorage.getItem("easypark_token");
  const usuario_id = localStorage.getItem("id_usuario");

  const body = {
    usuario_id,
    fecha_reserva: new Date().toISOString().split("T")[0],
    hora_reserva: new Date().toTimeString().split(" ")[0].slice(0,5),
    estado: 'pendiente'
  };

  if (selectedParking.tipo === "Garaje") {
    body.garaje_id = selectedParking.id;
  } else {
    body.estacionamiento_id = selectedParking.id;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error("Error al reservar");
    alert("Reserva enviada correctamente");
    setSelectedParking(null);
    setMostrarLista(true);
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al reservar.");
  }
};

  const focusIfTooFar = () => {
    if (!mapInstance.current || !userLocation) return;

    const center = mapInstance.current.getCenter();
    const centerLat = center.lat();
    const centerLng = center.lng();

    const distance = calculateDistance(
      centerLat,
      centerLng,
      userLocation.lat,
      userLocation.lng
    );

    if (distance > 1) {
      mapInstance.current.setCenter(userLocation);
      mapInstance.current.setZoom(16);
    }
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
        <button className="search-circle-button" onClick={() => setShowSearchModal(true)} aria-label="Buscar" />
      </div>

      {showSearchModal && (
        <div className="modal-overlay">
          <div className="reserve-wrapper">
            <form className="reserve-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="origin">¿Dónde está?</label>
                <input
                  type="text"
                  name="origin"
                  id="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="destination">¿A dónde va?</label>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Buscar</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowSearchModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedParking && (
        <div className="info-panel bg-light p-3 shadow rounded position-absolute" style={{ bottom: 20, left: 20, zIndex: 1000, width: window.innerWidth <= 768 ? '100%' : 'auto' }}>
          <h5>{selectedParking.tipo}</h5>
           <p><strong>Dirección:</strong> {selectedParking.direccion}</p>
          <p><strong>Disponibilidad:</strong> {selectedParking.disponibilidad}</p>
          <p><strong>Duración estimada:</strong> {duracionViaje}</p>
        
          <button className="btn btn-primary mt-2" onClick={handleReservar}>
            Reservar
          </button>
          
         
        {window.innerWidth <= 768 && (
          <button
            className="btn btn-secondary mt-2"
            onClick={() => {
              setSelectedParking(null);
              setMostrarLista(true);
            }}
          >
            Retroceso
          </button>
        )}

        </div>
      )}
    {mostrarLista && (
      <div className="parkings-list-container">
        <h5 className="parkings-list-title">Parqueos cercanos</h5>
        <div className="parkings-list">
          {nearbyParkings.length > 0 ? (
            nearbyParkings.map(parking => (
              <div
                key={parking.id}
                className="parking-item"
                onClick={() => {
                  focusOnParking(parking);
                    setSelectedParking(parking);   // mostrar el panel de reserva
                  calcularDuracion(userLocation, { lat: parking.location.lat, lng: parking.location.lng });
                  if (window.innerWidth <= 768) {
                    setMostrarLista(false);
                  }

                }}
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

        )}

      

      <div ref={mapRef} className="map-fullscreen"></div>
      {showConfirm && (
        <Confirm
          message="¿Está seguro de reservar este parqueo?"
          onConfirm={confirmarReserva}
          onClose={() => setShowConfirm(false)}
        />
      )}

    </div>
  );
};

