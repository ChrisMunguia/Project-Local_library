const getTotalBooksCount = (books) => books.length;

const getTotalAccountsCount = (accounts) => accounts.length;

function getBooksBorrowedCount(books) {
	return books.filter((book) => !book.borrows[0].returned).length;
}

//Helper Function
function sortAndSlice(array, startNum, endNum) {
	return array.sort((bookA, bookB) => bookB.count - bookA.count).slice(startNum, endNum);
}

function getMostCommonGenres(books) {
	const commonGenres = books.reduce((acc, book) => {
		const genreExist = acc.find((item) => item.name === book.genre);
		genreExist ? genreExist.count++ : acc.push({ name: book.genre, count: 1 });
		return acc;
	}, []);

	return sortAndSlice(commonGenres, 0, 5);
}

function getMostPopularBooks(books) {
	const popularBooks = books.map((book) => ({ name: book.title, count: book.borrows.length }));

	return sortAndSlice(popularBooks, 0, 5);
}

function getMostPopularAuthors(books, authors) {
	const popularAuthors = books.reduce((acc, book) => {
		authors.forEach((author) => {
			const authorBookCount = {
				name: `${author.name.first} ${author.name.last}`,
				count: book.borrows.length,
			};
			book.authorId === author.id ? acc.push(authorBookCount) : null;
		});
		return acc;
	}, []);

	return sortAndSlice(popularAuthors, 0, 5);
}

module.exports = {
	getTotalBooksCount,
	getTotalAccountsCount,
	getBooksBorrowedCount,
	getMostCommonGenres,
	getMostPopularBooks,
	getMostPopularAuthors,
};
