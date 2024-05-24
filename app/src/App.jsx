// Libraries
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './style/css/style.css'

// Components
import { Configuration, Create, Drinks, ExpirationLocalStorage, Header, Participants, Pool } from './utils';


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
          <Route path="/" element={ <Create />} />
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
