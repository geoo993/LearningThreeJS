// https://www.youtube.com/watch?v=BR15maVhZYY&list=PL08jItIqOb2qyMOhtEUoLh100KpccQiRf&index=7
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

    // POST PROCESSING

    // COMPOSER
    // we are going to add passes to our composer, and these are going to be the actual effect that are going to be applied to the entire scene
    var composer = new THREE.EffectComposer(renderer);


    // PASSES
    var renderPass = new THREE.RenderPass(scene, camera); // render scene as normal, this takes two parameters just like our renderer.render( scene, camera )
    composer.addPass(renderPass);

    /*
    // Part one
    var pass1 = new THREE.ShaderPass( THREE.SepiaShader);// first PFX pass
    composer.addPass(pass1);

    var pass2 = new THREE.GlitchPass( 0 );// first PFX pass
    composer.addPass(pass2);


    //custom shader pass
    var ppfxShader = {
        uniforms: {
            "tDiffuse": { value: null },
            "amount":   { value: 1.0 }
        },

        vertexShader: document.getElementById('PPFXVertexShader').textContent,

        fragmentShader: [
            "uniform float amount;",
            "uniform sampler2D tDiffuse;",
            "varying vec2 vUv;",
            "void main() {",
            "vec4 color = texture2D( tDiffuse, vUv );",
            "vec3 c = color.rgb;",
            "color.r = c.r * 2.0;",
            "color.g = c.g + amount;",
            "color.b = c.b;",
            "gl_FragColor = vec4( color.rgb , color.a );",
            "}"
        ].join( "\n" )
    }

    var pass3 = new THREE.ShaderPass( ppfxShader );// first PFX pass
    composer.addPass(pass3);


    var radialBlurShader = {
        uniforms: {
            "tDiffuse": { value: null},
            "amount": { type: "f", value: 1.0 },
            "resolution": { type: "f", value: 2.0 },
            "radius": { type: "f", value: 0.5 },
            "vColor" : { type: "v4", value: new THREE.Vector4( 0.7, 0.1, 0.2, 1.0 ) }
        },
        vertexShader: document.getElementById('PPFXVertexShader').textContent,
        fragmentShader: document.getElementById('blurFragmentShader').textContent
    }

    var pass4 = new THREE.ShaderPass( radialBlurShader );// first PFX pass
    composer.addPass(pass4);
    */



    // Color Inversion
    var colorInversionBlurShader = {
        uniforms: {
            "tDiffuse": { value: null}
        },
        vertexShader: document.getElementById('PPFXVertexShader').textContent,
        fragmentShader: document.getElementById('colorInversionFragmentShader').textContent
    }


    // BarrelDistortion
    var barrelDistortionShader = {
        uniforms: {
            "tDiffuse": { value: null},
            "barrelPower": { type: "f", value: 2.0 },
        },
        vertexShader: document.getElementById('PPFXVertexShader').textContent,
        fragmentShader: document.getElementById('BarrelDistortionFragmentShader').textContent
    }


    // DreamVision
    var dreamVisionShader = {
        uniforms: {
            "tDiffuse": { value: null},
        },
        vertexShader: document.getElementById('PPFXVertexShader').textContent,
        fragmentShader: document.getElementById('DreamVisionFragmentShader').textContent
    }

    // EdgeDetection
    var edgeDetectionShader = {
        uniforms: {
            "tDiffuse": { value: null},
        },
        vertexShader: document.getElementById('PPFXVertexShader').textContent,
        fragmentShader: document.getElementById('EdgeDetectionFragmentShader').textContent
    }


    var ppfxPass = edgeDetectionShader;
    var pass1 = new THREE.ShaderPass( ppfxPass );// first PFX pass
    composer.addPass(pass1);

    // render to screen is last with the last pass
    pass1.renderToScreen = true;// this makes sure we draw on our composer


    // happens at the beginning
    var start = function(){

        camera.position.z = 50.0;

        controls = new THREE.OrbitControls( camera, renderer.domElement);
    }

    var delta = 0;
    // game logic
    var update = function () {
        delta += 0.01;
        //pass3.uniforms.amount.value = Math.sin(delta);

    };

    // draw scene
    var render = function () {
        // specify scene and camera that the user will see through
        //renderer.render( scene, camera );

        // we use composer renderer instead which must be updated
        composer.render();
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