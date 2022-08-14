// const { expect } = require('chai');
// const request = require('supertest');
// const app = require('../../app');

// const port = process.env.PORT || 4000;

// const { signup } = require('../../controller/authController');
const DBConnection = require('../../utils/DBConnection');

// describe('POST /signup', () => {
//   before((done) => {
//     DBConnection.connectToDatabase()
//       .then(() => {
//         app.listen(port, () => {
//           console.log(`App running on port ${port}`); // eslint-disable-line no-console
//         });
//         done();
//       })
//       .catch((err) => done(err));
//   });

//   after((done) => {
//     DBConnection.disconnectFromDatabase();
//     done();
//   });

//   it('OK, creating a new user works', function () {
//     this.timeout(10000);
//     request(signup)
//       .post('/signup')
//       .send({
//         name: 'John Doe',
//         email: 'johndoe@gmail.com',
//         password: '88888888',
//         passwordConfirm: '88888888',
//         messagesLeft: 0,
//       })
//       .then((res) => {
//         const { body } = res;
//         expect(body).to.contain.property('status');
//         done();
//       })
//       .catch((err) => done(err));
//   });
// });

const { should, use } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../../server');

// Assertion style
should();
use(chaiHTTP);

describe('API', () => {
  before((done) => {
    DBConnection.connectToDatabase()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    DBConnection.disconnectFromDatabase();
    done();
  });

  it('Should register a user', () => {
    chai
      .request('http://localhost:4000')
      .get('/api/users/')
      .end((err, response) => {
        console.log('res', response.body);
      });
  });
});
