function guardar(){
    db.collection("Descripcion").add({
        Obstaculos: document.getElementById("obst").value,
        Latitud: document.getElementById("latit").value,
        Longitud: document.getElementById("long").value,
    })
    .then((docRef) => {
        alert("Registro exitoso");
    })
    .catch((error) => {
        alert("Error en el registro");
    });
}

