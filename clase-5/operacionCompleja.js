process.on('message', (mensaje) => {
    let result = 0
    for(let i = 0; i<5e9; i++) {
        result += i
    }
    console.log(mensaje);
    console.log("proceso hijo", process.pid)
    process.send(result)
})
