
export interface Rank {
    Id: number;
    RankId: number;
    Level: number;
    Salary: number;
}

export interface EmployeeType extends AddEmployeeType {
    Id: number;
    Rank: Rank;
}

export type AddEmployeeType = {
    EmployeeId: number;
    Name: string;
    Surname: string;
    BirthDate: string;
    Email: string;
    Phone: string;
    IdentityNumber: string;
}

export const AddEmployeeTypeDefault: AddEmployeeType = {
    EmployeeId: 0,
    Name: '',
    Surname: '',
    BirthDate: '',
    Email: '',
    Phone: '',
    IdentityNumber: '',
}
