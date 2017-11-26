// https://stackoverflow.com/questions/12627422/custom-texture-shader-in-three-js

attribute float vertexDisplacement;

varying float vOpacity;
varying vec3 vPosition;
varying vec2 vUv; // varying transfers variable from vertex to fragment shader

void main() {
    vOpacity = vertexDisplacement;
    vPosition = position;
    vUv = uv;

    vec3 p = position;
    p.x += sin(vertexDisplacement) * 50.0;
    p.y += cos(vertexDisplacement) * 50.0;


    vec4 modelViewPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;

}
