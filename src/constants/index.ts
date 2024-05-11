import { Tag, Question, SidebarLink, QuestionCard } from '@/types/type'

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

export const filters: Tag[] = [
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
