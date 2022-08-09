/* eslint-disable no-undef */
import request from 'supertest';
import app from '../app';
import User from '../models/Users';

const baseUrl = '/api/v1/';

describe('authentication', () => {
    let token;
    beforeEach(async function () {
        await request(app).post(`${baseUrl}auth/register`).send({
            username: 'martin',
            email: 'martin@gmail.com',
            password: '12345678',
        });

        const res = await request(app).post(`${baseUrl}auth/login`).send({
            email: 'martin@gmail.com',
            password: '12345678',
        });
        token = res.body.token;
    });
    afterEach(async function () {
        await User.deleteMany({});
    });

    it('should register a user', async () => {
        const res = await request(app).post(`${baseUrl}auth/register`).send({
            username: 'xenic',
            email: 'xenic@gmail.com',
            password: '12345678',
        });
        // console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                username: 'xenic',
                email: 'xenic@gmail.com',
                password: '********',
            })
        );
    });
    it('should fail if the username already exists', async () => {
        const res = await request(app).post(`${baseUrl}auth/register`).send({
            username: 'martin',
            email: 'xenic@gmail.com',
            password: '12345678',
        });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: 'Username already exists' });
    });

    it('should fail if the email already exists', async () => {
        const res = await request(app).post(`${baseUrl}auth/register`).send({
            username: 'xenic',
            email: 'martin@gmail.com',
            password: '12345678',
        });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: 'Email already exists' });
    });

    it('should return user details and token when logged in', async () => {
        const res = await request(app).post(`${baseUrl}auth/login`).send({
            email: 'martin@gmail.com',
            password: '12345678',
        });
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                username: 'martin',
                email: 'martin@gmail.com',
                password: '********',
                token,
            })
        );
    });

    it('should fail to login if the wrong email is submitted', async () => {
        const res = await request(app).post(`${baseUrl}auth/login`).send({
            email: 'xenic@gmail.com',
            password: '12345678',
        });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: 'Invalid Email' });
    });

    it('should fail to login if the wrong password is submitted', async () => {
        const res = await request(app).post(`${baseUrl}auth/login`).send({
            email: 'martin@gmail.com',
            password: '123456789',
        });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: 'Invalid Password' });
    });
});
