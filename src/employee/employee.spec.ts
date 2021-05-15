import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('Employee', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('list all the employees grouped by company', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send(
        JSON.stringify({
          operationName: null,
          query:
            '{\n' +
            '  spendPerMonth(company: 1, month: 1) {\n' +
            '    employeeID\n' +
            '    employeeName\n' +
            '    companyID\n' +
            '    companyTitle\n' +
            '    monthlyBudget\n' +
            '    monthly\n' +
            '    tax\n' +
            '    total\n' +
            '  }\n' +
            '}\n',
          variables: {},
        }),
      )
      .expect(200);
  });
});
