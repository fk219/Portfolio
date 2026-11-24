export interface BugHuntRound {
  id: string;
  title: string;
  context: string;
  language: string;
  code: string[];
  bugLine: number;
  explanation: string;
  fix: string;
}

export const bugHuntRounds: BugHuntRound[] = [
  {
    id: "stale-closure",
    title: "The counter that never counts",
    context: "A React interval starts once, then the number freezes.",
    language: "React",
    code: [
      "const [count, setCount] = useState(0);",
      "",
      "useEffect(() => {",
      "  const id = setInterval(() => setCount(count + 1), 1000);",
      "  return () => clearInterval(id);",
      "}, []);",
    ],
    bugLine: 3,
    explanation:
      "The interval closure captured the first count value, which was 0. Every tick sets 0 + 1, so the counter appears frozen. Include count in the dependency list or use the functional update.",
    fix: "setCount((current) => current + 1);",
  },
  {
    id: "missing-await",
    title: "The user who is always found",
    context: "An Express handler checks a database result before it exists.",
    language: "Node.js",
    code: [
      "const user = User.findOne({ email: req.body.email });",
      "",
      "if (!user) return res.status(404).json({ error: \"Not found\" });",
      "res.json(user);",
    ],
    bugLine: 0,
    explanation:
      "Without await, user is a Promise. A Promise is always truthy, so the 404 branch never runs and the response tries to serialise a pending query.",
    fix: "const user = await User.findOne({ email: req.body.email });",
  },
  {
    id: "booking-race",
    title: "The slot claimed twice",
    context: "Two patients press Book at the same moment.",
    language: "Mongoose",
    code: [
      "const slot = await Slot.findById(slotId);",
      "if (slot.booked) return res.status(409).json({ error: \"Taken\" });",
      "",
      "slot.booked = true;",
      "await slot.save();",
    ],
    bugLine: 1,
    explanation:
      "This is a read-check-write race. Both requests can read booked: false before either saves, so the last write wins and the slot is double-booked. Claim it atomically with findOneAndUpdate and a booked:false filter.",
    fix: "const slot = await Slot.findOneAndUpdate(\n  { _id: slotId, booked: false },\n  { booked: true },\n  { new: true },\n);\nif (!slot) return res.status(409).json({ error: \"Taken\" });",
  },
  {
    id: "mutating-state",
    title: "The list that reorders itself",
    context: "A price sort unexpectedly changes the original React state.",
    language: "React",
    code: [
      "const visible = items;",
      "visible.sort((a, b) => a.price - b.price);",
      "setItems(visible);",
    ],
    bugLine: 1,
    explanation:
      "Array.prototype.sort mutates the array in place, so this changes the existing state object before React sees a new value. Copy the array first, or use toSorted.",
    fix: "const visible = [...items].sort((a, b) => a.price - b.price);",
  },
  {
    id: "client-logout",
    title: "The session that survives logout",
    context: "The UI says the user is signed out. The token still works.",
    language: "Auth",
    code: [
      "const logout = () => {",
      "  localStorage.removeItem(\"session\");",
      "  window.location.href = \"/login\";",
      "};",
    ],
    bugLine: 1,
    explanation:
      "Clearing local storage only forgets the token on this device. The server still accepts it until it expires. A real logout revokes the session server-side, then clears the client copy.",
    fix: "await fetch(\"/api/auth/logout\", { method: \"POST\" });\nlocalStorage.removeItem(\"session\");",
  },
  {
    id: "cors-credentials",
    title: "The cookie that never arrives",
    context: "Authentication works locally but fails across origins.",
    language: "Express",
    code: [
      "app.use(cors({",
      "  origin: \"*\",",
      "  credentials: true,",
      "}));",
    ],
    bugLine: 1,
    explanation:
      "Browsers reject credentialed requests when the server responds with a wildcard origin. Echo the caller's specific origin after validating it, and set Access-Control-Allow-Credentials.",
    fix: "origin: (origin, callback) =>\n  callback(null, allowedOrigins.includes(origin) ? origin : false),",
  },
  {
    id: "off-by-one",
    title: "The invoice with one extra line",
    context: "A totals loop crashes on the last row.",
    language: "JavaScript",
    code: [
      "for (let i = 0; i <= rows.length; i++) {",
      "  total += rows[i].amount;",
      "}",
    ],
    bugLine: 0,
    explanation:
      "The loop runs while i is less than or equal to length. The last index is length - 1, so the final iteration reads rows[length], which is undefined.",
    fix: "for (let i = 0; i < rows.length; i++) {",
  },
];
