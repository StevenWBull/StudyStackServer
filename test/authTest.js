// Dev dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const app = require('../server');

const user = {
    first_name: 'test',
    last_name: 'test',
    email: 'test@test.com',
    pword: 'test',
};

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGMwYWRiY2MzMTBjMWFhNzA1NzNlOSIsImVtYWlsIjoic3RldmVuQG5vLmNvbSIsImZpcnN0TmFtZSI6IlN0ZXZlbiIsImxhc3ROYW1lIjoiQnVsbCIsImlhdCI6MTcwMDYwMDkwMSwiZXhwIjoxNzAxMjA1NzAxfQ.WstPjmZzUYbUAFstXjCXjfMSwlgyauL7pbM7mMUCs5Q';

//Clean database before each run
const cleanup = async () => {};

chai.use(chaiHttp);
// Auth routes testing
describe('Auth Routes', () => {
    describe('POST /v1/auth/register', () => {
        it('should post a valid user', (done) => {
            chai.request(app)
                .post('/v1/auth/register')
                .auth('bearer', token)
                .send(user)
                .end((err, res) => {
                    if (err) {
                        expect(res).to.have.status(500);
                    } else {
                        expect(res).to.have.status(201);
                        expect(res).to.be.json;
                    }
                    done();
                });
        });
    });

    describe('POST /v1/auth/login', () => {
        it('/login should return 200 and user logged in message', (done) => {
            const req = {
                email: 'test@test.com',
                pword: 'test',
            };
            chai.request(app)
                .post('/v1/auth/login')
                .auth('bearer', token)
                .send(req)
                .end((err, res) => {
                    if (err) {
                        expect(res).to.have.status(500);
                    } else {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                    }
                    done();
                });
        });
    });

    describe('GET /v1/auth/logout', () => {
        it('/logout should return 200 and user logged out message', (done) => {
            chai.request(app)
                .get('/v1/auth/logout')
                .auth('bearer', token)
                .end((err, res) => {
                    if (err) {
                        expect(res).to.have.status(500);
                    } else {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                    }
                    done();
                });
        });
    });
});

// User routes testing