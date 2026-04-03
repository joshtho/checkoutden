import { Link } from 'react-router-dom'
import Navbar from './Navbar'

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to CheckoutDen
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Your premier destination for innovative checkout solutions and digital experiences.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Living Rivers Project Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Living Rivers</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Living Rivers</h3>
              <p className="text-gray-600 mb-4">
                An interactive checkout experience for nature enthusiasts.
              </p>
              <Link 
                to="/living-rivers" 
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore →
              </Link>
            </div>
            
            {/* Create Your Own Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Create Yours</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Your Own</h3>
              <p className="text-gray-600 mb-4">
                Create your custom checkout page with your own content and images.
              </p>
              <Link 
                to="/create" 
                className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
