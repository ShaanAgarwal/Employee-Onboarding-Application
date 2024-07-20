const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const rejectedCandidates = require('../models/rejectedCandidateSchema');
const Chat = require('../models/chatSchema');
const authMiddleware = require('../middleware/authMiddleware');
const app = express();
app.use(express.json());
app.use('/api', require('../routes/adminRoutes'));

const MONGO_URI = 'mongodb://localhost:27017/testdb';
const JWT_SECRET = "sjdkfhajskdfhaksjdfh";

let validToken;

beforeAll(async () => {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const testUser = await User.create({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password',
        role: 'candidate',
    });
    validToken = jwt.sign({ userId: testUser._id }, JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

describe('Admin Controller Tests', () => {
    let testUser, testHr, testRejectedCandidate, testChat;

    beforeEach(async () => {
        testUser = await User.create({
            name: 'Test User',
            email: `testuser_${Date.now()}@example.com`,
            password: 'password',
            role: 'candidate',
        });

        testHr = await User.create({
            name: 'Test HR',
            email: `testhr_${Date.now()}@example.com`,
            password: 'password',
            role: 'hr',
        });

        testRejectedCandidate = await rejectedCandidates.create({
            name: 'Rejected User',
            email: `rejecteduser_${Date.now()}@example.com`,
            photo: 'photo-url',
            rejectionReason: 'Reason',
            rejectionRound: 1,
        });

        testChat = await Chat.create({
            candidate: testUser._id,
            hr: testHr._id,
        });
    });

    afterEach(async () => {
        await User.deleteMany({});
        await rejectedCandidates.deleteMany({});
        await Chat.deleteMany({});
    });

    test('should get admin details successfully', async () => {
        const res = await request(app)
            .get(`/api/admin-details?email=${testUser.email}`)
            .set('Authorization', `${validToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe(testUser.email);
    });

    test('should return 404 if admin not found', async () => {
        const res = await request(app)
            .get('/api/admin-details?email=nonexistent@example.com')
            .set('Authorization', `${validToken}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('User not found.');
    });

    test('should get all rejected candidates', async () => {
        const res = await request(app)
            .get('/api/get-rejected-candidates')
            .set('Authorization', `${validToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.rejected.length).toBe(1);
    });

    test('should get all candidates', async () => {
        const res = await request(app)
            .get('/api/getCandidates')
            .set('Authorization', `${validToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });

    test('should get all HRs', async () => {
        const res = await request(app)
            .get('/api/getHRs')
            .set('Authorization', `${validToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });

    test('should assign HR successfully', async () => {
        const res = await request(app)
            .post(`/api/assign-hr/${testUser._id}`)
            .send({ hrId: testHr._id })
            .set('Authorization', `${validToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('HR assigned successfully');
    });

    test('should return 404 when HR to be assigned is not found', async () => {
        const res = await request(app)
            .post(`/api/assign-hr/${testUser._id}`)
            .send({ hrId: new mongoose.Types.ObjectId() })
            .set('Authorization', `${validToken}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Assigned HR not found');
    });

    test('should update interview rounds successfully', async () => {
        const res = await request(app)
            .post(`/api/update-rounds/${testUser._id}`)
            .send({ rounds: 3 })
            .set('Authorization', `${validToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Interview rounds updated successfully');
    });

    test('should get all HRs successfully', async () => {
        const res = await request(app)
            .get('/api/getAllHRs')
            .set('Authorization', `${validToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].email).toBe(testHr.email);
    });

    test('should get ongoing candidates successfully', async () => {
        const res = await request(app)
            .get('/api/get-ongoing-candidates')
            .set('Authorization', `${validToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.candidates.length).toBe(1);
    });

    test('should return 401 for unauthorized requests', async () => {
        const res = await request(app)
            .get('/api/getCandidates');
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Auth Failed');
    });

    test('should return 401 for invalid token', async () => {
        const res = await request(app)
            .get('/api/getCandidates')
            .set('Authorization', 'Bearer invalid_token');
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Auth Failed');
    });

    test('should return 400 for bad requests', async () => {
        const res = await request(app)
            .post(`/api/assign-hr/${testUser._id}`)
            .send({ hrId: 'invalid_id' })
            .set('Authorization', `${validToken}`);
        expect(res.statusCode).toBe(500);
    });
});