// =============================================================================
// seed-data.mjs — the content that currently lives in lib/site.ts,
// lib/content.ts, lib/projects.ts, lib/notes.ts, lib/tech.ts and app/page.tsx.
//
// Extracted verbatim so the database starts out rendering exactly what the
// hardcoded version rendered. Edit here, then run `pnpm db:seed`.
// =============================================================================

export const siteSettings = {
  name: "Muhammad Aldryansyah Pamungkas",
  username: "@aldryansyahp",
  nickname: "Aldry",
  role: "Software Engineer",
  tagline:
    "A simple, writing-first portfolio. Part résumé, part journal — everything stays in black and white.",
  location: "[City, Country]",
  email: "aldryansyah30@gmail.com",
  github: "https://github.com/alcodefun",
  twitter: "https://x.com/yourname",
  linkedin: "https://linkedin.com/in/muhammadaldryansyahpamungkas",
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/journey", label: "Journey" },
  { href: "/random", label: "Random" },
];

export const homeHero = {
  updatedLabel: "Last Updated —",
  lineOne: "Coding all day till eyes go dry",
  greeting: "Hello, I am",
  experiencePrefix: "a 2+ years experince",
};

export const homeSections = [
  {
    key: "in_short",
    kind: "text",
    title: "In short",
    body: "As a software engineer, I enjoy about crafting software and the art of trial n error. Interest to build both side of system (backend + frontend). Currently working as Frontend Web Developer @ Nutapos. This site contain deep dive information writed in story telling style about my personal projects, journey, and other things about me",
  },
  { key: "educated_at", kind: "heading", title: "Educated At", body: "" },
  {
    key: "recent_on_me",
    kind: "text",
    title: "Recent on Me",
    body: "Starting my photobooth business with my partner. Reduce operational zero cost on photobooth app subscription. We develop our photobooth system to integrate the camera and the printer. Research photobooth flow to enhance user experience and time efficiency.",
  },
  {
    key: "tech_experiences",
    kind: "heading",
    title: "Tech Tools Experiences",
    body: "",
  },
  { key: "reach_me", kind: "contact", title: "Reach Me", body: "" },
];

export const education = [
  {
    period: "2021 — 2025",
    degree: "Bachelor of Applied Science in Computer",
    school: "IPB University, Bogor, Indonesia",
    gpa: "3.86/4.00",
    predicate: "Cum Laude",
  },
];

export const techItems = [
  ...[
    "python",
    "javascript",
    "typescript",
    "golang",
    "php",
    "vue.js",
    "react.js",
    "next.js",
    "laravel",
    "mysql",
    "postgresql",
    "mongodb",
    "supabase",
  ].map((label) => ({ groupName: "experience", label })),
  ...[
    "react",
    "typescript",
    "next.js",
    "node",
    "postgres",
    "figma",
    "tailwind",
    "git",
  ].map((label) => ({ groupName: "stack", label })),
];

