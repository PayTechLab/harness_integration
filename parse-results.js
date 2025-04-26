const fs = require('fs');
const path = './reports/results.json'; // Path to the JSON report

// Check if the file exists
if (fs.existsSync(path)) {
  const data = fs.readFileSync(path, 'utf8');
  const results = JSON.parse(data);

  // Enrich the output with request details
  const enrichedRequests = results.requests.map((req) => ({
    name: req.name,
    executionTime: `${req.executionTime} ms`,
    status: req.status === 'success' ? '✅ Success' : '❌ Failed',
  }));

  // Save enriched results to a new file
  const enrichedPath = './reports/enriched-results.json';
  fs.writeFileSync(enrichedPath, JSON.stringify({ enrichedRequests }, null, 2));

  console.log('Enriched report generated:', enrichedPath);
} else {
  console.error('results.json not found at path:', path);
  process.exit(1);
}