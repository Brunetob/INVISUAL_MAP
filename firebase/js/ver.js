function ver(){
    db.collection("Descripcion").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("obst_d").innerHTML=`${doc.data().Obstaculos}`
            document.getElementById("latit_d").innerHTML=`${doc.data().Latitud}`
            document.getElementById("long_d").innerHTML=`${doc.data().Longitud}`
        });
    });
}