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
