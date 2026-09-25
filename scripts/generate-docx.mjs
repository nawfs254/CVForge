import fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ExternalHyperlink,
  AlignmentType,
  BorderStyle,
} from "docx";

function createSectionHeader(title) {
  return new Paragraph({
    spacing: { before: 180, after: 80 },
    border: {
      bottom: {
        color: "999999",
        space: 2,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
    children: [
      new TextRun({
        text: title,
        bold: true,
        font: "Georgia",
        size: 21,
      }),
    ],
  });
}

function createBulletParagraph(text, boldPhrases = []) {
  const runs = [];
  if (!boldPhrases.length) {
    runs.push(new TextRun({ text, font: "Georgia", size: 19 }));
  } else {
    let lastIdx = 0;
    const sorted = [...boldPhrases].sort(
      (a, b) => text.indexOf(a) - text.indexOf(b),
    );
    for (const phrase of sorted) {
      const idx = text.indexOf(phrase, lastIdx);
      if (idx !== -1) {
        if (idx > lastIdx) {
          runs.push(
            new TextRun({
              text: text.slice(lastIdx, idx),
              font: "Georgia",
              size: 19,
            }),
          );
        }
        runs.push(
          new TextRun({ text: phrase, bold: true, font: "Georgia", size: 19 }),
        );
        lastIdx = idx + phrase.length;
      }
    }
    if (lastIdx < text.length) {
      runs.push(
        new TextRun({ text: text.slice(lastIdx), font: "Georgia", size: 19 }),
      );
    }
  }

  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 40, after: 40, line: 276 },
    children: runs,
  });
}

