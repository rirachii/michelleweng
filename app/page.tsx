import Hero from "@/components/hero"
import About from "@/components/about"
import Qualification from "@/components/qualification"
import Contact from "@/components/contact"

export const metadata = {
  title: "Portfolio | Michelle Weng",
  description: "Fullstack Engineer - Creating meaningful impact at scale",
}

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <About />
      <Qualification />
      <Contact />
    </main>
  )
}
