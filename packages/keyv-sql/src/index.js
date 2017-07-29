'use strict';

const EventEmitter = require('events');
const Sequelize = require('sequelize');

class KeyvSqlite extends EventEmitter {
	constructor(opts) {
		super();
		this.ttlSupport = false;
		opts = opts || {};
		this.opts = Object.assign({
			uri: 'sqlite://:memory:',
			table: 'keyv'
		}, opts);

		const sequelize = new Sequelize(this.opts.uri, this.opts);
		this.Entry = sequelize.define('entry', {
			key: {
				type: Sequelize.STRING
			},
			value: {
				type: Sequelize.TEXT
			}
		});

		sequelize.authenticate()
			.then(() => sequelize.sync())
			.catch(err => this.emit('error', err));
	}

	get(key) {
	}

	set(key, value, ttl) {
	}

	delete(key) {
	}

	clear() {
	}
}

module.exports = KeyvSqlite;
