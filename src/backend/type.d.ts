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