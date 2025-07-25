
import './App.css'

// import { HashRouter  as Router} from 'react-router-dom'
import { BrowserRouter  as Router} from 'react-router-dom'
import Rutas from './routes/Rutas'

import { ToastContainer, toast } from 'react-toastify';


function App() {

  return (
    <>
      <Router>
        <ToastContainer />
        <Rutas />
      </Router>
      {/* <Register /> */}
    </>
  )
}

export default App
