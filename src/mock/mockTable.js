import {v4 as uuidv4} from 'uuid';

const tableData = [
  {
    id: 1111,
    company_name: "Sber Bank",
    address: 'asfd asd',
  },
  {
    id: 2222,
    company_name: "alfa Bank",
    address: 'asfdasd',

  },
  {
    id: 3333,
    company_name: "Tinkoff Bank",
    address: 'asfd ',
  },

];
const workers=  [
  {
    id: uuidv4(),
    companyId: 1111,
    last_name: "Karpenko",
    first_name: "sergey",
    position: "Front End developer",
  },
  {
    id: uuidv4(),
    companyId: 1111,
    last_name: "Ne karp",
    first_name: "Ne",
    position: "Ne Front End developer",
  },
  {
    id: uuidv4(),
    companyId: 1111,
    last_name: "Sasuke",
    first_name: "Kakashi",
    position: "Коллектор",
  },
  {
    id: uuidv4(),
    companyId: 2222,
    last_name: "Кактов",
    first_name: "ктото",
    position: "буздельник",
  },
  {
    id: uuidv4(),
    companyId: 3333,
    last_name: "Savenko",
    first_name: "Dima",
    position: "Front End developer",
  },
  {
    id: uuidv4(),
    companyId: 3333,
    last_name: "Ne Savenko",
    first_name: "Ne Dima",
    position: "Ne Front End developer",
  },
];

export const companyRecords = {
  data: tableData,
  totalRecords: tableData.length,
  pages: (tableData.length + 1) / 10
};

export const companyWorkers = workers
