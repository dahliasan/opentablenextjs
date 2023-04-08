import AuthContext from '@/context/AuthContext'
import NavBar from './components/NavBar'
import './globals.css'

export const metadata = {
  title: {
    default: 'OpenTable',
    template: '%s | OpenTable',
  },
  description: 'OpenTable clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <div className='bg-gray-100 dark:bg-slate-900 min-h-screen w-screen'>
          <AuthContext>
            <main className='max-w-screen-2xl m-auto bg-white dark:bg-black'>
              <NavBar />
              {children}
            </main>
          </AuthContext>
        </div>
      </body>
    </html>
  )
}
