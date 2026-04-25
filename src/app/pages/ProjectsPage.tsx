import { useState } from "react";
import { Link } from "react-router";
import {
  Play, Plus, MoreVertical, Folder, Film, Clock, Calendar,
  Search, Grid3x3, List, ArrowLeft, Trash2, Edit, Copy, Share2
} from "lucide-react";
import { motion } from "motion/react";
import { ThemeToggle } from "../components/ThemeToggle";

type ViewMode = "grid" | "list";

interface Project {
  id: string;
  name: string;
  thumbnail: string;
  clipCount: number;
  duration: string;
  lastModified: string;
  createdAt: string;
  description: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Mountain Series",
    thumbnail: "https://images.unsplash.com/photo-1659990589738-c653e1c96239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnMlMjBkcmFtYXRpY3xlbnwxfHx8fDE3NzY2NzY1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    clipCount: 8,
    duration: "32s",
    lastModified: "2 hours ago",
    createdAt: "Apr 15, 2026",
    description: "Cinematic mountain landscape sequences with dramatic lighting"
  },
  {
    id: "2",
    name: "Desert Journey",
    thumbnail: "https://images.unsplash.com/photo-1703004912901-3045e5b2b56e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGUlMjBnb2xkZW4lMjBob3VyfGVufDF8fHx8MTc3NjU4NDE3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    clipCount: 5,
    duration: "22s",
    lastModified: "5 hours ago",
    createdAt: "Apr 18, 2026",
    description: "Desert exploration with character movement and environment shots"
  },
  {
    id: "3",
    name: "Urban Stories",
    thumbnail: "https://images.unsplash.com/photo-1642019366565-f58236057c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwdXJiYW4lMjBzdW5zZXR8ZW58MXx8fHwxNzc2Njc2NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    clipCount: 12,
    duration: "48s",
    lastModified: "1 day ago",
    createdAt: "Apr 10, 2026",
    description: "City scenes at golden hour with traffic and pedestrian movement"
  },
  {
    id: "4",
    name: "Portrait Tests",
    thumbnail: "https://images.unsplash.com/photo-1745847768366-d44dcef9ef35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBjYW1lcmElMjBzdHVkaW98ZW58MXx8fHwxNzc2Njc2NTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    clipCount: 3,
    duration: "12s",
    lastModified: "3 days ago",
    createdAt: "Apr 5, 2026",
    description: "Character portrait experiments with subtle motion"
  }
];

interface Clip {
  id: string;
  thumbnail: string;
  duration: string;
  order: number;
}

const mockClips: Clip[] = [
  {
    id: "1",
    thumbnail: "https://images.unsplash.com/photo-1659990589738-c653e1c96239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnMlMjBkcmFtYXRpY3xlbnwxfHx8fDE3NzY2NzY1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "4.2s",
    order: 1
  },
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1703004912901-3045e5b2b56e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGUlMjBnb2xkZW4lMjBob3VyfGVufDF8fHx8MTc3NjU4NDE3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "3.8s",
    order: 2
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1642019366565-f58236057c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwdXJiYW4lMjBzdW5zZXR8ZW58MXx8fHwxNzc2Njc2NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "5.0s",
    order: 3
  },
  {
    id: "4",
    thumbnail: "https://images.unsplash.com/photo-1745847768366-d44dcef9ef35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBjYW1lcmElMjBzdHVkaW98ZW58MXx8fHwxNzc2Njc2NTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "4.5s",
    order: 4
  }
];

export function ProjectsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedProject) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Project Detail Header */}
        <header className="border-b border-border bg-surface-overlay backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-xl bg-muted hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-medium tracking-tight">{selectedProject.name}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{selectedProject.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button className="p-2.5 rounded-xl bg-muted hover:bg-accent transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2.5 rounded-xl bg-muted hover:bg-accent transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
                <Link
                  to="/studio"
                  className="px-6 py-2.5 bg-gradient-to-r from-brand-violet to-brand-fuchsia text-white rounded-xl font-medium hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Clip
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Film className="w-4 h-4" />
                <span>{selectedProject.clipCount} clips</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{selectedProject.duration} total</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Updated {selectedProject.lastModified}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Storyboard Timeline */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Storyboard Timeline</h2>
          </div>

          <div className="space-y-4">
            {mockClips.map((clip, index) => (
              <motion.div
                key={clip.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-surface-overlay border border-border hover:border-border transition-all"
              >
                {/* Order Number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-medium text-muted-foreground">
                  {clip.order}
                </div>

                {/* Thumbnail */}
                <div className="relative w-40 h-24 rounded-xl overflow-hidden bg-card flex-shrink-0">
                  <img
                    src={clip.thumbnail}
                    alt={`Clip ${clip.order}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-card/90 backdrop-blur-xl text-xs font-medium">
                    {clip.duration}
                  </div>
                </div>

                {/* Clip Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium mb-1">Shot {clip.order}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Camera movement with spatial annotation guidance
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Add New Clip */}
            <Link
              to="/studio"
              className="flex items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-border hover:border-border hover:bg-muted transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-muted group-hover:bg-accent flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div>
                <p className="font-medium text-foreground group-hover:text-foreground transition-colors">Add New Clip</p>
                <p className="text-sm text-muted-foreground">Continue from last frame or create new shot</p>
              </div>
            </Link>
          </div>

          {/* Export Options */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-brand-violet/10 to-brand-fuchsia/10 border border-brand-violet/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium mb-2">Ready to export?</h3>
                <p className="text-sm text-muted-foreground">Combine all clips into a final video sequence</p>
              </div>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
                Export Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-surface-overlay backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <span className="font-medium tracking-tight">Pannotate</span>
                </Link>
              </div>
              <h1 className="text-2xl font-medium tracking-tight">Projects</h1>
              <p className="text-sm text-muted-foreground mt-1">Organize and manage your video projects</p>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                to="/studio"
                className="px-6 py-2.5 bg-gradient-to-r from-brand-violet to-brand-fuchsia text-white rounded-xl font-medium hover:opacity-90 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Project
              </Link>
            </div>
          </div>

          {/* Search & View Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex items-center gap-2 bg-card rounded-xl p-1 border border-border">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Projects Grid/List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Folder className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground mb-2">No projects found</p>
            <p className="text-sm text-muted-foreground mb-6">Create your first project to get started</p>
            <Link 
              to="/studio"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Project
            </Link>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group bg-surface-overlay rounded-2xl border border-border overflow-hidden hover:border-border transition-all cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-card">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                  
                  {/* Stats */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                    <div className="px-2.5 py-1 rounded-lg bg-card/90 backdrop-blur-xl border border-border text-xs font-medium flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5" />
                      {project.clipCount} clips
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-card/90 backdrop-blur-xl border border-border text-xs font-medium">
                      {project.duration}
                    </div>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                      <Play className="w-6 h-6 fill-white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-1">{project.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Modified {project.lastModified}</span>
                    <span>{project.createdAt}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-surface-overlay border border-border hover:border-border transition-all cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative w-32 h-20 rounded-xl overflow-hidden bg-card flex-shrink-0">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium mb-1">{project.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5" />
                      {project.clipCount} clips
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {project.duration}
                    </span>
                    <span>Modified {project.lastModified}</span>
                  </div>
                </div>

                {/* Actions */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
