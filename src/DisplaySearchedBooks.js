import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {search} from './BooksAPI';
import SearchFunction from "./SearchFunction";
import Book from './Book';

export default class DisplaySearchedBooks extends Component {
	state ={
		searchedBooks: [],
		shelfedBooks: [],
		error: false
	}
	updateSearchResults = query => {
		search(query).then(data => {
			this.setState(() => {
				const searchResults = data
				
				if (searchResults === undefined) {return {searchedBooks: [], error: false}}
				if (searchResults.error) {return {searchedBooks: [], error: true}} //handle "empty query"
				
				if (query.length >= 1) {
					const {shelfedBooks} = this.props
					const shelfedBookId = shelfedBooks.map( shelfedBook => shelfedBook.id)
					
					for (const book of searchResults) {
						const bookOnShelfCheck = shelfedBookId.filter(id => id === book.id);
						if (bookOnShelfCheck.length > 0) {
							const shelf = shelfedBooks.filter(shelfedBook => shelfedBook.id === book.id)
														.map(shelfedBook => shelfedBook.shelf)
														.toString()
							Object.assign(book,{shelf:shelf})
						}
					}
					return {searchedBooks: searchResults, error: false}}
			})
		});
	}

	booksAddedToShelf = (shelfedBooks) => {
		this.setState({shelfedBooks}, () => this.props.addBookToShelf(this.state.shelfedBooks))
	}

	render() {
		const {searchedBooks} = this.state
		const validResults = (
			<ol className="books-grid">
			{searchedBooks.map( book => <Book key={book.id} book={book} addBookToShelf={this.booksAddedToShelf}/> )}
			</ol>
		)
		const unValidResults = (<div>No search results found</div>)
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' >
						<button className="close-search">Close</button>
					</Link>
					<SearchFunction onSearchEntered={this.updateSearchResults}/>
				</div>
				<div className="search-books-results">
					{this.state.error ? unValidResults : validResults}
				</div>
			</div>
		)
	}
	}