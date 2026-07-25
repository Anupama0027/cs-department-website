/*=========================================================
    DEPARTMENT OF COMPUTER SCIENCE WEBSITE
    script.js - Part 1
=========================================================*/

/*=========================================================
            SELECT ELEMENTS
=========================================================*/

const header = document.getElementById("header");

const hamburger = document.getElementById("hamburger");

const navLinks = document.getElementById("navLinks");

const navItems = document.querySelectorAll("#navLinks a");

const topBtn = document.getElementById("topBtn");

/*=========================================================
            STICKY HEADER
=========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

});

/*=========================================================
            MOBILE MENU
=========================================================*/

hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");

    navLinks.classList.toggle("active");

});

/* Close menu when a navigation link is clicked */

navItems.forEach(link => {

    link.addEventListener("click", () => {

        hamburger.classList.remove("active");

        navLinks.classList.remove("active");

    });

});

/*=========================================================
            ACTIVE NAVIGATION LINK
=========================================================*/

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop &&
            pageYOffset < sectionTop + sectionHeight) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/*=========================================================
            SMOOTH SCROLLING
=========================================================*/

navItems.forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const targetID = this.getAttribute("href");

        const targetSection = document.querySelector(targetID);

        if (targetSection) {

            window.scrollTo({

                top: targetSection.offsetTop - 70,

                behavior: "smooth"

            });

        }

    });

});

/*=========================================================
            BACK TO TOP BUTTON
=========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/*=========================================================
            CLOSE MOBILE MENU ON WINDOW RESIZE
=========================================================*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {

        navLinks.classList.remove("active");

        hamburger.classList.remove("active");

    }

});

/*=========================================================
            ESC KEY CLOSES MOBILE MENU
=========================================================*/

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        navLinks.classList.remove("active");

        hamburger.classList.remove("active");

    }

});

/*=========================================================
            CLICK OUTSIDE MOBILE MENU
=========================================================*/

document.addEventListener("click", (e) => {

    const clickedInsideMenu = navLinks.contains(e.target);

    const clickedHamburger = hamburger.contains(e.target);

    if (
        !clickedInsideMenu &&
        !clickedHamburger &&
        navLinks.classList.contains("active")
    ) {

        navLinks.classList.remove("active");

        hamburger.classList.remove("active");

    }

});

/*=========================================================
            PAGE LOADED
=========================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    topBtn.style.display = "none";

});

console.log("Navigation Module Loaded Successfully");

/*=========================================================
        PART 2 : ANIMATIONS & INTERACTIVITY
=========================================================*/

/*=========================================================
                DARK MODE
=========================================================*/

const darkModeBtn = document.getElementById("darkModeBtn");

// Load saved theme
if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark-mode");

    darkModeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

}

// Toggle Theme
darkModeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        darkModeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

        localStorage.setItem("theme","dark");

    }
    else{

        darkModeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';

        localStorage.setItem("theme","light");

    }

});


/*=========================================================
                HERO TYPING EFFECT
=========================================================*/

const typingElement=document.getElementById("typing");

const texts=[

    "Innovating the Future with Computing",

    "Artificial Intelligence & Machine Learning",

    "Cyber Security | Cloud Computing",

    "Research • Innovation • Excellence",

    "Empowering Tomorrow's Engineers"

];

let textIndex=0;

let charIndex=0;

let deleting=false;

function typingEffect(){

    const currentText=texts[textIndex];

    if(!deleting){

        typingElement.textContent=currentText.substring(0,charIndex);

        charIndex++;

        if(charIndex>currentText.length){

            deleting=true;

            setTimeout(typingEffect,1800);

            return;

        }

    }

    else{

        typingElement.textContent=currentText.substring(0,charIndex);

        charIndex--;

        if(charIndex<0){

            deleting=false;

            textIndex++;

            if(textIndex>=texts.length){

                textIndex=0;

            }

            charIndex=0;

        }

    }

    setTimeout(typingEffect,deleting?40:90);

}

typingEffect();


/*=========================================================
                ANIMATED COUNTERS
=========================================================*/

const counters=document.querySelectorAll(".counter");

let counterStarted=false;

function runCounters(){

    counters.forEach(counter=>{

        const target=+counter.dataset.target;

        const speed=target/120;

        function update(){

            let value=+counter.innerText;

            if(value<target){

                counter.innerText=Math.ceil(value+speed);

                requestAnimationFrame(update);

            }
            else{

                counter.innerText=target;

            }

        }

        update();

    });

}

window.addEventListener("scroll",()=>{

    const placement=document.getElementById("placements");

    if(!placement) return;

    const trigger=placement.offsetTop-400;

    if(window.scrollY>trigger && !counterStarted){

        counterStarted=true;

        runCounters();

    }

});


/*=========================================================
                SCROLL REVEAL
=========================================================*/

const revealElements=document.querySelectorAll(

".section-title,.course-card,.faculty-card,.highlight-card,.gallery-item,.testimonial,.timeline-item,.news-card,.stat-card"

);

