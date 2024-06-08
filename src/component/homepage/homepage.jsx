import React from 'react';
import NewBooks from '../newbooks/newbooks';
import BooksView from '../booksview/booksview';
import Header from './../header/header';
import Porforosh from '../porforoshtarin/porforosh';
import PanelMid from '../panelmid/panelmid';
import BooksDie from '../panelmid/booksdie';
import Gifs from '../header/gifs';
import Politz from '../porforoshtarin/politz';  
import Lesson from '../porforoshtarin/Lesson';
import Kodakan from '../porforoshtarin/Kodakan';
 


const HomePage = ({books }) => {
    return(
        <>
        <Header />
        <NewBooks books={books} />
        <Gifs></Gifs>  
        <Porforosh books={books}  />
        <BooksDie></BooksDie>
        <Lesson books={books} />
        <Politz books={books}  />
        <PanelMid></PanelMid>
        <Kodakan books={books}  />

        <BooksView books={books}  />
        
        </>
    )
}




export default HomePage;

