/* Erranddoy — frontend marketplace demo
   Pure client-side. Data lives in localStorage so it survives refresh.
*/

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ---------- Seed data ----------
const SEED_PRODUCTS = [
  { id: 1, name: "50kg Bag of Rice", price: 87000, cat: "food", market: "Yaba Market", seller: "Mama Chika", badge: "new", emoji: "🍚", desc: "Premium long-grain rice, just arrived." },
  { id: 2, name: "Fresh Tomatoes (Basket)", price: 8500, cat: "food", market: "Balogun Market", seller: "FreshFarm NG", badge: "cheapest", emoji: "🍅", desc: "Farm-fresh, same-day delivery." },
  { id: 3, name: "iPhone 13 128GB", price: 385000, cat: "electronics", market: "Computer Village", seller: "TechHub", badge: "trending", emoji: "📱", desc: "Clean, battery 89%, boxed." },
  { id: 4, name: "Men's Ankara Shirt", price: 6500, cat: "fashion", market: "Idumota Market", seller: "StyleKing", badge: "new", emoji: "👕", desc: "Handmade, sizes M–XXL." },
  { id: 5, name: "Palm Oil 5L", price: 12500, cat: "food", market: "Alaba International", seller: "OilKing", badge: "cheapest", emoji: "🛢️", desc: "Pure red palm oil." },
  { id: 6, name: "Samsung A15", price: 145000, cat: "electronics", market: "Computer Village", seller: "GadgetPro", badge: "trending", emoji: "📲", desc: "Brand new, sealed." },
  { id: 7, name: "Plantain Bunch", price: 3200, cat: "food", market: "Yaba Market", seller: "GreenBasket", badge: "new", emoji: "🍌", desc: "Ripe & ready." },
  { id: 8, name: "Ladies Sneakers", price: 18500, cat: "fashion", market: "Balogun Market", seller: "ShoeZone", badge: "trending", emoji: "👟", desc: "Comfort sole, sizes 37–42." },
  { id: 9, name: "Blender 1.5L", price: 28000, cat: "home", market: "Idumota Market", seller: "HomeEssentials", badge: "cheapest", emoji: "🌀", desc: "Powerful motor, 2 years warranty." },
  { id: 10, name: "AirPods Pro Clone", price: 22000, cat: "electronics", market: "Computer Village", seller: "AudioLab", badge: "trending", emoji: "🎧", desc: "Noise cancel + case." },
  { id: 11, name: "Yam Tubers (5 pcs)", price: 9500, cat: "food", market: "Yaba Market", seller: "FarmDirect", badge: "new", emoji: "🍠", desc: "Big size, no bruises." },
  { id: 12, name: "Curtain Set (2 panels)", price: 16000, cat: "home", market: "Alaba International", seller: "DecorNG", badge: "cheapest", emoji: "🪟", desc: "Blackout fabric." },
];

const MARKETS = [
  { name: "Yaba Market", count: 128, color: "orange" },
  { name: "Balogun Market", count: 214, color: "orange" },
  { name: "Idumota Market", count: 97, color: "orange" },
  { name: "Computer Village", count: 186, color: "orange" },
  { name: "Alaba International", count: 152, color: "orange" },
  { name: "Onitsha Main Market", count: 241, color: "orange" },
];

// ---------- State ----------
let state = {
  user: null,          // { name, email, role, market, kyc }
  products: [],
  cart: [],
  orders: [],
  feedFilter: "all",
  searchCat: "all",
};

function loadState() {
  try {
    const raw = localStorage.getItem("erranddoy");
    if (raw) {
      const saved = JSON.parse(raw);
      state = { ...state, ...saved };
    }
  } catch (_) {}
  if (!state.products.length) {
    state.products = [...SEED_PRODUCTS];
  }
}

function saveState() {
  localStorage.setItem("erranddoy", JSON.stringify({
    user: state.user,
    products: state.products,
    cart: state.cart,
    orders: state.orders,
  }));
}

