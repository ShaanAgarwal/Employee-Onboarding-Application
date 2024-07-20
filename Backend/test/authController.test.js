const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/userSchema');
const { uploadFile } = require('../utils/uploadFile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../utils/uploadFile');

describe('Auth Controller', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('POST /register', () => {
    it('should register a new user with a valid image', async () => {
      const mockHash = 'hashedPassword';
      bcrypt.hash.mockResolvedValue(mockHash);

      const mockFile = { originalname: 'test.jpg', buffer: Buffer.from('file') };
      uploadFile.mockResolvedValue({ id: 'fileId' });

      const response = await request(app)
        .post('/register')
        .attach('file', mockFile.buffer, mockFile.originalname)
        .field('name', 'Test User')
        .field('email', 'test@example.com')
        .field('password', 'password')
        .field('role', 'candidate');

      expect(response.status).toBe(200);
      expect(response.text).toBe('User registered with image');
    });

    it('should handle missing fields gracefully', async () => {
      const response = await request(app)
        .post('/register')
        .field('name', 'Test User')
        .field('email', 'test@example.com')
        .field('password', 'password')
        .field('role', 'candidate');

      expect(response.status).toBe(500);
    });

    it('should handle file upload errors', async () => {
      const mockHash = 'hashedPassword';
      bcrypt.hash.mockResolvedValue(mockHash);

      const mockFile = { originalname: 'test.jpg', buffer: Buffer.from('file') };
      uploadFile.mockRejectedValue(new Error('File upload error'));

      const response = await request(app)
        .post('/register')
        .attach('file', mockFile.buffer, mockFile.originalname)
        .field('name', 'Test User')
        .field('email', 'test@example.com')
        .field('password', 'password')
        .field('role', 'candidate');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('An error occurred');
    });
  });

  describe('POST /login', () => {
    it('should login an existing user and return a token', async () => {
      const mockUser = {
        _id: 'userId',
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
        role: 'candidate',
      };

      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mockToken');

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        token: 'mockToken',
        userId: 'userId',
        email: 'test@example.com',
        role: 'candidate',
      });
    });

    it('should return 401 if user does not exist', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);

      const response = await request(app)
        .post('/login')
        .send({ email: 'nonexistent@example.com', password: 'password' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should return 401 if password does not match', async () => {
      const mockUser = {
        _id: 'userId',
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
        role: 'candidate',
      };

      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'wrongPassword' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should handle JWT sign errors', async () => {
      const mockUser = {
        _id: 'userId',
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
        role: 'candidate',
      };

      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockImplementation(() => { throw new Error('JWT Error'); });

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('An error occurred');
    });
  });
});
