import { OrbitControls }  from './orbitcontrols.js';

let scene, camera, renderer;
let surfaceMesh; 
let isAnimationPaused = false;
let animationId;
 
var primerSelect = document.getElementById("primerSelect");
var segundoSelect = document.getElementById("segundoSelect");



export function mostrarComboTextura() {
    var primerCombo = document.getElementById("material-select");
    var segundoCombo = document.getElementById("texture-select");

    if (primerCombo.value === "textura") {
        segundoCombo.disabled = false;
    } else {
        segundoCombo.disabled = true;
    //    segundoSelect.selectedIndex = 0;
    }
}

export function init() {
         
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
    const fogColor = 0x000090;
    const fogNear = 2.2;
    const fogFar = 5;
    scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
    //scene.fog = null;

    const geometry = new THREE.ParametricGeometry((q, f, vec) => {

        var scale = 1.7;

        var a = 0.2;
        var b = 0.2;
        var r0 = 1.0;
        var r1 = 0.3;
    
        q = q * 2 * Math.PI;
        f = f * 2 * Math.PI;

        var x = scale * Math.sign(Math.cos(q)) * Math.pow(Math.abs(Math.cos(q)), a) * (r0 + r1 * Math.sign(Math.cos(f)) * Math.pow(Math.abs(Math.cos(f)), b));
        var y = scale * Math.sign(Math.sin(q)) * Math.pow(Math.abs(Math.sin(q)), a) * (r0 + r1 * Math.sign(Math.cos(f)) * Math.pow(Math.abs(Math.cos(f)), b));
        var z = scale * r1 * Math.sign(Math.sin(f)) * Math.pow(Math.abs(Math.sin(f)), b);


        vec.set(x, y, z); // Usamos vec para asignar los valores de x, y, z
    }, 150, 150); // Ampliamos el rango de los parámetros q y f

// Create a texture loader
    const textureLoader = new THREE.TextureLoader();

    // Load the texture
    const texture = textureLoader.load('./textures/Perfil.jpg');

    // Create material with the loaded texture
    const material = new THREE.MeshNormalMaterial({ wireframe: true , color: 0x00ff00 });
    //const material = new THREE.MeshBasicMaterial(); // { map: texture }


    // Create mesh with the new material and geometry
    surfaceMesh = new THREE.Mesh(geometry, material);

    // Add the mesh to the scene
    scene.add(surfaceMesh);

    // Modificar el estilo CSS para ocultar las barras de desplazamiento
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';

    // Add event listener for window resizing
    window.addEventListener('resize', onWindowResize, false);

    // Set the controls for the heart of the sun
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;


    /*
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
    */

}

// Animation loop
export function animate() {
    animationId = requestAnimationFrame(animate);

    // Rotate the surface
    surfaceMesh.rotation.x += 0.01;
    surfaceMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}


// Handle window resize
export function onWindowResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
}

// Cambia a superficie
export function changeSurface() {
    const surfaceSelect = document.getElementById('surface-select');
    const selectedSurface = surfaceSelect.value;

    // Remove existing surface
    scene.remove(surfaceMesh);

    // Create geometry based on selection
    let geometry;
      // Obtener el valor seleccionado
      //const valorSeleccionado = surface-select.value;
              // Obtener el elemento select
    const combo = document.getElementById('surface-select');

    const valorSeleccionado = combo.value;

    // Dividir el valor en partes (por ejemplo, "opcion1|valorA")
    const partes = valorSeleccionado.split('|');
    const valor1 = partes[0];
    const valor2 = partes[1];
    var valor1f = parseFloat(valor1);
    var valor2f = parseFloat(valor2);    

    geometry = new THREE.ParametricGeometry((q, f, vec) => {

        var scale = 1.7;

        var a = valor1f;
        var b = valor2f;
        var r0 = 1.0;
        var r1 = 0.3;
    
        q = q * 2 * Math.PI;
        f = f * 2 * Math.PI;

        var x = scale * Math.sign(Math.cos(q)) * Math.pow(Math.abs(Math.cos(q)), a) * (r0 + r1 * Math.sign(Math.cos(f)) * Math.pow(Math.abs(Math.cos(f)), b));
        var y = scale * Math.sign(Math.sin(q)) * Math.pow(Math.abs(Math.sin(q)), a) * (r0 + r1 * Math.sign(Math.cos(f)) * Math.pow(Math.abs(Math.cos(f)), b));
        var z = scale * r1 * Math.sign(Math.sin(f)) * Math.pow(Math.abs(Math.sin(f)), b);


        vec.set(x, y, z); // Usamos vec para asignar los valores de x, y, z
    }, 150, 150); // Ampliamos el rango de los parámetros q y f




    const textureLoader = new THREE.TextureLoader();

    // Load the texture
    const texture = textureLoader.load('./textures/Perfil.jpg');

    // Create material with the loaded texture
    const material = new THREE.MeshBasicMaterial({ map: texture });


    // Create mesh with the new material and geometry
    surfaceMesh = new THREE.Mesh(geometry, material);

    // Add the mesh to the scene
    scene.add(surfaceMesh);

    // Update material and texture based on selections
    changeMaterial();
  //  changeTexture();
}

// Function to change material based on selection
export function changeMaterial() {
    const materialSelect = document.getElementById('material-select');
    const selectedMaterial = materialSelect.value;
    
    const textureSelect = document.getElementById('texture-select');
    const selectedTexture = textureSelect.value;
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('./textures/' + selectedTexture);




    let material;
    mostrarComboTextura();
    // Choose material based on selection
    switch (selectedMaterial) {
        case 'basico':
            material = new THREE.MeshBasicMaterial({ color: 0xffffff });
            scene.fog = new THREE.Fog(0x000090, 2.2, 5); // Restaurar la niebla
    
            break;
        case 'textura':
            // changeTexture();
            // alert('entra!');
            material = new THREE.MeshBasicMaterial({ map: texture , color: 0xffffff });
            //surfaceMesh.material.color = 0xffffff;
            scene.fog = null;
            break;
        case 'wireframe':
            material = new THREE.MeshNormalMaterial({ wireframe: true , color: 0x00ff00 });
            scene.fog = null;
            break;

        case 'wireframe2':
            material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
            scene.fog = new THREE.Fog(0x000090, 2.2, 5); // Restaurar la niebla
            break;

        case 'basicoazul':
            material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });// Lambert
            scene.fog = new THREE.Fog(0x000090, 2.2, 5); // Restaurar la niebla
    
            // material.color = 0x0000ff;
            break;
        default:
            material = new THREE.MeshBasicMaterial();
            scene.fog = new THREE.Fog(0x000090, 2.2, 5); // Restaurar la niebla
    
            break;
    }
    
    // Apply the selected material to the surface mesh
    surfaceMesh.material = material;
    //   surfaceMesh.material.needsUpdate = true;

}

// Function to change texture based on selection
export function changeTexture() {
    const textureSelect = document.getElementById('texture-select');
    const selectedTexture = textureSelect.value;
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('./textures/' + selectedTexture);
    
    //material.color = 0xffffff;
    surfaceMesh.material.map = texture;
    surfaceMesh.material.needsUpdate = true;

}
