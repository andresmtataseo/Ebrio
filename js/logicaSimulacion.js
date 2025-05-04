function simulacion_caminata() {
    const canvas = document.getElementById("pagina");
    const ctx = canvas.getContext("2d");
    const ComienzoX = canvas.width / 2;
    const ComienzoY = canvas.height / 2;
    let x = ComienzoX, y = ComienzoY;
    const pasos = 10;
    const pasoSize = 20;
    let PasosFaltantes = pasos;

    function drawGrid() {
        ctx.strokeStyle = "#ccc"; 
        ctx.lineWidth = 1;

        for (let i = 0; i <= canvas.width; i += pasoSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }

        for (let i = 0; i <= canvas.height; i += pasoSize) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid()

    ctx.beginPath();
    ctx.moveTo(ComienzoX - 5, ComienzoY - 5);
    ctx.lineTo(ComienzoX + 5, ComienzoY + 5);
    ctx.moveTo(ComienzoX + 5, ComienzoY - 5);
    ctx.lineTo(ComienzoX - 5, ComienzoY + 5);
    ctx.strokeStyle = "red";
    ctx.stroke();

    ctx.fillStyle = "#002fff";
    ctx.fillRect(x - 5, y - 5, 10, 10);

    const intervalo = setInterval(() => {
        const direccion = Math.floor(Math.random() * 4);

        switch (direccion) {
            case 0:
                y -= pasoSize; // Norte
                break;
            case 1:
                y += pasoSize; // Sur
                break;
            case 2:
                x += pasoSize; // Este
                break;
            case 3:
                x -= pasoSize; // Oeste
                break;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();

        ctx.beginPath();
        ctx.moveTo(ComienzoX - 5, ComienzoY - 5);
        ctx.lineTo(ComienzoX + 5, ComienzoY + 5);
        ctx.moveTo(ComienzoX + 5, ComienzoY - 5);
        ctx.lineTo(ComienzoX - 5, ComienzoY + 5);
        ctx.strokeStyle = "red";
        ctx.stroke();

        ctx.fillStyle = "#002fff";
        ctx.fillRect(x - 5, y - 5, 10, 10);

        if (--PasosFaltantes === 0) {
            clearInterval(intervalo);

            const distancia = Math.abs(x - canvas.width / 2) / pasoSize + Math.abs(y - canvas.height / 2) / pasoSize;
            let respuesta = distancia === 2 ? "El ebrio acabó a dos calles del punto donde inició." : `El ebrio no terminó a dos calles del punto donde inició.`;
            const respuestaElement = document.getElementById("respuesta");
            respuestaElement.innerText = respuesta;

            const simulaciones = 1000;
            let cuentaExitos = 0;

            for (let i = 0; i < simulaciones; i++) {
                let sx = 0, sy = 0;

                for (let j = 0; j < pasos; j++) {
                    const dir = Math.floor(Math.random() * 4);

                    switch (dir) {
                        case 0:
                            sy++; // Norte
                            break;
                        case 1:
                            sy--; // Sur
                            break;
                        case 2:
                            sx++; // Este
                            break;
                        case 3:
                            sx--; // Oeste
                            break;
                    }
                }

                const dist = Math.abs(sx) + Math.abs(sy);
                if (dist === 2) {
                    cuentaExitos++;
                }
            }

            const probabilidad = (cuentaExitos / simulaciones) * 100;
            const probabilidadMensaje = document.createElement('p');
            probabilidadMensaje.innerText = `La probabilidad es de ${probabilidad.toFixed(2)}%.`;
            respuestaElement.appendChild(probabilidadMensaje);

            if (distancia !== 2) {
                const distanciaMensaje = document.createElement('p');
                distanciaMensaje.innerText = `El ebrio se encuentra a ${distancia} calles.`;
                respuestaElement.appendChild(distanciaMensaje);
            }
        }
    }, 500);
}