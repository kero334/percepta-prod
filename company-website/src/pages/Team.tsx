import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const API_BASE = "/api";

type Member = {
  id: string;
  name: string;
  title: string;
  description: string;
  image_url: string;
  linkedin_url: string;
  website_url: string;
  expertise: string[];
  created_at: string;
};

const FALLBACK_TEAM: Member[] = [
  {
    id: "2amO-HLBYwnX",
    name: "Kerollos Karam",
    title: "Founder & CEO",
    description:
      "Founder of Percepta, focused on building practical AI systems that prevent real-world harm. I work across product, business, and technical direction, with a strong interest in safety, applied AI, and system design. I value clarity, ethics, and learning by building.",
    image_url:
      "https://lh3.googleusercontent.com/pw/AP1GczN0Ous8RZGiuVkzBA9GEYsira6Jy6xlwlC_JtIXfDOrnmBcOuSnik4zC_zIftHGTLCof98qUJhvy5xMs1QBIzh69n6Go2Uea3A5YG_nf3GIu_nh11N29BJe3B7dHSrlzRrmCG0ef8MS6tE6f-ynUWOI=w712-h814-s-no-gm?authuser=0",
    linkedin_url: "https://www.linkedin.com/in/kerollos-karam",
    website_url: "https://keroinfo.vly.site/",
    expertise: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "Python Programming",
      "Business & Startup Fundamentals",
      "Data Analysis",
    ],
    created_at: "2026-02-14T21:05:41.106Z",
  },
];

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/team`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load team");
        return res.json();
      })
      .then((data: Member[]) => setTeamMembers(data))
      .catch(() => setTeamMembers(FALLBACK_TEAM))
      .finally(() => setLoading(false));
  }, []);

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
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navigation />

      <main className="flex-1 pt-16 overflow-x-hidden">
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
            {loading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[0, 1, 2, 3].map((i) => (
                  <Card key={i} className="h-full border-border">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
                        <div className="flex-1 space-y-2">
                          <div className="h-5 w-40 bg-muted rounded animate-pulse" />
                          <div className="h-4 w-28 bg-muted rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded animate-pulse" />
                        <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {[0,1,2,3].map((k) => (
                          <span key={k} className="h-6 w-24 bg-muted rounded-full animate-pulse" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : teamMembers.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {teamMembers.map((member: Member, index: number) => {
                  return (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow border-border">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-4 mb-6">
                            {member.image_url ? (
                              <img
                                src={`${API_BASE}/image-proxy?url=${encodeURIComponent(member.image_url)}`}
                                alt={member.name}
                                className="w-16 h-16 rounded-full object-cover flex-shrink-0 border border-border"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-muted flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-2xl font-semibold text-foreground">
                                  {member.name}
                                </h3>
                                {member.linkedin_url ? (
                                  <a
                                    href={member.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn profile"
                                    className="text-muted-foreground hover:text-[#0A66C2] transition-colors cursor-pointer"
                                    title="LinkedIn"
                                  >
                                    <Linkedin size={22} className="md:w-6 md:h-6" strokeWidth={1.5} />
                                  </a>
                                ) : null}
                                {member.website_url ? (
                                  <a
                                    href={member.website_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Personal website"
                                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                    title="Personal Website"
                                  >
                                    <Globe size={22} className="md:w-6 md:h-6" strokeWidth={1.5} />
                                  </a>
                                ) : null}
                              </div>
                              <p className="text-secondary font-medium">
                                {member.title}
                              </p>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {member.description}
                          </p>
                          {Array.isArray(member.expertise) && member.expertise.length > 0 && (
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
            ) : (
              <p className="text-muted-foreground">No team members yet.</p>
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
