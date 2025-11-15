const products = [
    { id: 1, name: "Bàn phím cơ", price: 1200000 },
    { id: 2, name: "Máy tính bàn", price: 15000000 },
    { id: 3, name: "Laptop cơ bản", price: 22000000 },
];

const nameInput = document.querySelector("#product-name");
const priceInput = document.querySelector("#product-price");
const addBtn = document.querySelector("#add-btn");
const tableBody = document.querySelector("#product-list");

function formatPrice(n) {
    return n.toLocaleString("vi-VN");
}

function renderProducts() {
    tableBody.innerHTML = "";

    products.forEach((p) => {
        const tr = document.createElement("tr");
        tr.style.borderBottom = "1px solid #ccc";

        tr.innerHTML = `
            <td style="padding: 12px;">${p.id}</td>
            <td style="padding: 12px;">${p.name}</td>
            <td style="padding: 12px;">${formatPrice(p.price)}</td>
            <td style="padding: 12px;">
                <button class="update-btn" style="background: #F4C430; padding: 6px 12px; border: none; border-radius: 6px; margin-right: 6px; cursor: pointer; color: white;">Sửa</button>
                <button class="delete-btn" style="background: #E74C3C; padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; color: white;">Xóa</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });

    attachEvents();
}

function attachEvents() {
    document.querySelectorAll(".update-btn").forEach(btn => {
        btn.addEventListener("click", updateProduct);
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", deleteProduct);
    });
}
function addProduct() {
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);

    if (!name || !price) {
        alert("Vui lòng nhập đủ thông tin!");
        return;
    }

    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        price,
    };

    products.push(newProduct);
    renderProducts();

    nameInput.value = "";
    priceInput.value = "";
}
function updateProduct(e) {
    const tr = e.target.closest("tr");
    const id = Number(tr.children[0].textContent);

    const product = products.find(p => p.id === id);

    const newName = prompt("Tên mới:", product.name);
    if (newName === null) return;

    const newPrice = prompt("Giá mới:", product.price);
    if (newPrice === null) return;

    product.name = newName;
    product.price = Number(newPrice);

    renderProducts();
}

function deleteProduct(e) {
    const tr = e.target.closest("tr");
    const id = Number(tr.children[0].textContent);

    const index = products.findIndex(p => p.id === id);
    products.splice(index, 1);

    renderProducts();
}

addBtn.addEventListener("click", addProduct);

renderProducts();
