"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  BarChart3,
  Smartphone,
  Globe,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COURSES = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Build modern web applications with React, Next.js, and Node.js. From fundamentals to advanced architecture.",
    students: "1,200+",
    color: "from-blue-500/10 to-blue-500/5",
    iconColor: "text-blue-600",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Master design thinking, wireframing, prototyping, and user research. Create beautiful, usable interfaces.",
    students: "950+",
    color: "from-purple-500/10 to-purple-500/5",
    iconColor: "text-purple-600",
  },
  {
    icon: BarChart3,
    title: "Data Science",
    description:
      "Learn Python, machine learning, statistical analysis, and data visualization. Turn data into decisions.",
    students: "870+",
    color: "from-emerald-500/10 to-emerald-500/5",
    iconColor: "text-emerald-600",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Create iOS and Android apps with React Native and Flutter. Build cross-platform applications.",
    students: "680+",
    color: "from-orange-500/10 to-orange-500/5",
    iconColor: "text-orange-600",
  },
  {
    icon: Globe,
    title: "Cloud Computing",
    description:
      "Master AWS, Azure, and Google Cloud. Learn DevOps, CI/CD, containerization, and infrastructure as code.",
    students: "540+",
    color: "from-cyan-500/10 to-cyan-500/5",
    iconColor: "text-cyan-600",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description:
      "Explore deep learning, NLP, computer vision, and LLMs. Build AI-powered applications from scratch.",
    students: "760+",
    color: "from-rose-500/10 to-rose-500/5",
    iconColor: "text-rose-600",
  },
];

export function CoursesSection() {
  return (
    <section id="courses" className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge
            variant="outline"
            className="mb-4 border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
          >
            Explore Our Catalog
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Learn from Industry Experts
          </h2>
          <p className="mt-4 text-base text-gray-custom">
            Choose from 200+ courses across multiple categories, designed to
            take you from beginner to professional.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="group h-full cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${course.color}`}
                  >
                    <course.icon className={`size-5 ${course.iconColor}`} />
                  </div>
                  <CardTitle className="mt-1 text-base">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {course.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-success" />
                    <span className="text-xs text-muted-foreground">
                      {course.students} enrolled
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Button variant="outline" className="rounded-full">
            View All Courses
            <span className="ml-1 text-muted-foreground">&rarr;</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
