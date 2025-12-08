import { AmbientLight, DirectionalLight, Material, Mesh, PerspectiveCamera, PlaneGeometry, PointLight, Scene, SphereGeometry, Texture, WebGLRenderer } from 'three';

let sharedRenderer: WebGLRenderer | null = null;

const waitForMaterialTextures = async (material: Material): Promise<void> => {
  const textures = Object.values(material).filter(prop => prop instanceof Texture) as Texture[];

  await Promise.all(
    textures.map(texture => (
      new Promise<void>(resolve => {
        if(texture.image) {
          resolve();
        } else {
          const checkImageLoaded = () => {
            if(texture.image) {
              resolve();
            } else {
              window.setTimeout(() => {
                checkImageLoaded();
              }, 50);
            }
          };
          checkImageLoaded();
        }
      })
    )),
  );
};

type MaterialRenderShape = 'sphere' | 'rectangle';

const getSharedRenderer = (width = 64, height = 64): WebGLRenderer => {
  if(!sharedRenderer) {
    sharedRenderer = new WebGLRenderer({ antialias: true });
    sharedRenderer.setPixelRatio(window.devicePixelRatio);
    sharedRenderer.setSize(width, height);
    sharedRenderer.setClearColor(0x000000, 0);
  } else {
    sharedRenderer.setSize(width, height);
    sharedRenderer.clear();
  }
  return sharedRenderer;
};

export const renderMaterial = async (
  material: Material,
  renderShape: MaterialRenderShape = 'rectangle',
  width = 128,
  height = 64,
): Promise<string> => {
  await waitForMaterialTextures(material);

  const scene = new Scene();

  const geometry = (
    renderShape === 'sphere'
      ? new SphereGeometry(1, 32, 32)
      : new PlaneGeometry(1, 1)
  );
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const light = new PointLight(0xffffff, 1, 100);
  light.position.set(5, 5, 5);
  scene.add(light);

  const ambientLight = new AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-5, -5, 5);
  scene.add(directionalLight);

  const camera = new PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(0, 0, renderShape === 'sphere' ? 3 : 0.5);
  camera.lookAt(0, 0, 0);

  const renderer = getSharedRenderer(width, height);
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.setClearColor(0x000000, 0);

  renderer.render(scene, camera);
  const imageUrl = renderer.domElement.toDataURL('image/png');

  return imageUrl;
};
