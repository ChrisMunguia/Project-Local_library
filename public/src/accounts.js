const findAccountById = (accounts, id) => accounts.find((account) => account.id === id);

function sortAccountsByLastName(accounts) {
	return accounts.sort((accountA, accountB) =>
		accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1,
	);
}

function getTotalNumberOfBorrows({ id }, books) {
	return books.reduce((acc, book) => {
		book.borrows.forEach((borrow) => (id === borrow.id ? acc++ : null));
		return acc;
	}, 0);
}

function getBooksPossessedByAccount({ id }, books, authors) {
	return books.reduce((acc, book) => {
		const books = { ...book, author: authors.find((auth) => auth.id === book.authorId) };
		book.borrows[0].id === id && !book.borrows[0].returned ? acc.push(books) : null;
		return acc;
	}, []);
}

module.exports = {
	findAccountById,
	sortAccountsByLastName,
	getTotalNumberOfBorrows,
	getBooksPossessedByAccount,
};
