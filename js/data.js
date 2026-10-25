/* All of Saleena's content in one place: edit here, every page reads from it.
   Projects, honours and skills come from the previous site (her own words). */
window.SITE = {
 "person": {
  "name": "Saleena Tiwari",
  "given": "Saleena",
  "surname": "Tiwari",
  "email": "saleenatiwari@gmail.com",
  "socials": [
   {
    "label": "LinkedIn",
    "href": "https://www.linkedin.com/in/saleenatiwari/"
   },
   {
    "label": "GitHub",
    "href": "https://github.com/saleenatiwari"
   },
   {
    "label": "X",
    "href": "https://x.com/SaleenaTiwari"
   },
   {
    "label": "Instagram",
    "href": "https://www.instagram.com/saleena_ti/"
   },
   {
    "label": "YouTube",
    "href": "https://www.youtube.com/@saleena_ti"
   }
  ]
 },
 "filters": [
  {
   "key": "all",
   "label": "All"
  },
  {
   "key": "featured",
   "label": "Featured"
  },
  {
   "key": "entrepreneurship",
   "label": "Entrepreneurship"
  },
  {
   "key": "ai",
   "label": "AI & Automation"
  },
  {
   "key": "data",
   "label": "Data & APIs"
  }
 ],
 "featured": [
  0,
  1,
  3,
  6
 ],
 "projects": [
  {
   "n": "01",
   "slug": "cohort",
   "title": "Cohort",
   "image": "../images/web/main-cohort2-1200.webp",
  "thumb": "../images/web/main-cohort2-640.webp",
   "visa": "../assets/illustrations/visa-01-cohort.svg",
   "filters": [
    "entrepreneurship",
    "ai"
   ],
   "tagline": "An AI assistant for student life with a social network built in.",
   "sections": [
    {
     "h": "Why I built it",
     "p": "I kept watching capable people around me miss things they actually cared about. A fellowship deadline. Office hours. A job posting. Not because they weren’t ambitious, but because nobody has time to manually track everything at once. I started building the assistant I needed for myself, and then I realized I was building it for everyone around me too."
    },
    {
     "h": "What it does",
     "p": "Cohort connects to a student’s email and quietly handles the rest. It tracks deadlines, surfaces opportunities, sends emails, books meetings, and matches students with the right people on campus, without being asked. On the other side, companies use Cohort Premium to reach students directly through their assistants instead of through ads."
    },
    {
     "h": "What I learned",
     "p": "Talking to 500 students taught me something I did not expect: I might not be the main persona I am building for. The more interviews I ran, the more I realized I was building for people with struggles that are different from mine, and that means I have to actually listen to what they say rather than build from my own experience. Most of our features came directly from those conversations."
    },
    {
     "h": "Traction",
     "stats": [
      {
       "n": "2,083+",
       "l": "on the waitlist"
      },
      {
       "n": "500",
       "l": "students interviewed"
      },
      {
       "n": "87%",
       "l": "would use it daily"
      }
     ]
    },
    {
     "h": "Status & my role",
     "p": "Pre-launch. I am the COO. I make decisions about product direction and marketing, run user interviews to collect feedback, and do outreach to businesses. Right now, most of my work is building and maintaining our investor database, logging outreach, and keeping the fundraising pipeline organized. I also handle go-to-market strategy alongside the technical builds."
    }
   ],
   "embed": null,
   "links": [
    {
     "label": "Student site",
     "href": "https://www.trycohort.xyz/"
    },
    {
     "label": "Business site",
     "href": "https://www.trycohort.xyz/business"
    },
    {
     "label": "Investor site",
     "href": "https://www.trycohort.xyz/raise"
    }
   ]
  },
  {
   "n": "02",
   "slug": "pantry",
   "title": "Pantry",
   "image": "../images/web/main-pantry-1200.webp",
  "thumb": "../images/web/main-pantry-640.webp",
   "visa": "../assets/illustrations/visa-02-pantry.svg",
   "filters": [
    "entrepreneurship"
   ],
   "tagline": "The fridge in your pocket. Track what you have, waste less, buy smarter.",
   "sections": [
    {
     "h": "Why I built it",
     "p": "I kept throwing away food I forgot I had and buying things I already owned. I wanted an app that did the remembering for me. When I talked to my friends and my parents about it, I realized this wasn’t just me being disorganized (what I initially thought). People end up wasting food because tracking what is in the fridge takes more effort than just buying it again."
    },
    {
     "h": "What it does",
     "p": "Pantry tracks the food you already have, reminds you before things expire, and suggests recipes based on what’s sitting in your kitchen. You stop buying duplicates and start using what you own. When something runs out, it moves straight to your shopping list."
    },
    {
     "h": "How I built it",
     "p": "Built solo as a mobile app using SwiftUI and the Open Food Facts database."
    },
    {
     "h": "What I learned",
     "p": "The hard part was making data entry feel effortless. ‘User friendly’ really just means less friction. If someone has to stop and think about how to use the app, the app is already losing. The goal is for it to feel obvious every single time."
    },
    {
     "h": "Traction",
     "p": "Shared with friends and family for informal testing. Enough of them kept coming back that I’m now prepping a public TestFlight release."
    },
    {
     "h": "Status & my role",
     "p": "Personal project, TestFlight release planned. I designed and built the whole thing myself, from scratch."
    }
   ],
   "embed": null,
   "links": [
    {
     "label": "GitHub",
     "href": "https://github.com/saleenatiwari/Pantry2"
    }
   ]
  },
  {
   "n": "03",
   "slug": "hypehub",
   "title": "HypeHub",
   "image": "../images/web/main-hypehub-1200.webp",
  "thumb": "../images/web/main-hypehub-640.webp",
   "visa": "../assets/illustrations/visa-03-hypehub.svg",
   "filters": [
    "ai",
    "data"
   ],
   "tagline": "An AI dance coach that teaches you the moves instead of letting you fake them.",
   "sections": [
    {
     "h": "Why I built it",
     "p": "Everyone is learning to look like a creator without actually learning anything. I wanted a tool that taught the real skill. The tools that could help people learn to move and create are the ones that are missing. Instead we have a flood of AI-generated content with nobody getting better from it."
    },
    {
     "h": "What it does",
     "p": "HypeHub tracks your body in real time using computer vision, compares your movement frame by frame against a reference dance video, and gives you a live accuracy score plus a slow-motion practice mode."
    },
    {
     "h": "How I built it",
     "p": "MediaPipe Pose Detection for real-time joint tracking, ElevenLabs for spoken feedback instead of a silent score, and Gemini to flag dangerous trending challenges and suggest safer alternatives. Runs as a single-page web app deployed on Vercel."
    },
    {
     "h": "What I learned",
     "p": "Real-time pose comparison was easier to build than it was to make feel encouraging rather than critical. The voice feedback ended up mattering just as much as the accuracy score itself."
    },
    {
     "h": "Traction",
     "p": "Hackathon build with a live Devpost entry and demo video."
    },
    {
     "h": "Status & my role",
     "p": "Hackathon build with Trevor Pribis, Srinika Kalavala, and Maria López. I handled the MediaPipe integration and spent a lot of time making the pose detection as accurate as possible, built out the voice-feedback integration, and was responsible for the entire frontend."
    }
   ],
   "embed": "HtDZna7zXd0",
   "links": [
    {
     "label": "Devpost",
     "href": "https://devpost.com/software/hypehub"
    }
   ]
  },
  {
   "n": "04",
   "slug": "x-automation",
   "title": "X Post Automation",
   "image": "../images/web/main-x-automation-1200.webp",
  "thumb": "../images/web/main-x-automation-640.webp",
   "visa": "../assets/illustrations/visa-04-x-automation.svg",
   "filters": [
    "ai"
   ],
   "tagline": "A free pipeline that turns my private journal into ready-to-post drafts, every weekday morning.",
   "sections": [
    {
     "h": "Why I built it",
     "p": "I journal daily but I never post. Writing for an audience feels like a completely different skill than writing for myself, and every tool that solves this problem costs money I didn’t want to spend as a student. I was tired of watching ‘build in public’ tools charge for something I knew I could build myself in a weekend."
    },
    {
     "h": "What it does",
     "p": "Every weekday at 10am, two drafts land in my Telegram. They are written in my own voice and are pulled from what I already journaled in Notion. I just review, and it is ready to post. No writing required."
    },
    {
     "h": "How I built it",
     "p": "A GitHub Action powered by the Gemini API, pulling from my Notion journal and delivering drafts through Telegram. Fully automated, no paid tools."
    },
    {
     "h": "What I learned",
     "p": "Training the model on how I actually talk mattered more than any prompt-engineering technique. The drafts only became usable once I stopped trying to make them sound generically good. Honestly, I am still not posting as consistently as I wanted to. But maybe I was also partly just looking for an excuse to build the automation ;)"
    },
    {
     "h": "Status & my role",
     "p": "Personal project, live and running daily. Built entirely on my own time, solo."
    }
   ],
   "embed": null,
   "links": [
    {
     "label": "GitHub",
     "href": "https://github.com/saleenatiwari/x-post-automation"
    }
   ]
  },
  {
   "n": "05",
   "slug": "linkedin-scraper",
   "title": "LinkedIn Scraper",
   "image": "../images/web/main-linkedin-scraper-1200.webp",
  "thumb": "../images/web/main-linkedin-scraper-640.webp",
   "visa": "../assets/illustrations/visa-05-linkedin-scraper.svg",
   "filters": [
    "ai",
    "data"
   ],
   "tagline": "Update your database of clients or employees with a one-click sync, using data from their LinkedIn.",
   "sections": [
    {
     "h": "Why I built it",
     "p": "During my internship at Ember Fellowship, I realized that keeping 1,600+ alumni work histories current in the CRM meant someone manually checking LinkedIn profiles one by one. That was a real chunk of time every week, and nobody should have to do that. I wanted the database to stay current without anyone having to think about it."
    },
    {
     "h": "What it does",
     "p": "A checkbox trigger kicks off an automation that pulls fresh LinkedIn data for each alum, compares it against what’s already in Airtable, and creates or updates records automatically. No manual lookups required."
    },
    {
     "h": "How I built it",
     "p": "Built in JavaScript using the Apify LinkedIn Profile Scraper to fetch data asynchronously. I polled the results back into Airtable and worked around edge cases including HTML-entity encoding and Airtable’s lack of native async support."
    },
    {
     "h": "What I learned",
     "p": "Airtable doesn’t support setTimeout, which sounds minor until an entire async workflow depends on waiting for an external API. I ended up writing my own busy-wait function to work around it."
    },
    {
     "h": "Traction",
     "p": "Reduced a roughly 15-minute manual task to a single click, running at the scale of 1,600 alumni records."
    },
    {
     "h": "Status & my role",
     "p": "Internal tool, in production at Ember Fellowship. Solo build."
    }
   ],
   "embed": "y41idGEouNs",
   "links": []
  },
  {
   "n": "06",
   "slug": "yap",
   "title": "YAP",
   "image": "../images/web/main-yap-1200.webp",
  "thumb": "../images/web/main-yap-640.webp",
   "visa": "../assets/illustrations/visa-06-yap.svg",
   "filters": [
    "entrepreneurship",
    "ai"
   ],
   "tagline": "Talk into your phone, get organized notes out. Built for visual learners, no writing required.",
   "sections": [
    {
     "h": "Why I built it",
     "p": "I think out loud, not on paper. Ideas I have in the shower or at 2am disappear because writing them down feels like too much friction in the moment. The first version of an idea is the whole foundation for the second one, and I needed a way to make sure that first version always existed, even on the nights I didn’t feel like writing anything down."
    },
    {
     "h": "What it does",
     "p": "You talk, Yap listens, transcribes it live, and uses AI to sort what you said into the right bucket: tasks, projects, journal entries, life goals, or drafts. One recording can turn into several organized notes without you having to sort anything yourself."
    },
    {
     "h": "How I built it",
     "p": "Building natively in Swift and SwiftUI, using Apple’s Speech framework for real-time transcription and the Gemini API to categorize and structure the output. Stored locally with Core Data."
    },
    {
     "h": "What I learned",
     "p": "Easy access to writing down your racing thoughts is the real challenge, which is why I am exploring a widget or home-screen shortcut to reach Yap even quicker."
    },
    {
     "h": "Traction",
     "p": "Still in development."
    },
    {
     "h": "Status & my role",
     "p": "Solo project, actively in development. Recording, live transcription, and the AI integration are working; categorization logic, navigation, and the full design system are still being built."
    }
   ],
   "embed": null,
   "links": []
  },
  {
   "n": "07",
   "slug": "greentop",
   "title": "GreenTop",
   "image": "../images/web/main-greentop-1200.webp",
  "thumb": "../images/web/main-greentop-640.webp",
   "visa": "../assets/illustrations/visa-07-greentop.svg",
   "filters": [
    "ai",
    "data"
   ],
   "tagline": "Turning Atlanta’s cool-roof mandate into an actual action plan for building owners.",
   "sections": [
    {
     "h": "Why I built it",
     "p": "Atlanta made cool roofs mandatory but didn’t make them simple. Building owners suddenly had a legal requirement with no clear path forward. I wanted someone to be able to go from ‘now what?’ to an actual plan in one sitting."
    },
    {
     "h": "What it does",
     "p": "A user enters their address and roof details, and GreenTop ranks upgrade options, like cool-roof coating, solar, green roofs and rainwater harvesting, by cost, savings, payback period, and climate impact. The output is a specific plan for that building, not a generic sustainability recommendation."
    },
    {
     "h": "How I built it",
     "p": "Google Solar API for rooftop data, Gemini to turn that data and user inputs into a ranked recommendation, built on Next.js, Python, and Tailwind. As a team we signed up for free tiers of several APIs to access the data we needed within hackathon constraints."
    },
    {
     "h": "What I learned",
     "p": "The hard part was making sure two different buildings didn’t get the same generic answer. For this I also learned how much data you actually need to make this kind of recommendation useful: roof specs, weather patterns, local utility rates. Working with limited data and free-tier access pushed us to be creative about what we could realistically model."
    },
    {
     "h": "Traction",
     "p": "Built for a hackathon, with a live demo deployed on Vercel and a public GitHub repo."
    },
    {
     "h": "Status & my role",
     "p": "Hackathon build. I built the recommendation engine, the dashboard, the API integration, and the entire frontend myself."
    }
   ],
   "embed": "iKL0rhhmQdo",
   "links": [
    {
     "label": "Devpost",
     "href": "https://devpost.com/software/canopy-z8o3tw"
    }
   ]
  }
 ],
 "honours": [
  {
   "title": "Waves of Action Fellow",
   "text": "By the Okeanos Foundation for the Sea, spent 10 days at sea aboard on a traditional Polynesian catamaran in France as a part of a European ocean-advocacy and environmental-education program.",
   "photo": "../images/web/waves-of-action-640.webp",
   "stamp": "../assets/illustrations/stamp-01-waves-of-action.svg"
  },
  {
   "title": "State Finalist: Jugend Debattiert",
   "text": "Reached the state competition of Jugend Debattiert, Germany’s national youth debate tournament, held under the patronage of the Federal President. One of ~200,000 students competing each year.",
   "photo": "../images/web/jugend-debattiert-640.webp",
   "stamp": "../assets/illustrations/stamp-02-jugend-debattiert.svg"
  },
  {
   "title": "Faculty Honors for 4.0 GPA",
   "text": "Awarded to Georgia Tech undergraduates who earn a 4.0 GPA in a semester.",
   "photo": "../images/web/faculty-honors-640.webp",
   "stamp": "../assets/illustrations/stamp-03-faculty-honors.svg"
  },
  {
   "title": "Rise Global Fellow",
   "text": "One of 100 people selected worldwide by Schmidt Futures and the Rhodes Trust. A global, competitive, lifelong selection with need-based scholarships, mentorship, and career support.",
   "photo": "../images/web/rise-fellow-640.webp",
   "stamp": "../assets/illustrations/stamp-04-rise-fellow.svg"
  },
  {
   "title": "Rise Summit, Oxford University",
   "text": "The Rise Residential Summit brought all 100 Global Fellows of a cohort together for an in-person program at the University of Oxford.",
   "photo": "../images/web/rise-summit-640.webp",
   "stamp": "../assets/illustrations/stamp-05-rise-summit.svg"
  },
  {
   "title": "Georgia Tech CS Honors Student",
   "text": "Studying Computer Science (Honors) at Georgia Tech which is ranked #3 in the US and #1 among public universities for undergraduate engineering.",
   "photo": "../images/web/georgia-tech-640.webp",
   "stamp": "../assets/illustrations/stamp-06-georgia-tech.svg"
  },
  {
   "title": "START Scholar",
   "text": "The START Scholarship is awarded to high-school students in Germany for exceptional academic achievement and social commitment as one of Germany’s most recognized youth scholarships.",
   "photo": "../images/web/start-scholar-640.webp",
   "stamp": "../assets/illustrations/stamp-07-start-scholar.svg"
  },
  {
   "title": "State Representative",
   "text": "Represented my state, Schleswig-Holstein, in national debates and events for the START-Stiftung.",
   "photo": "../images/web/start-state-representative-640.webp",
   "stamp": "../assets/illustrations/stamp-08-state-representative.svg"
  }
 ],
 "skills": [
  {
   "name": "Figma",
   "rating": 3,
   "icon": "../assets/skills/figma.svg"
  },
  {
   "name": "Airtable",
   "rating": 5,
   "icon": "../assets/skills/airtable.webp"
  },
  {
   "name": "Notion",
   "rating": 5,
   "icon": "../assets/skills/notion.png"
  },
  {
   "name": "Python",
   "rating": 4,
   "icon": "../assets/skills/python.webp"
  },
  {
   "name": "JavaScript",
   "rating": 4,
   "icon": "../assets/skills/javascript.png"
  },
  {
   "name": "HTML",
   "rating": 3,
   "icon": "../assets/skills/html.jpg"
  },
  {
   "name": "CSS",
   "rating": 3,
   "icon": "../assets/skills/css.webp"
  },
  {
   "name": "Java",
   "rating": 3,
   "icon": "../assets/skills/java.webp"
  },
  {
   "name": "CapCut",
   "rating": 5,
   "icon": "../assets/skills/capcut.png"
  },
  {
   "name": "Opus Clip",
   "rating": 5,
   "icon": "../assets/skills/opusclip.jpg"
  },
  {
   "name": "Blender",
   "rating": 4,
   "icon": "../assets/skills/blender.png"
  },
  {
   "name": "GitHub",
   "rating": 4,
   "icon": "../assets/skills/github.svg"
  },
  {
   "name": "Microsoft 365",
   "rating": 5,
   "icon": "../assets/skills/microsoft365.jpg"
  },
  {
   "name": "SwiftUI",
   "rating": 4,
   "icon": "../assets/skills/swiftui.png"
  },
  {
   "name": "Xcode",
   "rating": 4,
   "icon": "../assets/skills/xcode.png"
  },
  {
   "name": "Apify",
   "rating": 5,
   "icon": "../assets/skills/apify.svg"
  },
  {
   "name": "ElevenLabs",
   "rating": 3.5,
   "icon": "../assets/skills/elevenlabs.jpg"
  },
  {
   "name": "MediaPipe",
   "rating": 4.5,
   "icon": "../assets/skills/mediapipe.png"
  },
  {
   "name": "Whisper Flow",
   "rating": 4,
   "icon": "../assets/skills/whisperflow.png"
  }
 ],
 "web3formsKey": "ad76d500-b413-486f-bb8d-4af57770c934"
};
