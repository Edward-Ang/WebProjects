const facebook = document.querySelector(".facebook");
const twitter = document.querySelector(".twitter");
const linked = document.querySelector(".linked");

function init() {

  let Url = encodeURI(document.location.href = "#index.html");;

  facebook.setAttribute(
    "href",
    `https://www.facebook.com/sharer.php?url=${Url}`
  );

  twitter.setAttribute(
    "href",
    `https://twitter.com/share?url=${Url}`
  );

  linked.setAttribute(
    "href",
    `https://www.linkedin.com/shareArticle?url=${Url}`
  );

}

init();

const inpKey = document.getElementById("inputKey");
const inpValue = document.getElementById("inputValue");
const inpMsg = document.getElementById("inputMsg")
const btnSubmit = document.getElementById("btnSubmit");

btnSubmit.onclick = function () {
    const key = inpKey.value;
    const value = inpValue.value;
    const msg = inpMsg.value;


    console.log(key);
    console.log(value);
    console.log(msg);

    if (key && value){
      localStorage.setItem("Name",inpKey.value);
      localStorage.setItem("Email",inpValue.value);
      localStorage.setItem("Message",inpMsg.value);
      location.reload();
    }
};

for (let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);


}