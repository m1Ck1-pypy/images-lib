import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Menu from '@/components/Menu/Menu';
import Gallery from '@/screens/Gallery/Gallery';
import Upload from '@/screens/Upload/Upload';

import { MainRoot } from './styles/MainRoot';

function App() {
  return (
    <BrowserRouter>
      <MainRoot>
        <Routes>
          <Route path='/' element={<Gallery />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/cloud' element={<>cloud</>} />
        </Routes>

        <Menu />
      </MainRoot>
    </BrowserRouter>
  );
}

export default App;
