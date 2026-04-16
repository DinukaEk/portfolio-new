export const personalInfo = {
  name: 'Dinuka Ekanayake',
  firstName: 'Dinuka',
  lastName: 'Ekanayake',
  role: 'Software Engineer',
  tagline: {
    bold: 'Full-Stack Software Engineer building scalable, real-world systems and immersive web experiences.',
    rest: 'Experienced in developing production-grade ERP applications and modern web platforms, with a growing focus on DevOps practices, cloud infrastructure, and system reliability.'
  },
  location: 'Sri Lanka',
  email: 'dinukaekanayake2218@gmail.com',
  phone: '+94717026986',
  github: 'https://github.com/DinukaEk',
  linkedin: 'https://linkedin.com/in/dinukaekanayake',
  status: 'Open to new opportunities',
};

export const skills = [
  { category: 'Programming',    items: ['Python', 'TypeScript', 'JavaScript', 'PHP', 'Java', 'C/C++'] },
  { category: 'Frontend',       items: ['React', 'Next.js', 'Three.js', 'HTML5', 'CSS', 'Tailwind CSS'] },
  { category: 'Backend & APIs', items: ['Node.js', 'Laravel', 'Flask', 'FastAPI', 'REST API'] },
  { category: 'AI / ML',        items: ['TensorFlow/Keras', 'U\u00b2-Net', 'MediaPipe Pose', 'OpenCV', 'Hugging Face'] },
  { category: 'Databases',      items: ['MySQL', 'MongoDB', 'Firebase'] },
  { category: 'Cloud & DevOps', items: ['AWS', 'Azure', 'Docker', 'Git', 'Vercel', 'CI/CD'] },
];

export type ArchStep = { step: string; title: string; detail: string };

export type Project = {
  id: string;
  slug: string;
  featured: boolean;
  title: string;
  description: string;
  tags: string[];
  category: string;
  year: string;
  github: string;
  demo: string;
  problem: string;
  solution: string;
  architecture: ArchStep[];
  outcome: string;
};

