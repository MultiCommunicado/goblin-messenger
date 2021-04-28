const React = require ('react');
const { configure, shallow, mount, render } = require ('enzyme');
const Adapter = require ('enzyme-adapter-react-16');
const toJson = require ('enzyme-to-json');

describe('This should also do a thing', () =>{
    let dootInABoot = false;
    it('should also check some thangs', () =>{
        expect(dootInABoot).toEqual(false);
    })
})