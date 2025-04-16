import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import 'reset.css';
import { Provider } from 'react-redux'
import store from './store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider 
      future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }} 
  router={router} />
    </Provider>
  </StrictMode>,
)
