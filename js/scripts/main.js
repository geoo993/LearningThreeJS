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

    // Load json model
    var jsonLoader = new THREE.ObjectLoader();
    jsonLoader.load(
        'models/skull.json',
        function ( object ) {

            object.position.y = -3.0;
            object.scale.set( 0.1, 0.1, 0.1);
            object.rotation.y = 180 * (3.14281 / 180); // radian to degree
            scene.add( object );
        }
    );



    // load obj model
    // https://threejs.org/docs/#examples/loaders/OBJLoader
    // https://threejs.org/examples/webgl_loader_obj.html
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    var textureLoader = new THREE.TextureLoader( manager );
    var texture = textureLoader.load( 'img/textures/spiral.jpg' );

    // instantiate a loader
    var objLoader = new THREE.OBJLoader( manager );

    // load a resource
    objLoader.load(
        // resource URL
        'models/teapot.obj',
        // called when resource is loaded
        function ( object ) {

            object.material = new THREE.MeshPhongMaterial({ map: texture , side: THREE.FrontSide });

            object.position.z = 5.0;
            object.position.x = 10.0;
            object.scale.set( 0.8, 0.8, 0.8);
            scene.add( object );

        },
        // called when loading is in progresses, onProgress
        function ( xhr ) {

            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }

        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' + error );
        }
    );

    // load a resource
    objLoader.load(
        // resource URL
        'models/bunny.obj',
        // called when resource is loaded
        function ( object ) {

            object.material = new THREE.MeshLambertMaterial({ map: texture , side: THREE.FrontSide });

            object.position.z = 5.0;
            object.position.x = -10.0;
            object.scale.set( 0.5, 0.5, 0.5);
            scene.add( object );

        },
        // called when loading is in progresses, onProgress
        function ( xhr ) {

            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }

        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' + error );
        }
    );




    // adding axis so we can look at the object axis
    var axis = new THREE.AxesHelper(5.0);
    scene.add(axis);

    // Render Objects
    // material defines the object look, like color, texture etc...
    /*
    var cubeMaterials = [
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'img/textures/wood.png' ), side: THREE.FrontSide }),     // Right
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'img/textures/wood.png' ), side: THREE.DoubleSide }),     // Left
        new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.BackSide }),                                           // Top
        new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }),                                           // Down
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'img/textures/spiral.jpg' ), side: THREE.FrontSide }),   // Forward
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'img/textures/spiral.jpg' ), side: THREE.BackSide })    // Backward
    ];
    var cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials );

    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: false
    });
    */


    var cubeMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load( 'img/textures/wood.png' ), side: THREE.DoubleSide });

    // create object, creating a cube object, with gray color
    var cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cubeMesh);

    // Floor
    var floorGeometry = new THREE.CubeGeometry( 11, 1, 10 );
    var floorMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader( ).load( 'img/textures/Ground.jpg' ), side: THREE.DoubleSide } );
    var floorCube = new THREE.Mesh( floorGeometry, floorMaterial );
    floorCube.position.y = -5.5;
    scene.add( floorCube );

    // Ceiling
    var ceilingGeometry = new THREE.CubeGeometry( 11, 1, 10 );
    var ceilingMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader( ).load( 'img/textures/Ceiling.jpg' ), side: THREE.DoubleSide } );
    var ceilingCube = new THREE.Mesh( ceilingGeometry, ceilingMaterial );
    ceilingCube.position.y = 5.5;
    scene.add( ceilingCube );

    // Left Wall
    var leftWallGeometry = new THREE.CubeGeometry( 1, 10, 10 );
    var leftWallMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader( ).load( 'img/textures/wood.png' ), side: THREE.DoubleSide } );
    var leftWallCube = new THREE.Mesh( leftWallGeometry, leftWallMaterial );
    leftWallCube.position.x = -5;
    scene.add( leftWallCube );

    // Right Wall
    var rightWallGeometry = new THREE.CubeGeometry( 1, 10, 10 );
    var rightWallMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader( ).load( 'img/textures/wood.png' ), side: THREE.DoubleSide } );
    var rightWallCube = new THREE.Mesh( rightWallGeometry, rightWallMaterial );
    rightWallCube.position.x = 5;
    scene.add( rightWallCube );

    // Back Wall
    var backWallGeometry = new THREE.CubeGeometry( 10, 10, 1 );
    var backWallMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader( ).load( 'img/textures/wood.png' ), side: THREE.DoubleSide } );
    var backWallCube = new THREE.Mesh( backWallGeometry, backWallMaterial );
    backWallCube.position.z = -4.5;
    scene.add( backWallCube );


    // Add Sky Box
    var skyboxes = [
        'mountain',
        'darksky',
        'colorbasement',
        'yokohamaday',
        'commonroom',
        'diningroom',
        'petrolstation',
        'porchfold'
    ];
    var skyboxInd = 0;

    // Skybox texture website http://www.custommapmakers.org/skyboxes.php
    var skyboxGeometry = new THREE.CubeGeometry( 1000, 1000, 1000 );

    // Create a MeshFaceMaterial, which allows the cube to have different materials on each face
    var skyboxCube = new THREE.Mesh( skyboxGeometry, new THREE.MeshBasicMaterial() );
    scene.add( skyboxCube );

    var updateSkyboxMaterial = function () {
        var skyboxIndex = skyboxInd % skyboxes.length;

        var skyboxMaterials =
            [
                new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'img/skybox/'+skyboxes[skyboxIndex]+'/_bk.jpg' ), side: THREE.DoubleSide } ), // Right side
                new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'img/skybox/'+skyboxes[skyboxIndex]+'/_ft.jpg' ), side: THREE.DoubleSide } ), // Left side
                new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'img/skybox/'+skyboxes[skyboxIndex]+'/_up.jpg' ), side: THREE.DoubleSide } ), // Top side
                new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'img/skybox/'+skyboxes[skyboxIndex]+'/_dn.jpg' ), side: THREE.DoubleSide } ), // Bottom side
                new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'img/skybox/'+skyboxes[skyboxIndex]+'/_rt.jpg' ), side: THREE.DoubleSide } ), // Front side
                new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'img/skybox/'+skyboxes[skyboxIndex]+'/_lf.jpg' ), side: THREE.DoubleSide } ) // Back side
            ];

        skyboxCube.material = new THREE.MeshFaceMaterial( skyboxMaterials );
    };
    updateSkyboxMaterial();

    // Add Lights
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.5);
    //scene.add(ambientLight);

    var pointLight1Color = 0xffff00;
    var pointLight1 = new THREE.PointLight( pointLight1Color , 3.0, 40.0 );
    scene.add(pointLight1);
    var pointLight1Geometry = new THREE.CubeGeometry( 1, 1, 1 );
    var pointLight1Material = new THREE.MeshBasicMaterial( { color: pointLight1Color, side: THREE.DoubleSide } );
    var pointLight1Cube = new THREE.Mesh( pointLight1Geometry, pointLight1Material );
    scene.add( pointLight1Cube );


    var pointLight2Color = 0x4000ff;
    var pointLight2 = new THREE.PointLight( pointLight2Color , 2.0, 30.0 );
    scene.add(pointLight2);
    var pointLight2Geometry = new THREE.CubeGeometry( 1, 1, 1 );
    var pointLight2Material = new THREE.MeshBasicMaterial( { color: pointLight2Color, side: THREE.DoubleSide } );
    var pointLight2Cube = new THREE.Mesh( pointLight2Geometry, pointLight2Material );
    scene.add( pointLight2Cube );


    var pointLight3Color = 0x60ff7b;
    var pointLight3 = new THREE.PointLight( pointLight3Color , 2.5, 40.0 );
    scene.add(pointLight3);
    var pointLight3Geometry = new THREE.CubeGeometry( 1, 1, 1 );
    var pointLight3Material = new THREE.MeshBasicMaterial( { color: pointLight3Color, side: THREE.DoubleSide } );
    var pointLight3Cube = new THREE.Mesh( pointLight3Geometry, pointLight3Material );
    scene.add( pointLight3Cube );


    var directionalLightColor = 0xffffff;
    var directionalLight = new THREE.DirectionalLight( directionalLightColor, 1.0 );
    scene.add( directionalLight );
    var directionalLightGeometry = new THREE.CubeGeometry( 1, 1, 1 );
    var directionalLightMaterial = new THREE.MeshBasicMaterial( { color: directionalLightColor, side: THREE.DoubleSide } );
    var directionalLightCube = new THREE.Mesh( directionalLightGeometry, directionalLightMaterial );
    scene.add( directionalLightCube );

    var spotLightColor = 0xff40fe;
    var spotLight = new THREE.SpotLight( spotLightColor, 2.0 );
    scene.add( spotLight );
    var spotLightGeometry = new THREE.CubeGeometry( 1, 1, 1 );
    var spotLightMaterial = new THREE.MeshBasicMaterial( { color: spotLightColor, side: THREE.DoubleSide } );
    var spotLightCube = new THREE.Mesh( spotLightGeometry, spotLightMaterial );
    scene.add( spotLightCube );


    // game logic
    var update = function () {

        cubeMesh.rotation.x = axis.rotation.x += 0.01;
        cubeMesh.rotation.y = axis.rotation.y += 0.002;
        cubeMesh.rotation.z = axis.rotation.z += 0.01;

        var time = Date.now() * 0.0005;

        pointLight1.position.x = pointLight1Cube.position.x = Math.sin( time * 0.7 ) * 30.0 ;
        pointLight1.position.y = pointLight1Cube.position.y = Math.cos( time * 0.5 ) * 26.0 ;
        pointLight1.position.z = pointLight1Cube.position.z = Math.cos( time * 0.2 ) * 20.0 ;

        pointLight2.position.x = pointLight2Cube.position.x = Math.cos( time * 0.3 ) * 30.0 ;
        pointLight2.position.y = pointLight2Cube.position.y = Math.sin( time * 0.4 ) * 40.0 ;
        pointLight2.position.z = pointLight2Cube.position.z = Math.sin( time * 0.6 ) * 25.0 ;

        pointLight3.position.x = pointLight3Cube.position.x = Math.cos( time * 0.2 ) * 30.0 ;
        pointLight3.position.y = pointLight3Cube.position.y = Math.sin( time * 0.6 ) * 20.0 ;
        pointLight3.position.z = pointLight3Cube.position.z = Math.cos( time * 0.3 ) * 35.0 ;

        directionalLight.position.y = directionalLightCube.position.y = 20.0;

        spotLight.position.x = spotLightCube.position.x = 20.0;


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

    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        console.log(keyCode);

        if (keyCode == 39) { // right
        } else if (keyCode == 37) { // left
        } else if (keyCode == 38) { // up
        } else if (keyCode == 40) { // down
        }else if (keyCode == 32) { // space
            skyboxInd += 1;
            updateSkyboxMaterial();
        }


    };


});