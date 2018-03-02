import React from "react";
// import style from "./style";
import marked from 'marked';

class Book extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            toBeUpdated : false ,
            author : '',
            title : ''
        }
    }
    updateBook=(e)=>{
        e.preventDefault();
        this.setState({
            toBeUpdated : !this.state.toBeUpdated
        })
    }
    handleBookUpdate = (e) =>{
        e.preventDefault();
        let id = this.props.uniqueID;
        let author = (this.state.author)?this.state.author:null;
        let title = (this.state.title)?this.state.title:null;
        let book = {author:author , title:title};
        this.props.onBookUpdate(id,book);
        this.setState({
            toBeUpdated : !this.state.toBeUpdated ,
            author : '',
            title : ''
        })
    }
    deleteBook = (e) => {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onBookDelete(id);
        console.log("Book Deleted ");
    }
    handleTitleChange = (e) =>{
        this.setState({
            title : e.target.value
        })
    }
    handleAuthorChange = (e) =>{
        this.setState({
            author : e.target.value
        })
    }
    rawMarkup(){
        let rawMarkup = marked(this.props.children.toString());
        return{_html : rawMarkup }
    }

    render(){
        return(
        <li> 
            <h5>{this.props.title}</h5>                
            <p>{this.props.author}</p>
            <span className="w3-tag w3-blue" onClick={this.updateBook} >Update</span>
            <span className="w3-tag w3-red" onClick={this.deleteBook}>Delete</span>
            {
                (this.state.toBeUpdated)?
                (
                    <form onSubmit={this.handleBookUpdate}>
                        <input 
                            className="w3-input"
                            type="text"
                            value={this.state.title ? this.state.title : this.props.title}
                            onChange={this.handleTitleChange}
                        />
                        <input 
                            className="w3-input"
                            type="text"
                            value={this.state.author ? this.state.author : this.props.author}
                            onChange={this.handleAuthorChange}
                        />
                        <input 
                            className="w3-input"
                            type="submit"
                            value='Update'
                        />
                    </form>
                )
            :null
            }
        </li> 
        )
    }
}

export default Book;