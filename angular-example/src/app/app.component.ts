import { Component, OnInit, inject } from '@angular/core';
import { CopilotAutoInitService } from '@auto-no-mous/copilot-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="shell">
      <section class="panel">
        <h1>Angular Copilot Example</h1>
        <p>This sample auto-mounts the widget when the shell component loads.</p>
        <p>Use it to validate route transitions and host page theming.</p>
      </section>
    </main>
  `
})
export class AppComponent implements OnInit {
  private readonly copilot = inject(CopilotAutoInitService);

  async ngOnInit(): Promise<void> {
    await this.copilot.mount();
  }
}
