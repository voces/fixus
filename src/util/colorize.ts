
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const colorize: Record<string, ( v: any ) => string> = {};
colorize.string = ( string: string ): string => `|cffce915b${string}|r`;
colorize.number = ( number: number ): string => `|cffdcdc8b${number}|r`;
colorize.boolean = ( boolean: boolean ): string => `|cff569cd6${boolean}|r`;
