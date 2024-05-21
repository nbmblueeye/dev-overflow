import { Tag, Question, SidebarLink, QuestionCard, Filter } from '@/types/type'

export const themes = [
  { value: 'light', label: 'Light', icon: '/assets/icons/sun.svg' },
  { value: 'dark', label: 'Dark', icon: '/assets/icons/moon.svg' },
  { value: 'system', label: 'System', icon: '/assets/icons/computer.svg' }
]

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home'
  },
  {
    imgURL: '/assets/icons/users.svg',
    route: '/community',
    label: 'Community'
  },
  {
    imgURL: '/assets/icons/star.svg',
    route: '/collection',
    label: 'Collections'
  },
  {
    imgURL: '/assets/icons/suitcase.svg',
    route: '/jobs',
    label: 'Find Jobs'
  },
  {
    imgURL: '/assets/icons/tag.svg',
    route: '/tags',
    label: 'Tags'
  },
  {
    imgURL: '/assets/icons/user.svg',
    route: '/profile',
    label: 'Profile'
  },
  {
    imgURL: '/assets/icons/question.svg',
    route: '/ask-question',
    label: 'Ask a question'
  }
]

export const questions: Question[] = [
  {
    _id: '1',
    title: 'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?'
  },
  {
    _id: '2',
    title: 'Is it only me or the font is bolder than necessary?'
  },
  {
    _id: '3',
    title: 'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?'
  },
  {
    _id: '4',
    title: 'Redux Toolkit Not Updating State as Expected?'
  },
  {
    _id: '5',
    title: 'Can I get the course for free?'
  },
  {
    _id: '6',
    title: 'Async/Await Function Not Handling Errors Properly'
  }
]

export const popularTags: Tag[] = [
  {
    _id: '1',
    name: 'nextjs',
    totalQuestion: 22,
    showCount: true
  },
  {
    _id: '2',
    name: 'Javascript',
    totalQuestion: 38,
    showCount: true
  },
  {
    _id: '3',
    name: 'NodeJS',
    totalQuestion: 24,
    showCount: true
  },
  {
    _id: '4',
    name: 'reactjs',
    totalQuestion: 79,
    showCount: true
  }
]

export const filters:Filter[] = [
  {
    _id: 'newest',
    name: 'newest'
  },
  {
    _id: 'recommended',
    name: 'recommended'
  },
  {
    _id: 'frequent',
    name: 'frequent'
  },
  {
    _id: 'unanswered',
    name: 'unanswered'
  }
]

export const questionCards: QuestionCard[] = [
  {
    _id: '1',
    title: "What's this application about?",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium eros nec dui tincidunt, eget tempor nibh vulputate. Proin ornare erat at purus.',
    tags: [
      {
        _id: '1',
        name: 'nextjs'
      },
      {
        _id: '2',
        name: 'Javascript'
      },
      {
        _id: '3',
        name: 'NodeJS'
      }
    ],
    author: {
      _id: '1',
      name: 'Friendly',
      picture: '',
      clerkId: ''
    },
    votes: 300,
    answers: 400,
    views: 400,
    createdAt: '2024-08-05 07:32:55 AM'
  },
  {
    _id: '1',
    title: "What's this application about?",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium eros nec dui tincidunt, eget tempor nibh vulputate. Proin ornare erat at purus.',
    tags: [
      {
        _id: '2',
        name: 'nextjs'
      },
      {
        _id: '2',
        name: 'Javascript'
      },
      {
        _id: '3',
        name: 'NodeJS'
      }
    ],
    author: {
      _id: '1',
      name: 'Friendly',
      picture: '',
      clerkId: ''
    },
    votes: 300,
    answers: 400,
    views: 400,
    createdAt: '2024-08-05 07:32:55 AM'
  },
  {
    _id: '1',
    title: "What's this application about?",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium eros nec dui tincidunt, eget tempor nibh vulputate. Proin ornare erat at purus.',
    tags: [
      {
        _id: '3',
        name: 'nextjs'
      },
      {
        _id: '2',
        name: 'Javascript'
      },
      {
        _id: '3',
        name: 'NodeJS'
      }
    ],
    author: {
      _id: '1',
      name: 'Friendly',
      picture: '',
      clerkId: ''
    },
    votes: 300,
    answers: 400,
    views: 400,
    createdAt: '2024-08-05 07:32:55 AM'
  }
]

export const interactedTags = [{ _id: '1', name: 'nodejs' }, { _id: '2', name: 'html' }, { _id: '3', name: 'css' }]

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 10
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000
  }
}

export const Jobs = [
  {
    job_id: 'DrY7oWfikSvkh5KFAAAAAA==',
    employer_name: 'Robert Half',
    employer_logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    employer_website: 'http://www.rhi.com',
    job_employment_type: 'TEMPORARY',
    job_title: 'Web Developer',
    job_description: 'Our team is in urgent need of an experienced EPiServer Developer to work on crafting efficient and effective Enterprise Ecommerce solutions. The suitable candidate will be adept in backend development, bug tracking, client-side scripting, and CMS management. They will also be responsible for interacting with our business teams and conducting rigorous testing to ensure the optimal function of all systems. Responsibilities:Develop, maintain, and optimize EPiServer-based applications for our ecommerce solutions. Design, build, and manage custom APIs for system integrations. Create and manage effective client-side scripting solutions. Rigorously test all applications and systems before deployment. Work closely with internal teams and stakeholders to understand and fulfill business requirements. Regularly communicate project progress and updates to stakeholders.',
    job_apply_link: 'https://www.roberthalf.com/us/en/job/lake-zurich-il/web-developer/01310-0012976392-usen',
    job_posted_at_datetime_utc: '2024-05-10T21:34:03.000Z',
    job_city: 'Lake Zurich',
    job_state: 'IL',
    job_country: 'US',
    job_max_salary: 64.16,
    job_salary_currency: 'USD',
    job_salary_period: 'HOUR'
  }
]
