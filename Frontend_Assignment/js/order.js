//header
//Hide menu bar into one button when browsing with small screen size
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('#navbar');

menu.onclick = () =>
{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}



//order page
$(document).ready(function() {
    //content not covered by fixed header
    $("#accordion").css("margin-top", $("header").outerHeight());

    var data = get(); 
    loadCart(data);
    loadMap();



    //country dropdown
    const xhttp = new XMLHttpRequest();

    let countries;

    xhttp.onreadystatechange = function() {
        console.log('this.status', this.status);
        if (this.readyState == 4 && this.status == 200) {
            countries = JSON.parse(xhttp.responseText);

            $.each(countries, function(i, country){
                $("#countries").append($("<option>",{
                    value: country.cloc,
                    text: country.name.common
                }))
            });
            var optionList = $("#countries option");
            optionList.sort(function(a,b){
                if (a.text > b.text) return 1;
                if (a.text < b.text) return -1;
                return 0
            })
            $("#countries").empty().append(optionList);
            $('#countries option').filter(function () { return $(this).html() == "Malaysia"; }).attr("selected", true)
        }
    };
    xhttp.open("GET", "https://restcountries.com/v3.1/all", true);
    xhttp.send();


    //check out event
    $("form").submit(function(event){
        event.preventDefault();
        var order = {
            email: $("#email").val(),
            address: $("#address").val(),
            city: $("#city").val(),
            state: $("#state").val(),
            country: $("#country").val(),
            cart: data
        };
        save("order", order);
        localStorage.removeItem("data");
        window.alert("Submit succesfully")
        location.reload();
    });
});


function save(name, data){ //set cart data
    localStorage.setItem(name, JSON.stringify(data));
}

function get(){ //get cart data
    if(localStorage.getItem("data")){
        return JSON.parse(localStorage.getItem("data"));
    }
    else{
        var emptyList = [];
        save(emptyList);
        return emptyList;
    }
    
}

function loadCart(data){
    $("#cart-body").empty();
    if(data.length == 0){ //cart empty
        $("#empty-cart").show();
        $("#cart-table").hide();
        $("#subtotal").html("RM0");
        $("#total").html("Rm0");
    }
    else{
        $("#empty-cart").hide();
        $("#cart-table").show();
        var deliverFee = 5;
        var subtotal = 0;
        for(var i = 0; i < data.length; i++){ //load data into table row
            var price = parseInt(data[i].quantity) * parseFloat(data[i].price);
            subtotal += price;
            $("#cart-body").append("<tr class=" + i + "><div><td><div><img src =" + data[i].img + "><label>" + data[i].name +"</label><button type=button class=remove>remove</button></div></td><td><input type=number value=" + data[i].quantity + "></td><td>" + price + "</td></div></tr>")
        }
        $("#subtotal").html("RM" + subtotal);
        $("#total").html("RM" +(subtotal + deliverFee));

        //remove btn
        $(".remove").on('click', function(event){
            data = get();
            index = parseInt($(this).parent().parent().parent().attr("class"));
            data.splice(index, 1);
            loadCart(data);
            save("data", data);
        });

        //change quantity
        $("#cart-body input").bind("keyup mouseup", function(){
            data = get();
            var newQuantity = $(this).val();
            if(isNaN(newQuantity) || newQuantity <=0)
                newQuantity = 1;
            index = parseInt($(this).parent().parent().attr("class"));
            data[index].quantity = newQuantity;
            loadCart(data);
            save("data", data);
        })
    }
}


function loadMap(){
    //Map api

    // Leaflet map api
    var map = L.map('map').setView([3.873024, 102.034974], 6); //initialize the map with latitud and longitud of malaysia
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var geocodeService = L.esri.Geocoding.geocodeService({ // geocoder api to convert latitud and longitud to address
    apikey: "AAPKc298e52c3fee4a2b9b0e7d03c615db97kIegOhUFDjckmpKrK9hTfTwKS6C8PMKas4oDSqMV2IEMxvgUeSXCy-tCCQOYQMyx"
    });

    var layer = null;
    map.on('click', function (e) {
        geocodeService.reverse().latlng(e.latlng).run(function (error, result) { //convert lat long to address
            if (error) {
                return; //fail to convert
            }

            //remove prevoius layer that contain previous marker to reset marker 
            if(layer != null)
                map.removeLayer(layer);

            layer = L.marker(e.latlng).addTo(map);
            $("#address").attr("value", result.address.Address)
            $("#city").attr("value", result.address.City)
            $("#state").attr("value", result.address.Region)
            $("#zip").attr("value", result.address.Postal)
            $("#country").attr("value", result.address.CntryName)
            $('#countries option').filter(function () { return $(this).html() == result.address.CntryName; }).attr("selected", true)
        });
    });   
}