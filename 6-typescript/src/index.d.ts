declare module "@nimbella/sdk" {
    export function redis(): RedisClient;
    export interface RedisClient extends NodeJS.EventEmitter {
        setAsync(key:string, value:string): Promise<number>;
        getAsync(key:string): Promise<string>;
        delAsync(key:string): Promise<number>;
        keysAsync(pattern:string): Promise<Array<string>>;
        mgetAsync(keys:Array<string>): Promise<Array<string>>;
    }
}
