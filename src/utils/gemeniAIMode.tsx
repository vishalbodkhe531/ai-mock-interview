// // // const {
// // //   GoogleGenerativeAI,
// // //   HarmCategory,
// // //   HarmBlockThreshold,
// // // } = require("@google/generative-ai");

// // // const apiKey = process.env.GEMINI_API_KEY;
// // // const genAI = new GoogleGenerativeAI(apiKey);

// // // const model = genAI.getGenerativeModel({
// // //   model: "gemini-2.0-flash",
// // // });

// // // const generationConfig = {
// // //   temperature: 1,
// // //   topP: 0.95,
// // //   topK: 40,
// // //   maxOutputTokens: 8192,
// // //   responseMimeType: "text/plain",
// // // };

// // const {
// //   GoogleGenerativeAI,
// //   HarmCategory,
// //   HarmBlockThreshold,
// // } = require("@google/generative-ai");

// // const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// // const genAI = new GoogleGenerativeAI(apiKey);

// // const model = genAI.getGenerativeModel({
// //   model: "gemini-2.0-flash",
// // });

// // const generationConfig = {
// //   temperature: 1,
// //   topP: 0.95,
// //   topK: 40,
// //   maxOutputTokens: 8192,
// //   responseMimeType: "text/plain",
// // };

