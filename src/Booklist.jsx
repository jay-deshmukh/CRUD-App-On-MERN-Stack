import React from 'react';
import Book from './Book'

class BookList extends React.Component {
    render(){

        let bookNodes = this.props.books.map(book => {
            return(
                <Book 
                    title = {book.title} 
                    author = {book.author} 
                    key ={book['_id']}
                    uniqueID = {book['_id']}
                    onBookDelete={this.props.onBookDelete}
                    onBookUpdate={this.props.onBookUpdate}
                >
                    {/* {book.title} */}
                </Book>
            )
        })
        return(
            <ul className = "w3-ul w3-border" >
                { bookNodes }
            </ul>
        )
    }
}

export default BookList;
