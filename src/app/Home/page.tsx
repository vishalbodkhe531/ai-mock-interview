import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-20 bg-background text-foreground">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Ace Your Next Interview with AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-4">
          Get customized mock interview questions based on your job role,
          skills, and experience. Prepare smarter with AI.
        </p>
        <div className="mt-6">
          <Link href="/dashboard">
            <Button size="lg" className="flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-20">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="border border-border bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Ready to level up your interview prep?
        </h2>
        <p className="text-muted-foreground mt-2">
          Join thousands of developers using AI to practice real interview
          questions.
        </p>
        <div className="mt-6">
          <Link href="/dashboard">
            <Button size="lg" variant="outline">
              Try it now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

const features = [
  {
    title: "Tailored Questions",
    description:
      "AI generates interview questions based on your job role, skills, and years of experience.",
    icon: "💼",
  },
  {
    title: "Real-time Generation",
    description:
      "Get high-quality, industry-specific questions instantly using advanced AI models.",
    icon: "⚡",
  },
  {
    title: "Practice Anywhere",
    description:
      "Access your mock interviews anytime, on any device, with a clean and responsive design.",
    icon: "📱",
  },
];
