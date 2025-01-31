import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Function to check peak hours for the canteen
const isPeakHour = () => {
    const now = new Date();
    const hour = now.getHours();
    return (hour >= 12 && hour <= 14) || (hour >= 19 && hour <= 21);
};

// Dynamic canteen menu based on the day of the week
const getCanteenMenu = () => {
    const menus = {
        Monday: "🍛 Rice & Dal, 🍗 Chicken Curry, 🥗 Salad, 🍹 Juice",
        Tuesday: "🍕 Pizza, 🍔 Burger, 🌯 Wraps, 🍵 Green Tea",
        Wednesday: "🥘 Biryani, 🍛 Paneer Masala, 🥗 Cucumber Salad, 🥤 Lemonade",
        Thursday: "🍜 Noodles, 🍚 Fried Rice, 🍗 Chilli Chicken, 🥤 Cold Coffee",
        Friday: "🍕 Cheese Pizza, 🌮 Tacos, 🥗 Greek Salad, 🍊 Orange Juice",
        Saturday: "🍔 Double Cheeseburger, 🍟 Fries, 🥙 Falafel Wrap, 🥤 Soft Drinks",
        Sunday: "🥘 Special Thali, 🍤 Fish Fry, 🥗 Caesar Salad, 🍹 Mango Shake"
    };

    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    return menus[today] || "Today's menu is currently unavailable.";
};

// Function to handle Canteen or CC queries
export const getChatbotResponse = async (category, message) => {
    try {
        const lowerCaseMessage = message.toLowerCase();

        if (category === "canteen") {
            if (lowerCaseMessage.includes("peak hour") || lowerCaseMessage.includes("rush hour")) {
                return isPeakHour()
                    ? "Yes! It's peak time at the canteen. Expect long queues. ⏳"
                    : "No, it's currently not peak time. The busiest hours are 12-2 PM.";
            }
            
            if (lowerCaseMessage.includes("canteen menu") || lowerCaseMessage.includes("today’s menu")) {
                return `Today's menu: ${getCanteenMenu()}`;
            }

            if (lowerCaseMessage.includes("canteen hours") || lowerCaseMessage.includes("opening hours")) {
                return "The canteen is open from 8:00 AM to 6:00 PM every day. 🕙";
            }
        } else if (category === "cc") {
            if (lowerCaseMessage.includes("xerox shop") || lowerCaseMessage.includes("where is xerox shop")) {
                return "The Xerox shop is located near the main entrance. 📍";
            }

            if (lowerCaseMessage.includes("xerox price") || lowerCaseMessage.includes("xerox cost")) {
                return "Xerox costs ₹1 per page for black & white and ₹5 per page for color. 🖨️";
            }

            if (lowerCaseMessage.includes("xerox shop timings") || lowerCaseMessage.includes("cc opening hours")) {
                return "The Xerox shop is open from 9:00 AM to 6:00PM. ⏰";
            }
        }

        // OpenAI API call for general responses
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
                max_tokens: 100,
            },
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error getting AI response:", error);
        return "Sorry, I am currently unavailable. Please try again later.";
    }
};
