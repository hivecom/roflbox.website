import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-purple-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-white mb-4">
            ROFLBOX
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            GET GOOD GET ROFLBOX
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="text-lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Interactive Counter Card */}
        <Card className="max-w-md mx-auto mb-12">
          <CardHeader>
            <CardTitle>Interactive Counter</CardTitle>
            <CardDescription>
              Test the Shadcn/ui components with this interactive counter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="text-4xl font-bold text-primary">{count}</div>
              <div className="flex gap-2">
                <Button onClick={() => setCount(count + 1)}>
                  Increment
                </Button>
                <Button variant="outline" onClick={() => setCount(0)}>
                  Reset
                </Button>
                <Button variant="destructive" onClick={() => setCount(count - 1)}>
                  Decrement
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>⚡ Fast</CardTitle>
              <CardDescription>
                Built with Vite for lightning-fast development and builds
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>🎨 Beautiful</CardTitle>
              <CardDescription>
                Powered by Tailwind CSS v4 and Shadcn/ui components
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>📱 Responsive</CardTitle>
              <CardDescription>
                Perfectly optimized for all devices and screen sizes
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-white/70">
          <p>Built with React, Vite, Tailwind CSS v4, and Shadcn/ui</p>
          <p className="mt-2">Ready for GitHub Pages deployment! 🚀</p>
        </footer>
      </div>
    </div>
  )
}

export default App
