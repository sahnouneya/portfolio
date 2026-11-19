// Contenu du portfolio, repris du CV. Modifier ce fichier suffit pour mettre le site à jour.

export const contact = {
  name: 'Eya Sahnoun',
  title: 'Développeuse Full-Stack Web & Mobile',
  city: 'Sfax, Tunisie',
  address: 'Rue Imam Sahnoun, Gremda, km 7, Sfax',
  email: 'sahnouneya032@gmail.com',
  phone: '+216 51 043 305',
  phoneHref: 'tel:+21651043305',
  linkedin: 'https://linkedin.com/in/eya-sahnoun',
  github: 'https://github.com/sahnouneya',
};

export const profile =
  'Développeuse full-stack web et mobile, forte de deux ans d’expérience en production : ERP/CRM B2B chez ICT, ' +
  'APIs et dashboards chez Lunar TC. À l’aise sur PHP, Java, .NET, Angular et Flutter ; projets en DevOps et en IA agentique.';

export type Category = 'Mobile' | 'Web' | 'DevOps' | 'IA' | 'Data';

export interface Project {
  id: string;
  title: string;
  kind: string;
  year: string;
  categories: Category[];
  summary: string;
  points: string[];
  stack: string[];
  featured?: boolean;
  /** Captures d'écran : chemins sous public/, par ex. 'images/projets/sahtek/1.png' */
  shots: string[];
}

export const projects: Project[] = [
  {
    id: 'sahtek',
    title: 'Sahtek, application mobile de santé',
    kind: 'Projet personnel',
    year: '2026',
    categories: ['Mobile', 'IA'],
    summary:
      'Application Flutter de suivi de la glycémie et d’échange patient–médecin, avec prédiction de la glycémie par LSTM.',
    points: [
      'Application Flutter de suivi de la glycémie, avec échange direct entre le patient et son médecin.',
      'Firebase pour l’authentification et les données temps réel ; API REST Spring Boot.',
      'Prédiction de la glycémie à +30 / +60 min par un modèle LSTM servi via FastAPI.',
      'Services déployés sur Render depuis GitHub.',
    ],
    stack: ['Flutter', 'Dart', 'Firebase', 'Spring Boot', 'Python', 'FastAPI', 'TensorFlow / Keras', 'Render', 'Git'],
    featured: true,
    shots: [],
  },
  {
    id: 'erp-copilot',
    title: 'ERP Copilot, assistant IA agentique avec RAG',
    kind: 'Projet IA générative',
    year: '2026',
    categories: ['IA', 'Web'],
    summary:
      'Assistant qui répond sur la documentation d’un ERP (RAG) et interroge ses données via un agent LangGraph.',
    points: [
      'RAG sur la documentation d’un ERP : recherche sémantique (pgvector) et réponses sourcées par un LLM.',
      'Agent LangGraph interrogeant l’ERP via des outils (factures, chiffre d’affaires, clients).',
      'API FastAPI et interface de chat en Angular, le tout conteneurisé avec Docker.',
    ],
    stack: ['Python', 'LangGraph', 'LangChain', 'LLM', 'PostgreSQL / pgvector', 'FastAPI', 'Angular', 'Docker'],
    featured: true,
    shots: [],
  },
  {
    id: 'cicd-sahtek',
    title: 'Chaîne CI/CD et supervision de Sahtek',
    kind: 'Projet DevOps',
    year: '2026',
    categories: ['DevOps'],
    summary:
      'Pipeline GitHub Actions, services Docker Compose déployés sur une VM Azure et supervisés par Prometheus / Grafana.',
    points: [
      'Services conteneurisés avec Docker Compose.',
      'Pipeline GitHub Actions : tests, analyse SonarCloud, publication des images sur GHCR.',
      'Déploiement sur une VM Azure derrière Nginx, supervision avec Prometheus et Grafana.',
    ],
    stack: ['Docker', 'Docker Compose', 'GitHub Actions', 'SonarCloud', 'Nginx', 'Azure', 'Prometheus', 'Grafana', 'Linux'],
    featured: true,
    shots: [],
  },
  {
    id: 'entrepot',
    title: 'Entrepôt de données et tableaux de bord',
    kind: 'Projet académique',
    year: '2025',
    categories: ['Data', 'Web'],
    summary: 'Schéma en étoile alimenté par SSIS, KPI exposés par une API ASP.NET et affichés dans Angular.',
    points: [
      'Entrepôt en schéma en étoile alimenté par un ETL SSIS.',
      'API REST en ASP.NET exposant les indicateurs, consommée par une interface Angular affichant les KPI.',
    ],
    stack: ['SQL Server', 'SSIS', 'T-SQL', 'ASP.NET / C#', 'Angular'],
    shots: [],
  },
  {
    id: 'ecg',
    title: 'Classification d’ECG',
    kind: 'Deep learning',
    year: '2025',
    categories: ['IA'],
    summary: 'Classification multi-label d’ECG 12 dérivations (PTB-XL) par un ensemble de CNN 1D.',
    points: [
      'Classification multi-label d’ECG 12 dérivations sur le jeu de données PTB-XL par un ensemble de CNN 1D.',
      'Du prétraitement du signal à l’évaluation par AUC et F1 macro.',
    ],
    stack: ['Python', 'TensorFlow / Keras', 'PyTorch', 'scikit-learn'],
    featured: true,
    shots: [],
  },
  {
    id: 'voitures',
    title: 'Plateforme automobile, voitures neuves et d’occasion',
    kind: 'Application Laravel',
    year: 'Projet web',
    categories: ['Web'],
    summary: 'Vente de voitures neuves et d’occasion, avec gestion des rôles utilisateurs.',
    points: [
      'Plateforme web de vente de voitures neuves et d’occasion.',
      'Gestion des rôles : chaque type d’utilisateur accède à ses propres fonctionnalités.',
    ],
    stack: ['Laravel', 'PHP', 'MySQL'],
    shots: [],
  },
];

