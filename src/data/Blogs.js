// // Export array of blog objects for easy MongoDB seeding
// // Each object contains all the fields needed for the blog schema

// const demoBlogs = [
//   {
//     mainHeading: "Cephalometrics Made Easy: A Student-Friendly Guide for NEET MDS Orthodontics",
//     subHeading: "Master the fundamentals of cephalometrics with tips, diagrams, and exam strategies.",
//     slug: "cephalometrics-made-easy-neet-mds-orthodontics",
//     heroImage: "/article1.jpg",
//     content: `
// Introduction:
// Cephalometrics is one of the most important topics in orthodontics. Understanding it can make a huge difference in your NEET MDS exam scores. This guide breaks down the basics, offers tips for diagrams, and shows you how to remember key points efficiently.

// Why Cephalometrics Matters:
// - Used to analyze craniofacial growth and development.
// - Helps in treatment planning and diagnosis.
// - Frequently appears in NEET MDS multiple-choice questions.

// Essential Cephalometric Points & Planes:
// Focus on these key landmarks: Sella (S), Nasion (N), Point A & Point B, Mandibular Plane (Go-Me), Occlusal Plane.

// Tips for NEET MDS Students:
// 1. Create flashcards with diagrams of all cephalometric points.
// 2. Practice drawing lateral cephalograms weekly.
// 3. Revise commonly tested angles (SNA, SNB, ANB).
// 4. Discuss tricky cases with peers or mentors.

// Quick Summary:
// - Understand the key landmarks: S, N, A, B, Go-Me.
// - Memorize the important angles: SNA, SNB, ANB.
// - Practice diagrams for faster recall in exams.
// - Use the Pomodoro method for focused revision sessions.

// References & Resources:
// - Graber's Orthodontics, 6th Edition
// - Proffit's Contemporary Orthodontics
// - YouTube Cephalometric Lecture: https://www.youtube.com/watch?v=dQw4w9WgXcQ
//     `,
//     tags: ["cephalometrics", "orthodontics", "NEET-MDS", "exam preparation"],
//     category: "Orthodontics Basics",
//     status: "published",
//     scheduledAt: new Date(),
//     readingTime: 8,
//     metaTitle: "Cephalometrics Guide for NEET MDS Students | OrthoChronicles",
//     metaDescription: "Learn cephalometrics easily with tips, diagrams, and exam strategies for NEET MDS aspirants.",
//     keywords: ["cephalometrics", "NEET MDS orthodontics", "orthodontics tips", "exam preparation"],
//     views: 0,
//     likes: 0,
//     saved: false,
//     shares: { facebook: 0, twitter: 0, whatsapp: 0 },
//     comments: [],
//     citations: [
//       { text: "Graber's Orthodontics, 6th Edition", link: "" },
//       { text: "Proffit's Contemporary Orthodontics", link: "" }
//     ],
//     sources: [
//       { label: "YouTube Lecture", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
//     ],
//     gallery: ["https://res.cloudinary.com/demo/image/upload/v1234567890/cephalometric-points.jpg"],
//     videoEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     attachments: [],
//     difficultyLevel: "beginner",
//     summaryPoints: [
//       "Focus on key cephalometric points: S, N, A, B, Go-Me",
//       "Memorize important angles: SNA, SNB, ANB",
//       "Practice diagrams for faster recall",
//       "Use flashcards and Pomodoro study method"
//     ],
//     quizQuestions: [
//       {
//         question: "Which cephalometric point represents the sella?",
//         options: ["S", "N", "A", "B"],
//         correctAnswer: 0
//       },
//       {
//         question: "ANB angle is used to assess?",
//         options: ["Skeletal Class", "Dental Caries", "Soft Tissue Profile", "Gingival Health"],
//         correctAnswer: 0
//       }
//     ],
//     author: "Dr. Shravani",
//     coAuthors: []
//   },
//   {
//     mainHeading: "Anchorage in Orthodontics: Principles and Practical Tips",
//     subHeading: "Understand anchorage concepts, clinical strategies, and modern devices to control tooth movement effectively.",
//     slug: "anchorage-in-orthodontics-principles-practical-tips",
//     heroImage: "/article2.jpg",
//     content: `
// Anchorage is the resistance to unwanted tooth movement and is fundamental to predictable orthodontic outcomes. This article covers the biological and mechanical aspects of anchorage, classification (stationary vs reciprocal), and modern approaches including mini-implants and temporary anchorage devices (TADs).

