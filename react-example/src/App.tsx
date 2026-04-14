import { useCopilot } from '@auto-no-mous/copilot-react';

export function App() {
  useCopilot({
    appId: 'app_demo_react',
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

  return (
    <main>
      <section className="panel">
        <h1>React Copilot Example</h1>
        <p>This sample mounts the widget through the React wrapper hook.</p>
        <p>Use it to validate host app routing, layout collisions, and token minting.</p>
      </section>
    </main>
  );
}
