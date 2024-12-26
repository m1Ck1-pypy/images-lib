import Home from '../screens/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainRoot } from './styles/MainRoot';

function App() {
  return (
    <BrowserRouter>
      <MainRoot>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </MainRoot>
    </BrowserRouter>
  );
}

export default App;
