import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import notes from '../notes';

function App() {
  return (
    <div>
      <Header />
      {notes.map(el => (
        <Note key={el.id} title={el.title} content={el.content} />
      ))}
      <Footer />
    </div>
  );
}

export default App;
