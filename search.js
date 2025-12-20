/**
 * Search functionality for EasyCook website
 * This file handles all search-related functionality including:
 * - Real-time search on recipe pages
 * - Global search across all recipes
 * - Search results display and highlighting
 */

// Recipe database
const recipes = [
    // Breakfast Recipes
    {
        id: 'idli-sambar',
        title: 'Idli Sambar with coconut chutney',
        category: 'breakfast',
        description: 'Soft and fluffy idlis served with hot sambar and coconut chutney',
        image: 'images/idli.jpg',
        time: '20 mins',
        views: 100,
        url: 'recipes/recipe1.html'
    },
    {
        id: 'pesarattu',
        title: 'Pesarattu (Green Moong Dosa)',
        category: 'breakfast',
        description: 'Healthy and protein-rich green moong dal dosa',
        image: 'images/pdosa.jpg',
        time: '20 mins',
        views: 100,
        url: 'recipes/recipe2.html'
    },
    // Main Course - Paneer Recipes
    {
        id: 'paneer-butter-masala',
        title: 'Paneer Butter Masala',
        category: 'main-course',
        description: 'Rich and creamy paneer curry in tomato butter sauce',
        image: 'images/main-course/paneer-butter-masala.jpg',
        time: '30 mins',
        views: 150,
        url: 'recipes/main-course.html#paneer-butter-masala'
    },
    {
        id: 'palak-paneer',
        title: 'Palak Paneer',
        category: 'main-course',
        description: 'Cottage cheese cubes in creamy spinach gravy',
        image: 'images/main-course/palak-paneer.jpg',
        time: '25 mins',
        views: 120,
        url: 'recipes/main-course.html#palak-paneer'
    },
    {
        id: 'kadai-paneer',
        title: 'Kadai Paneer',
        category: 'main-course',
        description: 'Spicy paneer dish with bell peppers and kadai masala',
        image: 'images/main-course/kadai-paneer.jpg',
        time: '30 mins',
        views: 130,
        url: 'recipes/main-course.html#kadai-paneer'
    },
    // Starters
    {
        id: 'paneer-tikka',
        title: 'Paneer Tikka',
        category: 'starters',
        description: 'Grilled paneer cubes marinated in spiced yogurt',
        image: 'images/s2.png',
        time: '30 mins',
        views: 100,
        url: 'recipes/starters.html'
    }
    // Add more recipes here...
];

// Function to perform search
function performSearch(searchTerm) {
    if (!searchTerm) return [];
    
    searchTerm = searchTerm.toLowerCase();
    return recipes.filter(recipe => {
        return (
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm) ||
            recipe.category.toLowerCase().includes(searchTerm)
        );
    });
}

// Function to highlight search term in text
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Function to display search results
function displaySearchResults(results, searchTerm) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h3>No recipes found for "${searchTerm}"</h3>
                <p>Try searching with different keywords or browse our recipe categories.</p>
            </div>
        `;
        return;
    }

    const resultsHTML = results.map(recipe => `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-content">
                <h3>${highlightText(recipe.title, searchTerm)}</h3>
                <p>${highlightText(recipe.description, searchTerm)}</p>
                <div class="recipe-meta">
                    <span>⏳ ${recipe.time}</span>
                    <span>👁️ ${recipe.views} views</span>
                </div>
                <a href="${recipe.url}" class="btn btn-success">View Recipe</a>
            </div>
        </div>
    `).join('');

    resultsContainer.innerHTML = `
        <h2>Search Results for "${searchTerm}"</h2>
        <div class="results-count">${results.length} recipe(s) found</div>
        <div class="results-grid">
            ${resultsHTML}
        </div>
    `;
}

// Function to handle real-time search on recipe pages
function handleRealTimeSearch(searchTerm) {
    const recipeCards = document.querySelectorAll('.recipe-card');
    if (!recipeCards.length) return;

    searchTerm = searchTerm.toLowerCase();
    let hasResults = false;

    recipeCards.forEach(card => {
        const title = card.querySelector('h2, h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent.toLowerCase() || '';
        const isMatch = title.includes(searchTerm) || description.includes(searchTerm);
        
        card.style.display = isMatch ? 'block' : 'none';
        if (isMatch) hasResults = true;
    });

    // Show/hide no results message
    let noResultsMsg = document.getElementById('no-results-message');
    if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'no-results-message';
        noResultsMsg.className = 'no-results';
        noResultsMsg.innerHTML = 'No recipes found matching your search. Try different keywords.';
        document.querySelector('.results-grid')?.parentNode.appendChild(noResultsMsg);
    }
    noResultsMsg.style.display = hasResults ? 'none' : 'block';
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle search form submission
    const searchForms = document.querySelectorAll('form');
    searchForms.forEach(form => {
        const searchInput = form.querySelector('input[type="search"]');
        if (!searchInput) return;

        // Real-time search on recipe pages
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim();
            handleRealTimeSearch(searchTerm);
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `${window.location.pathname.includes('search-results.html') ? '' : '/'}search-results.html?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    });

    // Handle search results page
    if (window.location.pathname.includes('search-results.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('q');
        
        if (searchTerm) {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = searchTerm;
            }
            const results = performSearch(searchTerm);
            displaySearchResults(results, searchTerm);
        }
    }
});