export const journeyEntries = [
  {
    slug: "on-slower-software",
    title: "Falling for slower software",
    date: "2026-08-14",
    excerpt:
      "I spent a weekend with software that has no notifications, no streaks, no feed. Here is what it taught me about attention.",
    readMinutes: 4,
    content: [
      {
        type: "p",
        text: "The app did exactly one thing. It opened to a blank page, waited for me to type, and never asked for anything else. No badges, no gamified days, no \"you missed yesterday\" message. I had forgotten software could be this quiet.",
      },
      {
        type: "p",
        text: "I kept waiting for the catch. Every tool these days needs to hook you, retain you, grow you into a metric. This one just… existed. The only signal of progress was the words accumulating on the page, and that was enough.",
      },
      { type: "h2", text: "Resistance, then ease" },
      {
        type: "p",
        text: "The first hour felt wrong. I kept reaching for a toolbar that was not there, hunting for features the product had deliberately left out. Somewhere around the second afternoon, I stopped fighting it and started writing.",
      },
      {
        type: "quote",
        text: "A tool is faster when it gets out of the way — but only if you are willing to walk the empty hallway first.",
      },
      { type: "h2", text: "What I kept" },
      {
        type: "list",
        items: [
          "Fewer features is a product decision, not a shortcut.",
          "Blank space is a design material, just like ink.",
          "The tools we tolerate quietly shape how we think.",
          "Slowness is often just intention wearing a disguise.",
        ],
      },
      {
        type: "p",
        text: "I still use the fast, noisy apps. But now I know the quiet ones exist, and I am building one myself.",
      },
    ],
  },
  {
    slug: "notes-on-building-in-public",
    title: "Notes on building in public",
    date: "2026-05-02",
    excerpt:
      "A year of sharing half-finished work taught me that vulnerability is a feature, not a bug.",
    readMinutes: 5,
    content: [
      {
        type: "p",
        text: "A year ago I posted a blurry screenshot of a broken UI and called it \"week one\". I expected to be embarrassed. Instead, eleven strangers wrote back with corrections, ideas, and encouragement. That was the moment building in public stopped being a strategy and became a way to work.",
      },
      { type: "h2", text: "The honest number" },
      {
        type: "p",
        text: "People do not follow the polished launch. They follow the honest number — \"I have 300 users, this feature is broken, here is what I learned\". Perfect work is easy to admire and impossible to join. Broken work invites people in.",
      },
      {
        type: "list",
        items: [
          "Post the version you are embarrassed to share.",
          "Answer every comment that engages with the work.",
          "Write the log of what you tried, including the failures.",
        ],
      },
      { type: "hr" },
      {
        type: "p",
        text: "The hardest part is consistency, not courage. The feed rewards novelty, but the practice rewards showing up. I have learned to treat the archive as the audience, not the algorithm.",
      },
    ],
  },
  {
    slug: "the-year-i-learned-to-say-no",
    title: "The year I learned to say no",
    date: "2026-01-19",
    excerpt:
      "Every \"yes\" is secretly a vote against something. A short account of reclaiming the word.",
    readMinutes: 3,
    content: [
      {
        type: "p",
        text: "I said yes to everything last year. New meetings, new side projects, new small favors that seemed harmless on their own. Somewhere in April I looked at my calendar and realized I had not finished a single personal project in six months.",
      },
      { type: "h2", text: "The math of yes and no" },
      {
        type: "p",
        text: "Saying no to one call is not a rejection. It is a preference declared in advance — a vote for the two evenings of deep work that the call would have erased. I started treating every yes as a budget, not a courtesy.",
      },
      {
        type: "quote",
        text: "No is a complete sentence. It is also a deadline for me, and a gift to everyone else.",
      },
      { type: "h2", text: "What changed" },
      {
        type: "p",
        text: "I finished things again. More importantly, the people around me adapted. The requests became better, rarer, and more intentional — because I stopped teaching them that yes was always available.",
      },
    ],
  },
  {
    slug: "small-tools-long-habits",
    title: "Small tools and long habits",
    date: "2025-10-08",
    excerpt:
      "The best productivity app I own is a paper notebook and a consistent evening ritual.",
    readMinutes: 4,
    content: [
      {
        type: "p",
        text: "I have cycled through most serious note-taking apps, and they are all wonderful landfills. The system I actually use is embarrassing in its simplicity: a spiral notebook, a pen, and fifteen minutes before bed.",
      },
      { type: "h2", text: "Why small wins" },
      {
        type: "p",
        text: "Small tools win because they lower the cost of starting. A notebook cannot sync, cannot fail, cannot interrupt. It asks nothing of me except that I stay a little while. Tools with low entry fees compound into habits, while tool with high entry fees become guilt.",
      },
      {
        type: "list",
        items: [
          "Write the day's one thing worth keeping.",
          "Draw a line under yesterday.",
          "Close the notebook. Repeat tomorrow.",
        ],
      },
      {
        type: "p",
        text: "Technology is at its best when it is boring enough to disappear, leaving only the habit behind.",
      },
    ],
  },
];

