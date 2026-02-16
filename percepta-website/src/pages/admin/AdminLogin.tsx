import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ADMIN_PASSWORD = "kero2005";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay for better UX
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem("adminAuthenticated", "true");
        toast.success("Access granted!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Incorrect password. Please try again.");
        setPassword("");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Access
          </h1>
          <p className="text-muted-foreground">
            Enter password to access the admin panel
          </p>
        </div>

        <Card className="border-border shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  disabled={isLoading}
                  autoFocus
                  className="text-lg"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading || !password}
              >
                {isLoading ? (
                  "Verifying..."
                ) : (
                  <>
                    Access Admin Panel
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <a
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Website
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Admin panel for Percepta website content management
          </p>
        </div>
      </motion.div>
    </div>
  );
}