// Key Concepts:
// - Absolute vs Relative anchorage
// - Use of transpalatal arches, Nance buttons, and headgear for extraoral anchorage
// - Temporary anchorage devices (TADs): indications and clinical tips

// Clinical Tips:
// 1. Evaluate anchorage demand before treatment planning.
// 2. Choose the least invasive method that achieves the objective.
// 3. Monitor TAD sites for inflammation and provide patient instructions for hygiene.

// Summary:
// - Anchorage management reduces treatment time and improves outcomes.
// - TADs have expanded options for non-compliant anchorage control.
//     `,
//     tags: ["anchorage", "TADs", "clinical orthodontics"],
//     category: "Clinical Techniques",
//     status: "published",
//     scheduledAt: new Date(),
//     readingTime: 6,
//     metaTitle: "Anchorage in Orthodontics: Practical Guide | OrthoChronicles",
//     metaDescription: "Learn anchorage principles, devices, and tips including the use of TADs for predictable tooth movement.",
//     keywords: ["anchorage", "TADs", "orthodontics clinical"],
//     views: 0,
//     likes: 0,
//     saved: false,
//     shares: { facebook: 0, twitter: 0, whatsapp: 0 },
//     comments: [],
//     citations: [
//       { text: "Contemporary Orthodontics - Proffit", link: "" }
//     ],
//     sources: [],
//     gallery: [],
//     videoEmbed: "",
//     attachments: [],
//     difficultyLevel: "intermediate",
//     summaryPoints: [
//       "Anchorage is resistance against unwanted tooth movement",
//       "TADs provide excellent absolute anchorage when indicated",
//       "Plan anchorage needs before starting mechanics"
//     ],
//     quizQuestions: [
//       {
//         question: "What does TAD stand for?",
//         options: ["Temporary Anchorage Device", "Tooth Anchorage Device", "Trans Alveolar Device", "Tension Anchorage Device"],
//         correctAnswer: 0
//       }
//     ],
//     author: "Dr. Shravani",
//     coAuthors: []
//   },
//   {
//     mainHeading: "Interceptive Orthodontics: Early Treatments That Make a Difference",
//     subHeading: "When and how to intervene early to guide growth and simplify later orthodontic care.",
//     slug: "interceptive-orthodontics-early-treatments",
//     heroImage: "/article3.jpg",
//     content: `
// Interceptive orthodontics focuses on identifying and treating problems early in the mixed dentition to improve outcomes and sometimes avoid more complex treatment later. This article reviews common interceptive approaches such as space maintenance, habit breakers, expansion, and growth modification.

// When to Consider Interception:
// - Presence of severe crowding in mixed dentition
// - Dental crossbites or scissor bites
// - Harmful oral habits (thumb-sucking, tongue thrust)
// - Early loss of primary teeth requiring space maintenance

// Approaches:
// 1. Space maintainers and regainers
// 2. Removable/functional appliances for growth modification
// 3. Palatal expansion for transverse deficiencies

// Clinical Pearls:
// - Early diagnosis with routine dental check-ups is key.
// - Coordinate with pediatric dentists for habit management.
//     `,
//     tags: ["interceptive", "mixed dentition", "pediatric orthodontics"],
//     category: "Growth & Development",
//     status: "published",
//     scheduledAt: new Date(),
//     readingTime: 7,
//     metaTitle: "Interceptive Orthodontics: Early Treatments | OrthoChronicles",
//     metaDescription: "Discover early orthodontic interventions that guide growth, manage habits, and simplify future treatment.",
//     keywords: ["interceptive orthodontics", "pediatric orthodontics", "early treatment"],
//     views: 0,
//     likes: 0,
//     saved: false,
//     shares: { facebook: 0, twitter: 0, whatsapp: 0 },
//     comments: [],
//     citations: [],
//     sources: [],
//     gallery: [],
//     videoEmbed: "",
//     attachments: [],
//     difficultyLevel: "beginner",
//     summaryPoints: [
//       "Early intervention can simplify later orthodontic care",
//       "Space maintenance and habit management are common interceptive strategies",
//       "Timely referrals help improve long-term outcomes"
//     ],
//     quizQuestions: [
//       {
//         question: "Which appliance is commonly used for rapid palatal expansion?",
//         options: ["Hyrax expander", "Nance appliance", "Fixed lingual arch", "Headgear"],
//         correctAnswer: 0
//       }
//     ],
//     author: "Dr. Shravani",
//     coAuthors: []
//   },
//   {
//     mainHeading: "Biomechanics in Orthodontics: Forces, Moments, and Tooth Movement",
//     subHeading: "Understanding the physics behind orthodontic tooth movement for better treatment outcomes.",
//     slug: "biomechanics-orthodontics-forces-moments-tooth-movement",
//     heroImage: "/article4.jpg",
//     content: `
// Biomechanics is the foundation of predictable orthodontic treatment. This comprehensive guide covers force systems, center of resistance, moment-to-force ratios, and how different appliances create specific tooth movements.

