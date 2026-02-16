import { motion } from "framer-motion";
import {
  AlertTriangle,
  Factory,
  Warehouse,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function UseCase() {
  const environments = [
    {
      icon: Factory,
      title: "Indoor Manufacturing",
      description: "Production lines with heavy machinery and moving equipment",
    },
    {
      icon: Warehouse,
      title: "Warehouses",
      description: "Distribution centers with forklifts and material handling",
    },
    {
      icon: Factory,
      title: "Production Floors",
      description: "Assembly areas with mixed human-machine operations",
    },
  ];

  const equipmentExamples = [
    "Forklifts and material handlers",
    "Conveyor systems and automated lines",
    "Press machines and heavy equipment",
    "Robotic systems and automated vehicles",
  ];

  const metrics = [
    {
      icon: TrendingUp,
      title: "Precision",
      value: ">90%",
      description: "Target detection accuracy",
    },
    {
      icon: CheckCircle,
      title: "Confirmation Rate",
      value: "High",
      description: "Human-verified alerts",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Near Real-Time",
      description: "Millisecond detection to alert",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-16">
        <section className="py-20 bg-gradient-to-br from-background via-destructive/5 to-accent/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
                <AlertTriangle size={16} />
                <span>Priority Use Case</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Hazardous Proximity Detection
              </h1>
              <p className="text-xl text-muted-foreground">H-PROX</p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  The Problem
                </h2>
                <Card className="border-destructive/30 bg-destructive/5">
                  <CardContent className="p-8">
                    <p className="text-lg text-foreground leading-relaxed mb-4">
                      Workers are frequently injured when entering unsafe
                      proximity zones around moving or dangerous equipment.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Traditional safety measures like floor markings, warning
                      signs, and periodic training are not sufficient to prevent
                      near-miss incidents in dynamic industrial environments
                      where multiple hazards exist simultaneously.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Percepta's Solution
                </h2>
                <Card className="border-secondary/30 bg-secondary/5">
                  <CardContent className="p-8">
                    <p className="text-lg text-foreground leading-relaxed mb-4">
                      Detects when a worker approaches hazardous machinery,
                      explains why the situation is unsafe, and recommends
                      immediate corrective action.
                    </p>
                    <div className="space-y-3 mt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="text-secondary mt-0.5 flex-shrink-0"
                        />
                        <span className="text-muted-foreground">
                          Real-time proximity monitoring
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="text-secondary mt-0.5 flex-shrink-0"
                        />
                        <span className="text-muted-foreground">
                          Contextual risk assessment
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="text-secondary mt-0.5 flex-shrink-0"
                        />
                        <span className="text-muted-foreground">
                          Actionable safety recommendations
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Target Environments
              </h2>
              <p className="text-lg text-muted-foreground">
                Where H-PROX makes the biggest impact
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {environments.map((env, index) => {
                const Icon = env.icon;
                return (
                  <motion.div
                    key={env.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow border-border">
                      <CardContent className="p-8 text-center">
                        <div className="text-primary mb-4 inline-flex p-4 rounded-xl bg-primary/5">
                          <Icon size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {env.title}
                        </h3>
                        <p className="text-muted-foreground">{env.description}</p>
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
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                    Equipment Examples
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {equipmentExamples.map((example) => (
                      <div
                        key={example}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                        <span>{example}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                Success Metrics
              </h2>
              <p className="text-lg text-muted-foreground">
                How we measure H-PROX effectiveness
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full text-center border-border hover:border-primary/50 transition-colors">
                      <CardContent className="p-8">
                        <div className="text-secondary mb-4 inline-flex p-3 rounded-xl bg-secondary/10">
                          <Icon size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {metric.title}
                        </h3>
                        <div className="text-3xl font-bold text-primary mb-3">
                          {metric.value}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {metric.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                How It Works in Practice
              </h2>
              <div className="bg-card border border-border rounded-2xl p-8 text-left">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="text-foreground font-medium mb-1">
                        Detection
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Camera system identifies worker approaching active
                        forklift zone
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-foreground font-medium mb-1">
                        Analysis
                      </p>
                      <p className="text-muted-foreground text-sm">
                        AI assesses proximity, equipment state, and trajectory
                        to determine risk level
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="text-foreground font-medium mb-1">Alert</p>
                      <p className="text-muted-foreground text-sm">
                        Supervisor receives notification: "Worker #47 in Zone B
                        - Immediate clearance recommended"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-muted text-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="text-foreground font-medium mb-1">
                        Response
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Supervisor confirms alert and takes corrective action,
                        system logs the event
                      </p>
                    </div>
                  </div>
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
