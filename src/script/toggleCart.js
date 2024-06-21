export const toggleCart = () => {
    const cartContent = document.querySelector('.cart-content');
    if (cartContent) {
        const currentDisplay = window.getComputedStyle(cartContent).getPropertyValue('display');
        if (currentDisplay === 'none') {
            cartContent.style.display = 'block';
            setTimeout(() => {
                cartContent.style.right = '0'; // Slide in from the right
            }, 100); // Adjust the delay as needed
        } else {
            cartContent.style.right = '-100%'; // Slide out to the right
            setTimeout(() => {
                cartContent.style.display = 'none';
            }, 500); // Adjust the duration of the animation
        }
    }
}
