import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { v4 } from 'uuid';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/users (POST)', async () => {
    const email = `${v4()}@email.com`;

    const response = await request(app.getHttpServer())
      .post('/api/users')
      .send({
        email,
        password: '1234565',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(email);
  });

  it('/api/users (POST) (duplicate user)', async () => {
    const email = `${v4()}@email.com`;

    await request(app.getHttpServer())
      .post('/api/users')
      .send({
        email,
        password: '1234565',
      })
      .expect(201);

    return request(app.getHttpServer())
      .post('/api/users')
      .send({
        email,
        password: '1234565',
      })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