export const projects: Project[] = [
  {
    id: '01',
    slug: 'ar-ai-virtual-tryon',
    featured: true,
    title: 'Hybrid AR + AI Virtual Try-On System',
    description: 'Dual-workflow virtual try-on platform — real-time AR garment preview or high-fidelity AI results from photos. Full pipeline: CNN garment classification, U\u00b2-Net background removal, MediaPipe Pose AR overlay, and a CatVTON diffusion engine deployed on Hugging Face.',
    tags: ['Next.js', 'FastAPI', 'Python', 'TensorFlow', 'U\u00b2-Net', 'MediaPipe', 'Cloudinary', 'Hugging Face'],
    category: 'AI / AR / ML / Web / Mobile',
    year: '2025',
    github: 'https://github.com/DinukaEk/ar-fashion-tryon',
    demo: '',
    problem: 'Fashion e-commerce suffers from high return rates because customers cannot accurately visualise how garments will look on their body. Existing try-on solutions required expensive hardware or produced unconvincing results.',
    solution: 'Built a dual-workflow platform: a real-time AR mode using the device camera for instant previews, and a high-fidelity AI mode that generates photorealistic try-on results from a single uploaded photo — giving users both speed and accuracy.',
    architecture: [
      { step: '01', title: 'Garment Classification', detail: 'CNN model classifies uploaded garment type (tops, bottoms, dresses) to route it through the correct processing pipeline.' },
      { step: '02', title: 'Background Removal',     detail: 'U\u00b2-Net performs precise salient object detection, cleanly isolating the garment with sharp, clean edges.' },
      { step: '03', title: 'AR Overlay — live mode', detail: 'MediaPipe Pose estimates 33 body landmarks in real-time; the garment mesh is warped and composited onto the live camera feed at 30fps.' },
      { step: '04', title: 'AI Try-On — photo mode', detail: 'CatVTON diffusion model generates a photorealistic try-on from a person photo + garment image, deployed on Hugging Face Spaces via Gradio.' },
      { step: '05', title: 'Storage & Delivery',     detail: 'Cloudinary handles image upload, transformation, and CDN delivery. FastAPI orchestrates the entire backend pipeline.' },
    ],
    outcome: 'End-to-end pipeline from upload to result in under 4 seconds for AI mode; real-time AR mode runs at 30fps on mid-range mobile devices.',
  },
  {
    id: '02',
    slug: '3d-art-gallery',
    featured: false,
    title: 'Interactive 3D Virtual Art Gallery',
    description: 'Fully interactive 3D gallery where users walk through a space, view paintings in a realistic environment, and explore digitally placed sculptures. Features custom room layouts, dynamic artwork placement, real-time navigation, and 3D statue models.',
    tags: ['Three.js', 'WebGL', 'JavaScript', 'HTML/CSS'],
    category: '3D / Web',
    year: '2025',
    github: 'https://github.com/DinukaEk/virtual-art-gallery',
    demo: 'https://dinukaek.github.io/virtual-art-gallery/',
    problem: 'Physical art galleries are inaccessible to most people globally. Digital image galleries lack the spatial, immersive quality that makes viewing art meaningful.',
    solution: 'Built a fully navigable 3D gallery in the browser using Three.js and WebGL — no plugins required. Users explore first-person, view artwork at scale, and inspect sculptures from any angle.',
    architecture: [
      { step: '01', title: 'Scene & Lighting',    detail: 'Three.js PerspectiveCamera and WebGLRenderer with shadow mapping. Custom ambient and spot lights create museum-quality artwork illumination.' },
      { step: '02', title: 'Navigation System',   detail: 'PointerLockControls for first-person WASD + mouse-look, with AABB collision detection keeping the user inside the gallery bounds.' },
      { step: '03', title: 'Artwork Placement',   detail: 'Dynamic system mapping painting textures onto PlaneGeometry meshes with custom frame geometry and per-piece accent lighting.' },
      { step: '04', title: '3D Sculptures',       detail: 'GLTF/OBJ models loaded via Three.js loaders with real-time point lights for dramatic sculpture illumination.' },
    ],
    outcome: 'Browser-based 3D gallery at smooth 60fps — showcasing deep Three.js and WebGL expertise with zero install friction.',
  },
  {
    id: '03',
    slug: 'moodify',
    featured: false,
    title: 'Moodify \u2014 Emotion-Based Music App',
    description: "Web app that detects the user's emotional state via real-time emotion analysis and recommends personalized Spotify playlists. Integrates a TensorFlow ML model with a Flask backend and a responsive frontend.",
    tags: ['Python', 'Flask', 'TensorFlow', 'JavaScript', 'Spotify API'],
    category: 'ML / Web',
    year: '2025',
    github: 'https://github.com/DinukaEk/Moodify',
    demo: 'https://moodify-1vvn.onrender.com/',
    problem: "Music discovery apps recommend based on listening history alone, ignoring the user's current emotional state — the most relevant signal for what music you actually want right now.",
    solution: 'Real-time emotion detection pipeline analyses facial expressions via webcam, classifies the emotion with TensorFlow, then queries the Spotify API to surface playlists matched to that emotional state.',
    architecture: [
      { step: '01', title: 'Emotion Detection',   detail: 'TensorFlow/Keras CNN trained on FER-2013 classifies 7 emotions from webcam frames in real-time, with OpenCV for frame preprocessing.' },
      { step: '02', title: 'Flask API',            detail: 'Flask backend receives base64-encoded frames, runs model inference, and maps detected emotion to Spotify audio feature targets.' },
      { step: '03', title: 'Spotify Integration', detail: 'Spotify recommendations endpoint called with valence, energy, and tempo parameters tuned per emotion category.' },
      { step: '04', title: 'Frontend',             detail: 'Responsive JS frontend streams webcam feed, displays detected emotion live, and renders playlists with an embedded Spotify player.' },
    ],
    outcome: 'Sub-200ms inference latency. Demonstrated fusion of computer vision, ML inference, and third-party API integration in a polished web experience.',
  },
  {
    id: '04',
    slug: 'multi-tenant-crm',
    featured: false,
    title: 'Multi Tenant CRM',
    description: 'A scalable customer relationship management system designed for multi-tenant architectures, enabling businesses to manage customer interactions across multiple organizations.',
    tags: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    category: 'Web',
    year: '2026',
    github: 'https://github.com/DinukaEk/multi-tenant-crm',
    demo: '',
    problem: 'Traditional CRM systems are often monolithic and lack the flexibility to serve multiple tenants effectively, leading to data isolation and increased operational complexity.',
    solution: 'A microservices-based CRM architecture that supports multi-tenancy through isolated data stores and shared services, ensuring data security and compliance across different organizations.',
    architecture: [
      { step: '01', title: 'Tenant Isolation',    detail: 'Each tenant has its own database schema and application instance, ensuring data privacy and compliance.' },
      { step: '02', title: 'Shared Services',       detail: 'Common functionalities like authentication, billing, and reporting are implemented as reusable microservices.' },
      { step: '03', title: 'API Gateway',           detail: 'A central API gateway manages requests, handles authentication, and routes traffic to the appropriate services.' },
      { step: '04', title: 'Containerization',      detail: 'Docker containers are used to deploy and manage the microservices, ensuring consistency and scalability.' },
    ],
    outcome: 'Successfully deployed a scalable multi-tenant CRM system that supports up to 1000 concurrent tenants with robust data isolation and performance optimization.',
  },
  {
    id: '05',
    slug: 'todo-list',
    featured: false,
    title: 'ToDo List Application',
    description: 'A simple yet effective task management web app with a responsive React frontend and a Node.js backend for persistent task tracking.',
    tags: ['JavaScript', 'React', 'Node.js'],
    category: 'Web',
    year: '2025',
    github: 'https://github.com/DinukaEk/ToDo-List',
    demo: '',
    problem: 'Many task management tools are bloated or difficult to use, making it hard for users to quickly capture, organise, and track daily chores and projects.',
    solution: 'Built a clean, responsive ToDo list app with React for the frontend and Node.js for the backend so users can add, edit, prioritise, and persist tasks across sessions with minimal friction.',
    architecture: [
      { step: '01', title: 'React Frontend', detail: 'Responsive UI with task cards, filters, and quick-add controls. State is managed using local component state and custom hooks.' },
      { step: '02', title: 'Node.js API', detail: 'RESTful backend exposes CRUD endpoints for tasks, handling validation and persistent storage.' },
      { step: '03', title: 'Persistent Storage', detail: 'Tasks are saved through the backend so users retain their lists after refresh and can access the same data over time.' },
      { step: '04', title: 'Task Workflow', detail: 'Support for categorising, prioritising, completing, and deleting tasks with instant UI updates for a smooth user experience.' },
    ],
    outcome: 'Delivered a lightweight task manager that helps users stay organised with fast, reliable task creation and persistence.',
  },
  {
    id: '06',
    slug: 'agri-mart',
    featured: false,
    title: 'Agri Mart Android Application',
    description: 'Online shopping app creating a digital marketplace for agricultural products. Buyers and sellers connect through a real-time Firebase-backed Android application.',
    tags: ['Java', 'Firebase', 'Android Studio'],
    category: 'Mobile',
    year: '2022',
    github: 'https://github.com/DinukaEk/Agri-Market',
    demo: '',
    problem: 'Smallholder farmers in Sri Lanka lack access to direct-to-consumer markets, forcing them to sell through intermediaries. Buyers have no easy way to source fresh produce directly.',
    solution: 'A dual-role Android marketplace where farmers list products and buyers browse, order, and track delivery — all synced in real-time via Firebase.',
    architecture: [
      { step: '01', title: 'Authentication',    detail: 'Firebase Auth with email/password and role-based UI routing on login — separate flows for buyers and sellers.' },
      { step: '02', title: 'Real-Time Listings', detail: 'Firestore real-time database syncs product listings instantly across all connected devices without manual refresh.' },
      { step: '03', title: 'Order Lifecycle',   detail: 'Full order flow with status tracking (pending → confirmed → delivered) and seller push notifications via Firebase Cloud Messaging.' },
      { step: '04', title: 'Image Storage',     detail: 'Firebase Storage for product photos with client-side compression before upload to reduce bandwidth cost.' },
    ],
    outcome: 'Full marketplace with real-time sync, dual user roles, and complete order lifecycle — built solo as a university project.',
  },
  {
    id: '07',
    slug: 'virtual-city',
    featured: false,
    title: 'Virtual City',
    description: 'Interactive 3D city exploration app allowing users to navigate and learn about different locations. Features real-time 3D rendering, user-generated points of interest, favorites system, and social sharing capabilities.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    category: 'Web / 3D',
    year: '2023',
    github: 'https://github.com/DinukaEk/Virtual_City',
    demo: 'https://dinukaek.github.io/Virtual_City/',
    problem: 'City explorers and tourists often rely on flat maps and static guides, which fail to capture spatial context, hidden landmarks, and the social side of discovery.',
    solution: 'Built a web-based 3D city exploration app with immersive navigation, interactive points of interest, user-curated locations, favorites management, and shareable city experiences.',
    architecture: [
      { step: '01', title: '3D City Engine', detail: 'Custom 3D renderer creates a navigable cityscape with smooth camera controls, building models, and dynamic lighting.' },
      { step: '02', title: 'Interactive Navigation', detail: 'Touch and sensor-based controls let users pan, zoom, and move through city districts while discovering landmarks and location details.' },
      { step: '03', title: 'Content Sync', detail: 'Firestore real-time database stores POI metadata, user-generated entries, and discovery content with live updates across devices.' },
      { step: '04', title: 'Favorites & Sharing', detail: 'Firebase Storage hosts uploaded photos and user data, enabling favorites management, location bookmarking, and social sharing of city snapshots.' },
    ],
    outcome: 'Delivered an immersive city discovery prototype with responsive 3D navigation, user-generated points of interest, favorites system, and real-time Firebase sync for a collaborative exploration experience.',
  },
  {
    id: '08',
    slug: 'online-movie-ticket-booking',
    featured: false,
    title: 'Online Movie Ticket Booking System',
    description: 'Full-stack web application for booking movie tickets with real-time seat selection, user authentication, and payment integration. Features admin dashboard for movie management and booking analytics.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'CSS3'],
    category: 'Web',
    year: '2023',
    github: 'https://github.com/DinukaEk/OnlineMovieTicketBooking',
    demo: '',
    problem: 'Manual ticket booking at cinema counters is time-consuming and suffers from unavailability during peak times. Users cannot visualize seat layouts or book in advance online.',
    solution: 'Built a web-based ticket booking system with interactive seat selection, real-time availability updates, secure user authentication, and streamlined payment processing.',
    architecture: [
      { step: '01', title: 'Database Design', detail: 'MySQL schema models movies, theaters, showtimes, seats, and bookings with relationships for efficient queries and integrity constraints.' },
      { step: '02', title: 'Seat Selection UI', detail: 'Interactive JavaScript grid displays theater layout with real-time seat availability, preventing double-bookings through database transactions.' },
      { step: '03', title: 'User Authentication', detail: 'PHP session management with secure password hashing and role-based access control for customers and administrators.' },
      { step: '04', title: 'Admin Dashboard', detail: 'Movie and showtime management interface with booking analytics, revenue reports, and theater capacity visualization.' },
    ],
    outcome: 'Fully operational ticket booking system handling concurrent bookings with real-time seat sync and streamlined user experience.',
  },
];

