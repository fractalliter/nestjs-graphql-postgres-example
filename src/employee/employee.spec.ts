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

  it('list all the employees grouped by company spend per month', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `{
               spendPerMonth(company: 1, month: 1) {
                    employeeID
                    employeeName
                    companyID
                    companyTitle
                    monthlyBudget
                    monthly
                    tax
                    total
               }
            }`,
        variables: {},
      })
      .expect(200);
  });

  it('list all the employees with their benefits left for the month over 10 euro', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `{
               getBenefitsLeft(month: 3){
                    employeeID
                    employeeName
                    monthlyBudget
                    companyID
                    companyTitle
               }
            }`,
        variables: {},
      })
      .expect(200);
  });
});
