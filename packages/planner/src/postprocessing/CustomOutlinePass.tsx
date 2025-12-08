import { trimMultiline } from '@arthurka/ts-utils';
import assert from 'assert';
import { Camera, Color, DoubleSide, MeshNormalMaterial, NearestFilter, OrthographicCamera, PerspectiveCamera, RGBAFormat, Scene, ShaderMaterial, Vector2, Vector4, WebGLRenderer, WebGLRenderTarget } from 'three';
import { FullScreenQuad, Pass } from 'three/examples/jsm/postprocessing/Pass.js';

type OutlineShaderUniforms = {
  debugVisualize: { value: number };
  sceneColorBuffer: { value: THREE.Texture | null };
  depthBuffer: { value: THREE.Texture | null };
  normalBuffer: { value: THREE.Texture | null };
  outlineColor: { value: THREE.Color };
  multiplierParameters: { value: THREE.Vector4 };
  cameraNear: { value: number };
  cameraFar: { value: number };
  screenSize: { value: THREE.Vector4 };
};

export class CustomOutlinePass extends Pass {
  renderScene: Scene;
  renderCamera: Camera;
  resolution: Vector2;
  fsQuad: FullScreenQuad;
  normalTarget: WebGLRenderTarget;
  normalOverrideMaterial: MeshNormalMaterial;

  get material() {
    assert(this.fsQuad.material instanceof ShaderMaterial, 'Expected ShaderMaterial. |v0126c|');

    return this.fsQuad.material as ShaderMaterial & { uniforms: OutlineShaderUniforms };
  }

  constructor(resolution: { x: number; y: number }, scene: Scene, camera: Camera) {
    super();

    this.renderScene = scene;
    this.renderCamera = camera;
    this.resolution = new Vector2(resolution.x, resolution.y);

    this.fsQuad = new FullScreenQuad();
    this.fsQuad.material = this.createOutlinePostProcessMaterial();

    const normalTarget = new WebGLRenderTarget(
      this.resolution.x,
      this.resolution.y,
    );
    normalTarget.texture.format = RGBAFormat;
    normalTarget.texture.minFilter = NearestFilter;
    normalTarget.texture.magFilter = NearestFilter;
    normalTarget.texture.generateMipmaps = false;
    normalTarget.stencilBuffer = false;
    this.normalTarget = normalTarget;

    this.normalOverrideMaterial = new MeshNormalMaterial({ side: DoubleSide });
  }

  dispose() {
    this.normalTarget.dispose();
    this.fsQuad.dispose();
  }

  setSize(width: number, height: number) {
    this.normalTarget.setSize(width, height);
    this.resolution.set(width, height);

    const shaderMat = this.material;
    shaderMat.uniforms.screenSize.value.set(
      this.resolution.x,
      this.resolution.y,
      1 / this.resolution.x,
      1 / this.resolution.y,
    );
  }

