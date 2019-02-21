import { StaffType } from './staff-type.enum';

export interface FirebaseData {
    id: string;
    name: string;
    cdate: Date;
    moreGeneral?: string[];
    exclusive?: string[];
    equal?: string[];
    shortName?: string;
}

export interface Data extends FirebaseData {
    sub_data?: string[];
}

export interface ActionsData extends FirebaseData {
    promotes: string[];
    demotes: string[];
}

export interface ConsequentData extends FirebaseData {
    promotes: string[];
    demotes: string[];
}

export interface RolesData extends FirebaseData {
    staff_type: StaffType;
}

export interface AntecedentData extends FirebaseData {
    more_general_hospital?: string[];
    exclusive_hospital?: string[];
    related_to?: string[];
}
