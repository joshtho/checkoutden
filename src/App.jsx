import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import CheckoutPage from './CheckoutPage'
import CheckoutBuilder from './CheckoutBuilder'
import DynamicCheckoutPage from './DynamicCheckoutPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/living-rivers" element={<CheckoutPage />} />
        <Route path="/create" element={<CheckoutBuilder />} />
        <Route path="/checkout/:pageId" element={<DynamicCheckoutPage />} />
      </Routes>
    </Router>
  )
}

export default App
