import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Send, MessageSquare, Building, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
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

  const contactReasons = [
    {
      icon: Building,
      title: "Pilot Partnerships",
      description:
        "Interested in validating Percepta at your facility with a structured pilot program",
    },
    {
      icon: Users,
      title: "Incubators & Accelerators",
      description:
        "Looking to evaluate Percepta for your startup program or investment portfolio",
    },
    {
      icon: MessageSquare,
      title: "General Inquiries",
      description:
        "Questions about our technology, approach, or potential collaboration opportunities",
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
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're currently collaborating with pilot partners and
                research-driven programs
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
                Why Reach Out?
              </h2>
              <p className="text-lg text-muted-foreground">
                We welcome conversations with these audiences
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactReasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <motion.div
                    key={reason.title}
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
                          {reason.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {reason.description}
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>

                <Card className="border-border mb-8">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="text-primary p-3 rounded-xl bg-primary/5 flex-shrink-0">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
                          Email
                        </p>
                        <a
                          href="mailto:hello@percepta.ai"
                          className="text-lg text-primary hover:underline"
                        >
                          hello@percepta.ai
                        </a>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We typically respond within 1-2 business days. For pilot
                        program inquiries, please use our dedicated pilot request
                        form for faster processing.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-border">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Looking for a Pilot Program?
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      If you're specifically interested in running a structured
                      pilot at your facility, please use our dedicated pilot
                      request form for a faster, more tailored response.
                    </p>
                    <a href="/pilot">
                      <Button variant="secondary" className="w-full">
                        Request a Pilot Program
                      </Button>
                    </a>
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
                  Send a Message
                </h2>

                <Card className="border-border shadow-lg">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="name">
                          Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="Your name"
                        />
                      </div>

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
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          rows={6}
                          placeholder="Tell us about your inquiry, interest in Percepta, or how we can help..."
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
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
              className="text-center"
            >
              <Card className="border-border">
                <CardContent className="p-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Join Our Network
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                    We're actively seeking partnerships with forward-thinking
                    organizations committed to industrial safety innovation. If
                    you're an incubator, accelerator, industrial partner, or
                    early advisor, we'd love to connect.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                    <span className="px-4 py-2 bg-muted rounded-full">
                      Startup Competitions
                    </span>
                    <span className="px-4 py-2 bg-muted rounded-full">
                      Incubators
                    </span>
                    <span className="px-4 py-2 bg-muted rounded-full">
                      Accelerators
                    </span>
                    <span className="px-4 py-2 bg-muted rounded-full">
                      Industrial Partners
                    </span>
                    <span className="px-4 py-2 bg-muted rounded-full">
                      Research Programs
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