async function buildDocx() {
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
              top: 720,
              bottom: 720,
              left: 720,
              right: 720,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 60 },
            children: [
              new TextRun({
                text: "NAWFS UL AHSUN",
                bold: true,
                font: "Georgia",
                size: 38,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 80 },
            children: [
              new TextRun({
                text: "SOFTWARE ENGINEER | FULL-STACK DEVELOPER",
                bold: true,
                font: "Georgia",
                size: 21,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 40 },
            children: [
              new TextRun({
                text: "Dhaka, Bangladesh | +880 1704 259187 | ",
                font: "Georgia",
                size: 19,
              }),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: "nawfs.cs254@gmail.com",
                    font: "Georgia",
                    size: 19,
                    color: "1A0DAB",
                    underline: {},
                  }),
                ],
                link: "mailto:nawfs.cs254@gmail.com",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 120 },
            children: [
              new TextRun({ text: "LinkedIn: ", font: "Georgia", size: 19 }),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: "linkedin.com/in/nawfs-ul-ahsun",
                    font: "Georgia",
                    size: 19,
                    color: "1A0DAB",
                    underline: {},
                  }),
                ],
                link: "https://www.linkedin.com/in/nawfs-ul-ahsun",
              }),
              new TextRun({ text: " | GitHub: ", font: "Georgia", size: 19 }),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: "github.com/nawfs254",
                    font: "Georgia",
                    size: 19,
                    color: "1A0DAB",
                    underline: {},
                  }),
                ],
                link: "https://github.com/nawfs254",
              }),
              new TextRun({
                text: " | Portfolio: ",
                font: "Georgia",
                size: 19,
              }),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: "nawfs.is-a.dev",
                    font: "Georgia",
                    size: 19,
                    color: "1A0DAB",
                    underline: {},
                  }),
                ],
                link: "https://nawfs.is-a.dev",
              }),
            ],
          }),

          createSectionHeader("PROFESSIONAL SUMMARY"),
          new Paragraph({
            spacing: { before: 40, after: 100, line: 276 },
            children: [
              new TextRun({
                text: "Software Engineer experienced in building enterprise ERP and healthcare applications using React.js, Java, Spring Boot, JavaScript, and Microsoft SQL Server. Skilled in full-stack development, database optimization, dashboards, reporting, and enterprise application development. Contributed to new product initiatives including React.js-based solutions, hotel management software, and ZAB Framework developer tools.",
                font: "Georgia",
                size: 19,
              }),
            ],
          }),

          createSectionHeader("TECHNICAL SKILLS"),
          new Paragraph({
            spacing: { before: 20, after: 20, line: 260 },
            children: [
              new TextRun({
                text: "Programming Languages: ",
                bold: true,
                font: "Georgia",
                size: 19,
              }),
              new TextRun({
                text: "Java, JavaScript, Python, SQL",
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 20, after: 20, line: 260 },
            children: [
              new TextRun({
                text: "Frontend: ",
                bold: true,
                font: "Georgia",
                size: 19,
              }),
              new TextRun({
                text: "React.js, Next.js, HTML, CSS, Tailwind CSS, Material UI",
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 20, after: 20, line: 260 },
            children: [
              new TextRun({
                text: "Backend / Enterprise: ",
                bold: true,
                font: "Georgia",
                size: 19,
              }),
              new TextRun({
                text: "Spring Boot, Node, Express, Java-based Zab Framework, ERP Systems",
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 20, after: 20, line: 260 },
            children: [
              new TextRun({
                text: "Databases: ",
                bold: true,
                font: "Georgia",
                size: 19,
              }),
              new TextRun({
                text: "Microsoft SQL Server, MySQL, MongoDB",
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 20, after: 20, line: 260 },
            children: [
              new TextRun({
                text: "Reporting / Design: ",
                bold: true,
                font: "Georgia",
                size: 19,
              }),
              new TextRun({
                text: "Crystal Reports, Figma, Adobe Illustrator, Photoshop",
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 20, after: 20, line: 260 },
            children: [
              new TextRun({
                text: "Technical Tools: ",
                bold: true,
                font: "Georgia",
                size: 19,
              }),
              new TextRun({
                text: "MS Word, MS Excel, MS PowerPoint",
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 20, after: 20, line: 260 },
            children: [
              new TextRun({
                text: "Creative: ",
                bold: true,
                font: "Georgia",
                size: 19,
              }),
              new TextRun({
                text: "Adobe Premiere Pro, Adobe Audition, FL Studio, Figma, Photoshop, Illustrator",
                font: "Georgia",
                size: 19,
              }),
            ],
          }),

          createSectionHeader("PROFESSIONAL EXPERIENCE"),
          new Paragraph({
            spacing: { before: 40, after: 20 },
            children: [
              new TextRun({
                text: "JUNIOR SOFTWARE ENGINEER",
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
                text: "Orange Solutions LTD - United Group | July 2024 – Present",
                italics: true,
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          createBulletParagraph(
            "Developed the company's first React.js-based Prescription & Inventory Management System, establishing React.js as a technology for future client projects.",
            [
              "React.js-based Prescription & Inventory Management System",
              "React.js as a technology",
            ],
          ),
          createBulletParagraph(
            "Contributed to a Hotel Management System using the ZAB Framework, expanding the company's product portfolio toward the hotel management software market.",
            ["Hotel Management System using the ZAB Framework"],
          ),
          createBulletParagraph(
            "Developed a VS Code extension and formatter for ZAB development, making ZAB coding faster, easier, and more consistent for developers.",
            ["VS Code extension and formatter for ZAB development"],
          ),
          createBulletParagraph(
            "Developed ERP dashboards, dynamic reports, HRD features, and system enhancements, improving workflow efficiency and expanding the capabilities of the company's ERP platform.",
            [
              "ERP dashboards, dynamic reports, HRD features, and system enhancements",
            ],
          ),

          new Paragraph({
            spacing: { before: 100, after: 20 },
            children: [
              new TextRun({
                text: "STUDENT COORDINATOR",
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
                text: "RIMT University, Punjab, India | July 2022 - July 2023",
                italics: true,
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          createBulletParagraph(
            "Represented Bangladeshi students and coordinated with the International Admission Department to provide guidance and support.",
            ["Bangladeshi students", "International Admission Department"],
          ),
          createBulletParagraph(
            "Facilitated communication between students and university departments, helping newcomers navigate admission, onboarding, and university processes.",
            [
              "Facilitated communication between students and university departments",
            ],
          ),

          createSectionHeader("PROJECTS"),
          new Paragraph({
            spacing: { before: 40, after: 20 },
            children: [
              new TextRun({
                text: "E-Prescription & Healthcare Management System",
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
                text: "React, Material UI, Tailwind CSS, Spring Boot, Microsoft SQL Server",
                italics: true,
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          createBulletParagraph(
            "Developed frontend and backend features for an enterprise healthcare management system.",
            [
              "enterprise healthcare management system for United Hospital Limited",
            ],
          ),
          createBulletParagraph(
            "Implemented patient, prescription, medication, template, and reporting modules, integrating responsive UI with backend services and SQL Server.",
            [
              "patient, prescription, medication, template, and reporting modules",
            ],
          ),

          new Paragraph({
            spacing: { before: 100, after: 20 },
            children: [
              new TextRun({
                text: "Hotel Management System",
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
                text: "ZAB Framework, Java, Microsoft SQL Server",
                italics: true,
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          createBulletParagraph(
            "Contributing to the end-to-end hotel management workflow, covering core operational processes from front desk operations to supporting management functions.",
            ["end-to-end hotel management workflow"],
          ),
          createBulletParagraph(
            "Developed the Front Desk Dashboard to provide centralized access to hotel operations and improve day-to-day workflow visibility.",
            ["Front Desk Dashboard"],
          ),

          new Paragraph({
            spacing: { before: 100, after: 20 },
            children: [
              new TextRun({
                text: "E-Prescription & Medical Store Management",
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
                text: "React, Material UI, Tailwind CSS, Spring Boot, Microsoft SQL Server",
                italics: true,
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          createBulletParagraph(
            "Developed a prescription and inventory management system, supporting prescription workflows and medical store operations.",
            ["prescription and inventory management system"],
          ),
          createBulletParagraph(
            "Led frontend development using React, Material UI, and Tailwind CSS, integrated with Spring Boot services and Microsoft SQL Server.",
            ["React, Material UI, and Tailwind CSS"],
          ),

          new Paragraph({
            spacing: { before: 100, after: 20 },
            children: [
              new TextRun({
                text: "Zab Framework - ERP R&D",
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
                text: "Java-based Zab Framework, Microsoft SQL Server, Crystal Reports, HTML, CSS, JavaScript, Java",
                italics: true,
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          createBulletParagraph(
            "Developed Dynamic Dashboards, Dynamic Reports, and HRD Personal Dashboards, expanding the capabilities of the company's ERP platform.",
            [
              "Dynamic Dashboards, Dynamic Reports, and HRD Personal Dashboards",
            ],
          ),
          createBulletParagraph(
            "Improved core platform functionality, including file upload performance and reliability.",
            ["file upload performance and reliability"],
          ),

          new Paragraph({
            spacing: { before: 100, after: 20 },
            children: [
              new TextRun({
                text: "Enterprise ERP & HRD Implementations",
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
                text: "Java-based Zab Framework, ERP, Microsoft SQL Server, Crystal Reports",
                italics: true,
                font: "Georgia",
                size: 19,
              }),
            ],
          }),
          createBulletParagraph(
            "Developed business modules including Canteen, Disciplinary Action, Injury Management, Medical Pass, Gate Pass, and Route-wise Conveyance.",
            [
              "Canteen, Disciplinary Action, Injury Management, Medical Pass, Gate Pass, and Route-wise Conveyance",
            ],
          ),
          createBulletParagraph(
            "Implemented Employee Management, Payroll, and Attendance solutions, improving HR workflow automation and reporting.",
            ["Employee Management, Payroll, and Attendance solutions"],
          ),
          createBulletParagraph(
            "Developed a multi-server notification and approval system., enabling users to review and approve/reject requests directly from the notification interface.",
            ["multi-server notification and approval system."],
          ),

          createSectionHeader("EDUCATION"),
          new Paragraph({
            spacing: { before: 40, after: 20 },
            children: [
              new TextRun({
                text: "Bachelor of Technology in Computer Science and Engineering",
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
                text: "RIMT University, Punjab, India | CGPA: 7.68/10 | 2019 - 2023",
                italics: true,
                font: "Georgia",
                size: 19,
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 80, after: 20 },
            children: [
              new TextRun({
                text: "Higher Secondary Certificate",
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
                text: "Saidpur Govt. Technical College, Nilphamari, Bangladesh | GPA: 4.25/5.00 | 2017 - 2018",
                italics: true,
                font: "Georgia",
                size: 19,
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 80, after: 20 },
            children: [
              new TextRun({
                text: "Secondary School Certificate",
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
                text: "Syedpur Govt. Technical High School and College, Nilphamari, Bangladesh | GPA: 5.00/5.00 | 2015 – 2016",
                italics: true,
                font: "Georgia",
                size: 19,
              }),
            ],
          }),

          createSectionHeader("ADDITIONAL INTEREST"),
          new Paragraph({
            spacing: { before: 40, after: 40 },
            children: [
              new TextRun({
                text: "Music: ",
                bold: true,
                font: "Georgia",
                size: 19,
              }),
              new TextRun({
                text: "Singing, Guitar, Keyboard",
                font: "Georgia",
                size: 19,
              }),
            ],
          }),

          createSectionHeader("REFERENCES"),
          new Paragraph({
            spacing: { before: 40, after: 40 },
            children: [
              new TextRun({
                text: "Available Upon Request",
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

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("Nawfs_Ul_Ahsun_CV.docx", buffer);
  console.log("Successfully generated Nawfs_Ul_Ahsun_CV.docx in project root");
}

buildDocx();
