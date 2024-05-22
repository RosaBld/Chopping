import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './style/css/style.css'

import Drinks from './views/Drinks'
import Create from './components/Create'
import Participants from './views/Participants'
import Pool from './components/Pool'
import Header from './components/Header'
import Configuration from './views/Configuration'

function App() {

  return (
    <Router>
      <div>
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
