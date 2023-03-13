import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/main';

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;
let token: string;

describe('POST /add-event', () => {
    before(async () => {
        const res = await chai.request(app)
            .post('/sign-in')
            .send({
                email: 'admin@gmail.com',
                password: 'password123',
            });

        token = res.body.data.token;
    });

    it('should create a new event', (done) => {
        chai.request(app)
            .post('/add-event')
            .set('Authorization', 'Bearer ' + `${token}`)
            .send({
                eventName: `${Math.random()}`,
                dueDate: new Date(2019 - 3 - 22),
                startDate: new Date(2017 - 3 - 22),
                description: 'HI',
            })
            .end((err, res) => {
                res.should.have.status(201);
                expect(res.body).to.be.an('object');
                res.body.should.have.property('message').eq('Event added successfully');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data.event).to.be.an('object');
                done();
            });
    });

    it('should return a 401 error if the eventName or startDate or dueDate is missing', (done) => {
        chai.request(app)
            .post('/add-event')
            .set('Authorization', 'Bearer ' + `${token}`)
            .send({
                eventName: '',
                startDate: '',
                dueDate: ''
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message').equal('Required fields');
                done();
            });
    });

    it('should return a 401 error if due date cannot be before start date', (done) => {
        chai.request(app)
            .post('/add-event')
            .set('Authorization', 'Bearer ' + `${token}`)
            .send({
                eventName: 'hai',
                dueDate: new Date(2016 - 3 - 22),
                startDate: new Date(2017 - 3 - 22),
                description: 'HI',
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message').equal('Due date cannot be before start date');
                done();
            });
    });

    it('should return a 401 error if event already exists', (done) => {
        chai.request(app)
            .post('/add-event')
            .set('Authorization', 'Bearer ' + `${token}`)
            .send({
                eventName: 'Team Meeting',
                startDate: new Date('2018-04-25T00:00:00Z'),
                dueDate: new Date('2023-04-25T00:00:00Z'),
                description: 'HI',
            })
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('message').equal('Event already exists');
                done();
            });
    });
});

describe('GET /get-all-events', () => {
    before(async () => {
        const res = await chai.request(app)
            .post('/sign-in')
            .send({
                email: 'admin@gmail.com',
                password: 'password123',
            });

        token = res.body.data.token;
    });

    it('should get all events', (done) => {
        chai.request(app)
            .get('/get-all-events')
            .set('Authorization', 'Bearer ' + `${token}`)
            .query({ pageNumber: 1 })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                res.body.should.have.property('message').eq('Events');
                done();
            });
    });
});

describe('PUT /update-event', () => {
    before(async () => {
        const res = await chai.request(app)
            .post('/sign-in')
            .send({
                email: 'admin@gmail.com',
                password: 'password123',
            });

        token = res.body.data.token;
    });

    it('should update an existing event', (done) => {
        chai.request(app)
            .post('/add-event')
            .set('Authorization', 'Bearer ' + `${token}`)
            .send({
                eventName: 'Event 1',
                startDate: new Date('2023-03-15T00:00:00Z'),
                dueDate: new Date('2023-03-16T00:00:00Z'),
                description: 'This is event 1',
            })
            .end((err, res) => {
                const eventId = res.body.data.event._id;
                chai.request(app)
                    .put('/update-event')
                    .set('Authorization', 'Bearer ' + `${token}`)
                    .query({ eventId })
                    .send({
                        eventName: 'Updated Event 1',
                        startDate: new Date('2023-03-20T00:00:00Z'),
                        dueDate: new Date('2023-03-22T00:00:00Z'),
                        description: 'This is the updated event 1',
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eq('Event updated successfully');
                        done();
                    });
            });
    });

    it('should return a 404 error if the event is not found', (done) => {
        const eventId = '640d89ba43ba394f899dc222';
        chai.request(app)
            .put('/update-event')
            .set('Authorization', 'Bearer ' + `${token}`)
            .query({ eventId })
            .send({
                eventName: 'Updated Event 1',
                startDate: new Date('2023-03-20T00:00:00Z'),
                dueDate: new Date('2023-03-22T00:00:00Z'),
                description: 'This is the updated event 1',
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message').equal('Event not found');
                done();
            });
    });

    it('should return a 401 error if the eventName or startDate or dueDate is missing', (done) => {
        chai.request(app)
            .post('/add-event')
            .set('Authorization', 'Bearer ' + `${token}`)
            .send({
                eventName: '',
                startDate: '',
                dueDate: ''
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message').equal('Required fields');
                done();
            });
    });

    it('should return a 401 error if due date cannot be before start date', (done) => {
        chai.request(app)
            .post('/add-event')
            .set('Authorization', 'Bearer ' + `${token}`)
            .send({
                eventName: 'hai',
                dueDate: new Date(2016 - 3 - 22),
                startDate: new Date(2017 - 3 - 22),
                description: 'HI',
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message').equal('Due date cannot be before start date');
                done();
            });
    });

    it('should return a 401 error if event already exists', (done) => {
        chai.request(app)
            .post('/add-event')
            .set('Authorization', 'Bearer ' + `${token}`)
            .send({
                eventName: 'Team Meeting',
                startDate: new Date('2018-04-25T00:00:00Z'),
                dueDate: new Date('2023-04-25T00:00:00Z'),
                description: 'HI',
            })
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('message').equal('Event already exists');
                done();
            });
    });
});

describe('POST /delete-event', () => {
    before(async () => {
        const res = await chai.request(app)
            .post('/sign-in')
            .send({
                email: 'admin@gmail.com',
                password: 'password123',
            });

        token = res.body.data.token;
    });

    it('should delete an existing event', (done) => {
        chai.request(app)
            .post('/add-event')
            .set('Authorization', 'Bearer ' + `${token}`)
            .send({
                eventName: `${Math.random()}`,
                startDate: new Date('2010-04-25T00:00:00Z'),
                dueDate: new Date('2023-04-25T00:00:00Z'),
                description: 'HI',
            })
            .end((err, res) => {
                const eventId = res.body.data.event._id;

                chai.request(app)
                    .post(`/delete-event`)
                    .set('Authorization', 'Bearer ' + `${token}`)
                    .query({ eventId })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eq('Event deleted successfully');
                        done();
                    });
            });
    });

    it('should return a 404 error if the event is not found', (done) => {
        const eventId = '640d89ba43ba394f899dc222';

        chai.request(app)
            .post(`/delete-event`)
            .set('Authorization', 'Bearer ' + `${token}`)
            .query({ eventId })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message').equal('Event not found');
                done();
            });
    });
});
