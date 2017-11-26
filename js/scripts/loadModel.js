// https://www.youtube.com/watch?v=mqjwgTAGQRY&index=8&list=PL08jItIqOb2qyMOhtEUoLh100KpccQiRf
// https://github.com/mrdoob/three.js/tree/master/utils/exporters/blender
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
    var renderer = new THREE.WebGLRenderer();
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);


    // MATERIALS
    var lambertmaterial = new THREE.MeshLambertMaterial();
    var phongmaterial = new THREE.MeshPhongMaterial();

    // GEOMETRY

    // BOX BUFFER GEOMETRY (width, height, depth, widthSegments, heightSegments, depthSegments)
    var cubeGeometry = new THREE.BoxBufferGeometry( 100, 100, 100, 20, 20, 20 );

    // SPHERE GEOMETRY (radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
    var sphereGeometry = new THREE.SphereGeometry(50, 20, 20);

    // PLANE GEOMETRY (width, height, widthSegments, heightSegments)
    var planeGeometry = new THREE.PlaneGeometry( 10000, 10000, 100, 100);


    // MESHES
    var cubeMesh = new THREE.Mesh(cubeGeometry, lambertmaterial);
    cubeMesh.position.set(-200, 10, -300);
    scene.add(cubeMesh);

    var sphereMesh = new THREE.Mesh(sphereGeometry, phongmaterial);
    sphereMesh.position.set(0, 10, -300);
    scene.add(sphereMesh);

    var planeMesh = new THREE.Mesh(planeGeometry, new THREE.MeshStandardMaterial());
    planeMesh.position.set(0, -100, 0);
    planeMesh.rotation.set(-90 * Math.PI / 180, 0, 0);
    scene.add(planeMesh);


    // MODEL
    var loader = new THREE.JSONLoader();
    loader.load('models/monkey.json', handle_load); // handle load is a callback

    var mesh;
    var mixer;

    function handle_load(geometry, materials){
        var mormalmaterial = new THREE.MeshLambertMaterial({ morphTargets: true });

        // MESH
        mesh = new THREE.Mesh(geometry, mormalmaterial);
        mesh.position.set(0, 0, -100);
        mesh.scale.set(20, 20, 20);
        scene.add(mesh);

        // MIXER
        mixer = new THREE.AnimationMixer(mesh);

        var clip = THREE.AnimationClip.CreateFromMorphTargetSequence('talk', geometry.morphTargets, 30);// resusable set of keyframe tracks.
        mixer.clipAction(clip).setDuration(1.0).play();
    }


    // LIGHTS and SHADOWS

    // AMBIENTLIGHT ( color, intensity ) does not have a position in the scene
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.5);
    scene.add(ambientLight);

    // POINTLIGHT ( color, intensity, distance, decay )
    var pointLightColor = new THREE.Color(0xffff00);
    var pointLight = new THREE.PointLight( pointLightColor, 0.5, 500 );
    pointLight.position.set(0, 100, 20);
    scene.add( pointLight );
    var pointLightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(pointLightHelper);


    // happens at the beginning
    var start = function(){

        camera.position.z = 50.0;

        controls = new THREE.OrbitControls( camera, renderer.domElement);
    }

    var prevTime = Date.now();
    // game logic
    var update = function () {

        if (mixer){
            var time = Date.now();
            var elapsedTime = time - prevTime;
            mixer.update(elapsedTime * 0.001);
            prevTime = time;
        }
    };

    // draw scene
    var render = function () {
        // specify scene and camera that the user will see through
        renderer.render( scene, camera );

    };

    // run game loop ( update, render, repeat )
    var gameLoop = function () {
        update();
        render();

        requestAnimationFrame( gameLoop );
    }

    start();
    gameLoop();


    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);

    window.addEventListener( 'resize' , function () {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    })


});