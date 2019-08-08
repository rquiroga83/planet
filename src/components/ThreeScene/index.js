import React, { Component } from 'react';
import * as THREE from 'three';


class ThreeScene extends Component{

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        
        //Scene
        this.scene = new THREE.Scene();
        
        //Camera
        this.camera = new THREE.PerspectiveCamera(
            50,
            width / height,
            0.1,
            1000
        );
        this.camera.position.z = 200;
        this.camera.position.y = 50;
        this.camera.lookAt(this.scene.position);

        //Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#000000');
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);

        // light
        var light = new THREE.PointLight( 0xffff00, 10, 100 );
        light.position.set( 0, 0, 0 );
        light.castShadow = true;
        this.scene.add( light );

        //Planet
        var planetGeometry = new THREE.SphereGeometry( 10, 64, 64 );
        var planetMaterial = new THREE.MeshPhongMaterial( {
            color: 0xd2d2d2,
            emissive: 0x002534,
            side: THREE.DoubleSide,
            shininess: 0
        } );
        this.planetMesh = new THREE.Mesh( planetGeometry, planetMaterial );
        this.scene.add( this.planetMesh );

        //Sun
        var sunGeometry = new THREE.SphereGeometry( 20, 64, 64 );
        var sunMaterial = new THREE.MeshPhongMaterial( {
            color: 0xffff00,
            emissive: 0xffff00,
            side: THREE.DoubleSide,
            shininess: 0
        } );
        this.sunMesh = new THREE.Mesh( sunGeometry, sunMaterial );
        this.scene.add( this.sunMesh );

        // Fire
        /*
        var loader = new THREE.TextureLoader();
        loader.crossOrigin = '';
        let fireTex = loader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/212131/Fire.png");

        var wireframeMat = new THREE.MeshBasicMaterial({
            color : new THREE.Color(0xffffff),
            wireframe : true
        });
    
        let fire = new THREE.Fire(fireTex);
    
        var wireframe = new THREE.Mesh(fire.geometry, wireframeMat.clone());
        fire.add(wireframe);
        wireframe.visible = true;
        wireframe.visible = false;
        
        console.log(fire);
        fire.position.set(0, 0, 0);
        fire.position.set(0, 0.25, 1.3);
        this.scene.add(fire);
        */

        this.start();
    }


    componentWillUnmount(){
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }


    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }


    stop = () => {
        cancelAnimationFrame(this.frameId)
    }


    d=0;

    animate = () => {
        const Cz = 0;
        const Cx = 0;

        const r = 100;

        const z = Cz + r * Math.cos( (this.d+90) * Math.PI / 180 );
        const x = Cx + r * Math.sin( (this.d+90) * Math.PI / 180 );
        this.d++;

        // this.planetMesh.rotation.x += 0.01
        // this.planetMesh.rotation.y += 0.01
        this.planetMesh.position.z = z;
        this.planetMesh.position.x = x;

        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }


    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }


    render() {
        return(
            <div
                style={{ width: '100vw', height: '100vh' }}
                ref={(mount) => { this.mount = mount }}
            />
        );
    }
}

export default ThreeScene