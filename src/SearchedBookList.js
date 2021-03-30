import React from 'react';
import Book from './Book';

export default function SearchedBookList (props) {
	const {books} = props;
  return (
		<div className="search-books-results">
					<ol className="books-grid">
					{books.map( book => <Book key={book.id} book={book} /> )}
					</ol>
				</div>
	)
}