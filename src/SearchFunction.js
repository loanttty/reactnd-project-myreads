import React, { Component } from 'react';
import {debounce} from 'throttle-debounce';

class SearchFunction extends Component {
	state = {
		query: ''
	}
	
	updateQuery = event => {
		const queryTrimmed = event.target.value.trim()
		const debounceFunc = debounce(300, (query) => {
			this.setState({query:query},() => {
				this.props.onSearchEntered(this.state.query);
			});
		})
		setTimeout(() => {
			debounceFunc(queryTrimmed);
		}, 500)
	}
	render() {
		return(
			<div className="search-books-input-wrapper">
				<input 
				type="text" 
				placeholder="Search by title or author"
				onChange={this.updateQuery} />
	
			</div>
		)
	}
}

export default SearchFunction