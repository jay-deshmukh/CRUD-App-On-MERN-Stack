import React from 'react';
import BookList from './Booklist'
import BookForm from './BookForm'
import axios from 'axios'


class BookBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            books :[]
        }
    }
    loadBooksFromServer = () => {
        axios.get(this.props.url)
            .then(res => {
                this.setState({ books : res.data})
            })
    }
    handleBookSubmit = (book) => {
        let books = this.state.books;
        let newBooks = books.concat([books]);
        this.setState({ book: newBooks });
        axios.post(this.props.url , book )
            .then (res => {
                this.loadBooksFromServer();
            })
            .catch(err => {
                console.log(err);
            })
    }
    handleBookDelete = (id) => {
        axios.delete(`${this.props.url}/${id}`)
            .then(res => {
                console.log("Book Deleted");
            })
            .catch(err => {
                console.log(err);
            })  
    }
    handleBookUpdate = (id , book) => {
        axios.put(`${this.props.url}/${id}`,book)
            .then(res => {
                console.log(res);                
            })
            .catch(err =>{
                console.log(err);
            })
    }
    componentDidMount(){
        this.loadBooksFromServer();
        setInterval(this.loadBooksFromServer , this.props.pollInterval )
    }
    render(){
        return(
            <div className="w3-container" >
                <h2 className="w3-grey w3-center">Books</h2>
                <BookList 
                    onBookDelete = {this.handleBookDelete}
                    onBookUpdate = {this.handleBookUpdate}
                    books = { this.state.books } 
                />
                <BookForm onBookSubmit={this.handleBookSubmit}/>
            </div>
        )
    }
}

export default BookBox;