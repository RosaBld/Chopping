// Libraries
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './style/css/style.css'
import ReactModal from 'react-modal';


// Components
import { Configuration, CreateEvent, Drinks, ErrorPage, ExpirationLocalStorage, Header, Home, Participants, Pool } from './utils';


ReactModal.setAppElement('#root');

function App() {

  useEffect(() => {
    ExpirationLocalStorage();
  }, []);

  return (
    <Router>
      <div>
        <ExpirationLocalStorage />
        <Header />
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/createEvent" element={ <CreateEvent /> } />
          <Route path="/drinks" element={ <Drinks />} />
          <Route path="/participants" element={ <Participants /> } />
          <Route path="/budget" element={ <Pool /> } />
          <Route path="/configuration" element={ <Configuration /> } />
        
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
