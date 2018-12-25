export class Message {
    who: string;
    message: string;
    time: string;

    constructor(who, message, time?){
        this.who = who;
        this.message = message;
        this.time = time || new Date().toISOString(); 
    }
}
