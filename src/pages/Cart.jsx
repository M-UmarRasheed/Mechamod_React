import "../styles/styles.css";
import "../styles/navbar.css";
import "../styles/hamburger.css";
import "../styles/menu.css";
import "../styles/product.css";
import "../styles/index.css";
import "../styles/cart.css";
import { useEffect } from "react";
import { displayCart } from "../productScripts/cartSystem";
import { fetchKeycaps } from "../productScripts/displayKeycapInfo";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import { darkLightModes } from "../script/dark_light_modes";
import { toggleCart } from "../script/toggleCart";

const Cart = () => {
	useEffect(() => {
		toggleCart();
		darkLightModes(); //dark-light modes functionallity
		displayCart(); //display-cart functionallity
		fetchKeycaps(); //fetch key caps functionallity
	}, []);
	return (
		<div className="cart-content">
			<div className="cart-navbar">
				<div className="cart-header">Your Cart</div>
				<div className="continue-shopping">
					<a href="#" onClick={toggleCart}>Continue Shopping</a>
				</div>
			</div>

			<div className="cart-container">
				<div id="cart">
					<ul id="cart-items"></ul>
				</div>
			</div>

			<div className="cart-buttons">
				<button className="continue-shopping-button" onClick={toggleCart}>CONTINUE SHOPPING</button>
				<button className="checkout-button">CHECKOUT</button>
			</div>
		</div>

	);
};

export default Cart;
