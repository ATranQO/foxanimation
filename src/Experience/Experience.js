import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";
import sources from "./sources";
import Debug from "./Utils/Debug";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access (optional, depends on your need)
    window.experience = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  destroy() {
    // Unsubscribe from events
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene and dispose of resources
    this.scene.traverse((child) => {
      // Test if it's a mesh and has geometry
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Test if it has material and dispose it
        if (child.material) {
          // Loop through the material properties
          for (const key in child.material) {
            const value = child.material[key];

            // Test if there is a dispose function
            if (value && typeof value.dispose === "function") {
              value.dispose();
            }
          }
        }
      }
    });

    // Dispose renderer
    this.renderer.dispose();

    // Dispose camera controls (if applicable)
    if (this.camera.controls) {
      this.camera.controls.dispose();
    }

    // Destroy debug UI if it's active
    if (this.debug && this.debug.active && this.debug.ui) {
      this.debug.ui.destroy();
    }
  }
}
