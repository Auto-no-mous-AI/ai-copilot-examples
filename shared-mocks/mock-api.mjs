import http from 'node:http';

const port = Number(process.env.PORT ?? 4010);

const json = (res, status, payload) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type, authorization',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
  });
  res.end(JSON.stringify(payload, null, 2));
};

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    json(res, 400, { error: 'Missing URL' });
    return;
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'content-type, authorization',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api/copilot/install-token') {
    json(res, 200, { token: 'demo-install-token' });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/copilot/config') {
    json(res, 200, {
      appId: 'app_demo_supplier_portal',
      environment: 'dev',
      apiBaseUrl: `http://127.0.0.1:${port}/api`,
      theme: {
        primary: '#1f2a7a',
        icon: 'spark',
        drawerWidth: 420,
        placement: 'right'
      },
      features: {
        ask: true,
        test: true,
        agent: true
      }
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
    json(res, 200, {
      role: 'assistant',
      content: `Demo response for \"${body.message ?? 'empty prompt'}\" from the local mock API.`,
      citations: [
        {
          title: 'supplier-portal/README.md',
          url: 'https://github.com/Auto-no-mous-AI/ai-copilot-platform',
          score: 0.93
        }
      ]
    });
    return;
  }

  json(res, 404, { error: 'Not found', path: req.url });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Mock copilot API listening on http://127.0.0.1:${port}`);
});
