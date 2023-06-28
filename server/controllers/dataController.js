const dataController = {};

dataController.transactionsTotalCategoryMonth = (req, res, next) => {
  const rawData = res.locals.rawTransactionsData;
  const months = {};
  for (const row of rawData) {
    if (Number(row.amount) < 0) {
      continue;
    }
    const month = String(row.date).substring(0, 7);
    const mainCat = row.category[0];
    if (!months[month]) {
      months[month] = { month: month };
    }
    if (months[month][mainCat]) {
      months[month][mainCat] += Number(row.amount);
    } else {
      months[month][mainCat] = Number(row.amount);
    }
  }

  res.locals.processedData = Object.values(months);
  return next();
};
