import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  ClipboardCheck,
  Settings,
  BarChart,
  FileCheck,
  CheckCircle,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function Pilot() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    facilityType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pilot request submitted! We'll be in touch soon.");
    setFormData({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      facilityType: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const pilotIncludes = [
    {
      icon: ClipboardCheck,
      title: "Site Survey",
      description:
        "Comprehensive assessment of your facility to identify optimal deployment zones",
    },
    {
      icon: Settings,
      title: "One Hazard Zone Configuration",
      description:
        "Custom setup for your highest-priority safety concern area",
    },
    {
      icon: Settings,
      title: "AI Model Calibration",
      description:
        "Fine-tuning the system to your specific equipment and environment",
    },
    {
      icon: BarChart,
      title: "Supervisor Dashboard",
      description:
        "Real-time monitoring interface for alerts and safety insights",
    },
    {
      icon: FileCheck,
      title: "Pilot Report with KPIs",
      description:
        "Detailed analysis of system performance and safety impact",
    },
  ];

  const kpis = [
    {
      title: "Precision",
      description: "Percentage of accurate hazard detections",
      icon: CheckCircle,
    },
    {
      title: "Confirmation Rate",
      description: "Ratio of alerts confirmed by human supervisors",
      icon: CheckCircle,
    },
    {
      title: "Mean Time to Alert (MTTA)",
      description: "Average time from detection to supervisor notification",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-16">
        <section className="py-20 bg-gradient-to-br from-background via-accent/5 to-secondary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Validate Percepta in Your Facility
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Structured 6–12 week pilot program to prove effectiveness in
                your industrial environment
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
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Calendar size={16} />
                <span>6–12 Week Duration</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What's Included in the Pilot
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive setup, calibration, and evaluation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {pilotIncludes.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow border-border">
                      <CardContent className="p-6">
                        <div className="text-primary mb-4 inline-flex p-3 rounded-xl bg-primary/5">
                          <Icon size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
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
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Key Performance Indicators
              </h2>
              <p className="text-lg text-muted-foreground">
                Metrics we'll track to measure pilot success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {kpis.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <motion.div
                    key={kpi.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full text-center border-border hover:border-secondary/50 transition-colors">
                      <CardContent className="p-8">
                        <div className="text-secondary mb-4 inline-flex p-3 rounded-xl bg-secondary/10">
                          <Icon size={28} />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {kpi.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {kpi.description}
                        </p>
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
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Request a Pilot Program
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and we'll get in touch to discuss your
                  facility's needs
                </p>
              </div>

              <Card className="border-border shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="companyName">
                          Company Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="Acme Manufacturing"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPerson">
                          Contact Person <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="contactPerson"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="john@acme.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">
                          Phone <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="facilityType">
                        Facility Type <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="facilityType"
                        name="facilityType"
                        value={formData.facilityType}
                        onChange={handleChange}
                        required
                        className="mt-2"
                        placeholder="e.g., Manufacturing plant, Warehouse, Distribution center"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-2"
                        rows={5}
                        placeholder="Tell us about your facility, safety concerns, and what you hope to achieve with the pilot..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Pilot Request
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 text-center text-sm text-muted-foreground"
              >
                <p>
                  We typically respond within 2 business days. All pilot programs
                  are subject to availability and facility requirements assessment.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
