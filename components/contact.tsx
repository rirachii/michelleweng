"use client"

import { Mail, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <section className="min-h-screen flex items-center px-4 py-20 bg-secondary/5">
      <div className="max-w-2xl w-full mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">Contact Me</h2>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          I'm always interested in hearing about new projects and opportunities. Feel free to reach out if you'd like to
          work together!
        </p>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <a
            href="mailto:michelleweng25@gmail.com"
            className="p-8 rounded-2xl bg-background hover:bg-secondary/20 transition-colors group"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mb-4 group-hover:bg-accent/30 transition-colors">
              <Mail className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <p className="text-muted-foreground">michelleweng25@gmail.com</p>
          </a>

          <div className="p-8 rounded-2xl bg-background">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mb-4">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Location</h3>
            <p className="text-muted-foreground">New York, NY</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          <a
            href="https://linkedin.com/in/wengmichelle"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-semibold"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/rirachii"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-semibold"
          >
            GitHub
          </a>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border text-muted-foreground">
          <p>&copy; 2025 Michelle Weng. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}
