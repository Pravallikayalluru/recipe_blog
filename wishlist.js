// Initialize wishlist from localStorage or create empty array
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to update wishlist count in navbar
function updateWishlistCount() {
    const countElement = document.getElementById('wishlist-count');
    if (countElement) {
        countElement.textContent = wishlist.length;
    }
}

// Function to toggle heart icon and add/remove from wishlist
function toggleHeart(element) {
    const title = element.getAttribute('data-title');
    const img = element.getAttribute('data-img');
    
    if (element.textContent === '🤍') {
        // Add to wishlist
        element.textContent = '❤️';
        wishlist.push({ title, img });
    } else {
        // Remove from wishlist
        element.textContent = '🤍';
        wishlist = wishlist.filter(item => item.title !== title);
    }
    
    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    updateWishlistDisplay();
}

// Function to show/hide wishlist popup
function showWishlist() {
    const popup = document.getElementById('wishlist-popup');
    if (popup) {
        popup.classList.toggle('hidden');
        updateWishlistDisplay();
    }
}

// Function to update wishlist display
function updateWishlistDisplay() {
    const wishlistItems = document.getElementById('wishlist-items');
    if (wishlistItems) {
        if (wishlist.length === 0) {
            wishlistItems.innerHTML = '<p>No items in wishlist</p>';
            return;
        }

        wishlistItems.innerHTML = wishlist.map(item => `
            <div class="wishlist-item">
                <img src="${item.img}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                <span>${item.title}</span>
                <button onclick="removeFromWishlist('${item.title}')" class="btn btn-sm btn-danger">Remove</button>
            </div>
        `).join('');
    }
}

// Function to remove item from wishlist
function removeFromWishlist(title) {
    wishlist = wishlist.filter(item => item.title !== title);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    updateWishlistDisplay();
    
    // Update heart icon on recipe card if it exists
    const heartIcon = document.querySelector(`[data-title="${title}"]`);
    if (heartIcon) {
        heartIcon.textContent = '🤍';
    }
}

// Initialize wishlist count when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    updateWishlistDisplay();
    
    // Update heart icons based on wishlist items
    wishlist.forEach(item => {
        const heartIcon = document.querySelector(`[data-title="${item.title}"]`);
        if (heartIcon) {
            heartIcon.textContent = '❤️';
        }
    });
}); 