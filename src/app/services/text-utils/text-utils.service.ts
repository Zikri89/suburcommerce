import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextUtilsService {
  limitText(text: string | null | undefined, limit: number): string {
    // Check if text is null or undefined
    if (text == null || text == "") {
      return 'No Description'; // or some default value
    }

    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}

