/* ===== Montrer / Cacher menu ===== */
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* ===== Montrer menu ===== */
/* ===== Valide si la constante existe ===== */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* ===== Cacher menu ===== */
/* Valide si la constante existe */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* ===== Cache le menu sur mobile ===== */
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // ===== quand on click sur un icon, le menu est caché ===== //
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/* ===== Qualification tabs ===== */
const tabs = document.querySelectorAll('[data-target]'),
        tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})


/* ===== Services Modal ===== */
const modalViews = document.querySelectorAll('.services__modal'),
        modalBtns = document.querySelectorAll('.services__button'),
        modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () =>{
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal')
        })
    })
})

/* ===== Switch color theme window ===== */
const colorViews = document.querySelectorAll('.color__modal'),
        colorBtns = document.querySelectorAll('.color__button'),
        colorCloses = document.querySelectorAll('.color__modal-close')

let colormodal = function(modalClick){
    colorViews[modalClick].classList.add('color-active-modal')
}

colorBtns.forEach((colorBtn, i) => {
    colorBtn.addEventListener('click', () =>{
        colormodal(i)
    })
})

colorCloses.forEach((colorClose) => {
    colorClose.addEventListener('click', () =>{
        colorViews.forEach((colorView) =>{
            colorView.classList.remove('color-active-modal')
        })
    })
})

/* ===== Switch color theme ===== */
var color1 = document.getElementById('red'),
    color2 = document.getElementById('green'),
    color3 = document.getElementById('violet'),
    color4 = document.getElementById('blue'),
    color5 = document.getElementById('pink');

const colorTheme = localStorage.getItem('couleur');

window.onload = function(){
    color1.onclick = changecolor;
    color2.onclick = changecolor;
    color3.onclick = changecolor;
    color4.onclick = changecolor;
    color5.onclick = changecolor;
}

function changecolor(){
    let color = this.getAttribute('data-color');
    document.querySelector(':root').style.setProperty('--hue-color', color)
    localStorage.setItem('couleur', this.id);
}

if(colorTheme == 'red'){
    document.querySelector(':root').style.setProperty('--hue-color', 0)
}
if(colorTheme == 'green'){
    document.querySelector(':root').style.setProperty('--hue-color', 140)
}
if(colorTheme == 'violet'){
    document.querySelector(':root').style.setProperty('--hue-color', 250)
}
if(colorTheme == 'blue'){
    document.querySelector(':root').style.setProperty('--hue-color', 220)
}
if(colorTheme == 'pink'){
    document.querySelector(':root').style.setProperty('--hue-color', 290)
}


/* ===== Portfolio Swiper ===== */
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
});


/* ===== Active link Navbar ===== */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/* ===== Ombre menu ===== */
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/* ===== Scroll vers le haut ===== */
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)



/* ===== Dark / light ===== */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})