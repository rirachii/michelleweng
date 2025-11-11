"use client"

export default function About() {
  const stats = [
    { number: "2+", label: "Years\nExperience" },
    { number: "4+", label: "Hackathon\nWins" },
    { number: "3", label: "Internship\nExperience" },
  ]

  return (
    <section className="min-h-screen flex items-center px-4 py-20 bg-secondary/5">
      <div className="max-w-6xl w-full mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg">My introduction</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img src="/win.jpeg" alt="About" className="rounded-2xl w-full max-w-sm object-cover" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Computer Science graduate from University at Buffalo with experience at JPMorgan Chase & Co. and BMO Bank. 
              Passionate about building scalable solutions and creating meaningful impact through technology.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl lg:text-4xl font-bold text-accent mb-2">{stat.number}</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Download CV Button */}
            {/* <button className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors inline-flex items-center gap-2">
              Download CV
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button> */}
          </div>
        </div>
      </div>
    </section>
  )
}
