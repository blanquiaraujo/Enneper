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

        // Create the Airy surface geometry
        const geometry = new THREE.ParametricGeometry((u, v, target) => {
        
            var scale = 0.6;//1.68

            var a = 1.0;


            u = (u - 0.5)* 2 * Math.PI; // u varia entre 0 y 2pi
            v = v * 3; // la profundidad es 3 

            var fu = 2 * a * Math.cos(u) * (1 + Math.cos(u));
            var gu = 2 * a * Math.sin(u) * (1 + Math.cos(u));

            var x = scale * fu // funcion f(u)
            var y = scale * gu // funcion g(u)
            var z = scale * v
            
           target.set(x, y, z);
        }, 100, 100);


/*    
    
    // Create the Toro Boy geometry
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

   */ 
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
    

    if (selectedSurface === 'curvasplanascardioide') {

        // Create the Airy surface geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
        
            var scale = 0.6;//1.68

            var a = 1.0;


            u = (u - 0.5)* 2 * Math.PI; // u varia entre 0 y 2pi
            v = v * 3; // la profundidad es 3 

            var fu = 2 * a * Math.cos(u) * (1 + Math.cos(u));
            var gu = 2 * a * Math.sin(u) * (1 + Math.cos(u));

            var x = scale * fu // funcion f(u)
            var y = scale * gu // funcion g(u)
            var z = scale * v
            
           target.set(x, y, z);
        }, 100, 100);


    } else if (selectedSurface === 'curvasplanasastroide') {

        // Create the Airy surface geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
        
            var scale = 2.0;//1.68

            var a = 1.0;


            u = (u - 0.5) * 2 * Math.PI; // u varia entre 0 y 2pi
            v = v * 0.5; // la profundidad es 3 

            var fu = a * (Math.cos(u) ** 3);
            var gu = a * (Math.sin(u) ** 3);

            var x = scale * fu // funcion f(u)
            var y = scale * gu // funcion g(u)
            var z = scale * v
            
           target.set(x, y, z);
        }, 100, 100);


    } else if (selectedSurface === 'curvasplanascicloidealargada') {

        // Create the Airy surface geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
        
            var scale = 0.18;//1.68

            var a = 1.0;
            var b = 3.0;


            u = (u - 0.5) * 8 * Math.PI; // u varia entre 0 y 2pi
            v = v * 2; // la profundidad es 3 

            var fu = a * u - b * Math.sin(u);
            var gu = a - b * Math.cos(u);
            
            var x = scale * fu // funcion f(u)
            var y = scale * gu // funcion g(u)
            var z = scale * v
            
           target.set(x, y, z);
        }, 100, 100);

    }

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