// // export const chatSession = model.startChat({
// //     generationConfig,
// //   // history: [
// //   //   {
// //   //     role: "user",
// //   //     parts: [{ text: "Job position: full-stack devoloper\n" }],
// //   //   },
// //   //   {
// //   //     role: "model",
// //   //     parts: [
// //   //       {
// //   //         text: "Okay, let's break down the common aspects of a Full-Stack Developer job and how to approach it, whether you're writing a job description, preparing for an interview, or just generally interested in the role.\n\n**What is a Full-Stack Developer?**\n\nA Full-Stack Developer is a software engineer who is proficient in both front-end (client-side) and back-end (server-side) development. They can handle all aspects of a software application, from designing the user interface to managing the database and server infrastructure.  They are a generalist with a solid understanding of the entire technology stack.\n\n**Key Responsibilities (Commonly Found in Job Descriptions):**\n\n*   **Full Software Development Lifecycle:** Participating in the entire process, from concept and design to testing and deployment.\n*   **Front-End Development:**\n    *   Developing user interfaces (UIs) and user experiences (UX).\n    *   Writing clean, efficient, and well-documented code using languages like HTML, CSS, and JavaScript.\n    *   Working with front-end frameworks and libraries (React, Angular, Vue.js, etc.).\n    *   Ensuring cross-browser compatibility and responsiveness.\n    *   Optimizing front-end performance.\n*   **Back-End Development:**\n    *   Designing, developing, and maintaining server-side logic.\n    *   Writing APIs (RESTful, GraphQL, etc.) for communication between the front-end and back-end.\n    *   Working with back-end languages and frameworks (Node.js, Python/Django/Flask, Java/Spring, Ruby on Rails, .NET, etc.).\n    *   Designing and managing databases (SQL like MySQL, PostgreSQL, or NoSQL like MongoDB, Cassandra).\n    *   Handling server deployment and maintenance (using cloud platforms like AWS, Azure, GCP, or traditional servers).\n    *   Implementing security measures to protect data and prevent vulnerabilities.\n*   **Database Management:** Designing, implementing, and maintaining databases (SQL or NoSQL).\n*   **API Development and Integration:** Building and consuming APIs.\n*   **Testing and Debugging:** Writing unit tests, integration tests, and performing thorough debugging.\n*   **Collaboration:** Working effectively with other developers, designers, product managers, and stakeholders.\n*   **Version Control:** Using Git and platforms like GitHub or GitLab for code management.\n*   **Deployment:** Deploying applications to production environments.\n*   **Monitoring and Maintenance:** Monitoring application performance and addressing any issues.\n*   **Keeping Up-to-Date:** Staying current with the latest technologies and trends in web development.\n*   **Problem-Solving:** Analyzing and solving complex technical challenges.\n*   **Documentation:** Creating and maintaining technical documentation.\n\n**Skills Required (Hard Skills):**\n\n*   **Proficiency in Front-End Technologies:**\n    *   HTML, CSS, JavaScript\n    *   JavaScript Frameworks/Libraries (React, Angular, Vue.js) - *Important:  Often a specific framework is required by the job.*\n    *   Responsive Design principles\n    *   CSS Preprocessors (Sass, Less) - *Less common but still useful.*\n    *   UI/UX principles\n*   **Proficiency in Back-End Technologies:**\n    *   Back-End Languages (Node.js, Python, Java, Ruby, .NET, PHP, Go) - *Choose the one most relevant to the job posting.*\n    *   Back-End Frameworks (Express, Django, Spring, Ruby on Rails, ASP.NET) - *Matches the Back-End Language.*\n    *   API Development (RESTful, GraphQL)\n    *   Authentication and Authorization\n*   **Database Knowledge:**\n    *   SQL Databases (MySQL, PostgreSQL, SQL Server)\n    *   NoSQL Databases (MongoDB, Cassandra, Redis)\n    *   Database Design Principles\n*   **DevOps Skills:**\n    *   Cloud Platforms (AWS, Azure, GCP)\n    *   Containerization (Docker, Kubernetes)\n    *   Continuous Integration/Continuous Deployment (CI/CD)\n    *   Server Administration\n*   **Version Control (Git):**  Mastering Git for collaborative development.\n*   **Testing:** Unit testing, integration testing, end-to-end testing.\n*   **Data Structures and Algorithms:**  A strong foundation for efficient problem-solving.\n*   **Operating Systems:** Familiarity with Linux, Windows, and/or macOS.\n\n**Skills Required (Soft Skills):**\n\n*   **Communication:**  Clearly articulate technical concepts to both technical and non-technical audiences.\n*   **Problem-Solving:**  Analyze complex problems and develop effective solutions.\n*   **Teamwork:**  Collaborate effectively with other developers, designers, and stakeholders.\n*   **Time Management:**  Prioritize tasks and meet deadlines.\n*   **Adaptability:**  Learn new technologies and adapt to changing project requirements.\n*   **Critical Thinking:** Evaluate different approaches and make informed decisions.\n*   **Attention to Detail:**  Write clean, well-documented, and bug-free code.\n*   **Self-Motivation:**  Take initiative and work independently.\n*   **Curiosity:** A desire to learn and stay up-to-date with the latest technologies.\n\n**How to Prepare for a Full-Stack Developer Role:**\n\n*   **Choose a Stack:** Select a specific technology stack to focus on (e.g., MERN stack: MongoDB, Express.js, React, Node.js).  This makes you more marketable.\n*   **Build Projects:**  Create personal projects to showcase your skills.  These projects are crucial for demonstrating your abilities to potential employers.  Examples:\n    *   **E-commerce Website:**  A basic online store with product listings, shopping cart, and checkout functionality.\n    *   **Blog Platform:**  A platform for creating and managing blog posts.\n    *   **Task Management Application:**  A tool for creating and tracking tasks.\n    *   **Social Media Application:**  A simplified social media platform with user profiles and posts.\n    *   **API Project:** Create APIs for specific function like currency conversions.\n*   **Contribute to Open Source:**  Participate in open-source projects to gain experience working in a collaborative environment and learn from other developers.\n*   **Practice Coding Challenges:**  Solve coding challenges on platforms like LeetCode, HackerRank, and Codewars to improve your problem-solving skills.\n*   **Network:**  Attend meetups, conferences, and workshops to connect with other developers and learn about job opportunities.\n*   **Online Courses and Tutorials:**  Utilize online resources like Coursera, Udemy, edX, and YouTube to learn new technologies and improve your skills.\n*   **Portfolio:** Create a portfolio website to showcase your projects and skills.\n*   **Tailor Your Resume:**  Customize your resume to highlight the skills and experience that are most relevant to each job you apply for.\n*   **Prepare for Interviews:**  Practice answering common interview questions and be prepared to discuss your projects in detail.\n\n**Common Interview Questions for Full-Stack Developers:**\n\n*   Describe your experience with [specific framework or language mentioned in the job description].\n*   Explain the difference between REST and GraphQL.\n*   How do you handle cross-browser compatibility issues?\n*   Describe your experience with database design.\n*   Explain the concept of CI/CD.\n*   How do you debug a complex problem?\n*   Tell me about a challenging project you worked on and how you overcame the challenges.\n*   What are your preferred tools for development?\n*   How do you stay up-to-date with the latest technologies?\n*   Explain the difference between authentication and authorization.\n*   What are the advantages and disadvantages of using a specific technology stack?\n\n**Writing a Job Description:**\n\nIf you are *writing* a job description for a Full-Stack Developer, remember to:\n\n*   **Be Specific:** Clearly define the required skills, technologies, and experience.  Avoid generic terms.  Specify *which* front-end and back-end frameworks are needed.\n*   **Highlight the Company Culture:**  Describe the company's values and work environment to attract the right candidates.\n*   **Outline the Responsibilities:** Clearly outline the day-to-day responsibilities of the role.\n*   **Include Benefits and Perks:**  Mention any benefits and perks that the company offers, such as health insurance, paid time off, and professional development opportunities.\n*   **Be Realistic:**  Don't overstate the requirements or create unrealistic expectations.\n*   **Include a Clear Call to Action:**  Tell candidates how to apply for the job.\n*   **Compensation:**  State the salary range, even if it's a broad range.\n*   **Remote/Hybrid/Onsite:**  Clearly indicate the work arrangement.\n\n**In Summary:**\n\nA Full-Stack Developer role is demanding but rewarding. It requires a broad skillset and a willingness to learn continuously. By focusing on building a strong foundation in both front-end and back-end technologies, building practical projects, and developing your soft skills, you can increase your chances of success in this exciting field.  Remember to tailor your approach based on the specific requirements of each job. Good luck!\n",
// //   //       },
// //   //     ],
// //   //   },
// //   // ],
// // });
// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// export const chatSession = model.startChat({
//   generationConfig,
// });

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
});
