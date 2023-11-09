const mongoose = require('mongoose');
const { User } = require('../model/userSchema');

// Dev dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = 'http://localhost:5050';
const { expect } = require('chai');

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGMwYWRiY2MzMTBjMWFhNzA1NzNlOSIsImVtYWlsIjoic3RldmVuQG5vLmNvbSIsImZpcnN0TmFtZSI6IlN0ZXZlbiIsImxhc3ROYW1lIjoiQnVsbCIsImlhdCI6MTY5OTQ5NTgwNCwiZXhwIjoxNzAwMTAwNjA0fQ.O4_OworJdarVytewa4_29pjVZ76RTtNOG0DYAzGiXEg';

chai.use(chaiHttp);
describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });
});

describe('Auth Routes', () => {
    it('/register should post a valid user', () => {
        const user = {
            first_name: 'test',
            last_name: 'test',
            email: 'test@test.com',
            pword: 'test',
        };
        chai.request(server)
            .post('/v1/auth/register')
            .auth('bearer', token)
            .send(user)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            })
            .catch((err) => {
                throw err;
            });
    });
});
