import './App.css';
import Form from './components/Form';
import Header from './components/Header';
import Home from './components/Home';
import {Route, Routes} from 'react-router-dom'
import Edit from './components/Edit';
import Detail from './components/Detail';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/form' element={<Form/>}/>
      <Route exact path='/Edit/:id' element={<Edit/>}/>
      <Route exact path='/view/:id' element={<Detail/>}/>

      </Routes>
    </div>
  );
}

export default App;
