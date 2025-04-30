import { Link } from "react-router-dom";

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
                    <Link to='/'>Inicio</Link>
                    <Link to='/about'>Acerca de nosotros</Link>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    )
}