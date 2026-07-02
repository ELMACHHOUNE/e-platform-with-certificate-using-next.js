import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Student } from "../lib/models/Student";
import { Course } from "../lib/models/Course";
import { Instructor } from "../lib/models/Instructor";
import { Admin } from "../lib/models/Admin";

const MONGODB_URI: string = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is required");
  process.exit(1);
}

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.\n");

  console.log("Clearing existing data...");
  await Promise.all([
    Student.deleteMany({}),
    Course.deleteMany({}),
    Instructor.deleteMany({}),
    Admin.deleteMany({}),
  ]);
  console.log("Cleared.\n");

  console.log("Seeding admin...");
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await Admin.create({
    name: "Platform Admin",
    email: "admin@e-platform.com",
    password: hashedPassword,
    role: "admin",
  });
  console.log("Admin seeded: admin@e-platform.com / admin123\n");

  console.log("Seeding instructors...");
  const instructors = await Instructor.create([
    {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@e-platform.com",
      bio: "PhD in Computer Science with 15+ years of industry experience. Previously led engineering teams at Google and Microsoft.",
      avatar: "",
      studentsCount: 5,
      coursesCount: 4,
    },
    {
      name: "Prof. David Chen",
      email: "david.chen@e-platform.com",
      bio: "Expert in machine learning and data science. Former research scientist at DeepMind. Published 30+ peer-reviewed papers.",
      avatar: "",
      studentsCount: 5,
      coursesCount: 3,
    },
  ]);
  console.log(`Instructors seeded: ${instructors.length}\n`);

  console.log("Seeding courses...");
  const courses = await Course.create([
    {
      title: "Web Development",
      description:
        "Build modern web applications with React, Next.js, and Node.js. From fundamentals to advanced architecture.",
      icon: "Code2",
      students: 0,
      instructorName: "Dr. Sarah Johnson",
      color: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-600",
    },
    {
      title: "UI/UX Design",
      description:
        "Master design thinking, wireframing, prototyping, and user research. Create beautiful, usable interfaces.",
      icon: "Palette",
      students: 0,
      instructorName: "Dr. Sarah Johnson",
      color: "from-purple-500/10 to-purple-500/5",
      iconColor: "text-purple-600",
    },
    {
      title: "Mobile Development",
      description:
        "Create iOS and Android apps with React Native and Flutter. Build cross-platform applications.",
      icon: "Smartphone",
      students: 0,
      instructorName: "Dr. Sarah Johnson",
      color: "from-orange-500/10 to-orange-500/5",
      iconColor: "text-orange-600",
    },
    {
      title: "Cloud Computing",
      description:
        "Master AWS, Azure, and Google Cloud. Learn DevOps, CI/CD, and containerization.",
      icon: "Globe",
      students: 0,
      instructorName: "Dr. Sarah Johnson",
      color: "from-cyan-500/10 to-cyan-500/5",
      iconColor: "text-cyan-600",
    },
    {
      title: "Data Science",
      description:
        "Learn Python, machine learning, statistical analysis, and data visualization.",
      icon: "BarChart3",
      students: 0,
      instructorName: "Prof. David Chen",
      color: "from-emerald-500/10 to-emerald-500/5",
      iconColor: "text-emerald-600",
    },
    {
      title: "Artificial Intelligence",
      description:
        "Explore deep learning, NLP, computer vision, and LLMs. Build AI-powered applications.",
      icon: "Brain",
      students: 0,
      instructorName: "Prof. David Chen",
      color: "from-rose-500/10 to-rose-500/5",
      iconColor: "text-rose-600",
    },
    {
      title: "DevOps & CI/CD",
      description:
        "Master Docker, Kubernetes, GitHub Actions, and infrastructure automation for modern deployments.",
      icon: "Globe",
      students: 0,
      instructorName: "Prof. David Chen",
      color: "from-amber-500/10 to-amber-500/5",
      iconColor: "text-amber-600",
    },
  ]);
  console.log(`Courses seeded: ${courses.length}\n`);

  console.log("Seeding students...");
  const drSarahCourseIds = [courses[0]._id, courses[1]._id, courses[2]._id, courses[3]._id];
  const profDavidCourseIds = [courses[4]._id, courses[5]._id, courses[6]._id];

  const students = await Student.create([
    {
      studentFullName: "Mohamed El Machhoune",
      email: "mohamed@example.com",
      durationF: "120 Hours",
      formationDate: "2026-06-15",
      certificateId: "CERT-2026-001",
      instructorName: "Dr. Sarah Johnson",
      academyName: "E-Platform Academy",
      progress: 100,
      course: drSarahCourseIds[0],
    },
    {
      studentFullName: "Alice Martin",
      email: "alice@example.com",
      durationF: "80 Hours",
      formationDate: "2026-06-10",
      certificateId: "CERT-2026-002",
      instructorName: "Dr. Sarah Johnson",
      academyName: "E-Platform Academy",
      progress: 100,
      course: drSarahCourseIds[0],
    },
    {
      studentFullName: "James Wilson",
      email: "james@example.com",
      durationF: "60 Hours",
      formationDate: "2026-05-28",
      certificateId: "CERT-2026-003",
      instructorName: "Dr. Sarah Johnson",
      academyName: "E-Platform Academy",
      progress: 85,
      course: drSarahCourseIds[2],
    },
    {
      studentFullName: "Emma Thompson",
      email: "emma@example.com",
      durationF: "100 Hours",
      formationDate: "2026-06-20",
      certificateId: "CERT-2026-004",
      instructorName: "Dr. Sarah Johnson",
      academyName: "E-Platform Academy",
      progress: 92,
      course: drSarahCourseIds[1],
    },
    {
      studentFullName: "Liam Chen",
      email: "liam@example.com",
      durationF: "90 Hours",
      formationDate: "2026-06-18",
      certificateId: "CERT-2026-005",
      instructorName: "Dr. Sarah Johnson",
      academyName: "E-Platform Academy",
      progress: 78,
      course: drSarahCourseIds[3],
    },
    {
      studentFullName: "Sophia Patel",
      email: "sophia@example.com",
      durationF: "110 Hours",
      formationDate: "2026-07-01",
      certificateId: "CERT-2026-006",
      instructorName: "Prof. David Chen",
      academyName: "E-Platform Academy",
      progress: 100,
      course: profDavidCourseIds[0],
    },
    {
      studentFullName: "Noah Kim",
      email: "noah@example.com",
      durationF: "75 Hours",
      formationDate: "2026-06-25",
      certificateId: "CERT-2026-007",
      instructorName: "Prof. David Chen",
      academyName: "E-Platform Academy",
      progress: 100,
      course: profDavidCourseIds[0],
    },
    {
      studentFullName: "Olivia Davis",
      email: "olivia@example.com",
      durationF: "95 Hours",
      formationDate: "2026-07-05",
      certificateId: "CERT-2026-008",
      instructorName: "Prof. David Chen",
      academyName: "E-Platform Academy",
      progress: 65,
      course: profDavidCourseIds[1],
    },
    {
      studentFullName: "Ethan Brown",
      email: "ethan@example.com",
      durationF: "70 Hours",
      formationDate: "2026-07-10",
      certificateId: "CERT-2026-009",
      instructorName: "Prof. David Chen",
      academyName: "E-Platform Academy",
      progress: 45,
      course: profDavidCourseIds[2],
    },
    {
      studentFullName: "Mia Garcia",
      email: "mia@example.com",
      durationF: "85 Hours",
      formationDate: "2026-07-15",
      certificateId: "CERT-2026-010",
      instructorName: "Prof. David Chen",
      academyName: "E-Platform Academy",
      progress: 30,
      course: profDavidCourseIds[1],
    },
  ]);
  console.log(`Students seeded: ${students.length}\n`);

  console.log("Updating instructor student counts...");
  await Instructor.updateOne(
    { name: "Dr. Sarah Johnson" },
    { studentsCount: 5 }
  );
  await Instructor.updateOne(
    { name: "Prof. David Chen" },
    { studentsCount: 5 }
  );

  console.log("Updating course student counts...");
  await Course.updateOne({ title: "Web Development" }, { students: 2 });
  await Course.updateOne({ title: "UI/UX Design" }, { students: 1 });
  await Course.updateOne({ title: "Mobile Development" }, { students: 1 });
  await Course.updateOne({ title: "Cloud Computing" }, { students: 1 });
  await Course.updateOne({ title: "Data Science" }, { students: 2 });
  await Course.updateOne({ title: "Artificial Intelligence" }, { students: 1 });
  await Course.updateOne({ title: "DevOps & CI/CD" }, { students: 1 });

  console.log("Seed complete!");
  console.log("---");
  console.log("Admin:   1 (admin@e-platform.com / admin123)");
  console.log(`Instructors: ${instructors.length}`);
  console.log(`Courses: ${courses.length}`);
  console.log(`Students: ${students.length}`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
