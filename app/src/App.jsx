// Libraries
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './style/css/style.css'

// Components
import { Configuration, Drinks, ExpirationLocalStorage, Header, Home, Participants, Pool } from './utils';


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
          <Route path="/drinks" element={ <Drinks />} />
          <Route path="/participants" element={ <Participants /> } />
          <Route path="/budget" element={ <Pool /> } />
          <Route path="/configuration" element={ <Configuration /> } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
