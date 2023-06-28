const dataController = {};

dataController.transactionsTotalCategoryMonth = (req, res, next) => {
  const rawData = res.locals.rawTransactionsData;
  const months = {};

  for (const row of rawData) {
    let value = row.amount;
    //TODO: FIX THIS FOR PRODUCTION:
    //Currently, for display testing purposes, we're treating all negative charges as positive charges (i.e., income as expenses)
    //Future production versions should distinguish between income and expenses.
    if (value < 0) {
      value = Math.abs(Number(value));
    }
    const month = String(row.date).substring(0, 7);
    const mainCat = row.category[0];
    if (!months[month]) {
      months[month] = { month: month };
    }
    if (months[month][mainCat]) {
      months[month][mainCat] += value;
    } else {
      months[month][mainCat] = value;
    }
  }

  res.locals.finalFormatted = Object.values(months);
  return next();
};

dataController.transactionsCategoryFine = (req, res, next) => {
  const rawData = res.locals.rawTransactionsData;
  const c1set = new Set();
  const c2sets = {};
  const c3sets = {};

  const formatted = { name: 'TopLevel', children: {} };

  for (const row of rawData) {
    const [c1, c2, c3] = row.category;
    let value = row.amount;
    const name = row.name;
    const tid = row.transaction_id;

    //TODO: FIX THIS FOR PRODUCTION:
    //Currently, for display testing purposes, we're treating all negative charges as positive charges (i.e., income as expenses)
    //Future production versions should distinguish between income and expenses.
    if (value < 0) {
      value = Math.abs(Number(value));
    }

    if (c1) {
      if (!c1set.has(c1)) {
        c1set.add(c1);
        c2sets[c1] = new Set();
        c3sets[c1] = {};
        formatted.children[c1] = { name: c1, children: {} };
      }

      if (c2) {
        if (!c2sets[c1].has(c2)) {
          c2sets[c1].add(c2);
          c3sets[c1][c2] = new Set();
          formatted.children[c1].children[c2] = { name: c2, children: {} };
        }

        if (c3) {
          if (!c3sets[c1][c2].has(c3)) {
            c3sets[c1][c2].add(c3);
            formatted.children[c1].children[c2].children[c3] = {
              name: c3,
              children: []
            };
          }
          formatted.children[c1].children[c2].children[c3].children.push({
            name,
            value
          });
        } else {
          formatted.children[c1].children[c2].children[tid] = { name, value };
        }
      } else {
        formatted.children[c1].children[tid] = { name, value };
      }
    } else {
      formatted.children[tid] = { name, value };
    }
  }

  const childrenToArrays = (obj) => {
    if (!obj.children) {
      return obj;
    }
    const childArray = [];
    for (const child of Object.values(obj.children)) {
      childArray.push(childrenToArrays(child));
    }
    obj.children = childArray;
    return obj;
  };

  const finalFormatted = childrenToArrays(formatted);
  res.locals.finalFormatted = finalFormatted;
  console.dir(finalFormatted);
  return next();
};

module.exports = dataController;
