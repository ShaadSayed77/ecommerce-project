const products = [
    {
        id: 1,
        name: "Business Laptop",
        category: "Computers",
        price: 3499,
        stock: 10
    },

    {
        id: 2,
        name: "Gaming Laptop",
        category: "Computers",
        price: 6499,
        stock: 25
    },

    {
        id: 3,
        name: "Gaming PC",
        category: "Computers",
        price: 8350,
        stock: 0
    },
     {
        id: 4,
        name: "Headphones",
        category: "Accessories",
        price: 670,
        stock: 4
    },

    {
        id: 5,
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 350,
        stock: 8
    },

    {
        id: 6,
        name: "Gaming Mouse",
        category: "Accessories",
        price: 3499,
        stock: 25
    }

]


function renderProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = "<p>No products match your search.</p>";
    return;
  }
  list.forEach(prod => {
    const stockLabel = prod.stock === 0 ? "Out of Stock"
      : prod.stock <= 5 ? "Low Stock" : "In Stock";
    container.innerHTML += `
      <div class="product">
        <h3>${prod.name}</h3>
        <p>AED ${prod.price.toLocaleString()}</p>
        <p class="stock">${stockLabel}</p>
        <button ${prod.stock === 0 ? "disabled" : ""}>Add to Cart</button>
      </div>`;
  });
}
renderProducts(products);


document.getElementById("search-box").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  renderProducts(products.filter(p => p.name.toLowerCase().includes(term)));
});

document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.category;
    renderProducts(cat === "All" ? products : products.filter(p => p.category === cat));
  });
});


document.getElementById("sort-select").addEventListener("change", e => {
  let sorted = [...products];
  if (e.target.value === "low-high") sorted.sort((a, b) => a.price - b.price);
  if (e.target.value === "high-low") sorted.sort((a, b) => b.price - a.price);
  renderProducts(sorted);
});
