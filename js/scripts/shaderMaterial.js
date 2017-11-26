
// https://www.youtube.com/watch?v=uD4GnMsAH1U&index=5&list=PL08jItIqOb2qyMOhtEUoLh100KpccQiRf
// http://blog.cjgammon.com/threejs-custom-shader-material
$(function() {

    (function(){
        var script = document.createElement('script');
        script.onload=function(){
            var stats=new Stats();
            document.body.appendChild(stats.dom);
            requestAnimationFrame(function loop(){
                stats.update();
                requestAnimationFrame(loop)});
        };
        script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
        document.head.appendChild(script);
    })()


    var width = window.innerWidth;
    var height = window.innerHeight;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000);
    var renderer = new THREE.WebGLRenderer();


    // LIGHTS
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.5);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight( 0xffffff, 0.5 );
    pointLight.position.set(0, 100, 20);
    scene.add( pointLight );
    var lightGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    var lightMesh = new THREE.Mesh(lightGeometry, new THREE.MeshBasicMaterial());
    lightMesh.position.set(pointLight.position.x, pointLight.position.y, pointLight.position.z);
    scene.add(lightMesh);



    // MATERIALS
    var material = new THREE.MeshBasicMaterial();

    // GEOMETRY

    // BOX BUFFER GEOMETRY (width, height, depth, widthSegments, heightSegments, depthSegments)
    var cubeGeometry = new THREE.BoxBufferGeometry( 50, 50, 50, 10, 10, 10 );

    var vertexDisplacement = new Float32Array(cubeGeometry.attributes.position.count);
    for (var i = 0; i < vertexDisplacement.length; i += 1){
        vertexDisplacement[i] = Math.sin(i);
    }

    // WARNING: doing attributes only apply on buffer geometries
    cubeGeometry.addAttribute('vertexDisplacement', new THREE.BufferAttribute(vertexDisplacement, 1)); // 1 is the byte size per vertex, meaning float has a byte size of one


    // PLANE GEOMETRY (width, height, widthSegments, heightSegments)
    var planeGeometry = new THREE.PlaneGeometry( 10000, 10000, 100, 100);


    // MESHES
    var cubeMesh = new THREE.Mesh(cubeGeometry, material);
    cubeMesh.position.set(0, 10, 100);
    scene.add(cubeMesh);


    var planeMesh = new THREE.Mesh(planeGeometry, new THREE.MeshLambertMaterial());
    planeMesh.position.set(0, -100, 0);
    planeMesh.rotation.set(-90 * Math.PI / 180, 0, 0);
    scene.add(planeMesh);



    var updateCubeMaterial = function(delta) {
        // Shader loader
        // https://github.com/codecruzer/webgl-shader-loader-js
        // https://github.com/THeK3nger/threejs-async-shaders-example/blob/master/js/mytest.js
        SHADER_LOADER.load(
            function (data) {
                var vertexShader = data.main.vertex;
                var fragmentShader = data.main.fragment;

                // for uniform data type https://github.com/mrdoob/three.js/wiki/Uniforms-types
                var uniforms = {
                    sampler0: {type: 't', value: THREE.ImageUtils.loadTexture('img/textures/wood.png')},
                    delta: {type: 'f', value: 0.5}
                };

                material = new THREE.ShaderMaterial({
                    uniforms: uniforms,
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader
                });

                cubeMesh.material = material;
                cubeMesh.material.uniforms.delta.value = 0.5 * Math.sin(delta) * 0.5;

                for (var i = 0; i < vertexDisplacement.length; i += 1){
                    vertexDisplacement[i] = 0.5 * Math.sin(i * delta) * 0.25;
                }
                cubeMesh.geometry.attributes.vertexDisplacement.needsUpdate = true;

            }
        );
    }



    // happens at the beginning
    var start = function(){
        camera.position.z = -50.0;

        controls = new THREE.OrbitControls( camera, renderer.domElement);
    }


    var delta = 0;
    // game logic
    var update = function () {
        delta += 0.01;

        updateCubeMaterial(delta);

    };

    // draw scene
    var render = function () {
        // specify scene and camera that the user will see through
        renderer.render( scene, camera );
    };

    // run game loop ( update, render, repeat )
    var gameLoop = function () {
        requestAnimationFrame( gameLoop );

        update();
        render();
    }

    start();
    gameLoop();


    renderer.setSize(width, height);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);

    window.addEventListener( 'resize' , function () {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    })


});