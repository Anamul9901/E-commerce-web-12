import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './router/Router.jsx';
import Authprovider from './providers/Authprovider.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authprovider>
      <QueryClientProvider client={queryClient}>

        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>

      </QueryClientProvider>

    </Authprovider>
  </React.StrictMode>,
)
