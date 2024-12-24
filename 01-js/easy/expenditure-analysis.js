/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  // create a hashmap for category and prices
  let categoryTotals = {};

  // calculate totals for each category in transaction
  transactions.forEach((transaction) => {
    const { category, price } = transaction;
    if (categoryTotals[category]) {
      categoryTotals[category] += price;
    } else {
      categoryTotals[category] = price;
    }
  });

  // convert categoryTotals into an array for result
  const result = Object.keys(categoryTotals).map((category) => {
    return {
      category: category,
      totalSpent: categoryTotals[category],
    };
  });

  return result;
}

module.exports = calculateTotalSpentByCategory;
