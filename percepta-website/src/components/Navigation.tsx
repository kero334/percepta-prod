import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Scroll to top and close menu when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/what-we-do", label: "What We Do" },
    { to: "/use-case", label: "Use Case" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/demo", label: "Live Demo" },
    { to: "/pilot", label: "Pilot Program" },
    { to: "/team", label: "Team" },
    { to: "/materials", label: "Materials" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/percepta-logo.png"
              alt="Percepta"
              className="h-10 w-auto transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-semibold text-foreground">
              Percepta
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.to)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/pilot">
              <Button size="sm" className="ml-4">
                Request a Pilot
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden border-t border-border bg-background"
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  isActive(link.to)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/pilot" onClick={() => setIsOpen(false)}>
              <Button className="w-full mt-4">Request a Pilot</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
