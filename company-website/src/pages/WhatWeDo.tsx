import { motion } from "framer-motion";
import { Eye, Brain, MessageSquare, Lock, Cpu, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function WhatWeDo() {
  const capabilities = [
    {
      icon: Eye,
      title: "Perception",
      description:
        "Advanced computer vision for detecting people, machinery, and spatial relationships in complex industrial environments",
      details: [
        "Multi-object tracking",
        "Real-time position analysis",
        "Equipment state recognition",
      ],
    },
    {
      icon: Brain,
      title: "Reasoning",
      description:
        "Contextual AI that understands danger beyond simple object detection, analyzing risk factors and environmental conditions",
      details: [
        "Risk assessment algorithms",
        "Contextual situation analysis",
        "Predictive hazard modeling",
      ],
    },
    {
      icon: MessageSquare,
      title: "Recommendation",
      description:
        "Actionable guidance system that provides clear, immediate instructions rather than generic alerts",
      details: [
        "Specific corrective actions",
        "Priority-based notifications",
        "Multi-channel delivery",
      ],
    },
  ];

  const principles = [
    {
      icon: MessageSquare,
      title: "Explainable AI",
      description:
        "Every decision and alert comes with clear reasoning, allowing supervisors to understand why the system flagged a situation",
    },
    {
      icon: Users,
      title: "Human-in-the-Loop",
      description:
        "Workers and supervisors remain in control, with the AI serving as an intelligent assistant rather than an autonomous decision-maker",
    },
    {
      icon: Lock,
      title: "Privacy-by-Design",
      description:
        "Built with data protection at the core, ensuring worker privacy while maintaining safety effectiveness",
    },
    {
      icon: Cpu,
      title: "Edge-Ready Architecture",
      description:
        "Capable of running on-premises or at the edge for low-latency responses and enhanced data security",
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
                What We Do
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Percepta is a software-first AI intelligence layer designed to
                proactively improve industrial safety by identifying near-miss
                situations before accidents happen.
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
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Core Capabilities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three integrated systems working together to prevent accidents
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow border-border">
                      <CardContent className="p-8">
                        <div className="text-primary mb-6 inline-flex p-3 rounded-xl bg-primary/5">
                          <Icon size={32} />
                        </div>
                        <h3 className="text-2xl font-semibold text-foreground mb-4">
                          {capability.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {capability.description}
                        </p>
                        <ul className="space-y-2">
                          {capability.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
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
                Key Principles
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built on a foundation of transparency, control, and security
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full border-border hover:border-primary/50 transition-colors">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4">
                          <div className="text-secondary p-3 rounded-xl bg-secondary/10 flex-shrink-0">
                            <Icon size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">
                              {principle.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {principle.description}
                            </p>
                          </div>
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
              className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12 border border-border"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Software-First?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Traditional safety systems rely on physical barriers and manual
                monitoring. Percepta brings intelligent, adaptive safety that
                learns from your environment and scales with your operations.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    Fast
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Near real-time analysis
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    Flexible
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Adapts to your facility
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    Scalable
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Grows with your needs
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
