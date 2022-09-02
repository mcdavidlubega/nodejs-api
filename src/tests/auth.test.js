/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

import { createUsers, deleteUsers } from './testData/usersTestData';
import { uIds } from './testData/dataIds';

describe('Authentication Tests', () => {
    // eslint-disable-next-line no-unused-vars
    let token;
    const { uid1 } = uIds;

    beforeAll((done) => {
        done();
    });

    // eslint-disable-next-line func-names
    beforeEach(async function () {
        await createUsers();
    });
    // eslint-disable-next-line func-names
    afterEach(async function () {
        await deleteUsers();
    });

    afterAll((done) => {
        mongoose.connection.close();
        done();
    });

    it('it should generate a token for a user if they are registered', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'user1@gmail.com',
            password: '12345678',
        });
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject({
            userId: uid1,
            username: 'user1',
            email: 'user1@gmail.com',
            password: '********',
            token: expect.stringMatching(/^(?:[\w-]*\.){2}[\w-]*$/),
        });
    });
    it('it should not login if the user provides the wrong email', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'user10@gmail.com',
            password: '12345678',
        });
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Invalid Email' });
    });
    it('it should not login if the user does not provide an email', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: '',
            password: '12345678',
        });
        expect(res.status).toEqual(400);
        expect(res.body.validation.body.message).toEqual(
            '"email" is not allowed to be empty'
        );
    });
    it('it should not login if the user provides the wrong password', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'user1@gmail.com',
            password: '1234567867',
        });
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Invalid Password' });
    });
    it('it should not login if the user does not provide a password', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'user1@gmail.com',
            password: '',
        });
        expect(res.status).toEqual(400);
        expect(res.body.validation.body.message).toEqual(
            '"password" is not allowed to be empty'
        );
    });
});
