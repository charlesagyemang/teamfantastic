import HTTPStatus from 'http-status';
import request from 'supertest-as-promised';
import { nuke } from '../../../helpers/test_helpers';
import User from '../user.model';
import server from '../../../server';
import { disto, testSoapEndpoint } from '../../location/location.controller';

describe('User::Routes', async () => {
  beforeEach(async () => {
    await nuke();
  });

  it.skip('should login successfully', async () => {
    await User.create({
      name: 'finney',
      email: 'test@email.com',
      password: 'password',
    });

    const res = await request(server).post('/api/users/login').send({
      email: 'test@email.com',
      password: 'password',
    });

    // console.log(res.body);
    expect(res.statusCode).toBe(HTTPStatus.OK);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('token');
  });
});


it.skip('should check coordinates given successfully ', async () => {
  const locationCordinates = [
    ['5.627102, -0.303049'], ['5.627476, -0.302786'], // 59  meters ==> Within Range
    ['5.625596, -0.294573'], ['5.625760, -0.295073'], // 26  meters ==> Within Range
    ['5.623761, -0.294916'], ['5.624342, -0.296684'], // 91 meters ==> Outside Range
    ['5.622462, -0.173378'], ['5.624768, -0.177390'], // 362 meters ==> Outside Range
  ];
  const testResultsArray = ['51 Meters', '58 Meters', '206 Meters', '513 Meters'];

  const test1 = await disto(locationCordinates[0][0], locationCordinates[1][0]);
  const test2 = await disto(locationCordinates[2][0], locationCordinates[3][0]);
  const test3 = await disto(locationCordinates[4][0], locationCordinates[5][0]);
  const test4 = await disto(locationCordinates[6][0], locationCordinates[7][0]);


  // console.log(test4);
  expect(test1).toBe(testResultsArray[0]);
  expect(test2).toBe(testResultsArray[1]);
  expect(test3).toBe(testResultsArray[2]);
  expect(test4).toBe(testResultsArray[3]);
});


it.only('should test soap endpoint and get data successfully', async () => {
  testSoapEndpoint();
});
