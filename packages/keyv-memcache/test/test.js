import test from 'ava';
import keyvTestSuite, { keyvOfficialTests } from '@keyv/test-suite';
import Keyv from 'keyv';
import KeyvMemcache from '../src';

keyvOfficialTests(test, Keyv, '', '');

const store = () => new KeyvMemcache();
keyvTestSuite(test, Keyv, store);
