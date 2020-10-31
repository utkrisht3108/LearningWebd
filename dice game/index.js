var name1 = "Player1";
var name2 = "Player2";
name1 = prompt("Player 1 name", "Player1");
name2 = prompt("Player 2 name", "Player2");

document.querySelectorAll("p")[0].innerHTML = name1;
document.querySelectorAll("p")[1].innerHTML = name2;

var randomNumber1 = Math.floor(Math.random()*6)+1;
var randomNumber2 = Math.floor(Math.random()*6)+1;
var randomImage1 = "images/dice"+randomNumber1+".png";
var randomImage2 = "images/dice"+randomNumber2+".png";
document.querySelector(".img1").setAttribute("src",randomImage1);
document.querySelector(".img2").setAttribute("src",randomImage2);
if(randomNumber1>randomNumber2){
     document.querySelector("h1").innerHTML = "😎"+name1+" wins!!";
}
else if(randomNumber2>randomNumber1){
     document.querySelector("h1").innerHTML = name2+" wins!!😎";
}
else{
     document.querySelector("h1").innerHTML = "😢Draw😢";
}