/* eslint-disable no-undef */
import request from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import app from '../app';
import { createUsers, deleteUsers } from './testData/usersTestData';
import { createAnswers, deleteAnswers } from './testData/answersTestData';
import { createQuestions, deleteQuestions } from './testData/questionsTestData';

import { qIds, aIds } from './testData/dataIds';

describe('Question Tests', () => {
    // eslint-disable-next-line no-unused-vars
    let token;
    const { id1 } = qIds;
    const { aid1 } = aIds;

    beforeAll((done) => {
        done();
    });
    // eslint-disable-next-line func-names
    beforeEach(async function () {
        await createUsers();
        await createQuestions();
        await createAnswers();

        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'user1@gmail.com',
            password: '12345678',
        });
        token = res.body.token;
    });
    // eslint-disable-next-line func-names
    afterEach(async function () {
        await deleteUsers();
        await deleteQuestions();
        await deleteAnswers();
    });

    afterAll((done) => {
        mongoose.connection.close();
        done();
    });

    it('should get all questions', async () => {
        const res = await request(app).get('/api/v1/questions');
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: 'Question One',
                    description: 'This is a description of question one',
                }),
            ])
        );
    });
    it('should retun a message if there are no questions', async () => {
        await deleteQuestions();
        const res = await request(app).get('/api/v1/questions');
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ message: 'There are no questions' });
    });
    it('should post a question', async () => {
        const res = await request(app)
            .post('/api/v1/questions')
            .set({ 'auth-token': token })
            .send({
                title: 'Question One',
                description: 'This is a description of question one',
            });
        expect(res.status).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining({
                title: 'Question One',
                description: 'This is a description of question one',
            })
        );
    });
    it('should get a specific question', async () => {
        const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const { userId } = verifiedToken;
        const res = await request(app).get(`/api/v1/questions/${id1}`);
        expect(res.status).toEqual(200);
        expect(res.body.Question).toMatchObject({
            _id: id1,
            userId,
            title: 'Question One',
            description: 'This is a description of question one',
        });
    });
    it('should return an array of objects conatining the search term when you search', async () => {
        const res = await request(app)
            .post('/api/v1/questions/search/')
            .send({ search: 'One' });
        expect(res.status).toEqual(200);
        expect(res.body[0]).toMatchObject({
            _id: id1,
            title: 'Question One',
            description: 'This is a description of question one',
        });
    });
    it('should return "No questions found" if the search doesnt match any questions', async () => {
        const res = await request(app)
            .post('/api/v1/questions/search/')
            .send({ search: 'Six' });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'No questions found' });
    });
    /**
     * Todo: Look into making this test more reliable
     */
    it('should return the questions with the most answers', async () => {
        const res = await request(app).post('/api/v1/questions/top/');
        expect(res.status).toEqual(200);
        // console.log(res.body);
    });
    it('it should update a question if a user is logged in and is the author', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}`)
            .set({ 'auth-token': token })
            .send({
                title: 'Question 1',
                description: 'This is the descritpion of question 1',
                preferedAnswer: aid1,
            });
        expect(res.status).toEqual(201);
        expect(res.body).toMatchObject({
            title: 'Question 1',
            description: 'This is the descritpion of question 1',
            preferedAnswer: aid1,
        });
    });
    it('it should not update a question if the user is not logged in', async () => {
        const res = await request(app).patch(`/api/v1/questions/${id1}`).send({
            title: 'Question 1',
            description: 'This is the descritpion of question 1',
            preferedAnswer: aid1,
        });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
            message: 'Access denied',
        });
    });
    it('it should not update a question if the user is not', async () => {
        const uid = new mongoose.Types.ObjectId();
        const otherToken = jwt.sign(
            { userId: uid, role: 'user' },
            process.env.TOKEN_SECRET
        );
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}`)
            .set({ 'auth-token': otherToken })
            .send({
                title: 'Question 1',
                description: 'This is the descritpion of question 1',
                preferedAnswer: aid1,
            });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
            message: 'Not author',
        });
    });
    it('should delete a question if the user is logged in and is the author', async () => {
        const res = await request(app)
            .delete(`/api/v1/questions/${id1}`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            message: 'Question deleted',
            deltedQuestion: { acknowledged: true, deletedCount: 1 },
        });
    });
    it('should not delete a question if the user is not logged in', async () => {
        const res = await request(app).delete(`/api/v1/questions/${id1}`);
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
            message: 'Access denied',
        });
    });
    it('should not delete a question if the user is not the author', async () => {
        const uid = new mongoose.Types.ObjectId();
        const otherToken = jwt.sign(
            { userId: uid, role: 'user' },
            process.env.TOKEN_SECRET
        );
        const res = await request(app)
            .delete(`/api/v1/questions/${id1}`)
            .set({ 'auth-token': otherToken });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'Not author' });
    });
});
