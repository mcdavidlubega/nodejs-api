/* eslint-disable no-undef */
import request from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import app from '../app';
import User from '../models/Users';
import Question from '../models/Questions';
import Answer from '../models/Answers';

describe('Question Tests', () => {
    // eslint-disable-next-line no-unused-vars
    let token;

    const id1 = new mongoose.Types.ObjectId();
    const id2 = new mongoose.Types.ObjectId();
    const id3 = new mongoose.Types.ObjectId();
    const id4 = new mongoose.Types.ObjectId();
    const id5 = new mongoose.Types.ObjectId();

    const aid1 = new mongoose.Types.ObjectId();
    const aid2 = new mongoose.Types.ObjectId();
    const aid3 = new mongoose.Types.ObjectId();
    const aid4 = new mongoose.Types.ObjectId();
    const aid5 = new mongoose.Types.ObjectId();
    const aid6 = new mongoose.Types.ObjectId();
    const aid7 = new mongoose.Types.ObjectId();
    const aid8 = new mongoose.Types.ObjectId();

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
        const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const { userId } = verifiedToken;

        await Question.insertMany(
            {
                _id: id1,
                userId,
                title: 'Question One',
                description: 'This is a description of question one',
            },
            {
                _id: id2,
                userId,
                title: 'Question Two',
                description: 'This is a description of question two',
            },
            {
                _id: id3,
                userId,
                title: 'Question Three',
                description: 'This is a description of question three',
            },
            {
                _id: id4,
                userId,
                title: 'Question Four',
                description: 'This is a description of question four',
            },
            {
                _id: id5,
                userId,
                title: 'Question Five',
                description: 'This is a description of question five',
            }
        );
        await Answer.insertMany(
            {
                _id: aid1,
                userId,
                questionId: id1,
                answer: 'Answer for question 1',
            },
            {
                _id: aid2,
                userId,
                questionId: id1,
                answer: 'Answer for question 1',
            },
            {
                _id: aid3,
                userId,
                questionId: id1,
                answer: 'Answer for question 1',
            },
            {
                _id: aid4,
                userId,
                questionId: id2,
                answer: 'Answer for question 2',
            },
            {
                _id: aid5,
                userId,
                questionId: id2,
                answer: 'Answer for question 2',
            },
            {
                _id: aid6,
                userId,
                questionId: id3,
                answer: 'Answer for question 3',
            },
            {
                _id: aid7,
                userId,
                questionId: id4,
                answer: 'Answer for question 4',
            },
            {
                _id: aid8,
                userId,
                questionId: id5,
                answer: 'Answer for question 5',
            }
        );
    });
    // eslint-disable-next-line func-names
    afterEach(async function () {
        await User.deleteMany({});
        await Question.deleteMany({});
        await Answer.deleteMany({});
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
        await Question.deleteMany({});
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
