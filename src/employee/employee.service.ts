import { Injectable } from '@nestjs/common';
import { EmployeeModel } from './employee.model';

@Injectable()
export class EmployeeService {
  async findOneById(id: number): Promise<EmployeeModel> {
    return await EmployeeModel.findOne(id);
  }

  async benefitsLeftToSpend(month: number): Promise<EmployeeModel[]> {
    return await EmployeeModel.query(
      `select *
        from (
         select
            e."Company ID" as "companyID",
            e."Company Title" as "companyTitle",
            orders."Employee ID" as "employeeID",
            e."Employee Name" as "employeeName",
            e."Monthly Budget" as "monthlyBudget",
            extract(Month from orders."Order Date"::date) as monthly,
            sum(v."Voucher Amount") as spend
            from public.orders
                left join employees e on orders."Employee ID" = e."Employee ID"
                left join vouchers v on orders."Voucher ID" = v."Voucher ID"
            group by monthly ,e."Company ID", e."Company Title",orders."Employee ID", e."Employee Name",e."Monthly Budget"
            ) as l
        where monthly = ${month} and "monthlyBudget" - spend > 10`,
    );
  }
}
