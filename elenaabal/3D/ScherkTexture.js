let scene, camera, renderer;
let scherkSurface;
let isAnimationPaused = false;
let animationId;

// Initialize Three.js scene
function init() {
    // Create a scene
    scene = new THREE.Scene();

    // Create a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Add fog to the scene
    const fogColor = 0x000090; // Color de la niebla (negro)
    const fogNear = 2.2; // Distancia cercana de inicio de la niebla
    const fogFar = 5; //10 Distancia lejana de fin de la niebla
    scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

    // Create a texture loader
    const textureLoader = new THREE.TextureLoader();

    // Load the texture
    const texture = textureLoader.load('https://enneper.vercel.app/elenaabal/ea0.jpg');

    // Create material with the loaded texture
    const material = new THREE.MeshBasicMaterial({ map: texture });


    // Create the Clifford Torus geometry
    const geometry = new THREE.ParametricGeometry((u, v, target) => {
        const scale = 1.36;

        const a = 1.0;
        const b = 0.5;

        u = (u - 0.0) * 2 * Math.PI;
        v = (v - 0.0) * 2 * Math.PI;

        const x = scale * (a + b * Math.cos(v)) * Math.cos(u);
        const y = scale * (a + b * Math.cos(v)) * Math.sin(u);
        const z = scale * (b * Math.sin(v) +
            2 * a * Math.sin(0.5 * v) * Math.sin(0.5 * v));
        target.set(x, y, z);
    }, 100, 100);


    // Create mesh with the new material
    scherkSurface = new THREE.Mesh(geometry, material);

    // Add the Scherk surface to the scene
    scene.add(scherkSurface);

    // Modificar el estilo CSS para ocultar las barras de desplazamiento
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';

    // Add event listener for window resizing
    window.addEventListener('resize', onWindowResize, false);

    // Add a click event listener to the renderer's DOM element
    renderer.domElement.addEventListener('click', () => {
        // Toggle animation pause and resume
        if (isAnimationPaused) {
            animate();
        } else {
            cancelAnimationFrame(animationId); // Pause the animation
        }
        isAnimationPaused = !isAnimationPaused;
    });
}

// Handle window resize
function onWindowResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
}

// Animation loop
function animate() {
    animationId = requestAnimationFrame(animate);

    // Rotate the Scherk surface
    scherkSurface.rotation.x += 0.01;
    scherkSurface.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Initialize and start the animation
init();
animate();
