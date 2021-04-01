import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {getAll, search} from './BooksAPI';
import SearchFunction from "./SearchFunction";
import SearchedBookList from './SearchedBookList';

export default class DisplaySearchedBooks extends Component {
	state ={
		searchedBooks: []
	}
	updateSearchResults = query => {
		search(query).then(data => {
			this.setState(currentState => {
				const searchResults = data; //this avoids the "Cannot read the property of undefined" of this.state.searchedBooks in Component <SearchBookList>

				if (searchResults === undefined) {return {searchedBooks: []}}
				if (searchResults.error) {return {searchedBooks: []}}
				if (query === '' || query === null || query === undefined) {return {searchedBooks: []}}
				
				if (query.length >= 1) {
					getAll().then((booksOnShelves) => {
						const booksOnShelvesId = booksOnShelves.map( bookOnShelf => bookOnShelf.id)
						
						for (const book of searchResults) {
							const bookOnShelfCheck = booksOnShelvesId.filter(id => id === book.id);
							if (bookOnShelfCheck.length > 0) {
								const shelf = booksOnShelves.filter(bookOnShelf => bookOnShelf.id === book.id)
															.map(bookOnShelf => bookOnShelf.shelf)
															.toString()
								Object.assign(book,{shelf:shelf})
							}
						}
						console.log(searchResults)	
					})
					return {searchedBooks: searchResults}}
			})
		});
	}

	render() {
		const {searchedBooks} = this.state
		console.log(searchedBooks)
		return (
				<div className="search-books">
					<div className="search-books-bar">
				<Link to='/' >
					<button className="close-search">Close</button>
				</Link>
				<SearchFunction onSearchEntered={this.updateSearchResults}/>
				</div>
				<SearchedBookList books={searchedBooks}/>
			</div>
		)
	}
	}