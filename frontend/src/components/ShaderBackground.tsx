import { useEffect, useRef } from 'react'

const VERT = `attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0.0,1.0);}`

// Swirling fluid: vortex rotation + multi-octave fbm domain warp.
// Palette is on-brand: deep teal -> brand teal -> mint (#A4E2C6).
const FRAG = `precision highp float;
uniform vec2 u_res;uniform float u_time;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);
float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));
return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
float fbm(vec2 p){float v=0.0,amp=0.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);
for(int i=0;i<5;i++){v+=amp*noise(p);p=m*p;amp*=0.5;}return v;}
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*u_res)/u_res.y;
  float t=u_time*0.6;
  float r=length(uv);
  float ang=atan(uv.y,uv.x);
  ang+=(0.6/(r+0.32))*(sin(t*0.3)*0.5+0.8)+t*0.25;
  vec2 sp=vec2(cos(ang),sin(ang))*r;
  vec2 q=vec2(fbm(sp*1.5+vec2(0.0,t*0.15)),fbm(sp*1.5+vec2(5.2,1.3)-t*0.12));
  vec2 r2=vec2(fbm(sp*1.5+2.0*q+vec2(1.7,9.2)+t*0.1),fbm(sp*1.5+2.0*q+vec2(8.3,2.8)-t*0.1));
  float n=fbm(sp*2.0+3.0*r2);
  vec3 deep=vec3(0.02,0.10,0.18);
  vec3 teal=vec3(0.10,0.42,0.45);
  vec3 mint=vec3(0.643,0.886,0.776);
  vec3 col=mix(deep,teal,smoothstep(0.0,0.46,n));
  col=mix(col,mint,smoothstep(0.46,0.86,n));
  col=mix(col,deep,smoothstep(0.78,1.35,length(r2))*0.20);
  col*=1.0-0.10*smoothstep(0.8,1.7,r);
  gl_FragColor=vec4(col,1.0);
}`

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'u_res')
    const uTime = gl.getUniformLocation(program, 'u_time')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = (seconds: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, seconds)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      draw(12)
      return () => {
        ro.disconnect()
      }
    }

    let raf = 0
    const start = performance.now()
    const loop = () => {
      if (document.hidden) return
      // Skip the GPU draw when the hero is fully scrolled out of view,
      // but keep the rAF alive so time stays continuous on return.
      const rect = canvas.getBoundingClientRect()
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        draw((performance.now() - start) / 1000)
      }
      raf = requestAnimationFrame(loop)
    }
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(loop)
    }
    document.addEventListener('visibilitychange', onVisibility)
    if (!document.hidden) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibility)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="hero-shader" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-shader-canvas" />
      <svg className="hero-shader-grain" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <filter id="heroGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroGrain)" />
      </svg>
      <div className="hero-shader-scrim" />
    </div>
  )
}
