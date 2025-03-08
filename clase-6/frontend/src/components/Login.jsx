import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
const Login = () => {
    const formRef = useRef()
    const nav = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
    
            const formData = new FormData(formRef.current) 
            
            const userData = Object.fromEntries(formData) 
            
            const response = await fetch('/api/sessions/login', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include", //Recibir cookies de mi servidor
                body: JSON.stringify(userData)
            })

            if(response.status == 200) {
                console.log("Usuario logueado correctamente")
                e.target.reset()
                nav('/')
            } else {
                console.log(response);
            }

        } catch (error) {
            console.log(error);
        }    
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form action="" ref={formRef} onSubmit={handleSubmit} className="p-4 bg-white rounted shadow w-40">
                <h2 className="text-center mb-3">Login de Usuario</h2>
                <input  className="form-control mb-2" type="email" name="email" placeholder="Email"/>
                <input  className="form-control mb-2" type="password" name="password" placeholder="Password"/>
                <button type="submit" className="btn btn-dark w-100">Iniciar Sesion</button>
            </form>
        </div>
    );
};

export default Login;