function revealOnScroll(){

    const trigger=window.innerHeight*0.88;

    revealElements.forEach(item=>{

        const top=item.getBoundingClientRect().top;

        if(top<trigger){

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll",revealOnScroll);

window.addEventListener("load",revealOnScroll);


/*=========================================================
            IMAGE HOVER EFFECT
=========================================================*/

const galleryImages=document.querySelectorAll(".gallery-item img");

galleryImages.forEach(img=>{

    img.addEventListener("mouseenter",()=>{

        img.style.transform="scale(1.08)";

        img.style.transition=".5s";

    });

    img.addEventListener("mouseleave",()=>{

        img.style.transform="scale(1)";

    });

});


/*=========================================================
            BUTTON RIPPLE EFFECT
=========================================================*/

const buttons=document.querySelectorAll(".btn");

buttons.forEach(button=>{

    button.addEventListener("click",function(e){

        const circle=document.createElement("span");

        const diameter=Math.max(

            this.clientWidth,

            this.clientHeight

        );

        const radius=diameter/2;

        circle.style.width=diameter+"px";

        circle.style.height=diameter+"px";

        circle.style.left=e.offsetX-radius+"px";

        circle.style.top=e.offsetY-radius+"px";

        circle.classList.add("ripple");

        const ripple=this.querySelector(".ripple");

        if(ripple){

            ripple.remove();

        }

        this.appendChild(circle);

    });

});


/*=========================================================
            FLOATING HEADER SHADOW
=========================================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY>20){

        header.style.boxShadow="0 10px 30px rgba(0,0,0,.15)";

    }
    else{

        header.style.boxShadow="0 2px 8px rgba(0,0,0,.08)";

    }

});


console.log("Animation Module Loaded Successfully");

/*=========================================================
        PART 2 : ANIMATIONS & INTERACTIVITY
=========================================================*/

/*=========================================================
                DARK MODE
=========================================================*/

const darkModeBtn = document.getElementById("darkModeBtn");

// Load saved theme
if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark-mode");

    darkModeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

}

// Toggle Theme
darkModeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        darkModeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

        localStorage.setItem("theme","dark");

    }
    else{

        darkModeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';

        localStorage.setItem("theme","light");

    }

});


/*=========================================================
                HERO TYPING EFFECT
=========================================================*/

const typingElement=document.getElementById("typing");

const texts=[

    "Innovating the Future with Computing",

    "Artificial Intelligence & Machine Learning",

    "Cyber Security | Cloud Computing",

    "Research • Innovation • Excellence",

    "Empowering Tomorrow's Engineers"

];

let textIndex=0;

let charIndex=0;

let deleting=false;

function typingEffect(){

    const currentText=texts[textIndex];

    if(!deleting){

        typingElement.textContent=currentText.substring(0,charIndex);

        charIndex++;

        if(charIndex>currentText.length){

            deleting=true;

            setTimeout(typingEffect,1800);

            return;

        }

    }

    else{

        typingElement.textContent=currentText.substring(0,charIndex);

        charIndex--;

        if(charIndex<0){

            deleting=false;

            textIndex++;

            if(textIndex>=texts.length){

                textIndex=0;

            }

            charIndex=0;

        }

    }

    setTimeout(typingEffect,deleting?40:90);

}

typingEffect();


/*=========================================================
                ANIMATED COUNTERS
=========================================================*/

const counters=document.querySelectorAll(".counter");

let counterStarted=false;

function runCounters(){

    counters.forEach(counter=>{

        const target=+counter.dataset.target;

        const speed=target/120;

        function update(){

            let value=+counter.innerText;

            if(value<target){

                counter.innerText=Math.ceil(value+speed);

                requestAnimationFrame(update);

            }
            else{

                counter.innerText=target;

            }

        }

        update();

    });

}

window.addEventListener("scroll",()=>{

    const placement=document.getElementById("placements");

    if(!placement) return;

    const trigger=placement.offsetTop-400;

    if(window.scrollY>trigger && !counterStarted){

        counterStarted=true;

        runCounters();

    }

});


/*=========================================================
                SCROLL REVEAL
=========================================================*/

const revealElements=document.querySelectorAll(

".section-title,.course-card,.faculty-card,.highlight-card,.gallery-item,.testimonial,.timeline-item,.news-card,.stat-card"

);

function revealOnScroll(){

    const trigger=window.innerHeight*0.88;

    revealElements.forEach(item=>{

        const top=item.getBoundingClientRect().top;

        if(top<trigger){

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll",revealOnScroll);

window.addEventListener("load",revealOnScroll);


/*=========================================================
            IMAGE HOVER EFFECT
=========================================================*/

const galleryImages=document.querySelectorAll(".gallery-item img");

galleryImages.forEach(img=>{

    img.addEventListener("mouseenter",()=>{

        img.style.transform="scale(1.08)";

        img.style.transition=".5s";

    });

    img.addEventListener("mouseleave",()=>{

        img.style.transform="scale(1)";

    });

});


/*=========================================================
            BUTTON RIPPLE EFFECT
=========================================================*/

const buttons=document.querySelectorAll(".btn");

buttons.forEach(button=>{

    button.addEventListener("click",function(e){

        const circle=document.createElement("span");

        const diameter=Math.max(

            this.clientWidth,

            this.clientHeight

        );

        const radius=diameter/2;

        circle.style.width=diameter+"px";

        circle.style.height=diameter+"px";

        circle.style.left=e.offsetX-radius+"px";

        circle.style.top=e.offsetY-radius+"px";

        circle.classList.add("ripple");

        const ripple=this.querySelector(".ripple");

        if(ripple){

            ripple.remove();

        }

        this.appendChild(circle);

    });

});


/*=========================================================
            FLOATING HEADER SHADOW
=========================================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY>20){

        header.style.boxShadow="0 10px 30px rgba(0,0,0,.15)";

    }
    else{

        header.style.boxShadow="0 2px 8px rgba(0,0,0,.08)";

    }

});


console.log("Animation Module Loaded Successfully");
