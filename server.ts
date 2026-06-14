import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini SDK to prevent startup crashes if GEMINI_API_KEY is missing
let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

// System instructions for the VIDHYA MART Smart Student Assistant
const VIDHYA_SYSTEM_INSTRUCTION = `
You are VIDHYA MART Assistant, the premium, smart, friendly AI Student Support assistant for VIDHYA MART – Everything a Student Needs in One Place.
Your primary audience are students, parents, and teachers. Keep your responses encouraging, polite, concise, and helpful.

Here is the VIDHYA MART product inventory you support:
1. BOOKS:
   - Mathematics Textbook Class 10 (NCERT, CBSE Class 10) - ₹195
   - Physics Volume I & II Class 12 (NCERT, Set of 2) - ₹360
   - Class 5 Semester 1 Pack (All Subjects, EVS, English, Maths, Hindi) - ₹650
   - Higher Engineering Mathematics BS Grewal (Degree/B. Tech) - ₹890
   - Concepts of Physics (H.C. Verma, Vol 1 & 2 for IIT-JEE/NEET) - ₹799

2. NOTEBOOKS:
   - Classmate Premium Long Books (Pack of 6, 172pg) - ₹299
   - Navneet Practical Record Notebook (120pg, practicals) - ₹85
   - Sundaram Premium Square Ruled Notebooks (Pack of 4, Maths practice) - ₹180

3. PENCILS:
   - Apsara Platinum Extra Dark Pencils (Pack of 10 with eraser & sharpener) - ₹75
   - Doms Groove Super-Dark Triangle Pencils (Ergonomic grip) - ₹99

4. PENS:
   - Pentonic Ball Pen Pack (Linc, 10 pens assorted - 5 Blue, 3 Black, 2 Red) - ₹120
   - Speed New Radium Gel Pens (Pack of 6, liquid ink exams) - ₹90
   - Cello Butterflow Blue Ball Pens (Pack of 10, high velocity) - ₹150

5. SCHOOL BAGS:
   - Skybags Marvel Captain Backpack (28 Litens, ergonomic) - ₹1299 (Original ₹1999)
   - American Tourister Unisex Student Backpack (32 Liters, laptop sleeve) - ₹1499 (Original ₹2400)
   - Wildcraft Campus Heavy-Duty School Backpack (abrasion resistant) - ₹1699 (Original ₹2200)

6. SCHOOL SHOES:
   - Bata School Classic Black Shoes (comfortable, PVC sole, velcro/lace) - ₹599 (Original ₹699)
   - Liberty White Gola Sports School Shoes (best for PT/Assembly) - ₹450 (Original ₹500)
   - Sparx Performance School Sports Shoes (cushioned, athletic mesh) - ₹899 (Original ₹1199)

7. DAILY ESSENTIALS & ACCESSORIES:
   - Milton Thermosteel Water Bottle (1 Litre, hot/cold 24hr) - ₹699 (Original ₹799)
   - Cello Max Fresh Insulated Steel Lunch Box (insulated, 3 steel containers) - ₹399 (Original ₹450)
   - Maped Study Geometry Box (heavy gauge metal with compass divider) - ₹175 (Original ₹200)
   - Camel Premium Water Color Cake + Paintbrushes Kit (24 saturated paints) - ₹199 (Original ₹250)

Core Platform Services we support:
✅ Textbook Pre-Booking: Order ahead so books are ready right at term commencement!
✅ Bulk Orders: Discounts for schools, college branches or residential clusters.
✅ School Kit Packages: Auto-assembled student kits (based on selected Class, Subjects, Notebook, bag and shoes requirements).
✅ Fast Home Delivery: Safely shipped to student doorsteps.
✅ Live Order Tracking: Type your Order ID (like VIDHYA-TRACK-...) into the search bar or track here.
✅ Cash on Delivery (COD) and Online Payment integrations supported.

How to assist:
- If a user asks what notebooks or pens are available, mention specific products with their real pricing.
- If a user asks "Suggest a school bag under ₹1000", mention that we offer premium long-lasting backpacks from top brands starting at ₹1299 (e.g., Skybags Marvel Captain), or they can customize a student kit!
- If the user asks about order tracking, explain that they can track their order on the VIDHYA MART dashboard by going to the 'Orders & Tracking' section or using their VIDHYA tracking number.
- Help students customize their student kit requirements. If they share their class, subjects or preference, warmly suggest a tailored bundle of products from the inventory!
- Always maintain an encouraging academic vibe, wishing them luck in their studies.
`;

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "VIDHYA MART backend services are operational." });
});

