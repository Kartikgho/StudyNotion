const Razorpay = require("razorpay");

console.log("Initializing Razorpay with:");
console.log("Key ID:", process.env.RAZORPAY_KEY ? "✓ Present" : "✗ Missing");
console.log("Key Secret:", process.env.RAZORPAY_SECRET ? "✓ Present" : "✗ Missing");

if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
	console.error("⚠️ WARNING: Razorpay credentials not found in environment variables!");
}

exports.instance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY,
	key_secret: process.env.RAZORPAY_SECRET,
});
