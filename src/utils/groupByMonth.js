export const groupByMonth = (transactions) => {
  const months = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!months[monthKey]) {
      months[monthKey] = {
        month: date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        income: 0,
        expense: 0,
      };
    }

    if (tx.type === "income") {
      months[monthKey].income += tx.amount;
    } else {
      months[monthKey].expense += tx.amount;
    }
  });

  return Object.values(months);
};