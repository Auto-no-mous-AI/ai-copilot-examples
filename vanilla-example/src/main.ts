import './styles.css';
import { initCopilot } from '@auto-no-mous/copilot-web';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <main>
      <section class="card">
        <h1>Vanilla JavaScript Copilot</h1>
        <p>This host app embeds the widget with a local mock token service.</p>
        <p>Click the floating button once the page loads.</p>
      </section>
    </main>
  `;
}

void initCopilot({
  appId: 'app_demo_vanilla',
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
});