// Key Concepts:
// - Force vs Moment: Understanding the difference and clinical applications
// - Center of resistance and center of rotation
// - Optimal force levels for different types of tooth movement
// - Wire properties and their effect on force delivery

// Types of Tooth Movement:
// 1. Tipping (uncontrolled vs controlled)
// 2. Translation (bodily movement)
// 3. Root torquing
// 4. Rotation
// 5. Intrusion and extrusion

// Clinical Applications:
// - Loop design for space closure
// - Torque expression with different wire sizes
// - Three-dimensional control with modern bracket systems

// Practice Questions:
// Understanding biomechanics helps in wire selection, bracket positioning, and predicting side effects of treatment mechanics.
//     `,
//     tags: ["biomechanics", "tooth movement", "orthodontic forces"],
//     category: "Basic Sciences",
//     status: "published",
//     scheduledAt: new Date(),
//     readingTime: 10,
//     metaTitle: "Orthodontic Biomechanics: Forces and Tooth Movement | OrthoChronicles",
//     metaDescription: "Master orthodontic biomechanics with detailed explanations of forces, moments, and tooth movement types.",
//     keywords: ["orthodontic biomechanics", "tooth movement", "orthodontic forces", "moments"],
//     views: 0,
//     likes: 0,
//     saved: false,
//     shares: { facebook: 0, twitter: 0, whatsapp: 0 },
//     comments: [],
//     citations: [
//       { text: "Nanda R. Biomechanics and Esthetic Strategies in Clinical Orthodontics", link: "" }
//     ],
//     sources: [],
//     gallery: ["https://res.cloudinary.com/demo/image/upload/v1234567890/force-systems.jpg"],
//     videoEmbed: "",
//     attachments: [],
//     difficultyLevel: "advanced",
//     summaryPoints: [
//       "Force and moment work together to create different types of tooth movement",
//       "Center of resistance varies by root configuration and bone support",
//       "Optimal force levels prevent root resorption and ensure efficient movement",
//       "Wire properties significantly affect force delivery systems"
//     ],
//     quizQuestions: [
//       {
//         question: "What is the optimal force for canine retraction?",
//         options: ["50-75g", "100-150g", "200-250g", "300-400g"],
//         correctAnswer: 1
//       },
//       {
//         question: "Center of resistance for a single-rooted tooth is located at:",
//         options: ["Cervical third", "Middle third", "Apical third", "Root apex"],
//         correctAnswer: 2
//       }
//     ],
//     author: "Dr. Shravani",
//     coAuthors: []
//   },
//   {
//     mainHeading: "Class II Malocclusion Treatment: From Functional Appliances to Fixed Mechanics",
//     subHeading: "Comprehensive approach to Class II correction in growing and non-growing patients.",
//     slug: "class-ii-malocclusion-treatment-comprehensive-guide",
//     heroImage: "/article1.jpg",
//     content: `
// Class II malocclusion affects approximately 15-20% of the population and presents unique treatment challenges. This article covers etiology, diagnosis, and treatment options from functional appliances to surgical correction.

// Classification and Diagnosis:
// - Class II Division 1 vs Division 2
// - Skeletal vs dental components
// - Growth pattern assessment
// - Cephalometric analysis specific to Class II

// Treatment Options by Age:
// Growing Patients:
// - Functional appliances (Twin block, Herbst, etc.)
// - Headgear therapy
// - Class II elastics with fixed appliances

// Non-Growing Patients:
// - Camouflage vs surgical treatment
// - Extraction patterns for Class II correction
// - TAD-assisted distalization

// Treatment Planning Considerations:
// - Facial profile analysis
// - Airway assessment
// - Patient compliance factors
// - Long-term stability

