"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section id="contact" className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-accent/80 p-8 sm:p-12 lg:p-16"
        >
          <div className="absolute top-0 right-0 -z-10 size-[400px] translate-x-1/4 -translate-y-1/4 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -z-10 size-[300px] -translate-x-1/4 translate-y-1/4 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/10">
              <GraduationCap className="size-7 text-white" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/80">
              Join thousands of learners already advancing their careers. Get
              your first course with a 7-day free trial.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-11 gap-2 rounded-full bg-white px-6 text-sm font-semibold text-primary hover:bg-white/90"
              >
                Get Started Free
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-11 gap-2 rounded-full border-white/20 bg-white/10 px-6 text-sm text-white hover:bg-white/20"
              >
                Talk to Sales
              </Button>
            </div>

            <p className="mt-4 text-xs text-white/60">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
