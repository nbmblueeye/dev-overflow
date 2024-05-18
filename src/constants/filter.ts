import { Filter } from '@/types/type'

export const AnswerFilters:Filter[] = [
  { name: 'Highest Upvotes', _id: 'highestUpvotes' },
  { name: 'Lowest Upvotes', _id: 'lowestUpvotes' },
  { name: 'Most Recent', _id: 'recent' },
  { name: 'Oldest', _id: 'old' }
]

export const UserFilters = [
  { name: 'New Users', _id: 'new_users' },
  { name: 'Old Users', _id: 'old_users' },
  { name: 'Top Contributors', _id: 'top_contributors' }
]

export const QuestionFilters = [
  { name: 'Most Recent', _id: 'most_recent' },
  { name: 'Oldest', _id: 'oldest' },
  { name: 'Most Voted', _id: 'most_voted' },
  { name: 'Most Viewed', _id: 'most_viewed' },
  { name: 'Most Answered', _id: 'most_answered' }
]

export const TagFilters = [
  { name: 'Popular', _id: 'popular' },
  { name: 'Recent', _id: 'recent' },
  { name: 'Name', _id: 'name' },
  { name: 'Old', _id: 'old' }
]

export const HomePageFilters = [
  { name: 'Newest', _id: 'newest' },
  { name: 'Recommended', _id: 'recommended' },
  { name: 'Frequent', _id: 'frequent' },
  { name: 'Unanswered', _id: 'unanswered' }
]

export const GlobalSearchFilters = [
  { name: 'Question', _id: 'question' },
  { name: 'Answer', _id: 'answer' },
  { name: 'User', _id: 'user' },
  { name: 'Tag', _id: 'tag' }
]
