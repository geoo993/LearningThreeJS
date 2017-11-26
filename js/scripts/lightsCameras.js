
// https://www.youtube.com/watch?v=vB5lSSJRJR0&index=6&list=PL08jItIqOb2qyMOhtEUoLh100KpccQiRf
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

    // ORTHOGRAPHICCAMERA ( left, right, top, bottom, near, far )
    //var camera = new THREE.OrthographicCamera(-width / 4, width / 4, -width / 4, width / 4, 0.1, 5000);
    //var debugCamera = new THREE.OrthographicCamera(-width / 4, width / 4, -width / 4, width / 4, 0.1, 5000);

    // PERSPECTIVECAMERA ( fov, aspect, near, far )
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000);
    var debugCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000);
    var cameraHelper = new THREE.CameraHelper(debugCamera);
    scene.add(cameraHelper);


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
    cubeMesh.position.set(-200, 10, -500);
    scene.add(cubeMesh);

    var sphereMesh = new THREE.Mesh(sphereGeometry, phongmaterial);
    sphereMesh.position.set(0, 10, -500);
    scene.add(sphereMesh);

    var planeMesh = new THREE.Mesh(planeGeometry, new THREE.MeshStandardMaterial());
    planeMesh.position.set(0, -100, 0);
    planeMesh.rotation.set(-90 * Math.PI / 180, 0, 0);
    scene.add(planeMesh);


    // LIGHTS and SHADOWS

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;


    // AMBIENTLIGHT ( color, intensity ) does not have a position in the scene
    //var ambientLight = new THREE.AmbientLight( 0xffffff, 0.5);
    //scene.add(ambientLight);

    // HEMISPHERELIGHT ( skyColor, groundColor, intensity ) same as ambient light, but does not apply to the whole scene, and it takes two color values which are coming from the top or bottom
    //var hemisphereLight = new THREE.HemisphereLight( 0x4000ff, 0x40e5ff, 0.2);
    //scene.add(hemisphereLight);
    //var hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
    //scene.add(hemisphereLightHelper);

    // POINTLIGHT ( color, intensity, distance, decay )
    var pointLightColor = new THREE.Color(0xffff00);
    var pointLight = new THREE.PointLight( pointLightColor, 0.5, 500 );
    pointLight.position.set(0, -80, 20);
    scene.add( pointLight );
    var pointLightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(pointLightHelper);

    // DIRECTIONALLIGHT ( hex, intensity ) , think of this as sun light
    var directionalLightColor = new THREE.Color(0x00ffff);
    var directionalLight = new THREE.DirectionalLight( directionalLightColor, 2.0 );
    directionalLight.position.set(-200, 60, 0);
    //scene.add( directionalLight );
    var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
    //scene.add(directionalLightHelper);

    // SPOTLIGHT ( color, intensity, distance, angle, penumbra, decay ), think of this as sun light
    var spotLightColor = new THREE.Color(0x00ff00);
    var spotLight = new THREE.SpotLight( spotLightColor, 1.5, 5000 );
    spotLight.position.set(-100, 160, -200);
    scene.add( spotLight );
    var spotLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLightHelper);


    //directionalLight.target = cubeMesh; // it needs a direction to be aiming

    // ORTHOGRAPHICCAMERA ( left, right, top, bottom, near, far )
    var directionslShadowMappingProjection = new THREE.OrthographicCamera(-500, 500, -500, 500, 0.1, 5000);

    // PERSPECTIVECAMERA ( fov, aspect, near, far )
    var omnidirectionalShadowMappingProjection = new THREE.PerspectiveCamera(100, 1, 0.1, 5000);

    spotLight.target = cubeMesh;        // it needs a direction to be aiming
    spotLight.castShadow = true;
    spotLight.shadow = new THREE.LightShadow(omnidirectionalShadowMappingProjection);
    spotLight.shadow.bias = 0.0001;
    spotLight.shadow.mapSize.width = 2048 * 2;
    spotLight.shadow.mapSize.height = 2048 * 2;

    cubeMesh.castShadow = true;
    sphereMesh.castShadow = true;
    planeMesh.receiveShadow = true;

    /*
    var shadowMapViewer = new THREE.ShadowMapViewer(spotLight);
    shadowMapViewer.position.set(10, 10, 0);
    shadowMapViewer.size.width = 2048 / 4;
    shadowMapViewer.size.height = 2048 / 4;
    shadowMapViewer.update();
    */

    // happens at the beginning
    var start = function(){

        camera.position.z = 50.0;

        controls = new THREE.OrbitControls( camera, renderer.domElement);
    }


    // game logic
    var update = function () {

        //directionalLightHelper.update();
        spotLightHelper.update();
    };

    // draw scene
    var render = function () {
        // specify scene and camera that the user will see through
        renderer.render( scene, camera );
        //shadowMapViewer.render(renderer);
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
    renderer.setClearColor(0xdddddd);
    document.body.appendChild(renderer.domElement);

    window.addEventListener( 'resize' , function () {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    })


});