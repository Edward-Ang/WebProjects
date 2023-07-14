//Hide menu bar into one button when browsing with small screen size
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>
{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

//Food slider
var swiper = new Swiper(".food-slider",{
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    breakpoints: {
        0: {
          slidesPerView: 1,
        },
        786: {
          slidesPerView: 2,
        },
        1100: {
          slidesPerView: 3,
        },
      },
});

//Cookies Pop up 
let cookiesPopup = document.getElementById("cookies");

document.getElementById("acceptCookies").addEventListener("click", () => {
 
  //set default cookie
  document.cookie = "homeCookie=justADefaultCookie; expires=Thu, 18 Dec 2023 12:00:00 UTC";

  cookiesPopup.classList.add("hide");
  cookiesPopup.classList.remove("show");
});

const checkCookies = () => {
  let input = document.cookie.split("; ");
  var homeCookieExist;
  //If the default cookie exist, hide the cookies pop up
  for(var i = 0; i < input.length; i++){
    if(input[i].split("=")[0] == "homeCookie"){
      cookiesPopup.classList.add("hide");
      cookiesPopup.classList.remove("show");
      homeCookieExist = "True";
    }
  }

  //If the default cookies does not exist, call the cookies pop up
  if(homeCookieExist != "True"){
    cookiesPopup.classList.add("show");
    cookiesPopup.classList.remove("hide");
  }
};

//check the default cookie exist or not every time load the page
window.onload = () => {
  setTimeout(() => {
    checkCookies();
  }, 2000);
};