function populatesUFs() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()) // transformando a response em json
        .then(states => { // usando tirando os dados do json
            for (const state of states) { // for para preencher o form de option 
                ufselect.innerHTML += `<option value ="${state.id}"> ${state.nome} </option>`
            }
        })
}
populatesUFs();

function getCities(event) {
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");

    const ufvalue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    citySelect.innerHTML = "<option value > selecione a cidade </option> " // mudo o seletor para evitar bugs.
    citySelect.disabled = true; // tirando bug das cidades que ficavam ao selecionar outra.

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`;

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()) // transformando a response em json
        .then(cities => { // usando tirando os dados do json
            for (const city of cities) { // for para preencher o form de option 
                citySelect.innerHTML += `<option value ="${city.id}"> ${city.nome} </option>`
            }
            citySelect.disabled = false; // alterando para deixar o seletor de cidades habilitado   
        })
}

//procurando indo na tag select procurando, procurando por mudanças de eventos e exibindo no console. 

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);