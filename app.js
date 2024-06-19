let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 0;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function obtenerValorInputById(id) {
    return document.getElementById(id).value;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(obtenerValorInputById('valorUsuario'));
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        habilitarElementoById('reiniciar');
        deshabilitarElementoById('verificarIntento');
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function mostrarElementoById(id) {
    document.getElementById(id).style.display = 'block';
}

function ocultarElementoById(id) {
    document.getElementById(id).style.display = 'none';
}

function deshabilitarElementoById(id) {
    document.getElementById(id).setAttribute('disabled','true');
}

function habilitarElementoById(id) {
    document.getElementById(id).removeAttribute('disabled');
}

function definirNumeroMaximo() {
    numeroMaximo = parseInt(obtenerValorInputById('valorUsuario'));
    //ocultar y deshabilitar botón que define el valor máximo posible del número secreto
    ocultarElementoById('iniciar');
    deshabilitarElementoById('iniciar');
    //mostrar botones de juego
    mostrarElementoById('verificarIntento');
    mostrarElementoById('reiniciar');
    //comenzar nuevo juego
    condicionesIniciales();
}

function limpiarCaja() {
    document.getElementById('valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Completaste el Juego Felicidades!');
        //ocultar botón verificar intento
        ocultarElementoById('verificarIntento');
        //ocultar input
        ocultarElementoById('valorUsuario');
        //Cambiar etiqueta del botón reiniciar
        document.getElementById('reiniciar').innerText = 'Reiniciar juego';
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    limpiarCaja();
}

function iniciar() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p','Ingrese el posible valor máximo para el número secreto');
    //ocultar y deshabilitar botón que define el valor máximo posible del número secreto
    mostrarElementoById('iniciar');
    habilitarElementoById('iniciar');
    //mostrar botones de juego
    ocultarElementoById('verificarIntento');
    ocultarElementoById('reiniciar');
    //mostrar input
    mostrarElementoById('valorUsuario');
    //Cambiar etiqueta y deshabilitar botón reiniciar
    document.getElementById('reiniciar').innerText = 'Nuevo juego'
    deshabilitarElementoById('reiniciar');
    //restablecer valor de las variables
    numeroSecreto = 0;
    intentos = 0;
    listaNumerosSorteados = [];
    numeroMaximo = 0;
    //limpiar caja
    limpiarCaja();
}

function reiniciarJuego() {
    //validar si es reiniciar y no nuevo intento
    if(esReiniciarJuego()){
        iniciar();
        return;
    }
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    if(esReiniciarJuego()){
        //habilitar el botón de nuevo juego
        habilitarElementoById('reiniciar');
    }
    else {
        //Deshabilitar el botón de nuevo juego
        deshabilitarElementoById('reiniciar');
    }
    //habilitar intento
    habilitarElementoById('verificarIntento');
}

function esReiniciarJuego(){
    return document.getElementById('reiniciar').innerText == 'Reiniciar juego';
}

iniciar();