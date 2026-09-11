/* Erranddoy — frontend marketplace demo
   Pure client-side. Data lives in localStorage so it survives refresh.
*/

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ---------- Seed data (real product photos via Unsplash) ----------
const SEED_PRODUCTS = [
  {
    id: 1,
    name: "50kg Bag of Premium Rice",
    price: 87000,
    cat: "food",
    market: "Yaba Market",
    seller: "Mama Chika Stores",
    sellerRating: 4.9,
    sellerReviews: 2140,
    rating: 4.8,
    reviews: 1320,
    badge: "new",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
    desc: "Premium long-grain rice, just arrived from the mill."
  },
  {
    id: 2,
    name: "Fresh Tomatoes (Full Basket)",
    price: 8500,
    cat: "food",
    market: "Balogun Market",
    seller: "FreshFarm NG",
    sellerRating: 4.7,
    sellerReviews: 980,
    rating: 4.6,
    reviews: 745,
    badge: "cheapest",
    image: "https://images.unsplash.com/photo-1546470427-e26264be0d19?w=600&q=80",
    desc: "Farm-fresh tomatoes, same-day delivery available."
  },
  {
    id: 3,
    name: "iPhone 13 128GB (Clean)",
    price: 385000,
    cat: "electronics",
    market: "Computer Village",
    seller: "TechHub Lagos",
    sellerRating: 4.8,
    sellerReviews: 3560,
    rating: 4.7,
    reviews: 1890,
    badge: "trending",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&q=80",
    desc: "Excellent condition, battery health 89%, original box."
  },
  {
    id: 4,
    name: "Men's Ankara Casual Shirt",
    price: 6500,
    cat: "fashion",
    market: "Idumota Market",
    seller: "StyleKing Fashion",
    sellerRating: 4.5,
    sellerReviews: 620,
    rating: 4.4,
    reviews: 312,
    badge: "new",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    desc: "Handmade Ankara print, sizes M–XXL available."
  },
  {
    id: 5,
    name: "Pure Red Palm Oil 5 Litres",
    price: 12500,
    cat: "food",
    market: "Alaba International",
    seller: "OilKing Ventures",
    sellerRating: 4.9,
    sellerReviews: 1710,
    rating: 4.8,
    reviews: 1105,
    badge: "cheapest",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80",
    desc: "100% pure red palm oil, no additives."
  },
  {
    id: 6,
    name: "Samsung Galaxy A15 128GB",
    price: 145000,
    cat: "electronics",
    market: "Computer Village",
    seller: "GadgetPro NG",
    sellerRating: 4.6,
    sellerReviews: 2890,
    rating: 4.5,
    reviews: 1540,
    badge: "trending",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
    desc: "Brand new, sealed, 1-year warranty."
  },
  {
    id: 7,
    name: "Ripe Plantain Bunch",
    price: 3200,
    cat: "food",
    market: "Yaba Market",
    seller: "GreenBasket Farms",
    sellerRating: 4.8,
    sellerReviews: 890,
    rating: 4.7,
    reviews: 560,
    badge: "new",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&q=80",
    desc: "Sweet ripe plantains, perfect for frying."
  },
  {
    id: 8,
    name: "Ladies Comfort Sneakers",
    price: 18500,
    cat: "fashion",
    market: "Balogun Market",
    seller: "ShoeZone Africa",
    sellerRating: 4.4,
    sellerReviews: 1120,
    rating: 4.3,
    reviews: 678,
    badge: "trending",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    desc: "Soft sole, sizes 37–42, multiple colours."
  },
  {
    id: 9,
    name: "Electric Blender 1.5L",
    price: 28000,
    cat: "home",
    market: "Idumota Market",
    seller: "HomeEssentials NG",
    sellerRating: 4.7,
    sellerReviews: 1450,
    rating: 4.6,
    reviews: 920,
    badge: "cheapest",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80",
    desc: "Powerful motor, 2-year warranty included."
  },
  {
    id: 10,
    name: "Wireless Earbuds Pro",
    price: 22000,
    cat: "electronics",
    market: "Computer Village",
    seller: "AudioLab Store",
    sellerRating: 4.5,
    sellerReviews: 2030,
    rating: 4.4,
    reviews: 1340,
    badge: "trending",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80",
    desc: "Active noise cancelling + charging case."
  },
  {
    id: 11,
    name: "Fresh Yam Tubers (5 pcs)",
    price: 9500,
    cat: "food",
    market: "Yaba Market",
    seller: "FarmDirect Produce",
    sellerRating: 4.9,
    sellerReviews: 760,
    rating: 4.8,
    reviews: 430,
    badge: "new",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80",
    desc: "Large size yams, no bruises, farm-fresh."
  },
  {
    id: 12,
    name: "Blackout Curtain Set (2 panels)",
    price: 16000,
    cat: "home",
    market: "Alaba International",
    seller: "DecorNG Living",
    sellerRating: 4.6,
    sellerReviews: 540,
    rating: 4.5,
    reviews: 290,
    badge: "cheapest",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    desc: "Thick blackout fabric, ready to hang."
  },
  {
    id: 13,
    name: "Fresh Chicken (Whole)",
    price: 7800,
    cat: "food",
    market: "Balogun Market",
    seller: "PoultryKing Farms",
    sellerRating: 4.8,
    sellerReviews: 1670,
    rating: 4.7,
    reviews: 980,
    badge: "new",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82713?w=600&q=80",
    desc: "Live-weight dressed chicken, hygienically packed."
  },
  {
    id: 14,
    name: "Men's Leather Wallet",
    price: 9500,
    cat: "fashion",
    market: "Idumota Market",
    seller: "LeatherCraft NG",
    sellerRating: 4.7,
    sellerReviews: 410,
    rating: 4.6,
    reviews: 215,
    badge: "trending",
    image: "https://images.unsplash.com/photo-1620799140408-ed5341fa2798?w=600&q=80",
    desc: "Genuine leather, multiple card slots."
  },
  {
    id: 15,
    name: "Smart Android TV 43\"",
    price: 285000,
    cat: "electronics",
    market: "Computer Village",
    seller: "TechHub Lagos",
    sellerRating: 4.8,
    sellerReviews: 3560,
    rating: 4.6,
    reviews: 2100,
    badge: "trending",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80",
    desc: "4K UHD, Netflix & YouTube built-in."
  },
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

const DATA_VERSION = 2; // bump this to force-refresh seed products

function loadState() {
  try {
    const raw = localStorage.getItem("erranddoy");
    if (raw) {
      const saved = JSON.parse(raw);
      state = { ...state, ...saved };
    }
  } catch (_) {}
  // Refresh seed if version changed or products missing images/ratings
  const needsRefresh = !state.products.length ||
    !state.products[0]?.image ||
    localStorage.getItem("erranddoy_v") !== String(DATA_VERSION);
  if (needsRefresh) {
    state.products = [...SEED_PRODUCTS];
    localStorage.setItem("erranddoy_v", String(DATA_VERSION));
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

function stars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.4 ? 1 : 0;
  let html = "";
  for (let i = 0; i < full; i++) html += "★";
  if (half) html += "☆";
  while (html.length < 5) html += "☆";
  return `<span class="stars" title="${rating.toFixed(1)}">${html}</span>`;
}

function ratingLine(p) {
  return `
    <div class="rating-line">
      ${stars(p.rating || 4.5)}
      <span class="rating-num">${(p.rating || 4.5).toFixed(1)}</span>
      <span class="review-count">(${(p.reviews || 0).toLocaleString()} reviews)</span>
    </div>
    <div class="seller-line">
      by <strong>${p.seller || "Seller"}</strong>
      ${stars(p.sellerRating || 4.5)}
      <span class="review-count">${(p.sellerReviews || 0).toLocaleString()}+ sales</span>
    </div>
  `;
}

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
        <img src="${p.image}" alt="${p.name}" loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80'" />
      </div>
      <div class="feed-info">
        <h4>${p.name}</h4>
        ${ratingLine(p)}
        <p class="market-tag">${p.market}</p>
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
          .map(p => `<button data-id="${p.id}">
            <img class="mini-thumb" src="${p.image}" alt="" onerror="this.style.display='none'" />
            <span>${p.name} — ${naira(p.price)} · ★${(p.rating||4.5).toFixed(1)}</span>
          </button>`)
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
      <div class="product-thumb">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
             onerror="this.parentElement.textContent='📦'" />
      </div>
      <div>
        <h4>${p.name}</h4>
        ${ratingLine(p)}
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
      <div class="product-thumb">
        <img src="${i.image}" alt="${i.name}" loading="lazy"
             onerror="this.parentElement.textContent='📦'" />
      </div>
      <div>
        <h4>${i.name}</h4>
        <p>${naira(i.price)} × ${i.qty} · ★${(i.rating||4.5).toFixed(1)} · ${i.seller || ""}</p>
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
  const defaultImages = {
    food: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80",
    fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    home: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80",
  };

  const product = {
    id,
    name,
    price,
    cat,
    market,
    seller: state.user.name,
    sellerRating: 4.5,
    sellerReviews: 12,
    rating: 5.0,
    reviews: 1,
    badge: "new",
    image: defaultImages[cat] || defaultImages.food,
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
      <div class="product-thumb" style="width:48px;height:48px;border-radius:12px;overflow:hidden;flex-shrink:0">
        <img src="${p.image}" alt="" style="width:100%;height:100%;object-fit:cover"
             onerror="this.parentElement.textContent='📦'" />
      </div>
      <div>
        <h4>${p.name}</h4>
        <p>${naira(p.price)} · ★${(p.rating||5).toFixed(1)} · ${p.market}</p>
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
