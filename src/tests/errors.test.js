/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

describe('Error Handling tests', () => {
    beforeAll((done) => {
        done();
    });

    afterAll((done) => {
        mongoose.connection.close();
        done();
    });

    it('should retrun "Resouce not found" when you get from the wrong url', async () => {
        const res = await request(app).get('/url');
        expect(res.status).toEqual(404);
        expect(res.body).toEqual({ message: 'Resource not found' });
    });
    it('should retrun "Resouce not found" when you post to the wrong url', async () => {
        const res = await request(app).post('/url');
        expect(res.status).toEqual(404);
        expect(res.body).toEqual({ message: 'Resource not found' });
    });
    it('should retrun "Resouce not found" when you patch to the wrong url', async () => {
        const res = await request(app).patch('/url');
        expect(res.status).toEqual(404);
        expect(res.body).toEqual({ message: 'Resource not found' });
    });
    it('should retrun "Resouce not found" when you delete from the wrong url', async () => {
        const res = await request(app).delete('/url');
        expect(res.status).toEqual(404);
        expect(res.body).toEqual({ message: 'Resource not found' });
    });
    it('should retrun "Resouce not found" when you put from the wrong url', async () => {
        const res = await request(app).put('/url');
        expect(res.status).toEqual(404);
        expect(res.body).toEqual({ message: 'Resource not found' });
    });
});
