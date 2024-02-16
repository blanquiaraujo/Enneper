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
    if (selectedSurface === 'klein') {
        // Create the Botella de Klein surface geometry
    //    geometry = new THREE.BoxGeometry(2.5,2.5,2.5);
        
           // Create the Klein surface geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 0.68;

            // Limit u and v to the range (0, 2*PI) y (0, 2*PI)
            u = (u - 0.0) * 2 * Math.PI;
            v = (v - 0.0) * 2 * Math.PI;

            const x = scale * (3 + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * Math.cos(u);
            const y = scale * (3 + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * Math.sin(u);
            const z = scale * (Math.sin(u / 2) * Math.sin(v) + Math.cos(u / 2) * Math.sin(2 * v));

            target.set(x, y, z);

        }, 100, 100);

    } else if (selectedSurface === 'airy') {

// Create the Airy surface geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 1.68;

            u = (u - 0.5) * 2 * 5;
            v = (v - 0.5) * 2 * 5;

            const x = scale * u;
            const y = scale * v;
            var  r = Math.sqrt(x * x + y * y); 
            const z = scale * 2 * (Math.sin(Math.PI * r) / (Math.PI * r));

            target.set(x, y, z);
        }, 200, 200);



    } else if (selectedSurface === 'toroboy') {


       
        // Create the Boy Torus geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
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

    } else if (selectedSurface === 'clifford') {
        //Create the Clifford Torus geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 0.6;

            const R = 3;
            const r = 1;
            const k = 0.5;

            u = (u - 0.0) * 2 * Math.PI;
            v = (v - 0.0) * 2 * Math.PI;

            const x = scale * (R + r * Math.cos(v)) * Math.cos(u);
            const y = scale * (R + r * Math.cos(v)) * Math.sin(u);
            const z = scale * r * Math.sin(v) * (1 + k * u);
            target.set(x, y, z);
        }, 100, 100);
    // alert('hola clifford');

} else if (selectedSurface === 'supenneper') {
                        
        // Create the Enneper surface geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 0.4;

            // Limit u and v to the range (-2, 2)
            u = (u - 0.5) * 4;
            v = (v - 0.5) * 4;

            const x = scale * (u - (u * u * u) / 3 + u * v * v);
            const y = scale * (v - (v * v * v) / 3 + v * u * u);
            const z = scale * (u * u - v * v);
            target.set(x, y, z);
        }, 100, 100);


} else if (selectedSurface === 'mobius') {
        // Create the Mobius surface geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 1.6; //2.2

            // Limit u and v to the range (0, 2*PI) y (-1,1)
            u = (u - 0.0) * 2 * Math.PI;
            v = (v - 0.5) * 2;

            const x = scale * (1 + v/2 * Math.cos(u/2)) * Math.cos(u);
            const y = scale * (1 + v/2 * Math.cos(u/2)) * Math.sin(u);
            const z = scale * v/2 * Math.sin(u/2);

            target.set(x, y, z);
        }, 100, 100);

                
                
       
} else if (selectedSurface === 'supscherk') {
                   
        // Create the Scherk surface geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
            // Mapping u and v to the range (-10, 10)
            const uMapped = (u * 30) - 15;
            const vMapped = (v * 30) - 15;
            const scale = 0.8;

            // Define the parametric equation for the Scherk surface here
            const x = uMapped;
            const y = vMapped;
            const z = scale * (Math.log10(Math.cosh(vMapped)) / Math.cosh(uMapped));

            target.set(x, y, z);
        }, 100, 100);



    } else if (selectedSurface === 'clifford') {
        //Create the Clifford Torus geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 0.6;

            const R = 3;
            const r = 1;
            const k = 0.5;

            u = (u - 0.0) * 2 * Math.PI;
            v = (v - 0.0) * 2 * Math.PI;

            const x = scale * (R + r * Math.cos(v)) * Math.cos(u);
            const y = scale * (R + r * Math.cos(v)) * Math.sin(u);
            const z = scale * r * Math.sin(v) * (1 + k * u);
            target.set(x, y, z);
        }, 100, 100);


       
    } else if (selectedSurface === 'estanque') {

        
        // Create the Onda Estanque surface geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 0.88; //1.85

            // Limit u and v to the range (0, 2*PI) y (-1,1)
            u = (u - 0.5) * 2 * 5;
            v = (v - 0.5) * 2 * 5;

            const x = 1 * u;
            const y = 1 * v;
            const z = scale * 2 * (Math.sin(Math.PI * Math.sqrt(x * x + y * y)));
                            
            target.set(x, y, z);
        }, 200, 200);

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
