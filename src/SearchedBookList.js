import React from 'react';
import Book from './Book';

export default function SearchedBookList (props) {
	const {books} = props;
	const booksAddedToShelf = (booksOnShelves) => {
		props.booksOnShelves(booksOnShelves)
	};
  return (
		<div className="search-books-results">
					<ol className="books-grid">
					{books.map( book => <Book key={book.id} book={book} addBookToShelf={booksAddedToShelf}/> )}
					</ol>
				</div>
	)
}