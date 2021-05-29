import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeResolver } from './employee/employee.resolver';
import { EmployeeService } from './employee/employee.service';
import { OrderService } from './order/order.service';
import { OrderResolver } from './order/order.resolver';
import { VoucherService } from './voucher/voucher.service';
import { VoucherResolver } from './voucher/voucher.resolver';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ['dist/**/*.model.js'],
      synchronize: false,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmployeeService,
    EmployeeResolver,
    OrderService,
    OrderResolver,
    VoucherService,
    VoucherResolver,
  ],
})
export class AppModule {}
