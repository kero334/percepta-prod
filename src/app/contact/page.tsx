"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Globe, Globe as GlobeIcon, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { submitContact } from "./actions";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setResult(null);
    try {
      const res = await submitContact(formData);
      setResult(res);
    } catch (err) {
      setResult({ error: "An unexpected error occurred." });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen py-24 bg-background relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Interested in what we are building? Reach out to the founder directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Percepta is an early-stage startup. Reach out directly to discuss potential pilot opportunities, feedback, or general inquiries.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Founder</h4>
                  <p className="text-muted-foreground">Kerollos Karam</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email</h4>
                  <a href="mailto:kerokaram2022@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">kerokaram2022@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Phone</h4>
                  <a href="tel:01228581198" className="text-muted-foreground hover:text-primary transition-colors">01228581198</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Websites</h4>
                  <ul className="space-y-1">
                    <li><a href="https://percepta.sbs/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Company: percepta.sbs</a></li>
                    <li><a href="https://kerollos.site/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Personal: kerollos.site</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50">
              <h4 className="text-white font-medium mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/kerollos-karam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary/50 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-background/80 border-border/50 backdrop-blur-xl">
            <CardContent className="p-6 sm:p-8">
              {result?.success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out. I will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form action={handleSubmit} className="space-y-6">
                  {result?.error && (
                    <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                      <p className="text-sm text-destructive">{result.error}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" required className="bg-secondary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required className="bg-secondary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" name="subject" required className="bg-secondary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" required className="min-h-[120px] bg-secondary/20" />
                  </div>
                  <Button type="submit" className="w-full h-12 text-base" disabled={isPending}>
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
