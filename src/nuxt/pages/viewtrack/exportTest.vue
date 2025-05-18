<template>
  <div id="app">
    <canvas id="renderCanvas"></canvas>
    <button @click="exportGLB">Export GLB</button>
  </div>
</template>

<script>
import * as BABYLON from 'babylonjs'
import { GLTF2Export } from 'babylonjs-serializers'
export default {
  name: 'App',
  layout: 'default',
  data() {
    return {
      scene: null,
    }
  },
  mounted() {
    this.initializeBabylon()
  },
  methods: {
    initializeBabylon() {
      // Get the canvas DOM element
      const canvas = document.getElementById('renderCanvas')

      // Load the 3D engine
      const engine = new BABYLON.Engine(canvas, true)

      // Create a basic BJS Scene object
      const scene = new BABYLON.Scene(engine)

      // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
      const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene)

      // Target the camera to scene origin
      camera.setTarget(BABYLON.Vector3.Zero())

      // Attach the camera to the canvas
      camera.attachControl(canvas, true)

      // Create a basic light, aiming 0,1,0 - meaning, to the sky
      const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)

      // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene
      const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, scene)

      // Move the sphere upward 1/2 of its height
      sphere.position.y = 1

      // Create a built-in "ground" shape
      const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6, subdivisions: 2 }, scene)

      this.scene = scene
      // Run the render loop
      engine.runRenderLoop(() => {
        scene.render()
      })

      // The canvas/window resize event handler
      window.addEventListener('resize', () => {
        engine.resize()
      })
    },
    exportGLB() {
      GLTF2Export.GLBAsync(this.scene, 'scene').then(async glb => {
        await glb.downloadFiles()
      })
    },
  },
}
</script>

<style>
#renderCanvas {
  width: 100%;
  height: 100%;
}
</style>
