export interface ProjectLink {
  labelEn: string;
  labelAr: string;
  url: string;
  type: 'live' | 'video' | 'code' | 'download';
}

export interface Project {
  id: number;
  title: string;
  tagEn: string;
  tagAr: string;
  descEn: string;
  descAr: string;
  image: string;
  altImage: string;
  badge: string;
  accentColor: string;
  links: ProjectLink[];
}

export interface ServiceItem {
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  price: string;
  highlight?: boolean;
}

export interface ServiceCategory {
  id: string;
  iconName: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  items: ServiceItem[];
}

export interface ServiceModalInfo {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  techStack: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Ahmed Al-Emad Portfolio",
    tagEn: "Executive Space",
    tagAr: "معرض أعمال متكامل",
    descEn: "A bilingual executive showcase highlighting 25+ years of strategic leadership and telecommunication network deployments.",
    descAr: "معرض أعمال تنفيذي ثنائي اللغة يسلط الضوء على أكثر من 25 عاماً من القيادة الاستراتيجية والاتصالات.",
    image: "/images/projects/portofolio2.PNG",
    altImage: "/images/portofolio2.PNG",
    badge: "Telecom Leadership",
    accentColor: "from-blue-500/20 to-cyan-500/10",
    links: [
      {
        labelEn: "Live Site",
        labelAr: "الموقع المباشر",
        url: "https://ahmed-alemad.vercel.app/",
        type: "live",
      },
    ],
  },
  {
    id: 2,
    title: "Hospital Management System",
    tagEn: "Desktop System",
    tagAr: "نظام سطح مكتب",
    descEn: "Comprehensive health management solution built with Visual Studio, Visual Basic, and Access DB at Shendi University.",
    descAr: "نظام شامل لإدارة المستشفيات مُبنى بواسطة Visual Studio و Visual Basic وقاعدة بيانات Access في جامعة شندي.",
    image: "/images/projects/hospitalUI-image.PNG",
    altImage: "/images/hospitalUI-image.PNG",
    badge: "Healthcare & DB",
    accentColor: "from-emerald-500/20 to-teal-500/10",
    links: [
      {
        labelEn: "Demo",
        labelAr: "عرض فيديو",
        url: "https://youtu.be/CkNoXNqx8vs?si=3AJkY1fq8-ZPWHgf",
        type: "video",
      },
      {
        labelEn: "Code",
        labelAr: "الكود المصدري",
        url: "https://github.com/bestryful-dev/hospital--ms",
        type: "code",
      },
    ],
  },
  {
    id: 3,
    title: "Ball Runner Game (Unity)",
    tagEn: "Game Development",
    tagAr: "تطوير ألعاب",
    descEn: "A fast-paced 3D arcade game developed in Unity using C# where players dodge obstacles dynamically.",
    descAr: "لعبة ثلاثية الأبعاد سريعة الإيقاع مطورة بـ Unity باستخدام لغة C# حيث يتفادى اللاعب العوائق بمرونة ديناميكية.",
    image: "/images/projects/unity.png",
    altImage: "/images/projects/unity.PNG",
    badge: "3D Physics Arcade",
    accentColor: "from-amber-500/20 to-orange-500/10",
    links: [
      {
        labelEn: "Video",
        labelAr: "فيديو",
        url: "https://youtu.be/8RauQkpWPpc?si=o5Z6EHdTEmU2cp3y",
        type: "video",
      },
      {
        labelEn: "Build",
        labelAr: "تحميل اللعبة",
        url: "https://youtu.be/8RauQkpWPpc?si=o5Z6EHdTEmU2cp3y",
        type: "download",
      },
    ],
  },
  {
    id: 4,
    title: "Mansoor's Portfolio",
    tagEn: "Fullstack Portfolio",
    tagAr: "معرض أعمال متكامل",
    descEn: "Professional MERN stack portfolio showcasing modern web applications and multi-platform tech capabilities.",
    descAr: "معرض أعمال احترافي بتقنية MERN stack يعرض تطبيقات الويب الحديثة والمهارات التقنية المتعددة.",
    image: "/images/projects/portofolio.PNG",
    altImage: "/images/portofolio.PNG",
    badge: "MERN Stack Suite",
    accentColor: "from-violet-500/20 to-purple-500/10",
    links: [
      {
        labelEn: "Live Site",
        labelAr: "الموقع المباشر",
        url: "https://bestryful-dev.vercel.app/",
        type: "live",
      },
      {
        labelEn: "GitHub",
        labelAr: "جيت هب",
        url: "https://github.com/bestryful-dev",
        type: "code",
      },
    ],
  },
  {
    id: 5,
    title: "Bestryful Soft",
    tagEn: "Premium Portfolio",
    tagAr: "معرض أعمال مميز",
    descEn: "A premium, immersive portfolio built with React featuring high-performance animations, fluid typography, and beautifully crafted showcases.",
    descAr: "معرض أعمال متطور ومبهر تم بناؤه باستخدام React، يتميز بتأثيرات حركية فائقة الأداء وتصميم عصري وتفاعلي.",
    image: "/images/projects/portfolio-pro.png",
    altImage: "/images/portfolio-pro.png",
    badge: "Immersive Web App",
    accentColor: "from-cyan-500/20 to-lime-500/10",
    links: [
      {
        labelEn: "Live Site",
        labelAr: "الموقع المباشر",
        url: "https://bestryful-soft.vercel.app",
        type: "live",
      },
    ],
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "web-dev",
    iconName: "Globe",
    titleEn: "Web Design & Development",
    titleAr: "تصميم وتطوير مواقع الويب",
    summaryEn: "Modern, high-converting digital storefronts, executive portals, and bespoke full-stack systems.",
    summaryAr: "واجهات رقمية حديثة عالية التحويل، مواقع تعريفية للشركات، وأنظمة ويب مخصصة بالكامل.",
    items: [
      {
        nameEn: "Landing Pages",
        nameAr: "صفحات الهبوط (Landing Pages)",
        descEn: "High-converting, single-page sites to launch your product, service, or marketing campaign.",
        descAr: "صفحات فردية سريعة التحميل لترويج وإطلاق منتجك أو خدمتك الإعلانية.",
        price: "$100 - $180",
      },
      {
        nameEn: "Portfolios & Company Profiles",
        nameAr: "معارض الأعمال والملفات التعريفية للشركات",
        descEn: "Sleek, modern presentation sites to introduce your brand, leadership, and portfolio to the world.",
        descAr: "مواقع أنيقة وجذابة لتقديم هوية شركتك، إنجازاتك وفريقك للجمهور.",
        price: "$100 - $300",
        highlight: true,
      },
      {
        nameEn: "Full Stack Web Apps",
        nameAr: "تطبيقات الويب المتكاملة (مع قواعد البيانات)",
        descEn: "Completely tailored custom software systems, e-commerce stores, or data-driven portals built from scratch.",
        descAr: "برمجيات وأنظمة ويب مخصصة بالكامل، متاجر إلكترونية أو بوابات أعمال مع إدارة قواعد البيانات.",
        price: "$500 - $1,500+",
      },
    ],
  },
  {
    id: "mobile-dev",
    iconName: "Smartphone",
    titleEn: "Mobile App Development",
    titleAr: "تطوير تطبيقات الهواتف الذكية",
    summaryEn: "Native and cross-platform mobile solutions for Android & iOS tailored to your operational needs.",
    summaryAr: "تطبيقات هواتف ذكية متعددة المنصات لنظامي Android و iOS تلبي متطلبات عملك بدقة.",
    items: [
      {
        nameEn: "Website to App Conversion",
        nameAr: "تحويل الموقع إلى تطبيق هاتف",
        descEn: "Instantly transform your existing website into a lightweight, fully functional Android & iOS app.",
        descAr: "تحويل موقعك الحالي فوراً إلى تطبيق هاتف سريع ومتكامل يعمل على جميع الأجهزة.",
        price: "$50 - $100",
      },
      {
        nameEn: "Offline Standalone Apps",
        nameAr: "تطبيقات تعمل بدون إنترنت (Offline)",
        descEn: "Custom-built applications running locally on devices without requiring internet access.",
        descAr: "تطبيقات محلية مصممة للعمل المباشر والمستقر دون الحاجة لاتصال بالإنترنت.",
        price: "$250 - $500",
      },
      {
        nameEn: "Cloud-Connected Apps",
        nameAr: "تطبيقات متصلة بالسحاب (Cloud Apps)",
        descEn: "Comprehensive mobile applications integrated seamlessly with a live cloud database and sync.",
        descAr: "تطبيقات شاملة ومتقدمة متصلة لحظياً بقواعد بيانات سحابية وأنظمة الإشعارات.",
        price: "$600 - $1,800+",
        highlight: true,
      },
    ],
  },
  {
    id: "creative-branding",
    iconName: "Palette",
    titleEn: "Creative Services & Branding",
    titleAr: "الخدمات الإبداعية والهوية البصرية",
    summaryEn: "High-impact visual assets, video marketing, and polished corporate branding.",
    summaryAr: "محتوى مرئي عالي التأثير، إعلانات فيديو مبتكرة وهويات تجارية متألقة.",
    items: [
      {
        nameEn: "AI Video Generation & Commercials",
        nameAr: "إعلانات فيديو بالذكاء الاصطناعي",
        descEn: "Engaging promotional marketing videos and visual content generated using advanced AI avatars.",
        descAr: "فيديوهات تسويقية وترويجية جذابة ومحتوى بصري متطور باستخدام نماذج الذكاء الاصطناعي.",
        price: "$8 / 10s video",
        highlight: true,
      },
      {
        nameEn: "Professional Corporate Logos",
        nameAr: "تصميم شعارات احترافية للشركات",
        descEn: "Modern, impactful brand identities and logo marks that leave a lasting impression.",
        descAr: "تصميم هويات بصرية وشعارات مبتكرة ذات طابع فريد ورسالة واضحة لعلامتك التجارية.",
        price: "$10",
      },
      {
        nameEn: "Professional CVs & Resumes",
        nameAr: "تصميم سيرة ذاتية احترافية (CV)",
        descEn: "ATS-optimized, modern layout resumes crafted for corporate and executive opportunities.",
        descAr: "سير ذاتية مصممة وفق أحدث المعايير المهنية ومتوافقة مع أنظمة التوظيف العالمية.",
        price: "$20",
      },
    ],
  },
];

