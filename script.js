/**
 * IMPOSTRIX // HIGH-END STREETWEAR ATELIER CAIRO
 * Client Interaction Script (Pure English Edition)
 * Features: Product Detail Modal (PDP), Size Selector, Size Guide, Cart Drawer, Multi-Currency & Filters
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- State Management ---
    const state = {
        cart: [],
        shippingThreshold: 2500,
        currentModalProductId: 1,
        selectedSize: 'L',
        modalQuantity: 1
    };

    // Product Database with rich PDP specs
    const products = {
        1: {
            id: 1,
            code: "IMPOSTRIX FW26 // IM-01-HD",
            badge: "LIMITED DROP",
            title: "Track 01 - Heavyweight Acid Hoodie",
            price_egp: 2400,
            price_usd: 85,
            image: "assets/product1.png",
            category: "hoodies",
            stock: "✓ IN STOCK (SHIPS IN 24H)",
            desc: "Heavyweight 500 GSM custom-knit organic French terry cotton with an exaggerated boxy drape, dropped shoulders, and double-layered thermal hood. Finished with hand-distressed acid wash treatment and bespoke hardware.",
            bullets: [
                "500 GSM Heavyweight Custom French Terry (100% Egyptian Cotton).",
                "Boxy oversized silhouette with dropped shoulders and raw cut details.",
                "Pre-shrunk organic fabric to preserve proportions forever.",
                "Embroidered signature crimson arrow motif.",
                "Model is 186cm / 6'1\" wearing size L for relaxed drape."
            ]
        },
        2: {
            id: 2,
            code: "IMPOSTRIX FW26 // IM-02-TEE",
            badge: "EXCLUSIVE",
            title: "Track 02 - Boxy Raw Edge Tee",
            price_egp: 1100,
            price_usd: 40,
            image: "assets/product2.png",
            category: "tees",
            stock: "✓ IN STOCK (SHIPS IN 24H)",
            desc: "280 GSM heavyweight jersey tee engineered with raw-cut distressed hemline, thick ribbed collar, and minimal subtle chest embroidery. Designed to hold structural shape through repeated wear.",
            bullets: [
                "280 GSM Combed Cotton Single Jersey.",
                "Wide boxy torso cut with elongated sleeves.",
                "Thick 1.25-inch high-density ribbed collar.",
                "Reinforced double-stitch shoulder construction.",
                "Model is 186cm / 6'1\" wearing size L."
            ]
        },
        3: {
            id: 3,
            code: "IMPOSTRIX FW26 // IM-03-PNT",
            badge: "NEW SILHOUETTE",
            title: "Track 03 - Technical Cargo Track Pant",
            price_egp: 2800,
            price_usd: 98,
            image: "assets/product3.jpg",
            category: "pants",
            stock: "✓ IN STOCK (LIMITED BATCH)",
            desc: "Architectural cargo pant constructed from durable water-resistant technical twill. Features 6 ergonomic storage pockets, custom bungee toggle adjusters at the ankles, and an elasticated waistband with drawstring.",
            bullets: [
                "Water-resistant Japanese technical twill textile.",
                "6 ergonomic 3D gusseted utility cargo pockets.",
                "Ankle bungee cinch cords to switch between straight and tapered hem.",
                "Heavy-duty matte black YKK hardware.",
                "True to size waist with relaxed thigh drape."
            ]
        },
        4: {
            id: 4,
            code: "IMPOSTRIX FW26 // IM-04-CRW",
            badge: "SIGNATURE SAND",
            title: "Track 04 - Washed Sand Oversized Crewneck",
            price_egp: 2200,
            price_usd: 78,
            image: "assets/product4.jpg",
            category: "hoodies",
            stock: "✓ IN STOCK",
            desc: "450 GSM ultra-soft brushed fleece in an earthy muted sand tone. Designed with minimalist tonal stitching, wide ribbed cuffs, and an exaggerated relaxed torso silhouette.",
            bullets: [
                "450 GSM Custom Muted Sand Terry Fleece.",
                "Relaxed drop-shoulder pattern with clean neckline.",
                "Pigment-dyed and enzyme washed for ultra-soft vintage touch.",
                "Tonal minimalist embroidery on wrist cuff.",
                "Model is 184cm wearing size L."
            ]
        },
        5: {
            id: 5,
            code: "IMPOSTRIX FW26 // IM-05-ACC",
            badge: "LOW STOCK",
            title: "Track 05 - Crimson Arrow Curved Cap",
            price_egp: 750,
            price_usd: 28,
            image: "assets/product5.jpg",
            category: "accessories",
            stock: "⚠ ONLY 8 PIECES REMAINING",
            desc: "Vintage washed charcoal 6-panel unstructured dad cap featuring precision crimson arrow embroidery and an embossed metal buckle back strap.",
            bullets: [
                "100% Washed Vintage Cotton Chino Twill.",
                "Unstructured low-profile 6-panel fit.",
                "High-density crimson thread arrow embroidery.",
                "Antique brass embossed adjustable slider buckle.",
                "One size fits all (Unisex)."
            ]
        },
        6: {
            id: 6,
            code: "IMPOSTRIX FW26 // IM-06-JKT",
            badge: "FW26 HIGHLIGHT",
            title: "Track 06 - Slate Petrol Tactical Bomber",
            price_egp: 3600,
            price_usd: 125,
            image: "assets/product6.jpg",
            category: "outerwear",
            stock: "✓ IN STOCK (ARCHIVE EDITION)",
            desc: "Statement tactical bomber in deep slate petrol with contrast crimson zipper tracks, thermal insulated interior lining, and storm flap weather protection.",
            bullets: [
                "Technical slate petrol nylon shell with DWR storm protection.",
                "Contrast crimson high-grade dual-direction zipper.",
                "Insulated breathable thermal quilt lining.",
                "Ribbed storm cuffs and collar for insulation.",
                "Model is 188cm wearing size L."
            ]
        }
    };

    // --- DOM Elements ---
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartCountBadge = document.getElementById('cart-count');
    const cartDrawerCount = document.getElementById('cart-drawer-count');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmptyState = document.getElementById('cart-empty-state');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const shippingProgressBar = document.getElementById('shipping-progress-bar');
    const shippingProgressText = document.getElementById('shipping-progress-text');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card');
    const visibleCountTag = document.getElementById('visible-products-count');


    const vipForm = document.getElementById('vip-form');
    const formFeedback = document.getElementById('form-feedback');

    // Product Modal Elements
    const productModal = document.getElementById('product-modal');
    const productModalOverlay = document.getElementById('product-modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalProductImg = document.getElementById('modal-product-img');
    const modalProductBadge = document.getElementById('modal-product-badge');
    const modalProductCode = document.getElementById('modal-product-code');
    const modalProductTitle = document.getElementById('modal-product-title');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalStockStatus = document.getElementById('modal-stock-status');
    const modalProductDesc = document.getElementById('modal-product-desc');
    const modalBullets = document.getElementById('modal-bullets');
    const selectedSizeDisplay = document.getElementById('selected-size-display');
    const sizeBtns = document.querySelectorAll('.size-btn');
    const modalQtyMinus = document.getElementById('modal-qty-minus');
    const modalQtyPlus = document.getElementById('modal-qty-plus');
    const modalQtyNumber = document.getElementById('modal-qty-number');
    const modalAddToBag = document.getElementById('modal-add-to-bag');

    // Size Guide Modal Elements
    const sizeModal = document.getElementById('size-modal');
    const sizeModalOverlay = document.getElementById('size-modal-overlay');
    const closeSizeModal = document.getElementById('close-size-modal');
    const sizeGuideTriggers = document.querySelectorAll('.open-size-guide-trigger');

    // --- Drawer Controls ---
    function openDrawer(drawer) {
        drawer.classList.add('open');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeAllDrawers() {
        if (mobileDrawer) mobileDrawer.classList.remove('open');
        if (cartDrawer) cartDrawer.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (openMenuBtn) openMenuBtn.addEventListener('click', () => openDrawer(mobileDrawer));
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeAllDrawers);
    if (openCartBtn) openCartBtn.addEventListener('click', () => openDrawer(cartDrawer));
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeAllDrawers);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeAllDrawers);

    // Mobile nav item click
    document.querySelectorAll('.mobile-nav-sections a').forEach(link => {
        link.addEventListener('click', () => {
            const filter = link.getAttribute('data-filter');
            if (filter) applyFilter(filter);
            closeAllDrawers();
        });
    });

    const startShoppingBtn = document.getElementById('cart-start-shopping');
    if (startShoppingBtn) startShoppingBtn.addEventListener('click', closeAllDrawers);

    // --- Footer Accordion Toggle Logic ---
    document.querySelectorAll('.footer-heading-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.closest('.accordion-group');
            if (!group) return;
            const isCurrentlyActive = group.classList.contains('active');
            
            if (isCurrentlyActive) {
                group.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                group.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // --- Filter Tabs Logic ---
    function applyFilter(category) {
        filterTabs.forEach(tab => {
            if (tab.getAttribute('data-category') === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        let visibleCount = 0;
        productCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (category === 'all' || cardCat === category) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (visibleCountTag) {
            visibleCountTag.textContent = `${visibleCount} PIECES`;
        }
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const cat = tab.getAttribute('data-category');
            applyFilter(cat);
        });
    });

    // --- Product Detail Modal (PDP) Logic ---
    function openProductModal(productId) {
        const p = products[productId];
        if (!p) return;

        state.currentModalProductId = productId;
        state.modalQuantity = 1;
        if (modalQtyNumber) modalQtyNumber.textContent = '1';

        // Populate Modal Fields
        if (modalProductImg) {
            modalProductImg.src = p.image;
            modalProductImg.alt = p.title;
        }
        if (modalProductBadge) modalProductBadge.textContent = p.badge;
        if (modalProductCode) modalProductCode.textContent = p.code;
        if (modalProductTitle) modalProductTitle.textContent = p.title;
        if (modalStockStatus) modalStockStatus.textContent = p.stock;
        if (modalProductDesc) modalProductDesc.textContent = p.desc;

        // Pricing
        if (modalProductPrice) modalProductPrice.textContent = formatPrice(p.price_egp);

        // Bullets
        if (modalBullets) {
            modalBullets.innerHTML = p.bullets.map(b => `<li>${b}</li>`).join('');
        }

        // Show Modal
        if (productModal && productModalOverlay) {
            productModal.classList.add('active');
            productModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeProductModal() {
        if (productModal) productModal.classList.remove('active');
        if (productModalOverlay) productModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeProductModal);
    if (productModalOverlay) productModalOverlay.addEventListener('click', closeProductModal);

    // Card click & View Detail buttons
    document.querySelectorAll('.view-detail-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'), 10);
            openProductModal(id);
        });
    });

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.quick-add-btn')) return;
            const id = parseInt(card.getAttribute('data-id'), 10);
            openProductModal(id);
        });
    });

    // Size Selection inside Modal
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedSize = btn.getAttribute('data-size');
            if (selectedSizeDisplay) selectedSizeDisplay.textContent = state.selectedSize;
        });
    });

    // Quantity selector inside Modal
    if (modalQtyMinus) {
        modalQtyMinus.addEventListener('click', () => {
            if (state.modalQuantity > 1) {
                state.modalQuantity -= 1;
                modalQtyNumber.textContent = state.modalQuantity;
            }
        });
    }

    if (modalQtyPlus) {
        modalQtyPlus.addEventListener('click', () => {
            state.modalQuantity += 1;
            modalQtyNumber.textContent = state.modalQuantity;
        });
    }

    // Modal Add To Bag
    if (modalAddToBag) {
        modalAddToBag.addEventListener('click', () => {
            addToCart(state.currentModalProductId, state.selectedSize, state.modalQuantity);
            closeProductModal();
        });
    }

    // Modal Accordions inside PDP
    document.querySelectorAll('.modal-accordion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.modal-accordion-item');
            if (item) item.classList.toggle('active');
        });
    });

    // --- Size Guide Modal Logic ---
    function openSizeGuide() {
        if (sizeModal && sizeModalOverlay) {
            sizeModal.classList.add('active');
            sizeModalOverlay.classList.add('active');
        }
    }

    function closeSizeGuide() {
        if (sizeModal && sizeModalOverlay) {
            sizeModal.classList.remove('active');
            sizeModalOverlay.classList.remove('active');
        }
    }

    sizeGuideTriggers.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSizeGuide();
    }));

    if (closeSizeModal) closeSizeModal.addEventListener('click', closeSizeGuide);
    if (sizeModalOverlay) sizeModalOverlay.addEventListener('click', closeSizeGuide);

    // --- Policy Modal Logic ---
    const policyModal = document.getElementById('policy-modal');
    const policyModalOverlay = document.getElementById('policy-modal-overlay');
    const closePolicyModal = document.getElementById('close-policy-modal');
    const policyModalTitle = document.getElementById('policy-modal-title');
    const policyModalBody = document.getElementById('policy-modal-body');
    const policyTriggers = document.querySelectorAll('.open-policy-trigger');

    const policies = {
        shipping: {
            title: "SHIPPING & CUSTOMS",
            content: "We offer complimentary worldwide shipping on all orders over 2500 EGP. Orders are processed and dispatched within 24-48 hours. Please note that international shipments may be subject to import taxes, customs duties, and fees levied by the destination country."
        },
        returns: {
            title: "RETURNS & EXCHANGE",
            content: "We accept returns within 14 days of delivery for a full refund or exchange. Items must be unworn, unwashed, and in their original condition with all tags attached. Please note that archive and sale items are final sale and cannot be returned."
        }
    };

    function openPolicyModal(policyType) {
        const policy = policies[policyType];
        if (policy && policyModal && policyModalOverlay) {
            policyModalTitle.textContent = policy.title;
            policyModalBody.innerHTML = `<p>${policy.content}</p>`;
            policyModal.classList.add('active');
            policyModalOverlay.classList.add('active');
        }
    }

    function closePolicyModalFn() {
        if (policyModal && policyModalOverlay) {
            policyModal.classList.remove('active');
            policyModalOverlay.classList.remove('active');
        }
    }

    policyTriggers.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        const policyType = btn.getAttribute('data-policy');
        openPolicyModal(policyType);
        closeAllDrawers(); // Close mobile drawer if open
    }));

    if (closePolicyModal) closePolicyModal.addEventListener('click', closePolicyModalFn);
    if (policyModalOverlay) policyModalOverlay.addEventListener('click', closePolicyModalFn);

    // --- Quick Add To Cart from Card ---
    document.querySelectorAll('.quick-add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'), 10);
            addToCart(id, 'L', 1);
        });
    });

    // --- Cart Management ---
    function addToCart(productId, size = 'L', quantity = 1) {
        const existingItem = state.cart.find(item => item.id === productId && item.size === size);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            state.cart.push({
                id: productId,
                size: size,
                quantity: quantity
            });
        }

        updateCartUI();
        showToast("Item added to your shopping bag");
        openDrawer(cartDrawer);
    }

    function removeFromCart(productId, size) {
        state.cart = state.cart.filter(item => !(item.id === productId && item.size === size));
        updateCartUI();
    }

    function updateItemQty(productId, size, delta) {
        const item = state.cart.find(item => item.id === productId && item.size === size);
        if (!item) return;
        
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId, size);
        } else {
            updateCartUI();
        }
    }

    function updateCartUI() {
        const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Update Count Badges
        if (cartCountBadge) cartCountBadge.textContent = totalItems;
        if (cartDrawerCount) cartDrawerCount.textContent = `(${totalItems})`;

        if (state.cart.length === 0) {
            cartEmptyState.style.display = 'flex';
            cartItemsList.innerHTML = '';
            cartSubtotalEl.textContent = formatPrice(0);
            updateShippingProgress(0);
            return;
        }

        cartEmptyState.style.display = 'none';
        cartItemsList.innerHTML = '';

        let subtotal = 0;

        state.cart.forEach(item => {
            const p = products[item.id];
            if (!p) return;

            const itemPrice = p.price_egp;
            subtotal += itemPrice * item.quantity;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${p.image}" alt="${p.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <span class="cart-item-title">${p.title}</span>
                    <span class="cart-item-size-tag">SIZE: ${item.size}</span>
                    <span class="cart-item-price">${formatPrice(itemPrice * item.quantity)}</span>
                    <div class="cart-item-controls">
                        <button class="qty-btn" data-action="minus" data-id="${item.id}" data-size="${item.size}">-</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" data-action="plus" data-id="${item.id}" data-size="${item.size}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}" data-size="${item.size}" aria-label="Remove item">
                    <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
            `;

            cartItemsList.appendChild(itemEl);
        });

        // Add listeners for quantity and remove buttons
        cartItemsList.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'), 10);
                const size = btn.getAttribute('data-size');
                const action = btn.getAttribute('data-action');
                updateItemQty(id, size, action === 'plus' ? 1 : -1);
            });
        });

        cartItemsList.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'), 10);
                const size = btn.getAttribute('data-size');
                removeFromCart(id, size);
            });
        });

        cartSubtotalEl.textContent = formatPrice(subtotal);
        updateShippingProgress(subtotal);
    }

    function updateShippingProgress(subtotal) {
        const threshold = state.shippingThreshold;
        const progress = Math.min(100, Math.round((subtotal / threshold) * 100));
        
        if (shippingProgressBar) {
            shippingProgressBar.style.width = `${progress}%`;
        }

        if (shippingProgressText) {
            if (subtotal >= threshold) {
                shippingProgressText.innerHTML = `<span style="color:#2b7a3e;">✓ YOU UNLOCKED FREE WORLDWIDE SHIPPING</span>`;
            } else {
                const remaining = threshold - subtotal;
                shippingProgressText.innerHTML = `Add ${formatPrice(remaining)} for FREE worldwide shipping`;
            }
        }
    }

    function formatPrice(amount) {
        return `${amount.toLocaleString()} EGP`;
    }



    // --- Toast Notification ---
    let toastTimeout;
    function showToast(message) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message;
        toast.classList.add('active');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('active');
        }, 3200);
    }

    // --- VIP Form Handling ---
    if (vipForm) {
        vipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('subscriber-email');
            if (!emailInput || !emailInput.value) return;

            if (formFeedback) {
                formFeedback.className = 'form-feedback success';
                formFeedback.textContent = "✓ Access Granted! Check your inbox for your private VIP password.";
            }
            emailInput.value = '';
            showToast("VIP Archive membership confirmed");
        });
    }

    // --- Checkout Button Action ---
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (state.cart.length === 0) {
                showToast("Your bag is empty");
                return;
            }
            showToast("Redirecting to secure checkout...");
        });
    }

});
