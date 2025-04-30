import '../assets/css/Modal.css'


const Titles = {
    success: 'Exito',
    error: 'Error',
    warning: 'Alerta',
    confirm: 'Confirmar',
    cancel: 'Cancelar'
}


export const Alert = ({ type, message, onClose }) => {
    if (!type || !message) return null;

    return (

        <div className="overlay">
            <div className="alert">
                <h>Icon</h>
                <div className="title">{Titles[type]}</div>
                <div className="message">{message}</div>
                <div className="wrapper-buttons">
                    <button className="" onClick={onClose}>
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    )

}

export const Confirm = ({ type, message, onConfirm, onClose }) => {
    if (!message) return null;

    return (
        <div className="overlay">
            <div className="alert">
                <h>Icon</h>
                <div className="title">{Titles[type]}</div>
                <div className="message">{message}</div>
                <div className="wrapper-buttons">
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}