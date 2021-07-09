import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import earthMap from '../textures/earth_map.jpg'
import earthBump from '../textures/earth_bump.jpg'
import earthWater from '../textures/earth_water.png'
import earthClouds from '../textures/earth_clouds.png'
import moonImg from '../textures/moon.jpg'

let renderer,
    scene,
    camera,

    earthMapTexture,
    earthBumpTexture,
    earthWaterTexture,
    earthGeometry,
    earthMaterial,
    earthMesh,

    cloudTexture,
    cloudGeometry,
    cloudMaterial,
    cloudMesh,

    moonTexture,
    moonGeometry,
    moonMaterial,
    moonMesh,

    directLight,
    ambientLight

let earthRadius = 0.5,
    moonRadius = earthRadius * 0.2726,
    moonEarthDistance = earthRadius * 384 // real earth moon distance, but not used here

let moonOrbit = 0

// check if window size is changed
window.addEventListener('resize', onWindowResize, false)

init()
animate()

function init() {

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)

    camera.position.z = 4

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    earthMapTexture = new THREE.TextureLoader().load(earthMap)
    earthBumpTexture = new THREE.TextureLoader().load(earthBump)
    earthWaterTexture = new THREE.TextureLoader().load(earthWater)
    cloudTexture = new THREE.TextureLoader().load(earthClouds)
    moonTexture = new THREE.TextureLoader().load(moonImg)

    earthGeometry = new THREE.SphereGeometry(earthRadius, 32, 32)
    cloudGeometry = new THREE.SphereGeometry(earthRadius + 0.003, 32, 32)
    moonGeometry = new THREE.SphereGeometry(moonRadius, 32, 32)

    earthMaterial = new THREE.MeshPhongMaterial({
        map: earthMapTexture,
        bumpMap: earthBumpTexture,
        bumpScale: 0.005,
        specularMap: earthWaterTexture,
        specular: new THREE.Color('grey')
    })

    cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true
    })

    moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture })

    earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earthMesh)

    cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
    scene.add(cloudMesh)

    moonMesh = new THREE.Mesh(moonGeometry, moonMaterial)
    scene.add(moonMesh)

    directLight = new THREE.DirectionalLight(0xd6d6d6, 0.9)
    directLight.position.set(25, 1, 5)
    scene.add(directLight)

    ambientLight = new THREE.AmbientLight(0x404040, 0.2)
    scene.add(ambientLight)

    const controls = new OrbitControls(camera, renderer.domElement)

}

function animate() {
    renderer.render(scene, camera)

    earthMesh.rotation.y += 0.001
    cloudMesh.rotation.y += 0.00098
    cloudMesh.rotation.z += 0.000099

    moonMesh.position.x = Math.cos(moonOrbit) * 2
    moonMesh.position.z = Math.sin(moonOrbit) * 4
    moonOrbit += 0.001
    moonMesh.rotation.y += 0.0001

    requestAnimationFrame(animate)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

