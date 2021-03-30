import React, { Component } from 'react';

class Book extends Component {

	state ={
		shelf: this.props.book.shelf
	}

	updateShelf = event => {
		const shelf = event.target.value
		this.setState({shelf})
		this.props.addBookToShelf({
			shelf: this.state.shelf,
			book:this.props.book})
	}

	render() {
		const {book} = this.props;
		console.log(this.state);
		return (
			<div>
				<li key={book.id}>
						<div className="book">
							<div className="book-top">
								<div className="book-cover" style={{ width: 128, height: 192, backgroundImage: "url("+book.imageLinks.thumbnail+")"}}></div>
								<div className="book-shelf-changer">
									<select onChange={this.updateShelf} value={this.state.shelf}>
										<option value="move" disabled>Move to...</option>
										<option value="currentlyReading">Currently Reading</option>
										<option value="wantToRead">Want to Read</option>
										<option value="read">Read</option>
										<option value="none">None</option>
									</select>
								</div>
							</div>
							<div className="book-title">{book.title}</div>
							<div className="book-authors">{book.authors}</div>
						</div>
					</li>			
			</div>
		)
	}
}

export default Book