import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-easyPark.jpeg";
import "../assets/css/Layout.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setRolUsuario(null);
    navigate("/");
  };
  const handleNavLinkClick = () => {
    console.log("Cerrando menú...");
    setMenuOpen(false);
    };

  return (
    
    <div className="Layout-top">
        <header>
            
            {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 ">
             <div className="container-fluid ">
            <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <img src={logo} alt="EasyPark Logo" className="logo-img" />
            <span className="logo-text">EasyPark</span>
            </Link>

            <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            >
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto d-flex align-items-center gap-2">
                {rolUsuario === "Admin" && (
                <>
                    <li className="nav-item"><Link className="nav-link" to="/Adm" onClick={handleNavLinkClick}>Registrar Parqueos</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/AdmPendientes" onClick={handleNavLinkClick}>Pendientes</Link></li>
                </>
                )}
                {rolUsuario === "propietario" && (
                <li className="nav-item"><Link className="nav-link" to="/Adm" onClick={handleNavLinkClick}>Registrar Parqueos</Link></li>
                )}
                {rolUsuario === null && (
                <li className="nav-item"><Link className="nav-link" to="/Registrar" onClick={handleNavLinkClick}>Registro</Link></li>
                )}
                <li className="nav-item"><Link className="nav-link" to="/about" onClick={handleNavLinkClick}>Acerca de nosotros</Link></li>
                {rolUsuario && (
                <li className="nav-item">
                   <button
                      className="btn btn-outline-light btn-sm"
                      onClick={() => {
                        handleNavLinkClick();
                        handleLogout();
                      }}
                    >
                      🔒 Cerrar sesión
                    </button>

                </li>
                )}
            </ul>
            </div>
        </div>
        </nav>

      </header>
      <main>{children}</main>
    </div>
  );
};
