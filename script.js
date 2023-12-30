import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

// Loading Screen
const loadingScreen = document.querySelector(".loading-screen");

window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 5000);
});

// Textures
const spaceTexture = new THREE.TextureLoader().load(
  "/textures/stars_milky_way.jpeg"
);
const sunTexture = new THREE.TextureLoader().load("/textures/sun.jpeg");
const mercuryTexture = new THREE.TextureLoader().load("/textures/mercury.jpeg");
const venusTexture = new THREE.TextureLoader().load("/textures/venus.jpeg");
const earthTexture = new THREE.TextureLoader().load("/textures/earth.png");
const marsTexture = new THREE.TextureLoader().load("/textures/mars.jpeg");
const jupiterTexture = new THREE.TextureLoader().load("/textures/jupiter.jpeg");
const saturnTexture = new THREE.TextureLoader().load("/textures/saturn.jpeg");
const saturnRingTexture = new THREE.TextureLoader().load(
  "/textures/saturnRings1.png"
);
const uranusTexture = new THREE.TextureLoader().load("/textures/uranus.jpeg");
const neptuneTexture = new THREE.TextureLoader().load("/textures/neptune.jpeg");
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = spaceTexture;

// Objects
const sunGeometry = new THREE.SphereGeometry(1, 30, 30);
const jupiterGeometry = new THREE.SphereGeometry(0.9, 30, 30);
const saturnGeometry = new THREE.SphereGeometry(0.8, 30, 30);
const saturnRingGeometry = new THREE.RingGeometry(0.95, 1.25, 32);
const uranusGeometry = new THREE.SphereGeometry(0.8, 30, 30);
const neptuneGeometry = new THREE.SphereGeometry(0.75, 30, 30);
const earthGeometry = new THREE.SphereGeometry(0.7, 30, 30);
const venusGeometry = new THREE.SphereGeometry(0.65, 30, 30);
const marsGeometry = new THREE.SphereGeometry(0.6, 30, 30);
const mercuryGeometry = new THREE.SphereGeometry(0.55, 30, 30);

// Materials

const sunMaterial = new THREE.MeshBasicMaterial();
sunMaterial.map = sunTexture;
const mercuryMaterial = new THREE.MeshBasicMaterial();
mercuryMaterial.map = mercuryTexture;
const venusMaterial = new THREE.MeshBasicMaterial();
venusMaterial.map = venusTexture;
const earthMaterial = new THREE.MeshBasicMaterial();
earthMaterial.map = earthTexture;
const marsMaterial = new THREE.MeshBasicMaterial();
marsMaterial.map = marsTexture;
const jupiterMaterial = new THREE.MeshBasicMaterial();
jupiterMaterial.map = jupiterTexture;
const saturnMaterial = new THREE.MeshBasicMaterial();
saturnMaterial.map = saturnTexture;
const saturnRingMaterial = new THREE.MeshBasicMaterial();
saturnRingMaterial.map = saturnRingTexture;
saturnRingMaterial.side = THREE.DoubleSide;
const uranusMaterial = new THREE.MeshBasicMaterial();
uranusMaterial.map = uranusTexture;
const neptuneMaterial = new THREE.MeshBasicMaterial();
neptuneMaterial.map = neptuneTexture;

// Mesh
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);
mercury.position.set(-25, 0, -50);
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
scene.add(venus);
venus.position.set(25, 0, -100);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);
earth.position.set(-25, 0, -150);
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);
mars.position.set(25, 0, -200);
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
scene.add(jupiter);
jupiter.position.set(-25, 0, -250);
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
scene.add(saturn);
const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturnRing.rotation.x = Math.PI / 3;
saturn.add(saturnRing);
saturn.position.set(25, 0, -300);
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
scene.add(uranus);
uranus.position.set(-25, 0, -350);
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
scene.add(neptune);
neptune.position.set(25, 0, -400);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = 0;
pointLight.position.y = 1;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
function addStar() {
  const starGeometry = new THREE.SphereGeometry(0.05, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(starGeometry, starMaterial);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(800));
  star.position.set(x / 13, y / 13, z);
  scene.add(star);
}
Array(1000).fill().forEach(addStar);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sun.rotation.y = 0.3 * elapsedTime;
  mercury.rotation.y = 0.3 * elapsedTime;
  venus.rotation.y = -0.3 * elapsedTime;
  earth.rotation.y = 0.3 * elapsedTime;
  mars.rotation.y = 0.3 * elapsedTime;
  jupiter.rotation.y = 0.3 * elapsedTime;
  saturn.rotation.y = 0.3 * elapsedTime;
  uranus.rotation.y = 0.3 * elapsedTime;
  neptune.rotation.y = 0.3 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
const timeline1 = gsap.timeline();
var recentIndex = 0;

let changeView = function () {
  let cameraPositions = [
    [0, 0, 2],
    [-24, 0, -48],
    [24, 0, -98],
    [-24, 0, -148],
    [24, 0, -198],
    [-24, 0, -248],
    [24, 0, -298],
    [-24, 0, -348],
    [24, 0, -398],
  ];
  timeline1.to(camera.position, {
    x: cameraPositions[recentIndex % 9][0],
    y: cameraPositions[recentIndex % 9][1],
    z: cameraPositions[recentIndex % 9][2],
  });
};
let openText = function () {
  var sunText = document.querySelector("#sun");
  var mercuryText = document.querySelector("#mercury");
  var venusText = document.querySelector("#venus");
  var earthText = document.querySelector("#earth");
  var marsText = document.querySelector("#mars");
  var jupiterText = document.querySelector("#jupiter");
  var saturnText = document.querySelector("#saturn");
  var uranusText = document.querySelector("#uranus");
  var neptuneText = document.querySelector("#neptune");
  switch (recentIndex % 9) {
    case 0:
      neptuneText.classList.remove("open");
      mercuryText.classList.remove("open");
      sunText.classList.add("open");
      break;
    case 1:
      venusText.classList.remove("open");
      sunText.classList.remove("open");
      mercuryText.classList.add("open");
      break;
    case 2:
      mercuryText.classList.remove("open");
      earthText.classList.remove("open");
      venusText.classList.add("open");
      break;
    case 3:
      venusText.classList.remove("open");
      marsText.classList.remove("open");
      earthText.classList.add("open");
      break;
    case 4:
      earthText.classList.remove("open");
      jupiterText.classList.remove("open");
      marsText.classList.add("open");
      break;
    case 5:
      marsText.classList.remove("open");
      saturnText.classList.remove("open");
      jupiterText.classList.add("open");
      break;
    case 6:
      jupiterText.classList.remove("open");
      uranusText.classList.remove("open");
      saturnText.classList.add("open");
      break;
    case 7:
      saturnText.classList.remove("open");
      neptuneText.classList.remove("open");
      uranusText.classList.add("open");
      break;
    case 8:
      uranusText.classList.remove("open");
      sunText.classList.remove("open");
      neptuneText.classList.add("open");
      break;
  }
};
openText();
let nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", function () {
  recentIndex++, changeView(), openText();
});
let previousBtn = document.querySelector(".previous");
previousBtn.addEventListener("click", function () {
  recentIndex--, changeView(), openText();
});
