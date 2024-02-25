import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class Rocket {
  parent!: THREE.Object3D<THREE.Object3DEventMap>;
  constructor() {
    this.addParent();
    this.addRocketModel();
  }

  private addParent() {
    this.parent = new THREE.Object3D();
  }

  private addRocketModel() {
    const loader = new GLTFLoader();

    loader.load(
      "/saturnv.glb",
      (gltf) => {
        const scale = 0.1;
        gltf.scene.scale.set(scale, scale, scale);
        gltf.scene.rotation.set(-Math.PI / 2, 0, 0);
        this.parent.add(gltf.scene);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.log("An error happened");
      }
    );
  }
}

export { Rocket };
