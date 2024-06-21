import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as TWEEN from "@tweenjs/tween.js";

export const product = () => {
	// variables for shadows
	let shadow1 = document.getElementById("shadow1");
	let shadow2 = document.getElementById("shadow2");
	let shadowDuration = -5;
	shadow2.style.transform = "translateX(" + 9999 + "px)"; // move away the second shadow so that only first one is visible when they load

	const loadingMessage = document.getElementById("loading-message");

	// Show the loading message when starting to load keycaps
	loadingMessage.style.display = "block";

	const mousePos = {
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
	};

	const delayedMousePos = {
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
	};

	// Canvas
	const canvas = document.querySelector("canvas.webgl");

	// Scene
	const scene = new THREE.Scene();

	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	// renderer
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true,
	});

	//renderer.setClearColor(0xffffff);// sets background to white
	renderer.setClearColor(new THREE.Color(0x000000), 0); // Set the clear color to black with alpha 0

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(sizes.width, sizes.height);

	// Base camera
	const camera = new THREE.PerspectiveCamera(
		10, // Field of view
		sizes.width / sizes.height,
		0.1, // Near clipping plane
		1000 // Far clipping plane
	);
	camera.position.x = 0;
	camera.position.y = -590;
	camera.position.z = 0;
	scene.add(camera);

	// Controls
	const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;
	controls.enableZoom = false; // disabling zoom here
	controls.enableRotate = false; // disabling rotate here
	controls.enablePan = false; // disabling pan here

	// Lights
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	const pointLight = new THREE.PointLight(0xffffff, 0.5);
	pointLight.position.set(2, 3, 4);
	scene.add(pointLight);

	// const axesHelper = new THREE.AxesHelper( 30 );
	// scene.add( axesHelper );

	//var btn = document.getElementById('btn')

	// Object
	let objects = [];
	const hiddenZoneZ = -200;
	const loader = new STLLoader();

	const model1 = loader.load(
		"https://firebasestorage.googleapis.com/v0/b/mechamod-97928.appspot.com/o/Snake_KeyCap_VI_STL_001.stl?alt=media",
		(geometry) => {
			const material = new THREE.MeshNormalMaterial();
			objects.push(new THREE.Mesh(geometry, material));
			scene.add(objects.at(-1));
			// Hide the loading message when all keycaps are loaded
			loadingMessage.style.display = "none";

			const model2 = loader.load(
				"https://firebasestorage.googleapis.com/v0/b/mechamod-97928.appspot.com/o/shenron-keycap-v1.stl?alt=media",
				(geometry) => {
					const material = new THREE.MeshNormalMaterial();
					objects.push(new THREE.Mesh(geometry, material));
					scene.add(objects.at(-1));
					objects.at(-1).position.setZ(hiddenZoneZ);

					const model3 = loader.load(
						"https://firebasestorage.googleapis.com/v0/b/say-hi-30f6d.appspot.com/o/model3.stl?alt=media",
						(geometry) => {
							const material = new THREE.MeshNormalMaterial();
							objects.push(new THREE.Mesh(geometry, material));
							scene.add(objects.at(-1));
							objects.at(-1).position.setZ(hiddenZoneZ);

							const model4 = loader.load(
								"https://firebasestorage.googleapis.com/v0/b/say-hi-30f6d.appspot.com/o/model4.stl?alt=media",
								(geometry) => {
									const material =
										new THREE.MeshNormalMaterial();
									objects.push(
										new THREE.Mesh(geometry, material)
									);
									scene.add(objects.at(-1));
									objects.at(-1).position.setZ(hiddenZoneZ);

									//at this point all the models are loaded so we can make the shadows visible
									shadow1.style.visibility = "visible";
									shadow2.style.visibility = "visible";
								}
							);
						}
					);
				}
			);
		}
	);
	window.addEventListener("mousemove", onMouseMove, false);
	function onMouseMove(event) {
		mousePos.x = event.clientX;
		mousePos.y = event.clientY;
	}

	function updateDist() {
		dist = (window.innerWidth / window.innerHeight) * 70 + 15; // distance between models will be calculated based on the window width
	}

	let curInd = -1;
	let nextInd = 0;
	let dist;
	updateDist();
	const TRANSITION_SPEED = 1;
	const HOVER_EFFECT_START_SPEED = 0.5;
	const HOVER_EFFECT_END_SPEED = 0.5;
	const HOVER_EFFECT_DELAY = 1; //ms
	let transitionStarted = false;

	const ZERO_ROT = {
		x: 0,
		y: 0,
		z: 0,
	};
	const RIGHT_ROT = {
		x: Math.PI / 1.7,
		y: Math.PI / 5,
		z: Math.PI / 5,
	};
	const LEFT_ROT = {
		x: Math.PI / 1.7,
		y: -Math.PI / 5,
		z: -Math.PI / 5,
	};

	window.addEventListener("resize", () => {
		// Update sizes
		(sizes.width = window.innerWidth), (sizes.height = window.innerHeight);

		// Update camera
		camera.aspect = sizes.width / sizes.height;
		camera.updateProjectionMatrix();

		// Update renderer
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// update how far the models go off the screen
		updateDist();
	});

	function adjustIndexes() {
		if (curInd == objects.length) curInd = 0;
		if (nextInd == objects.length) nextInd = 0;

		if (curInd == -1) curInd = objects.length - 1;
		if (nextInd == -1) nextInd = objects.length - 1;
	}

	const scrollIcon = document.getElementById("scroll-icon");

	var product1 = document.getElementById("product-container0"); // make the text a variable
	var product2 = document.getElementById("product-container1"); // make the text a variable
	var product3 = document.getElementById("product-container2"); // make the text a variable
	var product4 = document.getElementById("product-container3"); // make the text a variable

	var objbut = ["model1", "model2", "model3", "model4"]; //make the keycaps an array of an object
	function visibility(indexVisible) {
		//in this fuction from four buttons only one is visible, that button being the keycap specific button
		for (let index = 0; index < objbut.length; index++) {
			let currbut = document.getElementById(objbut[index]);
			currbut.style.display = "none";
		}
		let visBut = document.getElementById(objbut[indexVisible]);
		visBut.style.display = "block";
	}


	var snakeFigure = document.querySelector(".snake-background-wrapper");
	var snakeBack = document.querySelector(".snake-background-item img");
	snakeFigure.classList.add("transition-active");

	const model2Container = document.querySelector(".model2-background-container");
	model2Container.style.display = "none";
	var model2Figure = document.querySelector(".model2-background-wrapper");
	var model2Back = document.querySelector(".model2-background-item img");
	model2Figure.classList.add("transition-active");

	const model3Container = document.querySelector(".model3-background-container");
	model3Container.style.display = "none";
	var model3Figure = document.querySelector(".model3-background-wrapper");
	var model3Back = document.querySelector(".model3-background-item img");
	model3Figure.classList.add("transition-active");

	const model4Container = document.querySelector(".model4-background-container");
	model4Container.style.display = "none";
	var model4Figure = document.querySelector(".model4-background-wrapper");
	var model4Back = document.querySelector(".model4-background-item img");
	model4Figure.classList.add("transition-active");

	var isZoomed = false;
	if (isZoomed) {
		// Return to normal scale
		snakeBack.style.transform = "scale(1.5)";
		model2Back.style.transform = "scale(1.5)";
		model3Back.style.transform = "scale(1.5)";
	} else {
		// Apply the transition
		snakeBack.style.transform = "scale(1)";
		model2Back.style.transform = "scale(1)";
		model3Back.style.transform = "scale(1)";
	}

	function circleText() {
		if (index === 0) {
			snakeFigure.classList.add("transition-active");
			snakeBack.style.transform = "scale(1)";

			model2Container.style.display = "none"
			model2Back.style.transform = "scale(1.5)";
			model2Figure.classList.remove("transition-active");

			model4Container.style.display = "none"
			model4Back.style.transform = "scale(1.5)";
			model4Figure.classList.remove("transition-active");

			console.log(`index: ${index}`)
		}
		if (index === 1) {
			snakeBack.style.transform = "scale(1.5)";
			snakeFigure.classList.remove("transition-active");

			model2Container.style.display = "flex"
			model2Figure.classList.add("transition-active");
			model2Back.style.transform = "scale(1)";

			model3Container.style.display = "none"
			model3Back.style.transform = "scale(1.5)";
			model3Figure.classList.remove("transition-active");

			console.log(`index: ${index}`)
		}
		if (index === 2) {
			model2Back.style.transform = "scale(1.5)";
			model2Figure.classList.remove("transition-active");

			model3Container.style.display = "flex"
			model3Figure.classList.add("transition-active");
			model3Back.style.transform = "scale(1)";

			model4Container.style.display = "none"
			model4Back.style.transform = "scale(1.5)";
			model4Figure.classList.remove("transition-active");

			console.log(`index: ${index}`)
		}
		if (index === 3) {
			snakeBack.style.transform = "scale(1.5)";
			snakeFigure.classList.remove("transition-active");

			model3Container.style.display = "none"
			model3Back.style.transform = "scale(1.5)";
			model3Figure.classList.remove("transition-active");

			model4Container.style.display = "flex"
			model4Figure.classList.add("transition-active");
			model4Back.style.transform = "scale(1)";
			
			console.log(`index: ${index}`)
		}
	}
	// console.log("Starting index: " + curInd);

	let index = 0;
	visibility(0);

	// Function to hide the button
	function hideButton() {
		document.getElementById("nextBTN").style.display = "none";
	}

	// Initialize flags to track whether handlePrevious and handleNext have been called
	let handlePreviousCalled = false;
	let handleNextCalled = false;

	function handlePrevious() {
		// console.log("User scrolled up.");
		// console.log("Current index: " + curInd);

		// Scrollwheel up
		if (transitionStarted) return;
		curInd = nextInd;
		nextInd--;
		adjustIndexes();
		objects[curInd].position.setX(0);
		objects[nextInd].position.setX(-dist);
		slide(curInd, 1, ZERO_ROT, RIGHT_ROT, TWEEN.Easing.Cubic.InOut);
		slide(nextInd, 1, LEFT_ROT, ZERO_ROT, TWEEN.Easing.Cubic.InOut);
		if (index === 0) {
			// here if position is 3 and you scroll up, it moves to 0
			index = 3;
		} else index--;

		visibility(index);

		circleText();

		handlePreviousCalled = true;

		// Call hideButton if both handlePrevious and handleNext have been called
		if (handlePreviousCalled && handleNextCalled) {
			hideButton();
		}
	}

	document.addEventListener("wheel", (event) => {
		visibletext(); // here i call a function that make the text if visible to dissappear when scroll

		if (event.deltaY > 0) {
			// Scroll up
			handlePrevious();
		}
	});

	// Add event listener for clicking the "next" button
	document
		.getElementById("previousBTN")
		.addEventListener("click", handlePrevious);

	// Function to handle scrolling down and clicking "next" button
	function handleNext() {
		visibletext(); // Function to make the text disappear when scrolling

		// console.log("User scrolled down or clicked 'Next'.");
		// console.log("Current index: " + curInd);

		// Scrollwheel down logic
		if (transitionStarted) return;
		curInd = nextInd;
		nextInd++;
		adjustIndexes();
		objects[curInd].position.setX(0);
		objects[nextInd].position.setX(dist);
		slide(curInd, -1, ZERO_ROT, LEFT_ROT, TWEEN.Easing.Cubic.InOut);
		slide(nextInd, -1, RIGHT_ROT, ZERO_ROT, TWEEN.Easing.Cubic.InOut);
		if (index === 3) {
			index = 0;
		} else index++;
		visibility(index);

		circleText();

		handleNextCalled = true;

		// Call hideButton if both handlePrevious and handleNext have been called
		if (handlePreviousCalled && handleNextCalled) {
			hideButton();
		}
	}

	document.addEventListener("wheel", (event) => {
		visibletext(); // here i call a function that make the text if visible to dissappear when scroll

		if (event.deltaY < 0) {
			handleNext();
		}
	});

	// Add event listener for clicking the "next" button
	document.getElementById("nextBTN").addEventListener("click", handleNext);

	var product1Visible = false;
	var product2Visible = false;
	var product3Visible = false;
	var product4Visible = false;

	const button0 = document.getElementById("model1"); //make the text appear on click and at the second click to dissappear
	button0.addEventListener("click", () => {
		product1Visible = !product1Visible;
		if (product1Visible) {
			product1.style.display = "block";
			setTimeout(() => {
				product1.style.opacity = "1";
				product1.style.transition = "opacity 0.5s ease"; // Add fade transition
			}, 0); // Apply transition after a short delay
		} else {
			product1.style.transition = "opacity 0.5s ease";
			product1.style.opacity = "0";
			setTimeout(() => {
				product1.style.display = "none";
			}, 500);
		}
	});

	const button1 = document.getElementById("model2"); //make the text appear on click and at the second click to dissappear
	button1.addEventListener("click", () => {
		product2Visible = !product2Visible;
		if (product2Visible) {
			product2.style.display = "block";
			setTimeout(() => {
				product2.style.opacity = "1";
				product2.style.transition = "opacity 0.5s ease"; // Add fade transition
			}, 0); // Apply transition after a short delay
		} else {
			product2.style.transition = "opacity 0.5s ease";
			product2.style.opacity = "0";
			setTimeout(() => {
				product2.style.display = "none";
			}, 500);
		}
	});
	const button2 = document.getElementById("model3"); //make the text appear on click and at the second click to dissappear
	button2.addEventListener("click", () => {
		product3Visible = !product3Visible;
		if (product3Visible) {
			product3.style.display = "block";
			setTimeout(() => {
				product3.style.opacity = "1";
				product3.style.transition = "opacity 0.5s ease"; // Add fade transition
			}, 0); // Apply transition after a short delay
		} else {
			product3.style.transition = "opacity 0.5s ease";
			product3.style.opacity = "0";
			setTimeout(() => {
				product3.style.display = "none";
			}, 500);
		}
	});
	const button3 = document.getElementById("model4"); //make the text appear on click and at the second click to dissappear
	button3.addEventListener("click", () => {
		product4Visible = !product4Visible;
		if (product4Visible) {
			product4.style.display = "block";
			setTimeout(() => {
				product4.style.opacity = "1";
				product4.style.transition = "opacity 0.5s ease"; // Add fade transition
			}, 0); // Apply transition after a short delay
		} else {
			product4.style.transition = "opacity 0.5s ease";
			product4.style.opacity = "0";
			setTimeout(() => {
				product4.style.display = "none";
			}, 500);
		}
	});

	function visibletext() {
		//this is the function that will make the text if it s open to dissappear on scroll
		product1.style.display = "none";
		product2.style.display = "none";
		product3.style.display = "none";
		product4.style.display = "none";
	}

	function slide(objInd, dir, startRot, endRot, easing) {
		transitionStarted = true;
		const tween = new TWEEN.Tween({
			posX: objects[objInd].position.x,
			rotX: startRot.x,
			rotY: startRot.y,
			rotZ: startRot.z,
			shadowX: 0,
			shadowOpacity: 1,
		})
			.to(
				{
					posX: objects[objInd].position.x + dir * dist,
					rotX: endRot.x,
					rotY: endRot.y,
					rotZ: endRot.z,
					shadowX: window.innerWidth / 1.3,
					shadowOpacity: shadowDuration,
				},
				2000 / TRANSITION_SPEED
			)
			.easing(easing)
			.onUpdate((coords) => {
				shadow1.style.transform =
					"translateY(" + -coords.shadowX * dir + "px)";
				shadow2.style.transform =
					"translateY(" +
					-(coords.shadowX - window.innerWidth / 1.3) * dir +
					"px)";
				shadow1.style.opacity = coords.shadowOpacity;
				shadow2.style.opacity =
					shadowDuration + 1 - coords.shadowOpacity;
				objects[objInd].position.setZ(coords.posX);
				objects[objInd].position.setX(0);
				objects[objInd].rotation.y = coords.rotY;
				objects[objInd].rotation.x = coords.rotX;
				objects[objInd].rotation.z = coords.rotZ;
			})
			.onComplete(() => {
				multiplierX = 0;
				multiplierZ = 0;
				transitionStarted = false;
				hoverEffectStarted = false;
				if (objInd != nextInd) {
					objects[objInd].position.setZ(hiddenZoneZ); // hide model
				}
			});
		tween.start();
	}

	let timeoutId;
	function startHoverEffect() {
		hoverEffectStarted = true;
		timeoutId = setTimeout(() => {
			const tween = new TWEEN.Tween({ x: multiplierX, z: multiplierZ })
				// .delay(HOVER_EFFECT_DELAY)
				.to({ x: 0.0019, z: 0.0017 }, 500 / HOVER_EFFECT_START_SPEED)
				.easing(TWEEN.Easing.Quadratic.InOut)
				.onUpdate((coords) => {
					multiplierX = coords.x;
					multiplierZ = coords.z;
					if (hoveringInZone == false) {
						tween.stop();
						clearTimeout(timeoutId);
					}
				});
			tween.start();
		}, HOVER_EFFECT_DELAY);
	}

	function stopHoverEffect() {
		clearTimeout(timeoutId);
		hoverEffectStarted = false;
		const tween = new TWEEN.Tween({ x: multiplierX, z: multiplierZ })
			.to({ x: 0, z: 0 }, 500 / HOVER_EFFECT_END_SPEED)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate((coords) => {
				multiplierX = coords.x;
				multiplierZ = coords.z;
			});
		tween.start();
	}

	let hoveringInZone = false;
	document.getElementById("hover-zone").addEventListener("mouseover", () => {
		hoveringInZone = true;
	});
	document.getElementById("hover-zone").addEventListener("mouseout", () => {
		hoveringInZone = false;
	});

	// Animate
	let multiplierX = 0,
		multiplierZ = 0;
	let hoverEffectStarted = false;

	function lerp(start, end, t) {
		return (1 - t) * start + t * end;
	}

	let mouseDist = 0;
	const mycurs = document.getElementById("testCursor");

	const tick = () => {
		const xDistance = delayedMousePos.x - mousePos.x;
		const yDistance = delayedMousePos.y - mousePos.y;

		mouseDist = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
		mouseDist = mouseDist / 10000;

		delayedMousePos.x = lerp(delayedMousePos.x, mousePos.x, mouseDist);
		delayedMousePos.y = lerp(delayedMousePos.y, mousePos.y, mouseDist);

		// mycurs.style.left = delayedMousePos.x + 'px'
		// mycurs.style.top = delayedMousePos.y +'px'

		//rotate the model based on mouse pos
		if (objects[nextInd]) {
			objects[nextInd].rotation.x =
				multiplierX * (delayedMousePos.y - window.innerHeight / 2);
			objects[nextInd].rotation.z =
				multiplierZ * (delayedMousePos.x - window.innerWidth / 2);
		}
		if (hoveringInZone == true && hoverEffectStarted == false) {
			startHoverEffect();
		} else if (hoveringInZone == false && hoverEffectStarted == true) {
			stopHoverEffect();
		}

		TWEEN.update();
		controls.update();
		renderer.render(scene, camera);
		window.requestAnimationFrame(tick);
		renderer.setSize(sizes.width, sizes.height);
	};
	tick();
};
