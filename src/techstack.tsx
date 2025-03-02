import { Card, CardContent } from "@/components/ui/card"

export function TechStack() {
  const technologies = [
    {
      name: "LangGraph",
      description: "Core framework for building the agent's workflow and state management",
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Python",
      description: "Backend language powering the search agent's logic and processing",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "BeautifulSoup",
      description: "Web scraping library for extracting information from websites",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "OpenAI / LangChain",
      description: "AI and NLP technologies for intelligent query processing",
      color: "from-rose-500 to-orange-500",
    },
  ]

  return (
    <div>
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-3xl font-bold text-white">Tech Stack</h2>
        <p className="mx-auto max-w-2xl text-slate-400">
          Built with cutting-edge technologies to deliver powerful search and analysis capabilities
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {technologies.map((tech, index) => (
          <Card key={index} className="overflow-hidden border-slate-800 bg-slate-900/70">
            <div className={`h-2 bg-gradient-to-r ${tech.color}`}></div>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-medium text-white">{tech.name}</h3>
              <p className="text-slate-400">{tech.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

