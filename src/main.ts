import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { EmployeeModel } from './employee/employee.model';
import { OrderModel } from './order/order.model';
import { VoucherModel } from './voucher/voucher.model';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap().then(async () => {
  try {
    await OrderModel.query('DROP TABLE IF EXISTS orders');
    await EmployeeModel.query('DROP TABLE IF EXISTS employees');
    await VoucherModel.query('DROP TABLE IF EXISTS vouchers');
    await EmployeeModel.query(
      `
            CREATE TABLE IF NOT EXISTS employees
            (
              "Employee ID"    INT PRIMARY KEY,
              "Employee Name"  text,
              "Monthly Budget" real,
              "Company ID"     INT,
              "Company Title"  text
            )
          `,
    );
    await VoucherModel.query(
      `
              CREATE TABLE IF NOT EXISTS vouchers
              (
                "Voucher ID"    INT PRIMARY KEY,
                "Voucher Amount"  real,
                "Partner ID" INT,
                "Partner Name" text
              )
            `,
    );
    await OrderModel.query(
      `
              CREATE TABLE IF NOT EXISTS orders
              (
                "Order ID"    INT PRIMARY KEY,
                "Order Date"  date,
                "Employee ID" INT,
                "Voucher ID" INT,
                FOREIGN KEY ("Employee ID") REFERENCES employees ("Employee ID"),
                FOREIGN KEY ("Voucher ID") REFERENCES vouchers ("Voucher ID")
              )
            `,
    );
  } catch (e) {
    console.error(e);
    return;
  }
  // Import employees into Database
  const stream = fs.createReadStream(`${__dirname}/assets/employees.csv`);
  let data = [];
  let allEmployees = [];
  stream.on('data', (d) => (data = d.toString().split('\n')));
  stream.on('end', async () => {
    allEmployees = data.slice(1, data.length).map((i) => {
      const employee = new EmployeeModel();
      const emp = i.replace(/\r/g, '').split(',');
      employee.employeeID = parseInt(emp[0]);
      employee.employeeName = emp[1];
      employee.monthlyBudget = emp[2];
      employee.companyID = emp[3];
      employee.companyTitle = emp[4];
      return employee;
    });
    // Import vouchers into Database
    const voucherStream = fs.createReadStream(
      `${__dirname}/assets/vouchers.csv`,
    );
    let voucherData = [];
    let allVouchers = [];
    voucherStream.on('data', (d) => (voucherData = d.toString().split('\n')));
    voucherStream.on('end', async () => {
      allVouchers = voucherData.slice(1, voucherData.length).map((i) => {
        const voucher = new VoucherModel();
        const vouch = i.replace(/\r/g, '').split(',');
        voucher.voucherID = parseInt(vouch[0]);
        voucher.voucherAmount = vouch[1];
        voucher.partnerID = vouch[2];
        voucher.partnerName = vouch[3];
        return voucher;
      });
      // Import orders into Database
      const orderStream = fs.createReadStream(`${__dirname}/assets/orders.csv`);
      let orderData = [];
      let allOrders = [];
      orderStream.on('data', (d) => (orderData = d.toString().split('\n')));
      orderStream.on('end', async () => {
        allOrders = orderData.slice(1, orderData.length).map((i) => {
          const order = new OrderModel();
          const ord = i.replace(/\r/g, '').split(',');
          order.orderID = parseInt(ord[0]);
          order.orderDate = ord[1];
          order.employee = ord[2];
          order.voucher = ord[3];
          return order;
        });
        try {
          await EmployeeModel.save(allEmployees, { transaction: true });
          await VoucherModel.save(allVouchers, { transaction: true });
          await OrderModel.save(allOrders, { transaction: true });
        } catch (e) {
          console.error(e);
        }
      });
    });
  });
});
