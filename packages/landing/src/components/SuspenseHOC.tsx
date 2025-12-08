import { Suspense } from 'react';

export const SuspenseHOC = <T extends {} = {}>(Comp: React.FC<T>) => (
  (props: T) => (
    <Suspense fallback={null}>
      <Comp {...props} />
    </Suspense>
  )
);
