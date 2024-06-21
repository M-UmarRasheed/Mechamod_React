import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Catalogue from "./pages/Catalogue";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/catalogue" element={<Catalogue />} />
			</Routes>
		</Router>
	);
}

export default App;
