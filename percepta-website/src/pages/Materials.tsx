import { motion } from "framer-motion";
import { FileText, PlayCircle, Presentation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EmbedViewer from "@/components/EmbedViewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Materials() {
  const materials = useQuery(api.content.getAllMaterials);

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return PlayCircle;
      case "presentation":
        return Presentation;
      case "pdf":
        return FileText;
      default:
        return FileText;
    }
  };

  const getIconColor = (index: number) => {
    const colors = ["text-primary", "text-secondary", "text-accent"];
    return colors[index % colors.length];
  };

  const getBgColor = (index: number) => {
    const colors = ["bg-primary/5", "bg-secondary/5", "bg-accent/5"];
    return colors[index % colors.length];
  };

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
                Supporting Materials
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                The following materials provide deeper insight into Percepta's
                concept, technical thinking, and intended real-world application.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {materials && materials.length > 0 ? (
              <div className="space-y-12">
                {materials.map((material: any, index: number) => {
                  const Icon = getIcon(material.contentType);
                  const iconColor = getIconColor(index);
                  const bgColor = getBgColor(index);
                  return (
                    <motion.div
                      key={material._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="border-border hover:shadow-lg transition-shadow">
                        <CardContent className="p-8 md:p-10">
                          <div className="flex flex-col gap-6">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                              <div
                                className={`${iconColor} ${bgColor} p-4 rounded-xl flex-shrink-0`}
                              >
                                <Icon size={40} strokeWidth={1.5} />
                              </div>

                              <div className="flex-1">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                  {material.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                  {material.description}
                                </p>
                              </div>
                            </div>

                            <div className="w-full">
                              <EmbedViewer
                                url={material.url}
                                contentType={material.contentType}
                                title={material.title}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No materials available at this time.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-border">
                <CardContent className="p-8 md:p-10 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Questions About These Materials?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                    These resources are prepared for judges, incubators,
                    accelerators, and industrial partners evaluating Percepta. If
                    you have questions or need clarification, we're here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/contact">
                      <Button size="lg">Get in Touch</Button>
                    </a>
                    <a href="/pilot">
                      <Button size="lg" variant="outline">
                        Request a Pilot
                      </Button>
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
