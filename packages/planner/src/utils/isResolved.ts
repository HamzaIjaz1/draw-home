export type Resolved<T> = Exclude<T, 'idle' | 'loading'>;

export const isResolved = <T>(e: 'idle' | 'loading' extends T ? [T] extends ['idle' | 'loading'] ? never : T : never): e is Exclude<typeof e, 'idle' | 'loading'> => (
  e !== 'idle' && e !== 'loading'
);
