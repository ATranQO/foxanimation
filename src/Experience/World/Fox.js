import * as THREE from "three";
import Experience from "../Experience";

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("fox");
    }

    // Assign the fox model resource separately
    this.foxModel = this.resources.items.foxModel;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.model = this.foxModel.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    // Kontrola, jestli existují animace
    if (this.foxModel.animations && this.foxModel.animations.length > 0) {
      this.animation.actions = {};

      // Přiřazení různých animací
      this.animation.actions.idle = this.animation.mixer.clipAction(
        this.foxModel.animations[0]
      );
      this.animation.actions.walking = this.animation.mixer.clipAction(
        this.foxModel.animations[1]
      );
      this.animation.actions.running = this.animation.mixer.clipAction(
        this.foxModel.animations[2]
      );

      // Nastav aktuální animaci na 'idle'
      this.animation.actions.current = this.animation.actions.idle;
      this.animation.actions.current.play();
    } else {
      console.error("Žádné animace nebyly nalezeny ve zdroji foxModel");
    }

    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);
      this.animation.actions.current = newAction;
    };

    // Debug part
    if (this.debug.active) {
      const debugObject = {
        playIdle: () => {
          this.animation.play("idle");
        },
        playWalking: () => {
          this.animation.play("walking");
        },
        playRunning: () => {
          this.animation.play("running");
        },
      };
      this.debugFolder.add(debugObject, "playIdle");
      this.debugFolder.add(debugObject, "playWalking");
      this.debugFolder.add(debugObject, "playRunning");
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
