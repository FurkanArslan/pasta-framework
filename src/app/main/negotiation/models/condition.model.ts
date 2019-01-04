import { FuseUtils } from '@fuse/utils';

export class Condition {
    id: string;
    name: string;
    negative: boolean;

    constructor(name: string, negative: boolean) {
        this.id = FuseUtils.generateGUID();
        this.name = name;
        this.negative = negative;
    }
}
