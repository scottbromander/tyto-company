import { Employee } from "../Employee";
import moment from "moment";
const currencyFormatter = require("currency-formatter");

export class HistoryLog {
  private log: string[] = [];

  constructor() {}

  public addNewEmployee(employee: Employee): void {
    const salary = currencyFormatter.format(employee.getSalary(), {
      code: "USD"
    });
    const timestamp = moment().format("lll");
    this.log.push(
      `${timestamp} - ${employee.getFullName()} joined the team as a ${employee.getPosition()} making ${salary}`
    );
  }

  public promoteEmployee(employee: Employee): void {
    const salary = currencyFormatter.format(employee.getSalary(), {
      code: "USD"
    });
    const timestamp = moment().format("lll");
    this.log.push(
      `${timestamp} - ${employee.getFullName()} was promoted to a ${employee.getPosition()} now making ${salary}`
    );
  }

  public fireEmployee(employee: Employee): void {
    const timestamp = moment().format("lll");
    this.log.push(`${timestamp} - ${employee.getFullName()} was FIRED!`);
  }

  public quitEmployee(employee: Employee): void {
    const timestamp = moment().format("lll");
    this.log.push(`${timestamp} - ${employee.getFullName()} quit! :(`);
  }

  public showHistory(): void {
    console.log(this.log);
  }

  public getLog(): string[] {
    return this.log;
  }
}
