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

export type QuestionCard = {
    _id: string,
    title: string,
    description: string,
    tags: Tag[],
    votes:number,
    answers:number,
    views:number,
    author: User,
    createdAt: string,
}