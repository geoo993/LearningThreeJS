
$(function() {

    var container = document.querySelector('#webGL-container');

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
    var effect = new THREE.AnaglyphEffect( renderer );

    camera.position.z = 20;

    controls = new THREE.OrbitControls( camera, renderer.domElement);


    var ambientLight = new THREE.AmbientLight( 0x330000, 0.5);
    scene.add(ambientLight);

    var lightColor = new THREE.Color(0xffffff);
    var directionalLight = new THREE.DirectionalLight( lightColor, 1.0 );
    scene.add( directionalLight );
    var directionalLightGeometry = new THREE.CubeGeometry( 1, 1, 1 );
    var directionalLightMaterial = new THREE.MeshBasicMaterial( { color: lightColor, side: THREE.DoubleSide } );
    var directionalLightCube = new THREE.Mesh( directionalLightGeometry, directionalLightMaterial );
    scene.add( directionalLightCube );

    directionalLight.position.set(50, 50, 50);
    directionalLightCube.position.set(50, 50, 50);


    var spotLight = new THREE.SpotLight( lightColor, 2.0 );
    scene.add( spotLight );
    var spotLightGeometry = new THREE.CubeGeometry( 1, 1, 1 );
    var spotLightMaterial = new THREE.MeshBasicMaterial( { color: lightColor, side: THREE.DoubleSide } );
    var spotLightCube = new THREE.Mesh( spotLightGeometry, spotLightMaterial );
    scene.add( spotLightCube );
    spotLight.position.set(-20, 0, 0);
    spotLightCube.position.set(-20, 0, 0);


    var earthDayMap = new THREE.TextureLoader().load( 'img/textures/earth/earth_daymap.jpg' );
    var earthNormalMap = new THREE.TextureLoader().load( 'img/textures/earth/earth_normalmap.jpeg' );
    var earthSpecularMap = new THREE.TextureLoader().load( 'img/textures/earth/earth_specularmap.jpg' );

    var sphereMaterial = new THREE.MeshPhongMaterial({
        map: earthDayMap,
        normalMap: earthNormalMap,
        specularMap: earthSpecularMap,
        specular: new THREE.Color(0x333333),
        color: new THREE.Color(0xaaaaaa),
        shininess: 15,
        transparent: true,
        opacity: 1.0,
        wireframe: false,
        side: THREE.DoubleSide
    });

    // create object, creating a sphere object, width, height, depth
    var sphereGeometry = new THREE.SphereGeometry( 5, 32, 32 );
    var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereMesh);


    // game logic
    var update = function () {

        sphereMesh.rotation.y += 0.002;

    };

    // draw scene
    var render = function () {
        // specify scene and camera that the user will see through
        renderer.render( scene, camera );
        //effect.render( scene, camera );
    };

    // run game loop ( update, render, repeat )
    var gameLoop = function () {
        requestAnimationFrame( gameLoop );

        update();
        render();
    }

    gameLoop();


    renderer.setSize(width, height);
    effect.setSize(width, height);
    //document.body.appendChild(renderer.domElement);
    container.appendChild(renderer.domElement);

    window.addEventListener( 'resize' , function () {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
        effect.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    })




});