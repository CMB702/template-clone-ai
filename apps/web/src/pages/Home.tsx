import { Link } from 'react-router-dom'
import { Zap, Palette, Code, Download } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI-Powered Analysis',
      description: 'Upload any image and let our AI analyze the layout, colors, and typography.',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Full Design Control',
      description: 'Edit every aspect - colors, fonts, spacing, and layout with an intuitive editor.',
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Multiple Export Formats',
      description: 'Export as HTML/CSS, React, Tailwind CSS, PDF, and more.',
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: 'Template Library',
      description: 'Browse and customize templates from our growing library.',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Designs Into Code
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Upload any screenshot, design, or mockup. Our AI analyzes it and generates a fully editable template in seconds.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Clone Your First Design?</h2>
          <p className="text-xl mb-8 text-gray-300">Start converting designs to code in minutes</p>
          <Link
            to="/dashboard"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  )
}
