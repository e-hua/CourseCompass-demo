CourseCompass – NUS Course Planning Platform

Overview:
Full-stack web application showcasing backend service design, database optimization, and API-driven architecture for course planning at NUS.

Tech Stack:
Java Spring Boot | PostgreSQL | React (Vite, Shadcn/UI) | GitHub Actions + Render

Backend Highlights:

Designed and implemented RESTful APIs for course retrieval, search, and prerequisite validation.

Implemented secure Google OAuth 2.0 authentication and managed user sessions efficiently.

Optimized PostgreSQL schema for fast queries and reliable data storage.

Integrated unit and end-to-end testing (Vitest + Playwright) to ensure backend correctness and service reliability.

Automated CI/CD pipeline with GitHub Actions and Render for build, test, and deployment.

Links:

GitHub: https://github.com/e-hua/CourseCompass-demo/

Live Demo: https://coursecompass-demo-frontend.onrender.com/

---

## Key Data Models

### **User**
- `id`, `userName`, `email`, `major`, `currentSemesterIndex`, `GPA`  
- **Relationships:** `takenCourses` (TakenCourse[]), `courseRatings` (CourseRating[])  

### **TakenCourse**
- `id`, `semesterIndex`, `letterGrade`, `units`, `courseCode`  

### **CourseRating**
- `id`, `courseCode`, `difficulty`, `workload`, `enjoyability`, `createdAt`, `updatedAt`  

### **CoursePreviewDTO**
- `courseCode`, `courseTitle`, `units`, `semesters[]`, `averageDifficulty`, `averageWorkload`, `averageEnjoyability`, `ratingCount`  

### **Comment / CommentReply**
- `commentId`, `content`, linked to TakenCourse / parent comment  

---

## Representative REST Endpoints

### **User**
- `GET /api/users/{id}` → Fetch user profile with taken courses & ratings  
- `POST /api/user/update` → Update user profile info (semesterIndex, userName)  

### **Courses**
- `GET /api/courses` → List all courses  
- `GET /api/courses/{id}` → Course details with ratings  
- `POST /api/courses` → Create new course  
- `GET /api/coursePreviews` → Paginated course previews with filters (faculty, semester, SU, sort)  

### **Taken Courses**
- `GET /api/takencourses` → List user’s taken courses  
- `POST /api/takencourses` → Add a taken course  
- `PUT /api/takencourses/{id}` → Update a taken course  
- `DELETE /api/takencourses/{id}` → Delete a taken course  

### **Course Ratings**
- `GET /api/ratings` → List all ratings  
- `GET /api/ratings/{id}` → Fetch single rating  
- `POST /api/ratings` → Create a rating  
- `PUT /api/ratings/{id}` → Update a rating  

### **Comments / Replies**
- `POST /api/comments` → Create comment  
- `PUT /api/comments` → Update comment  
- `DELETE /api/comments` → Delete comment  
- `POST /api/commentReplies` → Reply to comment  
- `GET /api/comments/{courseCode}` → List comments for a course  
- `GET /api/commentReplies/{commentCode}` → List replies for a comment
