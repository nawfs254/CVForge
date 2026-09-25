"use client";

import React from "react";
import { cvData, BulletItem, CVData } from "../data/cvData";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Sparkles,
  Code2,
} from "lucide-react";

const LinkedinIcon: React.FC<{
  size?: number;
  style?: React.CSSProperties;
}> = ({ size = 13, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({
  size = 13,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface ResumeDocumentProps {
  data?: CVData;
  isTwoPageView?: boolean;
  primaryColor?: string;
  gradient?: string;
  useGradient?: boolean;
  templateId?: string;
}

export const FormattedText: React.FC<{ item: BulletItem }> = ({ item }) => {
  const { text, boldPhrases } = item;
  if (!boldPhrases || boldPhrases.length === 0) {
    return <span>{text}</span>;
  }

  interface MatchRange {
    start: number;
    end: number;
    text: string;
  }

  const matches: MatchRange[] = [];
  for (const phrase of boldPhrases) {
    let startIndex = 0;
    while ((startIndex = text.indexOf(phrase, startIndex)) !== -1) {
      matches.push({
        start: startIndex,
        end: startIndex + phrase.length,
        text: phrase,
      });
      startIndex += phrase.length;
    }
  }

  matches.sort((a, b) => a.start - b.start);

  const nonOverlapping: MatchRange[] = [];
  let lastEnd = 0;
  for (const match of matches) {
    if (match.start >= lastEnd) {
      nonOverlapping.push(match);
      lastEnd = match.end;
    }
  }

  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  nonOverlapping.forEach((m, i) => {
    if (m.start > currentIndex) {
      parts.push(text.slice(currentIndex, m.start));
    }
    parts.push(
      <strong key={`bold-${i}`} className="font-bold-accent">
        {m.text}
      </strong>,
    );
    currentIndex = m.end;
  });

  if (currentIndex < text.length) {
    parts.push(text.slice(currentIndex));
  }

  return <span>{parts}</span>;
};

const SectionHeader: React.FC<{
  title: string;
  useGradient: boolean;
  primaryColor: string;
  icon?: React.ReactNode;
}> = ({ title, useGradient, primaryColor, icon }) => {
  return (
    <div className="section-header-wrap">
      <div className="section-title-row">
        {icon && <span className="section-icon">{icon}</span>}
        <h2
          className={`section-title ${useGradient ? "gradient-text" : ""}`}
          style={!useGradient ? { color: primaryColor } : undefined}
        >
          {title}
        </h2>
      </div>
      <div
        className="section-divider-bar"
        style={
          useGradient
            ? { background: "var(--cv-gradient)" }
            : { backgroundColor: primaryColor }
        }
      />
    </div>
  );
};

// Skill Badge Renderer for Modern & Creative templates
const SkillPill: React.FC<{ name: string; primaryColor: string }> = ({
  name,
  primaryColor,
}) => (
  <span
    className="skill-pill"
    style={{
      borderColor: `${primaryColor}33`,
      color: "#1e293b",
    }}
  >
    {name.trim()}
  </span>
);

export const ResumePage1: React.FC<{
  data: CVData;
  primaryColor: string;
  gradient: string;
  useGradient: boolean;
  templateId: string;
}> = ({ data, primaryColor, gradient, useGradient, templateId }) => {
  const isSidebar = templateId === "sidebar";

  return (
    <div
      className={`resume-sheet resume-page-1 template-${templateId}`}
      id="resume-page-1"
      style={
        {
          "--cv-primary": primaryColor,
          "--cv-gradient": gradient,
        } as React.CSSProperties
      }
    >
      {/* Decorative Border Frame for Bordered Monogram Template */}
      {templateId === "bordered" && (
        <div className="bordered-frame-decor">
          <div className="monogram-crest" style={{ color: primaryColor }}>
            [ N · A ]
          </div>
        </div>
      )}

      {isSidebar ? (
        /* 2-Column Sidebar Layout for Page 1 */
        <div className="sidebar-layout-container">
          <aside className="sidebar-column">
            <div
              className="sidebar-avatar"
              style={{
                background: useGradient ? gradient : primaryColor,
              }}
            >
              NA
            </div>

            <div className="sidebar-block">
              <h3 className="sidebar-heading" style={{ color: primaryColor }}>
                CONTACT
              </h3>
              <div className="sidebar-contact-item">
                <MapPin size={13} style={{ color: primaryColor }} />
                <span>{data.personalInfo.location}</span>
              </div>
              <div className="sidebar-contact-item">
                <Phone size={13} style={{ color: primaryColor }} />
                <span>{data.personalInfo.phone}</span>
              </div>
              <div className="sidebar-contact-item">
                <Mail size={13} style={{ color: primaryColor }} />
                <a
                  href={`mailto:${data.personalInfo.email}`}
                  className="resume-link"
                  style={{ color: primaryColor }}
                >
                  {data.personalInfo.email}
                </a>
              </div>
            </div>

            <div className="sidebar-block">
              <h3 className="sidebar-heading" style={{ color: primaryColor }}>
                LINKS
              </h3>
              <div className="sidebar-contact-item">
                <LinkedinIcon size={13} style={{ color: primaryColor }} />
                <a
                  href={data.personalInfo.links[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className="resume-link"
                >
                  LinkedIn
                </a>
              </div>
              <div className="sidebar-contact-item">
                <GithubIcon size={13} style={{ color: primaryColor }} />
                <a
                  href={data.personalInfo.links[1].url}
                  target="_blank"
                  rel="noreferrer"
                  className="resume-link"
                >
                  GitHub
                </a>
              </div>
              <div className="sidebar-contact-item">
                <Globe size={13} style={{ color: primaryColor }} />
                <a
                  href={data.personalInfo.links[2].url}
                  target="_blank"
                  rel="noreferrer"
                  className="resume-link"
                >
                  Portfolio
                </a>
              </div>
            </div>

            <div className="sidebar-block">
              <h3 className="sidebar-heading" style={{ color: primaryColor }}>
                CORE SKILLS
              </h3>
              {data.skills.slice(0, 4).map((s, idx) => (
                <div key={idx} className="sidebar-skill-group">
                  <div className="sidebar-skill-label">{s.category}</div>
                  <div className="sidebar-pills-wrap">
                    {s.items.split(",").map((it, i) => (
                      <SkillPill
                        key={i}
                        name={it}
                        primaryColor={primaryColor}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="sidebar-block">
              <h3 className="sidebar-heading" style={{ color: primaryColor }}>
                INTERESTS
              </h3>
              <p className="sidebar-text">{data.interests[0].items}</p>
            </div>
          </aside>

          <main className="sidebar-main-content">
            <header className="resume-header header-left">
              <h1
                className={`resume-name ${useGradient ? "gradient-text" : ""}`}
                style={!useGradient ? { color: primaryColor } : undefined}
              >
                {data.personalInfo.name}
              </h1>
              <p className="resume-subtitle">{data.personalInfo.title}</p>
            </header>

            {/* PROFESSIONAL SUMMARY */}
            <section className="resume-section">
              <SectionHeader
                title="PROFESSIONAL SUMMARY"
                useGradient={useGradient}
                primaryColor={primaryColor}
              />
              <p className="section-paragraph">{data.summary}</p>
            </section>

            {/* PROFESSIONAL EXPERIENCE */}
            <section className="resume-section">
              <SectionHeader
                title="PROFESSIONAL EXPERIENCE"
                useGradient={useGradient}
                primaryColor={primaryColor}
              />
              <div className="experience-list">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="experience-item">
                    <h3 className="item-role">{exp.role}</h3>
                    <p className="item-subheading">
                      {exp.company} | {exp.period}
                    </p>
                    <ul className="bullet-list">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="bullet-item">
                          <FormattedText item={bullet} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS (Page 1) */}
            <section className="resume-section">
              <SectionHeader
                title="PROJECTS"
                useGradient={useGradient}
                primaryColor={primaryColor}
              />
              <div className="projects-list">
                {data.projectsPage1.map((proj, idx) => (
                  <div key={idx} className="project-item">
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-tech">
                      <em>Technologies: {proj.technologies}</em>
                    </p>
                    <ul className="bullet-list">
                      {proj.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="bullet-item">
                          <FormattedText item={bullet} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      ) : (
        /* Standard / Full Width Layouts */
        <>
          {/* Top Header */}
          <header className={`resume-header header-${templateId}`}>
            <div className="header-top-row">
              <h1
                className={`resume-name ${useGradient ? "gradient-text" : ""}`}
                style={!useGradient ? { color: primaryColor } : undefined}
              >
                {data.personalInfo.name}
              </h1>
              {templateId === "classic" && (
                <div
                  className="header-top-accent"
                  style={
                    useGradient
                      ? { background: "var(--cv-gradient)" }
                      : { backgroundColor: primaryColor }
                  }
                  aria-hidden="true"
                />
              )}
            </div>
            <p className="resume-subtitle">{data.personalInfo.title}</p>
            <p className="resume-contact">
              <span>{data.personalInfo.location}</span> |{" "}
              <span>{data.personalInfo.phone}</span> |{" "}
              <a
                href={`mailto:${data.personalInfo.email}`}
                className="resume-link"
                style={{ color: primaryColor }}
              >
                {data.personalInfo.email}
              </a>
            </p>
            <p className="resume-links">
              <span>LinkedIn: </span>
              <a
                href={data.personalInfo.links[0].url}
                target="_blank"
                rel="noreferrer"
                className="resume-link"
                style={{ color: primaryColor }}
              >
                {data.personalInfo.links[0].display}
              </a>
              <span> | GitHub: </span>
              <a
                href={data.personalInfo.links[1].url}
                target="_blank"
                rel="noreferrer"
                className="resume-link"
                style={{ color: primaryColor }}
              >
                {data.personalInfo.links[1].display}
              </a>
              <span> | Portfolio: </span>
              <a
                href={data.personalInfo.links[2].url}
                target="_blank"
                rel="noreferrer"
                className="resume-link"
                style={{ color: primaryColor }}
              >
                {data.personalInfo.links[2].display}
              </a>
            </p>
          </header>

          {/* Section: PROFESSIONAL SUMMARY */}
          <section className="resume-section">
            <SectionHeader
              title="PROFESSIONAL SUMMARY"
              useGradient={useGradient}
              primaryColor={primaryColor}
            />
            <p className="section-paragraph">{data.summary}</p>
          </section>

          {/* Section: TECHNICAL SKILLS */}
          <section className="resume-section">
            <SectionHeader
              title="TECHNICAL SKILLS"
              useGradient={useGradient}
              primaryColor={primaryColor}
            />
            {templateId === "modern" || templateId === "creative" ? (
              <div className="skills-pill-container">
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="skill-pill-row">
                    <span className="skill-category">{skill.category}: </span>
                    <div className="pill-list">
                      {skill.items.split(",").map((it, i) => (
                        <SkillPill
                          key={i}
                          name={it}
                          primaryColor={primaryColor}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="skills-list">
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="skill-row">
                    <span className="skill-category">{skill.category}: </span>
                    <span className="skill-items">{skill.items}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section: PROFESSIONAL EXPERIENCE */}
          <section className="resume-section">
            <SectionHeader
              title="PROFESSIONAL EXPERIENCE"
              useGradient={useGradient}
              primaryColor={primaryColor}
            />
            <div className="experience-list">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="experience-item">
                  <div className="item-heading-row">
                    <h3 className="item-role">{exp.role}</h3>
                  </div>
                  <p className="item-subheading">
                    {exp.company} | {exp.period}
                  </p>
                  <ul className="bullet-list">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="bullet-item">
                        <FormattedText item={bullet} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section: PROJECTS (First project on Page 1) */}
          <section className="resume-section">
            <SectionHeader
              title="PROJECTS"
              useGradient={useGradient}
              primaryColor={primaryColor}
            />
            <div className="projects-list">
              {data.projectsPage1.map((proj, idx) => (
                <div key={idx} className="project-item">
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-tech">
                    <em>Technologies: {proj.technologies}</em>
                  </p>
                  <ul className="bullet-list">
                    {proj.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="bullet-item">
                        <FormattedText item={bullet} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export const ResumePage2: React.FC<{
  data: CVData;
  primaryColor: string;
  gradient: string;
  useGradient: boolean;
  templateId: string;
}> = ({ data, primaryColor, gradient, useGradient, templateId }) => {
  const isSidebar = templateId === "sidebar";

  return (
    <div
      className={`resume-sheet resume-page-2 template-${templateId}`}
      id="resume-page-2"
      style={
        {
          "--cv-primary": primaryColor,
          "--cv-gradient": gradient,
        } as React.CSSProperties
      }
    >
      {templateId === "bordered" && (
        <div className="bordered-frame-decor">
          <div className="monogram-crest" style={{ color: primaryColor }}>
            [ N · A ]
          </div>
        </div>
      )}

      {isSidebar ? (
        /* Sidebar Layout for Page 2 */
        <div className="sidebar-layout-container">
          <aside className="sidebar-column">
            <div className="sidebar-block">
              <h3 className="sidebar-heading" style={{ color: primaryColor }}>
                MORE SKILLS
              </h3>
              {data.skills.slice(4).map((s, idx) => (
                <div key={idx} className="sidebar-skill-group">
                  <div className="sidebar-skill-label">{s.category}</div>
                  <div className="sidebar-pills-wrap">
                    {s.items.split(",").map((it, i) => (
                      <SkillPill
                        key={i}
                        name={it}
                        primaryColor={primaryColor}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="sidebar-block">
              <h3 className="sidebar-heading" style={{ color: primaryColor }}>
                EDUCATION
              </h3>
              {data.education.map((edu, idx) => (
                <div key={idx} className="sidebar-edu-item">
                  <div className="sidebar-edu-degree">{edu.degree}</div>
                  <div className="sidebar-edu-school">{edu.institution}</div>
                  <div className="sidebar-edu-date">{edu.details}</div>
                </div>
              ))}
            </div>

            <div className="sidebar-block">
              <h3 className="sidebar-heading" style={{ color: primaryColor }}>
                REFERENCES
              </h3>
              <p className="sidebar-text" style={{ fontStyle: "italic" }}>
                {data.references || "Available Upon Request"}
              </p>
            </div>
          </aside>

          <main className="sidebar-main-content">
            {/* Continuing Projects */}
            <section className="resume-section page2-projects-continuation">
              <div className="projects-list">
                {data.projectsPage2.map((proj, idx) => (
                  <div key={idx} className="project-item">
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-tech">
                      <em>Technologies: {proj.technologies}</em>
                    </p>
                    <ul className="bullet-list">
                      {proj.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="bullet-item">
                          <FormattedText item={bullet} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      ) : (
        /* Standard Layout for Page 2 */
        <>
          {/* Continuing PROJECTS on Page 2 */}
          <section className="resume-section page2-projects-continuation">
            <div className="projects-list">
              {data.projectsPage2.map((proj, idx) => (
                <div key={idx} className="project-item">
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-tech">
                    <em>Technologies: {proj.technologies}</em>
                  </p>
                  <ul className="bullet-list">
                    {proj.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="bullet-item">
                        <FormattedText item={bullet} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section: EDUCATION */}
          <section className="resume-section">
            <SectionHeader
              title="EDUCATION"
              useGradient={useGradient}
              primaryColor={primaryColor}
            />
            <div className="education-list">
              {data.education.map((edu, idx) => (
                <div key={idx} className="education-item">
                  <h3 className="education-degree">{edu.degree}</h3>
                  <p className="education-details">
                    <em>
                      {edu.institution} | {edu.details}
                    </em>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: ADDITIONAL INTEREST */}
          <section className="resume-section">
            <SectionHeader
              title="ADDITIONAL INTEREST"
              useGradient={useGradient}
              primaryColor={primaryColor}
            />
            <div className="interests-list">
              {data.interests.map((interest, idx) => (
                <div key={idx} className="interest-row">
                  <span className="interest-category">
                    {interest.category}:{" "}
                  </span>
                  <span className="interest-items">{interest.items}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: REFERENCES */}
          <section className="resume-section">
            <SectionHeader
              title="REFERENCES"
              useGradient={useGradient}
              primaryColor={primaryColor}
            />
            <p className="section-paragraph references-text">
              <em>{data.references || "Available Upon Request"}</em>
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({
  data = cvData,
  isTwoPageView = true,
  primaryColor = "#1e40af",
  gradient = "linear-gradient(135deg, #1e40af 0%, #0284c7 100%)",
  useGradient = true,
  templateId = "classic",
}) => {
  return (
    <div
      className={`resume-container ${
        isTwoPageView ? "two-page-mode" : "continuous-mode"
      } mode-${templateId}`}
      style={
        {
          "--cv-primary": primaryColor,
          "--cv-gradient": gradient,
        } as React.CSSProperties
      }
    >
      <div className="page-wrapper">
        <div className="page-sheet-header-label no-print">Page 1 of 2</div>
        <ResumePage1
          data={data}
          primaryColor={primaryColor}
          gradient={gradient}
          useGradient={useGradient}
          templateId={templateId}
        />
      </div>

      <div className="page-separator-screen no-print" />

      <div className="page-wrapper">
        <div className="page-sheet-header-label no-print">Page 2 of 2</div>
        <ResumePage2
          data={data}
          primaryColor={primaryColor}
          gradient={gradient}
          useGradient={useGradient}
          templateId={templateId}
        />
      </div>
    </div>
  );
};
