import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/main';

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('POST /sign-in', () => {
    it('should return a token if the email and password are correct', (done) => {
        chai.request(app)
            .post('/sign-in')
            .send({
                email: 'admin@gmail.com',
                password: 'password123',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('Login successful');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data.user).to.be.an('object');
                expect(res.body.data.user.username).to.equal('Admin');
                expect(res.body.data.user.id).to.equal('640dcee1bfd1d98510537f65');
                expect(res.body.data.user.email).to.equal('admin@gmail.com');
                expect(res.body.data.token).to.be.a('string');
                expect(res.body.data.refreshToken).to.be.a('string');
                done();
            });
    });

    it('should return a 400 error if the email or password is missing', (done) => {
        chai.request(app)
            .post('/sign-in')
            .send({
                email: '',
                password: '',
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message').equal('`Email` + `Password` are required fields');
                done();
            });
    });


    it('should return a 400 error if the email  is invalid', (done) => {
        chai.request(app)
            .post('/sign-in')
            .send({
                email: 'aa',
                password: 'amdasadasl',
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message').equal('Email is invalid');
                done();
            });
    });

    it('should return a 400 error if the password is invalid', (done) => {
        chai.request(app)
            .post('/sign-in')
            .send({
                email: 'admin@gmail.com',
                password: '123',
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message').equal('Password is invalid');
                done();
            });
    });

    it('should return a 401 error if the email  is incorrect', (done) => {
        chai.request(app)
            .post('/sign-in')
            .send({
                email: 'aaa@gmail.com',
                password: 'password123',
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message').equal('Email do not match');
                done();
            });
    });

    it('should return a 401 error if the password  is incorrect', (done) => {
        chai.request(app)
            .post('/sign-in')
            .send({
                email: 'admin@gmail.com',
                password: 'amdasadasl',
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message').equal('Password do not match');
                done();
            });
    });
});