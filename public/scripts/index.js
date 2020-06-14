const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a ")

// tira o painel roxo ao clicar no butao 
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide");
})

// adiciona o painel roxo ao clicar no botao

close.addEventListener("click", () => {
    modal.classList.add("hide");
})