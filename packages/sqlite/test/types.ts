import test from 'ava';
import Keyv from 'keyv';
import KeyvSqlite from '../src/index.js';

const redisHost = 'localhost';
const redisUri = `redis://${redisHost}`;

type MyType = {
	a: string;
};

test('can specify redis store in typescript', async t => {
	const keyv = new Keyv<MyType>({
		store: new KeyvSqlite(redisUri),
	});

	t.true(await keyv.set('testkey', {a: 'testvalue'}));
	t.deepEqual(await keyv.get('testkey'), {a: 'testvalue'});
});
