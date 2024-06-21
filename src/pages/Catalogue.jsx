import "../styles/styles.css";
import "../styles/navbar.css";
import "../styles/hamburger.css";
import "../styles/menu.css";
import "../styles/product.css";
import "../styles/index.css";

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import { darkLightModes } from "../script/dark_light_modes";

const Catalogue = () => {
	useEffect(() => {
		darkLightModes(); //dark-light modes functionallity
	}, []);

	return (
		<div className="cursor">
			<Navbar />
			<Menu />
		</div>
	);
};

export default Catalogue;
