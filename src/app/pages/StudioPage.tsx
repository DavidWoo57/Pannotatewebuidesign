import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  Play, Pencil, Circle, Type, Eraser, MoveRight, Undo2, Redo2,
  Upload, Layers, Settings, ChevronRight, Loader2, Check, X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "../components/ThemeToggle";

type Tool = "draw" | "circle" | "text" | "arrow" | "erase" | null;
type GenerationStatus = "idle" | "generating" | "complete" | "error";

export function StudioPage() {
  const [tool, setTool] = useState<Tool>(null);
  const [motionPrompt, setMotionPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>("idle");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setGenerationStatus("generating");
    setTimeout(() => {
      setGenerationStatus("complete");
      setTimeout(() => setGenerationStatus("idle"), 3000);
    }, 3000);
  };

  // Canvas drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!tool || tool === "erase") return;
      setIsDrawing(true);
      const pos = getMousePos(e);
      setLastPos(pos);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing || !lastPos || !tool) return;
      const pos = getMousePos(e);

      ctx.strokeStyle = "rgba(167, 139, 250, 0.8)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";

      if (tool === "draw") {
        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }

      setLastPos(pos);
    };

    const handleMouseUp = () => {
      if (tool === "circle" && lastPos) {
        ctx.strokeStyle = "rgba(167, 139, 250, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(lastPos.x, lastPos.y, 40, 0, Math.PI * 2);
        ctx.stroke();
      }

      setIsDrawing(false);
      setLastPos(null);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [tool, isDrawing, lastPos]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-surface-overlay backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="font-medium tracking-tight">Pannotate</span>
          </Link>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link to="/projects" className="hover:text-foreground transition-colors">Projects</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Untitled Project</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/outputs"
            className="px-4 py-2 rounded-lg bg-muted hover:bg-accent transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Outputs
          </Link>
          <Link
            to="/projects"
            className="px-4 py-2 rounded-lg bg-muted hover:bg-accent transition-colors text-sm font-medium"
          >
            Save Project
          </Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tools */}
        <div className="w-20 border-r border-border bg-card flex flex-col items-center py-6 gap-3">
          <button
            onClick={() => setTool(tool === "draw" ? null : "draw")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              tool === "draw"
                ? "bg-tool-active-bg border border-brand-violet/30 text-brand-violet"
                : "bg-muted hover:bg-accent text-muted-foreground hover:text-foreground"
            }`}
            title="Draw"
          >
            <Pencil className="w-5 h-5" />
          </button>

          <button
            onClick={() => setTool(tool === "circle" ? null : "circle")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              tool === "circle"
                ? "bg-tool-active-bg border border-brand-violet/30 text-brand-violet"
                : "bg-muted hover:bg-accent text-muted-foreground hover:text-foreground"
            }`}
            title="Circle"
          >
            <Circle className="w-5 h-5" />
          </button>

          <button
            onClick={() => setTool(tool === "arrow" ? null : "arrow")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              tool === "arrow"
                ? "bg-tool-active-bg border border-brand-violet/30 text-brand-violet"
                : "bg-muted hover:bg-accent text-muted-foreground hover:text-foreground"
            }`}
            title="Arrow"
          >
            <MoveRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setTool(tool === "text" ? null : "text")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              tool === "text"
                ? "bg-tool-active-bg border border-brand-violet/30 text-brand-violet"
                : "bg-muted hover:bg-accent text-muted-foreground hover:text-foreground"
            }`}
            title="Text"
          >
            <Type className="w-5 h-5" />
          </button>

          <button
            onClick={() => setTool(tool === "erase" ? null : "erase")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              tool === "erase"
                ? "bg-tool-active-bg border border-brand-violet/30 text-brand-violet"
                : "bg-muted hover:bg-accent text-muted-foreground hover:text-foreground"
            }`}
            title="Erase"
          >
            <Eraser className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          <button
            onClick={clearCanvas}
            className="w-12 h-12 rounded-xl bg-muted hover:bg-accent text-muted-foreground hover:text-foreground flex items-center justify-center transition-all"
            title="Undo"
          >
            <Undo2 className="w-5 h-5" />
          </button>

          <button
            className="w-12 h-12 rounded-xl bg-muted hover:bg-accent text-muted-foreground hover:text-foreground flex items-center justify-center transition-all"
            title="Redo"
          >
            <Redo2 className="w-5 h-5" />
          </button>

          <button
            className="w-12 h-12 rounded-xl bg-muted hover:bg-accent text-muted-foreground hover:text-foreground flex items-center justify-center transition-all"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Container */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
            <div className="relative max-w-6xl w-full">
              {!uploadedImage ? (
                <div className="aspect-video rounded-2xl border-2 border-dashed border-canvas-border bg-canvas-background flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg mb-2">Upload an image to start</p>
                    <p className="text-sm text-muted-foreground">Drag and drop or click to browse</p>
                  </div>
                  <label className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium cursor-pointer hover:bg-primary/90 transition-colors">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-canvas-border shadow-2xl">
                  <img 
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full aspect-video object-cover"
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full cursor-crosshair"
                  />
                  
                  {/* Tool Indicator */}
                  {tool && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-surface-overlay backdrop-blur-xl border border-border text-sm flex items-center gap-2"
                    >
                      {tool === "draw" && <Pencil className="w-3.5 h-3.5 text-brand-violet" />}
                      {tool === "circle" && <Circle className="w-3.5 h-3.5 text-brand-violet" />}
                      {tool === "arrow" && <MoveRight className="w-3.5 h-3.5 text-brand-violet" />}
                      {tool === "text" && <Type className="w-3.5 h-3.5 text-brand-violet" />}
                      {tool === "erase" && <Eraser className="w-3.5 h-3.5 text-brand-violet" />}
                      <span className="text-foreground capitalize">{tool} Mode</span>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Control Panel */}
          <div className="border-t border-border bg-surface-overlay backdrop-blur-xl p-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col gap-4">
                {/* Motion Prompt */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Motion Description</label>
                  <input
                    type="text"
                    value={motionPrompt}
                    onChange={(e) => setMotionPrompt(e.target.value)}
                    placeholder="Describe the motion and camera movement... (e.g., Camera slowly pans right revealing the mountain peak)"
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                      Continue from Last Frame
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                      New Shot
                    </button>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={!uploadedImage || generationStatus === "generating"}
                    className="px-8 py-3 bg-gradient-to-r from-brand-violet to-brand-fuchsia text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {generationStatus === "generating" && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {generationStatus === "complete" && (
                      <Check className="w-4 h-4" />
                    )}
                    {generationStatus === "idle" && <Play className="w-4 h-4" />}
                    {generationStatus === "generating" ? "Generating..." : generationStatus === "complete" ? "Complete!" : "Generate Video"}
                  </button>
                </div>

                {/* Generation Progress */}
                <AnimatePresence>
                  {generationStatus === "generating" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 rounded-xl bg-card border border-border">
                        <div className="flex items-center gap-3 mb-3">
                          <Loader2 className="w-4 h-4 text-brand-violet animate-spin" />
                          <span className="text-sm text-foreground">Generating video clip...</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-brand-violet to-brand-fuchsia"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