// ---------- Toast ----------
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2600);
}

// ---------- Format ----------
const naira = (n) => "₦" + Number(n).toLocaleString("en-NG");

// ---------- Splash → Auth / Dashboard ----------
function startApp() {
  loadState();
  setTimeout(() => {
    $("#splash").classList.add("hidden");
    if (state.user) {
      showDashboard();
    } else {
      $("#authScreen").classList.remove("hidden");
    }
  }, 2200);
}

// ---------- Auth tabs & role ----------
$$(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const tab = btn.dataset.tab;
    $("#loginForm").classList.toggle("hidden", tab !== "login");
    $("#signupForm").classList.toggle("hidden", tab !== "signup");
  });
});

$$(".role-option").forEach(opt => {
  opt.addEventListener("click", () => {
    $$(".role-option").forEach(o => o.classList.remove("selected"));
    opt.classList.add("selected");
    const isSeller = opt.dataset.role === "seller";
    $("#kycSection").classList.toggle("hidden", !isSeller);
  });
});

$("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = $("#loginEmail").value.trim();
  // Demo login – accept anything, restore or create buyer
  state.user = state.user || {
    name: email.split("@")[0] || "Henry",
    email,
    role: "buyer",
    market: null,
    kyc: false,
  };
  saveState();
  $("#authScreen").classList.add("hidden");
  showDashboard();
  toast("Welcome back!");
});

$("#signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#signupName").value.trim();
  const email = $("#signupEmail").value.trim();
  const role = $(".role-option.selected").dataset.role;
  const market = $("#kycMarket").value || null;
  const kycFile = $("#kycPhoto").files[0];

  if (role === "seller" && !market) {
    toast("Please select a market for KYC");
    return;
  }

  state.user = {
    name,
    email,
    role,
    market,
    kyc: role === "seller" ? !!kycFile || true : false, // demo: mark as submitted
  };
  saveState();
  $("#authScreen").classList.add("hidden");
  showDashboard();
  toast(role === "seller" ? "Account created! KYC submitted." : "Welcome to Erranddoy!");
});

// ---------- Dashboard ----------
function showDashboard() {
  $("#dashboard").classList.remove("hidden");
  $("#greeting").textContent = `Hello, ${state.user.name.split(" ")[0]}`;
  $("#userRoleLabel").textContent = state.user.role === "seller" ? "Seller" : "Buyer";

  const sellerOnly = $$(".seller-only");
  sellerOnly.forEach(el => el.classList.toggle("hidden", state.user.role !== "seller"));

  renderFeed();
  renderMarkets();
  renderSearch();
  renderCart();
  renderOrders();
  if (state.user.role === "seller") {
    renderSellerProducts();
    renderManager();
  }
}

$$(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const view = btn.dataset.view;
    $$(".view").forEach(v => v.classList.remove("active"));
    $(`#view-${view}`).classList.add("active");
  });
});

$("#logoutBtn").addEventListener("click", () => {
  state.user = null;
  saveState();
  $("#dashboard").classList.add("hidden");
  $("#authScreen").classList.remove("hidden");
  toast("Logged out");
});

