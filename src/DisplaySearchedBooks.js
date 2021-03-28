import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {search} from './BooksAPI';
import SearchBooks from "./SearchBooks";
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
				if (query.length >= 1) {return {searchedBooks: searchResults}}

			})
		});
		
	}
	render() {
		const {searchedBooks} = this.state
		return (
				<div className="search-books">
					<div className="search-books-bar">
				<Link to='/' >
					<button className="close-search">Close</button>
				</Link>
				<SearchBooks onSearchEntered={this.updateSearchResults}/>
				</div>
				<SearchedBookList books={searchedBooks} />
			</div>
		)
	}
	}