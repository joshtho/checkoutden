import { Link } from 'react-router-dom'
import Navbar from './Navbar'

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-gray-950 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Build checkout pages<br />
            <span className="text-orange-500">that&nbsp;convert.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Create beautiful, high-converting checkout experiences in minutes — no code required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-lg transition shadow-lg shadow-orange-500/25"
            >
              Start Building — Free
            </Link>
            <Link
              to="/living-rivers"
              className="px-8 py-3.5 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-xl text-lg transition"
            >
              See an Example
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: (
                <svg className="w-8 h-8 text-orange-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                </svg>
              ),
              title: 'Ready in Minutes',
              desc: 'Pick a theme, add your content, paste a payment link — done.',
            },
            {
              icon: (
                <svg className="w-8 h-8 text-orange-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
              ),
              title: 'Fully Customizable',
              desc: 'Colors, images, text — everything is editable right in the browser.',
            },
            {
              icon: (
                <svg className="w-8 h-8 text-orange-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              ),
              title: 'Secure Payments',
              desc: 'Powered by Square — trusted, PCI-compliant checkout.',
            },
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              {f.icon}
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-gray-400 text-sm max-w-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Projects</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Living Rivers */}
          <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all">
            <div className="h-48 bg-gradient-to-br from-emerald-600/40 to-teal-900 flex items-center justify-center">
              <span className="text-white/80 text-2xl font-bold tracking-wide">Living Rivers</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">Living Rivers</h3>
              <p className="text-gray-400 mb-5 text-sm">
                An interactive checkout experience for nature enthusiasts.
              </p>
              <Link
                to="/living-rivers"
                className="inline-flex items-center gap-1 text-orange-500 font-semibold hover:text-orange-400 transition text-sm"
              >
                Explore <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Create Your Own */}
          <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all">
            <div className="h-48 bg-gradient-to-br from-orange-600/30 to-gray-900 flex items-center justify-center">
              <span className="text-white/80 text-2xl font-bold tracking-wide">Create Yours</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">Build Your Own</h3>
              <p className="text-gray-400 mb-5 text-sm">
                Create your custom checkout page with your own content and images.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center gap-1 text-orange-500 font-semibold hover:text-orange-400 transition text-sm"
              >
                Get Started <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} CheckoutDen. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage
