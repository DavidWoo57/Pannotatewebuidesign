import { Link } from "react-router";
import { motion } from "motion/react";
import { Play, Sparkles, Frame, Layers, ArrowRight, Pencil, MessageSquare, MoveRight } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface-overlay backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 fill-white" />
            </div>
            <span className="text-xl tracking-tight">Pannotate</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#workflow" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Workflow</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link
              to="/studio"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border mb-8">
              <Sparkles className="w-3.5 h-3.5 text-brand-violet" />
              <span className="text-xs text-muted-foreground">Spatial AI Video Generation</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight">
              Direct your vision
              <span className="block bg-gradient-to-r from-brand-violet via-brand-fuchsia to-brand-pink bg-clip-text text-transparent">
                frame by frame
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Transform still images into cinematic video with precise spatial control.
              Draw, annotate, and guide AI to create exactly what you envision.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/studio"
                className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                Start Creating
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 border border-border rounded-xl font-medium hover:bg-muted transition-colors flex items-center gap-2">
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto max-w-6xl"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1659990589738-c653e1c96239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnMlMjBkcmFtYXRpY3xlbnwxfHx8fDE3NzY2NzY1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Cinematic landscape"
                className="w-full aspect-video object-cover"
              />
              
              {/* Annotation Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full">
                  <motion.path
                    d="M 200 200 Q 400 150 600 250"
                    stroke="rgba(167, 139, 250, 0.8)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <motion.circle
                    cx="600"
                    cy="250"
                    r="40"
                    stroke="rgba(167, 139, 250, 0.8)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 2 }}
                  />
                </svg>
              </div>

              {/* Annotation UI Mock */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute bottom-6 left-6 right-6 bg-surface-overlay backdrop-blur-xl border border-border rounded-xl p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-tool-active-bg border border-brand-violet/30 flex items-center justify-center">
                    <Pencil className="w-4 h-4 text-brand-violet" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                    <MoveRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1" />
                  <button className="px-4 py-1.5 bg-brand-violet text-white rounded-lg text-sm font-medium">
                    Generate
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Camera pans right revealing mountain peak at sunset..."
                  className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                  readOnly
                />
              </motion.div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-violet-500/20 to-transparent blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Precision meets creativity</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-grade tools for spatial AI video generation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-tool-active-bg border border-brand-violet/30 flex items-center justify-center mb-6">
                <Pencil className="w-6 h-6 text-brand-violet" />
              </div>
              <h3 className="text-2xl mb-3">Spatial Annotations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Draw directly on your image to define motion paths, highlight subjects, and guide the AI with precision.
                Your annotations become spatial instructions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(217,70,239,0.15)] border border-brand-fuchsia/30 flex items-center justify-center mb-6">
                <Frame className="w-6 h-6 text-brand-fuchsia" />
              </div>
              <h3 className="text-2xl mb-3">Shot-Based Workflow</h3>
              <p className="text-muted-foreground leading-relaxed">
                Build sequences naturally. Continue from the last frame or start fresh.
                Chain clips together to create complete video projects with narrative flow.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(236,72,153,0.15)] border border-brand-pink/30 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-brand-pink" />
              </div>
              <h3 className="text-2xl mb-3">Project Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Organize your generated clips into projects. Review outputs, manage generations,
                and build a storyboard that brings your creative vision to life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Your creative process, amplified</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to completion in four intuitive steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-tool-active-bg border border-brand-violet/30 text-sm text-brand-violet mb-4">
                Step 1
              </div>
              <h3 className="text-3xl mb-4">Upload & Annotate</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Start with any still image. Use our canvas tools to draw motion paths,
                circle subjects, add arrows, and mark exactly what should move and how.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-violet" />
                  Precision drawing tools
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-violet" />
                  Text and shape annotations
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-violet" />
                  Directional markup
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border bg-card">
              <img 
                src="https://images.unsplash.com/photo-1703004912901-3045e5b2b56e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGUlMjBnb2xkZW4lMjBob3VyfGVufDF8fHx8MTc3NjU4NDE3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Desert landscape"
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-2xl overflow-hidden border border-border bg-card">
              <img
                src="https://images.unsplash.com/photo-1642019366565-f58236057c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwdXJiYW4lMjBzdW5zZXR8ZW58MXx8fHwxNzc2Njc2NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="City street"
                className="w-full aspect-video object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block px-3 py-1 rounded-full bg-[rgba(217,70,239,0.15)] border border-brand-fuchsia/30 text-sm text-brand-fuchsia mb-4">
                Step 2
              </div>
              <h3 className="text-3xl mb-4">Generate & Iterate</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Combine your visual annotations with a motion description.
                Generate clips, review results, and continue building your sequence shot by shot.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-fuchsia" />
                  AI-powered video generation
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-fuchsia" />
                  Continue from last frame
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-fuchsia" />
                  Create new shots seamlessly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-violet/20 via-brand-fuchsia/20 to-brand-pink/20 border border-border p-16 text-center">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl mb-6 tracking-tight">Ready to create?</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join creators using Pannotate to bring their visual stories to life with AI-powered precision.
              </p>
              <Link
                to="/studio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Start Creating for Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-violet to-brand-fuchsia rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl tracking-tight">Pannotate</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Docs</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
