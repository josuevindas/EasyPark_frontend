import { Link } from "react-router-dom";
import logo from '../assets/img/logo-easyPark.jpeg';
import '../assets/css/Layout.css';
import { useState, useEffect } from "react";

export const Layout = ({ children, isLoggedIn }) => {

    // Estado para mostrar Modal de confirmación u error
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [rolUsuario, setRolUsuario] = useState(null);
    // Valores para el propio modal
    const [confirm, setConfirm] = useState({ type: '', message: '' });

    const [dataCurrentStep, setDataCurrentStep] = useState('');
     useEffect(() => {
        const tipoUsuario = localStorage.getItem("rol");
        
        setRolUsuario(tipoUsuario);
       
    }, []);
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

    return (
        <div className="Layout-top">
            <header>
                <nav>
                    <div style={{ display: 'flex' }}>
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
                    </div>
                    <Link to='/about'>Acerca de nosotros</Link>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
};