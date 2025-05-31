// src/app/directives/type-highlight.directive.ts

import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTypeHighlight]'   // ← ne pas ajouter `standalone: true`
})
export class TypeHighlightDirective implements OnChanges {
  @Input('appTypeHighlight') type: 'Absence' | 'Retard' | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.type) {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      return;
    }
    if (this.type === 'Absence') {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#FFECEC');
    } else if (this.type === 'Retard') {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#FFF7E6');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    }
  }
}
