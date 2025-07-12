const request = require('supertest');
const app = require('../index'); // Adjust path as needed
const mongoose = require('mongoose');
const User = require('../models/userSchema');
const SwapRequest = require('../models/swaprequestschema');

let senderToken = '';
let receiverToken = '';
let createdSwapId = '';
let receiverId = '';

// Setup two users and log them in
beforeAll(async () => {
  // Clean up before test
  await User.deleteMany({});
  await SwapRequest.deleteMany({});

  // Register sender
  await request(app).post('/api/users/register').send({
    name: 'Sender',
    email: 'sender@test.com',
    password: 'password123',
  });

  // Register receiver
  await request(app).post('/api/users/register').send({
    name: 'Receiver',
    email: 'receiver@test.com',
    password: 'password123',
  });

  // Login sender
  const senderRes = await request(app)
    .post('/api/users/login')
    .send({ email: 'sender@test.com', password: 'password123' });

  senderToken = senderRes.headers['set-cookie'][0];

  // Login receiver
  const receiverRes = await request(app)
    .post('/api/users/login')
    .send({ email: 'receiver@test.com', password: 'password123' });

  receiverToken = receiverRes.headers['set-cookie'][0];

  // Get receiver ID
  const receiverUser = await User.findOne({ email: 'receiver@test.com' });
  receiverId = receiverUser._id;
});

describe('Swap API', () => {
  it('should create a new swap request', async () => {
    const res = await request(app)
      .post('/api/swaps')
      .set('Cookie', senderToken)
      .send({
        toUser: receiverId,
        skillOffered: 'React',
        skillWanted: 'Photoshop',
        message: 'Let’s trade skills!',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.skillOffered).toBe('React');
    createdSwapId = res.body._id;
  });

  it('should fetch user swaps (sent & received)', async () => {
    const res = await request(app)
      .get('/api/swaps/my-swaps')
      .set('Cookie', senderToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.sent.length).toBeGreaterThan(0);
    expect(res.body.received.length).toBe(0);
  });

  it('receiver should accept the swap', async () => {
    const res = await request(app)
      .patch(`/api/swaps/${createdSwapId}/accept`)
      .set('Cookie', receiverToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('accepted');
  });

  it('receiver should complete the swap', async () => {
    const res = await request(app)
      .patch(`/api/swaps/${createdSwapId}/complete`)
      .set('Cookie', receiverToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('completed');
  });

  it('sender should cancel a swap (should fail since completed)', async () => {
    const res = await request(app)
      .delete(`/api/swaps/${createdSwapId}/cancel`)
      .set('Cookie', senderToken);

    expect(res.statusCode).toBe(403); // ideally forbidden
  });
});

// Disconnect DB
afterAll(async () => {
  await mongoose.disconnect();
});