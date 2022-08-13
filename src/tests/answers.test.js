/* eslint-disable no-undef */
import request from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import app from '../app';
import { createUsers, deleteUsers } from './testData/usersTestData';
import { createAnswers, deleteAnswers } from './testData/answersTestData';
import { createQuestions, deleteQuestions } from './testData/questionsTestData';

import { qIds, aIds } from './testData/dataIds';

describe('Answer Tests', () => {
    let token;
    let currentUserId;
    const { id1, id6 } = qIds;
    const { aid1, aid2, aid3, aid9 } = aIds;

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
        currentUserId = res.body.userId;
    });
    // eslint-disable-next-line func-names
    afterEach(async function () {
        await deleteUsers();
        await deleteQuestions();
        await deleteAnswers();
    });
    it('should post an answer to a question', async () => {
        const res = await request(app)
            .post(`/api/v1/questions/${id1}/answers`)
            .set({ 'auth-token': token })
            .send({
                answer: 'Here is an answer for the question',
            });
        expect(res.status).toEqual(201);
    });
    it('should not post an answer to a question if the user is not logged in', async () => {
        const res = await request(app)
            .post(`/api/v1/questions/${id1}/answers`)
            .send({
                answer: 'Here is an answer for the question',
            });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'Access denied' });
    });
    it('should not post an empty  answer to a question ', async () => {
        const res = await request(app)
            .post(`/api/v1/questions/${id1}/answers`)
            .send({
                answer: '',
            });
        expect(res.status).toEqual(400);
        expect(res.body).toMatchObject({ message: 'Validation failed' });
    });
    it('should return all answers for a specific question', async () => {
        const res = await request(app).get(`/api/v1/questions/${id1}/answers`);
        expect(res.status).toEqual(200);
        expect(res.body.answers[0]).toMatchObject({
            questionId: id1,
            answer: 'First answer for question 1',
        });
    });
    it('should update answer if user is logged in and is the author of the answer', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid1}`)
            .set({ 'auth-token': token })
            .send({
                answer: 'This is the updated answer',
            });
        expect(res.status).toEqual(201);
        expect(res.body).toMatchObject({
            _id: aid1,
            answer: 'This is the updated answer',
            questionId: id1,
        });
    });
    it('should not update answer if user is not logged in', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid1}`)
            .send({
                answer: 'This is the updated answer',
            });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'Access denied' });
    });
    it('should not update answer if user is not the author of the answer', async () => {
        const uid = new mongoose.Types.ObjectId();
        const otherToken = jwt.sign(
            { userId: uid, role: 'user' },
            process.env.TOKEN_SECRET
        );
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid1}`)
            .set({ 'auth-token': otherToken })
            .send({
                answer: 'This is the updated answer',
            });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'Not author' });
    });
    it('should not update answer if the question does not exist', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id6}/answers/${aid1}`)
            .set({ 'auth-token': token })
            .send({
                answer: 'This is the updated answer',
            });
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Question not found' });
    });
    it('should not update answer if the answer does not exist', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid9}`)
            .set({ 'auth-token': token })
            .send({
                answer: 'This is the updated answer',
            });
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Answer not found' });
    });
    it('should upvote answer if the user is logged in', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid1}/upvote`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(200);
        expect(res.body.upvotes).toEqual(
            expect.arrayContaining([currentUserId])
        );
        expect(res.body.downvotes).toEqual(
            expect.not.arrayContaining([currentUserId])
        );
    });
    it('should not upvote answer if the user is not logged in', async () => {
        const res = await request(app).patch(
            `/api/v1/questions/${id1}/answers/${aid1}/upvote`
        );
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'Access denied' });
    });
    it('should not upvote answer if the user has already voted', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid3}/upvote`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'You already voted' });
    });
    it('should downvote answer if the user is logged in', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid3}/downvote`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(200);
        expect(res.body.downvotes).toEqual(
            expect.arrayContaining([currentUserId])
        );
        expect(res.body.upvotes).toEqual(
            expect.not.arrayContaining([currentUserId])
        );
    });
    it('should not downvote answer if the user is not logged in', async () => {
        const res = await request(app).patch(
            `/api/v1/questions/${id1}/answers/${aid1}/downvote`
        );
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'Access denied' });
    });
    it('should not downvote answer if the user has already voted', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid2}/downvote`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'You already voted' });
    });
    it('should reset the vote on answer if the user is logged in', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid3}/resetvote`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(200);
        expect(res.body.downvotes).toEqual(
            expect.not.arrayContaining([currentUserId])
        );
        expect(res.body.upvotes).toEqual(
            expect.not.arrayContaining([currentUserId])
        );
    });
    it('should not reset the vote on answer if the user is not logged in', async () => {
        const res = await request(app).patch(
            `/api/v1/questions/${id1}/answers/${aid1}/resetvote`
        );
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'Access denied' });
    });
    it('should not downvote answer if the answer does not exist', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid9}/resetvote`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Answer not found' });
    });
    it('should delete answer if the user is logged in and is the author', async () => {
        const res = await request(app)
            .delete(`/api/v1/questions/${id1}/answers/${aid1}`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject({
            message: 'Answer Deleted ',
        });
    });
    it('should not delete answer if the user is  not logged in', async () => {
        const res = await request(app).delete(
            `/api/v1/questions/${id1}/answers/${aid1}`
        );
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
            message: 'Access denied',
        });
    });
    it('should not delete answer if the user is not the author', async () => {
        const res = await request(app)
            .delete(`/api/v1/questions/${id1}/answers/${aid3}`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
            message: 'Not author',
        });
    });
    it('should fail if the answer does not exist', async () => {
        const res = await request(app)
            .delete(`/api/v1/questions/${id1}/answers/${aid9}`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Answer not found' });
    });
    it('should fail if the question does not exist', async () => {
        const res = await request(app)
            .delete(`/api/v1/questions/${id6}/answers/${aid1}`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Question not found' });
    });
});
