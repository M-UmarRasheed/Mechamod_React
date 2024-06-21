import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as TWEEN from "@tweenjs/tween.js";

export const script = () => {
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

	// Object
	let objects = [];
	const hiddenZoneZ = -200;
	const loader = new STLLoader();
	console.log("loading");

	loader.load(
		"https://firebasestorage.googleapis.com/v0/b/mechamod-97928.appspot.com/o/Snake_KeyCap_VI_STL_001.stl?alt=media",
		(geometry) => {
			console.log("loaded");
			// console the type of the geometry
			const material = new THREE.MeshNormalMaterial();
			const model = new THREE.Mesh(geometry, material);
			objects.push(model);
			scene.add(model);
			objects.at(-1).position.setZ(hiddenZoneZ);
			// Hide the loading message when all keycaps are loaded
			loadingMessage.style.display = "none";

			console.log("done");

			loader.load(
				"https://firebasestorage.googleapis.com/v0/b/mechamod-97928.appspot.com/o/shenron-keycap-v1.stl?alt=media",
				(geometry) => {
					const material = new THREE.MeshNormalMaterial();
					objects.push(new THREE.Mesh(geometry, material));
					scene.add(objects.at(-1));
					objects.at(-1).position.setZ(hiddenZoneZ);

					loader.load(
						"https://firebasestorage.googleapis.com/v0/b/say-hi-30f6d.appspot.com/o/model4.stl?alt=media",
						(geometry) => {
							const material = new THREE.MeshNormalMaterial();
							objects.push(new THREE.Mesh(geometry, material));
							scene.add(objects.at(-1));
							objects.at(-1).position.setZ(hiddenZoneZ);

							loader.load(
								"https://firebasestorage.googleapis.com/v0/b/say-hi-30f6d.appspot.com/o/model3.stl?alt=media",
								(geometry) => {
									const material =
										new THREE.MeshNormalMaterial();
									objects.push(
										new THREE.Mesh(geometry, material)
									);
									scene.add(objects.at(-1));
									objects.at(-1).position.setZ(hiddenZoneZ);

									//at this point all the models are loaded so we can make the shadow visible (just one shadow)
									// shadow1.style.visibility = "visible"//@#
									shadow2.style.visibility = "visible";

									//@#
									if (transitionStarted) return;
									curInd = nextInd;
									nextInd++;
									adjustIndexes();
									objects[curInd].position.setX(0);
									objects[nextInd].position.setX(dist);
									slide(
										nextInd,
										-1,
										RIGHT_ROT,
										ZERO_ROT,
										TWEEN.Easing.Cubic.InOut
									);
								}
							);
						}
					);
				}
			);
		},
		(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
		},
		(error) => {
			console.log(error);
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

	let curInd = -2; //@#
	let nextInd = -1; //@#
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
		console.log("current" + curInd);
	}

	document.getElementById("left-arrow-btn").addEventListener("click", () => {
		shadow1.style.visibility = "visible"; //@#
		if (transitionStarted) return;
		curInd = nextInd;
		nextInd--;
		adjustIndexes();
		objects[curInd].position.setX(0);
		objects[nextInd].position.setX(-dist);
		slide(curInd, 1, ZERO_ROT, RIGHT_ROT, TWEEN.Easing.Cubic.InOut);
		slide(nextInd, 1, LEFT_ROT, ZERO_ROT, TWEEN.Easing.Cubic.InOut);
	});
	document.getElementById("right-arrow-btn").addEventListener("click", () => {
		shadow1.style.visibility = "visible"; //@#
		if (transitionStarted) return;
		curInd = nextInd;
		nextInd++;
		adjustIndexes();
		objects[curInd].position.setX(0);
		objects[nextInd].position.setX(dist);
		slide(curInd, -1, ZERO_ROT, LEFT_ROT, TWEEN.Easing.Cubic.InOut);
		slide(nextInd, -1, RIGHT_ROT, ZERO_ROT, TWEEN.Easing.Cubic.InOut);
	});

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
					"translateX(" + coords.shadowX * dir + "px)";
				shadow2.style.transform =
					"translateX(" +
					(coords.shadowX - window.innerWidth / 1.3) * dir +
					"px)";
				shadow1.style.opacity = coords.shadowOpacity;
				shadow2.style.opacity =
					shadowDuration + 1 - coords.shadowOpacity;
				objects[objInd].position.setX(coords.posX);
				objects[objInd].position.setZ(0);
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
