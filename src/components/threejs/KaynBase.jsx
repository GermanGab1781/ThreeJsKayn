import { useRef, useEffect, useState } from 'react';
import * as T from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import MODEL from '../../media/models/KaynNoMetallic.glb';
import Ability from '../../components/Ability'
import Passiveimg from '../../media/images/abilities/base/Passive.png'
import Qimg from '../../media/images/abilities/base/Q.png'
import Wimg from '../../media/images/abilities/base/W.png'
import Eimg from '../../media/images/abilities/base/E.png'
import Rimg from '../../media/images/abilities/base/R1.png'
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'

const KaynBase = () => {
  const mountRef = useRef(null)
  const [mixer, setMixer] = useState(undefined);
  const [clips, setClips] = useState(undefined);
  const [idle, setIdle] = useState(undefined);
  const [buttons, setButtons] = useState(true);
  const [model,setModel] = useState(undefined);
 
  useEffect(() => {
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;
    let mixer;

    //escena y camara
    const scene = new T.Scene();
    scene.background = new T.Color("black")
    //Add light
    const light = new T.AmbientLight("red");
    scene.add(light);
    const camera = new T.PerspectiveCamera(100, width / height, 0.01, 10000);
    camera.position.z = 250;
    camera.position.y = 50;
    scene.add(camera);

    //reloj
    const clock = new T.Clock();

    //renderizador
    const renderer = new T.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    //controles de camara
    const controls = new OrbitControls(camera, renderer.domElement);
    //#endregion

    //Modelo Loader con Animaciones
    const loader = new GLTFLoader();
    loader.load(MODEL, function (gltf) {
      const model = gltf.scene;
      setModel(model)
      scene.add(model);
      model.position.set(0,-125,0)
      mixer = new T.AnimationMixer(model);
      const clips = gltf.animations;
      //guardo en UseState para poder cambiar animacion OnClick
      setMixer(mixer)
      setClips(clips)
      console.log(clips)

      //#region Animaciones
      //idle loop
      const clip3 = T.AnimationClip.findByName(clips, "kayn_idle1_loop.anm");
      const idleLoop = mixer.clipAction(clip3);
      setIdle(idleLoop);
      idleLoop.play();

      //Q part 2
      const Q2 = mixer.clipAction(T.AnimationClip.findByName(clips, "kayn_spell1_circle.anm"));
      Q2.setLoop(T.LoopOnce)
      Q2.clampWhenFinished = true;

      //E part 2
      const E2 = mixer.clipAction(T.AnimationClip.findByName(clips, "kayn_spell3_run.anm"));
      E2.setLoop(T.LoopRepeat, 2)
      E2.clampWhenFinished = true;

      //R part 2
      const R2 = mixer.clipAction(T.AnimationClip.findByName(clips, "kayn_spell4_hit.anm"));
      R2.setLoop(T.LoopOnce)
      R2.clampWhenFinished = true;
      //#endregion

      //MIXER DE ANIMACIONES
      mixer.addEventListener('finished', function (e) {
        //console.log("animation", e.action._clip.name, "finished");
        if (e.action._clip.name === "kayn_spell1_dash.anm") {
          mixer._actions[e.action._cacheIndex].crossFadeTo(Q2.reset().play(), 0.2)
        } else if (e.action._clip.name === "kayn_spell3_run_in.anm") {
          mixer._actions[e.action._cacheIndex].crossFadeTo(E2.reset().play(), 0.2)
        } else if (e.action._clip.name === "kayn_spell4_air.anm") {
          mixer._actions[e.action._cacheIndex].crossFadeTo(R2.reset().play(), 0.2)
          model.position.y= -125;
        }
        else {
          mixer._actions[e.action._cacheIndex].crossFadeTo(idleLoop.reset().play(), 0.4)
          setButtons(true)
        }
      })

    }, undefined, function (err) {
      console.log(err)
    });

    //excecute function
    const animate = () => {
      if (mixer != null) {
        mixer.update(clock.getDelta());
      }
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    //excecute
    animate();
    return () => {
      currentRef.removeChild(renderer.domElement);
    }
  }, []);

  function AbilityAnim(index) {
    if (mixer !== undefined && clips !== undefined && buttons) {
      setButtons(false)
      //#region clips
      const idleAnim = mixer.clipAction(T.AnimationClip.findByName(clips, "kayn_idle2.anm"));
      const Q = mixer.clipAction(T.AnimationClip.findByName(clips, "kayn_spell1_dash.anm"));
      Q.clampWhenFinished = true;
      Q.setLoop(T.LoopOnce)
      const W = mixer.clipAction(T.AnimationClip.findByName(clips, "kayn_spell2.anm"));
      W.clampWhenFinished = true;
      W.setLoop(T.LoopOnce)
      const E = mixer.clipAction(T.AnimationClip.findByName(clips, "kayn_spell3_run_in.anm"));
      E.clampWhenFinished = true;
      E.setLoop(T.LoopOnce)
      const R = mixer.clipAction(T.AnimationClip.findByName(clips, "kayn_spell4_air.anm"));
      R.clampWhenFinished = true;
      R.timeScale = 0.2
      R.setLoop(T.LoopOnce)
      //#endregion
      //console.log(mixer._actions)
      switch (index) {
        case 1:
          idleAnim.setLoop(T.LoopOnce)
          mixer._actions[0].fadeOut(0.1);
          mixer._actions[0].crossFadeTo(idleAnim.reset().play(), 0.2);
          break;
        case 2:
          mixer._actions[0].fadeOut(0.1);
          mixer._actions[0].crossFadeTo(Q.reset().play(), 0.2);
          break;
        case 3:
          mixer._actions[0].fadeOut(0.1);
          mixer._actions[0].crossFadeTo(W.reset().play(), 0.2);
          break;
        case 4:
          mixer._actions[0].fadeOut(0.1);
          mixer._actions[0].crossFadeTo(E.reset().play(), 0.2);
          break;
        case 5:
          model.position.y= -400;
          mixer._actions[0].fadeOut(0.1);
          mixer._actions[0].crossFadeTo(R.reset().play(), 0.2);
          break;
        default:
          break;
      }
    }
  }

  return (
    <motion.div className='bg-black min-w-screen min-h-screen' initial={{opacity:0}} animate={{opacity:1}}>
      {/* Animation ground */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ' ref={mountRef} style={{ width: "100%", height: "80vh" }}></div>
      {/* Title */}
      <div className='text-white bg-black text-center absolute top-1 left-1/2 transform -translate-x-1/2 border'>
        <div>Kayn</div>
        <div>Base Form</div>
      </div>
      {/* Abilities */}
      <div className='text-white w-screen text-center absolute bottom-12 left-1/2 transform -translate-x-1/2 text-lg '>
        <span>Abilities</span>
        <div className='flex justify-center'>
          <Ability onC={() => AbilityAnim(1)} name="Passive" img={Passiveimg} />
          <Ability onC={() => AbilityAnim(2)} name="Q" img={Qimg} />
          <Ability onC={() => AbilityAnim(3)} name="W" img={Wimg} />
          <Ability onC={() => AbilityAnim(4)} name="E" img={Eimg} />
          <Ability onC={() => AbilityAnim(5)} name="R" img={Rimg} />
        </div>
      </div>
      {/* Transformations */}
      {/* Assassin */}
      <NavLink to="/Assassin" className='absolute text-white z-50 left-0 top-0 bottom-0 w-1/12 hover:w-2/12 bg-black hover:bg-blue-600 border border-blue-950 border-l-0 rounded-r-full transition-all duration-500'>
        <span className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>Conquer the Darkin</span>
      </NavLink>
      {/* Darkin */}
      <NavLink to="/Rhaast" className='absolute text-white z-50 right-0 top-0 bottom-0 w-1/12 hover:w-2/12 w bg-black hover:bg-red-600 border border-red-950 border-r-0 rounded-l-full transition-all duration-500'>
        <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>Give in</span>
      </NavLink>
    </motion.div>
  )
};

export default KaynBase;