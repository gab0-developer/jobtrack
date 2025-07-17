
import './App.css'

// import { HashRouter  as Router} from 'react-router-dom'
import { BrowserRouter  as Router} from 'react-router-dom'
import Rutas from './routes/Rutas'

function App() {

  return (
    <>
      <Router>
        <Rutas />
      </Router>
      {/* <Register /> */}
    </>
  )
}

export default App