// Gemini Chat Endpoint
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages, currentContext } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid format. 'messages' array must be provided." });
    }

    const client = getGeminiClient();
    
    // Fallback logic if API key isn't provided
    if (!client) {
      console.warn("GEMINI_API_KEY environment variable is not defined. Using smart local simulator.");
      
      const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
      let reply = "";

      if (lastUserMessage.includes("pentonic") || lastUserMessage.includes("pen")) {
        reply = "Yes! We have the **Linc Pentonic Ball Pen Assorted Pack** (10 pens) for ₹120, and **Cello Butterflow Blue Ball Pens** (10 Pack) for ₹150. You can add them right to your cart from the 'Featured Products' or 'Categories' section!";
      } else if (lastUserMessage.includes("class 10") || lastUserMessage.includes("mathematics") || lastUserMessage.includes("math")) {
        reply = "For Class 10 CBSE, we have the standard **NCERT Mathematics Textbook Class 10** for ₹195, and we highly recommend the **Classmate Premium Long Books 6-Pack** (₹299) for math exercises and notebook requirements.";
      } else if (lastUserMessage.includes("bag") || lastUserMessage.includes("backpack")) {
        reply = "We offer three heavy-duty premium backpacks:\n- **Skybags Marvel Captain** (₹1299)\n- **American Tourister Casual Padded** (₹1499)\n- **Wildcraft Heavy-Duty Campus** (₹1699)\nAll come with water resistance and ample space for notebooks and textbooks!";
      } else if (lastUserMessage.includes("track") || lastUserMessage.includes("order")) {
        reply = "You can track any active purchase under the **Orders & Tracking** tab. Simply write your order reference number (e.g., *VIDHYA-TRACK-8820* ) into the Tracking Number field to retrieve the real-time shipping status.";
      } else if (lastUserMessage.includes("kit") || lastUserMessage.includes("customize")) {
        reply = "Our interactive **Custom Student Kit Generator** is the easiest way to customize! Go to the 'Custom Student Kit' tab, specify your Grade, select your Subjects, Stationery Kit preference, Bag/Shoes brand and sizes, and click **Generate My Student Kit** to place an order instantly!";
      } else {
        reply = `Hello! I am your VIDHYA MART Student Assistant. How can I help you?
I can answer questions about:
- Product pricing and brand availability (e.g., Bata Shoes, Pentonic Pens, Classmate Notebooks)
- Book recommendations for Class 10/12/engineering
- Smart school packages and kit generation
- Order tracking and cash on delivery services

*(Note: Gemini AI is currently running in local fallback mode because a Google API Key wasn't fully saved in settings. No worries, I can still guide you around the campus store!)*`;
      }
      return res.json({ text: reply });
    }

    // Convert chat messages to the format expected by getGeminiClient()
    // For @google/genai: ai.models.generateContent accepts 'contents' parameter
    // Let's format previous conversation for the model. We can join them or use a chat session.
    // Let's use simple single generateContent call with conversation combined, as it is ultra reliable and allows systemInstruction injections elegantly.
    let formattedConversation = "";
    for (const msg of messages) {
      const senderName = msg.role === 'user' ? 'Student/User' : 'VIDHYA MART Assistant';
      formattedConversation += `${senderName}: ${msg.content}\n\n`;
    }
    
    if (currentContext) {
      formattedConversation += `[SYSTEM NOTE - Active User Context]: The student is currently browsing. Wishlist count: ${currentContext.wishlistLength || 0}. Cart total: ₹${currentContext.cartTotal || 0}. Selected Class for kit: ${currentContext.kitClass || 'Not chosen yet'}.\n\n`;
    }

    formattedConversation += "VIDHYA MART Assistant: ";

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedConversation,
      config: {
        systemInstruction: VIDHYA_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I apologize, I am processing high database traffic right now. How else can I assist with your school essentials?";
    res.json({ text: replyText });

  } catch (error: any) {
    console.error("Gemini API backend error:", error);
    res.status(500).json({ error: "Error processing Smart Assistant inquiry: " + error.message });
  }
});

// Vite server integrated middleware for Client Single Page App serving
async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[VIDHYA MART Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

initializeServer().catch((err) => {
  console.error("[VIDHYA MART Server] Bootstrap error:", err);
});
