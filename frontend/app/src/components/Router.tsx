import { Route, Routes } from 'react-router';
import Home from '../pages/Home.tsx';
import BookTime from '../pages/BookTime.tsx';

function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="broneeri-aeg" element={<BookTime />} />
    </Routes>
  );
}

export default Router;
