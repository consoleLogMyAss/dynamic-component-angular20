import {
  Component, ComponentRef,
  inputBinding, outputBinding, signal,
  Signal, twoWayBinding,
  viewChild,
  ViewContainerRef, WritableSignal
} from '@angular/core';
import { WidgetComponent } from './component/widget.component';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <h1 class="page-title">Dynamic Components</h1>

    <main id="content">
      <button class="collapse create" (click)="setCompatMode()">Toggle collpsed</button>
      <button class="count create" (click)="setCount()">Set count - {{ count() }}</button>
      <ng-container #container />
      <section class="toolbar">
        <button (click)="createComponent()" class="create">Create Component</button>
      </section>
    </main>`,
  styleUrl: './app.scss'
})
export class App {
  protected compactMode: WritableSignal<boolean> = signal(false);
  protected count: WritableSignal<number> = signal(0);

  private vcr: Signal<ViewContainerRef> = viewChild.required('container', { read: ViewContainerRef });

  createComponent() {
    const refContainer: ComponentRef<WidgetComponent> = this.vcr().createComponent(WidgetComponent, {
      bindings: [
        // устанавливаем инпуты для динамического компонента
        inputBinding('title', () => 'Weather'),
        inputBinding('description', () => 'Как однажды жак звонарь'),
        inputBinding('collapsed', this.compactMode), // передали сигнал как инпут
        outputBinding('collapseFromComponent', (collapsed: boolean) => { // это output
          this.compactMode.set(collapsed)
        }),
        outputBinding('closed', () => {
          this.vcr().remove()
        }),
        twoWayBinding('count', this.count) // это двойное связывание
      ],
      directives: [// сюда вставляем директивы
        // MyDirective, - директива без инпутов

        // { - директива с инпутами
        //   type: DirectiveName - сама директива
        //   bindings: [
        //     inputBinding('title', () => 'Weather'), - инпуты
        //   ]
        // }
      ]
    });
  }

  protected setCompatMode() {
    this.compactMode.update(v => !v);
  }
  protected setCount() {
    this.count.update(v => v + 1);
  }
}
