"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Users, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  {
    icon: Award,
    title: "Certified Learning",
    description:
      "Earn industry-recognized certificates upon completion. Each certificate is verifiable and includes a unique ID.",
  },
  {
    icon: BookOpen,
    title: "Structured Curriculum",
    description:
      "Every course follows a carefully designed path from fundamentals to advanced topics with hands-on projects.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Learn from seasoned professionals with years of industry experience at top companies worldwide.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Access",
    description:
      "Get unlimited access to course materials, updates, and future content additions at no extra cost.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border/40 bg-background-custom">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-4 border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
            >
              Why Choose Us
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              A Platform Built for{" "}
              <span className="text-primary">Your Growth</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-custom">
              We believe education should be accessible, engaging, and
              effective. That&apos;s why every aspect of our platform is designed
              to help you succeed.
            </p>

            <div className="mt-8 space-y-6">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-dark">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-1">
              <div className="rounded-xl bg-white p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "5000+", label: "Active Learners" },
                    { value: "200+", label: "Courses" },
                    { value: "50+", label: "Instructors" },
                    { value: "95%", label: "Satisfaction" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl bg-primary/[0.02] p-5 text-center"
                    >
                      <p className="text-3xl font-bold text-primary">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-dark p-5 text-center">
                  <p className="text-sm font-medium text-white">
                    &ldquo;The best investment I&apos;ve made in my career. The
                    courses are practical, and the certificates helped me land my
                    dream job.&rdquo;
                  </p>
                  <p className="mt-3 text-xs text-gray-400">
                    — Sarah Chen, Software Engineer at Google
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
