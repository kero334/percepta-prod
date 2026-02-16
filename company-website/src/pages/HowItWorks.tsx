import { motion } from "framer-motion";
import {
  Camera,
  Cpu,
  AlertCircle,
  CheckCircle,
  Cloud,
  HardDrive,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function HowItWorks() {
  const pipeline = [
    {
      icon: Camera,
      title: "Camera Input",
      description: "High-resolution video feeds from facility cameras",
      color: "text-primary",
    },
    {
      icon: Cpu,
      title: "AI Perception",
      description: "Computer vision identifies people and equipment",
      color: "text-secondary",
    },
    {
      icon: AlertCircle,
      title: "Proximity Analysis",
      description: "Calculate spatial relationships and distances",
      color: "text-accent",
    },
    {
      icon: Cpu,
      title: "Risk Reasoning",
      description: "Contextual AI assesses danger and urgency",
      color: "text-primary",
    },
    {
      icon: AlertCircle,
      title: "Alert & Recommendation",
      description: "Generate specific, actionable guidance",
      color: "text-destructive",
    },
    {
      icon: CheckCircle,
      title: "Human Confirmation",
      description: "Supervisor reviews and responds to alerts",
      color: "text-secondary",
    },
  ];

  const deploymentOptions = [
    {
      icon: Cloud,
      title: "Cloud Processing",
      description:
        "Centralized processing with high computational resources for complex analysis",
      benefits: [
        "Scalable compute power",
        "Centralized model updates",
        "Multi-site coordination",
      ],
    },
    {
      icon: HardDrive,
      title: "Edge Processing",
      description:
        "On-premises processing for low-latency responses and enhanced data security",
      benefits: [
        "Sub-second response times",
        "Enhanced privacy",
        "Reduced bandwidth needs",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-16">
        <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                How It Works
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From camera input to actionable safety recommendations in
                milliseconds
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Processing Pipeline
              </h2>
              <p className="text-lg text-muted-foreground">
                Six-stage intelligent safety system
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pipeline.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all border-border hover:border-primary/50 relative">
                      <CardContent className="p-6">
                        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center text-sm font-bold text-foreground">
                          {index + 1}
                        </div>
                        <div
                          className={`${stage.color} mb-4 inline-flex p-3 rounded-xl bg-primary/5`}
                        >
                          <Icon size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {stage.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-4 text-center">
                    End-to-End Process Flow
                  </h3>
                  <div className="flex items-center justify-center flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="font-medium">Camera</span>
                    <ArrowRight size={16} className="text-primary" />
                    <span className="font-medium">AI Perception</span>
                    <ArrowRight size={16} className="text-primary" />
                    <span className="font-medium">Proximity Analysis</span>
                    <ArrowRight size={16} className="text-primary" />
                    <span className="font-medium">Risk Reasoning</span>
                    <ArrowRight size={16} className="text-primary" />
                    <span className="font-medium">Alert</span>
                    <ArrowRight size={16} className="text-primary" />
                    <span className="font-medium">Human Confirmation</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Deployment Options
              </h2>
              <p className="text-lg text-muted-foreground">
                Flexible architecture for your security and performance needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {deploymentOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="h-full border-border hover:shadow-lg transition-shadow">
                      <CardContent className="p-8">
                        <div className="text-primary mb-4 inline-flex p-4 rounded-xl bg-primary/5">
                          <Icon size={32} />
                        </div>
                        <h3 className="text-2xl font-semibold text-foreground mb-4">
                          {option.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {option.description}
                        </p>
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                            Key Benefits
                          </p>
                          {option.benefits.map((benefit) => (
                            <div
                              key={benefit}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle
                                size={18}
                                className="text-secondary mt-0.5 flex-shrink-0"
                              />
                              <span className="text-sm text-muted-foreground">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Why Explainability Matters
              </h2>

              <Card className="border-border mb-8">
                <CardContent className="p-8">
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    Unlike black-box AI systems, Percepta provides clear
                    reasoning for every alert. Supervisors understand not just
                    what the system detected, but why it's dangerous and what
                    action to take.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-foreground mb-2">
                        Traditional Alert
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        "Proximity warning: Zone B"
                      </p>
                    </div>
                    <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                      <p className="text-sm font-semibold text-foreground mb-2">
                        Percepta Alert
                      </p>
                      <p className="text-sm text-foreground">
                        "Worker approaching active forklift path. Recommend
                        immediate zone clearance."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                    Why Humans Remain in Control
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Percepta is designed as an intelligent assistant, not an
                    autonomous system. Every alert requires human confirmation,
                    ensuring that experienced supervisors make final safety
                    decisions while benefiting from AI-powered insights.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={18} className="text-secondary" />
                    <span>Human judgment preserved</span>
                    <span className="text-border">|</span>
                    <CheckCircle size={18} className="text-secondary" />
                    <span>AI augmentation, not replacement</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FileText size={48} className="mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Technical Dossier
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Dive deeper into our architecture, model design, and validation
                methodology
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Download Technical Dossier (PDF)
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
