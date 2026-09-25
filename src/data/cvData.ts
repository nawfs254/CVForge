export interface BulletItem {
  text: string;
  boldPhrases?: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: BulletItem[];
}

export interface ProjectItem {
  title: string;
  technologies: string;
  bullets: BulletItem[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  details: string;
}

export interface CVData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    links: {
      label: string;
      display: string;
      url: string;
    }[];
  };
  summary: string;
  skills: {
    category: string;
    items: string;
  }[];
  experience: ExperienceItem[];
  projectsPage1: ProjectItem[];
  projectsPage2: ProjectItem[];
  education: EducationItem[];
  interests: {
    category: string;
    items: string;
  }[];
  references?: string;
}

export const cvData: CVData = {
  personalInfo: {
    name: "NAWFS UL AHSUN",
    title: "SOFTWARE ENGINEER | FULL-STACK DEVELOPER",
    location: "Dhaka, Bangladesh",
    phone: "+880 1704 259187",
    email: "nawfs.cs254@gmail.com",
    links: [
      {
        label: "LinkedIn",
        display: "linkedin.com/in/nawfs-ul-ahsun",
        url: "https://www.linkedin.com/in/nawfs-ul-ahsun",
      },
      {
        label: "GitHub",
        display: "github.com/nawfs254",
        url: "https://github.com/nawfs254",
      },
      {
        label: "Portfolio",
        display: "nawfs.is-a.dev",
        url: "https://nawfs.is-a.dev",
      },
    ],
  },
  summary:
    "Software Engineer experienced in building enterprise ERP and healthcare applications using React.js, Java, Spring Boot, JavaScript, and Microsoft SQL Server. Skilled in full-stack development, database optimization, dashboards, reporting, and enterprise application development. Contributed to new product initiatives including React.js-based solutions, hotel management software, and ZAB Framework developer tools.",
  skills: [
    {
      category: "Programming Languages",
      items: "Java, JavaScript, Python, SQL",
    },
    {
      category: "Frontend",
      items: "React.js, Next.js, HTML, CSS, Tailwind CSS, Material UI",
    },
    {
      category: "Backend / Enterprise",
      items:
        "Spring Boot, Node, Express, Java-based Zab Framework, ERP Systems",
    },
    {
      category: "Databases",
      items: "Microsoft SQL Server, MySQL, MongoDB",
    },
    {
      category: "Reporting / Design",
      items: "Crystal Reports, Figma, Adobe Illustrator, Photoshop",
    },
    {
      category: "Technical Tools",
      items: "MS Word, MS Excel, MS PowerPoint",
    },
    {
      category: "Creative",
      items:
        "Adobe Premiere Pro, Adobe Audition, FL Studio, Figma, Photoshop, Illustrator",
    },
  ],
  experience: [
    {
      role: "JUNIOR SOFTWARE ENGINEER",
      company: "Orange Solutions LTD - United Group",
      period: "July 2024 – Present",
      bullets: [
        {
          text: "Developed the company's first React.js-based Prescription & Inventory Management System, establishing React.js as a technology for future client projects.",
          boldPhrases: [
            "React.js-based Prescription & Inventory Management System",
            "React.js as a technology",
          ],
        },
        {
          text: "Contributed to a Hotel Management System using the ZAB Framework, expanding the company's product portfolio toward the hotel management software market.",
          boldPhrases: ["Hotel Management System using the ZAB Framework"],
        },
        {
          text: "Developed a VS Code extension and formatter for ZAB development, making ZAB coding faster, easier, and more consistent for developers.",
          boldPhrases: ["VS Code extension and formatter for ZAB development"],
        },
        {
          text: "Developed ERP dashboards, dynamic reports, HRD features, and system enhancements, improving workflow efficiency and expanding the capabilities of the company's ERP platform.",
          boldPhrases: [
            "ERP dashboards, dynamic reports, HRD features, and system enhancements",
          ],
        },
      ],
    },
    {
      role: "STUDENT COORDINATOR",
      company: "RIMT University, Punjab, India",
      period: "July 2022 - July 2023",
      bullets: [
        {
          text: "Represented Bangladeshi students and coordinated with the International Admission Department to provide guidance and support.",
          boldPhrases: [
            "Bangladeshi students",
            "International Admission Department",
          ],
        },
        {
          text: "Facilitated communication between students and university departments, helping newcomers navigate admission, onboarding, and university processes.",
          boldPhrases: [
            "Facilitated communication between students and university departments",
          ],
        },
      ],
    },
  ],
  projectsPage1: [
    {
      title: "E-Prescription & Healthcare Management System",
      technologies:
        "React, Material UI, Tailwind CSS, Spring Boot, Microsoft SQL Server",
      bullets: [
        {
          text: "Developed frontend and backend features for an enterprise healthcare management system.",
          boldPhrases: [
            "enterprise healthcare management system for United Hospital Limited",
          ],
        },
        {
          text: "Implemented patient, prescription, medication, template, and reporting modules, integrating responsive UI with backend services and SQL Server.",
          boldPhrases: [
            "patient, prescription, medication, template, and reporting modules",
          ],
        },
      ],
    },
  ],
  projectsPage2: [
    {
      title: "Hotel Management System",
      technologies: "ZAB Framework, Java, Microsoft SQL Server",
      bullets: [
        {
          text: "Contributing to the end-to-end hotel management workflow, covering core operational processes from front desk operations to supporting management functions.",
          boldPhrases: ["end-to-end hotel management workflow"],
        },
        {
          text: "Developed the Front Desk Dashboard to provide centralized access to hotel operations and improve day-to-day workflow visibility.",
          boldPhrases: ["Front Desk Dashboard"],
        },
      ],
    },
    {
      title: "E-Prescription & Medical Store Management",
      technologies:
        "React, Material UI, Tailwind CSS, Spring Boot, Microsoft SQL Server",
      bullets: [
        {
          text: "Developed a prescription and inventory management system, supporting prescription workflows and medical store operations.",
          boldPhrases: ["prescription and inventory management system"],
        },
        {
          text: "Led frontend development using React, Material UI, and Tailwind CSS, integrated with Spring Boot services and Microsoft SQL Server.",
          boldPhrases: ["React, Material UI, and Tailwind CSS"],
        },
      ],
    },
    {
      title: "Zab Framework - ERP R&D",
      technologies:
        "Java-based Zab Framework, Microsoft SQL Server, Crystal Reports, HTML, CSS, JavaScript, Java",
      bullets: [
        {
          text: "Developed Dynamic Dashboards, Dynamic Reports, and HRD Personal Dashboards, expanding the capabilities of the company's ERP platform.",
          boldPhrases: [
            "Dynamic Dashboards, Dynamic Reports, and HRD Personal Dashboards",
          ],
        },
        {
          text: "Improved core platform functionality, including file upload performance and reliability.",
          boldPhrases: ["file upload performance and reliability"],
        },
      ],
    },
    {
      title: "Enterprise ERP & HRD Implementations",
      technologies:
        "Java-based Zab Framework, ERP, Microsoft SQL Server, Crystal Reports",
      bullets: [
        {
          text: "Developed business modules including Canteen, Disciplinary Action, Injury Management, Medical Pass, Gate Pass, and Route-wise Conveyance.",
          boldPhrases: [
            "Canteen, Disciplinary Action, Injury Management, Medical Pass, Gate Pass, and Route-wise Conveyance",
          ],
        },
        {
          text: "Implemented Employee Management, Payroll, and Attendance solutions, improving HR workflow automation and reporting.",
          boldPhrases: [
            "Employee Management, Payroll, and Attendance solutions",
          ],
        },
        {
          text: "Developed a multi-server notification and approval system., enabling users to review and approve/reject requests directly from the notification interface.",
          boldPhrases: ["multi-server notification and approval system."],
        },
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "RIMT University, Punjab, India",
      details: "CGPA: 7.68/10 | 2019 - 2023",
    },
    {
      degree: "Higher Secondary Certificate",
      institution: "Saidpur Govt. Technical College, Nilphamari, Bangladesh",
      details: "GPA: 4.25/5.00 | 2017 - 2018",
    },
    {
      degree: "Secondary School Certificate",
      institution:
        "Syedpur Govt. Technical High School and College, Nilphamari, Bangladesh",
      details: "GPA: 5.00/5.00 | 2015 – 2016",
    },
  ],
  interests: [
    {
      category: "Music",
      items: "Singing, Guitar, Keyboard",
    },
  ],
  references: "Available Upon Request",
};
