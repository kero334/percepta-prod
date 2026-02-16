import { motion } from "framer-motion";
import { FileText, PlayCircle, Presentation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EmbedViewer from "@/components/EmbedViewer";

export default function Materials() {
  const materials = [
    {
      _id: "mat-1",
      title: "Percepta Overview (PDF)",
      description:
        "High-level overview of Percepta AI, two-stage detection→reasoning architecture, and safety goals.",
      contentType: "pdf",
      url: "https://drive.google.com/file/d/1SQq5-M9ufFvzePnhnxJOIWLkKC2e_yxF/view?usp=sharing",
    },
    {
      _id: "mat-2",
      title: "Percepta AI Demo Presentation",
      description:
        "A guided walkthrough of the analyzer UI, image upload, detections, and Arabic report generation.",
      contentType: "video",
      url: "https://drive.google.com/file/d/1XwmvXzNDj-MSSLH8J30zWZNZeTnQcDcq/view?usp=sharing",
    },
    {
      _id: "mat-3",
      title: "Technical Deck (Presentation)",
      description:
        "Slides covering detection calibration, proximity modeling, percent→pixel conversion validation, and UX constraints.",
      contentType: "presentation",
      url: "https://docs.google.com/presentation/d/e/2PACX-1vSmo0YvOf5KGXlrt76IH2b2tG8XnlAkswExsSWAWaJZ-5ajE3twIaHfFGDOjHEB0Q/pub?start=true&loop=true&delayms=3000",
    },
  ];

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
                                  <span className="ml-3 inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs font-medium uppercase text-muted-foreground align-middle">
                                    {material.contentType === "pdf"
                                      ? "PDF"
                                      : material.contentType === "video"
                                      ? "Video"
                                      : "Deck"}
                                  </span>
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                  {material.description}
                                </p>
                                <p className="text-sm text-muted-foreground mt-3">
                                  <a
                                    href={material.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-4"
                                  >
                                    Open{" "}
                                    {material.contentType === "pdf"
                                      ? "PDF"
                                      : material.contentType === "video"
                                      ? "video"
                                      : "deck"}{" "}
                                    in new tab
                                  </a>
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
