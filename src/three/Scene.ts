import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { VRButton } from "three/examples/jsm/webxr/VRButton";

import { Rocket } from "./Rocket";

class Scene {
  constructor() {
    this.init();
  }

  private init() {
    const width = window.innerWidth,
      height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const directLight = new THREE.DirectionalLight(0xffffff);
    scene.add(directLight);

    const sphereLight = new THREE.HemisphereLight(0xb0b0b0, 0x080820, 1);
    scene.add(sphereLight);

    const rocketBody = new Rocket();
    scene.add(rocketBody.scene);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.xr.enabled = true;
    renderer.setAnimationLoop(animation);

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(ARButton.createButton(renderer));
    const controller = renderer.xr.getController(0);

    const shot = () => {
      rocketBody.shot();
    };

    controller.addEventListener("selectstart", shot);

    function animation(time: number) {
      rocketBody.parent.position.set(
        controller.position.x,
        controller.position.y,
        controller.position.z
      );
      rocketBody.parent.rotation.x = controller.rotation.x;
      rocketBody.parent.rotation.y = controller.rotation.y;
      rocketBody.parent.rotation.z = controller.rotation.z;

      for (let index = 0; index < rocketBody.rockets.length; index++) {
        const speed = -0.08;

        rocketBody.rockets[index].model.position.x +=
          rocketBody.rockets[index].direction.x * speed;
        rocketBody.rockets[index].model.position.y +=
          rocketBody.rockets[index].direction.y * speed;
        rocketBody.rockets[index].model.position.z +=
          rocketBody.rockets[index].direction.z * speed;
      }

      renderer.render(scene, camera);
    }
  }
}

export { Scene };