export const projects = [
  {
    slug: "photo-booth-system",
    indexLabel: "01",
    title: "PhotoBooth System — the machine behind a small business",
    year: "2026",
    role: "Full-stack Developer",
    tags: ["React", "Electron", "Node.js", "Cloudflare R2"],
    hook: "A photobooth I run with a partner, built to take the per-event subscription to zero.",
    repoUrl: "https://github.com/AlcodeFun/photo-booth",
    // Empty on purpose: screenshots are uploaded from /admin/projects and stored
    // in Supabase Storage, so seeding one would point the gallery at files that
    // do not exist in the bucket.
    gallery: [],
    content: [
      {
        type: "p",
        text: "This one is not a portfolio exercise. I started a photobooth business with a partner, and the first thing we learned is that the software was the expensive part. Every photobooth app on the market is rented, per machine, per month, and every event we took on made that number bigger. So we built our own.",
      },
      {
        type: "p",
        text: "The goal was narrow and slightly boring: no recurring cost, and a flow that a guest can finish without an attendant explaining it. Everything after that — the layout editor, the web delivery step, the R2 bucket — exists because we watched real people get stuck and had to decide whether to charge them or fix it.",
      },
      { type: "h2", text: "What the system actually does" },
      {
        type: "list",
        items: [
          "Manages sessions end to end, so an event is a thing you can open, run, and close.",
          "Captures photos from the camera and processes them on the machine.",
          "Applies a customizable layout, so the same booth can suit a wedding and a company event.",
          "Delivers the final result through an integrated web-based workflow, with no app install and no code.",
        ],
      },
      { type: "h2", text: "Why Electron" },
      {
        type: "p",
        text: "The booth is a desktop machine, not a website, and that constraint decided almost everything. It has to start when the venue powers on, take over the screen, drive a camera and a printer, and survive being unplugged mid-event. A browser tab does none of that reliably, so the shell is Electron and the interface is React — the same components I would write for the web, running somewhere that is allowed to own the machine.",
      },
      {
        type: "p",
        text: "Node.js sits behind it as the service layer, and that split is what made the project survivable. The parts that are about the physical booth stay in Electron, and the parts that are about data — sessions, guests, results, delivery — stay on a server. When the network drops during a busy event, the booth keeps taking pictures.",
      },
      { type: "h2", text: "Storage was the real decision" },
      {
        type: "p",
        text: "The zero-cost goal collapsed the moment we priced photo storage honestly. Every guest wants their pictures, every picture has to live somewhere forever, and forever is the expensive word. We settled on Cloudflare R2 because it charges for storage and egress separately, and for a business that writes a lot and reads it once, the read side is nearly free.",
      },
      {
        type: "p",
        text: "That choice had a second effect nobody predicted: because the objects live in a bucket rather than on the machine, the delivery flow became trivial. The booth uploads, prints, and hands over a link. The guest gets a gallery that works on a phone. The venue never touches a USB stick, and we never touch a laptop full of other people's photos.",
      },
      { type: "h2", text: "What I learned running it" },
      {
        type: "quote",
        text: "The code was the easy part. The first real bug report came from a grandmother who could not see the button.",
      },
      {
        type: "p",
        text: "Building a product for people you will actually meet changes how you write it. Error states stopped being theoretical — a camera that disconnects mid-session needs a recovery path, not a spinner. The layout editor needed bigger defaults than I would ever pick on a design. And every extra step between a guest and their photo is a person who leaves with nothing and a bad memory of our booth.",
      },
      {
        type: "p",
        text: "I am still the only engineer on it, which means the most valuable thing the system does is not a feature. It is that it keeps working on a Saturday when nobody from the team is awake to look at it.",
      },
    ],
  },
  {
    slug: "okiagaru-gps-land-mapping",
    indexLabel: "02",
    title: "Okiagaru — a GPS land mapping system for field surveys",
    year: "2025",
    role: "Full-stack Developer",
    tags: ["Vue.js", "Laravel", "MySQL"],
    hook: "Drawing property boundaries by walking them, and finding out what the ground will allow.",
    repoUrl: "https://github.com/AlcodeFun/lists/okiagaru-gps-tracker",
    gallery: [],
    content: [
      {
        type: "p",
        text: "Okiagaru started from a question that maps do not answer well: if I walk the edge of a plot of land with my phone, can I come back with a real, mappable boundary? Not a pin dropped somewhere near the entrance — an actual polygon that matches the ground.",
      },
      {
        type: "p",
        text: "The answer is yes, and it is less about satellite accuracy than about giving a surveyor a decent way to correct for the inevitable human error. People do not walk corners cleanly. Phones lose signal under trees. The system has to absorb all of that and still produce a shape someone can defend.",
      },
      { type: "h2", text: "From walking to polygon" },
      {
        type: "list",
        items: [
          "Record GPS points along a survey walk, in the order they were actually taken.",
          "Close the walk into a polygon, so a boundary is a shape and not a trail of dots.",
          "Store the spatial data alongside its attributes, so a plot carries more than coordinates.",
          "Visualize every parcel on a map, so overlaps and gaps are obvious instead of theoretical.",
        ],
      },
      { type: "h2", text: "The part that made it useful" },
      {
        type: "p",
        text: "Mapping land is not the goal. Deciding what to do with it is. The system supports field surveys and land suitability assessment, which means the polygon is only half of the answer — the other half is asking what that shape is good for, and that question needs the map to be accurate enough to argue about.",
      },
      {
        type: "quote",
        text: "A boundary is a legal claim drawn in dirt. The software's job is to stop it from being a guess.",
      },
      {
        type: "p",
        text: "The frontend is Vue and the backend is Laravel on MySQL, which is a boring stack and was the right one. Survey work happens on cheap phones with bad connections, so the map view has to render from a small cached response and the write path has to survive being retried. I would rather spend the complexity budget on the geometry than on the framework.",
      },
    ],
  },
  {
    slug: "ecotainment-reservation-system",
    indexLabel: "03",
    title: "Ecotainment by Godong Ijo — reservation system",
    year: "2025",
    role: "Full-stack Developer",
    tags: ["Vue.js", "Laravel", "MySQL"],
    hook: "Bookings, payments, and a database that finally agreed to be one system.",
    repoUrl: "https://github.com/AlcodeFun/lists/ecotainment-reservation",
    gallery: [],
    content: [
      {
        type: "p",
        text: "Ecotainment is a nature park, and its reservation problem was the kind that looks simple right up until you ask what happens when two people want the last slot. Build an end-to-end reservation system covering booking and payment, and suddenly you are maintaining availability, capacity, and money in the same place.",
      },
      {
        type: "p",
        text: "The scope was deliberately whole: frontend, backend, and database, wired together, no stubs. I wanted a system I could point at and say this is the shape of something I have actually finished, rather than a frontend sitting next to a mock API.",
      },
      { type: "h2", text: "How it holds together" },
      {
        type: "list",
        items: [
          "A visitor browses what's available and picks a date, seeing real availability rather than a form that fails on submit.",
          "A booking reserves capacity, so the same slot cannot be sold twice.",
          "Payment is part of the flow instead of a promise made later over chat.",
          "Every record lands in one relational schema, so the park's history is queryable rather than anecdotal.",
        ],
      },
      { type: "h2", text: "Availability is the whole product" },
      {
        type: "p",
        text: "Most of the engineering here is not in the confirmation screen. It is in making sure a number that means \"eight remaining\" is actually eight, right up until the moment someone pays. That means the capacity check and the write happen in a single transaction, and that a payment which never completes does not quietly consume a slot forever.",
      },
      {
        type: "quote",
        text: "A booking system is mostly a system for being honest about scarcity.",
      },
      {
        type: "p",
        text: "Vue on the front, Laravel and MySQL behind it. Nothing in that sentence is exciting, and that is the point — a reservation system that works is worth more than an impressive one that double-books a family on a Sunday.",
      },
    ],
  },
  {
    slug: "ms-attendance",
    indexLabel: "04",
    title: "MS Attendance — employee attendance for Max Samasta",
    year: "2024",
    role: "Frontend Developer",
    tags: ["Vue.js", "Axios", "REST API"],
    hook: "The screens employees use to clock in, built against someone else's API.",
    repoUrl: "https://github.com/AlcodeFun/ms-attendance-fe",
    gallery: [],
    content: [
      {
        type: "p",
        text: "MS Attendance was built for a small company that needed attendance data they could actually trust, and my part of it was the frontend. Not a demo frontend — the real interfaces, consuming a REST API written by someone else and living with every decision that implied.",
      },
      {
        type: "h2", text: "What I built",
      },
      {
        type: "list",
        items: [
          "The clock-in and clock-out interfaces, built to be usable from a phone at a doorway.",
          "The attendance views staff use to check their own records and correct mistakes.",
          "The admin screens for reading the data, filtering it by period, and exporting it.",
          "The API integration layer, with every request and response state handled deliberately.",
        ],
      },
      { type: "h2", text: "Working against an API you did not write" },
      {
        type: "p",
        text: "The most useful thing about this project was how little I controlled. I could not rename a field or add an endpoint when something was missing — I could only handle what the API chose to return, including the days it returned nothing, returned null where a list was expected, or returned a 200 with an error message in the body.",
      },
      {
        type: "p",
        text: "That constraint made the request layer the most careful code I have written. Every call has a defined success shape, a defined empty shape, and a defined failure shape, and the UI has a real state for all three. An attendance screen that shows a blank grid when the network hiccups is worse than one that says the network hiccuped, because a blank grid looks like an accusation about the employee using it.",
      },
      {
        type: "quote",
        text: "You do not learn how an API fails until you are not allowed to change it.",
      },
      {
        type: "p",
        text: "Axios in the middle, Vue on both sides of it. The takeaway was not about either library. It was that the quality of a frontend is mostly decided by how it behaves when the backend is having a bad day.",
      },
    ],
  },
  {
    slug: "janlink",
    indexLabel: "05",
    title: "JanLink — merchant tracking on a live map",
    year: "2023",
    role: "Full-stack Developer",
    tags: ["PHP", "AJAX", "Google Maps API"],
    hook: "Watching a fleet of merchants move across a map without reloading the page.",
    repoUrl: "https://github.com/AlcodeFun/JanLink",
    gallery: [],
    content: [
      {
        type: "p",
        text: "JanLink was built around one visual idea: a merchant's location, on a map, updating while you watch. Not a report you open later, and not a list with a refresh button — a live picture of where the network is right now.",
      },
      {
        type: "h2", text: "Why AJAX was the whole point" },
      {
        type: "p",
        text: "The obvious version of this reloads the page every few seconds, and the obvious version is unusable. Refreshing resets the map, loses the viewport, and makes you re-find the merchant you were looking at. Polling with AJAX in the background and only updating the markers that actually moved is what makes the map feel live instead of broken.",
      },
      {
        type: "list",
        items: [
          "A PHP backend that accepts and serves merchant positions.",
          "An AJAX layer that polls for changes and returns only what is new.",
          "Google Maps rendering those updates in place, without a full re-render.",
          "A merchant view that keeps its zoom and center across every refresh.",
        ],
      },
      {
        type: "quote",
        text: "A map that reloads is a screenshot. A map that updates is information.",
      },
      {
        type: "p",
        text: "This was PHP and the Google Maps API in 2023, and I remember being slightly embarrassed about it while I was building it. I have since come around. The interesting problem was never the framework — it was deciding what counts as movement worth redrawing, which is a question about the product's purpose rather than about any tool.",
      },
    ],
  },
  {
    slug: "camp-survivor-cashier",
    indexLabel: "06",
    title: "Camp Survivor Cashier",
    year: "2023",
    role: "Frontend Developer",
    tags: ["React.js", "Bootstrap", "JSONPlaceholder API"],
    hook: "A point of sale that has to be fast with one hand and wrong about nothing.",
    repoUrl: "https://github.com/AlcodeFun/ChasierWeb-CampSurvivor",
    gallery: [],
    content: [
      {
        type: "p",
        text: "Camp Survivor Cashier is a web cashier application, and the design brief was shorter than the constraint: it has to be usable by someone who is holding something else, standing up, in a hurry. Every decision in the interface follows from that sentence.",
      },
      {
        type: "h2", text: "Building for the counter" },
      {
        type: "list",
        items: [
          "A responsive layout that stays legible on a small screen and a large one.",
          "A cart that is always visible, because a cashier should never have to go looking for the total.",
          "Buttons sized for a thumb, since the person using this is not a mouse user.",
          "A total that is impossible to misread, updated as items are added and removed.",
        ],
      },
      { type: "h2", text: "API-driven data" },
      {
        type: "p",
        text: "Product and transaction data was handled through API calls against the JSONPlaceholder API, which made the app's data flow real even though the data itself was placeholder. I used it to build and test the states that matter: the populated list, the empty list, the slow response, and the failed request — four states that between them are most of what a cashier app is.",
      },
      {
        type: "quote",
        text: "Every point of sale is a bet that the human will not make a mistake. The UI is the bet.",
      },
      {
        type: "p",
        text: "React and Bootstrap, which meant I spent less time on the styling layer and more on state. I have no apology for that on a project of this size — the interesting question was never what color the cart is, it is what the app says when the total is wrong.",
      },
    ],
  },
  {
    slug: "foodish-order-app",
    indexLabel: "07",
    title: "Foodish — an Android order app built to learn mobile programming",
    year: "2023",
    role: "Android Developer",
    tags: ["Android", "MongoDB", "REST API"],
    hook: "A course project that forced one real constraint: no database driver, only HTTP.",
    repoUrl: "https://github.com/AlcodeFun/Foodish-OrderApp",
    gallery: [],
    content: [
      {
        type: "p",
        text: "Foodish started as an assignment for a Mobile Programming course, and the brief was small on purpose. Build an order app, persist it somewhere real, and do not hide behind a backend you did not write. What I had to ship was a working Android client in Java that could browse food, build a cart, and place an order against a live MongoDB database.",
      },
      {
        type: "p",
        text: "The interesting constraint was not Android. It was the database. The course required the app to talk to MongoDB through plain HTTP requests, which meant no MongoDB Java driver and no ORM. Every read and every write had to go over the wire as a request and come back as JSON. That single rule shaped almost every decision that followed.",
      },
      { type: "h2", text: "What the app does" },
      {
        type: "list",
        items: [
          "Browse a menu of food items, fetched fresh from the database on load.",
          "Open a single item and read its description, price, and category.",
          "Build a cart by adding and removing items, with the running total kept in sync.",
          "Place an order, which writes a new order document back to MongoDB.",
          "Handle the states in between: loading, empty results, and a failed request.",
        ],
      },
      { type: "h2", text: "Talking to MongoDB over HTTP" },
      {
        type: "p",
        text: "MongoDB is normally reached through a driver, but a driver speaks the wire protocol directly and an Android app has no business bundling one. Exposing the database over HTTP instead means the app is just another HTTP client, which is the same thing Volley already is. The database was published as a REST endpoint, and the app addressed it like any other API: a URL, a method, a JSON body, and a response to parse.",
      },
      {
        type: "p",
        text: "This is not how you would ship a production app, and it is worth being honest about why. A REST endpoint that writes to a database needs credentials, and those credentials would end up inside the APK where anyone can unzip and read them. The correct production shape is a thin backend of your own that holds the keys and makes the authorization decisions. Doing it the course way was the point: it forced me to understand the request/response boundary instead of hiding it behind a driver that never showed me the seam.",
      },
      { type: "h2", text: "Volley in practice" },
      {
        type: "p",
        text: "Volley is the Android library built for exactly this shape of work, so it did all the transport. The work was in wiring it up properly rather than in the first request. The request queue is set up once and shared, because building a new one per screen is the most common way to make an Android app feel slow.",
      },
      {
        type: "list",
        items: [
          "A single shared RequestQueue, created once and reused across screens.",
          "JSON request types instead of raw strings, so parsing and typecasting happen in one place.",
          "Responses handed back on the main thread, so views are only ever touched from the UI thread.",
          "Explicit handling of three outcomes: a response, a parse failure, and a network failure.",
          "Buttons disabled while a request is in flight, so a slow connection cannot queue duplicate orders.",
        ],
      },
      {
        type: "p",
        text: "The error handling took the longest and mattered the most. A request can succeed and still be useless — a 200 with a body that is not the shape you expected — and a mobile connection will drop mid-request more often than any server will admit. Treating those as one failure path is how an app ends up showing an empty screen with no explanation.",
      },
      {
        type: "quote",
        text: "The driver would have hidden the seam. Taking it away was the most useful thing the assignment did.",
      },
      { type: "h2", text: "What I took from it" },
      {
        type: "p",
        text: "The app is not the part I would show someone as engineering. What I kept is more basic and harder to get from tutorials: what actually happens between tapping a button and seeing a result. Every screen has a loading state, a populated state, an empty state, and a failure state, and you only find the last two by breaking the network and looking. Volley taught me that HTTP on the client is not a solved problem, and the HTTP-only database taught me that every convenience a library offers is a decision someone else already made for you.",
      },
    ],
  },
];

