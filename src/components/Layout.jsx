// ModernLayout.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/img/logo-easyPark.jpeg";
import "../assets/css/Layout.css";
import { useState, useEffect } from "react";
import { FaUserCircle, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { handleLogout, handleNavLinkClick, toggleMenu } from "../handlers/LayoutHandlers";

export const Layout = ({ children, isLoggedIn }) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [rolUsuario, setRolUsuario] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [reservasPendientes, setReservasPendientes] = useState(0);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const token = localStorage.getItem("easypark_token");
    if (!token) return;
    const obtenerRolYPendientes = async () => {
      try {
        const tipoUsuario = localStorage.getItem("rol");
        setRolUsuario(tipoUsuario);
        const token = localStorage.getItem("easypark_token");
        if (!token) return;

        let url = "";
        if (tipoUsuario === "cliente") {
          const idUsuario = localStorage.getItem("iduser");
          url = `${import.meta.env.VITE_API_URL}/api/propiedades/usuario/${idUsuario}/pendientes`;
        } else if (tipoUsuario === "propietario") {
          const idUsuario = localStorage.getItem("iduser");
          url = `${import.meta.env.VITE_API_URL}/api/propiedades/pendientes/${idUsuario}`;
        }

        if (url) {
          const res = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          setReservasPendientes(data.total || data.length || 0);
        }
      } catch (err) {
        console.error("Error al obtener rol o reservas pendientes:", err);
      }
    };
    obtenerRolYPendientes();
  }, [location]);

  return (
    <div className="layout">
      <header className="navbar-container">
        {menuOpen && <div className="menu-overlay" onClick={() => toggleMenu(setMenuOpen)}></div>}
        <nav className="navbar">
          <Link to={rolUsuario ? "/Bienvenida" : "/"} className="logo-container">
            <img src={logo} alt="EasyPark Logo" className="logo-img" />
            <span className="logo-text">EasyPark</span>
          </Link>

          <button className="navbar-toggler" onClick={() => toggleMenu(setMenuOpen)}>
            ☰
          </button>

          <div className={`navbar-menu ${menuOpen ? "show" : ""}`}>
            <ul>
              {rolUsuario === "Admin" && (
                <>
                  <li><Link to="/Adm" onClick={() => handleNavLinkClick(setMenuOpen)}>Registrar Parqueos</Link></li>
                  <li><Link to="/AdmPendientes" onClick={() => handleNavLinkClick(setMenuOpen)}>Pendientes</Link></li>
                </>
              )}
              {rolUsuario === "propietario" && (
                <>
                  <li><Link to="/Adm" onClick={() => handleNavLinkClick(setMenuOpen)}>Registrar Parqueos</Link></li>
                  <li><Link to="/MisPropiedades" onClick={() => handleNavLinkClick(setMenuOpen)}>Editar Propiedades</Link></li>
                  <li>
                    <Link to="/AdmReservas" onClick={() => handleNavLinkClick(setMenuOpen)} className={reservasPendientes > 0 ? "text-danger" : ""}>
                      Administrar Reservas
                      {reservasPendientes > 0 && <span className="badge">{reservasPendientes}</span>}
                    </Link>
                  </li>
                </>
              )}
              {rolUsuario === "cliente" && (
                <>
                  <li>
                    <Link to="/ReservasPage" onClick={() => handleNavLinkClick(setMenuOpen)} className={reservasPendientes > 0 ? "text-danger" : ""}>
                      Reservas
                      {reservasPendientes > 0 && <span className="badge">{reservasPendientes}</span>}
                    </Link>
                  </li>
                  <li><Link to="/Comentario" onClick={() => handleNavLinkClick(setMenuOpen)}>Reseña</Link></li>
                  <li><Link to="/map" onClick={() => handleNavLinkClick(setMenuOpen)}>Reservar</Link></li>
                </>
              )}
              {!rolUsuario && (
                <>
                  <li><Link to="/Login" onClick={() => handleNavLinkClick(setMenuOpen)}><FaSignInAlt /> Iniciar sesión</Link></li>
                  <li><Link to="/Registrar" onClick={() => handleNavLinkClick(setMenuOpen)}><FaUserPlus /> Crear cuenta</Link></li>
                </>
              )}
              {rolUsuario && (
                <>
                  <li><Link to="/EditarUsuario" onClick={() => handleNavLinkClick(setMenuOpen)}><FaUserCircle /> Perfil</Link></li>
                  <li><button className="logout-btn" onClick={() => { handleNavLinkClick(setMenuOpen); handleLogout(navigate, setRolUsuario); }}>Cerrar sesión</button></li>
                </>
              )}
              <li><Link to="/about" onClick={() => handleNavLinkClick(setMenuOpen)}>Acerca de nosotros</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
};
