document.addEventListener("DOMContentLoaded", () => {
    const createBtn = document.getElementById("create");
    createBtn.addEventListener("click", (event) => addItem(event));

    getData();

    const deleteBtn = document.getElementById("delete");
    deleteBtn.addEventListener("click", () => deleteItem());
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbHH9Ur85s6Pqz7APTyOP6C9hMhLtuQeg",
  authDomain: "primeiro-projeto-e0390.firebaseapp.com",
  databaseURL: "https://primeiro-projeto-e0390-default-rtdb.firebaseio.com",
  projectId: "primeiro-projeto-e0390",
  storageBucket: "primeiro-projeto-e0390.appspot.com",
  messagingSenderId: "723226326735",
  appId: "1:723226326735:web:7a70433ed43348100969ba"
}

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

// read
async function getData() {
    const estoque = collection(database, "estoque");
    const estoqueSnapshot = await getDocs(estoque);
    const estoqueData = estoqueSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    populateTable(estoqueData);
}

function populateTable(stock) {
    cleanTable();
    const tbody = document.querySelector("tbody");
    const items = stock.map(item => {
        return `
            <tr>
                <td>${item.nome}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${item.valor}</td>
                <td>
                    <button type="button" class="btn btn-primary" 
                        onclick="fillFields('${item.nome}', ${item.quantidade}, ${item.valor}, '${item.id}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setIdOnLocalStorage('${item.id}')">
                        Apagar
                    </button>
                </td>
            </tr>
        `;
    }).join("");
    tbody.insertAdjacentHTML("beforeend", items);
}

function cleanTable() {
    const tbody = document.querySelector("tbody");
    const tbodyChildren = tbody.querySelectorAll("tr");
    tbodyChildren.forEach(item => {
        tbody.removeChild(item);
    });
}

// create
async function addItem(e) {
    e.preventDefault();

    const nome = document.querySelector("#nome").value;
    const quantidade = document.querySelector("#quantidade").value;
    const valor = document.querySelector("#valor").value;

    const item = { nome, quantidade, valor }

    if (localStorage.getItem("item-estoque-id")) {
        updateItem(item);
        return;
    }
    
    const estoque = collection(database, "estoque");
    const doc = await addDoc(estoque, item);
    if (doc) getData();
}

// update
async function updateItem(item) {
    const id = localStorage.getItem("item-estoque-id");
    await updateDoc(doc(database, "estoque", id), item);
    localStorage.removeItem("item-estoque-id");
    getData();
}

// delete
function deleteItem() {
    const id = localStorage.getItem("item-estoque-id");
    deleteDoc(doc(database, "estoque", id));
    localStorage.removeItem("item-estoque-id");
    getData();
}
