import { useEffect, useRef, useState } from 'react';
import { BufferGeometry, DoubleSide, EdgesGeometry, Group, LineBasicMaterial, Matrix4, MeshBasicMaterial, Quaternion, Shape, ShapeGeometry, Vector2, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { isNull, isUndefined, tuple } from '@arthurka/ts-utils';
import { WallId } from '@draw-house/common/dist/brands';
import { useLevels } from '../zustand/useLevels';
import { resetCurrentCamera, useSlideUpMenuLvl1, useSpaces, useViewMode, useWalls, WallsStore } from '../zustand';
import { hasFloorUserData, normalizePolys, offsetPolyByWalls, SimpleWall } from './LevelPlanesPublisher';

const EPSILON = 0.02;
const MAX_HZ = 3;
const showPlane = ((e: boolean) => e)(false);

export type LevelPlanesOverlayProps = {
  levelTargetGroupRef: React.RefObject<Group>;
};

export const LevelPlanesOverlay: React.FC<LevelPlanesOverlayProps> = ({ levelTargetGroupRef }) => {
  const opacity = 0.15;
  const color = '#31bcfd';
  const activeColor = '#fd5631';

  const { levels } = useLevels();
  const { walls } = useWalls();
  const { spaces } = useSpaces();
  const { slideUpMenuLvl1 } = useSlideUpMenuLvl1();
  const { viewMode } = useViewMode();
  const { invalidate } = useThree();

  const isVisible = (
    true
      && viewMode === '3D'
      && slideUpMenuLvl1.type === 'levels'
      && slideUpMenuLvl1.isOpened === true
  );

  useEffect(() => {
    if(isVisible === true) {
      resetCurrentCamera();
    }
  }, [isVisible]);

  const baseMatRef = useRef(
    new MeshBasicMaterial({
      transparent: true,
      opacity,
      depthWrite: false,
      depthTest: false,
      side: DoubleSide,
      color,
      colorWrite: true,
    }),
  );
  const activeMatRef = useRef(
    new MeshBasicMaterial({
      transparent: true,
      opacity,
      depthWrite: false,
      depthTest: false,
      side: DoubleSide,
      color: activeColor,
      colorWrite: true,
    }),
  );
  const borderMatRef = useRef(
    new LineBasicMaterial({
      color: '#808080',
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      depthTest: showPlane === false,
    }),
  );
  const qIdentityRef = useRef(new Quaternion());
  const tmpVRef = useRef(new Vector3());

  type PlaneEntry = { key: string; geometry: ShapeGeometry; edges: EdgesGeometry; material: MeshBasicMaterial; matrix: Matrix4 };
  const [entries, setEntries] = useState<PlaneEntry[]>([]);
  const prevGeosRef = useRef<BufferGeometry[]>([]);

  useEffect(() => {
    if(isVisible === false) {
      for(const geometry of prevGeosRef.current) {
        geometry.dispose();
      }
      prevGeosRef.current = [];
      setEntries([]);
      return;
    }

    const intervalMs = Math.max(1000 / Math.max(1, MAX_HZ), 100);
    let raf = 0;
    let last = 0;

    const step = (e: number) => {
      if(e - last >= intervalMs) {
        last = e;

        const root = levelTargetGroupRef.current;
        const levelPolys: Record<string, Array<Array<[number, number]>>> = {};

        if(!isNull(root)) {
          const wallsById = new Map<WallId, WallsStore['walls'][number]>();
          for(const wall of walls) {
            wallsById.set(wall.id, wall);
          }

          const spaceWalls: Record<string, SimpleWall[]> = {};

          for(const space of spaces) {
            const list: SimpleWall[] = [];

            for(const wallId of space.walls) {
              const wall = wallsById.get(wallId);
              if(isUndefined(wall)) {
                continue;
              }

              list.push({
                thickness: wall.thickness,
                start: {
                  x: wall.position.start.x,
                  y: wall.position.start.y,
                },
                end: {
                  x: wall.position.end.x,
                  y: wall.position.end.y,
                },
              });
            }

            spaceWalls[space.id] = list;
          }

          root.updateMatrixWorld(true);
          root.traverse(obj => {
            if(!hasFloorUserData(obj) || obj.visible === false) {
              return;
            }

            const { levelId, spaceId, floorCoords } = obj.userData;
            const polysLocal = normalizePolys(floorCoords);
            if(polysLocal.length === 0) {
              return;
            }

            const tmpV = tmpVRef.current;
            const wallsForSpace = spaceWalls[spaceId] ?? [];

            const polysWorld: Array<Array<[number, number]>> = polysLocal.map(poly => {
              const acc: Array<[number, number]> = [];
              for(const pair of poly) {
                const x = pair[0];
                const z = pair[1];
                tmpV.set(x, 0, z).applyMatrix4(obj.matrixWorld);
                acc.push(tuple(tmpV.x, tmpV.z));
              }

              return offsetPolyByWalls(acc, wallsForSpace);
            });

            if(isUndefined(levelPolys[levelId])) {
              levelPolys[levelId] = [];
            }
            levelPolys[levelId].push(...polysWorld);
          });
        }

        for(const geometry of prevGeosRef.current) {
          geometry.dispose();
        }
        prevGeosRef.current = [];

        const next: PlaneEntry[] = [];
        for(const lvl of levels) {
          const lvlId = lvl.id;
          const polys = levelPolys[lvlId];
          if(isUndefined(polys) || polys.length === 0) {
            continue;
          }

          const height = lvl.height ?? 0;
          const y = (lvl.elevation ?? 0) + height + EPSILON;

          for(let i = 0; i < polys.length; i++) {
            const poly = polys[i];
            if(isUndefined(poly) || poly.length < 3) {
              continue;
            }

            const shape = new Shape(poly.map(e => new Vector2(e[0], e[1])));
            const geometry = new ShapeGeometry(shape);
            geometry.rotateX(Math.PI / 2);

            const edges = new EdgesGeometry(geometry);
            prevGeosRef.current.push(geometry, edges);

            const material = lvl.isActive === true ? activeMatRef.current : baseMatRef.current;
            const matrix = new Matrix4().compose(
              new Vector3(0, y, 0),
              qIdentityRef.current,
              new Vector3(1, 1, 1),
            );

            next.push({ key: `${lvlId}:${i}`, geometry, edges, material, matrix });
          }
        }

        setEntries(next);
        invalidate();
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      for(const geometry of prevGeosRef.current) {
        geometry.dispose();
      }
      prevGeosRef.current = [];
    };
  }, [isVisible, levelTargetGroupRef, levels, invalidate, walls, spaces]);

  return isVisible === true && (
    <group renderOrder={9999}>
      {
        entries.map(e => (
          <group
            key={e.key}
            matrix={e.matrix}
            matrixAutoUpdate={false}
            frustumCulled={false}
          >
            {
              showPlane === true && (
                <mesh
                  geometry={e.geometry}
                  material={e.material}
                  frustumCulled={false}
                />
              )
            }
            <lineSegments
              geometry={e.edges}
              material={borderMatRef.current}
              frustumCulled={false}
            />
          </group>
        ))
      }
    </group>
  );
};
