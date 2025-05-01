import { Link } from "react-router-dom";
import logo from '../assets/img/logo-easyPark.jpeg';
import '../assets/css/Layout.css';
import { useState } from "react";


export const Layout=({children})=>{

    //Estado para mostrar Modal de confirmacion u error
    const [isVisibleModal, setIsVisibleModal]=useState(false);
    //Valores para el propio modal
    const[confirm, setConfirm]=useState({type:'',message:''})


    const [dataCurrentStep, setDataCurrentStep] = useState('');

    // Function to update state with data from the child
    const HandleCurrentStep = (data) => {
        setDataCurrentStep(data);
    };

    const ShowConfirm=()=>{
        setConfirm({type:'confirm', message:'Confirmando todo mi lord..'})
        setIsVisibleModal(true);
    }

    const CloseConfirm = () => {
        setIsVisibleModal(false);
    }

    return (
        <div className="Layout-top">
            <header>
                <nav>
                <div style={{ display: 'flex' }}> 
                    <Link to="/" className="logo-container">
                        <img 
                        src={logo} 
                        alt="EasyPark Logo"
                        className="logo-img" // Clase para el logo
                        />
                        <span className="logo-text">EasyPark</span>
                    </Link>
                    <Link to='/'>Inicio</Link>
                    <Link to='/registro'>Registro</Link>
                </div>
                    <Link to='/about'>Acerca de nosotros</Link>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    )
}