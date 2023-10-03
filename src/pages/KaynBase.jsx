import { useRef, useEffect, useState } from 'react';
import * as T from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import MODEL from '../media/models/KaynNoMetallic.glb';
import Ability from '../components/Ability'

import Passiveimg from '../media/images/abilities/base/Passive.png'
import Qimg from '../media/images/abilities/base/Q.png'
import Wimg from '../media/images/abilities/base/W.png'
import Eimg from '../media/images/abilities/base/E.png'
import Rimg from '../media/images/abilities/base/R1.png'


import RLaugh from '../media/audio/base/Kayn_R_Laugh.mp3'
import RIn from '../media/audio/base/Kayn_R_in.mp3'
import Ewalk from '../media/audio/base/Kayn_E_Quote.mp3'
import WGrnt from '../media/audio/base/Kayn_W_Grunt.mp3'
import QGrnt from '../media/audio/base/Kayn_Q_Grunt.mp3'

import BlueClick from '../media/audio/blue/KaynBlueEnter.mp3'
import RedClick from '../media/audio/red/RhaastEnter.mp3'

import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'

const KaynBase = () => {
  const mountRef = useRef(null)
  const [mixer, setMixer] = useState(undefined);
  const [clips, setClips] = useState(undefined);
  const [idle, setIdle] = useState(undefined);
  const [buttons, setButtons] = useState(true);
  const [model, setModel] = useState(undefined);
  const [loaded, setLoaded] = useState(false);

  const RQuote = new Audio(RLaugh);
  const RInside = new Audio(RIn);
  const Ewall = new Audio(Ewalk)
  const WGrunt = new Audio(WGrnt)
  const QGrunt = new Audio(QGrnt)

  const BlueHoverAudio = new Audio(BlueClick)
  const RedHoverAudio = new Audio(RedClick)

  useEffect(() => {
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;
    let mixer;

    //escena y camara
    const scene = new T.Scene();
    scene.background = new T.Color("black")
    //Add light
    const light = new T.AmbientLight("white");
    scene.add(light);
    const camera = new T.PerspectiveCamera(50, width / height, 0.01, 100000);
    camera.position.z = 550;
    camera.position.y = 50;
    scene.add(camera);

    //floor
    const geometry = new T.PlaneGeometry(1500, 900, 8, 8);
    const material = new T.MeshBasicMaterial({ color: "#6b0606", side: T.DoubleSide });
    const floorRed = new T.Mesh(geometry, material);
    scene.add(floorRed)
    floorRed.position.set(750, -125, 0)
    floorRed.rotateX(- Math.PI / 2);

    const geometry2 = new T.PlaneGeometry(1500, 900, 8, 8);
    const material2 = new T.MeshBasicMaterial({ color: "#051e66", side: T.DoubleSide });
    const floorBlue = new T.Mesh(geometry2, material2);
    scene.add(floorBlue)
    floorBlue.position.set(-750, -125, 0)
    floorBlue.rotateX(- Math.PI / 2);

    //wall background
    /* const geometry3 = new T.PlaneGeometry(1800,600,8,8);
    const texture = new T.TextureLoader().load(bgTest)
    const material3 = new T.MeshBasicMaterial({map:texture})
    const wall = new T.Mesh(geometry3,material3)
    scene.add(wall)
    wall.position.set(0,50,-200) */

    //reloj
    const clock = new T.Clock();

    //renderizador
    const renderer = new T.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    //controles de camara
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minPolarAngle = 1;
    controls.maxPolarAngle = 1.6;
    //Loading Manager
    T.DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
      console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };

    T.DefaultLoadingManager.onLoad = function () {
      setLoaded(true);
    };

    T.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
      console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };

    T.DefaultLoadingManager.onError = function (url) {
      console.log('There was an error loading ' + url);
    };
    //#endregion      

    //Modelo Loader con Animaciones
    const loader = new GLTFLoader();
    loader.load(MODEL, function (gltf) {
      const model = gltf.scene;
      setModel(model)
      scene.add(model);
      model.position.set(0, -125, 0)
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
          model.position.y = -125;
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
          QGrunt.play()
          break;
        case 3:
          mixer._actions[0].fadeOut(0.1);
          mixer._actions[0].crossFadeTo(W.reset().play(), 0.2);
          WGrunt.play();
          break;
        case 4:
          mixer._actions[0].fadeOut(0.1);
          mixer._actions[0].crossFadeTo(E.reset().play(), 0.2);
          Ewall.play();
          break;
        case 5:
          model.position.y = -400;
          mixer._actions[0].fadeOut(0.1);
          mixer._actions[0].crossFadeTo(R.reset().play(), 0.2);
          RInside.play().finally(() => { RQuote.play(); })
          break;
        default:
          break;
      }
    }
  }

  function clickQuote(audio) {
    audio.play()
  }
  return (
    <motion.div className='bg-black min-w-screen min-h-screen relative' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Loading Screen */}
      <div className={loaded === false
        ? "absolute bottom-0 top-0 left-0 right-0 bg-gray-950 opacity-100 z-50 transition-all ease-in-out duration-1000"
        : "absolute bottom-0 top-0 left-0 right-0 bg-gray-950 opacity-0 z-0 transition-all ease-in-out duration-1000"}>
        <div className='absolute w-screen bg-opacity-25 text-center text-white top-1/3 left-1/2 whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2 text-xl '>
          <span className='text-blue-700 font-semibold text-3xl'>Kayn</span> and <span className='text-red-700 font-semibold text-3xl'>Rhaast</span>
          <br /><span>Fight for control</span>
          <div className='animate-pulse text-2xl pt-16'>Loading</div>
        </div>
      </div>
      {/* Animation ground */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ' ref={mountRef} style={{ width: "100%", height: "80vh" }}></div>
      {/* Title */}
      <div className='text-white grid bg-black text-center whitespace-nowrap'>
        <div className='col-span-2 pt-1 text-2xl'>
          <span className='text-blue-700 font-bold'>Kayn </span>
          and
          <span className='text-red-700 font-bold'> Rhaast</span>
        </div>
        {/* Navigation */}
        {/* Assassin */}
        <NavLink onClick={() => clickQuote(BlueHoverAudio)} to="/Assassin" className='text-center row-start-2 p-5 border-b-2 border-blue-700 text-white z-40 bg-black hover:bg-blue-900'>
          <span className='text-blue-500 font-bold'>Realize potential</span>
        </NavLink>
        {/* Darkin */}
        <NavLink onClick={() => clickQuote(RedHoverAudio)} to="/Rhaast" className='text-center row-start-2 p-5 border-b-2 border-red-700 text-white z-40 bg-black hover:bg-red-900'>
          <span className='text-red-700 font-bold'>Give in</span>
        </NavLink>
      </div>
      {/* Abilities */}
      <div className='text-white w-screen text-center absolute bottom-12 left-1/2 transform -translate-x-1/2 text-lg'>
        <span>Abilities</span>
        <div className='flex justify-center'>
          <Ability onC={() => AbilityAnim(1)} name="Passive" img={Passiveimg} desc={"Innate: Kayn has a secondary experience bar that tracks progress toward his Darkin and Shadow Assassin forms. He gathers orbs from champion damage rating takedowns and each instance of damage (excluding damage over time) dealt against champions. Once he has earned enough orbs, he unlocks a form based on whether he earned more from Melee or Ranged champions (for Darkin and Shadow Assassin, respectively), with the other form unlocked later."} />
          <Ability onC={() => AbilityAnim(2)} name="Q" img={Qimg} desc={"Active: Kayn dashes in the target direction, dealing physical damage to enemies he passes through. He then swings his scythe, dealing the same damage to nearby enemies."} />
          <Ability onC={() => AbilityAnim(3)} name="W" img={Wimg} desc={"Active: Kayn swings his scythe in the target direction, dealing physical damage to enemies hit and slowing them by 90% decaying over 1.5 seconds."} />
          <Ability onC={() => AbilityAnim(4)} name="E" img={Eimg} desc={"Active: Kayn gains movement speed 40% bonus total movement speed, ghosting and the ability to ignore terrain collision for a duration."} />
          <Ability onC={() => AbilityAnim(5)} name="R" img={Rimg} desc={"Active: Kayn vanishes and dashes to a marked enemy champion. Upon arrival, he channels for up to 2.5 seconds, attaching to the target and revealing them. Umbral Trespass can be recast after 0.75 seconds during the channel, and does so automatically after the duration or if it is interrupted."} />
        </div>
      </div>
    </motion.div>
  )
};

export default KaynBase;