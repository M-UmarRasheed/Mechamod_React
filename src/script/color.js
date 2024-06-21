export const color = () => {
	const colorOptions = document.querySelectorAll(".color-option");

	colorOptions.forEach((option) => {
		option.addEventListener("click", () => {
			colorOptions.forEach((otherOption) => {
				if (otherOption === option) {
					option.classList.add("selected");
					option.classList.remove("not-selected");
				} else {
					otherOption.classList.remove("selected");
					otherOption.classList.add("not-selected");
				}
			});
		});
	});

	// Set default selection to "DESERT"
	const defaultOption = document.getElementById("color-desert");
	defaultOption.classList.add("selected");
	defaultOption.classList.remove("not-selected");
};
