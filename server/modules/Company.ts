import { Employee } from "./Employee";
import { Position } from "./enums/Position";
import randomNumber from "./utils/randomNumber";
import * as data from "./data/names.json";
import { HistoryLog } from "./utils/HistoryLog";

class EmployeeObjectIndex {
  public employee: Employee;
  public index: number;

  constructor(employee: Employee, index: number) {
    this.employee = employee;
    this.index = index;
  }
}

export class Company {
  private timer: Object = {};
  private timerCount: number = 0;
  private employees: Employee[] = [];
  private historyLog: HistoryLog = new HistoryLog();

  private readonly NUM_OF_STARTING_EMPLOYEES: number = 1200;
  private readonly INTERVAL_TICK: number = 0.01 * 1000;

  constructor() {}

  public init(): void {
    while (this.employees.length < this.NUM_OF_STARTING_EMPLOYEES) {
      this.createEmployee();
    }

    this.timer = setInterval(
      this.onTimerInterval.bind(this),
      this.INTERVAL_TICK
    );
  }

  private onTimerInterval(): void {
    this.timerCount++;
    this.randomEvent();
  }

  private randomEvent(): void {
    // Some random event happens here!
    const randomChance = randomNumber(1, 100);

    switch (randomChance) {
      case 1:
      case 5:
      case 6:
      case 7:
      case 8:
        console.log(randomChance);
        this.createEmployee();
        break;
      case 2:
        this.promoteEmployee();
        break;
      case 3:
        this.removeEmployee(true);
        break;
      case 4:
        this.removeEmployee(false);
        break;
    }
  }

  private createEmployee(): void {
    const newEmployee = new Employee();
    this.employees.push(newEmployee);
    this.historyLog.addNewEmployee(newEmployee);
  }

  private promoteEmployee(): void {
    const employeeObject: EmployeeObjectIndex = this.getRandomEmployee();
    const randomEmployee: Employee = employeeObject.employee;
    randomEmployee.promote();
    this.historyLog.promoteEmployee(randomEmployee);
  }

  private removeEmployee(quit?: boolean): void {
    if (this.employees.length <= 1) return;

    const employeeObject: EmployeeObjectIndex = this.getRandomEmployee();

    if (quit) {
      this.historyLog.quitEmployee(employeeObject.employee);
    } else {
      this.historyLog.fireEmployee(employeeObject.employee);
    }

    this.employees.splice(employeeObject.index, 1);
  }

  private getRandomEmployee(): EmployeeObjectIndex {
    const randomNum = randomNumber(0, this.employees.length - 1);

    return new EmployeeObjectIndex(this.employees[randomNum], randomNum);
  }

  public getFullHistory(): string[] {
    return this.historyLog.getLog();
  }

  public getTotalSalary(): number {
    let totalSalary: number = 0;

    for (let employee of this.employees) {
      totalSalary += employee.getSalary();
    }
    // TODO: Can I use type declare inside of a for/of loop? Why not?

    return totalSalary;
  }

  public getEmployees(): string[] {
    const namesOfEmployees: string[] = [];

    for (let employee of this.employees) {
      namesOfEmployees.push(employee.getFullName());
    }

    return namesOfEmployees;
  }
}
