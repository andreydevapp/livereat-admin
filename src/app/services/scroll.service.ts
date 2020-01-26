import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  private subject = new Subject<any>();

  private ruting = new Subject<any>();

  sendScroll(message: string) {
    this.subject.next({ direccion: message });
  }

  clearScroll() {
    this.subject.next();
  }

  getScroll(): Observable<any> {
    return this.subject.asObservable();
  }
  //

  sendScrollChat(message: string) {
    this.subject.next({ direccion: message });
  }

  clearScrollChat() {
    this.subject.next();
  }

  getScrollChat(): Observable<any> {
    return this.subject.asObservable();
  }

  //

  sendRuting(message: string) {
    this.ruting.next({ direccion: message });
  }

  clearRuting() {
    this.ruting.next();
  }

  getRuting(): Observable<any> {
    return this.ruting.asObservable();
  }

}
