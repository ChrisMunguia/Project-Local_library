const findAuthorById = (authors, id) => authors.find((author) => author.id === id);

const findBookById = (books, id) => books.find((book) => book.id === id);

function partitionBooksByBorrowedStatus(books) {
	return books.reduce(
		(acc, book) => {
			!book.borrows[0].returned ? acc[0].push(book) : acc[1].push(book);
			return acc;
		},
		[[], []],
	);
}

function getBorrowersForBook({ borrows }, accounts) {
	return accounts
		.reduce((acc, account) => {
			borrows.forEach((borrow) => {
				account.id === borrow.id ? acc.push({ ...account, returned: borrow.returned }) : null;
			});
			return acc;
		}, [])
		.slice(0, 10);
}

module.exports = {
	findAuthorById,
	findBookById,
	partitionBooksByBorrowedStatus,
	getBorrowersForBook,
};
