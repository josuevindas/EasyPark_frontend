import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import '../assets/css/Login.css'
import { Alert, Confirm } from "../components/ModalAlert";


export const Login = () => {

    const [errors, setErrors] = useState();

    const [alertCustom, setAlertCustom] = useState({ type: '', message: '' });

    //const [alertVisible, setAlertVisible] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        estado: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('d:', formData.username)
        if (formData.username && formData.password) {
            setAlertCustom({
                type: 'confirm',
                message: 'Esta seguro que quiere ingresar?'
            });
        } else {
            setAlertCustom({
                type: 'error',
                message: 'Complete todos los campos'
            });
        }
    };

    const handleCloser = () => {
        setAlertCustom({ type: '', message: '' })
    }




    return (
        <div className="Fondo" data-theme='default'>
            <div className="container">
                {/* <div className="logo-flotante">
                    <img src="" alt='Logo'></img>
                </div> */}
                <div className="wrapper-login">
                    <form onSubmit={handleLogin}>
                        <div className="form">
                            <div className="form-group text-center">
                                <img src="/src/assets/img/logo-easyPark.jpeg" alt="Logo" className="logo" />
                            </div>
                            <div className="form-group text-center mt-3">
                                <span className="spanLog">Login</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                {/*<span className="badge bg-danger">{errors.username}</span>*/}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {/*<span className="badge bg-danger">{errors.username}</span>*/}
                            </div>
                            <div className="form-group mt-4 text-center">
                                <button type="submit" className="">Enter</button>
                              {/*<Alert type={alertCustom.type}
                                   //    message={alertCustom.message}
                                  //     onClose={handleCloser}> 
                                </Alert>*/}
                                <Confirm type={alertCustom.type}
                                         message={alertCustom.message} 
                                         onConfirm={handleCloser} 
                                         onClose={handleCloser} >
                                </Confirm>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )



}