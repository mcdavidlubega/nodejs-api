/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { createUsers, deleteUsers } from './testData/usersTestData';
import { createAnswers, deleteAnswers } from './testData/answersTestData';
import { createQuestions, deleteQuestions } from './testData/questionsTestData';
import { createComments, deleteComments } from './testData/commentsTestData';

import { qIds, aIds, cIds } from './testData/dataIds';

describe('Comments Tests', () => {
    let token;
    let currentUserId;
    const { id1 } = qIds;
    const { aid1, aid2, aid3, aid9 } = aIds;
    const { cid1, cid2, cid4, cid14 } = cIds;

    beforeAll((done) => {
        done();
    });

    // eslint-disable-next-line func-names
    beforeEach(async function () {
        await createUsers();
        await createQuestions();
        await createAnswers();
        await createComments();

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
        await deleteComments();
    });

    afterAll((done) => {
        mongoose.connection.close();
        done();
    });

    it('should get all comments on a specific answer', async () => {
        const res = await request(app).get(
            `/api/v1/questions/${id1}/answers/${aid1}/comments`
        );
        expect(res.status).toEqual(200);
        expect(res.body.Comments[0]).toMatchObject({
            answerId: aid1,
            comment: 'This is a comment on answer for question 1',
        });
    });
    it('should not get comments on a specific answer if there are no comments', async () => {
        const res = await request(app).get(
            `/api/v1/questions/${id1}/answers/${aid3}/comments`
        );
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            message: 'Could not find any comments for this answer',
        });
    });
    it('should not get comments on a specific answer if the answer doesnt exist', async () => {
        const res = await request(app).get(
            `/api/v1/questions/${id1}/answers/${aid9}/comments`
        );
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            message: 'Answer does not exist',
        });
    });
    it('should get a specific comment', async () => {
        const res = await request(app).get(
            `/api/v1/questions/${id1}/answers/${aid3}/comments/${cid4}`
        );
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject({
            Comment: {
                _id: cid4,
                answerId: aid2,
                comment: 'This is a comment on answer for question 2',
            },
        });
    });
    it('should not get a specific comment if the comment doesnt exist', async () => {
        const res = await request(app).get(
            `/api/v1/questions/${id1}/answers/${aid2}/comments/${cid14}`
        );
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Comment does not exist' });
    });
    it('should not get a specific comment if the answer doesnt exist', async () => {
        const res = await request(app).get(
            `/api/v1/questions/${id1}/answers/${aid9}/comments/${cid4}`
        );
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ message: 'Answer does not exist' });
    });

    it('should post a comment if the user is logged in', async () => {
        const res = await request(app)
            .post(`/api/v1/questions/${id1}/answers/${aid2}/comments`)
            .set({ 'auth-token': token })
            .send({
                comment: 'This is a test comment',
            });
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject({
            answerId: aid2,
            comment: 'This is a test comment',
        });
    });
    it('should not post a comment if the user is not logged in', async () => {
        const res = await request(app)
            .post(`/api/v1/questions/${id1}/answers/${aid2}/comments`)
            .send({
                comment: 'This is a test comment',
            });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'Access denied' });
    });
    it('should update comment if user is logged in and is the author', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid1}/comments/${cid1}`)
            .set({ 'auth-token': token })
            .send({ comment: 'This is the edited comment' });
        expect(res.status).toEqual(201);
        expect(res.body).toMatchObject({
            _id: cid4,
            comment: 'This is the edited comment',
        });
    });
    it('should not update a comment if user is not logged in', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid3}/comments/${cid4}`)
            .send({ comment: 'This is the edited comment' });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'Access denied' });
    });
    it('should not update a comment if user is not the author', async () => {
        const res = await request(app)
            .patch(`/api/v1/questions/${id1}/answers/${aid3}/comments/${cid4}`)
            .set({ 'auth-token': token })
            .send({ comment: 'This is the edited comment' });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'You are not the author' });
    });
    it('should delete a comment if user is logged in and is the author', async () => {
        const res = await request(app)
            .delete(`/api/v1/questions/${id1}/answers/${aid1}/comments/${cid1}`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject({
            message: 'Comment deleted',
            deletedComment: {
                acknowledged: true,
                deletedCount: 1,
            },
        });
    });
    it('should not delete a comment if user is not logged in', async () => {
        const res = await request(app).delete(
            `/api/v1/questions/${id1}/answers/${aid3}/comments/${cid4}`
        );
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({ message: 'Access denied' });
    });
    it('should not delete a comment if user is not the author', async () => {
        const res = await request(app)
            .delete(`/api/v1/questions/${id1}/answers/${aid1}/comments/${cid2}`)
            .set({ 'auth-token': token });
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
            message: 'Not author',
        });
    });
});
