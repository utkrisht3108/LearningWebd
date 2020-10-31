for(var i=0;i<document.querySelectorAll(".drum").length;i++){
     document.querySelectorAll(".drum")[i].addEventListener("click", function(){
          var but = this.innerHTML;
          solve(but);
          anim(but);
     });
}
document.addEventListener("keypress",function(event){
     solve(event.key);
     anim(event.key);
})

function anim(x){
     var butt = document.querySelector("."+x);
     butt.classList.toggle("pressed");
     setTimeout(function(){
          butt.classList.remove("pressed");
     },100);
}
function solve(but){
          switch (but) {
               case "w":
                    var audio = new Audio("sounds/crash.mp3");
                    audio.play();
                    break;
               case "a":
                    var audio = new Audio("sounds/snare.mp3");
                    audio.play();
                    break;
               case "s":
                    var audio = new Audio("sounds/kick-bass.mp3");
                    audio.play();
                    break;
               case "d":
                    var audio = new Audio("sounds/tom-1.mp3");
                    audio.play();
                    break;
               case "j":
                    var audio = new Audio("sounds/tom-2.mp3");
                    audio.play();
                    break;
               case "k":
                    var audio = new Audio("sounds/tom-3.mp3");
                    audio.play();
                    break;
               case "l":
                    var audio = new Audio("sounds/tom-4.mp3");
                    audio.play();
                    break;
               default:
                    break;
          }
     }