export interface Job {
  role: string;
  company: string;
  period: string;
  points: string[];
  stack?: string[];
}

export const jobs: Job[] = [
  {
    role: 'Développeuse full-stack, ERP / CRM',
    company: 'ICT, Sfax',
    period: 'Juin 2025 – octobre 2026',
    points: [
      'Conception, développement et évolution des modules métier d’un ERP/CRM B2B en production : facturation, avoirs, reçus de paiement, caisse.',
      'Système de rôles et de permissions couvrant l’ensemble des modules et l’administration.',
      'Optimisation : indexation et réécriture des requêtes MySQL sur les listes volumineuses et les états financiers.',
      'Interfaces d’administration responsives côté front.',
    ],
    stack: ['PHP', 'Laminas (Zend)', 'MVC', 'MySQL', 'JavaScript', 'Bootstrap', 'Composer'],
  },
  {
    role: 'Développeuse back-end',
    company: 'Lunar TC, Sfax',
    period: 'Sept. 2024 – mai 2025',
    points: [
      'APIs REST sécurisées par JWT en Spring Boot : architecture en couches, mapping DTO et validation.',
      'Application de dashboarding connectée dynamiquement à plusieurs bases MongoDB, générant des tableaux de bord configurables.',
      'Optimisation PostgreSQL : indexation, requêtes JPA / Hibernate, pagination sur de gros volumes.',
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'MongoDB', 'API REST', 'Postman', 'GitLab'],
  },
];

