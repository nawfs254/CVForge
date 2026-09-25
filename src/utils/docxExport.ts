import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ExternalHyperlink,
  AlignmentType,
  BorderStyle,
} from "docx";
import { cvData, CVData, BulletItem } from "../data/cvData";

/**
 * Splits a text by bold phrases and returns formatted TextRuns for DOCX
 */
function createFormattedRuns(
  item: BulletItem,
  font = "Georgia",
  size = 20,
): TextRun[] {
  const { text, boldPhrases } = item;
  if (!boldPhrases || boldPhrases.length === 0) {
    return [new TextRun({ text, font, size })];
  }

  // Find all matches with their indices
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

  const runs: TextRun[] = [];
  let currentIndex = 0;

  for (const m of nonOverlapping) {
    if (m.start > currentIndex) {
      runs.push(
        new TextRun({
          text: text.slice(currentIndex, m.start),
          font,
          size,
        }),
      );
    }
    runs.push(
      new TextRun({
        text: m.text,
        bold: true,
        font,
        size,
      }),
    );
    currentIndex = m.end;
  }

  if (currentIndex < text.length) {
    runs.push(
      new TextRun({
        text: text.slice(currentIndex),
        font,
        size,
      }),
    );
  }

  return runs;
}

/**
 * Creates a section heading paragraph with an underline border using the primary color
 */
function createSectionHeader(title: string, colorHex: string): Paragraph {
  return new Paragraph({
    spacing: { before: 180, after: 80 },
    border: {
      bottom: {
        color: colorHex,
        space: 2,
        style: BorderStyle.SINGLE,
        size: 8,
      },
    },
    children: [
      new TextRun({
        text: title,
        bold: true,
        font: "Georgia",
        size: 21, // ~10.5pt
        color: colorHex,
      }),
    ],
  });
}

/**
 * Creates a bullet paragraph
 */
function createBulletParagraph(item: BulletItem): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 40, after: 40, line: 276 },
    children: createFormattedRuns(item, "Georgia", 19), // 9.5pt
  });
}

