// المتغيرات الأساسية
let filteredProducts = [...products];

// دالة لتحويل المنتج إلى HTML
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/500x400?text=${encodeURIComponent(product.name)}'">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="openProduct('${product.link}')">
                        الذهاب للمنتج
                    </button>
                    <button class="btn btn-copy" onclick="copyLink('${product.link}', '${product.name}')">
                        نسخ الرابط
                    </button>
                </div>
            </div>
        </div>
    `;
}

// دالة لعرض المنتجات
function displayProducts(productsToShow) {
    const grid = document.getElementById('productsGrid');
    
    if (productsToShow.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <p>لم يتم العثور على منتجات مطابقة 😢</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
}

// دالة البحث
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

// دالة نسخ الرابط
function copyLink(link, productName) {
    navigator.clipboard.writeText(link).then(() => {
        showNotification(`تم نسخ رابط ${productName} ✓`);
    }).catch(err => {
        console.error('فشل النسخ:', err);
        // البديل للمتصفحات القديمة
        fallbackCopy(link, productName);
    });
}

// دالة بديلة لنسخ الرابط
function fallbackCopy(link, productName) {
    const textarea = document.createElement('textarea');
    textarea.value = link;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showNotification(`تم نسخ رابط ${productName} ✓`);
}

// دالة فتح المنتج
function openProduct(link) {
    window.open(link, '_blank');
}

// دالة إظهار الإشعار
function showNotification(message) {
    const notification = document.getElementById('copyNotification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// تهيئة الموقع عند تحميله
document.addEventListener('DOMContentLoaded', function() {
    // عرض المنتجات الأولية
    displayProducts(products);
    
    // إضافة مستمع البحث
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    
    // معالجة الروابط الخارجية
    console.log('تم تحميل الموقع بنجاح! 🎉');
});

// دالة لإضافة منتج جديد برمجياً (اختياري)
function addProduct(newProduct) {
    products.push(newProduct);
    displayProducts(products);
}

// دالة لحذف منتج (اختياري)
function removeProduct(productId) {
    const index = products.findIndex(p => p.id === productId);
    if (index > -1) {
        products.splice(index, 1);
        displayProducts(products);
    }
}
