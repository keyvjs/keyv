import {EventEmitter} from 'events';

export = KeyvMysql;
declare class KeyvMysql extends EventEmitter {
	readonly ttlSupport: false;
	opts: any;
	query: (sqlString: any) => any;
	constructor(options?: string | KeyvMysql.Options);
	get(key: string): Promise<Value>;
	getMany?(
		keys: string[]
	): Array<StoredData<Value>> | Promise<Array<StoredData<Value>>> | undefined;
	set(key: string, value: Value, ttl?: number): any;
	delete(key: string): boolean | Promise<boolean>;
	deleteMany(keys: string[]): boolean;
	clear(): void | Promise<void>;
	iterator(namespace: string | undefined): AsyncGenerator<any, void, any>;
	has?(key: string): boolean | Promise<boolean>;
}
declare namespace KeyvMysql {
	interface Options {
		uri?: string | undefined;
		table?: string | undefined;
		keySize?: number | undefined;
	}
}
