
const _main = (): void => { /* do nothing */ };
const _config = (): void => { /* do nothing */ };

// Global declaration
declare const main: typeof _main;
declare const config: typeof _config;

// Global scope augmentation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const scope: any = globalThis;
scope.main = _main;
scope.config = _config;
