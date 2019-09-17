export class Message {
    who: string;
    message: string;
    time: string;
    isBid: boolean;

    constructor(who, message, isBid?, time?){
        this.who = who;
        this.message = message;
        this.time = time || new Date().toISOString(); 
        this.isBid = !!isBid;
    }
}
