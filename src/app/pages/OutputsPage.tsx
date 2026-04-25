import { useState } from "react";
import { Link } from "react-router";
import {
  Play, Download, Trash2, MoreVertical, Clock, Check, AlertCircle,
  Filter, Search, ArrowLeft, Eye, Share2, Plus
} from "lucide-react";
import { motion } from "motion/react";
import { ThemeToggle } from "../components/ThemeToggle";

type JobStatus = "processing" | "completed" | "failed";

interface Job {
  id: string;
  thumbnail: string;
  prompt: string;
  status: JobStatus;
  createdAt: string;
  duration: string;
  projectName: string;
}

const mockJobs: Job[] = [
  {
    id: "1",
    thumbnail: "https://images.unsplash.com/photo-1659990589738-c653e1c96239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnMlMjBkcmFtYXRpY3xlbnwxfHx8fDE3NzY2NzY1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    prompt: "Camera pans right revealing mountain peak at sunset with dramatic clouds",
    status: "completed",
    createdAt: "2 hours ago",
    duration: "4.2s",
    projectName: "Mountain Series"
  },
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1703004912901-3045e5b2b56e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGUlMjBnb2xkZW4lMjBob3VyfGVufDF8fHx8MTc3NjU4NDE3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    prompt: "Slow dolly forward through desert landscape, subject walks into frame from right",
    status: "processing",
    createdAt: "5 minutes ago",
    duration: "3.8s",
    projectName: "Desert Journey"
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1642019366565-f58236057c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwdXJiYW4lMjBzdW5zZXR8ZW58MXx8fHwxNzc2Njc2NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    prompt: "City street at golden hour, camera tracks forward as traffic flows by",
    status: "completed",
    createdAt: "1 day ago",
    duration: "5.0s",
    projectName: "Urban Stories"
  },
  {
    id: "4",
    thumbnail: "https://images.unsplash.com/photo-1745847768366-d44dcef9ef35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBjYW1lcmElMjBzdHVkaW98ZW58MXx8fHwxNzc2Njc2NTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    prompt: "Subject turns head slowly to camera, shallow depth of field background blur",
    status: "failed",
    createdAt: "3 days ago",
    duration: "-",
    projectName: "Portrait Tests"
  }
];

export function OutputsPage() {
  const [filter, setFilter] = useState<JobStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = mockJobs.filter(job => {
    const matchesFilter = filter === "all" || job.status === filter;
    const matchesSearch = job.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case "processing":
        return <Clock className="w-4 h-4 text-warning animate-pulse" />;
      case "completed":
        return <Check className="w-4 h-4 text-success" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case "processing":
        return "bg-warning/10 border-warning/20 text-warning";
      case "completed":
        return "bg-success/10 border-success/20 text-success";
      case "failed":
        return "bg-destructive/10 border-destructive/20 text-destructive";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-surface-overlay backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link
                to="/studio"
                className="w-10 h-10 rounded-xl bg-muted hover:bg-accent flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-medium tracking-tight">Outputs & Jobs</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your generated video clips</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                to="/studio"
                className="px-6 py-2.5 bg-gradient-to-r from-brand-violet to-brand-fuchsia text-white rounded-xl font-medium hover:opacity-90 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Generation
              </Link>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by prompt or project name..."
                className="w-full pl-10 pr-4 py-2.5 bg-input-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === "all"
                    ? "bg-muted text-foreground"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === "completed"
                    ? "bg-success/20 text-success"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter("processing")}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === "processing"
                    ? "bg-warning/20 text-warning"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Processing
              </button>
              <button
                onClick={() => setFilter("failed")}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === "failed"
                    ? "bg-destructive/20 text-destructive"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Failed
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground mb-2">No jobs found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-border/60 transition-all"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-canvas-background">
                  <img
                    src={job.thumbnail}
                    alt={job.prompt}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 backdrop-blur-xl ${getStatusColor(job.status)}`}>
                    {getStatusIcon(job.status)}
                    <span className="capitalize">{job.status}</span>
                  </div>

                  {/* Duration Badge */}
                  {job.status === "completed" && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-surface-overlay backdrop-blur-xl border border-border text-xs font-medium">
                      {job.duration}
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {job.status === "completed" && (
                      <>
                        <button className="w-10 h-10 rounded-xl bg-muted/80 backdrop-blur-xl border border-border flex items-center justify-center hover:bg-accent transition-colors">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 rounded-xl bg-muted/80 backdrop-blur-xl border border-border flex items-center justify-center hover:bg-accent transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Processing Progress */}
                  {job.status === "processing" && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                      <motion.div
                        className="h-full bg-gradient-to-r from-warning to-warning/80"
                        initial={{ width: "0%" }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">{job.projectName}</p>
                      <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
                        {job.prompt}
                      </p>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{job.createdAt}</span>

                    {job.status === "completed" && (
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {job.status === "failed" && (
                      <button className="px-3 py-1 rounded-lg bg-muted hover:bg-accent text-xs font-medium text-foreground transition-colors">
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-12 grid grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <p className="text-sm text-muted-foreground mb-2">Total Generations</p>
            <p className="text-3xl font-medium">{mockJobs.length}</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <p className="text-sm text-muted-foreground mb-2">Completed</p>
            <p className="text-3xl font-medium text-success">
              {mockJobs.filter(j => j.status === "completed").length}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <p className="text-sm text-muted-foreground mb-2">Processing</p>
            <p className="text-3xl font-medium text-warning">
              {mockJobs.filter(j => j.status === "processing").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
