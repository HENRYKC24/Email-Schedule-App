const { expect } = require('chai');
const request = require('supertest');
const server = require('../../server');
const deleteTestUser = require('../../utils/deleteTestUser');

const deleteUser = async () => await deleteTestUser();

const DBConnection = require('../../utils/DBConnection');

let addedNewTestUser = false;

describe('API Test', () => {
  before((done) => {
    DBConnection.connectToDatabase()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    DBConnection.disconnectFromDatabase();
    done();
  });

  it('OK, recover password request works', (done) => {
    request(server)
      .post('/api/v1/users/forgot-password')
      .send({ email: 'henrykc24@yahoo.com' })
      .then((res) => {
        addedNewTestUser = true;
        const { body } = res;
        // console.log(body);
        expect(body.message).to.equal('Token sent to the mail');
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, creating a new user works', (done) => {
    request(server)
      .post('/api/v1/users/signup')
      .send({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '88888888',
        passwordConfirm: '88888888',
        messagesLeft: 0,
      })
      .then((res) => {
        addedNewTestUser = true;
        const { body } = res;
        expect(body).to.contain.property('status');
        deleteTestUser();
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, signing a user in works', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({
        email: 'henrykc24@yahoo.com',
        password: 'password12345',
      })
      .then((res) => {
        addedNewTestUser = true;
        const { body } = res;
        // console.log(body);
        expect(body.data.user.email).to.equal('henrykc24@yahoo.com');
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, home route works', (done) => {
    request(server)
      .get('/')
      .then((res) => {
        addedNewTestUser = true;
        const { body } = res;
        // console.log(body);
        expect(body.message).to.equal(
          'Welcome to Cope Notes Mental Health Support API service!'
        );
        done();
      })
      .catch((err) => done(err));
  });
});
