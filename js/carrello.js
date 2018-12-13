var db = firebase.firestore();
var size;
var totale = 0;

var contatore = 0;

db.settings({
  timestampsInSnapshots: true
});

db.collection("prodotti").get().then(snap => {
   size = snap.size;
});

/*if (size == null) {

    console.log("sono stronzo")
    $("#prodotto").html("");
    $("#prodotto").append("<p class='card-text'>Non ci sono prodotti nel carrello!</p></div>");
    console.log("sono DAVVERO stronzo");

}*/

db.collection("carrello").get().then((querySnapshot) => {

    var li = document.createElement("li"); 
    li.className = "list-group-item d-flex justify-content-between";
    var span = document.createElement("span");
    span.innerHTML ="TOTALE";
    var strong = document.createElement("strong");
    strong.innerHTML = totale.toFixed(2) + " \u20AC";
    li.appendChild(span);
    li.appendChild(strong);

    querySnapshot.forEach((doc) => {
        //console.log(doc.data().nome_prodotto);
        var prodotto_da_cercare = doc.data().nome_prodotto;
        contatore = contatore + 1;
        //console.log(prodotto_da_cercare);

        db.collection("prodotti").get().then((querySnapshot) => {

            querySnapshot.forEach((doc) => {

                if ((doc.data().controllo_nome) == prodotto_da_cercare) {

                    //console.log(parseFloat(doc.data().prezzo));
                    totale = totale + parseFloat(doc.data().prezzo);
                    //console.log(totale.toFixed(2));


                    var li = document.createElement("li"); 
                    li.className = "list-group-item d-flex justify-content-between lh-condensed cartElement";
                    var div = document.createElement("div");
                    var divImage = document.createElement("div");
                    divImage.className="cartImage hidden-md";
                    var image = document.createElement("img");
                    image.src = doc.data().img;
                    var h6 = document.createElement("h6");
                    h6.className= "my-0";
                    h6.innerHTML = doc.data().nome_prodotto;
                    var small = document.createElement("small");
                    small.className="text-muted";
                    var span = document.createElement("span");
                    span.className="text-muted";
                    span.innerHTML =doc.data().prezzo;
                    divImage.appendChild(image);
                    div.appendChild(h6);
                    div.appendChild(small);
                    li.appendChild(divImage);
                    li.appendChild(div);
                    li.appendChild(span);
                    document.querySelector("#carrello").appendChild(li);    

                    /*$("#carrello").append("<div class='card' style='width: 18rem;'' id='prodotto'>"+
                                            "<img class='card-img-top' src='"+doc.data().img+"' alt='"+doc.data().nome_prodotto+"'>"+
                                            "<div class='card-body'><p class='card-title'>"+doc.data().nome_prodotto+ "</p><p class='card-text'>" + doc.data().prezzo+"\u20AC</p></div>"+
                                          "</div>");*/

                }

                $("#nProducts").html(contatore);
                strong.innerHTML = totale.toFixed(2) + " \u20AC";

            });
            document.querySelector("#carrello").appendChild(li);
        });
    }); 

});

/*db.collection("prodotti").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

        console.log(contatore);

        if((doc.data().nome_prodotto) == "Lasagna Cavolo Nero e Ricotta di Bufala Campana"){

            console.log(size);

        }

        contatore = contatore + 1;
    });
});*/

/*db.collection("carrello").doc(contatore.toString()).set({
    nome_prodotto: "culo",
    immagine: "http://fotodiculo.img",
    prezzo: 10
});*/

/*db.collection("carrello").doc("0").delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});*/