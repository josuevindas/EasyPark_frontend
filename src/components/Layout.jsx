import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-easyPark.jpeg";
import "../assets/css/Layout.css";
import { useState, useEffect } from "react";
import { FaUserCircle, FaSignInAlt, FaUserPlus } from "react-icons/fa";

import { useLocation } from "react-router-dom";
import { handleLogout, handleNavLinkClick, toggleMenu } from "../handlers/LayoutHandlers";
import { Alert, Confirm } from "../components/ModalAlert";

export const Layout = ({ children, isLoggedIn }) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [rolUsuario, setRolUsuario] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState({ type: "", message: "" });
  const [dataCurrentStep, setDataCurrentStep] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // 👉 estado para toggle

  useEffect(() => {
    const tipoUsuario = localStorage.getItem("rol");
    setRolUsuario(tipoUsuario);
  }, [location]);

  

  return (
    
    <div className="Layout-top">
        <header>
            
            {menuOpen && <div className="menu-overlay"  onClick={() => toggleMenu(setMenuOpen)}></div>}

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 ">
             <div className="container-fluid ">
              
            {rolUsuario !== null ? (
                  <Link to="/Bienvenida" className="navbar-brand d-flex align-items-center gap-2">
                    <img src={logo} alt="EasyPark Logo" className="logo-img" />
                    <span className="logo-text">EasyPark</span>
                  </Link>
                ) : (
                  <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                    <img src={logo} alt="EasyPark Logo" className="logo-img" />
                    <span className="logo-text">EasyPark</span>
                  </Link>
                )}


            <button
                className="navbar-toggler"
                type="button"
                onClick={() => toggleMenu(setMenuOpen)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>


            <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto d-flex align-items-center gap-2">
                {rolUsuario === "Admin" && (
                <>
                    <li className="nav-item"><Link className="nav-link" to="/Adm" onClick={() => handleNavLinkClick(setMenuOpen)}>Registrar Parqueos</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/AdmPendientes" onClick={() => handleNavLinkClick(setMenuOpen)}>Pendientes</Link></li>
                </>
                )}
                {rolUsuario === "propietario" && (
                  <>
                <li className="nav-item"><Link className="nav-link" to="/Adm" onClick={() => handleNavLinkClick(setMenuOpen)}>Registrar Parqueos</Link></li>
               <li className="nav-item"><Link className="nav-link" to="/MisPropiedades" onClick={() => handleNavLinkClick(setMenuOpen)}>Editar Propiedades</Link></li>
               
                </>
                )}
                {rolUsuario === "cliente" && (
                  <>
                <li className="nav-item"><Link className="nav-link" to="/map" onClick={() => handleNavLinkClick(setMenuOpen)}>Reservar</Link></li>
               
                </>
                )}
                {rolUsuario === null && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link d-flex align-items-center gap-1" to="/Login" onClick={() => handleNavLinkClick(setMenuOpen)} title="Iniciar sesión">
                        <FaSignInAlt />
                        <span className="d-none d-lg-inline">Iniciar sesión</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link d-flex align-items-center gap-1" to="/Registrar" onClick={() => handleNavLinkClick(setMenuOpen)} title="Crear cuenta">
                        <FaUserPlus />
                        <span className="d-none d-lg-inline">Crear cuenta</span>
                      </Link>
                    </li>
                  </>
                )}

                {rolUsuario && (
                  <> 
                  <li className="nav-item">
                      <Link className="nav-link d-flex align-items-center gap-1" to="/EditarUsuario" onClick={() => handleNavLinkClick(setMenuOpen)}>
                        <FaUserCircle size={18} />
                        Editar perfil
                      </Link>
                    </li>
                <li className="nav-item">
                   <button
                      className="btn btn-outline-light btn-sm"
                      onClick={() => {
                        handleNavLinkClick(setMenuOpen);
                        handleLogout(navigate, setRolUsuario);
                      }}
                    >
                      🔒 Cerrar sesión
                    </button>

                </li>
              </>
                )}
                <li className="nav-item"><Link className="nav-link" to="/about" onClick={() => handleNavLinkClick(setMenuOpen)}>Acerca de nosotros</Link></li>
                
            </ul>
            </div>
        </div>
        </nav>

      </header>
      <main>{children}</main>
    </div>
  );
};
