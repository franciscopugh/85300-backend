import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css"
const Register = () => {
    const formRef = useRef()
    const nav = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            
            //Transformo un form en un objeto iterator
            const formData = new FormData(formRef.current) //Consulto el estado actual del formulario
            
            const userData = Object.fromEntries(formData) //Transformo un objeto iterator en un objeto simple
            
            const response = await fetch('/api/sessions/register', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include", //Recibir cookies de mi servidor
                body: JSON.stringify(userData)
            })

            if(response.status == 201) {
                console.log("Usuario registrado correctamente")
                e.target.reset()
                nav('/login')
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);          
        }
        
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form action="" ref={formRef} onSubmit={handleSubmit} className="p-4 bg-white rounted shadow w-85">
                <h2 className="text-center mb-3">Registro de Usuario</h2>
                <input className="form-control mb-2" type="text" name="first_name" placeholder="First Name"/>
                <input  className="form-control mb-2" type="text" name="last_name" placeholder="Last Name"/>
                <input  className="form-control mb-2" type="number" name="age" placeholder="Age"/>
                <input  className="form-control mb-2" type="email" name="email" placeholder="Email"/>
                <input  className="form-control mb-2" type="password" name="password" placeholder="Password"/>
                <button type="submit" className="btn btn-dark w-100">Registrar Usuario</button>
            </form>
        </div>
        
    );
};

export default Register;