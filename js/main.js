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
/*filtrage des freelances*/
const boutons = document.querySelectorAll(".filter-btn");
const cartes = document.querySelectorAll(".freelance-card");
if(boutons.length > 0 && cartes.length > 0){
    boutons.forEach(function(btn){
        btn.addEventListener("click", function(){
            boutons.forEach(function(b){
                b.classList.remove("active");
            });
            btn.classList.add("active");
            const filtre = btn.dataset.filtre;
            cartes.forEach(function(carte){
                if(filtre === "all" || carte.dataset.category === filtre){
                    carte.style.display = "block";
                }else{
                    carte.style.display = "none";
                }
            });
        });
    });
}
/*validation formulaire*/
const contactForm = document.getElementById("contactForm");
if(contactForm){
    contactForm.addEventListener("submit", function(e){
        e.preventDefault();
        let valide = true;
        const prenom = document.getElementById("prenom");
        const nom = document.getElementById("nom");
        const email = document.getElementById("email");
        const sujet = document.getElementById("sujet");
        const message = document.getElementById("message");

        const prenomError = document.getElementById("prenomError");
        const nomError = document.getElementById("nomError");
        const emailError = document.getElementById("emailError");
        const sujetError = document.getElementById("sujetError");
        const messageError = document.getElementById("messageError");
        const successMessage = document.getElementById("successMessage"); 

        prenomError.textContent = "";
        nomError.textContent = "";
        emailError.textContent = "";
        sujetError.textContent = "";
        messageError.textContent = "";
        successMessage.textContent = "";

        if(prenom.value.trim() === ""){
            prenomError.textContent="le prenom est obligatoire.";
            valide = false;
        }
        if(nom.value.trim() === "") {
            nomError.textContent="le nom est obligatoire.";
            valide = false;
        } 
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if(email.value.trim() === "") {
            emailError.textContent="l'adrese mail est obligatoire.";
            valide = false;
        } 
        else if(!regex.test(email.value.trim())){
            emailError.textContent="Adresse email invalide.";
            valide = false;
        }
        if(sujet.value === ""){
            sujetError.textContent="Veuillez choisir un sujet.";
            valide = false;
        }
        if(message.value.trim() === ""){
            messageError.textContent=" Le message est obligatoire.";
            valide = false;
        }
        else if(message.value.trim().length < 20){
            messageError.textContent="Le message doit contenir au moins 20 caractéres.";
            valide=false;
        }
        if(valide){
            successMessage.textContent="Votre message a été envoyé avec succés.";
            contactForm.reset();
        }
    }); 
}    