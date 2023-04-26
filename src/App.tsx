import { QueryClientProvider, QueryClient } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Video from './Video'

import './App.css'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#09323D] App">
        <Video />
        <ToastContainer />
      </div>
    </QueryClientProvider>
  )
}

export default App