export const randomNotes = [
  {
    slug: "on-editors",
    title: "On editors",
    date: "2026-03-11",
    text: "The internet made everyone a publisher and almost nobody an editor. The difference matters more than it ever has.",
    content: [
      {
        type: "p",
        text: "Anyone can ship to the whole world now — that part got easy years ago. What almost never happens anymore is a second pair of eyes on a piece of work before it goes out. We publish first and edit in public, which is a polite way of saying the audience does the editing for free.",
      },
      {
        type: "p",
        text: "I am not nostalgic for gatekeepers. But I have started to quietly miss the thing an editor actually did: standing far enough away from your words to see what they really say, not what you meant them to say.",
      },
      {
        type: "quote",
        text: "Publishing used to be a promise. Today it is a default.",
      },
      {
        type: "p",
        text: "So I try to be my own editor, badly, one draft late. It is still the most useful hour of the week.",
      },
    ],
  },
  {
    slug: "on-being-wrong",
    title: "On being wrong",
    date: "2026-02-02",
    text: "I keep a list of things I am wrong about. It grows faster than I would like, which is probably the point of keeping it.",
    content: [
      {
        type: "p",
        text: "The list started with small things — a library I swore was abandoned, a country I was sure was spelled differently, a setup I was certain was best practice. Every entry looked harmless on its own. Together they form a useful warning: my strong opinions all came with a timestamp.",
      },
      {
        type: "p",
        text: "Some people keep a reading list. I keep a wrongness list. It is just a plain file I append to, and it has a rule: an item only counts if I can remember defending it out loud.",
      },
      {
        type: "quote",
        text: "A fact you refuse to check is a belief wearing a lab coat.",
      },
      {
        type: "p",
        text: "The list grows faster than I would like. That is fine. A growing wrongness list means I am actually finding out things, rather than confirming them.",
      },
    ],
  },
  {
    slug: "on-attention",
    title: "On attention",
    date: "2026-01-14",
    text: "Most apps fail not because they are hard to use but because after a week they are boring. Attention is the only battery that matters.",
    content: [
      {
        type: "p",
        text: "We blame bad onboarding, ugly screens, missing features. Usually the truth is duller: the app was interesting once and then stopped being worth ten seconds a day. Nobody designs for week four, and week four is where most products go to die.",
      },
      {
        type: "p",
        text: "Attention is the only battery that matters. Every app I keep using has found a way to earn a tiny recharge each day — a habit, a visible trace of progress, a reason the empty state is not actually empty.",
      },
      {
        type: "quote",
        text: "Retention is not a metric. It is a daily verdict.",
      },
    ],
  },
  {
    slug: "on-writing-things-down",
    title: "On writing things down",
    date: "2025-12-01",
    text: "Writing an idea down is not remembering it. It is deciding that it exists.",
    content: [
      {
        type: "p",
        text: "An unwritten idea is a mood. It feels important, it looms, and it compresses into fog as soon as you try to describe it. The act of writing is what turns the fog into something with edges — and mostly it reveals the idea was never as big as the mood.",
      },
      {
        type: "p",
        text: "That sounds deflating, but it is the point. Writing things down is how I reject ideas cheaply instead of carrying them around for weeks. The ones that survive being written are the ones worth keeping.",
      },
      {
        type: "quote",
        text: "Most ideas do not die in the meeting. They die on the page, quickly, which is where all good ideas should be allowed to die.",
      },
      {
        type: "p",
        text: "So I write nearly everything down, and I am wrong about most of it, and I would not trade the practice for a better memory.",
      },
    ],
  },
  {
    slug: "on-perfectionism",
    title: "On perfectionism",
    date: "2025-10-20",
    text: "Perfectionism is procrastination wearing a suit.",
    content: [
      {
        type: "p",
        text: "The suit is convincing. It looks like standards, like doing things right, like caring. Underneath it is usually the same thing as any other delay: a fear of an outcome we can predict and do not want to meet.",
      },
      {
        type: "p",
        text: "I can name a dozen projects that failed at the highest fidelity possible. They were pixel perfect, architected beautifully, and never once in front of a real user for long enough to learn anything.",
      },
      {
        type: "quote",
        text: "Done, not beautiful. Beautiful is a mood; done is evidence.",
      },
      {
        type: "p",
        text: "I try to catch myself when the polishing starts before the releasing does. The polish is not the work. The work is the number of times something is shipped.",
      },
    ],
  },
  {
    slug: "on-apologies",
    title: "On apologies",
    date: "2025-09-06",
    text: "The best apology I know is a changed schedule.",
    content: [
      {
        type: "p",
        text: "Words make the apology feel finished, which is exactly why it is not. The part that costs something is what you do the following week — where the meeting actually goes, whose deadline moves, what you stop doing so this does not happen again.",
      },
      {
        type: "p",
        text: "I have been late, I have over-promised, I have said sorry and meant it. The difference between the apologies that landed and the ones that did not was never sincerity. It was whether my calendar changed afterwards.",
      },
      {
        type: "quote",
        text: "People forgive the miss. They do not forgive the unchanged plan.",
      },
    ],
  },
  {
    slug: "on-gardens",
    title: "On gardens",
    date: "2025-07-18",
    text: "Nobody hands a shovel to someone who already has a garden.",
    content: [
      {
        type: "p",
        text: "Help arrives in the shape of the helper, not the helpee. A person with a working system gets offers to optimize it. A person without one gets advice about starting small — which is true, and also almost never what a desperate project needs.",
      },
      {
        type: "p",
        text: "I have been on both sides. When I am thriving, people want to improve me. When I am stuck, the same people want to motivate me. Nobody ever hands me a shovel, even when digging is the obvious next step.",
      },
      {
        type: "quote",
        text: "Ask for the shovel. It is the only thing nobody volunteers.",
      },
      {
        type: "p",
        text: "These days, before I offer help I ask what is actually in the way. Sometimes the gardening advice is wanted. Sometimes the person just needs me to dig.",
      },
    ],
  },
  {
    slug: "on-notes",
    title: "On notes",
    date: "2025-05-27",
    text: "I finally understand why people keep resetting their notes app. They are not looking for a better system. They are looking for a clean slate.",
    content: [
      {
        type: "p",
        text: "The cycle is always the same: switch app, import everything, build folders, feel a wave of certainty, then slow leak back into chaos and start scrolling for the next app. The system was never the problem.",
      },
      {
        type: "p",
        text: "A notes app is not a filing cabinet. It is a mirror, and the mirror shows how messy and inconsistent you actually are. Resetting it is not organization — it is brushing your teeth in front of the mirror instead of looking for a new bathroom.",
      },
      {
        type: "quote",
        text: "The clean slate is the product. The app is just the paper towel.",
      },
      {
        type: "p",
        text: "I stopped searching. I keep one file, I keep it ugly, and I write things down in it every day. It is not a better system. It is a practiced one, which turns out to be the only kind that works.",
      },
    ],
  },
];

