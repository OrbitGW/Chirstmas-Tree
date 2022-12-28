import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import BG from './model/bg.jpg';

const CTScene={
      Scene:null,
      Renderer:null,
      Camera:null,
      Model:null,
      Lights:null,
      AnimationMixer:null,
      Controls:null,
      init:{
        Scene:function(){
          this.Scene =  new THREE.Scene();
          this.Scene.background = new THREE.TextureLoader().load(BG);
        },
        Renderer:function(){
          this.Renderer = new THREE.WebGLRenderer();
          this.Renderer.setSize(window.innerWidth, window.innerHeight);
          this.Renderer.setClearColor(0xffffff);
          this.Renderer.shadowMap.enabled = true;
          this.Renderer.physicallyCorrectLights = true;
          this.Renderer.outputEncoding = THREE.sRGBEncoding;
          ThreeApp.appendChild(this.Renderer.domElement); 
        },
        Camera:function(){
             this.Camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1, 10000);
             this.Camera.position.set(0, 0, 20);
             this.Camera.lookAt(this.Scene.position);
           }
      },
      modelLoader:function(MODEL){
        this.Controls.autoRotate = true;

        let Loader = new GLTFLoader();
        Loader.load(MODEL.path, (geometry)=> {
          this.Camera.position.set(0,0,20);
          this.Model = geometry.scene;

          var box3 = new THREE.Box3();
          box3.expandByObject(this.Model);

          var center = new THREE.Vector3();
          box3.getCenter(center);

          this.Model.position.x = this.Model.position.x - center.x;
          this.Model.position.y = this.Model.position.y - center.y;
          this.Model.position.z = this.Model.position.z - center.z;

          this.Scene.add(this.Model);
        });
      },
      addLight:function(){
        var ambient_light = new THREE.AmbientLight(0xFFFFFF,1);
        this.Scene.add(ambient_light);

        var l1,l2,l3,l4;
        l1 = new THREE.DirectionalLight(0xFFFFFF,3);
        l2 = new THREE.DirectionalLight(0x1B1B1B,3);
        l3 = new THREE.DirectionalLight(0xFFFFFF,1.5);
        l4 = new THREE.DirectionalLight(0xFFFFFF,1.5);

        l1.position.set(0, 15, 0);
        l2.position.set(0, -200, 0);
        l3.position.set(0, -5, 20);
        l4.position.set(0, -5, -20);

        this.Scene.add(l1);
        this.Scene.add(l2);
        this.Scene.add(l3);
        this.Scene.add(l4);
      }, 
      addControls:function() {
        this.Controls = new OrbitControls(this.Camera, this.Renderer.domElement);
      },
      animation:function(){
        this.Renderer.render(this.Scene, this.Camera);
        this.Controls.update();
        requestAnimationFrame(()=>this.animation());
      },
      onWindowResize:function() {
        this.Camera.aspect = window.innerWidth / window.innerHeight;
        this.Camera.updateProjectionMatrix();
        this.Renderer.setSize(window.innerWidth, window.innerHeight);
        this.Renderer.render(this.Scene, this.Camera);
      },
      run:function(){
        this.init.Renderer.call(this) 
        this.init.Scene.call(this)
        this.init.Camera.call(this)

        this.addControls();

        this.addLight() 
        this.modelLoader({path:require('./model/christmas-tree.glb').default});

        this.animation(); 

        window.onresize = ()=>this.onWindowResize(); 
      }
}

CTScene.run();







