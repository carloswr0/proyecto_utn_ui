export type UserWorkspaces = {
    member_id: string,
    member_role: string,
    member_created_at: string,
    workspace_id: string,
    workspace_title: string,
    workspace_description?: string,
    created_at: Date,
    active?: boolean,
    url_image: string,
}

export type WorkspaceDetails = {
    workspace_id: string,
    title: string,
    description?: string,
    created_at: Date,
    active?: boolean,
    url_image: string,
}

export type WorkspaceMember = {
    member_created_at: string,
    member_id: string,
    member_role: string,
    user_email: string,
    user_id: string,
    user_name: string,
    workspace_description?: string,
    workspace_id: string,
    workspace_title: string,
}