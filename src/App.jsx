import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MEDIA_BASE = `${import.meta.env.BASE_URL}media/`;
const VIDEO_SRC = `${MEDIA_BASE}neon-glow-night-drive.mp4`;
const VIDEO_POSTER = `${MEDIA_BASE}neon-glow-night-drive.jpg`;

const storySections = [
  {
    id: "education",
    label: "Education",
    title: "Academic Focus",
    body: "BASc in Electrical and Computer Engineering at the University of Toronto St. George with an Artificial Intelligence and Robotics minor in progress.",
    align: "right",
    accentA: "#7ef0ff",
    accentB: "#5c8dff",
    meta: ["3.9 GPA", "Top 30 / 460", "Dean's Merit Award x3"],
  },
  {
    id: "research",
    label: "Research",
    title: "Research Work",
    body: "Built ML pipelines for tremor detection using EEG and accelerometer data, reaching 90.6% classification accuracy through NeuroTech Research at U of T.",
    align: "left",
    accentA: "#a4e1ff",
    accentB: "#7d8fff",
    meta: ["Python + MNE", "EEG + Accelerometer", "90.6% accuracy"],
  },
  {
    id: "projects",
    label: "Projects",
    title: "Project Builds",
    body: "Work spans PyTorch-to-FPGA deployment, sparse execution, and a large-scale C++ GIS engine with optimized routing and rendering.",
    align: "right",
    accentA: "#ffd2a2",
    accentB: "#ff9966",
    meta: ["PyTorch + FPGA", "C++ GIS", "OpenStreetMap"],
  },
];

const internships = [
  {
    company: "archES Computing Systems",
    role: "Software Engineering Intern",
    date: "May 2026 - August 2026",
    detail:
      "Incoming internship focused on ultra-low latency C++ infrastructure for real-time market data ingestion across equity markets.",
    tags: ["C++", "Low latency", "Market data"],
  },
  {
    company: "BMO",
    role: "Software Engineering Intern",
    date: "May 2025 - August 2025",
    detail:
      "Raised coverage from ~0.5% to 87.5% across 50+ services, reduced deployment time, and helped resolve 20+ payment API vulnerabilities.",
    tags: ["JUnit", "Payments APIs", "Backend"],
  },
  {
    company: "North P&D Inc.",
    role: "SWE Intern",
    date: "February 2024 - September 2024",
    detail:
      "Integrated Stripe, built a FastAPI microservice with sub-120 ms latency, and implemented a RAG pipeline using FAISS retrieval over internal documents.",
    tags: ["FastAPI", "Stripe", "RAG + FAISS"],
  },
];


const projectLinks = [
  {
    title: "Epistemic Failure Detection",
    href: "https://github.com/laraaskovic/quantized_pruning_CNN_FPGA/blob/main/Epistemic_Pruning_Detection_Auditor_Model.pdf",
    summary:
      "Independent research paper on quantized and pruned CNN deployment with an auditor model for epistemic failure detection.",
    tags: ["Paper", "PyTorch", "FPGA"],
  },
  {
    title: "City-Scale GIS Engine",
    href: "https://github.com/laraaskovic",
    summary:
      "C++ mapping engine with route optimization, interactive rendering, and spatial indexing for large OpenStreetMap datasets.",
    tags: ["C++", "GIS", "OpenStreetMap"],
  },
];

const skills = [
  "C",
  "C++",
  "Python",
  "Java",
  "JavaScript",
  "CUDA",
  "FPGA",
  "Verilog",
  "RTL",
  "RISC-V",
  "TensorFlow",
  "PyTorch",
  "OpenCV",
  "FastAPI",
  "REST APIs",
  "Docker",
  "CI/CD",
  "Git",
];

const lerp = (a, b, n) => a + (b - a) * n;