// Case Selection Criteria:
// Proper case selection is crucial for predictable outcomes. Factors include skeletal maturity, severity of discrepancy, and patient expectations.
//     `,
//     tags: ["class II", "malocclusion", "functional appliances", "treatment planning"],
//     category: "Treatment Planning",
//     status: "published",
//     scheduledAt: new Date(),
//     readingTime: 12,
//     metaTitle: "Class II Malocclusion Treatment Guide | OrthoChronicles",
//     metaDescription: "Complete guide to Class II treatment options including functional appliances, extractions, and surgical approaches.",
//     keywords: ["class II malocclusion", "functional appliances", "orthodontic treatment planning"],
//     views: 0,
//     likes: 0,
//     saved: false,
//     shares: { facebook: 0, twitter: 0, whatsapp: 0 },
//     comments: [],
//     citations: [
//       { text: "McNamara JA. Components of Class II malocclusion", link: "" },
//       { text: "Pancherz H. The Herbst appliance research review", link: "" }
//     ],
//     sources: [],
//     gallery: [
//       "https://res.cloudinary.com/demo/image/upload/v1234567890/twin-block.jpg",
//       "https://res.cloudinary.com/demo/image/upload/v1234567890/herbst-appliance.jpg"
//     ],
//     videoEmbed: "",
//     attachments: [],
//     difficultyLevel: "intermediate",
//     summaryPoints: [
//       "Early treatment with functional appliances can reduce treatment complexity",
//       "Proper case selection is crucial for functional appliance success",
//       "Adult Class II treatment often requires extraction or surgical approach",
//       "Long-term retention is essential for stability"
//     ],
//     quizQuestions: [
//       {
//         question: "Twin block appliances work primarily by:",
//         options: ["Restricting maxillary growth", "Stimulating mandibular growth", "Moving teeth", "All of the above"],
//         correctAnswer: 1
//       },
//       {
//         question: "Class II Division 2 is characterized by:",
//         options: ["Proclined upper incisors", "Retroclined upper incisors", "Open bite", "Crossbite"],
//         correctAnswer: 1
//       }
//     ],
//     author: "Dr. Shravani",
//     coAuthors: ["Dr. Sarah Johnson"]
//   }
// ];

// // Export the array for easy database seeding
// // Utility: convert plain text (with newlines) into simple HTML paragraphs
// function _textToHtml(text) {
//   if (!text) return "";
//   const paragraphs = String(text)
//     .trim()
//     .split(/\n\s*\n/)
//     .map((p) => p.trim())
//     .filter(Boolean);
//   return paragraphs.map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`).join("");
// }

// // Find article by id (slug) and map to the shape expected by ArticleTemplate
// export function getArticleById(id) {
//   if (!id) return null;
//   const slug = String(id);
//   const b = demoBlogs.find((x) => x.slug === slug || x.slug === decodeURIComponent(slug));
//   if (!b) return null;

//   return {
//     id: b.slug,
//     title: b.mainHeading || "",
//     subtitle: b.subHeading || "",
//     category: b.category || "",
//     difficulty: b.difficultyLevel || "",
//     views: b.views || 0,
//     readTime: b.readingTime || 0,
//     publishDate: b.scheduledAt ? new Date(b.scheduledAt).toLocaleDateString() : new Date().toLocaleDateString(),
//     author: b.author || "",
//     authorImage: (b.gallery && b.gallery[0]) || b.heroImage || "/user.jpeg",
//     authorBio: (b.coAuthors && b.coAuthors.join(", ")) || "",
//     heroImage: b.heroImage || (b.gallery && b.gallery[0]) || "/article1.jpg",
//     contentPreviewHtml: _textToHtml((b.content || "").split(/\n\s*\n/).slice(0, 1).join("\n\n")),
//     fullContentHtml: _textToHtml(b.content || ""),
//     tags: b.tags || [],
//     comments: b.comments || [],
//     likes: b.likes || 0,
//   };
// }

// // Return a small list of related articles (simple implementation)
// export function getRelatedArticles(limit = 3) {
//   return demoBlogs.slice(0, limit).map((b) => ({
//     id: b.slug,
//     heroImage: b.heroImage || (b.gallery && b.gallery[0]) || "/article1.jpg",
//     title: b.mainHeading || "",
//     category: b.category || "Article",
//   }));
// }

// export default demoBlogs;