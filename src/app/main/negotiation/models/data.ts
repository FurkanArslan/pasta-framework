export interface FirebaseData {
    id: string;
    name: string;
    cdate?: Date;
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
    moreGeneral: string[];
}

export interface ConsequentData extends FirebaseData {
    promotes: string[];
    demotes: string[];
}
