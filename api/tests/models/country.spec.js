const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
    describe('img', () => {
      it('should throw an error if img is null', (done) => {
        Country.create({})
        .then(() => done(new Error('It requires a valid img')))
        .catch(() => done());
      });
      it('should work when its a valid img', () => {
        Country.create({ img: 'https://www.ambientum.com/wp-content/uploads/2019/01/bandera-australia-696x348.png' });
      });
    });
    describe('continent', () => {
      it('should throw an error if continent is null', (done) => {
        Country.create({})
        .then(() => done(new Error('It requires a valid continent')))
        .catch(() => done());
      });
      it('should work when its a valid img', () => {
        Country.create({ continent: 'Asia' });
      });
    });
    describe('capital', () => {
      it('should throw an error if capital is null', (done) => {
        Country.create({})
        .then(() => done(new Error('It requires a valid capital')))
        .catch(() => done());
      });
      it('should work when its a valid img', () => {
        Country.create({ capital: 'Buenos Aires' });
      });
    });
  });
});
