import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/img/logo-easyPark.jpeg';
import '../assets/css/Layout.css';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Layout = ({ children, isLoggedIn }) => {
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [rolUsuario, setRolUsuario] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const [confirm, setConfirm] = useState({ type: '', message: '' });
    const [dataCurrentStep, setDataCurrentStep] = useState('');

    useEffect(() => {
        const tipoUsuario = localStorage.getItem("rol");
        setRolUsuario(tipoUsuario);
    }, [location]);

    const HandleCurrentStep = (data) => {
        setDataCurrentStep(data);
    };

    const ShowConfirm = () => {
        setConfirm({ type: 'confirm', message: 'Confirmando todo mi lord..' });
        setIsVisibleModal(true);
    };

    const CloseConfirm = () => {
        setIsVisibleModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Elimina token
        localStorage.removeItem("rol");   // Elimina rol
        setRolUsuario(null);              // Actualiza estado local
        navigate("/");                    // Redirige a inicio
    };

    return (
        <div className="Layout-top">
            <header>
                <nav>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to="/" className="logo-container">
                            <img
                                src={logo}
                                alt="EasyPark Logo"
                                className="logo-img"
                            />
                            <span className="logo-text">EasyPark</span>
                        </Link>

                        {rolUsuario === "Admin" && (
                            <>
                                <Link to='/Adm'>Registrar Parqueos/Garajes</Link>
                                <Link to='/AdmPendientes'>Pendientes</Link>
                            </>
                        )}

                        {rolUsuario === "propietario" && (
                            <>
                                <Link to='/Adm'>Registrar Parqueos/Garajes</Link>
                            </>
                        )}

                        {rolUsuario === null && (
                            <Link to='/Registrar'>Registro</Link>
                        )}

                        {rolUsuario && (
                            <button onClick={handleLogout} className="logout-button">
                                🔒 Cerrar sesión
                            </button>
                        )}
                    </div>
                    <Link to='/about'>Acerca de nosotros</Link>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
};
