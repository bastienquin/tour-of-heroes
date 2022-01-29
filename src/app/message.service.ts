import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class MessageService {

    messages: Array<{ component: string, message: string }> = [];

    add(message: { component: string, message: string }) {
        this.messages.push(message);
    }

    remove(message: { component: string, message: string }) {
        this.messages = this.messages.filter(m => m !== message);
    }

}
