import { useThree } from '@react-three/fiber';
import { useR3FData } from '../zustand';

export const R3FDataChange: React.FC = () => {
  const gl = useThree(s => s.gl);
  const scene = useThree(s => s.scene);
  const camera = useThree(s => s.camera);

  useR3FData.setState({ gl, scene, camera });

  return null;
};
