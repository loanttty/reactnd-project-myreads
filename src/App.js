import React from 'react'
import { getAll} from './BooksAPI'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import DisplaySearchedBooks from './DisplaySearchedBooks';
import Book from './Book';


class BooksApp extends React.Component {
  state = {
    shelfedBooks: [],
  }
  
  componentDidMount() {
    getAll().then(shelfedBooks => this.setState({shelfedBooks}))
  }
  
  addBookToShelf = (shelfedBooks) => {
      this.setState({shelfedBooks})
  }
  
  render() {
    const {shelfedBooks} = this.state
    const shelves = [
      {id:'currentlyReading', 
      name: 'Currently Reading'},
      {id:'wantToRead', 
      name: 'Want To Read'},
      {id: 'read',
      name: 'Read'}]
    return (
      <Router>
        <div className="app">
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {shelves.map(shelf => (
                  <div className="bookshelf" key={shelf.id}>
                    <h2 className="bookshelf-title">{shelf.name}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {shelfedBooks.filter( shelfedBook => shelfedBook.shelf === shelf.id)
                        .map( book => <Book key={book.id} book={book} addBookToShelf={this.addBookToShelf}/>)}
                      </ol>
                    </div>
                  </div>
                ) )}
              </div>
              <div className="open-search">
                <Link to='/search'>
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )} />
          
          <Route path='/search'>
            <DisplaySearchedBooks shelfedBooks={shelfedBooks} addBookToShelf={this.addBookToShelf} />
          </Route>
        </div>
      </Router>
    )
  }
}

export default BooksApp
