

import  app from "./app/app.js"



import { connectDB } from "./config/db.js"

try {
  await connectDB()
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
} catch (error) {
  console.error("Database connection failed:", error.message);
  process.exit(1);
} 


