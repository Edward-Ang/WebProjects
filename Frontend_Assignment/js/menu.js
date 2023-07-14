//Hide menu bar into one button when browsing with small screen size
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');


menu.onclick = () =>
{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}


const items =
[
    //beef
    {id: 1, name: "CaiJun Chickpea Burger", price: 17, img: "img/burger.png"},
    {id: 2, name: "The Perfect Cheeseburger",  price: 15, img: "img/burger.png"},
    {id: 3, name: "Mp Hamburguer", price: 20, img: "img/burger.png"},
    {id: 4, name: "Artes Hamburguer",  price: 13, img: "img/burger.png"},
    {id: 5, name: "Receita Hamburguer",   price: 17, img: "img/burger.png"},
    {id: 6, name: "Marben",  price: 18, img: "img/burger.png"},

    //chicken
    {id: 7, name: "Big Boss Burger", price: 20, img: "img/burger.png"},
    {id: 8, name: "Kansas Fried Chicken",  price: 20, img: "img/burger.png"},
    {id: 9, name: "Buttermilk Chicken Burger",   price: 18, img: "img/burger.png"},
    {id: 10, name: "The Heart Chicken Burger",   price: 15, img: "img/burger.png"},
    {id: 11, name: "Daily Burger",  price: 20, img: "img/burger.png"},
    {id: 12, name: "Champion Burger",  price: 18, img: "img/burger.pngg"},
    {id: 13, name: "FatBurger",   price: 15, img: "img/burger.png"},
    {id: 14, name: "Wild Grill",  price: 17, img: "img/burger.png"},
    {id: 15, name: "The Burger Hub",   price: 22, img: "img/burger.png"},

    //fish
    {id: 16, name: "Crab Burger", price: 19, img: "img/burger.png"},
    {id: 17, name: "Crumbed Fish Burger",  price: 15, img: "img/burger.png"},
    {id: 18, name: "Origin Fish Burger",  price: 18, img: "img/burger.png"},

    //Breakfast
    {id: 19, name: "Tasty Breakfast Burger",   price: 15, img: "img/burger.png"},
    {id: 20, name: "Sunny Swiss Burger",  price: 16, img: "img/burger.png"},
    {id: 21, name: "Good Day Burger", price: 15, img: "img/burger.png"},
    
    //Nasi lemak and porridge
    {id: 22, name: "Origin Porridge",  price: 12, img: "img/picture22.png"},
    {id: 23, name: "Red Porridge",  price: 13, img: "img/picture23.png"},
    {id: 24, name: "Nasi Lemak",  price: 15, img: "img/picture24.png"},
    
    //sides
    {id: 25, name: "Nuggets",  price: 13, img: "img/picture25.png"},
    {id: 26, name: "French Fries",  price: 10, img: "img/picture26.png"},
    {id: 27, name: "Chicken Corn",  price: 12, img: "img/picture27.png"},
    {id: 28, name: "Salad",  price: 8, img: "img/picture28.png"},
    {id: 29, name: "Barbecue Potato Chips",  price: 9, img: "img/picture29.png"},
    {id: 30, name: "Onion Ring",price: 6, img: "img/picture30.png"},

    //Dessert
    {id: 31, name: "Triple Mix Ice Cream",   price: 5, img: "img/picture31.png"},
    {id: 32, name: "Chocolate Cake", price: 8, img: "img/picture32.png"},
    {id: 33, name: "Wisconsin Old Fashioned",  price: 8, img: "img/picture33.png"},
    
    //Beverages
    {id: 34, name: "Coca Cola",   price: 3, img: "img/picture34.png"},
    {id: 35, name: "Iced Lemon Tea", price: 5, img: "img/picture35.png"},
    {id: 36, name: "Orange Juice", price: 3, img: "img/picture36.png"}
   
]

//add wishlist
var wishlist=[];

if(localStorage.getItem("wish")){
    wishlist = JSON.parse(localStorage.getItem("wish"));

    if(wishlist.length > 0){

        for (var i=0;i<wishlist.length;i++){;
            document.getElementById(wishlist[i].id).classList.add('heart');

        }
    }
}


$('.button1').click(function(){


    if (!localStorage.getItem("wish")){
        localStorage.setItem("wish","[]");
    }

    var btn = this.id;

    let dataset = {
        id:btn,
        name: items[btn-1].name,
        price: items[btn-1].price,
        img: items[btn-1].img
    }


    if (typeof (Storage) !== "undefined") {

        if (wishlist.length ==0){
            document.getElementById(btn).classList.add('heart');

            wishlist.push(dataset);
            localStorage.setItem("wish", JSON.stringify(wishlist));
        }
    

        else{
         
           
            if(wishlist.find(element=> element.id == btn)){

                alert("This item already exists in wishlist!");
            }


            else{
                document.getElementById(btn).classList.add('heart');
                wishlist.push(dataset);
                    
                localStorage.setItem("wish", JSON.stringify(wishlist));
            }          
        }
    }
    
});


//Order
var datalist=[];

if(localStorage.getItem("data")){
    datalist = JSON.parse(localStorage.getItem("data"));
}


$('.button2').click(function(){

    if (!localStorage.getItem("data")){
        localStorage.setItem("data","[]");
    }

    var btn = this.id;
    var num = btn.split('A')
    var id=num[1];

    let dataset = {
        id: id,
        name: items[id-1].name,
        price: items[id-1].price,
        img: items[id-1].img
    }


    if (typeof (Storage) !== "undefined") {

        if (datalist.length ==0){

            var num=prompt("Enter the quantity you want: ");
            
            dataset.quantity=num;

            datalist.push(dataset);
            localStorage.setItem("data", JSON.stringify(datalist));
        }
    

        else{
       
            if(datalist.find(item=> item.id == id)){
                var index = datalist.findIndex((item) => {
                    return item.id === id;
                });
                

                if (confirm("The quantity of this item added to cart before is "+ datalist[index].quantity 
                +".\nDo you want to change it?")==true){
                    
                    var num = prompt("Enter the quantity you want: ");
                    dataset.quantity=num;

                    var temp = datalist.filter(item=>item.id != id);
                    temp.push(dataset);
                    localStorage.setItem("data", JSON.stringify(temp));                    
                }
            
            }
           else{
                var num = prompt("Enter the quantity you want: ");
                dataset.quantity=num;

                var temp = datalist.filter(item=>item.id != id);
                temp.push(dataset);
                localStorage.setItem("data", JSON.stringify(temp));        
            }          
        }
        location.reload(); //get new quantity
    }
});



//get the username
var user = localStorage.getItem("username");

$("#listicon2").html("<div><i class='fas fa-user-alt' style='font-size:20px; margin-top:25px;'></i>&nbsp; <b>Welcome "+ user+"</b></div>");



setTime();
showTime();

function setTime(){

     $.get("https://uccd2223-todoapi.azurewebsites.net/api/DateTime",function(data){      
  
        sessionStorage.setItem("time", data);
    });
}

function showTime(){
    var time = sessionStorage.getItem("time");

    if(time !=null){
        $("#listicon3").html("<div><i class='fas fa-clock' style='font-size:20px'></i>&nbsp; <b>Time: "+time+"</b></div>");
    }
}