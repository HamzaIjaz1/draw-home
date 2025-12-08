import { useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ACESFilmicToneMapping, DepthTexture, FloatType, HalfFloatType, RGBAFormat, SRGBColorSpace, Vector2, WebGLRenderTarget } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { isUndefined } from '@arthurka/ts-utils';
import { CustomOutlinePass } from '../postprocessing/CustomOutlinePass';
import { useGlobalSettings } from '../zustand';
import { useStrapiAppConfigResolved } from '../zustand/useStrapiAppConfig';

const _OutlinePostProcessing: React.FC = () => {
  const { gl, scene, camera, size } = useThree();
  const settings = useGlobalSettings(s => s.outlinesSettings);

  gl.outputColorSpace = SRGBColorSpace;
  gl.toneMapping = ACESFilmicToneMapping;
  gl.toneMappingExposure = 1;

  const composer = useMemo(() => {
    const pixelRatio = gl.getPixelRatio();
    const effectiveWidth = size.width * pixelRatio;
    const effectiveHeight = size.height * pixelRatio;

    const renderTargetWithDepth = new WebGLRenderTarget(effectiveWidth, effectiveHeight, {
      depthTexture: new DepthTexture(effectiveWidth, effectiveHeight, FloatType),
      type: HalfFloatType,
      format: RGBAFormat,
    });
    const composer = new EffectComposer(gl, renderTargetWithDepth);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const outlinePass = new CustomOutlinePass(new Vector2(size.width, size.height), scene, camera);
    outlinePass.material.uniforms.multiplierParameters.value.set(
      settings.depthBias,
      settings.depthMultiplier,
      settings.normalBias,
      settings.normalMultiplier,
    );
    outlinePass.material.uniforms.outlineColor.value.set(settings.outlineColor);
    outlinePass.material.uniforms.debugVisualize.value = settings.debugVisualize;
    composer.addPass(outlinePass);

    const copyPass = new ShaderPass(CopyShader);
    composer.addPass(copyPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    const fxaaPass = new ShaderPass(FXAAShader);
    if(!isUndefined(fxaaPass.uniforms.resolution)) {
      fxaaPass.uniforms.resolution.value.set(1 / effectiveWidth, 1 / effectiveHeight);
    }
    composer.addPass(fxaaPass);

    composer.setSize(size.width, size.height);

    return composer;
  }, [gl, scene, camera, size, settings]);
  useEffect(() => (
    () => {
      composer.dispose();
    }
  ), [composer]);

  useFrame(() => {
    composer.render();
  }, 1);

  return null;
};

export const OutlinePostProcessing: React.FC = () => {
  const isOutlinesTurnedOn = useGlobalSettings(s => s.isOutlinesTurnedOn);
  const { strapiAppConfig } = useStrapiAppConfigResolved();

  return (
    isOutlinesTurnedOn === true && strapiAppConfig.enableOutlinesFeature === true && (
      <_OutlinePostProcessing />
    )
  );
};
