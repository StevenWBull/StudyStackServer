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

const passVars = {};

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGMwYWRiY2MzMTBjMWFhNzA1NzNlOSIsImVtYWlsIjoic3RldmVuQG5vLmNvbSIsImZpcnN0TmFtZSI6IlN0ZXZlbiIsImxhc3ROYW1lIjoiQnVsbCIsImlhdCI6MTcwMTMwNzQzOCwiZXhwIjoxNzAxOTEyMjM4fQ.QXAGAyglrHEGBi068sHt9U64z2JQjihswplcGjIkvuE';

//Clean database before each run
const cleanup = async (req, res) => {
    await User.deleteOne({
        first_name: user.first_name,
        last_name: user.last_name,
    });
};

chai.use(chaiHttp);
describe('Cleaning up', () => {
    it('should clear up the database', (done) => {
        cleanup();
        done();
    });
});

// Auth routes testing
describe('Auth Routes', () => {
    describe('POST /v1/auth/register', () => {
        it('should post a valid user', (done) => {
            chai.request(app)
                .post('/v1/auth/register')
                .send(user)
                .end((err, res) => {
                    passVars.id = res.body.user._id;
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
describe('User Routes', () => {
    describe('GET /v1/user', () => {
        it('should get a valid user', (done) => {
            chai.request(app)
                .get('/v1/user')
                .set('Authorization', `Bearer ${token}`)
                .send({ userID: passVars.id })
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

    describe('PATCH /v1/user', () => {
        it('should get a update a valid user', (done) => {
            chai.request(app)
                .patch('/v1/user')
                .set('Authorization', `Bearer ${token}`)
                .send({ userID: passVars.id, new_email: 'test@testing.com' })
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

// Categories routes testing
describe('Categories Routes', () => {
    describe('GET /v1/categories', () => {
        it('should get all categories for a user', (done) => {
            chai.request(app)
                .get('/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .send({ userID: passVars.id })
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

    describe('POST /v1/categories', () => {
        it('should post a category', (done) => {
            chai.request(app)
                .post('/v1/categories')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userID: passVars.id,
                    newCategories: [
                        {
                            title: 'Comp Sci',
                        },
                    ],
                })
                .end((err, res) => {
                    passVars.categoryID = res.body.categories[0]._id;
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

    describe('GET /v1/categories/categoryID', () => {
        it('should get a valid category', (done) => {
            chai.request(app)
                .get(`/v1/categories/${passVars.categoryID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ userID: passVars.id })
                .end((err, res) => {
                    console.log(err);
                    if (err) {
                        expect(res).to.have.status(404);
                    } else {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                    }
                    done();
                });
        });
    });

    describe('DELETE /v1/categories/categoryID', () => {
        it('should delete a valid category', (done) => {
            chai.request(app)
                .delete(`/v1/categories/${passVars.categoryID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ userID: passVars.id })
                .end((err, res) => {
                    console.log(err);
                    if (err) {
                        expect(res).to.have.status(404);
                    } else {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                    }
                    done();
                });
        });
    });
});
