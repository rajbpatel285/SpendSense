const predictTotalExpense = (expenseData) => {
  const days = expenseData.map((entry) => entry.day);
  const expenses = expenseData.map((entry) => entry.expense);

  const trainingDays = days.slice(0, Math.floor(days.length * 0.8));
  const trainingExpenses = expenses.slice(0, Math.floor(expenses.length * 0.8));
  const testingDays = days.slice(Math.floor(days.length * 0.8));
  const testingExpenses = expenses.slice(Math.floor(expenses.length * 0.8));

  const regressionModel = linearRegression(trainingDays, trainingExpenses);

  const predictedExpenses = testingDays.map((day) =>
    regressionModel.predict(day)
  );

  const totalPredictedExpense = predictedExpenses.reduce(
    (sum, expense) => sum + expense,
    0
  );

  console.log("Predicted Total Month's Expense:", totalPredictedExpense);
  return totalPredictedExpense;
};

const linearRegression = (x, y) => {
  const n = x.length;
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumXX = 0;

  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumXX += x[i] * x[i];
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return {
    predict: (x) => slope * x + intercept,
  };
};

export default predictTotalExpense;
