import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import tw from 'twin.macro';

const Mint = lazy(() => import('./pages/mint'));
const Minting = lazy(() => import('./pages/mint/minting'));
const My = lazy(() => import('./pages/my'));
const Card = lazy(() => import('./pages/my/card'));
const Pay = lazy(() => import('./pages/pay'));
const Payment = lazy(() => import('./pages/pay/payment'));
const Ticket = lazy(() => import('./pages/ticket'));
const Ticketing = lazy(() => import('./pages/ticket/ticketing'));
const Landing = lazy(() => import('./pages/landing'));
const Provider = lazy(() => import('~/hocs/hoc-provider'));

const RouteWrapper = tw.main`relative w-full h-full`;
const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Provider>
          <RouteWrapper>
            <Routes>
              <Route path="/admin" element={<Landing />} />
              <Route path="/admin/pay" element={<Pay />} />
              <Route path="/admin/pay/:price" element={<Payment />} />
              <Route path="/admin/mint" element={<Mint />} />
              <Route path="/admin/mint/:id" element={<Minting />} />
              <Route path="/admin/ticket" element={<Ticket />} />
              <Route path="/admin/ticket/:id" element={<Ticketing />} />
              <Route path="/" element={<My />} />
              <Route path="/card" element={<Card />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </RouteWrapper>
        </Provider>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
