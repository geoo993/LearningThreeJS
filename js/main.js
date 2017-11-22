$(function() {

  var container = document.querySelector('#webGL-container');
  var width = window.innerWidth;
  var height = window.innerHeight;

  var scene = new THREE.Scene(); // scene variable

  // camera object, which is perspective camera, field of view, width, height, znear, zfar
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);

  // the renderer is how everything is going to render on to the screen, this is a webGL renderer
  var renderer = new THREE.WebGLRenderer();

  // adding axis so we can look at the object axis
  var axis = new THREE.AxesHelper(10);
  scene.add(axis);

  // this is the object, creating a cube object, with gray color
  var cubeGeometry = new THREE.BoxGeometry(2, 2, 2);

  // material defines the object look, like color, texture etc..
  var cubeMaterial = new THREE.MeshBasicMaterial({
   color: 0xdddddd,
   wireframe: true
  });
  var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

  cubeMesh.position.x = 0;
  cubeMesh.position.y = 0;
  cubeMesh.position.z = 0;

  scene.add(cubeMesh);
  camera.position.x = 40;
  camera.position.y = 40;
  camera.position.z = 40;

  camera.lookAt(scene.position);

    // game logic
    var update = function () {

        cubeMesh.rotation.x = axis.rotation.x -= 0.01;
        cubeMesh.rotation.y = axis.rotation.y -= 0.002;
        cubeMesh.rotation.z = axis.rotation.z -= 0.01;
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

    gameLoop();


    renderer.setClearColor(0x000000); // black color, this takes a hex value
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    window.addEventListener( 'resize' , function () {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    })

});

<script src="js/src/loaders/ObjectLoader.js"></script>