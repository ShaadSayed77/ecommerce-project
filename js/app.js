const products = [
    {
        id: 1,
        name: "PlayStation 5 Pro",
        category: "Consoles",
        price: 2999,
        stock: 6
    },
    {
        id: 2,
        name: "Xbox Series X",
        category: "Consoles",
        price: 2399,
        stock: 4
    },
    {
        id: 3,
        name: "Nintendo Switch OLED",
        category: "Consoles",
        price: 1399,
        stock: 12
    },
    {
        id: 4,
        name: "ROG Strix Gaming Laptop",
        category: "PCs & Laptops",
        price: 7499,
        stock: 3
    },
    {
        id: 5,
        name: "MSI Aegis Gaming Desktop",
        category: "PCs & Laptops",
        price: 8999,
        stock: 0
    },
    {
        id: 6,
        name: "Alienware 27 360Hz Monitor",
        category: "Displays",
        price: 2499,
        stock: 5
    },
    {
        id: 7,
        name: 'Gigabyte 34" Curved Ultrawide',
        category: "Displays",
        price: 1899,
        stock: 8
    },
    {
        id: 8,
        name: "Logitech G Pro X Superlight 2",
        category: "Peripherals",
        price: 599,
        stock: 20
    },
    {
        id: 9,
        name: "Razer Huntsman V3 Pro Keyboard",
        category: "Peripherals",
        price: 999,
        stock: 7
    },
    {
        id: 10,
        name: "SteelSeries Arctis Nova Pro",
        category: "Audio",
        price: 1399,
        stock: 9
    },
    {
        id: 11,
        name: "HyperX Cloud III Wireless",
        category: "Audio",
        price: 599,
        stock: 15
    },
    {
        id: 12,
        name: "DualSense Edge Wireless Controller",
        category: "Peripherals",
        price: 849,
        stock: 2
    },
    {
        id: 13,
        name: "Secretlab Titan Evo Gaming Chair",
        category: "Furniture",
        price: 2199,
        stock: 4
    },
    {
        id: 14,
        name: "Elgato Stream Deck MK.2",
        category: "Streaming",
        price: 629,
        stock: 11
    },
    {
        id: 15,
        name: "Elgato Facecam Pro 4K",
        category: "Streaming",
        price: 1199,
        stock: 0
    }
];

// Display products
function renderProducts(list) {
  const container = document.getElementById("product-list");
  if (!container) return;
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No products match your search.</p>";
    return;
  }

  list.forEach(product => {
    const stockLabel =
      product.stock === 0
        ? "Out of Stock"
        : product.stock <= 5
        ? "Low Stock"
        : "In Stock";

    container.innerHTML += `
      <div class="product">
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>AED ${product.price.toLocaleString()}</p>
        <p class="stock">${stockLabel}</p>
        <button
          ${product.stock === 0 ? "disabled" : ""}
          onclick="addToCart(${product.id})"
        >
          ${product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    `;
  });
}

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  if (product.stock === 0) {
    alert("This product is out of stock.");
    return;
  }
  alert(product.name + " has been added to your cart!");
}

// Search
const searchBox = document.getElementById("search-box");
if (searchBox) {
  searchBox.addEventListener("input", event => {
    const term = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(term)
    );
    renderProducts(filteredProducts);
  });
}

// Category buttons
document.querySelectorAll(".category-btn").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    if (category === "All") {
      renderProducts(products);
    } else {
      const filteredProducts = products.filter(
        product => product.category === category
      );
      renderProducts(filteredProducts);
    }
  });
});

// Sort products
const sortSelect = document.getElementById("sort-select");
if (sortSelect) {
  sortSelect.addEventListener("change", event => {
    let sortedProducts = [...products];
    if (event.target.value === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (event.target.value === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    renderProducts(sortedProducts);
  });
}

// Show all products when page loads
renderProducts(products);