export const pageSettings = [
  {
    pageKey: "journey",
    seoTitle: "Journey",
    seoDescription: "A running log of short essays and notes.",
    heading: "Journey",
    intro:
      "A running log of small essays and notes, in the order they happened. Click any entry to read the whole thing.",
    backLabel: "← back to the journal",
    backHref: "/journey",
    allLabel: "← all entries",
    listMetaFormat: "{date} · {readMinutes} min",
    detailMetaFormat: "{date} · {readMinutes} min read",
    emptyMessage: "No entries yet.",
  },
  {
    pageKey: "projects",
    seoTitle: "Projects",
    seoDescription: "A few projects, written the way they actually happened.",
    heading: "Projects",
    intro:
      "A short list of things I have built. Each one is written the way it actually happened",
    backLabel: "← back to projects",
    backHref: "/projects",
    allLabel: "← all projects",
    listMetaFormat: "{year}",
    detailMetaFormat: "{year} · {role} · {tags}",
    emptyMessage: "No projects yet.",
  },
  {
    pageKey: "random",
    seoTitle: "Random",
    seoDescription: "Short notes and half-thoughts, in the order I wrote them.",
    heading: "Random",
    intro:
      "Short notes and half-thoughts that never found a longer home. Timestamped in the order I wrote them, which is rarely chronological.",
    backLabel: "← back to random",
    backHref: "/random",
    allLabel: "← all random thoughts",
    listMetaFormat: "{date}",
    detailMetaFormat: "{date} · random thought",
    emptyMessage: "No notes yet.",
  },
  {
    pageKey: "not_found",
    seoTitle: "Not found",
    seoDescription: "",
    heading: "This page is missing from the archive.",
    intro:
      "It may have been removed, or the address was written down wrong. Either way, the rest of the site is still here.",
    backLabel: "← back home",
    backHref: "/",
    allLabel: "",
    listMetaFormat: "",
    detailMetaFormat: "",
    emptyMessage: "",
  },
];

export const uiStrings = [
  { key: "home.last_updated_prefix", value: "Last Updated —", groupName: "home" },
  { key: "home.random_notes_link", value: "random notes", groupName: "home" },
  { key: "home.random_notes_href", value: "/random", groupName: "home" },
  { key: "home.projects_link", value: "projects", groupName: "home" },
  { key: "home.projects_href", value: "/projects", groupName: "home" },
  { key: "footer.random_notes_link", value: "random notes", groupName: "footer" },
  { key: "footer.say_hello_link", value: "say hello", groupName: "footer" },
  { key: "footer.separator", value: "·", groupName: "footer" },
  { key: "notfound.code", value: "404", groupName: "notfound" },
];
