import React from 'react'
import {getAll} from './BooksAPI'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import DisplaySearchedBooks from './DisplaySearchedBooks';


class BooksApp extends React.Component {
  state = {
    /**
     * *DONE: Router/Route/Link are used in this requirement, completely gets rid of state.
     * Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    shelfedBooks: []
  }
  
  componentDidMount() {
    getAll().then(shelfedBooks => this.setState({shelfedBooks}))
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
                      .map( book => (
                        <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url("+book.imageLinks.thumbnail+")" }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={shelf.id}>
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
                      ))}
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
          
          <Route path='/search' component={DisplaySearchedBooks} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