/**
 * Initializes search functionality across the website
 * Sets up event listeners for search forms and handles search results page
 */
function initSearch() {
  setupSearchForms();
  handleSearchResultsPage();
}

/**
 * Sets up event listeners for all search forms on the website
 */
function setupSearchForms() {
  const searchForms = document.querySelectorAll('form');
  
  searchForms.forEach(form => {
    const searchInput = form.querySelector('input[type="search"]');
    if (!searchInput) return;

    // Real-time search as user types
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.trim().toLowerCase();
      searchRecipes(searchTerm);
    });
    
    // Handle form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      
      if (searchTerm) {
        window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
      }
    });
  });
}

/**
 * Handles initialization of search results page
 */
function handleSearchResultsPage() {
  if (!window.location.pathname.includes('search-results.html')) return;

  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q');
  
  if (!searchQuery) return;

  // Display search query
  const searchQueryElement = document.getElementById('search-query');
  if (searchQueryElement) {
    searchQueryElement.textContent = searchQuery;
  }
  
  performSearch(searchQuery);
}

/**
 * Searches recipes on the current page
 * @param {string} searchTerm - The term to search for
 */
function searchRecipes(searchTerm) {
  const recipeCards = document.querySelectorAll('.recipe-card');
  if (recipeCards.length === 0) return;

  const noResultsMsg = createNoResultsMessage();
  hideAllRecipeCards(recipeCards);
  
  if (!searchTerm) {
    showAllRecipeCards(recipeCards);
    noResultsMsg.style.display = 'none';
    return;
  }
  
  let hasResults = false;
  recipeCards.forEach(card => {
    if (isRecipeMatch(card, searchTerm)) {
      card.style.display = 'block';
      hasResults = true;
    }
  });
  
  noResultsMsg.style.display = hasResults ? 'none' : 'block';
}

/**
 * Creates and returns a "no results" message element
 * @returns {HTMLElement} The no results message element
 */
function createNoResultsMessage() {
  let noResultsMsg = document.getElementById('no-results-message');
  if (noResultsMsg) return noResultsMsg;

  noResultsMsg = document.createElement('div');
  noResultsMsg.id = 'no-results-message';
  noResultsMsg.className = 'alert alert-info text-center mt-4';
  noResultsMsg.innerHTML = 'No recipes found matching your search. Try different keywords.';
  
  const recipeContainer = document.querySelector('.recipes-grid');
  if (recipeContainer) {
    recipeContainer.parentNode.insertBefore(noResultsMsg, recipeContainer.nextSibling);
  }
  
  return noResultsMsg;
}

/**
 * Hides all recipe cards
 * @param {NodeList} recipeCards - List of recipe card elements
 */
function hideAllRecipeCards(recipeCards) {
  recipeCards.forEach(card => {
    card.style.display = 'none';
  });
}

/**
 * Shows all recipe cards
 * @param {NodeList} recipeCards - List of recipe card elements
 */
function showAllRecipeCards(recipeCards) {
  recipeCards.forEach(card => {
    card.style.display = 'block';
  });
}

/**
 * Checks if a recipe card matches the search term
 * @param {HTMLElement} card - The recipe card element
 * @param {string} searchTerm - The term to search for
 * @returns {boolean} Whether the card matches the search term
 */
function isRecipeMatch(card, searchTerm) {
  const name = card.getAttribute('data-name')?.toLowerCase() || '';
  const title = card.querySelector('h2, h3')?.textContent.toLowerCase() || '';
  const description = card.querySelector('p')?.textContent.toLowerCase() || '';
  
  return name.includes(searchTerm) || 
         title.includes(searchTerm) || 
         description.includes(searchTerm);
}

// Make functions available globally
window.searchRecipes = searchRecipes;
window.showResults = showResults;
window.highlightText = highlightText; 