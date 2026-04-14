let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

function dibujarSuelo(){
    ctx.fillStyle="blue";
    ctx.fillRect(0, canvas.height-20, canvas.width, 20);

}
