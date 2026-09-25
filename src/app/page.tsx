"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileDown,
  Printer,
  Copy,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Layers,
  Palette,
  FileText,
  Sliders,
  LayoutTemplate,
} from "lucide-react";
import { cvData } from "../data/cvData";
import { exportCVToDocx } from "../utils/docxExport";
import { ResumeDocument } from "../components/ResumeDocument";
import { TEMPLATE_OPTIONS, TemplateOption } from "../data/templates";

interface ThemePreset {
  id: string;
  name: string;
  primary: string;
  gradient: string;
}

// Curated 4 top-tier preset gradients + custom color picker
const THEME_PRESETS: ThemePreset[] = [
  {
    id: "sapphire",
    name: "Sapphire Ocean",
    primary: "#1e3a8a",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)",
  },
  {
    id: "emerald",
    name: "Emerald Aurora",
    primary: "#064e3b",
    gradient: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
  },
  {
    id: "crimson",
    name: "Crimson Ruby",
    primary: "#881337",
    gradient: "linear-gradient(135deg, #881337 0%, #e11d48 100%)",
  },
  {
    id: "amethyst",
    name: "Royal Amethyst",
    primary: "#4c1d95",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #9333ea 100%)",
  },
];

export default function Home() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateOption>(
    TEMPLATE_OPTIONS[0],
  );
  const [currentTheme, setCurrentTheme] = useState<ThemePreset>(
    THEME_PRESETS[0],
  );
  const [useGradient, setUseGradient] = useState<boolean>(true);
  const [isTwoPageView, setIsTwoPageView] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [autoScale, setAutoScale] = useState<number>(1);
  const [contentHeight, setContentHeight] = useState<number>(2340);
  const resumeContainerRef = useRef<HTMLDivElement>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isExportingDocx, setIsExportingDocx] = useState(false);

  // Auto-fit scale to viewport width on mobile/tablet devices
  useEffect(() => {
    const updateScale = () => {
      // 210mm in standard CSS 96dpi pixels is ~794px
      const a4Width = 794;
      const screenWidth = window.innerWidth;
      if (screenWidth < 840) {
        const padding = screenWidth < 480 ? 16 : 28;
        const available = screenWidth - padding;
        const fitRatio = Math.min(available / a4Width, 1);
        setAutoScale(Math.round(fitRatio * 1000) / 1000);
      } else {
        setAutoScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Track height of resume document dynamically to size outer wrapper accurately
  useEffect(() => {
    if (!resumeContainerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height > 0) {
          setContentHeight(Math.round(entry.contentRect.height));
        }
      }
    });
    ro.observe(resumeContainerRef.current);
    return () => ro.disconnect();
  }, [activeTemplate, isTwoPageView]);

  const effectiveScale = Math.round(zoomLevel * autoScale * 100) / 100;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSelectTemplate = (template: TemplateOption) => {
    setActiveTemplate(template);
    showToast(`Switched to "${template.name}" layout!`);
  };

  const handleSelectTheme = (theme: ThemePreset) => {
    setCurrentTheme(theme);
    showToast(`Applied ${theme.name} theme!`);
  };

  const handleCustomColorChange = (hex: string) => {
    setCurrentTheme({
      id: "custom",
      name: "Custom Color",
      primary: hex,
      gradient: `linear-gradient(135deg, ${hex} 0%, #38bdf8 100%)`,
    });
  };

  const handleExportDocx = async () => {
    try {
      setIsExportingDocx(true);
      showToast("Generating DOCX with selected theme styling...");
      const blob = await exportCVToDocx(cvData, currentTheme.primary);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Nawfs_Ul_Ahsun_CV_${activeTemplate.id}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("CV exported as DOCX successfully!");
    } catch (err) {
      console.error("Failed to export docx:", err);
      showToast("Error generating DOCX document.");
    } finally {
      setIsExportingDocx(false);
    }
  };

  const handlePrintPdf = () => {
    showToast("Opening Print / Save as PDF dialog...");
    setTimeout(() => {
      window.print();
    }, 250);
  };

  const handleCopyAtsText = () => {
    const plainText = `
${cvData.personalInfo.name}
${cvData.personalInfo.title}
${cvData.personalInfo.location} | ${cvData.personalInfo.phone} | ${cvData.personalInfo.email}
LinkedIn: ${cvData.personalInfo.links[0].url} | GitHub: ${cvData.personalInfo.links[1].url} | Portfolio: ${cvData.personalInfo.links[2].url}

PROFESSIONAL SUMMARY
${cvData.summary}

TECHNICAL SKILLS
${cvData.skills.map((s) => `${s.category}: ${s.items}`).join("\n")}

PROFESSIONAL EXPERIENCE
${cvData.experience
  .map(
    (e) =>
      `${e.role}\n${e.company} | ${e.period}\n${e.bullets.map((b) => `• ${b.text}`).join("\n")}`,
  )
  .join("\n\n")}

PROJECTS
${[...cvData.projectsPage1, ...cvData.projectsPage2]
  .map(
    (p) =>
      `${p.title}\nTechnologies: ${p.technologies}\n${p.bullets.map((b) => `• ${b.text}`).join("\n")}`,
  )
  .join("\n\n")}

EDUCATION
${cvData.education.map((edu) => `${edu.degree}\n${edu.institution} | ${edu.details}`).join("\n\n")}

ADDITIONAL INTEREST
${cvData.interests.map((i) => `${i.category}: ${i.items}`).join("\n")}

REFERENCES
${cvData.references || "Available Upon Request"}
    `.trim();

    navigator.clipboard.writeText(plainText).then(() => {
      showToast("Plain text CV copied to clipboard for ATS!");
    });
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => {
      const next = Math.round((prev + delta) * 10) / 10;
      return Math.min(Math.max(next, 0.5), 1.5);
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Application Header: Left (Brand), Center (Buttons), Right (Colors) */}
      <header className="app-header single-row-header no-print">
        {/* Left: Brand section */}
        <div className="brand-section">
          <div
            className="brand-icon-wrapper"
            style={{
              background: currentTheme.gradient,
              boxShadow: `0 0 12px ${currentTheme.primary}77`,
            }}
          >
            <FileText size={18} />
          </div>
          <div className="brand-text-block">
            <div className="brand-title">CVForge AI</div>
            <div className="brand-sub">Nawfs Ul Ahsun</div>
          </div>
        </div>

        {/* Center: Action Buttons with uniform heights */}
        <div className="toolbar-center-actions">
          {/* Zoom controls */}
          <div className="action-control-item btn-group compact-group">
            <button
              onClick={() => handleZoom(-0.1)}
              className="toolbar-btn compact-btn"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="zoom-text">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => handleZoom(0.1)}
              className="toolbar-btn compact-btn"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          {/* View mode toggle */}
          <div className="action-control-item btn-group compact-group">
            <button
              onClick={() => setIsTwoPageView(true)}
              className={`toolbar-btn compact-btn ${
                isTwoPageView ? "active" : ""
              }`}
              title="2-Page View"
            >
              <Layers size={13} />
              <span>2-Page</span>
            </button>
            <button
              onClick={() => setIsTwoPageView(false)}
              className={`toolbar-btn compact-btn ${
                !isTwoPageView ? "active" : ""
              }`}
              title="Continuous View"
            >
              <span>Scroll</span>
            </button>
          </div>

          {/* Copy Plain Text */}
          <button
            onClick={handleCopyAtsText}
            className="action-control-item btn-secondary-export uniform-btn"
            title="Copy CV Plain Text (ATS-Friendly)"
          >
            <Copy size={14} />
            <span>Copy ATS</span>
          </button>

          {/* Export PDF / Print */}
          <button
            onClick={handlePrintPdf}
            className="action-control-item btn-secondary-export uniform-btn"
            title="Save as PDF or Print"
          >
            <Printer size={14} />
            <span>PDF</span>
          </button>

          {/* Export as DOCX */}
          {/*
          <button
            onClick={handleExportDocx}
            disabled={isExportingDocx}
            className="action-control-item btn-primary-export uniform-btn primary-btn"
            style={{
              background: currentTheme.gradient,
              boxShadow: `0 4px 12px ${currentTheme.primary}55`,
            }}
            title="Export as Microsoft Word (.docx)"
          >
            <FileDown size={15} />
            <span>
              {isExportingDocx ? "Exporting..." : "Export as CV / docx"}
            </span>
          </button>
          */}
        </div>

        {/* Right: Colors & Gradient Picker */}
        <div className="toolbar-right-palette">
          <div className="color-palette-bar compact-palette">
            <span className="palette-label" title="Theme Color">
              <Palette size={13} />
            </span>
            <div className="palette-swatches">
              {THEME_PRESETS.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleSelectTheme(theme)}
                  className={`color-swatch-btn ${
                    currentTheme.id === theme.id ? "selected" : ""
                  }`}
                  style={{ background: theme.gradient }}
                  title={`${theme.name} (Click to apply)`}
                />
              ))}

              {/* Custom Color Input */}
              <label className="custom-color-picker" title="Pick Custom Color">
                <input
                  type="color"
                  value={currentTheme.primary}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="color-input-native"
                />
                <span
                  className="custom-color-indicator"
                  style={{ backgroundColor: currentTheme.primary }}
                />
              </label>
            </div>

            {/* Toggle Gradient Mode vs Solid Color */}
            <button
              onClick={() => setUseGradient(!useGradient)}
              className={`gradient-toggle-btn compact-toggle ${
                useGradient ? "active" : ""
              }`}
              title="Toggle Gradient Text vs Solid Text"
            >
              <Sliders size={12} />
              <span>{useGradient ? "Gradient" : "Solid"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Quick Template Switcher Bar */}
      <nav
        className="template-pills-bar no-print"
        aria-label="Template Presets"
      >
        <div className="pills-bar-content">
          <span className="pills-bar-title">
            <LayoutTemplate size={13} style={{ color: "#60a5fa" }} />
            <span>Design Styles:</span>
          </span>
          <div className="pills-scroll-container">
            {TEMPLATE_OPTIONS.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => handleSelectTemplate(tmpl)}
                className={`template-pill-chip ${
                  activeTemplate.id === tmpl.id ? "active" : ""
                }`}
                style={
                  activeTemplate.id === tmpl.id
                    ? {
                        borderColor: currentTheme.primary,
                        boxShadow: `0 0 10px ${currentTheme.primary}44`,
                      }
                    : undefined
                }
              >
                <span className="pill-chip-name">{tmpl.name}</span>
                {tmpl.badge && (
                  <span className="pill-chip-badge">{tmpl.badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Workbench Canvas */}
      <main className="resume-workbench">
        <div
          className="resume-scaler-outer"
          style={{
            width: `${Math.round(794 * effectiveScale)}px`,
            height: `${Math.round(contentHeight * effectiveScale)}px`,
          }}
        >
          <div
            ref={resumeContainerRef}
            className="resume-scaler-inner"
            style={{
              width: "794px",
              transform: `scale(${effectiveScale})`,
              transformOrigin: "top left",
            }}
          >
            <ResumeDocument
              data={cvData}
              isTwoPageView={isTwoPageView}
              primaryColor={currentTheme.primary}
              gradient={currentTheme.gradient}
              useGradient={useGradient}
              templateId={activeTemplate.id}
            />
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <aside
          className="toast-banner no-print"
          role="status"
          aria-live="polite"
        >
          <Sparkles size={16} color="#60a5fa" />
          <span>{toastMessage}</span>
        </aside>
      )}
    </div>
  );
}
