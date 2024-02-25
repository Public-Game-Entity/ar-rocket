import * as THREE from "three";

class Rocket {
  parent: THREE.Object3D<THREE.Object3DEventMap> | any;
  constructor() {
    this.addParent();
    this.addRocketModel();
  }

  private addParent() {
    this.parent = new THREE.Object3D();
  }

  private addRocketModel() {
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshStandardMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    this.parent.add(mesh);
  }
}

export { Rocket };