export const internships: Job[] = [
  {
    role: 'Projet de fin d’études : application de réalité augmentée connectée',
    company: 'Technology Development System (TDS)',
    period: 'Février – juin 2024',
    points: [
      'Application de réalité augmentée avec des éléments interactifs créés sous Unity et Vuforia.',
      'Fonctionnalités IoT en équipe : communication temps réel entre Firebase et un ESP32.',
      'Connexion à des automates industriels, avec des essais d’intégration de la norme OPC UA.',
    ],
    stack: ['Unity', 'Vuforia', 'Firebase', 'ESP32', 'OPC UA'],
  },
  {
    role: 'Stage technique : deep learning et robotique',
    company: 'Centre de recherche numérique',
    period: 'Juin – juillet 2023',
    points: [
      'Classification d’IRM cérébrales par un CNN optimisé avec RMSProp, pour détecter des anomalies.',
      'Fabrication et programmation d’un robot suiveur de ligne et d’un robot éviteur d’obstacles.',
      'Radar à ultrasons mesurant la distance selon la position d’un servomoteur.',
    ],
  },
  {
    role: 'Stage technique : relation client',
    company: 'Centre clientèle de Télécom',
    period: 'Juin – juillet 2022',
    points: ['Participation à la résolution des réclamations clients.', 'Suivi du traitement des factures.'],
  },
];

export interface SkillGroup {
  name: string;
  note: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { name: 'Frontend', note: 'Interfaces web responsives', items: ['Angular', 'TypeScript', 'RxJS', 'JavaScript', 'Bootstrap', 'HTML / CSS'] },
  { name: 'Mobile', note: 'Applications Android et iOS', items: ['Flutter', 'Dart', 'Firebase'] },
  { name: 'Backend', note: 'APIs et logique métier', items: ['PHP (Laminas, Laravel)', 'Java / Spring Boot', 'ASP.NET', 'Python / FastAPI'] },
  { name: 'Bases de données', note: 'Relationnelles et NoSQL', items: ['PostgreSQL', 'MySQL / MariaDB', 'MongoDB', 'SQL Server', 'Firebase'] },
  { name: 'API et intégrations', note: 'Sécurité et tests', items: ['API REST', 'JWT / OAuth2', 'Postman'] },
  {
    name: 'DevOps et cloud',
    note: 'Conteneurs, CI/CD, supervision',
    items: ['Docker / Compose', 'GitHub Actions (CI/CD)', 'Nginx', 'Prometheus / Grafana', 'Azure', 'Render', 'Linux'],
  },
  {
    name: 'IA',
    note: 'Deep learning et IA générative',
    items: ['TensorFlow / Keras', 'PyTorch', 'scikit-learn', 'CNN', 'LSTM', 'RAG', 'Agents IA', 'LangGraph'],
  },
  { name: 'Outils IA', note: 'Assistants de développement', items: ['Claude Code', 'GitHub Copilot'] },
  { name: 'Méthodes', note: 'Conception et organisation', items: ['POO', 'SOLID', 'MVC', 'Tests unitaires', 'Scrum', 'Kanban'] },
  { name: 'Langues', note: '', items: ['Arabe — langue maternelle', 'Français — bilingue', 'Anglais — B2'] },
];

export interface Degree {
  period: string;
  title: string;
  school: string;
  logo?: string;
}

export const education: Degree[] = [
  {
    period: '2025 – 2027',
    title: 'Diplôme national d’ingénieur en génie logiciel',
    school: 'Institut International de Technologie (IIT), Sfax',
    logo: 'images/logo-iit.png',
  },
  {
    period: '2021 – 2024',
    title: 'Licence appliquée en technologies de l’information',
    school: 'École Nationale d’Électronique et des Télécommunications (ENET’Com), Sfax',
    logo: 'images/ENET.jpg',
  },
  {
    period: '2021',
    title: 'Baccalauréat Sciences expérimentales',
    school: 'Lycée Abou Kassem Chebbi, Sfax',
  },
];

export const certifications = [
  { code: 'AI-900', name: 'Microsoft Azure AI Fundamentals' },
  { code: 'AZ-900', name: 'Microsoft Azure Fundamentals' },
  { code: 'DELF B2', name: 'Diplôme d’études en langue française' },
];

export const engagement = {
  club: 'IEEE ENET’Com Student Branch',
  clubRole: 'Membre',
  clubLogo: 'images/images.png',
  activities: [
    'Formation en robotique à l’ENET’Com',
    'Participation à l’IEEEXtreme 2022 / 2023',
    'Organisation de l’événement i4S de l’IEEE',
  ],
};
