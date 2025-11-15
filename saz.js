const style = document.createElement("style");
style.innerHTML = `
    body {
        font-family: 'Arial';
        background: #f2f4f7;
        padding: 40px;
        display: flex;
        gap: 40px;
    }

    #left-title {
        margin-top: 40px;
        width: 300px;
    }

    #left-title h1 {
        color: #6c8793;
        font-size: 32px;
        line-height: 1.3;
    }

    #product-form-area, #product-list-area {
        background: white;
        padding: 25px;
        border-radius: 12px;
        width: 550px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        margin-top: 20px;
    }

    input {
        width: 100%;
        padding: 12px;
        margin: 6px 0 15px;
        border: 1px solid #cfd8df;
        border-radius: 6px;
        font-size: 16px;
    }

    #add-product-btn,
    #update-product-btn {
        background: #789bb1;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 5px;
    }

    #add-product-btn:hover,
    #update-product-btn:hover {
        background: #5f879c;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
        border-radius: 8px;
        overflow: hidden;
    }

    thead {
        background: #86aabc;
        color: white;
        font-weight: bold;
    }

    th, td {
        padding: 14px;
        border-bottom: 1px solid #ddd;
    }

    .edit-btn {
        background: #f2b400;
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        margin-right: 6px;
    }

    .edit-btn:hover {
        background: #d99c00;
    }

    .delete-btn {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
    }

    .delete-btn:hover {
        background: #c0392b;
    }
`;
document.head.appendChild(style);

a
const addProductBtn = document.getElementById("add-product-btn");
const updateProductBtn = document.getElementById("update-product-btn");

const nameInput = document.getElementById("product-name-input");
const priceInput = document.getElementById("product-price-input");
const idEditInput = document.getElementById("product-id-to-edit");
const tableBody = document
  .getElementById("product-table")
  .getElementsByTagName("tbody")[0];

// Dữ liệu mẫu
let products = [
    { id: 1, name: "Bàn phím cơ", price: 1200000 },
];

// Format số tiền
function formatMoney(n) {
    return n.toLocaleString("vi-VN");
}

// Cập nhật bảng
function renderProducts() {
    tableBody.innerHTML = "";

    products.forEach((p) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${formatMoney(p.price)}</td>
            <td>
                <button class="edit-btn" onclick="editProduct(${p.id})">Sửa</button>
                <button class="delete-btn" onclick="deleteProduct(${p.id})">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addProduct() {
    const name = nameInput.value.trim();
    const price = parseInt(priceInput.value.trim());

    if (!name || !price) {
        alert("Vui lòng nhập đủ thông tin!");
        return;
    }

    products.push({
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        price,
    });

    nameInput.value = "";
    priceInput.value = "";
    renderProducts();
}

function editProduct(id) {
    const p = products.find(x => x.id === id);

    nameInput.value = p.name;
    priceInput.value = p.price;
    idEditInput.value = id;

    updateProductBtn.style.display = "inline-block";
    addProductBtn.style.display = "none";
}

function updateProduct() {
    const id = parseInt(idEditInput.value);
    const name = nameInput.value.trim();
    const price = parseInt(priceInput.value.trim());

    const p = products.find(x => x.id === id);

    p.name = name;
    p.price = price;

    nameInput.value = "";
    priceInput.value = "";
    idEditInput.value = "";

    updateProductBtn.style.display = "none";
    addProductBtn.style.display = "inline-block";

    renderProducts();
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    renderProducts();
}

addProductBtn.onclick = addProduct;
updateProductBtn.onclick = updateProduct;

renderProducts();
