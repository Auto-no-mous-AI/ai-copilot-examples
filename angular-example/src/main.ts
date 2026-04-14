import { bootstrapApplication } from '@angular/platform-browser';
import { provideCopilot } from '@auto-no-mous/copilot-angular';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    ...provideCopilot({
      appId: 'app_demo_angular',
      environment: 'dev',
      apiBaseUrl: 'http://127.0.0.1:4010/api',
      getToken: async () => {
        const response = await fetch('http://127.0.0.1:4010/api/copilot/install-token');
        const payload = await response.json();
        return payload.token;
      },
      theme: {
        primary: '#1f2a7a',
        icon: 'spark',
        drawerWidth: 420,
        placement: 'right'
      }
    })
  ]
}).catch((error) => console.error(error));
