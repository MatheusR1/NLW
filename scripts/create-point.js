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

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`;

    citySelect.innerHTML = "<option value > selecione a cidade </option> " // mudo o seletor para evitar bugs.
    citySelect.disabled = true; // tirando bug das cidades que ficavam ao selecionar outra.

    fetch(url)
        .then(res => res.json()) // transformando a response em json
        .then(cities => { // usando tirando os dados do json
            for (const city of cities) { // for para preencher o form de option 
                citySelect.innerHTML += `<option value ="${city.nome}"> ${city.nome} </option>`
            }
            citySelect.disabled = false; // alterando para deixar o seletor de cidades habilitado   
        })
}

//procurando indo na tag select procurando, procurando por mudanças de eventos e exibindo no console. 

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);


//=======================================API IBGE================================================================

// click nos intens de coleta, cria class para diferenciar dos itens selecionados, funcional visualmente. 

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", hundleSelectedItem);
};


const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function hundleSelectedItem(event) {
    const itemLi = event.target;

    itemLi.classList.toggle("selected"); // adiciona class as tags de li no html

    const itemId = itemLi.dataset.id;

    //verificar se existem itens selecionados, se sim
    // pegar items selecionados.
    const alreadySelected = selectedItems.findIndex(item => item == itemId); // função nativa que retorna a posição do item  se true ou -1 se false. 

    //se já estiver selecionado tirar da seleção 
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item != itemId);
        selectedItems = filteredItems; // sobrescrevo o array de intens selecionado com o de nao selecionados

    } else {
        //se nao estiver adicionado, adicionar a seleção
        // adicionar a seleção
        selectedItems.push(itemId);
    }
    console.log(selectedItems);

    // atulizar o campo escontido com o items selecionados
    collectedItems.value = selectedItems;
}