//header
//Hide menu bar into one button when browsing with small screen size
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>
{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}


wishlist = JSON.parse(localStorage.getItem("wish"));

function show(){
    if (wishlist.length == 0){

        var row= document.createElement('tr');
        var element = document.createElement('td');
        element.setAttribute('colspan','5');
        element.innerText="No WishList Items!";
        row.appendChild(element);

        $(".body").append(row);

    }
    else{
    
        for (var i=1;i<=wishlist.length;i++){

            var row= document.createElement('tr');

            var element1 = document.createElement('td');
            element1.innerText=i;
        
            var element2= document.createElement('td');
            var image= document.createElement('img');
            image.src= wishlist[i-1].img;
            element2.appendChild(image);
            
            var element3= document.createElement('td');
            element3.innerText= wishlist[i-1].name;
        
        
            var element4= document.createElement('td');
            element4.innerText= wishlist[i-1].price;
            
            var element5= document.createElement('td');
            var btn1= document.createElement('button');
            btn1.setAttribute('class','remove');
            btn1.innerText= 'Remove';
        
            element5.appendChild(btn1);
        
            
            row.appendChild(element1);
            row.appendChild(element2);
            row.appendChild(element3);
            row.appendChild(element4);
            row.appendChild(element5);
        
    
            $(".body").append(row);
        } 
    }
}

show();



$('.remove').click(function(){

    var target = this.parentNode.parentNode.firstChild.nextSibling.nextSibling.innerText;


    var final = wishlist.find(item=>item.name == target);

    var temp = wishlist.filter(item=>item.name != final.name);
    localStorage.setItem("wish", JSON.stringify(temp));

    show();

    location.reload();

});