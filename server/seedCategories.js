const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("./models/Category");

dotenv.config();

const categories = [
  {
    name: "AI/ML",
    description: "Artificial Intelligence and Machine Learning courses"
  },
  {
    name: "Web Dev",
    description: "Web Development courses"
  },
  {
    name: "Android",
    description: "Android Development courses"
  },
  {
    name: "Data Science",
    description: "Data Science and Analytics courses"
  },
  {
    name: "Cloud Computing",
    description: "Cloud Computing and DevOps courses"
  },
  {
    name: "Mobile Development",
    description: "Mobile app development courses"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    // Clear existing categories
    await Category.deleteMany({});
    console.log("Cleared existing categories");

    // Insert new categories
    const result = await Category.insertMany(categories);
    console.log(`Successfully created ${result.length} categories:`);
    result.forEach((cat) => {
      console.log(`  - ${cat.name}: ${cat.description}`);
    });

    console.log("\nCategories are now available in your database!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
