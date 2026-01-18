import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  constructor() { }

  setItem(key: string, str: string): void {
    localStorage.setItem(key, str);
  }

  getItem(key: string): string | null {
    const item: string | null = localStorage.getItem(key);
    return item;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}
