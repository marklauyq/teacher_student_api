const util = require('../util/util');
const expect = require('expect');
const request = require('supertest');

it('should add 2 numberes', () => {
    var result = util.add(1,2);

    expect(result).toBe(3).toBeA('number'); 

    result = util.add(2,2);

    expect(result).toBe(4).toBeA('number');
});