import { AuthProvider } from './context/auth'
import { SnackbarProvider } from 'notistack';

import { Root } from './components/root'

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </SnackbarProvider>
  )
}

export default App
