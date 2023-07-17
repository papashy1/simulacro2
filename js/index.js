import {get_rutas,post_rutas,delete_rutas,renombrar_rutas,get_puntos,post_puntos,delete_puntos,editar_puntos,delete_hijos} from "./funciones.js"
let temp = 0 
let temp2 = 0

get_rutas()

let form = document.querySelector('#form');
let form2 = document.querySelector('#form2');
let renombrar_r = document.querySelector('#renombrar_r');
let btn_agregar = document.querySelector('#btn_agregar');
let btn_agregar_p = document.querySelector('#btn_agregar_p');
let editar_p = document.querySelector('#editar_p');

btn_agregar.addEventListener("click", function() {
    let input_agregar = document.querySelector('#nueva_r').value;
    if (input_agregar == "") {
        alert("ERROR! debes escribir un nombre para agregar una ruta")
    }
    else {
        let agregar = { NomRuta:input_agregar};
        post_rutas(agregar);
    }
});

form.addEventListener("click", pito => {
    let but = pito.target.closest("button")
    temp = parseInt(but.id)
    let no_me_gusto_esta_solucion = but.dataset.action
    if (no_me_gusto_esta_solucion == "asco") {
        delete_rutas(temp);
        delete_hijos(temp)
    }
    else if (no_me_gusto_esta_solucion == "asqueroso"){
        get_puntos(temp);
    }
})

renombrar_r.addEventListener("click", function() {
    let input_renombrar = document.querySelector('#nuevo_nombre').value;
    if (input_renombrar == "") {
        alert("ERROR! debes escribir un nombre para renombrar una ruta")
    }
    else {
        let renombrar = { 
            id: temp,
            NomRuta:input_renombrar
        };
        renombrar_rutas(renombrar, temp);
    }
});

btn_agregar_p.addEventListener("click", function() {
    let input_agregar_p = document.querySelector('#nuevo_p').value;
    let input_agregar_img = document.querySelector('#nuevo_p1').value;
    if (input_agregar_p == "") {
        alert("ERROR! debes escribir un nombre para agregar un Punto")
    }
    else {
        let agregar_p =  { 
            NomPuntos: input_agregar_p, 
            RutaId: temp,
            Imagen: input_agregar_img
        };
        post_puntos(agregar_p);
    }
});

editar_p.addEventListener("click", function() {
    let input_editar = document.querySelector('#editado_np').value;
    let input_editar_img = document.querySelector('#editado_img').value;
    if (input_editar == "") {
        alert("ERROR! debes escribir un nombre para renombrar una ruta")
    }
    else {
        let editar = { 
            id:temp2,
            NomPuntos: input_editar, 
            RutaId: temp,
            Imagen: input_editar_img, 
        };
        editar_puntos(editar, temp2);
    }
});

form2.addEventListener("click", pito => {
    let but = pito.target.closest("button")
    let tr = pito.target.closest("tr");
    temp2 = parseInt(tr.id);  
    let no_me_gusto = but.dataset.action
    if (no_me_gusto == "asco") {
        delete_puntos(temp2);
    }
    }
)

