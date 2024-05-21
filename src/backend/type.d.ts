import { BADGE_CRITERIA } from '@/constants'

export interface createUserParams {
    clerkId?: string,
    name: string,
    username: string,
    email: string,
    picture?: string,
}

export interface updateUserParams {
    clerkId: string,
    updateData:Partial<createUserParams>,
    path: string,
}

export interface deleteUserParams {
    clerkId: string,
    path: string,
}

export interface getUserByIdParams{
    clerkId: string,
}

export interface getAllUsersParams{
    searchQuery: string,
    filter: string,
    page?: number,
    pageSize?: number,
}

export interface getAllSavedQuestionToUserParams{
    userId: string,
    searchQuery: string,
    filter: string,
    page?: number,
    pageSize?: number,
}

export interface editUserProfileParams{
    userId: string,
    name: string,
    username: string,
    location: string,
    portfolioWebsite: string,
    bio: string,
    path: string,
}

export interface getHandleSavedQuestionParams{
    userId: string,
    questionId: string,
    isSavedQuestion: boolean,
    path: string,
}

export interface createQuestionParams{
    title: string,
    description: string,
    tags: string[],
    author: string,
    path: string,
}

export interface editQuestionParams{
    questionId: string,
    title: string,
    description: string,
    path: string,
}

export interface getAllQuestionsParams{
    searchQuery: string,
    filter: string,
    page?: number,
    pageSize?: number,
}

export interface getRecommentQuestionsParams{
    userId: string,
    searchQuery: string,
    page?: number,
    pageSize?: number,
}

export interface getQuestionByIdParams{
    _id: string,
    filter?: string,
    page?: number,
    pageSize?: number,
}

export interface getQuestionVotesParams{
    userId: string,
    questionId: string,
    isUpvoted: boolean,
    isDownvoted: boolean,
    path: string
}

export interface getAnswerVotesParams{
    userId: string,
    answerId: string,
    isUpvoted: boolean,
    isDownvoted: boolean,
    path: string
}

export interface createAnswerParams{
    author: string,
    question: string,
    content: string,
    path: string,
}

export interface getAnswerByQuestionIDParams{
    question: string,
}

export interface addUserViewQuestionParams{
    userId: string,
    userAction: string,
    questionId?: string,
    answerId?: string,
    tagId?: string,
}

export interface getAllTagsParams{
    searchQuery: string,
    filter: string,
    page?: number,
    pageSize?: number,
}

export interface getAllQuestionByTagParams{
    tagId: string,
}

export interface getQuestionByUserIdParams{
    userId: string,
    page?: number,
    pageSize?: number,
}

export interface getAnswerByUserIdParams{
    userId: string,
    page?: number,
    pageSize?: number,
}

export interface deleteQuestionByIdParams{
    questionId: string,
    path: string,
}

export interface deleteAnswerByIdParams{
    answerId: string,
    path: string,
}

export type badgeKeyTypes = keyof typeof BADGE_CRITERIA
