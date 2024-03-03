interface RawUserData {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    groups: string[];
    last_login: string;
    date_joined: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
    email_verification_required: boolean;
}

export class User {
    public readonly id: number;
    public readonly username: string;
    public readonly email: string;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly groups: string[];
    public readonly lastLogin: string;
    public readonly dateJoined: string;
    public readonly isStaff: boolean;
    public readonly isSuperuser: boolean;
    public readonly isActive: boolean;

    constructor(initialData: RawUserData){
        this.id = initialData.id
        this.username = initialData.username
        this.email = initialData.email
        this.firstName = initialData.first_name
        this.lastName = initialData.last_name
        this.groups = initialData.groups
        this.lastLogin = initialData.last_login
        this.dateJoined = initialData.date_joined
        this.isStaff = initialData.is_staff
        this.isSuperuser = initialData.is_superuser
        this.isActive = initialData.is_active        
    }
}