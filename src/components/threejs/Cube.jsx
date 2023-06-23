import { useRef, useEffect } from 'react';
import * as T from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const Cube =() => {
  const mountRef = useRef(null)
  
  useEffect(() => {
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    //escena y camara
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(90, width / height, 0.01, 1000);
    camera.position.z = 6;
    camera.position.x = 6;
    scene.add(camera);
    
    //renderizador
    const renderer = new T.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    //controles de camara
    const controls = new OrbitControls(camera,renderer.domElement);
    const animate = () =>{
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
    };

    //cubo
    const geometry = new T.BoxGeometry(1,5,5);
    const material = new T.MeshBasicMaterial({color: 0x0f2c64});
    const cb = new T.Mesh(geometry,material);
    scene.add(cb);
    camera.lookAt(cb.position)

    //renderizo
    animate();

    return () => {
      currentRef.removeChild(renderer.domElement);
    }
  }, []);
  
  return (
    <div ref={mountRef} style={{width:"100%",height:"100vh"}}></div>
  )
};

export default Cube;