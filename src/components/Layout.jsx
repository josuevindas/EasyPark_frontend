import { Link } from "react-router-dom";

import '../assets/css/Layout.css';


export const Layout=({children})=>{
    return(
        <div className="Layout-top">
            <nav>
                <Link to='/'>Inicio</Link>
                <Link to='/about'>Acerca de nosotros</Link>
            </nav>
            <main>{children}</main>
        </div>
    )
}