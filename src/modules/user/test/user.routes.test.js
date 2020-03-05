import HTTPStatus from 'http-status';
import request from 'supertest-as-promised';
import { nuke } from '../../../helpers/test_helpers';
import User from '../user.model';
import server from '../../../server';

describe('User::Routes', async () => {
  beforeEach(async () => {
    await nuke();
  });

  it.only('should login successfully', async () => {
    await User.create({
      name: 'finney',
      email: 'test@email.com',
      password: 'password',
    });

    const res = await request(server).post('/api/users/login').send({
      email: 'test@email.com',
      password: 'password',
    });

    expect(res.statusCode).toBe(HTTPStatus.OK);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('token');
  });
});
