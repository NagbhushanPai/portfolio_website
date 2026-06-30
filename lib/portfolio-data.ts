export type ProjectSlug =
  | "distributed-rate-limiter"
  | "mini-kafka"
  | "rag-evaluation-system"
  | "deepfake-detection-system";

export type Project = {
  slug: ProjectSlug;
  name: string;
  summary: string;
  architecture: string[];
  problem: string;
  solution: string;
  challenges: string[];
  benchmarks: string[];
  lessonsLearned: string[];
  techStack: string[];
  metrics: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  screenshots?: {
    label: string;
    alt: string;
    caption: string;
  }[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  location: string;
  demoUrl?: string;
  techStack: string[];
  achievements: string[];
  impact: string[];
};

export type BlogSlug = "building-kafka-from-scratch" | "graphql-vs-rest-at-scale" | "how-we-built-a-deepfake-detector";

export type BlogPost = {
  slug: BlogSlug;
  title: string;
  summary: string;
  publishedOn: string;
  readingTime: string;
  tags: string[];
  sections: {
    heading: string;
    body: string[];
  }[];
};

export const siteConfig = {
  name: "Nagbhushan Pai",
  role: "Software Engineer",
  tagline: "Building scalable backend systems and AI-powered applications.",
  email: "nagbhushanpai707@gmail.com",
  github: "https://github.com/NagbhushanPai",
  linkedin: "https://www.linkedin.com/in/nagbhushan-pai/",
  resumeUrl: "/resume.pdf",
  location: "India",
};

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroHighlights = [
  "Backend systems",
  "Distributed systems",
  "AI evaluation workflows",
  "Cloud deployment",
] as const;

export const heroStats = [
  { value: "10K+", label: "requests/sec" },
  { value: "99%", label: "workflow reliability" },
  { value: "92%", label: "deepfake accuracy" },
  { value: "5", label: "featured projects" },
] as const;

export const experience: ExperienceItem[] = [
  {
    company: "Data Axle",
    role: "Software Development Engineer (Backend) Intern",
    duration: "Jan 2026 - Jun 2026",
    location: "Pune, India",
    techStack: ["Python", "Django", "GraphQL", "Graphene", "Temporal", "AWS", "Docker"],
    achievements: [
      "Built a standalone DirectMail microservice and reduced reliance on the monolith.",
      "Designed GraphQL APIs with pagination, filtering, and role-based access control.",
      "Implemented resilient Temporal workflows for long-running business processes.",
      "Deployed services on AWS with CloudWatch logging and monitoring.",
    ],
    impact: [
      "Improved deployment flexibility by separating critical functionality into independently deployable services.",
      "Reduced debugging turnaround with centralized logs and workflow observability.",
    ],
  },
  {
    company: "ONJI Softwares Pvt Ltd",
    role: "Software Engineer Intern",
    duration: "Jun 2025 - Aug 2025",
    location: "Remote",
    demoUrl:
      "https://drive.google.com/drive/folders/1ksA0MVN2CVslnVDDtbhj2hp1oBPtVYvr?usp=sharing",
    techStack: ["React Native", "Expo", "JavaScript", "REST APIs", "Git"],
    achievements: [
      "Built reusable cross-platform UI components for Android and iOS.",
      "Converted Figma designs into production-ready screens.",
      "Implemented secure authentication and navigation flows.",
      "Optimized responsiveness and startup performance.",
    ],
    impact: [
      "Delivered a more consistent mobile experience across screen sizes.",
      "Improved maintainability through reusable component architecture.",
    ],
  },
] as const;

export const projects: Project[] = [
  {
    slug: "distributed-rate-limiter",
    name: "Distributed Rate Limiter",
    summary:
      "Redis-based traffic control system designed to keep APIs fast while preventing abuse at scale.",
    architecture: [
      "Client requests are routed to a rate-limiter service that evaluates policy state before forwarding decisions.",
      "Redis stores counters and windows atomically through Lua, removing race conditions during concurrent traffic.",
      "Policy configuration is route-aware so throttling can differ between public and internal APIs.",
    ],
    problem:
      "APIs need to enforce limits without introducing high latency or a single point of failure.",
    solution:
      "Built a distributed service using Redis and Lua scripting with token bucket and sliding-window strategies, plus configurable policies for different routes.",
    challenges: [
      "Preserving low latency while keeping decisions atomic across distributed traffic.",
      "Designing a data model that supports multiple limiting strategies without duplicating logic.",
      "Balancing configurability with straightforward operational behavior.",
    ],
    benchmarks: ["10,000+ requests/sec", "Sub-5ms latency", "Horizontal scalability"],
    lessonsLearned: [
      "Atomic primitives matter more than complex coordination when latency budgets are tight.",
      "A small, explicit policy surface is easier to reason about under load.",
    ],
    techStack: ["Python", "Redis", "Lua", "Docker"],
    metrics: ["10,000+ requests/sec", "Sub-5ms latency", "Horizontal scalability"],
    githubUrl: "https://github.com/NagbhushanPai/distributed-rate-limiter",
    liveUrl: undefined,
    featured: true,
    screenshots: [
      {
        label: "Architecture",
        alt: "Architecture diagram for the distributed rate limiter",
        caption: "Service flow and Redis-backed policy evaluation.",
      },
    ],
  },
  {
    slug: "mini-kafka",
    name: "Mini Kafka",
    summary:
      "A Kafka-inspired streaming platform to study partitions, offsets, replay, and consumer group behavior.",
    architecture: [
      "Producers append messages to topics that are split into partitions for parallelism.",
      "Consumers track offsets so replay and recovery remain deterministic.",
      "A persistent log layer keeps data durable and makes failure cases observable.",
    ],
    problem:
      "Distributed messaging internals are easier to learn by building the primitives yourself.",
    solution:
      "Implemented producer-consumer messaging with topic partitioning, offset management, durable log storage, and concurrent consumers.",
    challenges: [
      "Keeping ordering guarantees while supporting concurrent consumers.",
      "Modeling offsets so replay remains predictable after restarts.",
      "Making durability simple without hiding the messaging semantics.",
    ],
    benchmarks: ["Replay support", "Persistent logs", "Concurrent consumers"],
    lessonsLearned: [
      "Messaging systems become much clearer once offsets and partitions are visible end to end.",
      "Durability and throughput trade off against each other quickly in a simple implementation.",
    ],
    techStack: ["Python", "Multithreading", "Networking", "File Storage"],
    metrics: ["Replay support", "Persistent logs", "Concurrent consumers"],
    githubUrl: "https://github.com/NagbhushanPai/Mini-Kafka",
    liveUrl: undefined,
    featured: true,
    screenshots: [
      {
        label: "Broker Flow",
        alt: "Mini Kafka topic and partition flow",
        caption: "Producer-consumer path with offsets and partitions.",
      },
    ],
  },
  {
    slug: "rag-evaluation-system",
    name: "RAG Evaluation System",
    summary:
      "A benchmark framework for comparing LLMs on scripture-based question answering with retrieval and quantitative evaluation.",
    architecture: [
      "Queries are embedded, matched against a FAISS index, and passed to the LLM with retrieved context.",
      "Evaluation pipelines compare baseline and retrieval-augmented outputs across several models.",
      "Metrics are collected automatically so model behavior can be compared consistently.",
    ],
    problem:
      "LLMs often respond confidently without enough grounding for culturally specific or knowledge-heavy prompts.",
    solution:
      "Built a retrieval pipeline with Sentence Transformers and FAISS, then evaluated multiple models using BLEU, ROUGE-L, and BERTScore.",
    challenges: [
      "Measuring quality across models that produce different response styles.",
      "Keeping retrieval relevant without overfitting to the evaluation dataset.",
      "Making benchmark output easy to compare across runs.",
    ],
    benchmarks: ["Automated benchmarking", "Grounded retrieval", "Quantitative reports"],
    lessonsLearned: [
      "Evaluation quality improves when retrieval and scoring are treated as first-class pipeline stages.",
      "Comparability is as important as raw score output in research tooling.",
    ],
    techStack: ["Python", "FAISS", "Sentence Transformers", "Hugging Face", "LLM APIs"],
    metrics: ["Automated benchmarking", "Grounded retrieval", "Quantitative reports"],
    githubUrl: "https://github.com/NagbhushanPai/Minor_Project",
    liveUrl: undefined,
    featured: true,
    screenshots: [
      {
        label: "Retrieval",
        alt: "RAG retrieval and evaluation pipeline",
        caption: "Embedding, retrieval, and model comparison workflow.",
      },
    ],
  },
  {
    slug: "deepfake-detection-system",
    name: "Audio-Video Deepfake Detection System",
    summary:
      "Multimodal AI system for identifying manipulated videos with spatial and temporal features.",
    architecture: [
      "Video frames are preprocessed before passing through the detection pipeline.",
      "Spatial and temporal features are fused for classification and confidence scoring.",
      "A Flask API exposes the model for real-time inference and integration.",
    ],
    problem:
      "Manipulated media needs fast, explainable detection for practical real-world use.",
    solution:
      "Combined CNN and Vision Transformer features in a real-time inference pipeline with preprocessing and REST deployment.",
    challenges: [
      "Combining temporal and spatial signals without creating a fragile pipeline.",
      "Keeping inference fast enough for practical analysis.",
      "Returning a score that is useful rather than just a label.",
    ],
    benchmarks: ["92% classification accuracy", "Real-time inference", "Explainable scoring"],
    lessonsLearned: [
      "Strong preprocessing often matters as much as model choice in media problems.",
      "Explainability improves trust when the output is meant for decision support.",
    ],
    techStack: ["PyTorch", "OpenCV", "Flask", "Vision Transformers", "CNNs"],
    metrics: ["92% classification accuracy", "Real-time inference", "Explainable scoring"],
    githubUrl: "https://github.com/NagbhushanPai/Deepfake-Detection-MTCNN-ConViT.git",
    liveUrl: undefined,
    featured: true,
    screenshots: [
      {
        label: "Inference",
        alt: "Deepfake detection model inference pipeline",
        caption: "Multimodal prediction flow and confidence scoring.",
      },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "building-kafka-from-scratch",
    title: "Building Kafka From Scratch",
    summary: "A short breakdown of the ideas behind partitions, offsets, replay, and durability.",
    publishedOn: "2026-06-24",
    readingTime: "4 min read",
    tags: ["Distributed Systems", "Messaging", "Backend"],
    sections: [
      {
        heading: "Why build it",
        body: [
          "Kafka is easiest to understand once you build the core ideas yourself.",
          "This project focuses on the data flow behind producers, partitions, offsets, and consumers.",
          "Read the full post on Hashnode: https://nagbhushanpai.hashnode.dev/building-kafka-from-scratch-what-happens-after-you-call-send?utm_source=hashnode&utm_medium=feed",
        ],
      },
      {
        heading: "What mattered",
        body: [
          "Durability, replay, and offset tracking are the features that make messaging systems useful under failure.",
          "The implementation taught the cost of concurrency and the value of explicit state management.",
        ],
      },
    ],
  },
  {
    slug: "graphql-vs-rest-at-scale",
    title: "GraphQL vs REST at Scale",
    summary: "A practical comparison of API design tradeoffs when traffic, teams, and data access patterns grow.",
    publishedOn: "2026-06-24",
    readingTime: "4 min read",
    tags: ["API Design", "GraphQL", "REST"],
    sections: [
      {
        heading: "The tradeoff",
        body: [
          "GraphQL reduces over-fetching and can simplify client-side composition.",
          "REST is often easier to cache, reason about, and operationalize when APIs are stable.",
          "Read the full post on Hashnode: https://nagbhushanpai.hashnode.dev/graphql-vs-rest-at-scale-the-tradeoffs-nobody-talks-about?utm_source=hashnode&utm_medium=feed",
        ],
      },
      {
        heading: "The takeaway",
        body: [
          "At scale, the best choice depends on governance, payload shape, and how quickly the domain changes.",
          "The architecture should reflect the team and traffic profile, not just the syntax preference.",
        ],
      },
    ],
  },
  {
    slug: "how-we-built-a-deepfake-detector",
    title: "How We Built a Deepfake Detector",
    summary: "A concise look at multimodal detection, preprocessing, and explainable scoring.",
    publishedOn: "2026-06-24",
    readingTime: "5 min read",
    tags: ["Machine Learning", "Computer Vision", "MLOps"],
    sections: [
      {
        heading: "Pipeline design",
        body: [
          "The system combines frame preprocessing with a hybrid CNN and Vision Transformer approach.",
          "The goal was not only accuracy, but an inference flow that could be used interactively.",
          "Read the full post on Hashnode: https://nagbhushanpai.hashnode.dev/how-i-built-an-ai-powered-deepfake-detector-lessons-from-training-a-hybrid-cnn-vision-transformer?utm_source=hashnode&utm_medium=feed",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Real-world ML systems depend heavily on preprocessing, latency, and confidence presentation.",
          "A practical model is one that can be reasoned about by both engineers and reviewers.",
        ],
      },
    ],
  },
];

export const timeline = [
  {
    label: "Current work",
    title: "Shipping portfolio and engineering polish",
    description: "Extending backend, AI, and frontend systems while keeping the site recruiter-focused.",
    year: "2026",
  },
  {
    label: "Data Axle Internship",
    title: "Backend systems and workflow orchestration",
    description: "Built GraphQL services, Temporal workflows, and AWS-backed infrastructure.",
    year: "2026",
  },
  {
    label: "Deepfake Project",
    title: "Multimodal detection system",
    description: "Developed an AI pipeline for real-time manipulated media detection with measurable accuracy.",
    year: "2025",
  },
  {
    label: "SIH Finalist",
    title: "Smart India Hackathon 2024 finalist",
    description: "Built an AI-powered multimodal solution and presented it to evaluators.",
    year: "2024",
  },
  {
    label: "NCC",
    title: "Sergeant, C Certificate",
    description: "Led teams, coordinated activities, and built discipline through cadet responsibilities.",
    year: "2024",
  },
  {
    label: "Dronaid",
    title: "Electronics team contributor",
    description: "Worked on sensor integration, embedded systems, and flight testing support.",
    year: "2024",
  },
] as const;

export const currentlyBuilding = [
  "A more robust RAG evaluation workflow with cleaner metrics reporting.",
  "A stronger backend systems portfolio narrative with quantified outcomes.",
  "Deeper understanding of distributed systems, observability, and cloud operations.",
] as const;

export const skills = [
  "Backend Engineering",
  "Distributed Systems",
  "Machine Learning",
  "Cloud Infrastructure",
  "GraphQL APIs",
  "Workflow Orchestration",
  "Data Pipelines",
  "Technical Writing",
] as const;

export const achievements = [
  "Smart India Hackathon 2024 Finalist",
  "NCC Sergeant with C Certificate",
  "IIT BHU research project contributor",
  "92% deepfake detection accuracy",
  "10K+ requests/sec rate-limiter design",
] as const;

export const socialLinks = [
  { label: "GitHub", href: siteConfig.github, icon: "github" as const },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: "linkedin" as const },
] as const;

export const contactLinks = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "GitHub", value: "github.com/NagbhushanPai", href: siteConfig.github },
  { label: "LinkedIn", value: "linkedin.com/in/nagbhushan-pai", href: siteConfig.linkedin },
] as const;
