import React, { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-face-three.prod.js';
import * as THREE from 'three';

export default ({ modelID }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const mindarThree = new MindARThree({
      container: containerRef.current,
    });

    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const srcID = `./assets/${modelID}_image.png`;

    const faceMesh = mindarThree.addFaceMesh();
    const texture = new THREE.TextureLoader().load(srcID);
    faceMesh.material.map = texture;
    faceMesh.material.transparent = true;
    faceMesh.material.needsUpdate = true;
    scene.add(faceMesh);

    const start = async () => {
      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };
    start();
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={containerRef}></div>;
};
