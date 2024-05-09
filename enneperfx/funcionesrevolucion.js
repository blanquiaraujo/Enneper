



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
    

    // Create the Cicloide ordinaria de revolucion surface geometry
    const geometry = new THREE.ParametricGeometry((q, j, target) => {
            const scale = 0.26;//1.68

            const a = 1.0;
        
            q = (q - 0.5) * 8 ;//Math.PI;
            j = (j - 0.0) * 4 * Math.PI;

            const x = scale * a * (j - Math.sin(j));
            const y = scale * a * (1 - Math.cos(j)) * Math.cos(q);
            const z = scale * a * (1 - Math.cos(j)) * Math.sin(q);
            
            
            
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

    } else if (selectedSurface === 'sherlock') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 1.0;//1.68

            u = (u - 0.5) * 2 ;//Math.PI;
            v = (v - 0.0) * 2 * Math.PI;


            const x = scale * ((1- u * u * u) * Math.sin(v));
            const y = scale * ((1- u * u * u) * Math.cos(v));
            const z = scale * (u + 0.1);
           
           target.set(x, y, z);
        }, 200, 200);
        
    } else if (selectedSurface === 'mobiuscirc') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 1.0;//1.68

            const a = 1.0;

            u = (u - 0.0) * Math.PI;
            v = (v - 0.0) * Math.PI;


            const x = scale * (a * (((-2)* Math.cos(2*v) * Math.sin(u))/((-2)+Math.sqrt(2)*Math.cos(u)*Math.sin(v)
                      + Math.sqrt(2)*Math.sin(u)*Math.sin(2*v))));
            
            const y = scale * (a * ((Math.sqrt(2)* Math.cos(u) * Math.sin(v) - Math.sin(u) * Math.sin(2*v))
             / ((-2) + Math.sqrt(2)*Math.cos(u)*Math.sin(v)
                      + Math.sqrt(2)*Math.sin(u)*Math.sin(2*v))));
            
            const z = scale * (a * (((-2)* Math.cos(u) * Math.cos(v))/((-2) + Math.sqrt(2)*Math.cos(u)*Math.sin(v)
                      + Math.sqrt(2)*Math.sin(u)*Math.sin(2*v))));
            
            
           target.set(x, y, z);
        }, 200, 200);
    
    } else if (selectedSurface === 'arconwallis') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 1.0;//1.68

            const a = 1.0;
            const b = 1.0;
            const c = 3.0;

            u = (u - 0.5) * 2 * 3 * Math.PI/4;
            v = (v - 0.0) * 1;


            const x = scale * (v * Math.cos(u))
            const y = scale * (v * Math.sin(u))
            const z = scale * (c * Math.sqrt(a * a - b * b * Math.cos(u) * Math.cos(u)))
            
            
           target.set(x, y, z);
        }, 200, 200);


    } else if (selectedSurface === 'tubosviviani') {

        // Create the Airy surface geometry
        geometry = new THREE.ParametricGeometry((u, v, target) => {
        
            var scale = 0.6;//1.68

            var a = 1.0;
            var radiotubo = 0.1;


            u = (u - 0.5)* 2 * Math.PI; // u varia entre 0 y 2pi
            v = v * 3; // la profundidad es 3 
/*
            var Atx = a * (1+ Math.cos(t));
            var Aty = a * Math.sin(t);
            var Atz = 2 * Math.sin(t/2);
*/

            var x = a * (1+ Math.cos(u));
            var y = a * Math.sin(u);
            var z = 2 * Math.sin(u/2);
           target.set(x, y, z);
        }, 100, 100);



    } else if (selectedSurface === 'curvasplanascardioide') {

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





    } else if (selectedSurface === 'supertoroide1515') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((q, f, target) => {
           // const scale = 1.26;//1.68

            var scale = 1.0;

            var a = 0.2;
            var b = 0.2;
            var r0 = 1.0;
            var r1 = 0.3;
        
            q = q * 2 * Math.PI;
            f = f * 2 * Math.PI;

            var x = scale * Math.sign(Math.cos(q)) * Math.pow(Math.abs(Math.cos(q)), a) * (r0 + r1 * Math.sign(Math.cos(f)) * Math.pow(Math.abs(Math.cos(f)), b));
            var y = scale * Math.sign(Math.sin(q)) * Math.pow(Math.abs(Math.sin(q)), a) * (r0 + r1 * Math.sign(Math.cos(f)) * Math.pow(Math.abs(Math.cos(f)), b));
            var z = scale * r1 * Math.sign(Math.sin(f)) * Math.pow(Math.abs(Math.sin(f)), b);

        target.set(x, y, z);
      }, 50, 50);



    } else if (selectedSurface === 'superelip1545') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((q, f, target) => {
            var scale = 1.0;//1.68

            var a = 1.0;//3;
            var b = 1.0;//1/5;
            var rx = 1.0; 
            var ry = 1.0;
            var rz = 1.0;
         
            const phi = (q - 0.5) * Math.PI;
            const theta = f * 2 * Math.PI;
             
         //   q = (q - 0.5) * Math.PI;
         //   f = (f - 0.0) * 2 * Math.PI;

            var x = scale * rx * Math.pow(Math.cos(phi),a) * Math.pow(Math.cos(theta),b);
            var y = scale * ry * Math.pow(Math.cos(phi),a)  * Math.pow(Math.sin(theta), b);
            var z = scale * rz * Math.pow(Math.sin(phi),a);
            
           
        target.set(x, y, z);
      }, 100, 100);
         

    } else if (selectedSurface === 'superelip1545imp') {

        // Create the Airy surface geometry

        // Crear la superficie
  /*
        const geometry = new THREE.ParametricGeometry((u, v, target) => {

            var a = 3.0;//3;
            var b = 1.0;//1/5;

            u = (u - 0.5) * Math.PI;
            v = (v - 0.0) * 2 * Math.PI;



            const x = Math.cos(u) * Math.sin(v);
            const y = Math.sin(u) * Math.sin(v);
            const z = Math.pow(Math.pow(x, 2 / b) + Math.pow(y, 2 / b), b / a) + Math.pow(z, 2 / a) - 1;
            target.set(x, y, z);
        }, 100, 100);
*/


      const geometry = new THREE.ParametricGeometry((u, v) => {
 
        var a = 1.0;//3;
        var b = 1.0;//1/5;

        const phi = u * Math.PI;
        const theta = v * 2 * Math.PI;
         
       // u = (u - 0.5) * 1.999 *Math.PI;
       // v = (v - 0.0) * 2 * Math.PI;
 
        const x = Math.cos(phi) * Math.cos(theta);
        const y = Math.sin(phi) * Math.cos(theta);
        const z = Math.sin(theta);
        return new THREE.Vector3(x, y, z);
    }, 50, 50);


    } else if (selectedSurface === 'cicloideorox') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((q, j, target) => {
            const scale = 0.26;//1.68

            const a = 1.0;
        
            q = (q - 0.5) * 8 ;//Math.PI;
            j = (j - 0.0) * 4 * Math.PI;

            const x = scale * a * (j - Math.sin(j));
            const y = scale * a * (1 - Math.cos(j)) * Math.cos(q);
            const z = scale * a * (1 - Math.cos(j)) * Math.sin(q);
            
            
           
        target.set(x, y, z);
      }, 100, 100);
       
    
    } else if (selectedSurface === 'cicloideoroz') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 0.13;//1.68

            const a = 1.0;
        
            u = (u - 0.5) * 8 ;//Math.PI;
            v = (v - 0.0) * 4 * Math.PI;

            const x = scale * a * (v - Math.sin(v)) * Math.cos(u);
            const y = scale * a * (v - Math.sin(v)) * Math.sin(u);
            const z = scale * a * (1 - Math.cos(v));
            
           
        target.set(x, y, z);
      }, 100, 100);
        
    
    } else if (selectedSurface === 'agnesi') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 1.13;//1.68

            const a = 1.0;
        
            u = (u - 0.5) * 4 * Math.PI;
            v = (v - 0.0) * 2 * Math.PI;

            const x = scale * a * (-2) * Math.cos(v) * Math.cos(v)* Math.cos(u);
            const y = scale * a * (-2) * Math.cos(v) * Math.cos(v)* Math.sin(u);
            const z = scale * a * (-2) * Math.tan(v)
 
           
        target.set(x, y, z);
      }, 100, 100);
    
        
    
    } else if (selectedSurface === 'astroide') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 3.0;//1.68

            const a = 1.0;
        
            u = (u - 0.5) * 8 ;//Math.PI;
            v = (v - 0.0) * 4 * Math.PI;

            const x = scale * a * Math.cos(v) * Math.cos(v)* Math.cos(v) * Math.cos(u);
            const y = scale * a * Math.cos(v) * Math.cos(v)* Math.sin(u) * Math.sin(u);
            const z = scale * a * Math.sin(v) * Math.sin(v)* Math.sin(v);
 
           
        target.set(x, y, z);
      }, 100, 100);
    
    
    } else if (selectedSurface === 'bifoliaox') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 3.0;//1.68

            const a = 2.0;
        
            u = (u - 0.5) * 8 ;//Math.PI;
            v = (v - 0.0) * 4 * Math.PI;

            const x = scale * a * Math.sin(v) * Math.cos(v)* Math.cos(v) * Math.cos(v);
            const y = scale * a * Math.sin(v) * Math.sin(v)* Math.cos(v) * Math.cos(v) * Math.cos(u);
            const z = scale * a * Math.sin(v) * Math.sin(v)* Math.cos(v) * Math.cos(v) * Math.sin(u);
 
           
        target.set(x, y, z);
      }, 200, 200);
    
    
    } else if (selectedSurface === 'bifoliaoz') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 3.0;//1.68

            const a = 2.0;
        
            u = (u - 0.5) * 8 ;//Math.PI;
            v = (v - 0.0) * 4 * Math.PI;

            const x = scale * a * Math.sin(v) * Math.cos(v)* Math.cos(v) * Math.cos(v) * Math.cos(u);
            const y = scale * a * Math.sin(v) * Math.cos(v)* Math.cos(v) * Math.cos(v) * Math.sin(u);
            const z = scale * a * Math.sin(v) * Math.sin(v)* Math.cos(v) * Math.cos(v);
 
           
        target.set(x, y, z);
      }, 200, 200);
    
    
    } else if (selectedSurface === 'cicloidealrevox') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((u, v, target) => {
            const scale = 0.23;//1.68

            const a = 1.0;
            const b = 3.0;

            u = (u - 0.5) * 8 ;//Math.PI;
            v = (v - 0.0) * 4 * Math.PI;

            const x = scale * (a * v - b * Math.sin(v));
            const y = scale * (a - b * Math.cos(v) * Math.cos(u));
            const z = scale * (a - b * Math.cos(v) * Math.sin(u));

           
        target.set(x, y, z);
      }, 200, 200);
  
    
    } else if (selectedSurface === 'cicloidealoz') {

        // Create the Airy surface geometry
            geometry = new THREE.ParametricGeometry((q, j, target) => {
            const scale = 0.23;//1.68

            const a = 1.0;
            const b = 3.0;

            q = (q - 0.5) * 8 ;//Math.PI;
            j = (j - 0.0) * 4 * Math.PI;

            const x = scale * (a * j - b * Math.sin(j) * Math.cos(q));
            const y = scale * (a * j - b * Math.sin(j) * Math.sin(q));
            const z = scale * (a - b * Math.cos(j));

           
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
