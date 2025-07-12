const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); // Ensure index.js exports the Express app
const User = require('../models/userSchema');
const SwapRequest = require('../models/swaprequestschema');
const Feedback = require('../models/feedbackschema');
const { setUser } = require('../services/cookies');

let userA, userB;
let tokenA;
let completedSwap;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL);

  // Clear test collections
  await User.deleteMany({});
  await SwapRequest.deleteMany({});
  await Feedback.deleteMany({});

  // Create test users
  userA = await User.create({
    name: 'User A',
    email: 'usera@example.com',
    password: 'hashedPasswordA'
  });

  userB = await User.create({
    name: 'User B',
    email: 'userb@example.com',
    password: 'hashedPasswordB'
  });

  // Generate session token
  tokenA = setUser(userA);

  // Create a completed swap between A and B
  completedSwap = await SwapRequest.create({
    fromUser: userA._id,
    toUser: userB._id,
    skillOffered: 'React',
    skillWanted: 'Node.js',
    message: 'Let’s swap!',
    status: 'completed'
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Feedback Routes', () => {
  it('should create feedback for a completed swap', async () => {
    const res = await request(app)
      .post('/api/feedback')
      .set('Cookie', [`token=${tokenA}`])
      .send({
        swap: completedSwap._id,
        toUser: userB._id,
        rating: 5,
        comment: 'Excellent collaboration!'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.toUser).toBe(userB._id.toString());
    expect(res.body.rating).toBe(5);
  });

  it('should NOT allow feedback on a non-completed swap', async () => {
    const pendingSwap = await SwapRequest.create({
      fromUser: userA._id,
      toUser: userB._id,
      skillOffered: 'Design',
      skillWanted: 'Photoshop',
      message: 'New swap?',
      status: 'pending'
    });

    const res = await request(app)
      .post('/api/feedback')
      .set('Cookie', [`token=${tokenA}`])
      .send({
        swap: pendingSwap._id,
        toUser: userB._id,
        rating: 3,
        comment: 'Trying to send early'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/only be submitted after completion/i);
  });

  it('should fetch feedback for a specific user', async () => {
    const res = await request(app)
      .get(`/api/feedback/${userB._id}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('comment');
  });

  it('should fetch all feedbacks (admin use)', async () => {
    const res = await request(app)
      .get('/api/feedback')
      .set('Cookie', [`token=${tokenA}`]); // simulate login

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});