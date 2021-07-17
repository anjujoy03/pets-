// open nav and close nav start
  function openNav() {
    document.getElementById("mySidepanel").style.width = "180px";
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "50px";
    document.getElementById("aa").style.display = "none";
    
  }
  // open nav and close nav end


  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


  $(document).ready(function(){
    $(".hamburger .hamburger__inner").click(function(){
      $(".wrapper").toggleClass("active")
    })

    $(".top_navbar .fa-user").click(function(){
       $(".profile_dd").toggleClass("active");
    });

  $(".top_navbar .fa-bell").click(function(){
    $(".profile_da").toggleClass("active");
 });
})



var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}


  


  