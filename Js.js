// ===== CONTADOR =====

// Define la fecha y hora exacta del cumpleaños (11 de Julio de 2026 a las 19:00:00) transformada a milisegundos
const fechaCumple = new Date("July 11, 2026 19:00:00").getTime();

// Función que calcula el tiempo restante y lo plasma en la pantalla
function actualizarContador(){

// Obtiene la fecha y hora del momento exacto actual en milisegundos
const ahora = new Date().getTime();
// Resta la fecha objetivo menos el momento actual para saber cuánto tiempo queda
const diferencia = fechaCumple - ahora;

// Condicional por si el tiempo ya se cumplió o expiró (diferencia menor o igual a cero)
if(diferencia <= 0){

// Fuerza a todos los marcadores visuales a quedarse en "00"
document.getElementById("dias").innerText="00";
document.getElementById("horas").innerText="00";
document.getElementById("minutos").innerText="00";
document.getElementById("segundos").innerText="00";

return; // Detiene la ejecución de la función
}

// Calcula los días restantes dividiendo los milisegundos totales y redondeando hacia abajo
document.getElementById("dias").innerText =
Math.floor(diferencia/(1000*60*60*24));

// Calcula las horas sobrantes usando el operador residuo (%) para ignorar los días completos
document.getElementById("horas").innerText =
Math.floor((diferencia%(1000*60*60*24))/(1000*60*60));

// Calcula los minutos sobrantes extrayendo el residuo de las horas completas
document.getElementById("minutos").innerText =
Math.floor((diferencia%(1000*60*60))/(1000*60));

// Calcula los segundos sobrantes extrayendo el residuo de los minutos completos
document.getElementById("segundos").innerText =
Math.floor((diferencia%(1000*60))/1000);

}

// Ejecuta la función 'actualizarContador' de manera automática cada 1 segundo (1000 milisegundos)
setInterval(actualizarContador,1000);
// Llama a la función de forma inmediata al cargar la página para evitar el parpadeo inicial de "00"
actualizarContador();



// ===== CONFIRMAR ASISTENCIA (EMAILJS) =====

// Añade un detector de clics al botón de confirmación de asistencia
document.getElementById("confirmar").addEventListener("click",()=>{

// Captura los valores de texto introducidos por el usuario en cada campo del formulario
const nombre = document.getElementById("nombre").value;
const apellido = document.getElementById("apellido").value;
const personas = document.getElementById("personas").value;
const mensaje = document.getElementById("comentario").value;

// Obtiene el elemento del párrafo donde se muestran las alertas de feedback al usuario
const box = document.getElementById("mensaje");

// Validación: Verifica si alguno de los campos obligatorios (nombre, apellido o cantidad de personas) está vacío
if(!nombre || !apellido || !personas){

box.classList.add("show"); // Añade la clase CSS para hacer visible el texto con animación
box.innerHTML = "⚠️ Completa todos los datos antes de confirmar"; // Muestra el texto de aviso

return; // Cancela el proceso de envío
}

// Invoca el método de la librería externa EmailJS para procesar el envío de correos
emailjs.send(
"service_zia7suw", // Identificador único de tu servicio de correo en EmailJS
"template_l8vo9bn", // Identificador único de la plantilla de diseño de tu correo
{
// Pasa las variables con los datos recopilados para que rellenen los campos de la plantilla
Nombre: nombre,
Apellido: apellido,
Personas: personas,
Mensaje: mensaje
}
)

// Promesa (.then): Se ejecuta únicamente si el correo electrónico fue enviado con éxito total
.then(()=>{

box.classList.add("show"); // Activa visualmente el mensaje
box.innerHTML = "💖 ¡Confirmación enviada correctamente!"; // Informa del éxito

document.getElementById("confirmar").disabled = true; // Deshabilita el botón para evitar envíos duplicados

})

// Promesa (.catch): Se ejecuta si ocurre un error informático o de red en el proceso de envío
.catch((error)=>{

console.log(error); // Imprime el error detallado en la consola del navegador para revisión técnica

box.classList.add("show"); // Activa visualmente el mensaje
box.innerHTML = "❌ Error enviando confirmación"; // Informa del fallo

});

});



// ===== SECCIÓN SORPRESA (EN ORDEN SIN REPETIR) =====

// Matriz (Array) que guarda la lista secuencial de frases sorpresa
const mensajes = [

"🎁 Regalo obligatorio",
"🎂 Confirma con anticipación",
"✨ Tu presencia hace este dia especial",
"💛 ¡Te espero!",
"Bluey"

];

// Variable numérica indexada para saber cuál es la frase actual que corresponde mostrar
let indiceMensaje = 0;

// Añade un detector de clics al botón con identificador "sorpresa"
document.getElementById("sorpresa").addEventListener("click",()=>{

const box = document.getElementById("mensaje");

box.classList.remove("show"); // Quita temporalmente la clase para ocultar el mensaje anterior con efecto

// Temporizador asíncrono que espera 100 milisegundos antes de inyectar el nuevo contenido
setTimeout(()=>{

box.innerHTML = mensajes[indiceMensaje]; // Inserta el texto que corresponde según el índice actual
box.classList.add("show"); // Vuelve a colocar la clase para mostrar el texto de forma animada

indiceMensaje++; // Incrementa en 1 el índice para preparar el mensaje de la siguiente pulsación

// Reinicio de ciclo: Si el índice llega al final del tamaño de la lista de frases
if(indiceMensaje >= mensajes.length){
indiceMensaje = 0; // Regresa al primer mensaje (índice 0) para iniciar el ciclo otra vez
}

},100); // Duración de la espera en milisegundos

});