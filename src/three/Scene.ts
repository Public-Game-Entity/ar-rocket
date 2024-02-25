import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";

class Scene {
  constructor() {
    this.init();
  }

  init() {
    const width = window.innerWidth,
      height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const directLight = new THREE.DirectionalLight(0xffffff);
    scene.add(directLight);

    const sphereLight = new THREE.HemisphereLight(0xb0b0b0, 0x080820, 1);
    scene.add(sphereLight);

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshStandardMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.xr.enabled = true;
    renderer.setAnimationLoop(animation);

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(ARButton.createButton(renderer));

    function animation(time: number) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }
  }
}

export { Scene };
