import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Drinks from './views/Drinks'
import Create from './components/Create'
import Participants from './views/Participants'

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={ <Create />} />
          <Route path="/drinks" element={ <Drinks />} />
          <Route path="participants" element={ <Participants /> } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
