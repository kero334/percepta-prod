import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Eye, Brain, Shield, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [activeIndex, setActiveIndex] = useState(0);

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

  const qaItems = [
    {
      id: "what-is-percepta",
      questionEn: "What is Percepta?",
      answerEn:
        "Percepta is an AI-based industrial safety system designed to prevent workplace accidents before they occur. It analyzes visual data from existing surveillance cameras to identify unsafe interactions inside industrial environments.",
      questionAr: "ما هي Percepta؟",
      answerAr:
        "‏Percepta هي نظام أمان صناعي قائم على الذكاء الاصطناعي، مصمم لمنع حوادث العمل قبل وقوعها. يقوم بتحليل البيانات البصرية من كاميرات المراقبة الموجودة مسبقًا لاكتشاف التفاعلات غير الآمنة داخل البيئات الصناعية.",
    },
    {
      id: "problem-solved",
      questionEn: "What problem does Percepta solve?",
      answerEn:
        "Most safety systems are reactive and focus on reporting violations after incidents happen. Percepta shifts safety from documentation to prevention by detecting high-risk situations early.",
      questionAr: "ما المشكلة التي تحلها Percepta؟",
      answerAr:
        "معظم أنظمة السلامة تقليدية وتفاعلية، وتركّز على توثيق المخالفات بعد وقوع الحوادث. تنقل Percepta مفهوم السلامة من التوثيق إلى الوقاية من خلال اكتشاف المواقف عالية الخطورة مبكرًا.",
    },
    {
      id: "who-for",
      questionEn: "Who is Percepta built for?",
      answerEn:
        "Percepta is designed for medium-sized industrial facilities, including manufacturing plants, warehouses, and logistics centers where human-machine interaction creates operational risk.",
      questionAr: "لمن تم تصميم Percepta؟",
      answerAr:
        "تم تصميم Percepta للمنشآت الصناعية متوسطة الحجم، بما في ذلك المصانع والمستودعات ومراكز الخدمات اللوجستية، حيث يشكل التفاعل بين الإنسان والآلة مخاطر تشغيلية.",
    },
    {
      id: "how-it-works",
      questionEn: "How does Percepta work?",
      answerEn:
        "Percepta uses artificial intelligence to analyze relationships between workers, equipment, and restricted zones. When unsafe proximity or risky behavior is detected, the system generates structured alerts.",
      questionAr: "كيف تعمل Percepta؟",
      answerAr:
        "تستخدم Percepta الذكاء الاصطناعي لتحليل العلاقات بين العمال والمعدات والمناطق المحظورة. عند اكتشاف اقتراب غير آمن أو سلوك محفوف بالمخاطر، يقوم النظام بإصدار تنبيهات منظمة.",
    },
    {
      id: "hardware",
      questionEn: "Does Percepta require new hardware?",
      answerEn:
        "No. Percepta is designed to operate using existing surveillance camera infrastructure, reducing additional capital costs and simplifying integration.",
      questionAr: "هل تتطلب Percepta أجهزة جديدة؟",
      answerAr:
        "لا. تم تصميم Percepta للعمل باستخدام البنية التحتية الحالية لكاميرات المراقبة، مما يقلل التكاليف الرأسمالية الإضافية ويسهّل عملية الدمج.",
    },
    {
      id: "vs-cctv",
      questionEn: "How is Percepta different from traditional CCTV?",
      answerEn:
        "Traditional CCTV records footage for later review. Percepta actively analyzes video feeds in order to detect risk patterns before incidents occur.",
      questionAr: "ما الفرق بين Percepta وأنظمة CCTV التقليدية؟",
      answerAr:
        "أنظمة CCTV التقليدية تقوم بتسجيل اللقطات للمراجعة لاحقًا. أما Percepta فتقوم بتحليل البث المرئي بشكل نشط لاكتشاف أنماط المخاطر قبل وقوع الحوادث.",
    },
    {
      id: "vs-basic-cv",
      questionEn: "How is Percepta different from basic computer vision systems?",
      answerEn:
        "Basic systems often detect objects or PPE compliance only. Percepta evaluates contextual relationships between people, machines, and operational zones to identify behavioral risk scenarios.",
      questionAr: "ما الفرق بين Percepta وأنظمة الرؤية الحاسوبية الأساسية؟",
      answerAr:
        "الأنظمة الأساسية غالبًا ما تكتفي باكتشاف الأجسام أو التحقق من الالتزام بمعدات الحماية الشخصية فقط. أما Percepta فتقيّم العلاقات السياقية بين الأشخاص والآلات والمناطق التشغيلية لاكتشاف سيناريوهات المخاطر السلوكية.",
    },
    {
      id: "safety-managers",
      questionEn: "Does Percepta replace safety managers?",
      answerEn:
        "No. Percepta functions as a decision-support tool. It assists supervisors by providing alerts and structured insights while keeping human oversight central.",
      questionAr: "هل تستبدل Percepta مسؤولي السلامة؟",
      answerAr:
        "لا. تعمل Percepta كأداة دعم لاتخاذ القرار، حيث تساعد المشرفين من خلال تقديم تنبيهات ورؤى منظمة مع الحفاظ على الدور المركزي للرقابة البشرية.",
    },
    {
      id: "stage",
      questionEn: "What stage is Percepta currently in?",
      answerEn:
        "Percepta is currently in the prototype stage. The system operates on controlled static image testing while progressing toward real-time implementation.",
      questionAr: "في أي مرحلة توجد Percepta حاليًا؟",
      answerAr:
        "Percepta حاليًا في مرحلة النموذج الأولي. يعمل النظام على اختبار صور ثابتة في بيئة مُحكمة، مع التقدم نحو التطبيق في الوقت الفعلي.",
    },
    {
      id: "commercial",
      questionEn: "Is Percepta commercially deployed?",
      answerEn:
        "Not yet. The focus remains on technical validation and controlled testing before structured market entry.",
      questionAr: "هل تم نشر Percepta تجاريًا؟",
      answerAr:
        "ليس بعد. يظل التركيز حاليًا على التحقق التقني والاختبارات المُحكمة قبل الدخول المنظم إلى السوق.",
    },
    {
      id: "business-value",
      questionEn: "What value does Percepta provide to businesses?",
      answerEn:
        "Percepta helps reduce injuries, prevent downtime, and strengthen operational continuity. It transforms passive surveillance into proactive safety intelligence.",
      questionAr: "ما القيمة التي تقدمها Percepta للشركات؟",
      answerAr:
        "تساعد Percepta في تقليل الإصابات، ومنع التوقف التشغيلي، وتعزيز استمرارية العمليات. فهي تحوّل المراقبة السلبية إلى ذكاء سلامة استباقي.",
    },
    {
      id: "social-impact",
      questionEn: "How does Percepta create social impact?",
      answerEn:
        "Workplace accidents affect workers, families, and communities. By preventing incidents, Percepta contributes to workforce stability and human protection.",
      questionAr: "كيف تساهم Percepta في تحقيق أثر اجتماعي؟",
      answerAr:
        "تؤثر حوادث العمل على العمال وعائلاتهم والمجتمع ككل. من خلال منع الحوادث، تساهم Percepta في استقرار القوى العاملة وحماية الإنسان.",
    },
    {
      id: "focus-region",
      questionEn: "Where is Percepta currently focused?",
      answerEn:
        "Percepta initially focuses on industrial facilities in Egypt, with future expansion dependent on validation and scalability readiness.",
      questionAr: "أين يتركز عمل Percepta حاليًا؟",
      answerAr:
        "تركز Percepta في مرحلتها الأولى على المنشآت الصناعية في مصر، مع إمكانية التوسع مستقبلًا بناءً على التحقق من الجاهزية وقابلية التوسع.",
    },
    {
      id: "vision",
      questionEn: "What is Percepta’s long-term vision?",
      answerEn:
        "Percepta aims to improve industrial safety standards through proactive risk intelligence, guided by the principle that human life cannot be replaced.",
      questionAr: "ما الرؤية طويلة المدى لـ Percepta؟",
      answerAr:
        "تهدف Percepta إلى تحسين معايير السلامة الصناعية من خلال ذكاء استباقي لإدارة المخاطر، انطلاقًا من مبدأ أن حياة الإنسان لا يمكن تعويضها.",
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

        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Trusted Foundations</h3>
                <p className="text-muted-foreground mb-6">
                  Built with privacy-by-design and safety-first principles. Designed for industrial reliability.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-10 bg-muted rounded-md"></div>
                  <div className="h-10 bg-muted rounded-md"></div>
                  <div className="h-10 bg-muted rounded-md"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-3xl font-bold text-primary"><span aria-hidden>↓</span> Near-Miss</div>
                  <p className="text-sm text-muted-foreground mt-1">Reduce near-misses with proactive alerts</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-3xl font-bold text-secondary">ms</div>
                  <p className="text-sm text-muted-foreground mt-1">Low-latency guidance for real-time response</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-3xl font-bold text-accent">24/7</div>
                  <p className="text-sm text-muted-foreground mt-1">Continuous monitoring readiness</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-3xl font-bold">Edge</div>
                  <p className="text-sm text-muted-foreground mt-1">Edge-ready architecture options</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-sm text-muted-foreground">
              <span>Privacy & Safety</span>
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

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Company Q&A Assistant
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  Official answers about Percepta for investors and industrial decision-makers. All responses are manually authored and kept consistent with our company narrative.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Language</span>
                <div className="inline-flex rounded-full border border-border p-1 bg-muted">
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${language === "en" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("ar")}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${language === "ar" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                  >
                    AR
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                dir={language === "ar" ? "rtl" : "ltr"}
                className={`space-y-3 ${language === "ar" ? "font-arabic" : ""}`}
              >
                {qaItems.map((item, index) => {
                  const isActive = index === activeIndex;
                  const question = language === "en" ? item.questionEn : item.questionAr;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`w-full text-left border rounded-lg px-4 py-3 text-sm md:text-base transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:bg-muted"
                      } ${language === "ar" ? "text-right" : ""}`}
                    >
                      {question}
                    </button>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="h-full border-border">
                  <CardContent className="p-6 md:p-8">
                    <div
                      dir={language === "ar" ? "rtl" : "ltr"}
                      className={
                        language === "ar"
                          ? "text-right font-arabic leading-relaxed md:leading-loose"
                          : "leading-relaxed"
                      }
                    >
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        {language === "en"
                          ? qaItems[activeIndex].questionEn
                          : qaItems[activeIndex].questionAr}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base">
                        {language === "en"
                          ? qaItems[activeIndex].answerEn
                          : qaItems[activeIndex].answerAr}
                      </p>
                    </div>
                    <p className="mt-6 text-xs text-muted-foreground">
                      These answers are curated and non-generative to ensure consistency with Percepta&apos;s official positioning.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
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
