export type Language = 'en' | 'zh';

export type TranslationSchema = {
  nav: {
    philosophy: string;
    roadmap: string;
    culture: string;
    talkToAi: string;
    selectLanguage: string;
    english: string;
    chinese: string;
  };
  hero: {
    discoverMore: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    inputPlaceholder: string;
    getStarted: string;
    trustedBy: string;
  };
  philosophy: {
    badge: string;
    title: string;
    subtitle: string;
    card1: { tag: string; title: string; description: string };
    card2: { tag: string; title: string; description: string };
    card3: { tag: string; title: string; description: string };
    verifiedBy: string;
  };
  roadmap: {
    badge: string;
    title: string;
    subtitle: string;
    statusCompleted: string;
    statusInProgress: string;
    statusUpcoming: string;
    statusVision: string;
    steps: Array<{ quarter: string; title: string; description: string }>;
  };
  culture: {
    badge: string;
    title: string;
    subtitle: string;
    manifestoTitle: string;
    manifestoQuote: string;
    manifestoFooter: string;
    card1: { title: string; description: string };
    card2: { title: string; description: string };
    card3: { title: string; description: string };
  };
  footer: {
    tagline: string;
    networkStatus: string;
    navigation: string;
    communityHeader: string;
    communityDesc: string;
    copyright: string;
    disclaimer: string;
    backToTop: string;
  };
  chat: {
    searchPlaceholder: string;
    alerts: string;
    discover: string;
    termsOfConditions: string;
    privacyPolicy: string;
    newChat: string;
    chats: string;
    profileAndSecurity: string;
    logOut: string;
    exitTerminal: string;
  };
  auth: {
    authBadge: string;
    signInTitle: string;
    signInDesc: string;
    signUpTitle: string;
    signUpDesc: string;
    signInTab: string;
    signUpTab: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    signInBtn: string;
    signUpBtn: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    confirmPasswordLabel: string;
    forgotPasswordTitle: string;
    forgotPasswordDesc: string;
    sendOtpBtn: string;
    verifyOtpTitle: string;
    verifyOtpDesc: string;
    verifyBtn: string;
    resetPasswordTitle: string;
    resetPasswordDesc: string;
    resetBtn: string;
    step1: string;
    step2: string;
    step3: string;
  };
  profileModal: {
    freeTier: string;
    tabProfile: string;
    tabSecurity: string;
    uploadTitle: string;
    uploadPrompt: string;
    uploadSpecs: string;
    fullName: string;
    emailAddress: string;
    verified: string;
    saveProfile: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    updatePassword: string;
  };
};

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      philosophy: 'Philosophy',
      roadmap: 'Roadmap',
      culture: 'Culture',
      talkToAi: 'Talk to AI',
      selectLanguage: 'Language',
      english: 'English (EN)',
      chinese: '简体中文 (ZH)',
    },
    hero: {
      discoverMore: 'Discover More',
      titleLine1: 'Super Chatbot AI',
      titleLine2: 'Automation',
      description: 'Cost-Effective Solution To Generate Text In Seconds Increasing Your Conversion Rate. Anchored by Bitcoin\'s Proof-of-Work sovereign network.',
      inputPlaceholder: 'Solution To Generate Text / Ask Satoshi AI...',
      getStarted: 'Get Started',
      trustedBy: 'Trusted by leading crypto ecosystems',
    },
    philosophy: {
      badge: 'Core Principles',
      title: 'Philosophy',
      subtitle: 'Uncompromising decentralization meets self-sovereign intelligence.',
      card1: {
        tag: 'SOVEREIGN IDENTITY',
        title: 'Individual Sovereignty',
        description: 'True freedom requires control over your capital and your intelligence. YCOIN returns complete ownership of data, memory, and value back to the individual without corporate gatekeepers.',
      },
      card2: {
        tag: 'PROOF-OF-WORK',
        title: 'Proof-of-Work Foundation',
        description: 'Bitcoin is the ultimate anchor of truth in the digital universe. YCOIN leverages Bitcoin\'s unmatched energy-backed security to validate and seal autonomous AI state execution.',
      },
      card3: {
        tag: 'AUTONOMOUS CODE',
        title: 'Autonomous Code Supremacy',
        description: 'Human consensus is fragile and prone to censorship. By delegating complex coordination to cryptographic AI models, we establish immutable governance driven by logic and code.',
      },
      verifiedBy: 'Verified by Bitcoin L1',
    },
    roadmap: {
      badge: 'Development Horizon',
      title: 'Roadmap',
      subtitle: 'Architecting the convergence of Bitcoin and artificial intelligence.',
      statusCompleted: 'Completed',
      statusInProgress: 'In Progress',
      statusUpcoming: 'Upcoming',
      statusVision: 'Vision 2026+',
      steps: [
        {
          quarter: '2024 Q2 - Q3',
          title: 'Genesis & AI Sentinel Layer',
          description: 'Launch of YCOIN testnet, deployment of initial Bitcoin hash-anchored state proofs, and Satoshi AI intelligence interface initialization.',
        },
        {
          quarter: '2024 Q4 - 2025 Q1',
          title: 'Autonomous AI Node Network',
          description: 'Deployment of decentralized node cluster performing zero-knowledge AI inference with settlement directly on Bitcoin Layer-1.',
        },
        {
          quarter: '2025 Q2 - Q4',
          title: 'Sovereign Layer-2 Rollout',
          description: 'Expansion of YCOIN L2 execution environment, enabling high-frequency AI agent micro-transactions with Taproot and BitVM integration.',
        },
        {
          quarter: '2026+',
          title: 'Global Sovereign AI Matrix',
          description: 'Full autonomy of the self-evolving YCOIN core network, creating an unstoppable global intelligence layer for sovereign individuals.',
        },
      ],
    },
    culture: {
      badge: 'Project Ethos',
      title: 'Culture',
      subtitle: 'Built by cypherpunks, driven by code, dedicated to human freedom.',
      manifestoTitle: 'The Cypherpunk Manifesto',
      manifestoQuote: '"YCOIN is not an enterprise product; it is a movement. Born from the cypherpunk ethos that birthed Bitcoin, we believe that artificial intelligence must remain free, open, and decentralized. We operate without centralized headquarters or regulatory compromise — only cryptographic truth and open sovereign code."',
      manifestoFooter: 'YCOIN Decentralized Core Collective • NO HQ • Open Source',
      card1: {
        title: 'Don\'t Trust, Verify',
        description: 'Every AI inference proof is mathematically verifiable on the Bitcoin ledger.',
      },
      card2: {
        title: 'Permissionless Creation',
        description: 'Anyone, anywhere can deploy autonomous AI agents on the YCOIN matrix.',
      },
      card3: {
        title: 'Long-Term Maximalism',
        description: 'We measure progress in centuries, anchored by Bitcoin\'s 21-million hard cap.',
      },
    },
    footer: {
      tagline: 'The AI-Driven Sovereign Layer for Bitcoin.',
      networkStatus: 'Network Status: Autonomous & Fully Operational',
      navigation: 'Navigation',
      communityHeader: 'Community & Code',
      communityDesc: 'Connect with the sovereign YCOIN community across decentralized nodes.',
      copyright: '© 2026 YCOIN Protocol. All cryptographic rights reserved. Bitcoin Native.',
      disclaimer: 'YCOIN is a decentralized, self-sovereign open source research initiative. Not financial advice.',
      backToTop: 'Back to top',
    },
    chat: {
      searchPlaceholder: 'Search chats...',
      alerts: 'Alerts',
      discover: 'Discover',
      termsOfConditions: 'Terms Of Conditions',
      privacyPolicy: 'Privacy Policy',
      newChat: 'New Chat',
      chats: 'CHATS',
      profileAndSecurity: 'Profile & Security',
      logOut: 'Log Out',
      exitTerminal: 'Exit Terminal',
    },
    auth: {
      authBadge: 'YCOIN Sovereign User Auth',
      signInTitle: 'Sign In to YCOIN',
      signInDesc: 'Bitcoin Native Sovereign AI Platform Authentication',
      signUpTitle: 'Create YCOIN Account',
      signUpDesc: 'Join the Sovereign Decentralized AI Network',
      signInTab: 'Sign In',
      signUpTab: 'Sign Up',
      emailLabel: 'Email Address',
      emailPlaceholder: 'your.email@domain.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '...........',
      forgotPassword: 'Forgot Password?',
      signInBtn: 'Sign In',
      signUpBtn: 'Create Account',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'Satoshi Nakamoto',
      confirmPasswordLabel: 'Confirm Password',
      forgotPasswordTitle: 'Forgot Password',
      forgotPasswordDesc: 'Enter your registered email to receive verification code',
      sendOtpBtn: 'Send Code',
      verifyOtpTitle: 'Verify Code',
      verifyOtpDesc: 'We have sent a verification code to your email',
      verifyBtn: 'Verify Code',
      resetPasswordTitle: 'Reset Password',
      resetPasswordDesc: 'Enter your new password below',
      resetBtn: 'Reset Password',
      step1: 'Enter Email',
      step2: 'Enter Code',
      step3: 'New Password',
    },
    profileModal: {
      freeTier: 'Free Tier',
      tabProfile: 'Profile Details & Photo',
      tabSecurity: 'Security & Password',
      uploadTitle: 'Profile Picture / Image Upload',
      uploadPrompt: 'Click or Drag & Drop an image file',
      uploadSpecs: 'PNG, JPG, WebP, GIF or SVG (max 5MB)',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      verified: 'Verified',
      saveProfile: 'Save Profile Changes',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      updatePassword: 'Update Password',
    },
  },
  zh: {
    nav: {
      philosophy: '理念哲学',
      roadmap: '发展路线',
      culture: '项目文化',
      talkToAi: '与 AI 对话',
      selectLanguage: '语言选择',
      english: 'English (EN)',
      chinese: '简体中文 (ZH)',
    },
    hero: {
      discoverMore: '探索更多',
      titleLine1: '超级聊天 AI',
      titleLine2: '自动化平台',
      description: '高性价比文本生成解决方案，数秒内大幅提高转化率。依托比特币工作量证明（PoW）主权网络打造。',
      inputPlaceholder: '生成文本解决方案 / 询问 Satoshi AI...',
      getStarted: '立即体验',
      trustedBy: '受领先加密生态系统信任',
    },
    philosophy: {
      badge: '核心原则',
      title: '理念哲学',
      subtitle: '无妥协去中心化，打造自控主权智能。',
      card1: {
        tag: '主权身份',
        title: '个人主权',
        description: '真正的自由需要对自己资金与智能的绝对掌控。YCOIN 消除企业中介，将数据、记忆与价值的完全所有权归还给个人。',
      },
      card2: {
        tag: '工作量证明',
        title: 'PoW 坚实基石',
        description: '比特币是数字世界终极的真实锚点。YCOIN 借助比特币无与伦比的能源安全，验证并封存自主 AI 状态的执行。',
      },
      card3: {
        tag: '自主代码',
        title: '自主代码至上',
        description: '人类共识脆弱且易受审查。通过将复杂协调委托给密码学 AI 模型，我们建立由逻辑与代码驱动的不抗审查治理。',
      },
      verifiedBy: '经由 Bitcoin L1 认证',
    },
    roadmap: {
      badge: '发展展望',
      title: '发展路线',
      subtitle: '架构比特币与人工智能的融通之道。',
      statusCompleted: '已完成',
      statusInProgress: '进行中',
      statusUpcoming: '即将到来',
      statusVision: '展望 2026+',
      steps: [
        {
          quarter: '2024 Q2 - Q3',
          title: '创世与 AI 哨兵层',
          description: '发布 YCOIN 测试网，部署初始比特币哈希锚定状态证明，初始化 Satoshi AI 智能接口。',
        },
        {
          quarter: '2024 Q4 - 2025 Q1',
          title: '自主 AI 节点网络',
          description: '部署去中心化节点集群，执行零知识 AI 推理，并直接在比特币 Layer-1 上结算。',
        },
        {
          quarter: '2025 Q2 - Q4',
          title: '主权 Layer-2 推出',
          description: '扩展 YCOIN L2 执行环境，通过 Taproot 与 BitVM 集成实现高频 AI 智能体微交易。',
        },
        {
          quarter: '2026+',
          title: '全球主权 AI 矩阵',
          description: '自我进化的 YCOIN 核心网络实现完全自主，为个人主权建立不可阻挡的全球智能层。',
        },
      ],
    },
    culture: {
      badge: '项目精神',
      title: '项目文化',
      subtitle: '由极客密码朋克打造，代码驱动，致敬人类自由。',
      manifestoTitle: '密码朋克宣言',
      manifestoQuote: '“YCOIN 不是企业产品，而是一场运动。源自孕育比特币的密码朋克精神，我们坚信人工智能必须保持自由、开放与去中心化。我们没有集中式总部，也不做监管妥协——唯有密码学真理与开源主权代码。”',
      manifestoFooter: 'YCOIN 去中心化核心联合体 • 无总部 • 开源项目',
      card1: {
        title: '无需信任，亲自验证',
        description: '每一个 AI 推理证明均可在比特币账本上进行数学验证。',
      },
      card2: {
        title: '无门槛自由创造',
        description: '任何人均可在 YCOIN 矩阵上无门槛部署自主 AI 智能体。',
      },
      card3: {
        title: '长期主义极客精神',
        description: '我们以世纪为单位衡量衡量进展，并依托比特币 2100 万枚硬顶。',
      },
    },
    footer: {
      tagline: '比特币 AI 驱动的主权层。',
      networkStatus: '网络状态：自主且完全正常运行',
      navigation: '导航菜单',
      communityHeader: '社区与代码',
      communityDesc: '跨去中心化节点连接主权 YCOIN 社区。',
      copyright: '© 2026 YCOIN 协议。保留所有密码学权利。比特币原生。',
      disclaimer: 'YCOIN 是去中心化、自控主权的开源研究倡议。不构成财务建议。',
      backToTop: '返回顶部',
    },
    chat: {
      searchPlaceholder: '搜索对话...',
      alerts: '预警',
      discover: '发现',
      termsOfConditions: '服务条款',
      privacyPolicy: '隐私政策',
      newChat: '新建对话',
      chats: '对话记录',
      profileAndSecurity: '个人资料与安全',
      logOut: '退出登录',
      exitTerminal: '退出终端',
    },
    auth: {
      authBadge: 'YCOIN 主权用户身份验证',
      signInTitle: '登录至 YCOIN',
      signInDesc: '比特币原生主权 AI 平台身份认证',
      signUpTitle: '创建 YCOIN 账户',
      signUpDesc: '加入主权去中心化 AI 网络',
      signInTab: '登录',
      signUpTab: '注册',
      emailLabel: '邮箱地址',
      emailPlaceholder: 'your.email@domain.com',
      passwordLabel: '密码',
      passwordPlaceholder: '...........',
      forgotPassword: '忘记密码？',
      signInBtn: '登录',
      signUpBtn: '创建账户',
      fullNameLabel: '姓名',
      fullNamePlaceholder: '中本聪',
      confirmPasswordLabel: '确认密码',
      forgotPasswordTitle: '忘记密码',
      forgotPasswordDesc: '输入注册邮箱接收验证码',
      sendOtpBtn: '发送验证码',
      verifyOtpTitle: '验证代码',
      verifyOtpDesc: '我们已向您的邮箱发送了验证码',
      verifyBtn: '验证代码',
      resetPasswordTitle: '重置密码',
      resetPasswordDesc: '在下方输入您的新密码',
      resetBtn: '重置密码',
      step1: '输入邮箱',
      step2: '输入验证码',
      step3: '设置新密码',
    },
    profileModal: {
      freeTier: '免费版',
      tabProfile: '个人资料与头像',
      tabSecurity: '安全与密码',
      uploadTitle: '个人头像 / 图片上传',
      uploadPrompt: '点击或拖拽上传图片文件',
      uploadSpecs: 'PNG, JPG, WebP, GIF 或 SVG (最大 5MB)',
      fullName: '姓名',
      emailAddress: '邮箱地址',
      verified: '已验证',
      saveProfile: '保存个人资料修改',
      currentPassword: '当前密码',
      newPassword: '新密码',
      confirmPassword: '确认新密码',
      updatePassword: '更新密码',
    },
  },
};