export const experience = [
  {
    period: 'Jun 2023 \u2014 Jun 2025',
    company: 'Csquare Technologies Pvt. Ltd.',
    role: 'Software Engineer',
    type: 'work',
    description: 'Developed, maintained, and tested web-based ERP systems. Designed robust features and modules, translated complex business requirements into scalable system architectures, oversaw deployment, and provided high-level technical support.',
    stack: ['PHP', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    period: '2019 \u2014 2025',
    company: 'Sri Lanka Technology Campus',
    role: 'BSc (Hons) in Engineering in Information & Communication Engineering',
    type: 'education',
    description: 'Specialised in Software Dev & Design, OOP, Data Structures & Algorithms, DBMS, Cloud Computing, Data Science, and ML/DL/NN. Vice Chairman IEEE Computer Society Student Branch Chapter.',
    stack: [],
  },
];

export const stats = [
  { num: '2+',  label: 'Years industry exp.' },
  { num: '4+',  label: 'Projects shipped'    },
  { num: '15+', label: 'Technologies'        },
  { num: '120+',label: 'Events covered'      },
];

// ─── Skill proficiency levels (0–100) ────────────────────────────────────────
export const skillLevels = [
  { category: 'Frontend Dev',     level: 90, items: ['React', 'Next.js', 'Three.js', 'Tailwind CSS'] },
  { category: 'Backend & APIs',   level: 82, items: ['Node.js', 'FastAPI', 'Flask', 'Laravel'] },
  { category: 'AI / ML',          level: 78, items: ['TensorFlow', 'MediaPipe', 'U²-Net', 'OpenCV'] },
  { category: 'Programming Lang', level: 88, items: ['TypeScript', 'Python', 'JavaScript', 'PHP'] },
  { category: 'Cloud & DevOps',   level: 70, items: ['AWS', 'Azure', 'Docker', 'CI/CD'] },
  { category: 'Databases',        level: 75, items: ['MySQL', 'MongoDB', 'Firebase'] },
];

// ─── Currently building / learning ───────────────────────────────────────────
export const currentlyBuilding = [
  {
    type: 'building' as const,
    title: 'Portfolio v2',
    detail: 'This very site — React + Three.js + Framer Motion',
    date: 'Apr 2026',
  },
  {
    type: 'learning' as const,
    title: 'LangChain + RAG',
    detail: 'Exploring retrieval-augmented generation for document Q&A',
    date: 'Ongoing',
  },
  {
    type: 'reading' as const,
    title: 'Designing ML Systems',
    detail: 'Chip Huyen — production ML architecture patterns',
    date: 'Ongoing',
  },
  {
    type: 'building' as const,
    title: 'AR Wayfinding App',
    detail: 'Indoor navigation prototype using WebXR + custom marker tracking',
    date: 'Mar 2026',
  },
];

// ─── Certifications ───────────────────────────────────────────────────────────
export type Certification = {
  title: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  credentialUrl: string;
  skills: string[];
  // Issuer short code for the logo badge colour
  issuerKey: 'aws' | 'kodekloud' | 'other';
};

export const certifications: Certification[] = [
  {
    title: 'AWS Academy Graduate - AWS Academy Cloud Foundations',
    issuer: 'Amazon Web Services (AWS)',
    issued: 'Jun 2023',
    credentialUrl: 'https://www.credly.com/badges/7a4afa9a-799e-47c4-b952-89670644d588/linked_in_profile',
    skills: ['Amazon Web Services (AWS)'],
    issuerKey: 'aws',
  },
  {
    title: 'AWS Academy Graduate - AWS Academy Cloud Architecting',
    issuer: 'Amazon Web Services (AWS)',
    issued: 'Jun 2023',
    credentialUrl: 'https://www.credly.com/badges/469b1347-1ad5-4954-8af4-32ce939f39fe/linked_in_profile',
    skills: ['Amazon Web Services (AWS)'],
    issuerKey: 'aws',
  },
  {
    title: 'KodeKloud Engineer - Docker (Level 1)',
    issuer: 'KodeKloud',
    issued: 'Feb 2026',
    credentialId: '3b1fb1ee-fea2-4e3e-b3e2-a1a8b68c7414',
    credentialUrl: 'https://engineer.kodekloud.com/certificate-verification/3b1fb1ee-fea2-4e3e-b3e2-a1a8b68c7414',
    skills: ['Docker'],
    issuerKey: 'kodekloud',
  },
  {
    title: 'KodeKloud Engineer - Linux (Level 1)',
    issuer: 'KodeKloud',
    issued: 'Mar 2026',
    credentialId: '8cdbfd9b-ffa3-4884-872e-1f755af6253e',
    credentialUrl: 'https://engineer.kodekloud.com/certificate-verification/8cdbfd9b-ffa3-4884-872e-1f755af6253e',
    skills: ['Linux'],
    issuerKey: 'kodekloud',
  },
  {
    title: 'KodeKloud Engineer - Jenkins (Level 1)',
    issuer: 'KodeKloud',
    issued: 'Apr 2026',
    credentialId: '284f322f-d13d-4a4e-86af-f78699dfc6c6',
    credentialUrl: 'https://engineer.kodekloud.com/certificate-verification/284f322f-d13d-4a4e-86af-f78699dfc6c6',
    skills: ['Jenkins'],
    issuerKey: 'kodekloud',
  },
  {
    title: 'KodeKloud Engineer - Kubernetes (Level 1)',
    issuer: 'KodeKloud',
    issued: 'Apr 2026',
    credentialId: 'c6b07cef-9f79-4025-9ca1-91acb1077fce',
    credentialUrl: 'https://engineer.kodekloud.com/certificate-verification/c6b07cef-9f79-4025-9ca1-91acb1077fce',
    skills: ['Kubernetes'],
    issuerKey: 'kodekloud',
  },
];
