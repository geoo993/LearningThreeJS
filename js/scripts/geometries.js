
// https://www.youtube.com/watch?v=3eGeh_aJxMI&index=3&list=PL08jItIqOb2qyMOhtEUoLh100KpccQiRf

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

    camera.position.z = 10.0;

    controls = new THREE.OrbitControls( camera, renderer.domElement);


    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.5);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight( 0xffffff, 0.5 );
    pointLight.position.set(0, 0, 0);
    scene.add( pointLight );

    var customMaterial = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0xf3ffe3),
        side: THREE.DoubleSide
    });

    // CUBE GEOMETRY (width, height, depth)
    //var geometry = new THREE.BoxGeometry( 20, 20, 20 );

    // PLANE GEOMETRY (width, height, widthSegments, heightSegments)
    var geometry = new THREE.PlaneGeometry( 100, 100);

    // SPHERE GEOMETRY (radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
    //var geometry = new THREE.SphereGeometry( 20, 5, 5);

    // CIRCLE GEOMETRY (radius, segments, thetaStart, thetaLength)
    //var geometry = new THREE.CircleGeometry( 20, 20, 20);
    //var geometry = new THREE.CircleBufferGeometry( 20, 20, 20);

    // CONE GEOMETRY (radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength)
    //var geometry = new THREE.ConeGeometry( 25, 50, 25);

    // CYLINDER GEOMETRY (radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
    //var geometry = new THREE.CylinderGeometry( 25, 25, 50, 10, 10, true);

    // POLYHEDRON (vertices, indices, radius, detail)
    /*
    var tVertices = [
        -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
        -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
    ];

    var tFaces = [
        2,1,0,    0,3,2,
        0,4,7,    7,3,0,
        0,1,5,    5,4,0,
        1,2,6,    6,5,1,
        2,3,7,    7,6,2,
        4,5,6,    6,7,4
    ];
    var geometry = new THREE.PolyhedronGeometry(tVertices, tFaces, 30, 2);
    */

    // DODECAHEDRONGEOMETRY (radius, detail)
    //var geometry = new THREE.DodecahedronGeometry(30, 0);

    // ICOSAHEDRONGEOMETRY  (radius, detail)
    //var geometry = new THREE.IcosahedronGeometry(30, 0);

    // OCTAHEDRONGEOMETRY  (radius, detail)
    //var geometry = new THREE.OctahedronGeometry(30, 0);

    // TETRAHEDRONGEOMETRY  (radius, detail)
    //var geometry = new THREE.TetrahedronGeometry(30, 0);

    // RINGGEOMETRY (innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength)
    //var geometry = new THREE.RingGeometry(20, 40, 16);

    // TORUSGEOMETRY (radius, tube, radialSegments, tubularSegments, arc)
    //var geometry = new THREE.TorusGeometry(20, 10, 16, 100);

    // TORUSKNOTGEOMETRY (radius, tube, tubularSegments, radialSegments, p, q)
    //var geometry = new THREE.TorusKnotGeometry(20, 8, 16, 100);

    /*
    // TEXTGEOMETRY (text, parameters)
    var loader = new THREE.FontLoader();
    var font = loader.parse(fontJSON);
    var text = "hello";
    var parameters = {font: font, size: 20, height: 2, material: 0, bevelThickness: 1, extrudeMaterial: 1};
    var geometry = new THREE.TextGeometry(text, parameters);
    */

    /*
    var x = 0;
    var y = 0;
    var heartShape = new THREE.Shape();
    heartShape.moveTo( x + 25, y + 25 );
    heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
    heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 );
    heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
    heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
    heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
    heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );
    var extrudeSettings = { amount: 20, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    // EXTRUDEGEOMETRY (shapes, options)
    var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

    // SHAPEGEOMETRY   (shapes, curveSegments)
    var geometry = new THREE.ShapeGeometry( heartShape, extrudeSettings );
    */

    /*
    // LATHEGEOMETRY  (points, segments, phiStart, phiLength)
    var type = [0.2,  1.0,  2.0]
    var points = [];
    for ( var i = 0; i < 10; i ++ ) {
        points.push( new THREE.Vector2( 2.5 + Math.sin( i * type[2] ) * 10, i * 5) );
    }
    var geometry = new THREE.LatheGeometry( points );
    */

    /*
    // PARAMETRICGEOMETRY (func, slices, stacks)
    var paramFunc = function(u, v){
        var x = -100 + 200 * u;
        var y = 100 + 200 * v;
        var z = (Math.sin(u* Math.PI) + Math.sin(v* Math.PI)) * (-60);
        return new THREE.Vector3(x,y,z);
    };
    var geometry = new THREE.ParametricGeometry( paramFunc, 15, 15 );
    */

    /*
    // TUBEGEOMETRY (path, tubularSegments, radius, radiusSegments, closed)
    var path = new THREE.SplineCurve3( [
        new THREE.Vector3( -10, 0, 10 ),
        new THREE.Vector3( -5, 5, 5 ),
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 5, -5, 5 ),
        new THREE.Vector3( 10, 0, 10 )
    ] );
    var geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
    */

    var meshGeometry = new THREE.Mesh(geometry, customMaterial);
    meshGeometry.position.set(0, 0, -100);
    scene.add(meshGeometry);


    // Simple Geometry
    var simpleGeometry = new THREE.Geometry();
    simpleGeometry.vertices.push(
        new THREE.Vector3(-10, 10, 0),
        new THREE.Vector3(-10, -10, 0),
        new THREE.Vector3(10, -10, 0)
    );
    simpleGeometry.faces.push( new THREE.Face3(0, 1, 2) );
    var simpleMesh = new THREE.Mesh(simpleGeometry, customMaterial);
    simpleMesh.position.set(-100, 50, -100);
    scene.add(simpleMesh);


    // Buffer Geometry , optimized for performance but less dynamic
    var bufferGeometry = new THREE.BufferGeometry();
    var bufferVertices = new Float32Array([
        -10.0, 10.0, 0.0,
        -10.0, -10.0, 0.0,
        10.0, -10.0, 0.0
    ]);
    bufferGeometry.addAttribute('position', new THREE.BufferAttribute(bufferVertices, 3));
    var bufferMesh = new THREE.Mesh(bufferGeometry, customMaterial);
    bufferMesh.position.set(-100, 0, -100);
    scene.add(bufferMesh);

    var delta = 0.0;
    // game logic
    var update = function () {
        //meshGeometry.rotation.x += 0.01;
        //meshGeometry.rotation.y += 0.02;

        delta += 0.1;

        // Access mesh vertices
        geometry.vertices[0].x = -25 + Math.sin(delta) * 50;
        geometry.verticesNeedUpdate = true; // tell the mesh to update its geometry
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

    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    window.addEventListener( 'resize' , function () {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    })


});