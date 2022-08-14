const { expect } = require('chai');
const request = require('supertest');
const server = require('../server');
const deleteTestUser = require('../utils/deleteTestUser');

const DBConnection = require('../utils/DBConnection');

const tokenStore = { token: '' };
// .set('authorization', `Bearer ${fakerSpec.token}`)

describe('API Test', () => {
  before((done) => {
    DBConnection.connectToDatabase()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    deleteTestUser();
    // DBConnection.connectToDatabase()
    setTimeout(() => done(), 1000);
  });

  it('OK, creating a new user works', (done) => {
    request(server)
      .post('/api/v1/users/signup')
      .send({
        name: 'Henry Kc',
        email: 'henrykc24@yahoo.com',
        password: '88888888',
        passwordConfirm: '88888888',
        messagesLeft: 0,
      })
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');

        done();
      })
      .catch((err) => done(err));
  });

  it('OK, recover password request works', (done) => {
    request(server)
      .post('/api/v1/users/forgot-password')
      .send({ email: 'henrykc24@yahoo.com' })
      .then((res) => {
        const { body } = res;
        expect(body.message).to.equal('Token sent to the mail');
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, signing a user in works', (done) => {
    request(server)
      .post('/api/v1/users/login')
      .send({
        email: 'henrykc24@yahoo.com',
        password: '88888888',
      })
      .then((res) => {
        const { body } = res;
        tokenStore.token = body.token;
        expect(body.data.user.email).to.equal('henrykc24@yahoo.com');
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, home route works', (done) => {
    request(server)
      .get('/')
      .then((res) => {
        const { body } = res;
        expect(body.message).to.equal(
          'Welcome to Cope Notes Mental Health Support API service!'
        );
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, message pausing works', (done) => {
    request(server)
      .patch('/api/v1/users/pause-message')
      .set('authorization', `Bearer ${tokenStore.token}`)
      .then((res) => {
        const { body } = res;
        expect(body.message).to.equal('Email messages paused successfully.');
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, message resumption works', (done) => {
    request(server)
      .patch('/api/v1/users/continue-message')
      .set('authorization', `Bearer ${tokenStore.token}`)
      .then((res) => {
        const { body } = res;
        expect(body.message).to.equal(
          'Email messages has successfully continued.'
        );
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, re-subscribing to message service works', (done) => {
    request(server)
      .patch('/api/v1/users/re-subscribe')
      .set('authorization', `Bearer ${tokenStore.token}`)
      .then((res) => {
        const { body } = res;
        expect(body.message).to.equal(
          'You already have an active subscription. Please, check if message service is paused!'
        );
        done();
      })
      .catch((err) => done(err));
  });
});
