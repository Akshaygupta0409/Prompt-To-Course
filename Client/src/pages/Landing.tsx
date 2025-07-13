import type React from "react"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { topicAtom } from "../atoms/topic"
import { difficultyAtom } from "../atoms/difficyult"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Sparkles, ArrowRight, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CourseBuilder() {

    const [topic, setTopic] = useState<string>("")
    const [difficulty, setDifficulty] = useState<string>("")
    // Recoil setters - must be at component level
    const setTopicAtom = useSetRecoilState(topicAtom)
    const setDifficultyAtom = useSetRecoilState(difficultyAtom)
    const navigate = useNavigate()    
    // Recoil getters - to read current values
  

    // Log atom values whenever they change
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!topic || !difficulty) return
        
        
   
        setTopicAtom(topic)
        setDifficultyAtom(difficulty)
        navigate("/course")
        // Log the form values (these are immediate)
      
    }

  const difficultyOptions = [
    {
      value: "beginner",
      label: "Beginner",
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    {
      value: "advanced",
      label: "Advanced",
      color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Radial gradients for depth */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-zinc-800/10 via-transparent to-transparent rounded-full"></div>
      </div>

      {/* Header */}
      <header className="relative bg-zinc-900/40 border-b border-zinc-800/50 backdrop-blur-xl shadow-black/40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/25">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white drop-shadow-sm">CourseAI</h1>
                <p className="text-xs text-zinc-400">Professional Learning Platform</p>
              </div>
            </div>
            <Badge className="bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 border-zinc-700/50 backdrop-blur-sm shadow-lg">
              Beta
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-violet-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm shadow-2xl shadow-violet-500/10">
            <Zap className="h-4 w-4" />
            AI-Powered Course Generation
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            Build Professional Courses
            <span className="block text-zinc-400">in Minutes, Not Hours</span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Transform any topic into a structured, comprehensive learning experience with our advanced AI technology.
          </p>
        </div>

        {/* Course Builder Form - Floating Effect */}
        <Card className="relative bg-zinc-900/40 border-zinc-800/50 backdrop-blur-xl shadow-black/40 shadow-lg hover:shadow-2xl hover:shadow-black/50 transition-all duration-500 hover:-translate-y-1">
          {/* Card glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg blur opacity-30"></div>

          <CardContent className="relative p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Topic Input Section */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="topic" className="block text-sm font-semibold text-white mb-2 drop-shadow-sm">
                    Course Topic
                  </label>
                  <p className="text-sm text-zinc-400 mb-3">
                    Enter the subject or skill you want to create a course about
                  </p>
                </div>
                <div className="relative">
                  <Input
                    id="topic"
                    type="text"
                    placeholder="e.g., Advanced React Development, Financial Analysis, Project Management..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="h-14 text-base bg-zinc-800/30 border-zinc-700/50 focus:border-violet-500/50 focus:ring-violet-500/20 placeholder:text-zinc-500 text-white backdrop-blur-sm shadow-inner shadow-black/20 hover:bg-zinc-800/40 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-violet-500/5 to-purple-500/5 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Difficulty Selection */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-semibold text-white mb-2 drop-shadow-sm">
                    Target Audience Level
                  </label>
                  <p className="text-sm text-zinc-400 mb-3">
                    Select the appropriate difficulty level for your learners
                  </p>
                </div>
                <div className="relative">
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="h-14 text-base bg-zinc-800/30 border-zinc-700/50 focus:border-violet-500/50 focus:ring-violet-500/20 text-white backdrop-blur-sm shadow-inner shadow-black/20 hover:bg-zinc-800/40 transition-all duration-300">
                      <SelectValue placeholder="Choose difficulty level" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900/90 border-zinc-800/50 backdrop-blur-xl shadow-2xl shadow-black/50">
                      {difficultyOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="py-3 text-white hover:bg-zinc-800/50 focus:bg-zinc-800/50 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col">
                              <span className="font-medium text-white drop-shadow-sm">{option.label}</span>
                            </div>
                            <Badge className={`ml-3 ${option.color} border shadow-sm`}>{option.label}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Section */}
              <div className="pt-6 border-t border-zinc-800/50">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={!topic || !difficulty }
                    className="relative flex-1 h-14 text-base font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-0 shadow-xl shadow-violet-500/25 hover:shadow-2xl hover:shadow-violet-500/40 hover:-translate-y-0.5"
                  >
                    {/* Button glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-md blur opacity-30 group-hover:opacity-50 transition duration-300"></div>

                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5" />
                        <span>Generate Course</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </Button>
                </div>

                {/* Form Footer */}
                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50"></div>
                    <span>AI-Generated Content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full shadow-sm shadow-blue-400/50"></div>
                    <span>Instant Results</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full shadow-sm shadow-purple-400/50"></div>
                    <span>Professional Quality</span>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Features Grid - Floating Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: "Structured Learning",
              desc: "Automatically organized modules and lessons for optimal learning progression.",
            },
            {
              icon: Sparkles,
              title: "AI-Powered",
              desc: "Advanced algorithms create comprehensive, engaging course content.",
            },
            {
              icon: Zap,
              title: "Instant Generation",
              desc: "Complete courses generated in seconds, ready for immediate use.",
            },
          ].map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="relative w-12 h-12 bg-zinc-800/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-zinc-700/40 transition-all duration-300 shadow-lg shadow-black/20 group-hover:shadow-xl group-hover:shadow-black/30 group-hover:-translate-y-1 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <feature.icon className="relative h-6 w-6 text-zinc-300 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-white mb-2 drop-shadow-sm">{feature.title}</h3>
              <p className="text-sm text-zinc-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
