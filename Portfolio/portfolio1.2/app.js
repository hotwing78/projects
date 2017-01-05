'use strict'
let here = document.querySelector('.reg-text');
console.log(here);
(function{
let header = document.querySelector('.header'), lastScrollTop = 0, panels = document.querySelectorAll('.panel'),
    slideI = document.querySelector('.slideIndex'), slideContainer = document.querySelector('.slideshow-container'),
    slideIndex = 1,
        slides = [{
            src: 'images/OOP Cert.png',
            caption: 'Understanding of OOP'
        }, {
            src: 'images/Iron Yard Cert.png',
            caption: 'Paying the Iron price'
        }, {
            src: 'images/TTCC.jpg',
            caption: 'Continuing Education'
        }, {
            src: 'images/Web 101.png',
            caption: 'Best practices and know how'
        }];
        let here = document.querySelector('.reg-text');
        console.log(here);

//Control of nav hide/show
(function ru(){
  console.log('ran');
setTimeout(function () {
  let here = document.querySelector('.reg-text');
      here.classList.add('loaded');
   }, 1000);
 })();
window.onscroll = ()=> { hide() };

 let hide = ()=>{
    let currentScrollTop = document.body.scrollTop;

    if(currentScrollTop < 492){

      header.classList.remove('hidden');

    } else if ( currentScrollTop > lastScrollTop){

       header.classList.add('hidden');

     } else if(lastScrollTop  > (currentScrollTop +10)) {

       header.classList.remove('hidden');
     }
          lastScrollTop = currentScrollTop;
}

//THe Projects control
function toggleOpen() {
  event.stopImmediatePropagation();
  this.classList.toggle('open');
}

function toggleActive(e) {
    event.stopImmediatePropagation();
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));


//SLIDES GALLERY
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i,
        slideCon = document.getElementsByClassName("mySlides"),
        number = document.getElementsByClassName('numbertext'),
        slide = document.getElementsByClassName('slide'),
        captions = document.getElementsByClassName('text'),
        dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    slide[0].setAttribute('src', slides[slideIndex - 1].src);
    fadeIn(slide[0]);
    captions[0].innerHTML = `${slides[slideIndex-1].caption}`
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    number[0].innerHTML = `${slideIndex}/${slides.length}`;
    // dots[slideIndex - 1].className += " active";
}

//Feedback
// Get the modal
var modal = document.getElementById('myModal');

// Get the chip that opens the modal
var chip = document.getElementsByClassName('chip');

for(let i = 0; i < chip.length; i++){

  chip[i].addEventListener('click', showModal);
}

function showModal(){
  let self = this;
  let header = document.querySelector('.modal-header h2');
  let body = document.querySelector('.modal-body p');
  let footer = document.querySelector('.modal-footer h3');

   let referral = referrals.filter(function(ref,idx,array){
     return ref.fullName.includes(self.id);
   });
   console.log(referral);
   header.innerHTML = `${referral[0].fullName}`;
   body.innerHTML = `${referral[0].comment}`;
   footer.innerHTML = `--${referral[0].title}`;
  modal.style.display = "block";
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



//FAQ's
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
    }
}

//ANIMATIONS
function fadeIn(el) {
    el.style.opacity = 0;

    var last = +new Date();
    var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
        last = +new Date();

        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };
    tick();
}
}();
