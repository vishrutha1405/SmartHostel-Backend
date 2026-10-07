import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";
import { Menu } from "./models/Menu.js";
import { RSVP } from "./models/RSVP.js";
import { Feedback } from "./models/Feedback.js";
import { WasteLog } from "./models/WasteLog.js";
import { Config } from "./models/Config.js";

dotenv.config();

const DEFAULT_USERS = [
  { userId: "usr_1", name: "Varun Kumar", email: "student@hostel.com", password: "student123", role: "student", rollNo: "22CSE102", block: "A-Block", roomNo: "304", emergencyTokens: 10 },
  { userId: "usr_2", name: "Hostel Warden", email: "admin@hostel.com", password: "admin123", role: "admin", rollNo: "ADM001", block: "Admin Block", roomNo: "Office-1", emergencyTokens: 10 },
  { userId: "usr_ramya", name: "Ramya Devi", email: "ramya@hostel.com", password: "student123", role: "student", rollNo: "22CSE105", block: "A-Block", roomNo: "305", emergencyTokens: 10 },
  { userId: "usr_3", name: "Anish Sharma", email: "anish@hostel.com", password: "student123", role: "student", rollNo: "22ECE014", block: "A-Block", roomNo: "102", emergencyTokens: 10 },
  { userId: "usr_4", name: "Bala Murugan", email: "bala@hostel.com", password: "student123", role: "student", rollNo: "22MECH05", block: "B-Block", roomNo: "215", emergencyTokens: 10 },
  { userId: "usr_5", name: "Chitra Ram", email: "chitra@hostel.com", password: "student123", role: "student", rollNo: "22EEE089", block: "C-Block", roomNo: "110", emergencyTokens: 10 },
  { userId: "usr_6", name: "Devi Karuppan", email: "devi@hostel.com", password: "student123", role: "student", rollNo: "22IT044", block: "A-Block", roomNo: "309", emergencyTokens: 10 },
  { userId: "usr_7", name: "Ezhil Arasan", email: "ezhil@hostel.com", password: "student123", role: "student", rollNo: "22CIV021", block: "B-Block", roomNo: "405", emergencyTokens: 10 },
  { userId: "usr_8", name: "Farooq Hussain", email: "farooq@hostel.com", password: "student123", role: "student", rollNo: "22AI012", block: "A-Block", roomNo: "204", emergencyTokens: 10 },
  { userId: "usr_9", name: "Ganesh Pandian", email: "ganesh@hostel.com", password: "student123", role: "student", rollNo: "22CSE055", block: "B-Block", roomNo: "312", emergencyTokens: 10 },
  { userId: "usr_10", name: "Hari Prasad", email: "hari@hostel.com", password: "student123", role: "student", rollNo: "22ECE077", block: "C-Block", roomNo: "201", emergencyTokens: 10 },
  { userId: "usr_11", name: "Irfan Mohamed", email: "irfan@hostel.com", password: "student123", role: "student", rollNo: "22MECH33", block: "A-Block", roomNo: "108", emergencyTokens: 10 },
  { userId: "usr_12", name: "Janaki Sundar", email: "janaki@hostel.com", password: "student123", role: "student", rollNo: "22EEE022", block: "B-Block", roomNo: "104", emergencyTokens: 10 },
  { userId: "usr_13", name: "Karthik Raja", email: "karthik@hostel.com", password: "student123", role: "student", rollNo: "22CSE099", block: "A-Block", roomNo: "401", emergencyTokens: 10 },
  { userId: "usr_14", name: "Latha Sri", email: "latha@hostel.com", password: "student123", role: "student", rollNo: "22IT088", block: "C-Block", roomNo: "305", emergencyTokens: 10 },
  { userId: "usr_15", name: "Manoj Kumar", email: "manoj@hostel.com", password: "student123", role: "student", rollNo: "22AI066", block: "B-Block", roomNo: "208", emergencyTokens: 10 }
];

const DEFAULT_MENU = {
  key: "daily_menu",
  breakfast: {
    items: "Idli (3 Pcs), Medu Vada (1 Pc), Sambar, Coconut Chutney, Tea/Coffee",
    calories: 380,
    ingredients: "Rice, Urad Dal, Spices, Coconut, Milk, Tea dust",
    allergens: "Dairy",
    cutoffTime: "07:30 AM"
  },
  lunch: {
    items: "Jeera Rice, Butter Chapathi (2 Pcs), Paneer Butter Masala, Dal Tadka, Curd, Papad",
    calories: 720,
    ingredients: "Paneer, Wheat flour, Basmati Rice, Butter, Spices, Yogurt",
    allergens: "Gluten, Dairy",
    cutoffTime: "11:00 AM"
  },
  snacks: {
    items: "Onion Pakoda, Hot Ginger Cardamom Tea",
    calories: 260,
    ingredients: "Onion, Gram flour, Oil, Ginger, Cardamom, Tea dust",
    allergens: "None",
    cutoffTime: "04:00 PM"
  },
  dinner: {
    items: "Veg Fried Rice, Gobi Manchurian Gravy, Veg Soup",
    calories: 540,
    ingredients: "Rice, Vegetables, Cauliflower, Soya sauce, Corn flour",
    allergens: "Soy, Gluten",
    cutoffTime: "07:00 PM"
  }
};

