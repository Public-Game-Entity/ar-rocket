import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class Rocket {
  parent!: THREE.Object3D<THREE.Object3DEventMap>;
  scene: THREE.Object3D<THREE.Object3DEventMap>;
  rockets:
    | { model: THREE.Object3D<THREE.Object3DEventMap>[]; direction: any }
    | any;
  rocketModel: THREE.Group<THREE.Object3DEventMap> | any;
  constructor() {
    this.scene = new THREE.Object3D();
    this.rockets = [];
    this.rocketModel = undefined;

    this.addParent();
    this.addRocketModel();
  }

  private addParent() {
    this.parent = new THREE.Object3D();
    this.scene.add(this.parent);
  }

  public shot() {
    const loader = new GLTFLoader();

    loader.load(
      "/saturnv.glb",
      (gltf) => {
        const scale = 0.1;
        gltf.scene.scale.set(scale, scale, scale);

        const rocketDirection = this.parent.rotation;

        gltf.scene.rotation.set(
          rocketDirection.x,
          rocketDirection.y,
          rocketDirection.z
        );

        gltf.scene.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

        gltf.scene.position.set(
          this.parent.position.x,
          this.parent.position.y,
          this.parent.position.z
        );

        const direction = this.parent.getWorldDirection(
          new THREE.Vector3(0, 0, 0)
        );
        this.rockets.push({
          model: gltf.scene,
          direction: direction,
        });
        this.scene.add(gltf.scene);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.log("An error happened");
      }
    );
  }

  private addRocketModel() {
    const loader = new GLTFLoader();

    loader.load(
      "/saturnv.glb",
      (gltf) => {
        const scale = 0.1;
        this.rocketModel = gltf.scene;
        this.rocketModel.scale.set(scale, scale, scale);
        this.rocketModel.rotation.set(-Math.PI / 2, 0, 0);

        this.parent.add(this.rocketModel);
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
