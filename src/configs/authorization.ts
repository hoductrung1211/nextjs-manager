export const enum Role {
    // Client = "client",
    HR = "HR",
    HiringManager = "Hiring Manager",
    Employee = "Employee"
}

export const getRole = () : Role | undefined => {
    if (localStorage) {
        const role = localStorage.getItem("role");
        switch (role) {
            // case Role.Client:
            //     return Role.Client;
            case Role.HR:
                return Role.HR;
            case Role.Employee:
                return Role.Employee;
            case Role.HiringManager:
                return Role.HiringManager;
            default:
                return undefined;
        }
    }
    return undefined;
}