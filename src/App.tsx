import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function App() {
  const [count, setCount] = useState(0)
  const [hackLevel, setHackLevel] = useState(0)
  const [isBlinking, setIsBlinking] = useState(false)
  const [matrixText, setMatrixText] = useState('INITIALIZING...')

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const messages = [
      'HACKING MAINFRAME...',
      'BYPASSING SECURITY...',
      'DOWNLOADING RAM...',
      'ENHANCING PIXELS...',
      'REVERSING POLARITY...',
      'ACCESSING GIBSON...',
      'TRIANGULATING IP...',
      'READY TO PWNN00BS!'
    ]
    const interval = setInterval(() => {
      setMatrixText(messages[Math.floor(Math.random() * messages.length)])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-purple-900 flex flex-col items-center justify-start p-4 overflow-x-hidden">
      {/* Scrolling Banner */}
      <div className="w-full bg-red-600 text-white py-2 mb-4 overflow-hidden">
        <div className="animate-pulse whitespace-nowrap">
          <span className="inline-block animate-bounce font-mono text-sm">
            🚨 WARNING: ELITE H4X0R ZONE - NOOBS WILL BE PWNED 🚨 
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Obnoxious Header */}
        <div className="mb-8">
          <div className={`text-6xl md:text-9xl font-black mb-4 transition-all duration-300 ${isBlinking ? 'text-red-500 scale-110' : 'text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-yellow-300 to-red-500'}`}>
            <span className="font-mono tracking-wider drop-shadow-lg">R</span>
            <span className="font-serif italic">O</span>
            <span className="font-mono">F</span>
            <span className="font-sans font-bold">L</span>
            <span className="font-mono">B</span>
            <span className="font-serif">O</span>
            <span className="font-mono tracking-widest">X</span>
          </div>
          
          <div className="animate-pulse text-2xl md:text-4xl font-bold text-yellow-300 mb-4 font-mono">
            ⚡ ULTIMATE H4X TOOLKIT ⚡
          </div>
          
          <p className="text-lg md:text-xl text-white/90 mb-6 font-mono bg-black/30 p-4 border-2 border-green-400 rounded-lg">
            ARE YOU NOOB? WANT TO BE PRO?<br/>
            <span className="text-red-400 font-bold">DOWNLOAD ROFLBOX TO GROW UP!</span><br/>
            <span className="text-lime-400">ROFLBOX.WEBSITE FOR BEST H4X!!!</span>
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap mb-6">
            <Button 
              size="lg" 
              className="text-lg font-mono bg-red-600 hover:bg-red-700 animate-pulse border-2 border-yellow-400"
              onClick={() => setHackLevel(prev => prev + 10)}
            >
              DOWNLOAD H4X
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg font-mono border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black animate-bounce"
            >
              FREE TRIAL
            </Button>
            <Button 
              size="lg" 
              className="text-lg font-mono bg-purple-600 hover:bg-purple-700 border-2 border-pink-400"
            >
              BUY PREMIUM
            </Button>
          </div>
        </div>

        {/* Fake Hacking Terminal */}
        <Card className="max-w-2xl mx-auto mb-8 bg-black border-2 border-green-400">
          <CardHeader>
            <CardTitle className="text-green-400 font-mono">
              🖥️ ELITE HACKER TERMINAL 🖥️
            </CardTitle>
            <CardDescription className="text-green-300 font-mono">
              {matrixText}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-black p-4 rounded border border-green-400 font-mono text-green-400 text-left">
              <div className="mb-2">root@roflbox:~# ./hack.exe --target=noobs</div>
              <div className="mb-2 text-yellow-400">Initializing neural network...</div>
              <div className="mb-2">Hack Level: {hackLevel}%</div>
              <div className="text-red-400">{hackLevel > 50 ? 'SYSTEM COMPROMISED!' : 'Scanning for vulnerabilities...'}</div>
            </div>
          </CardContent>
        </Card>

        {/* Ridiculous Counter */}
        <Card className="max-w-md mx-auto mb-8 border-4 border-rainbow animate-pulse">
          <CardHeader>
            <CardTitle className="text-2xl font-mono text-red-500">
              SKILL COUNTER 3000™
            </CardTitle>
            <CardDescription className="font-mono text-yellow-600">
              Track your 1337 skillz progression
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl font-bold text-lime-400 font-mono animate-bounce">
                {count}
              </div>
              <div className="text-sm text-purple-400 font-mono">
                {count > 10 ? 'PRO GAMER MODE!' : count > 5 ? 'Getting gud...' : 'NOOB DETECTED'}
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={() => setCount(count + 1)}
                  className="font-mono bg-lime-600 hover:bg-lime-700"
                >
                  +1 SKILL
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setCount(0)}
                  className="font-mono border-red-400 text-red-400"
                >
                  RESET NOOB
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => setCount(count - 1)}
                  className="font-mono"
                >
                  -1 GIT GUD
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fake Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-red-500 bg-red-950/50 transform rotate-1">
            <CardHeader>
              <CardTitle className="text-red-400 font-mono">🔥 AIMBOT 9000</CardTitle>
              <CardDescription className="font-mono text-red-200">
                Never miss again! Totally not detected!
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-2 border-yellow-500 bg-yellow-950/50 transform -rotate-1">
            <CardHeader>
              <CardTitle className="text-yellow-400 font-mono">⚡ SPEEDHAX</CardTitle>
              <CardDescription className="font-mono text-yellow-200">
                Go faster than physics allows!
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-2 border-purple-500 bg-purple-950/50 transform rotate-2">
            <CardHeader>
              <CardTitle className="text-purple-400 font-mono">🌟 WALLHAX</CardTitle>
              <CardDescription className="font-mono text-purple-200">
                See through walls like Superman!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Testimonials */}
        <Card className="mb-8 border-4 border-dashed border-pink-500 bg-gradient-to-r from-pink-950/50 to-blue-950/50">
          <CardHeader>
            <CardTitle className="text-3xl font-mono text-pink-400">
              💬 TESTIMONIALS FROM PROS 💬
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="font-mono text-left">
              <p className="text-green-400">"I was noob, now I'm pro! Thanks ROFLBOX!" - xX_PrO_GaMeR_Xx</p>
              <p className="text-blue-400">"Best h4x ever! My mom thinks I'm good at games now!" - MLG_360_NoScoper</p>
              <p className="text-yellow-400">"ROFLBOX made me the best player in the world!" - Definitely_Not_Fake_Review</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-white/70 font-mono bg-black/50 p-4 border border-green-400 rounded">
        </footer>
      </div>
    </div>
  )
}

export default App
