let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ANCHO_LIMON=20;
const ALTURA_LIMON=20;

let personajeX=canvas.width/2;
let personajeY = canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;
let puntaje=0;
let vidas=3;
let velocidadCaida=300;

// ✨ NUEVO: partículas
let particulas = [];

function iniciar(){
    setInterval(bajarLimon,velocidadCaida);
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}

function dibujarSuelo(){
    ctx.fillStyle="blue";
    ctx.fillRect(0, canvas.height-ALTURA_SUELO, canvas.width, ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="yellow";
    ctx.fillRect(personajeX, personajeY,ANCHO_PERSONAJE , ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();
}

function moverDerecha(){
    personajeX=personajeX+10;
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
    dibujarParticulas(); // ✨ NUEVO
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX, limonY,ANCHO_LIMON,ALTURA_LIMON);
}

function bajarLimon(){
    limonY=limonY+10;
    actualizarPantalla();
    detectarColision();
    detectarPiso();
}

// 💥 MODIFICADO
function detectarColision(){
    if(limonX+ANCHO_LIMON>personajeX && limonX<personajeX+ANCHO_PERSONAJE
         && limonY+ALTURA_LIMON>personajeY && limonY<personajeY+ALTURA_PERSONAJE){
        
        crearEfecto(limonX, limonY); // ✨ partículas
        flashPantalla(); // ⚡ flash
        
        aparecerLimon();
        puntaje=puntaje+1;
        mostrarEnSpan("txtPuntaje", puntaje);
    }
}

function detectarPiso(){
    if(limonY+ALTURA_LIMON==canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarEnSpan("txtVidas",vidas);
    }
}

function aparecerLimon(){
    limonX=generarAleatorio(0, canvas.width-ANCHO_LIMON)
    limonY=0;
    actualizarPantalla();
}

//
// ✨ ===== EFECTOS VISUALES =====
//

// Crear partículas
function crearEfecto(x, y){
    for(let i=0;i<15;i++){
        particulas.push({
            x: x,
            y: y,
            dx: (Math.random()-0.5)*6,
            dy: (Math.random()-0.5)*6,
            vida: 20
        });
    }
}

// Dibujar partículas
function dibujarParticulas(){
    for(let i=particulas.length-1;i>=0;i--){
        let p = particulas[i];

        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        p.vida--;

        if(p.vida <= 0){
            particulas.splice(i,1);
        }
    }
}

// ⚡ Flash de pantalla
function flashPantalla(){
    let flash = document.getElementById("flash");
    if(!flash) return;

    flash.style.opacity = "0.3";

    setTimeout(()=>{
        flash.style.opacity = "0";
    },100);
}
function reiniciarJuego(){
    // Resetear valores
    puntaje = 0;
    vidas = 3;

    // Actualizar UI
    mostrarEnSpan("txtPuntaje", puntaje);
    mostrarEnSpan("txtVidas", vidas);

    // Reiniciar posición del personaje
    personajeX = canvas.width/2;

    // Reiniciar limón
    aparecerLimon();

    // Limpiar partículas
    particulas = [];

    // Redibujar
    actualizarPantalla();
}    