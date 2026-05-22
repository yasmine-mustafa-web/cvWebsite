const menuToggle=document.querySelector(".menuToggle");
const NavRight=document.querySelector(".navRight");
menuToggle.addEventListener('click' , (event)=>{
    NavRight.classList.toggle("active");
    event.stopPropagation();
});
window.addEventListener("click",(event)=>{
    if (NavRight.classList.contains("active") && !NavRight.contains(event.target) && !menuToggle.contains(event.target)){
        NavRight.classList.remove("active");
    }
})