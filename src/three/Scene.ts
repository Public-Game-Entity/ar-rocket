import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
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
    scene.add(rocketBody.parent);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.xr.enabled = true;
    renderer.setAnimationLoop(animation);

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(ARButton.createButton(renderer));

    function animation(time: number) {
      const controller = renderer.xr.getController(0);

      rocketBody.parent.position.set(
        controller.position.x,
        controller.position.y,
        controller.position.z
      );
      rocketBody.parent.rotation.x = controller.rotation.x;
      rocketBody.parent.rotation.y = controller.rotation.y;
      rocketBody.parent.rotation.z = controller.rotation.z;

      renderer.render(scene, camera);
    }
  }
}

export { Scene };
