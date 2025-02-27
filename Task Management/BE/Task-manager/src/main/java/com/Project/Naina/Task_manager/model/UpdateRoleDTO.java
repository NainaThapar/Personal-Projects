package com.Project.Naina.Task_manager.model;

public class UpdateRoleDTO {
    private Role role;

    public UpdateRoleDTO() {}

    public UpdateRoleDTO(Role role) {
        this.role = role;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
