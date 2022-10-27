function fillFields(nomeItem, quantidadeItem, valorItem) {
    const nome = document.querySelector("#nome");
    const quantidade = document.querySelector("#quantidade");
    const valor = document.querySelector("#valor");

    nome.value = nomeItem;
    quantidade.value = quantidadeItem;
    valor.value = valorItem;
}
