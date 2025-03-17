document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById("loginForm")

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault()

        const formData = new FormData(formLogin)

        const userData = Object.fromEntries(formData)

        try {
            const response = await fetch('http://localhost:8080/api/sessions/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })

            const data = await response.json()

            if(data?.message == "Usuario Logueado correctamente") {
                window.location.href = "http://localhost:8080/api/products"
            } else {
                console.log(data);
            }
        } catch(e) {
            console.log(e);
        }
    })
})