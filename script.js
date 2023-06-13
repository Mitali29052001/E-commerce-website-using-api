document.addEventListener('DOMContentLoaded', () => {
    const categoryList = document.getElementById('category-list');
    const cartItems = document.getElementById('cart-items');
    const wishlistItems = document.getElementById('wishlist-items');

    // Fetch products from the API
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            // Display products in the categories section
            displayProducts(categoryList, products);

            // Add event listeners to add to cart buttons
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', addToCart);
            });

            // Add event listeners to wishlist buttons
            const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
            wishlistButtons.forEach(button => {
                button.addEventListener('click', addToWishlist);
            });
        });

    // Display products in the specified container
    function displayProducts(container, products) {
        container.innerHTML = '';

        products.forEach(product => {
            const productElement = createProductElement(product);
            container.appendChild(productElement);
        });
    }

    // Create a product element
    function createProductElement(product) {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const imageElement = document.createElement('img');
        imageElement.src = product.image;
        imageElement.alt = product.title;

        const infoElement = document.createElement('div');
        infoElement.classList.add('product-info');

        const titleElement = document.createElement('h3');
        titleElement.textContent = product.title;

        const priceElement = document.createElement('p');
        priceElement.textContent = `$${product.price}`;

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart');
        addToCartButton.textContent = 'Add to Cart';

        const wishlistButton = document.createElement('button');
        wishlistButton.classList.add('add-to-wishlist');
        wishlistButton.textContent = 'Add to Wishlist';

        infoElement.appendChild(titleElement);
        infoElement.appendChild(priceElement);
        infoElement.appendChild(addToCartButton);
        infoElement.appendChild(wishlistButton);

        productElement.appendChild(imageElement);
        productElement.appendChild(infoElement);

        return productElement;
    }

    // Add product to cart
    function addToCart(event) {
        const productElement = event.target.parentElement.parentElement;
        const productName = productElement.querySelector('h3').textContent;

        const cartItem = document.createElement('li');
        cartItem.textContent = productName;

        cartItems.appendChild(cartItem);
    }

    // Add product to wishlist
    function addToWishlist(event) {
        const productElement = event.target.parentElement.parentElement;
        const productName = productElement.querySelector('h3').textContent;

        const wishlistItem = document.createElement('li');
        wishlistItem.textContent = productName;

        wishlistItems.appendChild(wishlistItem);
    }
});
