const URL = "http://localhost:3000"
const headers = new Headers({ 'Content-Type': 'application/json' });

///////////////////////////  RUTAS  //////////////////////////

export function mostrar_ruta(data) {
    let m_r = document.querySelector("#tablita_r");

    m_r.innerHTML = "";

    data.forEach((ruta) => {
        let mostrar = document.createElement("tr");
        mostrar.setAttribute("class", "tr");
        mostrar.innerHTML = `
        <td>${ruta.id}</td>
        <td>${ruta.NomRuta}</td>
        <td>
        <button type="button" class="btn btn-primary border-0 rounded px-2" data-action="asqueroso" id="${ruta.id}">Ver puntos en la ruta2</button>
        </td>
        <td>        
            <button  type="button" class="btn btn-info border-0 rounded fw-bold px-2" data-bs-toggle="modal" data-bs-target="#modal_r" id="${ruta.id}">Renombrar</button>
            <button  type="button" class="btn btn-danger border-0 rounded px-2" data-action="asco" id="${ruta.id}">Eliminar</button>
        </td>
        `;
        m_r.appendChild(mostrar);
    }); 
}

export async function get_rutas() {
    try {
        let data = await (await fetch(`${URL}/Rutas`)).json();
        mostrar_ruta(data);
    }
    catch (error) {
        console.log(error)
    }
}

export async function post_rutas(data) {
    try {
        let config = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }

        let rutas = await (await fetch(`${URL}/Rutas`, config)).json();

    }
    catch (error) {
        console.log(error)
    }
}

export async function delete_rutas(id) {
    try {
        let config = {
            method: 'DELETE'
        };
        let del_r = await (await fetch(`${URL}/Rutas/${id}`, config)).json();
    }
    catch (error) {
        console.log(error)
    }
}

export async function renombrar_rutas(data, id) {
    try {
        let config = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        }
        let renombrar = await (await fetch(`${URL}/Rutas/${id}`, config)).json();
    }
    catch (error) {
        console.log(error)
    }

}

///////////////////////////  PUNTOS  //////////////////////////


function mostrar_puntos(data) {
    let quitar = document.querySelector("#quitar");
    let quitar1 = document.querySelector("#quitar1");
    quitar.classList.remove("d-none");
    quitar1.classList.remove("d-none");
    let m_r = document.querySelector("#tablita_p");

    m_r.innerHTML = "";
    
    data.forEach((punto) => {
        console.log(punto);
        let mostrar = document.createElement("tr");
        mostrar.setAttribute("class", "tr");
        mostrar.setAttribute("id", `${punto.id}`);
        mostrar.innerHTML = `
        <td>${punto.id}</td>
        <td>${punto.NomPuntos}</td>
        <td><img src="${punto.Imagen}"></td>
        <td>        
            <button  type="button" class="btn btn-info border-0 rounded fw-bold px-2" data-bs-toggle="modal" data-bs-target="#modal_p" id="${punto.id}">Editar</button>
            <button  type="button" class="btn btn-danger border-0 rounded px-2" data-action="asco" id="${punto.id}">Eliminar</button>
        </td>
        `;
        m_r.appendChild(mostrar);
    });
}

export async function get_puntos(id) {
    try {
        const response = await fetch(`${URL}/Puntos?RutaId=${id}`);
        const result = await response.json();
        console.log(result)
        mostrar_puntos(result);
    } catch (error) {
        console.log(error)
    }
}

export async function post_puntos(data) {
    try {
        let config = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }
        let puntos = await (await fetch(`${URL}/puntos`, config)).json();
    } 
    catch (error) {
        console.log(error)
    }
}

export async function delete_hijos(id) {

    try {
        const response = await fetch(`${URL}/Puntos?RutaId=${id}`);
        const result = await response.json();

        result.forEach(e => {
            delete_puntos(e.id)
        });
    } 
    catch (error) {
        console.log(error)
    }
}

export async function delete_puntos(id) {
    try {
        let config = {
            method: 'DELETE',
        };
        let del_p = await (await fetch(`${URL}/puntos/${id}`, config)).json();
    } 
    catch (error) {
        console.log(error)
    }
}

export async function editar_puntos(data, id) {
    try {
        let config = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        }
        let editar = await (await fetch(`${URL}/puntos/${id}`, config)).json();
    } 
    catch (error) {
        console.log(error)   
    }

}