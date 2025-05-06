// Inicialização da cena
const scene = new THREE.Scene();

// Inicialização da câmera:
// PerspectiveCamera cria uma perspectiva 3D (similar à visão humana)
// Parâmetros:
// 75: Campo de visão (em graus)
// window.innerWidth / window.innerHeight: Proporção da tela
// 0.1: Distância mínima de renderização
// 1000: Distância máxima de renderização
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Inicialização do renderizador WebGL (para gráficos 3D no navegador)
const renderer = new THREE.WebGLRenderer();
// Define o tamanho do renderizador para ocupar toda a janela
renderer.setSize(window.innerWidth, window.innerHeight);
// Adiciona o elemento canvas do renderizador ao corpo do documento HTML
document.body.appendChild(renderer.domElement);

// Array de cores para os objetos
const colors = [0xff0000, 0x00ff00, 0x0000ff]; // Vermelho, Verde, Azul

//Criação do Cubo
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // Geometria de um cubo 
const cubeMaterial = new THREE.MeshBasicMaterial({ color: colors[0] }); // Material básico com a primeira cor 
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial); // Cria o objeto de malha (geometria + material)
cube.position.set(-2, 0, 0); // Define a posição do cubo no espaço 3D
scene.add(cube); // Adiciona o cubo a cena

//Criação da Esfera
const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32); // Geometria de uma esfera 
const sphereMaterial = new THREE.MeshBasicMaterial({ color: colors[1] }); // Material básico com a segunda cor
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); // Cria o objeto de malha da esfera
sphere.position.set(0, 0, 0); // Define a posição da esfera na origem 
scene.add(sphere); 

//Criação do Cilindro
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32); // Geometria de um cilindro
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: colors[2] }); // Material básico com a terceira cor
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial); // Cria o objeto de malha do cilindro
cylinder.position.set(2, 0, 0); // Define a posição do cilindro
scene.add(cylinder); 

// Iluminação
// Cria uma luz direcional (como a luz do sol, com raios paralelos)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Cor branca
directionalLight.position.set(5, 5, 5); // Define a direção da luz (de uma posição distante)
scene.add(directionalLight); // Adiciona a luz a cena

// Posicionamento Inicial da Câmera
camera.position.z = 5; // Move a câmera para trás no eixo Z para visualizar os objetos

//Controle da Câmera
const moveSpeed = 0.1; // Velocidade de movimento da câmera
const rotationSpeed = 0.01; // Velocidade de rotação da câmera
let isDragging = false; // Flag para verificar se o mouse está sendo arrastado
let previousMousePosition = { x: 0, y: 0 }; // Armazena a posição anterior do mouse

// Event listener para as teclas pressionadas
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w': camera.position.z -= moveSpeed; break; // Move a câmera para frente
        case 's': camera.position.z += moveSpeed; break; // Move a câmera para trás
        case 'a': camera.position.x -= moveSpeed; break; // Move a câmera para a esquerda
        case 'd': camera.position.x += moveSpeed; break; // Move a câmera para a direita
        case 'q': camera.rotation.y += rotationSpeed; break; // Rotaciona a câmera para a esquerda 
        case 'e': camera.rotation.y -= rotationSpeed; break; // Rotaciona a câmera para a direita 
    }
});

// Event listener para o clique do mouse (início do arrasto)
renderer.domElement.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
});

// Event listener para a liberação do mouse (fim do arrasto)
document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Event listener para o movimento do mouse
document.addEventListener('mousemove', (event) => {
    if (!isDragging) return; // Se o mouse não estiver sendo arrastado, não faz nada

    // Calcula a diferença de movimento do mouse
    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };

    // Aplica a rotação da câmera com base no movimento do mouse
    camera.rotation.y += deltaMove.x * rotationSpeed;
    camera.rotation.x += deltaMove.y * rotationSpeed;

    // Atualiza a posição anterior do mouse
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
});

//Loop de Animação
function animate() {
    requestAnimationFrame(animate);

    // Animação básica dos objetos (rotação)
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    sphere.rotation.y -= 0.03; // deixei mais rapido pra notar mais a diferença
    cylinder.rotation.x -= 0.01;

    // Renderiza a cena com a câmera atual
    renderer.render(scene, camera);
}

animate();


// Event listener para redimensionamento da janela
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Atualiza a proporção da câmera
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    // Atualiza o tamanho do renderizador
    renderer.setSize(newWidth, newHeight);
});