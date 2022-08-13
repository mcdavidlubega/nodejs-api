/* eslint-disable no-undef */
import request from 'supertest';
import app from '../app';
import { createUsers, deleteUsers } from './testData/usersTestData';

describe('User Tests', () => {
    // eslint-disable-next-line no-unused-vars
    let token;
    // eslint-disable-next-line func-names
    beforeEach(async function () {
        await createUsers();

        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'user1@gmail.com',
            password: '12345678',
        });

        token = res.body.token;
    });
    // eslint-disable-next-line func-names
    afterEach(async function () {
        await deleteUsers();
    });

    it('should fail to register a user if email already exists', async () => {
        const res = await request(app).post('/api/v1/users/register').send({
            username: 'xenic',
            email: 'user1@gmail.com',
            password: '12345678',
        });
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Email already exists' });
    });
    it('should fail to register a user if username already exists', async () => {
        const res = await request(app).post('/api/v1/users/register').send({
            username: 'user1',
            email: 'xenicmark@gmail.com',
            password: '12345678',
        });
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Username already exists' });
    });
    it('should register a user', async () => {
        const res = await request(app).post('/api/v1/users/register').send({
            username: 'user6',
            email: 'user6@gmail.com',
            password: '12345678',
        });
        expect(res.status).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining({
                username: 'user6',
                email: 'user6@gmail.com',
                password: '********',
                role: 'user',
            })
        );
    });
});
