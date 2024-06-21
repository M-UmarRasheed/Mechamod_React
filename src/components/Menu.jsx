import { useEffect } from "react";
import MenuFooter from "./MenuFooter"
import { menuScript } from "../script/menuScript"
import { Link } from "react-router-dom";

const Menu = () => {
    useEffect(() => {
        menuScript();
    })
    return (
        <div>
        <input type="checkbox" id="circleMenu" />

			<div className="container">
				<a className="button container-button">
					<label htmlFor="circleMenu">
						<div className="btn button-color-inner">
							<span>
								<div className="button-lines-inner line-4"></div>
								<div className="button-lines-inner line-5"></div>
							</span>
						</div>
					</label>
				</a>

				<a className="container_logo" href="index.html">
					<img src="/images/navbar_logo.png" alt="logo" />
				</a>

				<ul className="menu_list">
					<li className="menu_item">
						<Link to="/" title="" className="menu_link">
							Shop
						</Link>
					</li>
					<li className="menu_item">
						<a href="#" title="" className="menu_link">
							Community
						</a>
					</li>
					<li className="menu_item">
						<Link to="/catalogue" title="" className="menu_link">
							Catalogue
						</Link>
					</li>
					<li className="menu_item">
						<a href="#" title="" className="menu_link">
							Our&nbsp;Story
						</a>
					</li>
				</ul>

				<MenuFooter />
			</div>
        </div>
    )
}

export default Menu