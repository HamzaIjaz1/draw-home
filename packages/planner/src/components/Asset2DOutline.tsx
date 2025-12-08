import { Line } from '@react-three/drei';
import { Vector3 } from 'three';

type Asset2DOutlineProps = {
  assets2DDefaultSize: number;
  textureRatio: number;
  isSelected: boolean;
};

export const Asset2DOutline = ({ assets2DDefaultSize, textureRatio, isSelected }: Asset2DOutlineProps) => (
  <Line
    points={[
      new Vector3(-(assets2DDefaultSize / 2 + 0.01), 0, -((assets2DDefaultSize / textureRatio) / 2 + 0.01)),
      new Vector3((assets2DDefaultSize / 2 + 0.01), 0, -((assets2DDefaultSize / textureRatio) / 2 + 0.01)),
      new Vector3((assets2DDefaultSize / 2 + 0.01), 0, ((assets2DDefaultSize / textureRatio) / 2 + 0.01)),
      new Vector3(-(assets2DDefaultSize / 2 + 0.01), 0, ((assets2DDefaultSize / textureRatio) / 2 + 0.01)),
      new Vector3(-(assets2DDefaultSize / 2 + 0.01), 0, -((assets2DDefaultSize / textureRatio) / 2 + 0.01)),
    ]}
    color={isSelected === true ? '#fd5631' : '#ffc1b3'}
    lineWidth={3}
  />
);
