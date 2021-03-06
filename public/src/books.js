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
	const borrowerAccounts = accounts.reduce((acc, account) => {
		borrows.forEach((borrow) => {
			const borrowers = { ...account, returned: borrow.returned };
			account.id === borrow.id ? acc.push(borrowers) : null;
		});
		return acc;
	}, []);

	return borrowerAccounts.slice(0, 10);
}

module.exports = {
	findAuthorById,
	findBookById,
	partitionBooksByBorrowedStatus,
	getBorrowersForBook,
};
