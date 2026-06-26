const themeToggle = document.getElementById("theme-toggle");
//fonction pour mettre à jour l'icone du bouton
function updateIcon(){
    if(!themeToggle) return;
    const icon = themeToggle.querySelector("i");
    if(document.body.classList.contains("light-mode")){
        icon.className = "bi bi-sun-fill";
    }else{
        icon.className = "bi bi-moon-fill";
    }
}
//dark mode au changement
if (localStorage.getItem("theme") ==="light"){
    document.body.classList.add("light-mode");
}
//sécurité : vérification du localstorage au changement de la page
if (themeToggle){
    updateIcon();
    themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if ( document.body.classList.contains("light-mode")){
        localStorage.setItem("theme", "light");
    }else{
         localStorage.setItem("theme", "dark");

    }
    updateIcon();
});
}
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll",() =>{
    if(window.scrollY > 50){
        navbar.classList.add("navbar-scrolled");
    }else{
         navbar.classList.remove("navbar-scrolled");
    }
});
//Gestion du bouton du bas
const  backtotop = document.getElementById("backtotop");
if(backtotop){
  window.addEventListener("scroll",() => {
    if(window.scrollY > 300){
        backtotop.classList.add("show");
    }else{
         backtotop.classList.remove("show");
    }
});  
backtotop.addEventListener("click",() =>{
    window.scrollTo({
        top:0,
        behavior: "smooth"
    })
}); 
}
//fade in sections
const fadeSections = document.querySelectorAll(".fade-section");
const fadeObserver = new IntersectionObserver((entries) =>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold: 0.2
});
fadeSections.forEach(section => {
    fadeObserver.observe(section);
});
//compteurs animés
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries, observer) =>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            let count = 0;
            const step = Math.max(1, Math.ceil(target/ 100)) ;
            function update(){
                count += step;
                if(count >= target){
                    counter.textContent = "+" + target.toLocaleString("fr-FR");
                }else{
                    counter.textContent = "+" + Math.floor(count).toLocaleString("fr-FR");
                    requestAnimationFrame(update);
                }
            }
            update();
        }
    });
},{
    threshold:0.5
});
counters.forEach(counter => {
    counterObserver.observe(counter);
});