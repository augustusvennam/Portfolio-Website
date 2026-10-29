export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  category: 'ai' | 'frontend' | 'robotics' | 'mobile';
  badge: string;
  status: string;
  githubUrl?: string;
  liveUrl?: string;
  summary: string;
  role: string;
  stack: string[];
  honestFraming?: string;
  keyStory?: string;
  technicalHighlights: string[];
  metricsOrState: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level?: 'strongest' | 'real-use' | 'working' | 'contributed' | 'familiar' }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Augustus Vennam",
    headline: "Computer Science student with a UX Design minor",
    subheadline: "Building AI agent workflows, frontend experiences, and embedded robotics systems.",
    location: "Mississauga, Ontario, Canada",
    institution: "Wilfrid Laurier University (Milton)",
    degree: "BSc Computer Science, Minor in UX Design",
    graduation: "Expected August 2028",
    email: "augustusvennam@gmail.com",
    github: "https://github.com/augustusvennam",
    linkedin: "https://linkedin.com/in/augustusvennam",
    availability: {
      status: "Actively seeking 4-month co-op / internship placements",
      terms: ["Winter 2027 (Jan – Apr)", "Summer 2027 (May – Aug)"],
      interests: ["Software Development", "Agentic AI Integration", "UI/UX Engineering", "Robotics & Embedded Systems"]
    },
    aboutNarrative: `I'm a third-year Computer Science student at Wilfrid Laurier University (Milton) with a minor in UX Design, graduating in August 2028. My work sits across three lanes: AI agent workflows, frontend development with a UX grounding, and embedded/robotics integration.

I like work where real people use the thing: a live church website tested by its members before release, a frontend shaped by developer feedback on a prototype, a dashboard that tells the truth when its backend is down. I also lead: Vice President of Laurier's robotics club (LRIS) and a Student Ambassador for the university.`
  },

  coursework: {
    fall2026: ["Information Design", "UX Research Methods II", "Games as Art"],
    appliedPrinciples: [
      "User Personas & Contextual Inquiry",
      "Heuristic Evaluation (Nielsen's 10)",
      "Interactive Prototyping & Feedback Cycles",
      "Usability Testing of Live Production Updates"
    ]
  },

  projects: [
    {
      id: "brainwaves",
      title: "BrainWaves / BrainBot",
      subtitle: "Embedded EEG-to-Robotics WebSocket Dashboard & Speech Pipeline",
      period: "2026 – Present",
      category: "robotics",
      badge: "Sole Contributor & Lead",
      status: "Slated for Laurier Fall Open House (Nov 11, 2026)",
      githubUrl: "https://github.com/augustusvennam/BrainWaves-Project",
      summary: "An Emotiv EPOC X EEG headset paired with a Temi robot, with a laptop in the middle running the pipeline: brain-signal streams in, a mood estimate out, reflected through the robot's speech. Developed mainly by Augustus as project lead.",
      role: "Sole contributor and project lead. Built the entire architecture, typed React dashboard, and WebSocket transport layer.",
      stack: ["React 19", "TypeScript", "Vite", "WebSockets", "Emotiv Cortex API", "Temi Robot SDK", "Strict TSConfig"],
      honestFraming: "Mood classification is a heuristic demonstration, not validated emotion detection — the repository README explicitly states this. Uses Cortex Basic streams (met/pow/dev/eq), no raw EEG, and no custom machine learning model. Hardware end-to-end run is pending (headset smoke test, Temi link test, participant run).",
      keyStory: "Built an explicit unavailable and offline UI state system instead of a blank screen, gracefully handling WebSocket drops and headset disconnects with typed reconnect cleanup.",
      technicalHighlights: [
        "11 automated tests passing, strict TypeScript type checking and Vite production build verified",
        "Typed WebSocket transport service (src/services/websocket.ts) with unmount cleanup",
        "Generically typed state for Cortex Basic stream payloads (Engagement, Excitement, Stress, Focus, Relaxation)",
        "Zero-latency audio-visual feedback and honest offline diagnostics"
      ],
      metricsOrState: "11/11 automated tests passed • TypeScript strict passing"
    },
    {
      id: "smart-write",
      title: "SMART WRITE",
      subtitle: "Handwriting Recognition App with UX-Informed React Frontend & CNN",
      period: "Feb – Mar 2026",
      category: "frontend",
      badge: "Frontend Lead & UX",
      status: "Completed Collaborative Build",
      summary: "A handwriting-recognition application built by a collaborative team. Augustus led UI/UX design and the React 19 frontend implementation, while contributing to the PyTorch convolutional neural network training.",
      role: "UI/UX & React 19 Frontend Lead, with contributed PyTorch CNN model training cycles and fine-tuning setup.",
      stack: ["React 19", "PyTorch (Contributed)", "Canva Prototyping", "UX Heuristics", "Computer Vision"],
      honestFraming: "Framing is always 'helped/contributed' on the PyTorch CNN training — never sole model builder. The frontend repo lives under a teammate's account (pending link).",
      keyStory: "Developers tested the interface on an interactive Canva mock prototype. Their feedback relocated primary action buttons, redesigned the demo workflow, and introduced structured component boundaries informed by heuristic evaluation.",
      technicalHighlights: [
        "Iterative prototype feedback cycle: Canva wireframe -> developer testing -> refined React 19 UI",
        "Contributed to PyTorch CNN training cycles, fine-tuning scripts, and GPU-when-available fallback pipeline",
        "Applied UX coursework in user personas and Nielsen's heuristic evaluations to eliminate cognitive friction",
        "Modular canvas drawing surface with responsive brush dynamics"
      ],
      metricsOrState: "Validated via developer feedback sessions & prototype testing"
    },
    {
      id: "heavenbound",
      title: "HeavenBound Church Website",
      subtitle: "Production Website Redesign & Continuous Usability Maintenance",
      period: "May 2021 – Present",
      category: "frontend",
      badge: "Live & Deployed",
      status: "Active Production (4+ Years)",
      liveUrl: "https://hbcc.ca",
      summary: "The live, deployed public website for HeavenBound Community Church. Demonstrates a full 4+ year product lifecycle: from initial UX audit and restructuring to ongoing release testing and maintenance.",
      role: "Sole web designer, UX researcher, and ongoing maintainer.",
      stack: ["WordPress", "Elementor", "UX Usability Testing", "Information Architecture", "Audio-Visual Integration"],
      honestFraming: "Real production site with active weekly community users. Maintained continuously for over 4 years.",
      keyStory: "Restructured navigation around how church members actually look up weekly sermons, volunteer schedules, and ministries. Church members tested live staging updates before full public deployment.",
      technicalHighlights: [
        "Continuous 4+ year production lifecycle with quality assurance before every release",
        "Information architecture structured from real community user personas",
        "Integrated media player and bulletin updates serving 200+ weekly attendees",
        "Responsive cross-device testing ensuring accessibility for older congregation members"
      ],
      metricsOrState: "4+ years live in production • 200+ congregation members served"
    },
    {
      id: "ai-workflows",
      title: "Semi-Local AI Agent Workflows",
      subtitle: "Autonomous Local & Cloud Agent Orchestration Framework",
      period: "July 2026 – Present",
      category: "ai",
      badge: "Independent Research",
      status: "Ongoing Engineering",
      summary: "Designing and building semi-local AI agent workflows bridging local execution environments with cloud intelligence pipelines. This represents his strongest autonomous agent engineering direction.",
      role: "Independent research & development.",
      stack: ["Agentic AI Workflows", "Model Context Protocol", "Process Automation", "Local LLMs", "Workflow Management"],
      honestFraming: "Independent ongoing research. No product, user, or performance claims are recorded for this work — strictly architecture and pipeline design.",
      keyStory: "Constructing hybrid agent harnesses that isolate sensitive data locally while delegating complex reasoning loops to high-capability models.",
      technicalHighlights: [
        "Hybrid execution pipeline balancing local context privacy with external LLM reasoning",
        "Modular tool calling schema built around MCP and robust error recovery",
        "Stateful workflow tracking ensuring deterministic recovery during agent crashes"
      ],
      metricsOrState: "Active development • Hybrid execution model"
    },
    {
      id: "jetson-robot",
      title: "NVIDIA Jetson Nano Facial Robot",
      subtitle: "Edge AI Face Detection & Age Estimation on Embedded Jetson",
      period: "February 2026 – Present",
      category: "robotics",
      badge: "Team Collaborator",
      status: "Prototype Active",
      summary: "Collaborative edge robotics build: real-time face detection and age estimation running onboard an NVIDIA Jetson Nano with GPU hardware acceleration.",
      role: "Collaborator on a multidisciplinary team build.",
      stack: ["NVIDIA Jetson Nano", "OpenCV", "Embedded Linux", "Computer Vision", "GPU Inference"],
      honestFraming: "Team build. No accuracy or performance claims are recorded or invented.",
      keyStory: "Calibrated camera pipeline and OpenCV inference loops to operate within the thermal and power limits of the Jetson Nano developer kit.",
      technicalHighlights: [
        "Onboard GPU inference pipeline utilizing OpenCV CUDA acceleration",
        "Low-latency video frame acquisition and bounding-box overlay",
        "Embedded system power management and thermal throttling mitigation"
      ],
      metricsOrState: "Hardware edge prototype running on Jetson Nano"
    },
    {
      id: "temi-kiosk",
      title: "TEMI LRIS FAQ Flutter App",
      subtitle: "Autonomous Robot Interactive FAQ Kiosk with Native Android Bridge",
      period: "March – May 2026",
      category: "mobile",
      badge: "Built for LRIS",
      status: "Deployed on Temi Robot",
      summary: "An interactive FAQ touchscreen kiosk running on a Temi telepresence robot, built for the Laurier Robotics Innovation Student Society (LRIS) open house tours.",
      role: "Sole builder of the Flutter application and Android native bridge.",
      stack: ["Flutter", "Dart", "Android Kotlin Bridge", "Temi SDK", "MethodChannel", "TTS Fallback"],
      honestFraming: "Working familiarity with Dart and Android SDK. Native Kotlin bridge constructed for Temi platform integration.",
      keyStory: "Implemented a graceful text-to-speech fallback pipeline: if the robot's proprietary audio hardware was disconnected, the UI automatically routed speech to native system TTS.",
      technicalHighlights: [
        "Flutter to Temi SDK bridge via asynchronous MethodChannel in Kotlin",
        "Hardware-level robot state detection and movement safety triggers",
        "Self-contained kiosk touch interface designed for high-traffic visitor events"
      ],
      metricsOrState: "Deployed on campus Temi robot for club demonstrations"
    },
    {
      id: "vex-soccer",
      title: "VEX AV Soccer Robot",
      subtitle: "Competitive Remote-Operated Interactive Open House Attraction",
      period: "March – May 2026",
      category: "robotics",
      badge: "Robotics Build",
      status: "Demonstrated at Laurier",
      summary: "Built as an interactive, competitive attraction for prospective students and visitors during Laurier's University Open House.",
      role: "Lead builder & programmer.",
      stack: ["VEX Platform", "VEXcode", "C++ / RobotC", "Drivetrain Mechanics"],
      honestFraming: "Designed specifically as a reliable, responsive showcase robot for public visitor hands-on driving.",
      keyStory: "Geared for agile maneuverability and high durability under continuous public use by visiting high school students.",
      technicalHighlights: [
        "Custom high-traction omnidirectional drivetrain",
        "Rapid-response pneumatic/motorized kicking mechanism",
        "Fail-safe wireless controller synchronization"
      ],
      metricsOrState: "Tested live by 50+ prospective university students"
    },
    {
      id: "tetrix-minimax",
      title: "Tetrix Minimax",
      subtitle: "Mechanical Frame, 3D-Printed Scoop & Drivetrain Integration",
      period: "March – April 2026",
      category: "robotics",
      badge: "Mechanical & Hardware",
      status: "Competition Complete",
      summary: "Competitive-event robot build focusing on mechanical rigidity, custom 3D printed end-effectors, and Arduino motor control integration.",
      role: "Mechanical lead — frame structural design, 3D-printed scoop, drivetrain and control integration.",
      stack: ["TETRIX", "Arduino", "3D Printing (CAD)", "Drivetrain Design", "Mechanical Prototyping"],
      honestFraming: "Hardware and mechanical focus. Hands-on rapid prototyping with additive manufacturing.",
      keyStory: "Iterated 3 versions of the front intake scoop using CAD and 3D printing to maximize game-piece capture rate under competition constraints.",
      technicalHighlights: [
        "Custom CAD-modelled structural mounting brackets and scoop",
        "Arduino PWM motor driver tuning for high starting torque",
        "Weight distribution optimization for rapid direction changes"
      ],
      metricsOrState: "Built for competitive event demonstration"
    },
    {
      id: "temposet",
      title: "TempoSet Mobile App",
      subtitle: "Rhythmic Audio & Timing Utility Mobile Project",
      period: "Dec 2025 – Present",
      category: "mobile",
      badge: "Mobile App",
      status: "Active Development",
      githubUrl: "https://github.com/augustusvennam/TempoSet-Mobile-App",
      summary: "Independent mobile application project exploring high-precision audio playback and local storage.",
      role: "Independent developer.",
      stack: ["Flutter", "Dart", "SQLite", "SoLoud Audio Engine"],
      honestFraming: "Feature detail beyond the stack is not recorded. Independent exploration of mobile audio architecture.",
      keyStory: "Integrating SoLoud native low-latency audio engine with Flutter for jitter-free rhythmic precision.",
      technicalHighlights: [
        "Low-latency audio engine bindings with SoLoud",
        "Local relational persistence using SQLite",
        "Working familiarity with Dart cross-platform architecture"
      ],
      metricsOrState: "Public GitHub repository • Audio engine integration"
    }
  ] as Project[],

  experience: [
    {
      id: "lris-vp",
      role: "Vice President",
      organization: "Laurier Robotics Innovation Student Society (LRIS)",
      location: "Wilfrid Laurier University",
      period: "Jan 2026 – Present",
      type: "Club Leadership",
      highlights: [
        "Coordinate and organize hands-on technical workshops and university robotics events, ensuring all hardware materials and timelines are prepared in advance.",
        "Maintain direct communication among executive team members to ensure smooth workshop delivery and inclusive club culture.",
        "Support club members with technical guidance on robot design, mechanical construction, and microcontroller programming challenges.",
        "Spearheaded public interactive showcases including the VEX Soccer Robot and Temi Robot kiosk for university open house events."
      ]
    },
    {
      id: "student-ambassador",
      role: "Student Ambassador",
      organization: "Wilfrid Laurier University",
      location: "Milton & Waterloo, Ontario",
      period: "Mar 2026 – Present",
      type: "Contract Part-Time",
      highlights: [
        "Represent Laurier to prospective students and families, articulating curriculum details, campus life, and academic support resources.",
        "Facilitate 30+ campus tours, university open houses, and orientation events annually, handling logistics for visit days.",
        "Featured in Laurier MARCOM outreach, including an Ontario Universities' Fair (OUF) promotional interview and Open House feature.",
        "Adapt complex academic program requirements to meet prospective students where they are."
      ]
    },
    {
      id: "lris-builder",
      role: "Robot Designer & Builder",
      organization: "Laurier Robotics Innovation Student Society (LRIS)",
      location: "Wilfrid Laurier University",
      period: "Dec 2025 – Jan 2026",
      type: "Technical Club Member",
      highlights: [
        "Designed and fabricated robots for club demonstrations and regional competitive matches.",
        "Prepared and managed inventory of mechanical parts, microcontrollers, and wiring so new members could onboard effectively.",
        "Assisted team members during active build sessions by troubleshooting mechanical jams and basic code bugs."
      ]
    },
    {
      id: "church-av",
      role: "Volunteer Assistant (Audio-Visual & Music Lead)",
      organization: "HeavenBound Community Church",
      location: "Markham, Ontario",
      period: "Sep 2023 – Present",
      type: "Volunteer Leadership",
      highlights: [
        "End-to-end audio-visual operations for weekly services serving ~200 attendees: live multi-channel sound mixing, broadcast video switching, and real-time troubleshooting.",
        "Music Director on the worship team, directing live on-stage band rehearsals and performing on acoustic guitar.",
        "Mentored and trained junior volunteer team members in sound engineering fundamentals and digital console operations.",
        "Led continuous enhancements to the church's web presence (hbcc.ca) and internal media tooling."
      ]
    },
    {
      id: "church-media",
      role: "Media Assistant (Paid Staff)",
      organization: "HeavenBound Community Church",
      location: "Markham, Ontario",
      period: "Apr 2021 – Aug 2023",
      type: "Permanent Part-Time",
      highlights: [
        "Produced digital visual media, sermon series branding, event flyers, and community outreach campaigns.",
        "Conducted technology evaluations to modernize production workflows and reduce Sunday morning turnaround times.",
        "Managed stage layout logistics and multimedia presentations for weekly congregational gatherings."
      ]
    }
  ] as Experience[],

  skills: [
    {
      title: "Languages",
      description: "Honest proficiency levels: Python & Java are strongest. TypeScript is proven in typed React & WebSocket code.",
      skills: [
        { name: "Python", level: "strongest" },
        { name: "Java", level: "strongest" },
        { name: "TypeScript", level: "real-use" },
        { name: "Dart", level: "working" },
        { name: "C", level: "working" }
      ]
    },
    {
      title: "Frontend & Mobile",
      description: "Modern component architectures, live streaming WebSockets, and native mobile bridges.",
      skills: [
        { name: "React 19", level: "real-use" },
        { name: "Live WebSocket UIs", level: "real-use" },
        { name: "TypeScript Strict Mode", level: "real-use" },
        { name: "Flutter", level: "working" },
        { name: "WordPress / Elementor", level: "real-use" },
        { name: "Android Kotlin Bridge (MethodChannel)", level: "working" },
        { name: "Android SDK", level: "working" }
      ]
    },
    {
      title: "AI, ML & Agent Workflows",
      description: "Agent orchestration, computer vision on edge devices, and CNN training contribution.",
      skills: [
        { name: "AI Agent Workflows", level: "real-use" },
        { name: "PyTorch (Contributed CNN Training)", level: "contributed" },
        { name: "OpenCV", level: "working" },
        { name: "Computer Vision", level: "working" },
        { name: "Agentic AI Development", level: "real-use" },
        { name: "Model Context Protocol (MCP)", level: "familiar" },
        { name: "Embedded Edge Inference", level: "working" }
      ]
    },
    {
      title: "Design & UX Research",
      description: "Rooted in Wilfrid Laurier UX coursework: research methods, prototyping, and usability evaluations.",
      skills: [
        { name: "UX Research Methods", level: "strongest" },
        { name: "User Personas", level: "strongest" },
        { name: "Heuristic Evaluation", level: "strongest" },
        { name: "Canva Prototyping", level: "real-use" },
        { name: "Developer Feedback Loops", level: "real-use" },
        { name: "Usability Testing of Live Updates", level: "real-use" },
        { name: "Information Design", level: "strongest" }
      ]
    },
    {
      title: "Hardware & Making",
      description: "Physical robotics platforms, drivetrain fabrication, and additive manufacturing.",
      skills: [
        { name: "VEX & VEXcode", level: "real-use" },
        { name: "TETRIX", level: "real-use" },
        { name: "Arduino", level: "working" },
        { name: "3D Printing & Rapid Prototyping", level: "real-use" },
        { name: "Drivetrain Design", level: "working" },
        { name: "NVIDIA Jetson Nano", level: "working" }
      ]
    },
    {
      title: "Leadership & Operations",
      description: "University leadership, club governance, and high-stakes live production management.",
      skills: [
        { name: "Club Executive Leadership (VP LRIS)", level: "strongest" },
        { name: "Workshop & Event Organization", level: "strongest" },
        { name: "Student Recruitment & Tours", level: "strongest" },
        { name: "Live AV Mixing & Production", level: "strongest" },
        { name: "Musical Direction", level: "real-use" }
      ]
    }
  ] as SkillCategory[],

  certifications: [
    { title: "Soulful Colour Customer Experience Brief", issuer: "Riipen", date: "Sep 2026", category: "UX & CX" },
    { title: "AI Capabilities and Limitations", issuer: "Anthropic", date: "May 2026", category: "AI Safety" },
    { title: "Introduction to Model Context Protocol", issuer: "Anthropic", date: "May 2026", category: "Agent Architectures" },
    { title: "Model Context Protocol: Advanced Topics", issuer: "Anthropic", date: "May 2026", category: "Agent Architectures" },
    { title: "Introduction to Agent Skills", issuer: "Anthropic", date: "May 2026", category: "AI Skills" },
    { title: "Introduction to Subagents", issuer: "Anthropic", date: "May 2026", category: "Autonomous Systems" },
    { title: "Building with the Claude API", issuer: "Anthropic", date: "May 2026", category: "API Development" },
    { title: "Claude with Amazon Bedrock", issuer: "Anthropic", date: "May 2026", category: "Cloud AI" },
    { title: "Claude with Google Cloud Vertex AI", issuer: "Anthropic", date: "May 2026", category: "Cloud AI" },
    { title: "Claude Code in Action", issuer: "Anthropic", date: "May 2026", category: "Developer Tooling" }
  ]
};