export default function App() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const videoStateRef = useRef({ current: 0, target: 0, duration: 12 });

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    let tick;

    const onLoadedMetadata = () => {
      videoStateRef.current.duration = video.duration || 12;
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);

    const ctx = gsap.context(() => {
      const revealEls = gsap.utils.toArray("[data-reveal]");
      const panels = gsap.utils.toArray(".portfolio-panel");
      const sectionEls = gsap.utils.toArray(".portfolio-section");
      const marqueeTracks = gsap.utils.toArray(".skills-marquee-track");

      gsap.set(revealEls, { y: 32, opacity: 0, filter: "blur(12px)" });

      revealEls.forEach((element) => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 92%",
          },
        });
      });

      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top 74%",
          end: "bottom 36%",
          onEnter: () => {
            panel.classList.add("is-lit");
            gsap.fromTo(
              panel,
              { "--panel-ray": "-145%", "--panel-glint": 0 },
              {
                "--panel-ray": "165%",
                "--panel-glint": 1,
                duration: 0.85,
                ease: "power2.out",
              },
            );
            gsap.to(panel, {
              "--panel-glint": 0,
              duration: 0.7,
              ease: "power2.out",
              delay: 0.22,
            });
          },
          onEnterBack: () => {
            panel.classList.add("is-lit");
            gsap.fromTo(
              panel,
              { "--panel-ray": "165%", "--panel-glint": 0 },
              {
                "--panel-ray": "-145%",
                "--panel-glint": 1,
                duration: 0.85,
                ease: "power2.out",
              },
            );
            gsap.to(panel, {
              "--panel-glint": 0,
              duration: 0.7,
              ease: "power2.out",
              delay: 0.22,
            });
          },
          onLeave: () => panel.classList.remove("is-lit"),
          onLeaveBack: () => panel.classList.remove("is-lit"),
        });
      });

      sectionEls.forEach((section, index) => {
        const { accentA, accentB } = storySections[index];

        gsap.fromTo(
          section.querySelector(".section-sticky"),
          { yPercent: index % 2 === 0 ? 8 : -8, scale: 0.985, opacity: 0.6 },
          {
            yPercent: index % 2 === 0 ? -5 : 5,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: ({ isActive }) => {
            if (isActive) {
              gsap.to(document.documentElement, {
                "--accent-a": accentA,
                "--accent-b": accentB,
                duration: 0.7,
                ease: "power2.out",
              });
            }
          },
          onUpdate: (self) => {
            const progress = self.progress;
            const beamY = 14 + index * 10 + progress * 18;
            document.documentElement.style.setProperty("--beam-y", `${beamY}vh`);
            document.documentElement.style.setProperty("--beam-angle", `${7 + progress * 8}deg`);
            document.documentElement.style.setProperty(
              "--video-pan",
              `${50 + (index % 2 === 0 ? -1 : 1) * progress * 6}%`,
            );
            document.documentElement.style.setProperty("--veil-opacity", `${0.22 + progress * 0.14}`);
            document.documentElement.style.setProperty("--orb-scale", `${1 + progress * 0.08}`);
          },
        });
      });

      marqueeTracks.forEach((track, index) => {
        gsap.to(track, {
          xPercent: index % 2 === 0 ? -50 : 50,
          ease: "none",
          repeat: -1,
          duration: index % 2 === 0 ? 24 : 28,
        });
      });

      ScrollTrigger.create({
        trigger: ".portfolio-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          videoStateRef.current.target = progress * (videoStateRef.current.duration || 12);
          document.documentElement.style.setProperty("--film-progress", `${progress}`);
          document.documentElement.style.setProperty("--beam-x", `${-18 + progress * 136}vw`);
          document.documentElement.style.setProperty(
            "--beam-opacity",
            `${Math.max(0.04, Math.sin(progress * Math.PI * 7) * 0.32 + 0.1)}`,
          );
          document.documentElement.style.setProperty("--beam-scale", `${1 + Math.sin(progress * Math.PI * 3) * 0.18}`);
          document.documentElement.style.setProperty("--video-zoom", `${1.04 + progress * 0.08}`);
        },
      });

      tick = () => {
        const state = videoStateRef.current;
        state.current = lerp(state.current, state.target, 0.16);
        if (Math.abs(state.current - state.target) < 0.001) {
          state.current = state.target;
        }
        if (video.readyState >= 2 && Math.abs(video.currentTime - state.current) > 1 / 45) {
          video.currentTime = state.current;
        }
      };

      gsap.ticker.add(tick);
    }, rootRef);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      if (tick) {
        gsap.ticker.remove(tick);
      }
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="cinema-app">
      <div className="film-stage">
        <video
          ref={videoRef}
          className="film-video"
          src={VIDEO_SRC}
          poster={VIDEO_POSTER}
          muted
          playsInline
          preload="auto"
        />
        <div className="film-tint" />
        <div className="film-vignette" />
        <div className="film-aurora" />
        <div className="film-orb" />
        <div className="film-beam" />
        <div className="film-edge film-edge-top" />
        <div className="film-edge film-edge-bottom" />
      </div>

      <main className="page-content scroll-film portfolio-content">
        <section className="hero-section">
          <div className="hero-frame">
            <p className="eyebrow" data-reveal>
              Software engineer / AI systems / frontend motion
            </p>
            <h1 data-reveal>LARA ASKOVIC</h1>
            <p className="hero-copy" data-reveal>
              University of Toronto ECE student building across software engineering,
              machine learning, backend systems, and low-latency infrastructure.
            </p>
          </div>
        </section>

        <section className="skills-banner-section">
          <div className="skills-banner-shell">
            <p className="eyebrow" data-reveal>
              Skills
            </p>
            <div className="skills-marquee">
              <div className="skills-marquee-track">
                {[...skills, ...skills].map((item, index) => (
                  <span key={`primary-${item}-${index}`} className="skills-pill">
                    {item}
                  </span>
                ))}
              </div>
              <div className="skills-marquee-track skills-marquee-track-secondary">
                {[...skills, ...skills].map((item, index) => (
                  <span key={`secondary-${item}-${index}`} className="skills-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="internships-section">
          <div className="internships-header">
            <p className="eyebrow" data-reveal>
              Experience
            </p>
            <h2 data-reveal>Internships</h2>
            <p className="panel-body" data-reveal>
              The following roles account for a total of 16 months of internship experience.
            </p>
          </div>

          <div className="internships-grid">
            {internships.map((item) => (
              <article key={item.company} className="portfolio-panel internship-card">
                <p className="eyebrow" data-reveal>{item.company}</p>
                <h3 data-reveal>{item.role}</h3>
                <p className="internship-date" data-reveal>{item.date}</p>
                <p className="panel-body" data-reveal>{item.detail}</p>
                <div className="panel-meta" data-reveal>
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-links-section">
          <div className="internships-header">
            <p className="eyebrow" data-reveal>
              My Projects
            </p>
            <h2 data-reveal>Projects</h2>
            <p className="panel-body" data-reveal>
              All projects can be found on my github!
            </p>
          </div>

          <div className="internships-grid project-links-grid">
            {projectLinks.map((project) => (
              <a
                key={project.title}
                className="portfolio-panel internship-card project-link-card"
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                <p className="eyebrow" data-reveal>Project</p>
                <h3 data-reveal>{project.title}</h3>
                <p className="panel-body" data-reveal>{project.summary}</p>
                <div className="panel-meta" data-reveal>
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="portfolio-sections">
          {storySections.map((section, index) => (
            <section
              key={section.id}
              className={`portfolio-section ${
                section.align === "right" ? "portfolio-right" : "portfolio-left"
              }`}
            >
              <div className="section-sticky">
                <article className="portfolio-panel">
                  <div className="panel-number" data-reveal>{`0${index + 1}`}</div>
                  <p className="eyebrow" data-reveal>{section.label}</p>
                  <h2 data-reveal>{section.title}</h2>
                  <p className="panel-body" data-reveal>{section.body}</p>
                  <div className="panel-meta" data-reveal>
                    {section.meta.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="panel-fill-lines" data-reveal>
                    <span />
                    <span />
                    <span />
                  </div>
                </article>
              </div>
            </section>
          ))}
        </section>
      </main>
    </div>
  );
}
