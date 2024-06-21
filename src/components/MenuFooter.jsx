const MenuFooter = () => {
	return (
		<ul className="menu_list_bottom">
			<div className="menu_item_bottom">
				<div className="follow_options">
					<a href="">
						<img
							className="discord_logo"
							src="/images/discord_black.png"
						/>
					</a>
					<a href="">
						<img
							className="youtube_logo"
							src="/images/youtube_black.png"
						/>
					</a>
					<a href="">
						<img
							className="instagram_logo"
							src="/images/instagram_black.png"
						/>
					</a>
				</div>
			</div>

			<div className="menu_item_bottom">
				<div className="policy_options">
					<a href="" className="policy_option">
						Privacy
					</a>
					<p>|</p>
					<a href="" className="policy_option">
						Terms
					</a>
					<p>|</p>
					<a href="" className="policy_option">
						Cookies
					</a>
					<p>|</p>
					<a href="" className="policy_option">
						FAQ
					</a>
					<p>|</p>
					<a href="" className="policy_option">
						Contact
					</a>
					<p>|</p>
					<a href="" className="sustainability_green policy_option">
						Sustainability
					</a>
				</div>
			</div>

			<div className="button_location">
				<a className="dark-mode-toggle">
					<input
						id="toggle"
						className="toggle"
						type="checkbox"
						role="switch"
						name="toggle"
						value="on"
					/>
				</a>
				<span className="lightmode_text">Light Mode</span>
				<span className="darkmode_text">Dark Mode</span>
			</div>
		</ul>
	);
};

export default MenuFooter;
