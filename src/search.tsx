"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Globe, Loader2, Search, Sparkles } from "lucide-react"

export function SearchAgent() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<null | {
    summary: string
    sources: { title: string; url: string }[]
  }>(null)

  const handleSearch = () => {
    if (!query.trim()) return

    setIsSearching(true)
    setSearchResults(null)

    // Simulate search process
    setTimeout(() => {
      setIsSearching(false)
      setSearchResults({
        summary:
          "The LangGraph framework is a powerful tool for building complex, stateful applications with Large Language Models (LLMs). It extends LangChain with a graph-based architecture that allows for more sophisticated agent behaviors and workflows. Key features include state management, cyclical workflows, and advanced debugging capabilities.",
        sources: [
          { title: "LangGraph Documentation", url: "https://langchain-ai.github.io/langgraph/" },
          { title: "Building Agents with LangGraph", url: "https://blog.langchain.dev/langgraph/" },
          { title: "Advanced LLM Applications", url: "https://example.com/llm-apps" },
        ],
      })
    }, 3000)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">Research Assistant</h2>

      <div className="relative mb-8">
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 p-0.5 blur-xl"></div>
        <Card className="overflow-hidden border-slate-800 bg-slate-900/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Input
                  className="h-14 border-slate-700 bg-slate-800/50 pl-12 text-white placeholder:text-slate-400"
                  placeholder="Enter your research query..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              </div>
              <Button
                className="h-12 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:from-indigo-500 hover:to-cyan-500"
                onClick={handleSearch}
                disabled={isSearching || !query.trim()}
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Search Web
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {isSearching && (
        <div className="mb-8 flex flex-col items-center justify-center gap-4 py-12 text-center">
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 animate-ping rounded-full bg-indigo-500 opacity-20"></div>
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600">
              <Brain className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="text-lg font-medium text-white">Processing your query...</div>
          <div className="max-w-md text-sm text-slate-400">
            Searching web sources, analyzing data, and compiling results into a structured report
          </div>
        </div>
      )}

      {searchResults && (
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 p-0.5 blur-xl"></div>
          <Card className="overflow-hidden border-slate-800 bg-slate-900/70 backdrop-blur-sm">
            <CardContent className="p-0">
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="sources">Sources</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="p-6">
                  <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4 text-slate-300">
                    {searchResults.summary}
                  </div>
                </TabsContent>
                <TabsContent value="sources" className="p-6">
                  <div className="space-y-3">
                    {searchResults.sources.map((source, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-800/30 p-4"
                      >
                        <Globe className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />
                        <div>
                          <h3 className="font-medium text-white">{source.title}</h3>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-400 hover:text-indigo-300"
                          >
                            {source.url}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

