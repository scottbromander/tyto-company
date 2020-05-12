import express = require('express');
import { Company } from './modules/Company';

const app: express.Application = express();

const company: Company = new Company();
company.init();

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Hello World');
});

app.get('/api/log', (req: express.Request, res: express.Response): void => {
  res.send(company.getFullHistory());
});

app.get(
  '/api/salary/total',
  (req: express.Request, res: express.Response): void => {
    res.send({ total_salary: company.getTotalSalary() });
  }
);

app.get(
  '/api/employee/current',
  (req: express.Request, res: express.Response): void => {
    res.send(company.getEmployees());
  }
);

app.listen(3000, (): void => {
  console.log(`Example app listening on port: 3000`);
});
