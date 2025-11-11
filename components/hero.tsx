"use client"

import { Mail, Linkedin, Github, Twitter, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Social Links */}
          <div className="flex gap-4">
            <a href="https://linkedin.com/in/wengmichelle" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-accent rounded-lg transition-colors">
              <Linkedin className="w-6 h-6 text-accent" />
            </a>
            <a href="https://github.com/rirachii" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-accent rounded-lg transition-colors">
              <Github className="w-6 h-6 text-accent" />
            </a>
          </div>

          {/* Intro Text */}
          <div className="space-y-4">
            <p className="text-muted-foreground">Hi, I'm</p>
            <h1 className="text-5xl lg:text-6xl font-bold text-balance">Michelle Weng</h1>
            <p className="text-xl text-muted-foreground">Fullstack Engineer</p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience building products end-to-end, from designing clean front-end interfaces to architecting scalable back-end systems. I care deeply about thoughtful design, clear problem-solving, and shipping work that feels intuitive and empowering to the user.
            </p>
          </div>

          {/* CTA Button */}
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-6 text-base">
            <Mail className="w-4 h-4 mr-2" />
            Contact Me
          </Button>
        </div>

        {/* Right - Profile Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-accent/50 opacity-20"></div>
            <img
              src="/me.jpg"
              alt="Profile"
              className="relative w-full h-full rounded-full object-cover border-8 border-accent/20"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-sm text-muted-foreground flex items-center gap-2">Scroll down</p>
        <button onClick={scrollDown} className="p-2 hover:bg-accent/10 rounded-full transition-colors">
          <ArrowDown className="w-5 h-5 text-accent" />
        </button>
      </div>
    </section>
  )
}
