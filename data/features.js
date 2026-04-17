import { Brain, Briefcase, BarChart3, FileText } from "lucide-react";

export const features = [
  {
    title: "AI Career Guidance",
    description: "Personalized career paths using AI insights.",
    icon: <Brain className="h-6 w-6" />,
    image: "/ai_career.jpeg",
    href: "/ai-career-guidance"
  },
  {
    title: "Knowledge Check",
    description: "Practice Questions with AI feedback.",
    icon: <Briefcase className="h-6 w-6" />,
    image: "/interview.jpeg",
    href: "/interview"
  },
  {
    title: "Market Trends",
    description: "Track salary trends and market demand.",
    icon: <BarChart3 className="h-6 w-6" />,
    image: "/industry.jpeg",
     href: "/dashboard"
  },
  {
    title: "Smart Resume Creation",
    description: "AI-powered resume optimization.",
    icon: <FileText className="h-6 w-6" />,
    image: "/resume.jpeg",
     href: "/resume"
  },
  {
    title: "Cover Letter Builder",
    description: "AI-powered Cover Letter Creation.",
    icon: <FileText className="h-6 w-6" />,
    image: "/cover-letter.jpeg",
     href: "/ai-cover-letter"
  },
  {
    title: "Skill Gap Analysis",
    description: "Identify and address skill gaps using AI insights.",
    icon: <FileText className="h-6 w-6" />,
    image: "/skill-gap.jpeg",
     href: "/skillgap"
  }
];