const DEFAULT_RSVPS = [
  { rsvpId: "rsvp_1", studentId: "usr_3", name: "Anish Sharma", meal: "breakfast", status: "attending" },
  { rsvpId: "rsvp_2", studentId: "usr_4", name: "Bala Murugan", meal: "breakfast", status: "late_request" },
  { rsvpId: "rsvp_3", studentId: "usr_5", name: "Chitra Ram", meal: "breakfast", status: "late_request" },
  { rsvpId: "rsvp_4", studentId: "usr_6", name: "Devi Karuppan", meal: "lunch", status: "attending" },
  { rsvpId: "rsvp_5", studentId: "usr_7", name: "Ezhil Arasan", meal: "lunch", status: "late_request" },
  { rsvpId: "rsvp_6", studentId: "usr_8", name: "Farooq Hussain", meal: "lunch", status: "late_request" },
  { rsvpId: "rsvp_7", studentId: "usr_9", name: "Ganesh Pandian", meal: "lunch", status: "late_request" },
  { rsvpId: "rsvp_8", studentId: "usr_10", name: "Hari Prasad", meal: "snacks", status: "attending" },
  { rsvpId: "rsvp_9", studentId: "usr_11", name: "Irfan Mohamed", meal: "dinner", status: "late_request" },
  { rsvpId: "rsvp_10", studentId: "usr_12", name: "Janaki Sundar", meal: "dinner", status: "late_request" },
  { rsvpId: "rsvp_11", studentId: "usr_13", name: "Karthik Raja", meal: "breakfast", status: "late_request" },
  { rsvpId: "rsvp_12", studentId: "usr_14", name: "Latha Sri", meal: "lunch", status: "late_request" },
  { rsvpId: "rsvp_13", studentId: "usr_15", name: "Manoj Kumar", meal: "dinner", status: "late_request" },
  { rsvpId: "rsvp_14", studentId: "usr_1", name: "Varun Kumar", meal: "lunch", status: "late_request" },
  { rsvpId: "rsvp_15", studentId: "usr_3", name: "Anish Sharma", meal: "dinner", status: "late_request" },
  { rsvpId: "rsvp_ramya_1", studentId: "usr_ramya", name: "Ramya Devi", meal: "lunch", status: "attending" }
];

const DEFAULT_FEEDBACKS = [
  {
    feedbackId: "fb_1",
    studentName: "Anish S",
    roomNo: "102",
    meal: "lunch",
    rating: 4,
    category: "Taste",
    comment: "Paneer Butter Masala was very rich and tasty today! Chapathis were soft.",
    date: new Date("2026-07-28T13:45:00.000Z"),
    qrPayload: "FB-102-LUNCH-4"
  },
  {
    feedbackId: "fb_2",
    studentName: "Bala M",
    roomNo: "215",
    meal: "breakfast",
    rating: 2,
    category: "Quantity",
    comment: "Chutney was very watery today, and Vada got finished fast before 8:30 AM.",
    date: new Date("2026-07-28T09:15:00.000Z"),
    qrPayload: "FB-215-BF-2"
  },
  {
    feedbackId: "fb_3",
    studentName: "Devi K",
    roomNo: "309",
    meal: "dinner",
    rating: 5,
    category: "Cleanliness",
    comment: "Mess hall is extremely neat today. Hand wash area is well maintained.",
    date: new Date("2026-07-27T21:10:00.000Z"),
    qrPayload: "FB-309-DINNER-5"
  }
];

const DEFAULT_WASTE_LOGS = [
  { date: "2026-07-23", breakfast: 12, lunch: 25, snacks: 5, dinner: 18 },
  { date: "2026-07-24", breakfast: 8, lunch: 30, snacks: 4, dinner: 22 },
  { date: "2026-07-25", breakfast: 15, lunch: 18, snacks: 6, dinner: 14 },
  { date: "2026-07-26", breakfast: 10, lunch: 22, snacks: 3, dinner: 19 },
  { date: "2026-07-27", breakfast: 14, lunch: 28, snacks: 7, dinner: 25 },
  { date: "2026-07-28", breakfast: 9, lunch: 20, snacks: 4, dinner: 15 }
];

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(DEFAULT_USERS);
      console.log("🌱 Seeded initial Student and Admin users into MongoDB.");
    }

    const menuCount = await Menu.countDocuments();
    if (menuCount === 0) {
      await Menu.create(DEFAULT_MENU);
      console.log("🌱 Seeded default hostel menu into MongoDB.");
    }

    const rsvpCount = await RSVP.countDocuments();
    if (rsvpCount === 0) {
      await RSVP.insertMany(DEFAULT_RSVPS);
      console.log("🌱 Seeded default RSVPs into MongoDB.");
    }

    const feedbackCount = await Feedback.countDocuments();
    if (feedbackCount === 0) {
      await Feedback.insertMany(DEFAULT_FEEDBACKS);
      console.log("🌱 Seeded default feedbacks into MongoDB.");
    }

    const wasteCount = await WasteLog.countDocuments();
    if (wasteCount === 0) {
      await WasteLog.insertMany(DEFAULT_WASTE_LOGS);
      console.log("🌱 Seeded default waste logs into MongoDB.");
    }

    const configCount = await Config.countDocuments();
    if (configCount === 0) {
      await Config.create({ key: "system_config", bufferPercent: 8 });
      console.log("🌱 Seeded system config (buffer percentage) into MongoDB.");
    }
  } catch (err) {
    console.error("❌ Seeding Error:", err.message);
  }
};

if (process.argv[1] && process.argv[1].includes("seed.js")) {
  (async () => {
    await connectDB();
    await seedDatabase();
    process.exit(0);
  })();
}