export async function exportCVToDocx(
  data: CVData = cvData,
  primaryColor: string = "#1e40af",
): Promise<Blob> {
  const colorHex = primaryColor.replace("#", "");

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Georgia",
            size: 20,
            color: "111827",
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 in
              bottom: 720,
              left: 720,
              right: 720,
            },
          },
        },
        children: [
          // Header: Name
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 60 },
            children: [
              new TextRun({
                text: data.personalInfo.name,
                bold: true,
                font: "Georgia",
                size: 38, // 19pt
                color: colorHex,
              }),
            ],
          }),

          // Header: Subtitle
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 80 },
            children: [
              new TextRun({
                text: data.personalInfo.title,
                bold: true,
                font: "Georgia",
                size: 21, // 10.5pt
              }),
            ],
          }),

          // Header: Location | Phone | Email
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 40 },
            children: [
              new TextRun({
                text: `${data.personalInfo.location} | ${data.personalInfo.phone} | `,
                font: "Georgia",
                size: 19,
              }),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: data.personalInfo.email,
                    font: "Georgia",
                    size: 19,
                    color: colorHex,
                    underline: {},
                  }),
                ],
                link: `mailto:${data.personalInfo.email}`,
              }),
            ],
          }),

          // Header: Links
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 120 },
            children: [
              new TextRun({
                text: "LinkedIn: ",
                font: "Georgia",
                size: 19,
              }),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: data.personalInfo.links[0].display,
                    font: "Georgia",
                    size: 19,
                    color: colorHex,
                    underline: {},
                  }),
                ],
                link: data.personalInfo.links[0].url,
              }),
              new TextRun({
                text: " | GitHub: ",
                font: "Georgia",
                size: 19,
              }),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: data.personalInfo.links[1].display,
                    font: "Georgia",
                    size: 19,
                    color: colorHex,
                    underline: {},
                  }),
                ],
                link: data.personalInfo.links[1].url,
              }),
              new TextRun({
                text: " | Portfolio: ",
                font: "Georgia",
                size: 19,
              }),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: data.personalInfo.links[2].display,
                    font: "Georgia",
                    size: 19,
                    color: colorHex,
                    underline: {},
                  }),
                ],
                link: data.personalInfo.links[2].url,
              }),
            ],
          }),

          // PROFESSIONAL SUMMARY
          createSectionHeader("PROFESSIONAL SUMMARY", colorHex),
          new Paragraph({
            spacing: { before: 40, after: 100, line: 276 },
            children: [
              new TextRun({
                text: data.summary,
                font: "Georgia",
                size: 19,
              }),
            ],
          }),

          // TECHNICAL SKILLS
          createSectionHeader("TECHNICAL SKILLS", colorHex),
          ...data.skills.map(
            (skill) =>
              new Paragraph({
                spacing: { before: 20, after: 20, line: 260 },
                children: [
                  new TextRun({
                    text: `${skill.category}: `,
                    bold: true,
                    font: "Georgia",
                    size: 19,
                  }),
                  new TextRun({
                    text: skill.items,
                    font: "Georgia",
                    size: 19,
                  }),
                ],
              }),
          ),

          // PROFESSIONAL EXPERIENCE
          createSectionHeader("PROFESSIONAL EXPERIENCE", colorHex),
          ...data.experience.flatMap((exp, idx) => [
            new Paragraph({
              spacing: { before: idx === 0 ? 40 : 100, after: 20 },
              children: [
                new TextRun({
                  text: exp.role,
                  bold: true,
                  font: "Georgia",
                  size: 20,
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 0, after: 40 },
              children: [
                new TextRun({
                  text: `${exp.company} | ${exp.period}`,
                  italics: true,
                  font: "Georgia",
                  size: 19,
                }),
              ],
            }),
            ...exp.bullets.map(createBulletParagraph),
          ]),

          // PROJECTS (Page 1 project)
          createSectionHeader("PROJECTS", colorHex),
          ...data.projectsPage1.flatMap((proj, idx) => [
            new Paragraph({
              spacing: { before: idx === 0 ? 40 : 100, after: 20 },
              children: [
                new TextRun({
                  text: proj.title,
                  bold: true,
                  font: "Georgia",
                  size: 20,
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 0, after: 40 },
              children: [
                new TextRun({
                  text: "Technologies: ",
                  italics: true,
                  font: "Georgia",
                  size: 19,
                }),
                new TextRun({
                  text: proj.technologies,
                  italics: true,
                  font: "Georgia",
                  size: 19,
                }),
              ],
            }),
            ...proj.bullets.map(createBulletParagraph),
          ]),

          // Remaining Projects (Page 2)
          ...data.projectsPage2.flatMap((proj) => [
            new Paragraph({
              spacing: { before: 100, after: 20 },
              children: [
                new TextRun({
                  text: proj.title,
                  bold: true,
                  font: "Georgia",
                  size: 20,
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 0, after: 40 },
              children: [
                new TextRun({
                  text: "Technologies: ",
                  italics: true,
                  font: "Georgia",
                  size: 19,
                }),
                new TextRun({
                  text: proj.technologies,
                  italics: true,
                  font: "Georgia",
                  size: 19,
                }),
              ],
            }),
            ...proj.bullets.map(createBulletParagraph),
          ]),

          // EDUCATION
          createSectionHeader("EDUCATION", colorHex),
          ...data.education.flatMap((edu, idx) => [
            new Paragraph({
              spacing: { before: idx === 0 ? 40 : 80, after: 20 },
              children: [
                new TextRun({
                  text: edu.degree,
                  bold: true,
                  font: "Georgia",
                  size: 20,
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 0, after: 40 },
              children: [
                new TextRun({
                  text: `${edu.institution} | ${edu.details}`,
                  italics: true,
                  font: "Georgia",
                  size: 19,
                }),
              ],
            }),
          ]),

          // ADDITIONAL INTEREST
          createSectionHeader("ADDITIONAL INTEREST", colorHex),
          ...data.interests.map(
            (interest) =>
              new Paragraph({
                spacing: { before: 40, after: 40 },
                children: [
                  new TextRun({
                    text: `${interest.category}: `,
                    bold: true,
                    font: "Georgia",
                    size: 19,
                  }),
                  new TextRun({
                    text: interest.items,
                    font: "Georgia",
                    size: 19,
                  }),
                ],
              }),
          ),

          // REFERENCES
          createSectionHeader("REFERENCES", colorHex),
          new Paragraph({
            spacing: { before: 40, after: 40 },
            children: [
              new TextRun({
                text: data.references || "Available Upon Request",
                font: "Georgia",
                size: 19,
                italics: true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}
