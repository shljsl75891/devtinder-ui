import {QueryClientProvider} from '@tanstack/react-query';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router';
import './index.css';
import ToasterProvider from './providers/toaster.provider.jsx';
import {queryClient} from './utils/constants';
import router from './utils/route.config.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToasterProvider>
        <RouterProvider router={router} />
      </ToasterProvider>
    </QueryClientProvider>
  </StrictMode>,
);