// ---------- Feed (TikTok-style) ----------
function renderFeed() {
  let list = [...state.products];
  const f = state.feedFilter;
  if (f === "new") list = list.filter(p => p.badge === "new");
  else if (f === "trending") list = list.filter(p => p.badge === "trending");
  else if (f === "cheapest") list = list.filter(p => p.badge === "cheapest").sort((a, b) => a.price - b.price);
  else if (["electronics", "fashion", "food", "home"].includes(f)) list = list.filter(p => p.cat === f);

  const grid = $("#feedGrid");
  if (!list.length) {
    grid.innerHTML = `<div class="empty-state">No items match this filter yet.</div>`;
    return;
  }
  grid.innerHTML = list.map(p => `
    <article class="feed-card" data-id="${p.id}">
      <div class="feed-thumb">
        <span class="feed-badge">${p.badge || "deal"}</span>
        ${p.emoji || "📦"}
      </div>
      <div class="feed-info">
        <h4>${p.name}</h4>
        <p>${p.market} · ${p.seller || "Seller"}</p>
        <div class="price-tag">${naira(p.price)}</div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".feed-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = +card.dataset.id;
      addToCart(id);
    });
  });
}

$$("#feedFilters .chip").forEach(chip => {
  chip.addEventListener("click", () => {
    $$("#feedFilters .chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    state.feedFilter = chip.dataset.filter;
    renderFeed();
  });
});

// ---------- Markets ----------
function renderMarkets() {
  const grid = $("#marketGrid");
  grid.innerHTML = MARKETS.map(m => `
    <div class="market-card phone-card">
      <div class="card-header orange">
        <h3>${m.name}</h3>
        <span>${m.count}+ items</span>
      </div>
      <div class="market-list">
        ${state.products
          .filter(p => p.market === m.name)
          .slice(0, 4)
          .map(p => `<button data-id="${p.id}">${p.emoji || "•"} ${p.name} — ${naira(p.price)}</button>`)
          .join("") || `<p class="hint" style="padding:12px">No listings yet</p>`}
      </div>
    </div>
  `).join("");

  grid.querySelectorAll("button[data-id]").forEach(btn => {
    btn.addEventListener("click", () => addToCart(+btn.dataset.id));
  });
}

// ---------- Search ----------
function renderSearch(query = "") {
  let list = [...state.products];
  if (state.searchCat !== "all") list = list.filter(p => p.cat === state.searchCat);
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.market.toLowerCase().includes(q) ||
      (p.seller || "").toLowerCase().includes(q)
    );
  }

  const box = $("#searchResults");
  if (!list.length) {
    box.innerHTML = `<div class="empty-state">Nothing found. Try another keyword.</div>`;
    return;
  }
  box.innerHTML = list.map(p => `
    <div class="product-row">
      <div class="product-thumb">${p.emoji || "📦"}</div>
      <div>
        <h4>${p.name}</h4>
        <p>${p.market} · ${naira(p.price)}</p>
      </div>
      <button class="mini-btn" data-id="${p.id}">Add</button>
    </div>
  `).join("");

  box.querySelectorAll(".mini-btn").forEach(btn => {
    btn.addEventListener("click", () => addToCart(+btn.dataset.id));
  });
}

$("#searchBtn").addEventListener("click", () => renderSearch($("#searchInput").value.trim()));
$("#searchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") renderSearch($("#searchInput").value.trim());
});

$$("#searchChips .chip").forEach(chip => {
  chip.addEventListener("click", () => {
    $$("#searchChips .chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    state.searchCat = chip.dataset.cat;
    renderSearch($("#searchInput").value.trim());
  });
});

// ---------- Cart ----------
function addToCart(id) {
  const product = state.products.find(p => p.id === id);
  if (!product) return;
  const existing = state.cart.find(c => c.id === id);
  if (existing) existing.qty += 1;
  else state.cart.push({ ...product, qty: 1 });
  saveState();
  renderCart();
  toast(`${product.name} added to cart`);
}

function renderCart() {
  const items = $("#cartItems");
  const badge = $("#cartBadge");
  const countEl = $("#cartCount");
  const total = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = state.cart.reduce((s, i) => s + i.qty, 0);

  badge.textContent = count;
  countEl.textContent = count ? `(${count})` : "";
  $("#cartTotal").textContent = naira(total);

  if (!state.cart.length) {
    items.innerHTML = `<div class="empty-state">Your cart is empty. Browse the Home Feed!</div>`;
    return;
  }
  items.innerHTML = state.cart.map(i => `
    <div class="product-row">
      <div class="product-thumb">${i.emoji || "📦"}</div>
      <div>
        <h4>${i.name}</h4>
        <p>${naira(i.price)} × ${i.qty}</p>
      </div>
      <button class="mini-btn" data-remove="${i.id}">Remove</button>
    </div>
  `).join("");

  items.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.cart = state.cart.filter(c => c.id !== +btn.dataset.remove);
      saveState();
      renderCart();
    });
  });
}

$("#checkoutBtn").addEventListener("click", () => {
  if (!state.cart.length) {
    toast("Cart is empty");
    return;
  }
  const order = {
    id: Date.now(),
    items: [...state.cart],
    total: state.cart.reduce((s, i) => s + i.price * i.qty, 0),
    status: "Processing",
    date: new Date().toLocaleDateString(),
  };
  state.orders.unshift(order);
  state.cart = [];
  saveState();
  renderCart();
  renderOrders();
  if (state.user.role === "seller") renderManager();
  toast("Order placed! Check My Orders");
  // switch to orders view
  $$(".nav-btn").forEach(b => b.classList.remove("active"));
  $(`.nav-btn[data-view="orders"]`).classList.add("active");
  $$(".view").forEach(v => v.classList.remove("active"));
  $("#view-orders").classList.add("active");
});

// ---------- Orders ----------
function renderOrders() {
  const list = $("#ordersList");
  if (!state.orders.length) {
    list.innerHTML = `<div class="empty-state">No orders yet.</div>`;
    return;
  }
  list.innerHTML = state.orders.map(o => `
    <div class="order-row">
      <div>
        <h4>Order #${String(o.id).slice(-6)}</h4>
        <p>${o.items.map(i => i.name).join(", ")} · ${o.date}</p>
        <p style="margin-top:4px;font-weight:800">${naira(o.total)}</p>
      </div>
      <span class="order-status">${o.status}</span>
    </div>
  `).join("");
}

// ---------- Seller products ----------
$("#productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#pName").value.trim();
  const price = +$("#pPrice").value;
  const cat = $("#pCategory").value;
  const desc = $("#pDesc").value.trim();
  const market = $("#pMarket").value;
  const id = Date.now();
  const emojiMap = { food: "🛒", electronics: "📱", fashion: "👗", home: "🏠" };

  const product = {
    id,
    name,
    price,
    cat,
    market,
    seller: state.user.name,
    badge: "new",
    emoji: emojiMap[cat] || "📦",
    desc,
  };
  state.products.unshift(product);
  saveState();
  renderSellerProducts();
  renderFeed();
  renderMarkets();
  renderManager();
  e.target.reset();
  toast("Product posted!");
});

function renderSellerProducts() {
  const box = $("#sellerProducts");
  const mine = state.products.filter(p => p.seller === state.user.name);
  if (!mine.length) {
    box.innerHTML = `<div class="empty-state">You haven’t listed anything yet.</div>`;
    return;
  }
  box.innerHTML = mine.map(p => `
    <div class="seller-product">
      <div>
        <h4>${p.name}</h4>
        <p>${naira(p.price)} · ${p.market}</p>
      </div>
      <button class="mini-btn" data-del="${p.id}">Delete</button>
    </div>
  `).join("");

  box.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.products = state.products.filter(p => p.id !== +btn.dataset.del);
      saveState();
      renderSellerProducts();
      renderFeed();
      renderManager();
    });
  });
}

function renderManager() {
  const mine = state.products.filter(p => p.seller === state.user.name);
  $("#mProducts").textContent = mine.length;
  $("#mOrders").textContent = state.orders.length; // demo: all orders
  const rev = state.orders.reduce((s, o) => s + o.total, 0);
  $("#mRevenue").textContent = naira(rev);
  $("#kycStatusText").textContent = state.user.kyc
    ? `Verified seller · ${state.user.market || "Market pending"}`
    : "KYC pending — upload documents to get verified";
}

// ---------- Boot ----------
startApp();