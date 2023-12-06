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

    describe('GET /v1/categories/:categoryID', () => {
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
});

// Stack routes testing
describe('Stack Routes', () => {
    describe('POST /v1/stacks', () => {
        it('should post a stack', (done) => {
            chai.request(app)
                .post('/v1/stacks')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userID: passVars.id,
                    categoryID: passVars.categoryID,
                    newStacks: [{ title: 'Chemistry' }],
                })
                .end((err, res) => {
                    passVars.stackID = res.body.stacks[0]._id;
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

    describe('GET /v1/stacks', () => {
        it('should get all stacks for a user', (done) => {
            chai.request(app)
                .get('/v1/stacks')
                .set('Authorization', `Bearer ${token}`)
                .send({ userID: passVars.id, categoryID: passVars.categoryID })
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

// Card Routes
describe('Card Routes', () => {
    describe('POST /v1/cards', () => {
        it('should post a card', (done) => {
            chai.request(app)
                .post('/v1/cards')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userID: passVars.id,
                    categoryID: passVars.categoryID,
                    stackID: passVars.stackID,
                    newCards: [
                        {
                            content: '1 + 1',
                            answer: '2',
                        },
                    ],
                })
                .end((err, res) => {
                    passVars.cardID = res.body.cards[0]._id;
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

    describe('PATCH /v1/cards/:cardID', () => {
        it('should update a card', (done) => {
            chai.request(app)
                .patch(`/v1/cards/${passVars.cardID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userID: passVars.id,
                    categoryID: passVars.categoryID,
                    stackID: passVars.stackID,
                    cardUpdates: {
                        content: '2+1',
                        answer: '3',
                    },
                })
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

    describe('GET /v1/cards', () => {
        it('should get all cards', (done) => {
            chai.request(app)
                .get('/v1/cards')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userID: passVars.id,
                    categoryID: passVars.categoryID,
                    stackID: passVars.stackID,
                })
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

// Test delete routes after other testing is completed
describe('DELETE Routes', () => {
    describe('DELETE /v1/cards/:cardID', () => {
        it('should delete a card', (done) => {
            chai.request(app)
                .delete(`/v1/cards/${passVars.cardID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userID: passVars.id,
                    categoryID: passVars.categoryID,
                    stackID: passVars.stackID,
                })
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

    describe('DELETE /v1/stacks/:stackID', () => {
        it('should delete a stack', (done) => {
            chai.request(app)
                .delete(`/v1/stacks/${passVars.stackID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ userID: passVars.id, categoryID: passVars.categoryID })
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

    describe('DELETE /v1/categories/:categoryID', () => {
        it('should delete a valid category', (done) => {
            chai.request(app)
                .delete(`/v1/categories/${passVars.categoryID}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ userID: passVars.id })
                .end((err, res) => {
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