export const SERVICE_MODALS: Record<string, ServiceModalInfo> = {
  "App Development": {
    titleEn: "App Development",
    titleAr: "تطوير التطبيقات",
    descriptionEn: "Cross-platform mobile apps built with React Native and modern frameworks ensuring native performance across iOS and Android.",
    descriptionAr: "تطوير تطبيقات الهواتف متعددة المنصات باستخدام React Native لضمان أداء عالي على iOS و Android.",
    techStack: ["React Native", "Expo", "Flutter", "Firebase", "REST APIs"],
  },
  "Full Stack Development": {
    titleEn: "Full Stack Development",
    titleAr: "تطوير الأنظمة المتكاملة",
    descriptionEn: "Complete web systems powered by Node.js, Express, PostgreSQL/MongoDB, and React with high-security deployment.",
    descriptionAr: "أنظمة ويب متكاملة مدعومة بـ Node.js, Express, MongoDB, و React مع نشر آمن وعالي الكفاءة.",
    techStack: ["React / Vite", "Node.js", "Express", "PostgreSQL", "MongoDB", "Tailwind CSS"],
  },
  "Frontend Development": {
    titleEn: "Frontend Development",
    titleAr: "تطوير واجهات المستخدم",
    descriptionEn: "Clean, high-performance web interfaces built with React.js, Tailwind CSS, and optimized UI/UX guidelines.",
    descriptionAr: "واجهات ويب نظيفة وعالية الأداء مطورة باستخدام React.js وتصميمات عصرية متجاوبة.",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Motion", "Canvas 2D"],
  },
  "Desktop Development": {
    titleEn: "Desktop Development",
    titleAr: "تطوير برامج سطح المكتب",
    descriptionEn: "Reliable offline and database-linked desktop software solutions built with Visual Basic, C#, or Electron.",
    descriptionAr: "برمجيات سطح مكتب موثوقة ومربوطة بقواعد البيانات، مطورة بـ Visual Basic أو C#.",
    techStack: ["Visual Basic / .NET", "C#", "MS Access", "SQL Server", "Electron"],
  },
};
