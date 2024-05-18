export type SidebarLink = {
    imgURL: string,
    route: string,
    label: string,
}

export type Question = {
    _id: string,
    title: string,
}

export type Tag = {
    _id: string,
    name: string,
    totalQuestion?: number,
    showCount?: boolean,
}

export type User = {
    _id: string,
    name: string,
    picture?: string,
    clerkId?: string,
}

export interface QuestionCard{
    _id: string,
    title: string,
    description: string,
    tags: Tag[],
    author: User,
    votes:number,
    answers:number,
    views:number,
    createdAt: string,
}

export interface Filter{
    _id: string,
    name: string
}
