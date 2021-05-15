## Description

A small GraphQL API

## Prerequisites

You need to have docker installed on your machine.

## Docker

you can run following command to start the graphql server.

```bash
$ docker-compose up
```

then open your prefered browser and go to `localhost:4000/graphql`

## Query Example

List all employees grouped by company that have more than 10€ in benefits left to spend this month. This query should be flexible in such a way that you can provide a past month as an argument as well.

```
getBenefitsLeft(month: 3){
    employeeID
    employeeName
    monthlyBudget
    companyID
    companyTitle
  }
```

Then you will get the following response:

```
{
  "data": {
    "getBenefitsLeft": [
      {
        "employeeID": 1,
        "employeeName": "Raffael",
        "monthlyBudget": 44,
        "companyID": 1,
        "companyTitle": "Moon Inc."
      },
      {
        "employeeID": 4,
        "employeeName": "Beatrix",
        "monthlyBudget": 60,
        "companyID": 1,
        "companyTitle": "Moon Inc."
      }
    ]
  }
}
```

A list of employees from a single company with their spending in a certain month. It should list the money per employee that was spent up to 44€ as tax free and the money above this threshold should be split up by net salary and taxes. There should also be a total per employee.

```
spendPerMonth(month: 1, company: 1){
    employeeID
    employeeName
    monthlyBudget
    companyID
    companyTitle
    total
    tax
    monthly
  }
```

then you will get following response:

```
{
  "data": {
    "spendPerMonth": [
      {
        "employeeID": 1,
        "employeeName": "Raffael",
        "monthlyBudget": 44,
        "companyID": 1,
        "companyTitle": "Moon Inc.",
        "total": 44,
        "tax": 0,
        "monthly": 1
      },
      {
        "employeeID": 2,
        "employeeName": "Mathis",
        "monthlyBudget": 44,
        "companyID": 1,
        "companyTitle": "Moon Inc.",
        "total": 44,
        "tax": 0,
        "monthly": 1
      },
      {
        "employeeID": 3,
        "employeeName": "Tim",
        "monthlyBudget": 44,
        "companyID": 1,
        "companyTitle": "Moon Inc.",
        "total": 40,
        "tax": 0,
        "monthly": 1
      },
      {
        "employeeID": 4,
        "employeeName": "Beatrix",
        "monthlyBudget": 60,
        "companyID": 1,
        "companyTitle": "Moon Inc.",
        "total": 44,
        "tax": 0,
        "monthly": 1
      }
    ]
  }
}
```

List the revenue per partner

```
getRevenue{
    revenue
    partner
  }
```

then you will get following response:

```
{
  "data": {
    "getRevenue": [
      {
        "revenue": 111,
        "partner": 2
      },
      {
        "revenue": 30,
        "partner": 1
      }
    ]
  }
}
```
