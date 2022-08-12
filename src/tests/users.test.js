/* eslint-disable no-undef */
import request from 'supertest';
import app from '../app';
import User from '../models/Users';

describe('authentication', () => {
    // eslint-disable-next-line no-unused-vars
    let token;
    // eslint-disable-next-line func-names
    beforeEach(async function () {
        await request(app).post('/api/v1/users/register').send({
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
    // eslint-disable-next-line func-names
    afterEach(async function () {
        await User.deleteMany({});
    });

    it('should fail to register a user if email already exists', async () => {
        const res = await request(app).post('/api/v1/users/register').send({
            username: 'xenic',
            email: 'martin@gmail.com',
            password: '12345678',
        });
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Email already exists' });
    });
    it('should fail to register a user if username already exists', async () => {
        const res = await request(app).post('/api/v1/users/register').send({
            username: 'martin',
            email: 'xenicmark@gmail.com',
            password: '12345678',
        });
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Username already exists' });
    });
    it('should register a user', async () => {
        const res = await request(app).post('/api/v1/users/register').send({
            username: 'xenic',
            email: 'xenicmark@gmail.com',
            password: '12345678',
        });
        expect(res.status).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining({
                username: 'xenic',
                email: 'xenicmark@gmail.com',
                password: '********',
                role: 'user',
            })
        );
    });
});
