const Course = require("../models/Course");

const defaultCourses = [
  {
    title: "Frontend Development",
    slug: "frontend-development",
    subtitle: "Master modern UI development with HTML, CSS, JavaScript and React.",
    description:
      "This course helps you become strong in frontend development. You will learn how to build responsive, modern, and professional user interfaces using the latest web technologies.",
    level: "Beginner to Advanced",
    duration: "8 Weeks",
    instructor: "Skill Tracker Team",
    rating: 4.8,
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "React.js"],
    modules: [
      "Introduction to Web Development",
      "HTML Structure",
      "CSS Styling",
      "JavaScript Fundamentals",
      "DOM Manipulation",
      "React Basics",
      "Routing with React Router",
      "Mini Frontend Project",
    ],
    projects: [
      "Portfolio Website",
      "Quiz UI",
      "Dashboard UI",
    ],
  },
  {
    title: "Backend Development",
    slug: "backend-development",
    subtitle: "Learn server-side development using Node.js, Express and APIs.",
    description:
      "This course teaches you how to build secure and scalable backend systems. You will learn routing, controllers, middleware, authentication, and database integration.",
    level: "Intermediate",
    duration: "10 Weeks",
    instructor: "Skill Tracker Team",
    rating: 4.7,
    skills: ["Node.js", "Express.js", "REST API", "Middleware", "JWT"],
    modules: [
      "Backend Introduction",
      "Node.js Fundamentals",
      "Express Server Setup",
      "Routes and Controllers",
      "Middleware",
      "JWT Authentication",
      "MongoDB Integration",
      "Error Handling",
    ],
    projects: [
      "Authentication API",
      "Skill Tracker Backend",
      "Course API",
    ],
  },
  {
    title: "React Mastery",
    slug: "react-mastery",
    subtitle: "Become confident in building advanced React applications.",
    description:
      "This course is focused on React. You will build dynamic apps, manage state, work with hooks, routing, reusable components, and create modern UIs.",
    level: "Intermediate to Advanced",
    duration: "6 Weeks",
    instructor: "Skill Tracker Team",
    rating: 4.9,
    skills: ["React", "Hooks", "Reusable Components", "State Management"],
    modules: [
      "React Introduction",
      "JSX and Components",
      "Props and State",
      "useEffect and API Calls",
      "Forms in React",
      "React Router",
      "Advanced React Patterns",
      "Final React Project",
    ],
    projects: [
      "React Quiz App",
      "Skill Tracker Frontend",
      "Course Management UI",
    ],
  },
  {
    title: "Node.js API Development",
    slug: "nodejs-api-development",
    subtitle: "Build powerful backend APIs with Node and Express.",
    description:
      "This course focuses on API development with Node.js and Express. Learn CRUD, validation, auth, and professional backend structure.",
    level: "Intermediate",
    duration: "7 Weeks",
    instructor: "Skill Tracker Team",
    rating: 4.6,
    skills: ["Node.js", "Express", "REST APIs", "CRUD", "Validation"],
    modules: [
      "API Basics",
      "Express Routing",
      "Controllers",
      "CRUD Operations",
      "Validation",
      "Authentication",
      "Protected Routes",
      "API Testing",
    ],
    projects: ["User API", "Quiz API", "Course API"],
  },
  {
    title: "MongoDB Basics",
    slug: "mongodb-basics",
    subtitle: "Understand NoSQL databases and integrate MongoDB with apps.",
    description:
      "Learn MongoDB from scratch including documents, collections, CRUD, schema design, and Mongoose integration in Node.js projects.",
    level: "Beginner",
    duration: "4 Weeks",
    instructor: "Skill Tracker Team",
    rating: 4.5,
    skills: ["MongoDB", "Collections", "Documents", "CRUD", "Mongoose"],
    modules: [
      "NoSQL Introduction",
      "MongoDB Basics",
      "Collections and Documents",
      "CRUD Operations",
      "MongoDB Compass",
      "Mongoose Setup",
      "Schemas and Models",
    ],
    projects: [
      "Student Database",
      "Course Storage System",
      "Skill Tracker DB Integration",
    ],
  },
  {
    title: "JavaScript Advanced",
    slug: "javascript-advanced",
    subtitle: "Deep dive into advanced JavaScript concepts and interview topics.",
    description:
      "This course is for learners who want to master advanced JavaScript concepts such as closures, promises, async/await, array methods, and ES6+ features.",
    level: "Advanced",
    duration: "6 Weeks",
    instructor: "Skill Tracker Team",
    rating: 4.8,
    skills: ["Closures", "Promises", "Async/Await", "ES6+", "Array Methods"],
    modules: [
      "Scope and Closures",
      "Hoisting",
      "this Keyword",
      "Callbacks and Promises",
      "Async/Await",
      "Destructuring",
      "Spread and Rest Operators",
      "Interview Questions",
    ],
    projects: [
      "Async Data App",
      "Advanced JS Quiz",
      "Utility Function Library",
    ],
  },
];

const seedCourses = async () => {
  try {
    for (const course of defaultCourses) {
      const existing = await Course.findOne({ slug: course.slug });

      if (!existing) {
        await Course.create(course);
        console.log(`Added: ${course.title}`);
      }
    }

    console.log("Courses seeding completed");
  } catch (error) {
    console.error("Seed courses error:", error);
  }
};

module.exports = seedCourses;