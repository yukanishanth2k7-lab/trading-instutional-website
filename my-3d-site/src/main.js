import * as THREE from 'three'
import './style.css'

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.z = 5

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

document.body.appendChild(renderer.domElement)

// Cube
const geometry = new THREE.BoxGeometry(2, 2, 2)

const material = new THREE.MeshStandardMaterial({
  color: 0x00ffcc,
  metalness: 0.7,
  roughness: 0.2
})

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

// Light
const light = new THREE.PointLight(0xffffff, 100)
light.position.set(3, 3, 4)

scene.add(light)

// Animation
function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate()

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})