export interface DataBase {
    id: string;
    name: string;
    cdate?: Date;
}

export interface RolesData extends DataBase{
    sub_roles?: string[];
}

export interface ConditionsData extends DataBase{
    sub_condition?: string[];
}

export interface Data extends DataBase{
    sub_data?: string[];
}
