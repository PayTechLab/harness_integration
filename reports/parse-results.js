import { existsSync, readFileSync, writeFileSync } from 'fs';
const path = './reports/results.json'; // Path to the JSON report

// Check if the file exists
if (existsSync(path)) {
  const data = readFileSync(path, 'utf8');
  const results = JSON.parse(data);

  // Log the entire results object for debugging
  console.log('Results:', results);

  // Check if "requests" exists and is an array
  if (results.requests && Array.isArray(results.requests)) {
    // Enrich the output with request details
    const enrichedRequests = results.requests.map((req) => ({
      name: req.name || 'Unknown Request',
      executionTime: `${req.executionTime || 'Unknown'} ms`,
      status: req.status === 'success' ? '✅ Success' : '❌ Failed',
    }));

    // Save enriched results to a new file
    const enrichedPath = './reports/enriched-results.json';
    writeFileSync(enrichedPath, JSON.stringify({ enrichedRequests }, null, 2));

    console.log('Enriched report generated:', enrichedPath);
  } else {
    console.error('Invalid structure in results.json: "requests" is missing or not an array.');
    process.exit(1);
  }
} else {
  console.error('results.json not found at path:', path);
  process.exit(1);
}