
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Inscription from './components/Inscription/Inscription.tsx';
import Connexion from './components/Connexion/Connexion.tsx';
import Login from './components/Login/Login.tsx';
import Information from './components/Information/Information.tsx'
import Activites from './components/Activites/Activites.tsx';
import ReservationPage from './components/ReservationPage/ReservationPage.tsx';
import Account from './components/Account/Account.tsx';

createRoot(document.getElementById('root')!).render(
    <Router>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/activities' element={<Activites/>}/>
        <Route path='/registration' element={<Inscription/>}/>
        <Route path="/reservation" element={<ReservationPage/>}/>
        <Route path="/connect" element={<Connexion/>}/>
        <Route path="/login" element={<Login/>}/>  
        <Route path="/information" element={<Information/>}/>     
        <Route path="/account" element={<Account/>}/>  
      </Routes>
    </Router>
,
)