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

    vec4 current = texture2D(tex1, uv);
    vec4 fb = texture2D(tex0, uv2);

    // color = mix(current,fb,feedback);
    if(current.a == 0.0){
      color = fb * feedback;
    }else{
      color = current;
    }

    gl_FragColor = color;
}
`;

export { vert, frag }
