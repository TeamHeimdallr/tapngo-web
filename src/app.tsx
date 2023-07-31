import loadable from '@loadable/component';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import tw from 'twin.macro';

import AppProvider from '~/hocs/hoc-provider';

const MainPage = loadable(() => import('./pages/main'));

const RouteWrapper = tw.main`relative w-full h-full`;
const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <RouteWrapper>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RouteWrapper>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
