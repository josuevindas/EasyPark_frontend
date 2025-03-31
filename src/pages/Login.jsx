import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import '../assets/css/Login.css'


export const Login = () => {

    const [errors, setErrors] = useState();

    const [alertCustom, setAlertCustom] = useState();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleLogin = (formData) => {

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
                                <img src="/src/assets/img/logo-easyPark.jpeg" alt="Logo"  className="logo"/>
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )



}