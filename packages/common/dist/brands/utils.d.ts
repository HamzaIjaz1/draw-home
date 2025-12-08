import { GuardedType } from '@arthurka/ts-utils';
export declare const initializeByTypeGuard: <T, U>(e: T, typeGuard: (e: unknown) => e is U, typeName: string) => GuardedType<typeof typeGuard>;
//# sourceMappingURL=utils.d.ts.map