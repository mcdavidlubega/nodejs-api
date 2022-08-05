/* eslint-disable no-undef */
import request from 'supertest';
import app from '../app';
import User from '../models/Users';

describe('questions route', () => {
    let token;
    beforeEach(async function () {
        await request(app).post('/api/v1/auth/register').send({
            username: 'martin',
            email: 'martin@gmail.com',
            password: '12345678',
        });

        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'martin@gmail.com',
            password: '12345678',
        });
        token = res.body.token;
    });
    it('get all questions', async () => {
        const res = await request(app).get('/api/v1/questions');
        expect(res.status).toBe(200);
    });

    afterEach(async function () {
        await User.deleteMany({});
    });

    it('should post a questions', async () => {
        const res = await request(app)
            .post('/api/v1/questions')
            .set('auth-token', `${token}`)
            .send({
                title: 'Whats the question',
                description: 'Who the hell knows what it is',
            });
        expect(res.status).toBe(201);
    });
});
