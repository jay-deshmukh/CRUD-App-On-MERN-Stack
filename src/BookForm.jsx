import React from "react";


class BookForm extends React.Component {
    constructor(props){
        super(props);
        this.state =  {
            title:'',
            author : ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleAuthorChange (e) {
        this.setState({
            author: e.target.value  
        })
    }
    handleTitleChange(e){
        this.setState({
            title: e.target.value  
        })
    }
    handleSubmit(e){    
        e.preventDefault();
        let author = this.state.author.trim();
        let title = this.state.title.trim();
        if (!title || !author) {
          return;
        }
        this.props.onBookSubmit({ author: author, title: title });
        this.setState({ author: '', title: '' });
        
    }
    render(){
        return(
            <form onSubmit={ this.handleSubmit }>
                <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange}/>
                <input type="text" name="author" placeholder="Author" value={this.state.author} onChange={this.handleAuthorChange}/>
                <input type="submit" value="POST"/>
            </form>
        )
    }
}

export default BookForm;