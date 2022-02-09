const getTotalBooksCount = (books) => books.length;

const getTotalAccountsCount = (accounts) => accounts.length;

function getBooksBorrowedCount(books) {
	return books.filter((book) => !book.borrows[0].returned).length;
}

//Helper Function
const sortAndSlice = (array, startNum, endNum) =>
	array.sort((bookA, bookB) => bookB.count - bookA.count).slice(startNum, endNum);

function getMostCommonGenres(books) {
	return sortAndSlice(
		books.reduce((acc, book) => {
			const genreExist = acc.find((item) => item.name === book.genre);
			genreExist ? genreExist.count++ : acc.push({ name: book.genre, count: 1 });
			return acc;
		}, []),
		0,
		5,
	);
}

function getMostPopularBooks(books) {
	return sortAndSlice(
		books.map((book) => ({ name: book.title, count: book.borrows.length })),
		0,
		5,
	);
}

function getMostPopularAuthors(books, authors) {
	return sortAndSlice(
		books.reduce((acc, book) => {
			authors.forEach((author) => {
				book.authorId === author.id
					? acc.push({
							name: `${author.name.first} ${author.name.last}`,
							count: book.borrows.length,
					  })
					: null;
			});
			return acc;
		}, []),
		0,
		5,
	);
}

module.exports = {
	getTotalBooksCount,
	getTotalAccountsCount,
	getBooksBorrowedCount,
	getMostCommonGenres,
	getMostPopularBooks,
	getMostPopularAuthors,
};
