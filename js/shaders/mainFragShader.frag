
// https://stackoverflow.com/questions/12627422/custom-texture-shader-in-three-js

uniform sampler2D sampler0;
uniform float delta;

varying float vOpacity;
varying vec3 vPosition;
varying vec2 vUv;

void main() {

    vec4 tex = texture2D(sampler0, vUv);
    float r = 1.0 + cos(vPosition.x * delta);
    float g = 0.5 + sin(delta) * 0.5;
    float b = 0.0;
    float a = vOpacity;

    //gl_FragColor = tex;                   // Displays Texture
    gl_FragColor = vec4(r, g, b, a);        // Displays Color
}

