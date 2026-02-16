import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import {
  Home,
  FileText,
  AlertTriangle,
  Settings,
  Users,
  Folder,
  Mail,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const pages = [
    {
      id: "home",
      name: "Home",
      description: "Edit hero section, value blocks, and CTAs",
      icon: Home,
      color: "text-primary",
    },
    {
      id: "what-we-do",
      name: "What We Do",
      description: "Edit capabilities and key principles",
      icon: FileText,
      color: "text-secondary",
    },
    {
      id: "use-case",
      name: "Use Case",
      description: "Edit H-PROX content and success metrics",
      icon: AlertTriangle,
      color: "text-accent",
    },
    {
      id: "how-it-works",
      name: "How It Works",
      description: "Edit pipeline, deployment options, and explainability",
      icon: Settings,
      color: "text-primary",
    },
    {
      id: "pilot",
      name: "Pilot Program",
      description: "Edit pilot details, KPIs, and form",
      icon: FileText,
      color: "text-secondary",
    },
    {
      id: "team",
      name: "Team",
      description: "Add, edit, or remove team members",
      icon: Users,
      color: "text-accent",
    },
    {
      id: "materials",
      name: "Materials",
      description: "Manage videos, presentations, and PDFs with live embeds",
      icon: Folder,
      color: "text-primary",
    },
    {
      id: "contact",
      name: "Contact",
      description: "Edit contact information and reasons to reach out",
      icon: Mail,
      color: "text-secondary",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Admin Panel – Percepta Website
              </h1>
              <p className="text-lg text-muted-foreground">
                Select a page to edit its content. Changes are saved immediately.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page, index) => {
              const Icon = page.icon;
              return (
                <motion.div
                  key={page.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link to={`/admin/edit/${page.id}`}>
                    <Card className="h-full hover:shadow-lg transition-all border-border hover:border-primary/50 cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`${page.color} p-3 rounded-xl bg-primary/5 group-hover:scale-110 transition-transform`}
                          >
                            <Icon size={28} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {page.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {page.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-primary font-medium">
                              <span>Edit Page</span>
                              <ArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition-transform"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Quick Actions
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      View the live website or manage global settings
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link to="/" target="_blank">
                      <button className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors text-sm font-medium">
                        View Live Site
                      </button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
