import { Injectable } from '@nestjs/common';
import { EmployeeModel } from './employee.model';

@Injectable()
export class EmployeeService {
  async findOneById(id: number): Promise<EmployeeModel> {
    return await EmployeeModel.findOne(id);
  }
}
