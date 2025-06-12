import { Component, input, InputSignal, output } from "@angular/core";

@Component({
  selector: "app-widget",
  standalone: true,
  styles: `
  :host {
    display: block;
    width: 80%;
  }
  `,
  template: `
    <div class="widget-header">
      <p></p>
      <div class="widget-title">{{ title() }} - {{ count() }}</div>
      <div class="widget-sub-title">{{ description() }}</div>
      <button class="action" (click)="closedHandler()">close</button>
      <hr>
      @if(!collapsed()) {
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Eos eveniet facere nesciunt recusandae totam, ullam?
          Dolor dolorum error eveniet id numquam recusandae saepe totam ut voluptate.
          Ipsum, itaque nulla? Aperiam autem consequuntur eaque eius error fuga illo incidunt
          inventore ipsam, iure molestiae neque nisi odio placeat praesentium repellendus rerum unde?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Eos eveniet facere nesciunt recusandae totam, ullam?
          Dolor dolorum error eveniet id numquam recusandae saepe totam ut voluptate.
          Ipsum, itaque nulla? Aperiam autem consequuntur eaque eius error fuga illo incidunt
          inventore ipsam, iure molestiae neque nisi odio placeat praesentium repellendus rerum unde?
          <button style="margin-top: 16px" (click)="collapseFromComponent.emit(true)">Collapse text</button>
        </div>

      }
      <div>
        <button (click)="countChange.emit(this.count() + 1)">Change Count</button>
      </div>
    </div>
  `,
})
export class WidgetComponent {
  public title: InputSignal<string> = input("__Widget__");
  public description: InputSignal<string> = input("__Widget description__");
  public collapsed: InputSignal<boolean> = input(false);
  public count: InputSignal<number> = input.required();

  public closed = output<void>();
  public collapseFromComponent = output<boolean>();
  public countChange = output<number>();

  closedHandler() {
    this.closed.emit()
  }
}