  render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget) {
    const depthBufferValue = writeBuffer.depthBuffer;
    // eslint-disable-next-line no-param-reassign
    writeBuffer.depthBuffer = false;
    renderer.setRenderTarget(this.normalTarget);

    const originalMask = this.renderCamera.layers.mask;
    this.renderCamera.layers.mask = 4; // 1 << 2 (layer 2, OUTLINE_LAYER)
    const overrideMaterialValue = this.renderScene.overrideMaterial;
    this.renderScene.overrideMaterial = this.normalOverrideMaterial;
    renderer.render(this.renderScene, this.renderCamera);
    this.renderScene.overrideMaterial = overrideMaterialValue;
    this.renderCamera.layers.mask = originalMask;

    const shaderMaterial = this.material;
    shaderMaterial.uniforms.sceneColorBuffer.value = readBuffer.texture;
    shaderMaterial.uniforms.depthBuffer.value = readBuffer.depthTexture;
    shaderMaterial.uniforms.normalBuffer.value = this.normalTarget.texture;

    if(this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      this.fsQuad.render(renderer);
    }
    writeBuffer.depthBuffer = depthBufferValue; // eslint-disable-line no-param-reassign
  }

  static get vertexShader(): string {
    return trimMultiline`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
  }
  static get fragmentShader(): string {
    return trimMultiline`
      #include <packing>
      // The above include imports "perspectiveDepthToViewZ"
      // and other GLSL functions from ThreeJS we need for reading depth.
      uniform sampler2D sceneColorBuffer;
      uniform sampler2D depthBuffer;
      uniform sampler2D normalBuffer;
      uniform float cameraNear;
      uniform float cameraFar;
      uniform vec4 screenSize;
      uniform vec3 outlineColor;
      uniform vec4 multiplierParameters;
      uniform int debugVisualize;

      varying vec2 vUv;

      // Helper functions for reading from depth buffer.
      float readDepth (sampler2D depthSampler, vec2 coord) {
        float fragCoordZ = texture2D(depthSampler, coord).x;
        float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
        return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
      }
      float getLinearDepth(vec3 pos) {
        return -(viewMatrix * vec4(pos, 1.0)).z;
      }

      float getLinearScreenDepth(sampler2D map) {
        vec2 uv = gl_FragCoord.xy * screenSize.zw;
        return readDepth(map,uv);
      }
      // Helper functions for reading normals and depth of neighboring pixels.
      float getPixelDepth(int x, int y) {
        // screenSize.zw is pixel size
        // vUv is current position
        return readDepth(depthBuffer, vUv + screenSize.zw * vec2(x, y));
      }
      vec3 getPixelNormal(int x, int y) {
        return texture2D(normalBuffer, vUv + screenSize.zw * vec2(x, y)).rgb;
      }

      float saturate1(float num) {
        return min(max(num, 0.0), 1.0);
      }

      void main() {
        vec4 sceneColor = texture2D(sceneColorBuffer, vUv);
        float depth = getPixelDepth(0, 0);
        vec3 normal = getPixelNormal(0, 0);

        // Get the difference between depth of neighboring pixels and current.
        float depthDiff = 0.0;
        depthDiff += abs(depth - getPixelDepth(1, 0));
        depthDiff += abs(depth - getPixelDepth(-1, 0));
        depthDiff += abs(depth - getPixelDepth(0, 1));
        depthDiff += abs(depth - getPixelDepth(0, -1));

        // Get the difference between normals of neighboring pixels and current
        float normalDiff = 0.0;
        normalDiff += distance(normal, getPixelNormal(1, 0));
        normalDiff += distance(normal, getPixelNormal(-1, 0));
        normalDiff += distance(normal, getPixelNormal(0, 1));
        normalDiff += distance(normal, getPixelNormal(0, -1));

        normalDiff += distance(normal, getPixelNormal(1, 1));
        normalDiff += distance(normal, getPixelNormal(1, -1));
        normalDiff += distance(normal, getPixelNormal(-1, 1));
        normalDiff += distance(normal, getPixelNormal(-1, -1));

        // Apply multiplier & bias to each
        float depthBias = multiplierParameters.x;
        float depthMultiplier = multiplierParameters.y;
        float normalBias = multiplierParameters.z;
        float normalMultiplier = multiplierParameters.w;

        depthDiff = depthDiff * depthMultiplier;
        depthDiff = saturate1(depthDiff);
        depthDiff = pow(depthDiff, depthBias);

        normalDiff = normalDiff * normalMultiplier;
        normalDiff = saturate1(normalDiff);
        normalDiff = pow(normalDiff, normalBias);

        float outline = length(normal) <= 0.01 ? 0.0 : (normalDiff + depthDiff);

        // Combine outline with scene color.
        vec4 outlineColor = vec4(outlineColor, 1.0);
        gl_FragColor = vec4(mix(sceneColor, outlineColor, outline));

        // For debug visualization of the different inputs to this shader.
        if (debugVisualize == 1) {
          gl_FragColor = sceneColor;
        }
        if (debugVisualize == 2) {
          gl_FragColor = vec4(vec3(depth), 1.0);
        }
        if (debugVisualize == 3) {
          gl_FragColor = vec4(normal, 1.0);
        }
        if (debugVisualize == 4) {
          gl_FragColor = vec4(vec3(outline * outlineColor), 1.0);
        }
       }
    `;
  }

  createOutlinePostProcessMaterial() {
    assert(this.renderCamera instanceof PerspectiveCamera || this.renderCamera instanceof OrthographicCamera, 'Something went wrong. |5xc8zz|');

    return new ShaderMaterial({
      vertexShader: CustomOutlinePass.vertexShader,
      fragmentShader: CustomOutlinePass.fragmentShader,
      uniforms: {
        debugVisualize: { value: 0 },
        sceneColorBuffer: { value: null },
        depthBuffer: { value: null },
        normalBuffer: { value: null },
        outlineColor: { value: new Color('#7a7a7a') },
        multiplierParameters: { value: new Vector4(1, 25, 2.1, 2) },
        cameraNear: { value: this.renderCamera.near },
        cameraFar: { value: this.renderCamera.far },
        screenSize: {
          value: new Vector4(
            this.resolution.x,
            this.resolution.y,
            1 / this.resolution.x,
            1 / this.resolution.y,
          ),
        },
      },
    });
  }
}
