// document.addEventListener("DOMContentLoaded", getData);

const data = [
    {
        id: 1,
        nome: "Caneta",
        quantidade: 10,
        valor: 3.20,
    },
    {
        id: 2,
        nome: "Lápis",
        quantidade: 20,
        valor: 1.20,
    },
    {
        id: 3,
        nome: "Papel",
        quantidade: 5,
        valor: 3,
    },
    {
        id: 4,
        nome: "Caderno",
        quantidade: 8,
        valor: 25,
    },
];


// read
function getData() {
    populateTable(data);
}

function populateTable(stock) {
    const tbody = document.querySelector("tbody");
    const items = stock.map(item => {
        return `
            <tr>
                <td>${item.nome}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${item.valor}</td>
                <td>
                    <button type="button" class="btn btn-primary">Editar</button>
                    <button type="button" class="btn btn-danger">Apagar</button>
                </td>
            </tr>
        `;
    }).join("");
    tbody.insertAdjacentHTML("beforeend", items);
}

// create
function addItem(e) {
    e.preventDefault();

    const nome = document.querySelector("#nome").value;
    const quantidade = document.querySelector("#quantidade").value;
    const valor = document.querySelector("#valor").value;

    const item = { nome, quantidade, valor }
    console.log(item);
}

// update
function updateItem(id, item) {

}

// delete
function deleteItem(id) {

}

getData();
