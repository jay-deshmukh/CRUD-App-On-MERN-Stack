import React from 'react';
import ReactDOM from 'react-dom';
import BookBox from './BookBox';


ReactDOM.render(
    <BookBox 
        url = "http://localhost:3001/api/book"
        pollInterval = {2000}
    />,
    document.getElementById('root')
);

