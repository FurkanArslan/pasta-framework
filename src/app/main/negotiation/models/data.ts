export interface DataBase {
    id: string;
    name: string;
    cdate?: Date;
}

export interface RolesData extends DataBase {
    moreGeneral?: string[];
    exclusive?: string[];
    equal?: string[];
}

export interface ConditionsData extends DataBase {
    sub_condition?: string[];
}

export interface Data extends DataBase {
    sub_data?: string[];
}

export interface ActionsData extends DataBase {
    promotes: string[];
    demotes: string[];
    moreGeneral: string[];
}
