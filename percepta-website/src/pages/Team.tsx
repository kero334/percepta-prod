import { motion } from "framer-motion";
import { Code, Brain, Shield, Lightbulb, Users, Linkedin, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Team() {
  // Fetch team members from Convex database (single source of truth)
  const teamMembers = useQuery(api.content.getAllTeamMembers);

  // Icon mapping for display (fallback to Users icon if not specified)
  const getIcon = (role: string) => {
    if (role.toLowerCase().includes("ceo") || role.toLowerCase().includes("founder")) {
      return Lightbulb;
    }
    if (role.toLowerCase().includes("cto") || role.toLowerCase().includes("engineer")) {
      return Code;
    }
    if (role.toLowerCase().includes("ai") || role.toLowerCase().includes("ml")) {
      return Brain;
    }
    if (role.toLowerCase().includes("safety")) {
      return Shield;
    }
    return Users;
  };

  const values = [
    {
      title: "Research-Driven",
      description:
        "Grounded in peer-reviewed research and validated through rigorous testing",
    },
    {
      title: "Safety First",
      description:
        "Every decision prioritizes worker safety and system reliability",
    },
    {
      title: "Transparent AI",
      description:
        "Committed to explainable systems that humans can understand and trust",
    },
    {
      title: "Collaborative",
      description:
        "Working closely with industrial partners to solve real-world challenges",
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
                Our Team
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Experts in AI, engineering, safety, and product bringing
                intelligent industrial safety to life
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {!teamMembers && (
              <div className="text-center py-12">
                <div className="inline-block animate-pulse text-muted-foreground">
                  Loading team members...
                </div>
              </div>
            )}

            {teamMembers && teamMembers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No team members found. Please add team members from the admin panel.
                </p>
              </div>
            )}

            {teamMembers && teamMembers.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8">
                {teamMembers.map((member: any, index: number) => {
                  const Icon = getIcon(member.role);
                  return (
                    <motion.div
                      key={member._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow border-border">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-4 mb-6">
                            {member.imageUrl ? (
                              <img
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="text-primary p-3 rounded-xl bg-primary/5 flex-shrink-0">
                                <Icon size={32} />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-2xl font-semibold text-foreground">
                                  {member.name}
                                </h3>
                                {member.linkedinUrl && (
                                  <a
                                    href={member.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn profile"
                                    className="text-muted-foreground hover:text-[#0A66C2] transition-colors cursor-pointer"
                                    title="LinkedIn"
                                  >
                                    <Linkedin size={22} className="md:w-6 md:h-6" strokeWidth={1.5} />
                                  </a>
                                )}
                                {member.websiteUrl && (
                                  <a
                                    href={member.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Personal website"
                                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                    title="Personal Website"
                                  >
                                    <Globe size={22} className="md:w-6 md:h-6" strokeWidth={1.5} />
                                  </a>
                                )}
                              </div>
                              <p className="text-secondary font-medium">
                                {member.role}
                              </p>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {member.bio}
                          </p>
                          {member.expertise && member.expertise.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                                Areas of Expertise
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {member.expertise.map((skill: string, i: number) => (
                                  <span
                                    key={i}
                                    className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
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
                What Drives Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Core values that guide our work and decisions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center border-border hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
              <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-border">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Join Our Mission
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    We're always looking for talented individuals who share our
                    passion for using AI to make industrial workplaces safer.
                    Whether you're an engineer, researcher, or safety
                    professional, we'd love to hear from you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:careers@percepta.ai"
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                      Explore Opportunities
                    </a>
                    <a
                      href="mailto:hello@percepta.ai"
                      className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md font-medium hover:bg-muted transition-colors"
                    >
                      Get in Touch
                    </a>
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
