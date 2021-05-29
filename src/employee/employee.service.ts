import { Injectable } from '@nestjs/common';
import { EmployeeModel } from './employee.model';
import { TaxDTO } from '../dto/TaxDTO';

@Injectable()
export class EmployeeService {
  findOneById(id: number): Promise<EmployeeModel> {
    return EmployeeModel.findOne(id);
  }

  benefitsLeftToSpend(month: number): Promise<EmployeeModel[]> {
    return EmployeeModel.query(
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
                right join employees e on orders."Employee ID" = e."Employee ID"
                left join vouchers v on orders."Voucher ID" = v."Voucher ID"
            group by monthly ,e."Company ID", e."Company Title",orders."Employee ID", e."Employee Name",e."Monthly Budget"
            ) as l
        where monthly = ${month} and "monthlyBudget" - spend > 10`,
    );
  }

  spendPerMonth(month: number, company: number): Promise<TaxDTO[]> {
    return EmployeeModel.query(`
        select *,
          case
             when (total <= 44) then 0
             when (total > 44) then (total - 44)
          end tax
        from (
           select
                  e."Company ID" as "companyID",
                  e."Company Title" as "companyTitle",
                  orders."Employee ID" as "employeeID",
                  e."Employee Name" as "employeeName",
                  e."Monthly Budget" as "monthlyBudget",
                  extract(Month from orders."Order Date"::date) as monthly,
                  sum(v."Voucher Amount") as total
           from public.orders
                    right join employees e on orders."Employee ID" = e."Employee ID"
                    left join vouchers v on orders."Voucher ID" = v."Voucher ID"
              group by monthly ,e."Company ID", e."Company Title",orders."Employee ID", e."Employee Name",e."Monthly Budget"
        ) as l
        where "companyID" = ${company} and monthly = ${month};`);
  }
}
