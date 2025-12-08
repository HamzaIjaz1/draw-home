import { PositiveInteger } from '@draw-house/common/dist/brands';
import assert from 'assert';
import { ACESFilmicToneMapping, Color, SRGBColorSpace, WebGLRenderer } from 'three';
import { getNotNull, isNull } from '@arthurka/ts-utils';
import { useR3FDataResolved } from '../zustand/useR3FData';

const copyCanvas = (canvas: HTMLCanvasElement, size: PositiveInteger) => {
  const newCanvas = document.createElement('canvas');
  const context = newCanvas.getContext('2d');

  assert(!isNull(context), 'Something went wrong. |b6x1b6|');

  newCanvas.width = size;
  newCanvas.height = size;
  context.drawImage(canvas, 0, 0, size, size);

  return newCanvas;
};

const getCroppingSizesForSnapshot = (canvas: HTMLCanvasElement) => {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  const cropSize = Math.min(canvasWidth, canvasHeight);

  const cropX = centerX - cropSize / 2;
  const cropY = centerY - cropSize / 2;

  return {
    cropSize,
    cropX,
    cropY,
    centerX,
    centerY,
  };
};

const cropCanvas = (canvas: HTMLCanvasElement) => {
  const newCanvas = document.createElement('canvas');
  const { cropSize, cropX, cropY } = getCroppingSizesForSnapshot(canvas);

  newCanvas.width = cropSize;
  newCanvas.height = cropSize;

  const context = getNotNull(newCanvas.getContext('2d'), 'Something went wrong. |ak4hk4|');

  context.drawImage(canvas, cropX, cropY, cropSize, cropSize, 0, 0, cropSize, cropSize);

  return newCanvas;
};

export const takeScreenshot = (size: PositiveInteger | 'full-screen'): Promise<Blob> => (
  new Promise(res => {
    const { camera, gl, scene: _scene } = useR3FDataResolved.getState();

    const scene = _scene.clone();
    const canvas = document.createElement('canvas');

    if(size === 'full-screen') {
      const scale = 2;
      const pixelRatio = gl.getPixelRatio();

      canvas.width = (gl.domElement.width / pixelRatio) * scale;
      canvas.height = (gl.domElement.height / pixelRatio) * scale;
    }

    const renderer = new WebGLRenderer({
      canvas,
      preserveDrawingBuffer: true,
      alpha: true,
      antialias: true,
    });

    scene.background = new Color('white');

    if(size === 'full-screen') {
      renderer.setPixelRatio(1);
      renderer.outputColorSpace = SRGBColorSpace;
      renderer.toneMapping = ACESFilmicToneMapping;

      renderer.render(scene, camera);

      canvas.toBlob(blob => {
        assert(!isNull(blob), 'Something went wrong. |zq9jgi|');

        res(blob);
      }, 'image/png');
    } else {
      renderer.setSize(gl.domElement.width, gl.domElement.height, false);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.outputColorSpace = SRGBColorSpace;
      renderer.toneMapping = ACESFilmicToneMapping;

      renderer.render(scene, camera);

      const croppedCanvas = cropCanvas(canvas);
      const resizedCanvas = copyCanvas(croppedCanvas, size);

      resizedCanvas.toBlob(blob => {
        assert(!isNull(blob), 'Something went wrong. |f69b14|');

        res(blob);
      }, 'image/png');
    }
  })
);

export const createOverlayCanvasFromTexture = (img: HTMLImageElement, color: string, compositeOperation: GlobalCompositeOperation) => {
  const canvas = document.createElement('canvas');
  const ctx = getNotNull(canvas.getContext('2d'), 'Something went wrong. |g24dg9|');

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);
  ctx.globalCompositeOperation = compositeOperation;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
};
