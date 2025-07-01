export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export const seoData = {
  en: {
    home: {
      title: "Aoi Kuriki - Full Stack Developer Portfolio",
      description: "Experienced Full Stack Developer specializing in React, Next.js, React Native and modern web technologies. View my projects and get in touch.",
      keywords: "full stack developer, react developer, next.js, web development, portfolio, javascript, typescript, React Native",
      ogTitle: "Aoi Kuriki - Full Stack Developer",
      ogDescription: "Check out my latest projects and web development work",
    },
    about: {
      title: "About - Aoi Kuriki | Full Stack Developer",
      description: "Learn about my background, skills, and experience in web development. Passionate about creating innovative digital solutions.",
      keywords: "about, web developer, skills, experience, background, programming",
    },
    projects: {
      title: "Projects - Aoi Kuriki | Portfolio",
      description: "Explore my web development projects including React applications, Next.js websites, and full-stack solutions.",
      keywords: "projects, portfolio, web development, react projects, next.js applications",
    },
    contact: {
      title: "Contact - Aoi Kuriki | Get In Touch",
      description: "Get in touch for web development projects, collaborations, or job opportunities. Available for freelance and full-time positions.",
      keywords: "contact, hire developer, web development services, freelance, job opportunities",
    }
  },
  ja: {
    home: {
      title: "栗木 碧唯 - フルスタック開発者ポートフォリオ",
      description: "React、Next.js、モダンなウェブ技術を専門とする経験豊富なフルスタック開発者。プロジェクトをご覧ください。",
      keywords: "フルスタック開発者, react開発者, next.js, ウェブ開発, ポートフォリオ, javascript, typescript, React Native",
      ogTitle: "あなたの名前 - フルスタック開発者",
      ogDescription: "最新のプロジェクトとウェブ開発の仕事をご覧ください",
    },
    about: {
      title: "について - 栗木 碧唯 | フルスタック開発者",
      description: "ウェブ開発における私の経歴、スキル、経験について。お客様が求めるアイデアを形にします。",
      keywords: "について, ウェブ開発者, スキル, 経験, 経歴, プログラミング",
    },
    projects: {
      title: "プロジェクト - 栗木 碧唯 | ポートフォリオ",
      description: "Reactアプリケーション、Next.jsウェブサイト、フルスタックソリューションを含むウェブ開発プロジェクトをご覧ください。",
      keywords: "プロジェクト, ポートフォリオ, ウェブ開発, reactプロジェクト, next.jsアプリケーション",
    },
    contact: {
      title: "お問い合わせ - 栗木 碧唯 | ご連絡ください",
      description: "ウェブ開発プロジェクト、コラボレーション、求人についてお気軽にお問い合わせください。フリーランス・正社員対応可能。",
      keywords: "お問い合わせ, 開発者採用, ウェブ開発サービス, フリーランス, 求人",
    }
  }
};
