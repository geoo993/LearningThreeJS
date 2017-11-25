
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

    controls = new THREE.OrbitControls( camera, renderer.domElement);

    // LIGHTS
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.5);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight( 0xffffff, 1.5 );
    pointLight.position.set(0, 0, 20);
    scene.add( pointLight );
    var lightGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    var lightMesh = new THREE.Mesh(lightGeometry, new THREE.MeshBasicMaterial());
    scene.add(lightMesh);




    // MATERIALS
    //var material = new THREE.MeshBasicMaterial({
    //var material = new THREE.MeshNormalMaterial({ // this maps the normal vectors to rgb color
    //var material = new THREE.MeshLambertMaterial({ // will respond to lights within the scene, represents non shiny or dull surfaces
    //var material = new THREE.MeshPhongMaterial({ // represent shiny material as oppose to lambert material
    var material = new THREE.MeshStandardMaterial({ // combines phong and lambert material
    //var material = new THREE.MeshDepthMaterial({ // converts objects into greyscale
    //var material = new THREE.LineBasicMaterial({
    //var material = new THREE.PointsMaterial({

        //emissive: new THREE.Color(0xf3ff00), // this adds a glow like effect, only works with lambert material
        //emissiveIntensity: 0.2,

        //map: new THREE.TextureLoader().load('img/textures/wood.png'),
        //normalMap: new THREE.TextureLoader().load('img/textures/shapes_normal_map.png'),

        specular: new THREE.Color(0xff0000), // only works with phong material
        shininess: 20,
        roughness: 0.5,
        metalness: 0.7,

        color: new THREE.Color(0xf3ffe3),
        transparent: true, // this enable the opacity to have an effect on the material
        opacity: 1,
        wireframe: false,
        wireframeLinewidth: 2, // set to a number larger than 1
        wireframeLinejoin: 'round',
        wireframeLinecap: 'round',


        side: THREE.DoubleSide
    });

    // GEOMETRIES

    // CUBE GEOMETRY (width, height, depth)
    var cubeGeometry = new THREE.BoxGeometry( 100, 100, 100 );

    // SPHERE GEOMETRY (radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
    var sphereGeometry = new THREE.SphereGeometry( 50, 20, 20);

    // PLANE GEOMETRY (width, height, widthSegments, heightSegments)
    var planeGeometry = new THREE.PlaneGeometry( 10000, 10000, 100, 100);

    // MESHES
    //var cubeMesh = new THREE.Line(cubeGeometry, material);
    //var cubeMesh = new THREE.Points(cubeGeometry, material);
    var cubeMesh = new THREE.Mesh(cubeGeometry, material);
    cubeMesh.position.set(-100, 0, -500);
    scene.add(cubeMesh);

    //var sphereMesh = new THREE.Line(sphereGeometry, material);
    //var sphereMesh = new THREE.Points(sphereGeometry, material);
    var sphereMesh = new THREE.Mesh(sphereGeometry, material);
    sphereMesh.position.set(100, 0, -500);
    scene.add(sphereMesh);

    //var planeMesh = new THREE.Line(planeGeometry, material);
    //var planeMesh = new THREE.Points(planeGeometry, material);
    var planeMesh = new THREE.Mesh(planeGeometry, material);
    planeMesh.position.set(0, -100, 0);
    planeMesh.rotation.set(-90 * Math.PI / 180, 0, 0);
    scene.add(planeMesh);

    // happens at the beginning
    var start = function(){
        camera.position.z = 10.0;

        lightMesh.position.set(pointLight.position.x, pointLight.position.y, pointLight.position.z);

    }

    // game logic
    var update = function () {

        //cubeMesh.rotation.x += 0.01;
        cubeMesh.rotation.y += 0.005;

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