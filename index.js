var dolar = 525;

function loadConfig() {    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      dolar = this.responseText;
      console.log(this.responseText);
    }
    xhttp.open("GET", "https://bsandovalmora.github.io/config.txt");
    xhttp.send();

    console.log(dolar);    
  }

function conversion(e){
    var input = document.getElementById(e);

    input.value = Math.round(input.value * dolar);
}

function dif(){
    var precioUS = document.getElementById("txtus");
    var precioCR = document.getElementById("txtcr");
    var diferencia = document.getElementById("txtdif");
    var venta = document.getElementById("txtventa");

    var resultado = precioCR.value - precioUS.value;


    diferencia.value = Math.round(resultado);
    venta.value = parseInt( Math.round(precioUS.value * (8 / 100)));

}

function dif2(){
    var costos = document.getElementById("txtcostos");
    var venta = document.getElementById("txtventa");
    var ganancia = document.getElementById("txtganancia");
    var diferencia = document.getElementById("txtdif");

    var resultado = ((2*parseInt(costos.value)) + parseInt(venta.value)) - parseInt(diferencia);
    
    ganancia.value = resultado;
}


function cotizar(){
    var precioUS = document.getElementById("txtus");
    var precioCR = document.getElementById("txtcr");
    var costos = document.getElementById("txtcostos");
    var venta = document.getElementById("txtventa");
    var ganancia = document.getElementById("txtganancia");
    var final = document.getElementById("txtfinal");

    var diferencia2 = document.getElementById("txtdif2");

    var resultado =  (parseInt(precioUS.value)+(2*parseInt(costos.value)+parseInt(venta.value)+parseInt(ganancia.value)));

    final.innerHTML = '₡' + resultado;
    diferencia2.innerHTML = 'Diferencia: ₡' + (resultado - precioCR.value);
}


loadConfig();