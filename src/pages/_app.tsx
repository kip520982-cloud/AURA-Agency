import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#22303E',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '15px',
            boxShadow: '0 10px 30px -10px rgba(16,32,44,0.45)',
          },
          success: {
            iconTheme: {
              primary: '#27AE60',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF6B35',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  )
}
