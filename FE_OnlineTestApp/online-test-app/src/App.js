import './App.css';
import styles from './App.module.css'
import 'antd/dist/antd.css'

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import Realtime from './pages/Realtime';
import QuizTeacher from './pages/QuizTeacher';
import QuizStudents from './pages/QuizStudents';


function App() {
  return (
   <div>
   <div className= {styles.container}>
    <BrowserRouter>
      <ul className={styles.navigation}>
        <li className={styles.link}>
        <NavLink to= '/realtime'  className= {({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}>Home</NavLink>
        </li>
        <li className={styles.link}>
        <NavLink to= '/quiz/teacher'  className= {({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}>Teacher</NavLink>
        </li>
        <li className={styles.link}>
        <NavLink to= '/quiz/students'  className= {({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}>Students</NavLink>
        </li>
      </ul>

      {/* ROUTERS SETTINGS */}
      <div className={styles.routerArea}>
        <Routes>
          <Route path='/' element={<Realtime/>} />
          <Route path='/realtime' element={<Realtime/>} />
          <Route path='/quiz/teacher' element={<QuizTeacher/>} />
          <Route path='/quiz/students' element={<QuizStudents />} />
           {/* NO MATCHING ROUTE */}
           <Route
          path='*'
          element={
            <main style={{padding: '1rem'}}>
              <p>404 Page not found 😂😂😂</p>
            </main>
          }
           />
        </Routes>
      </div>
    </BrowserRouter>
   </div>
   </div>
  );
}

export default App;
