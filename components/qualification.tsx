"use client"

import { useState } from "react"
import { Briefcase, BookOpen, Award } from "lucide-react"

export default function Qualification() {
  const [activeTab, setActiveTab] = useState("work")

  const workItems = [
    {
      title: "Software Engineer",
      company: "JPMorgan Chase & Co.",
      period: "Aug 2024 - Sept 2025",
    },
    {
      title: "Software Engineer Intern",
      company: "JPMorgan Chase & Co.",
      period: "June 2023 - Aug 2023",
    },
    {
      title: "Cloud Infrastructure Intern",
      company: "BMO Bank",
      period: "Jan 2023 - Apr 2023",
    },
    {
      title: "REU Undergrad Research",
      company: "Industrial Manufacturing Metaverse",
      period: "May 2022 - Dec 2022",
    },
  ]

  const educationItems = [
    {
      title: "Bachelor of Science in Computer Science",
      school: "University at Buffalo",
      period: "2020 - May 2024",
    },
  ]

  const tabs = [
    { id: "work", label: "Work", icon: Briefcase },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "skills", label: "Skills", icon: Award },
  ]

  const items = activeTab === "work" ? workItems : educationItems

  return (
    <section className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Qualification</h2>
          <p className="text-muted-foreground text-lg">My personal journey</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Timeline */}
        {(activeTab === "work" || activeTab === "education") && (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-accent/30"></div>

            {/* Items */}
            <div className="space-y-12">
              {items.map((item, index) => (
                <div key={index} className={`flex gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Content */}
                  <div className="flex-1">
                    <div className={`space-y-2 ${index % 2 === 0 ? "text-right" : ""}`}>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-accent font-semibold">{item.company || item.school}</p>
                      <p className="text-sm text-muted-foreground">{item.period}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="flex justify-center">
                    <div className="w-4 h-4 bg-accent rounded-full ring-4 ring-background relative z-10"></div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeTab === "skills" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "TypeScript",
              "React",
              "React Native",
              "Java",
              "Python",
              "SQL",
              "PostgreSQL",
              "AWS",
              "GCP",
              "Docker",
              "Git",
              "Linux",
            ].map((skill) => (
              <div
                key={skill}
                className="p-4 rounded-lg bg-secondary/10 text-center font-semibold hover:bg-accent/10 transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
