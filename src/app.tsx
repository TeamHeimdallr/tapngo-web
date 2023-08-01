import loadable from '@loadable/component';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import tw from 'twin.macro';

import { Mint } from './pages/mint';
import { Minting } from './pages/mint/minting';
import { My } from './pages/my';
import { Card } from './pages/my/card';
import { Pay } from './pages/pay';
import { Payment } from './pages/pay/payment';
import { Ticket } from './pages/ticket';
import { Ticketing } from './pages/ticket/ticketing';

const Landing = loadable(() => import('./pages/landing'));

const RouteWrapper = tw.main`relative w-full h-full`;
const App = () => {
  return (
    <BrowserRouter>
      <RouteWrapper>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/pay/:price" element={<Payment />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/mint/:id" element={<Minting />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/ticket/:id" element={<Ticketing />} />
          <Route path="/my" element={<My />} />
          <Route path="/my/card" element={<Card />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </RouteWrapper>
    </BrowserRouter>
  );
};

export default App;
