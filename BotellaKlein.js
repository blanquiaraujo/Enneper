let scene, camera, renderer;
let botellaKlein;
let isAnimationPaused = false; // Variable para controlar el estado de la animación

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

    // Create the Klein surface geometry
    const geometry = new THREE.ParametricGeometry((u, v, target) => {
        const scale = 0.68;

        // Limit u and v to the range (0, 2*PI) y (0, 2*PI)
        u = (u - 0.0) * 2 * Math.PI;
        v = (v - 0.0) * 2 * Math.PI;

        const x = scale * (3 + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * Math.cos(u);
        const y = scale * (3 + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * Math.sin(u);
        const z = scale * (Math.sin(u / 2) * Math.sin(v) + Math.cos(u / 2) * Math.sin(2 * v));

        target.set(x, y, z);

    }, 100, 100);

    // Create material and mesh
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    botellaKlein = new THREE.Mesh(geometry, material);

    // Add the Klein surface to the scene
    scene.add(botellaKlein);


    // Modificar el estilo CSS para ocultar las barras de desplazamiento
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';



    // Add event listener for window resizing
    window.addEventListener('resize', onWindowResize, false);

    // Add event listener for clicking to pause/resume the animation
    renderer.domElement.addEventListener('click', toggleAnimation);
}

// Handle window resize
function onWindowResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
}

// Toggle animation pause/resume on click
function toggleAnimation() {
    isAnimationPaused = !isAnimationPaused;

    if (isAnimationPaused) {
        cancelAnimationFrame(animationId);
    } else {
        animate();
    }
}

// Animation loop
let animationId;

function animate() {
    animationId = requestAnimationFrame(animate);

    if (!isAnimationPaused) {
        botellaKlein.rotation.x += 0.01;
        botellaKlein.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
}

// Initialize and start the animation
init();
animate();
