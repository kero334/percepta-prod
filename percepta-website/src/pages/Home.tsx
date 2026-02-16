import { motion } from "framer-motion";
import { Link } from "react-router";
import { Eye, Brain, Shield, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const valueBlocks = [
    {
      icon: Eye,
      title: "Perceive",
      description:
        "Detect hazardous proximity between workers and industrial equipment using advanced computer vision",
      color: "text-primary",
    },
    {
      icon: Brain,
      title: "Understand",
      description:
        "Reason about risk and context, not just objects. Our AI understands dangerous situations before they escalate",
      color: "text-secondary",
    },
    {
      icon: Shield,
      title: "Prevent",
      description:
        "Recommend immediate corrective actions in real-time to prevent accidents and protect workers",
      color: "text-accent",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Analyze Industrial Environments",
      description:
        "Our system continuously monitors factory floors, warehouses, and production areas",
    },
    {
      number: "02",
      title: "Understand Risk Context",
      description:
        "AI processes spatial relationships and identifies potential hazards with explainable reasoning",
    },
    {
      number: "03",
      title: "Alert and Recommend Actions",
      description:
        "Provide actionable guidance to supervisors and workers to prevent near-miss situations",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-16">
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10 py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Cognitive AI that prevents industrial accidents
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  We build an AI intelligence layer that detects hazardous
                  proximity between workers and industrial equipment and
                  recommends preventive actions in real time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/pilot">
                    <Button size="lg" className="w-full sm:w-auto">
                      Request a Pilot
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download One-Pager
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-square bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm border border-border">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <div className="relative h-full flex items-center justify-center">
                    <div className="w-full max-w-sm">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="relative bg-card border-2 border-primary/40 rounded-2xl p-6 shadow-xl">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-3 w-3 rounded-full bg-destructive animate-pulse"></div>
                            <span className="text-sm font-semibold text-foreground">
                              Hazard Detected
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">
                            Worker approaching active forklift zone
                          </p>
                          <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                            <p className="text-xs font-medium text-accent-foreground">
                              Recommended Action: Immediate zone clearance
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How Percepta Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three-step intelligent safety system
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {valueBlocks.map((block, index) => {
                const Icon = block.icon;
                return (
                  <motion.div
                    key={block.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow border-border">
                      <CardContent className="p-8">
                        <div
                          className={`${block.color} mb-6 inline-flex p-3 rounded-xl bg-primary/5`}
                        >
                          <Icon size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {block.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {block.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Simple, Effective Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From detection to prevention in milliseconds
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2"></div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Link to="/how-it-works">
                <Button variant="outline" size="lg">
                  Learn More About Our Technology
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to make your facility safer?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Join our pilot program and validate Percepta's effectiveness in
                your industrial environment
              </p>
              <Link to="/pilot">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Request a Pilot Program
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
