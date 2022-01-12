import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminHome from './screens/AdminHome'
import EditUser from './screens/EditUser'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomeScreen />} ></Route>
          <Route path='/login' element={<LoginScreen />} ></Route>
          <Route path='/signup' element={<SignupScreen />} ></Route>
          <Route path='/admin' element={<AdminHome />} ></Route>
          <Route path='/edit/:id' element={<EditUser />} ></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
