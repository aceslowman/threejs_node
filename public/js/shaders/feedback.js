const vert = `
varying vec2 vUv;

void main()	{
    vUv = uv;
    gl_Position = vec4( position, 1.0 );
}
`;

const frag = `
uniform sampler2D tex0;
uniform sampler2D tex1;
varying vec2 vUv;

uniform float feedback;
uniform float scale;

uniform vec2 vPoint;

void main(){

    vec4 color;

    vec2 uv = vUv;
    vec2 uv2 = uv;

    uv2 -= vPoint;
    uv2 += vPoint/scale;
    uv2 *= scale;

    vec4 fb = vec4(0.0);
    vec4 current = vec4(0.0);
    vec4 tmp;

    current = texture2D(tex1, uv);
    fb = texture2D(tex0, uv2);
    color = current + (fb * feedback);

    gl_FragColor = vec4(color.rgb,1.0);
}
`;

export { vert, frag }
