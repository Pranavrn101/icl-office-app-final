import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from 'context/AuthContext';

export const metadata: Metadata = {
  title: 'ICL App',
  description: '',
  generator: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
