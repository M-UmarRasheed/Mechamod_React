import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toggleCart } from "../script/toggleCart";

const Navbar = () => {
    const location = useLocation();
    const [loc, setLoc] = useState(null);

    useEffect(() => {
		toggleCart()

        setLoc(location.pathname);
    }, [location.pathname]);

    return (
        <ul className="navbar_container">
            <li className="navbar_logo">
                <Link to="/">
                    <img src="/images/navbar_logo.png" alt="logo" />
                </Link>
            </li>
            <li className="navbar_text">
                <Link to="/catalogue">Shop</Link>
            </li>
            <li className="navbar_line_spacer">
                <a href="#">—</a>
            </li>
            <li className="navbar_text">
                <a href="#">Sale</a>
            </li>
            <li className="navbar_line_spacer">
                <a href="#">—</a>
            </li>
            <li className="navbar_text">
                <a href="#">About</a>
            </li>
            <li className="navbar_side_text">
                <a href="#" onClick={toggleCart}>Cart</a>
            </li>

            <li className="button_li">
                <a className="button not_index_menu_button">
                    <label htmlFor="circleMenu">
                        <div className="btn button-color-outer">
                            <span>
                                <div className="button-lines line-1"></div>
                                <div className="button-lines line-2"></div>
                                <div className="button-lines line-3"></div>
                            </span>
                        </div>
                    </label>
                </a>
            </li>
        </ul>
    );
};

export default Navbar;
