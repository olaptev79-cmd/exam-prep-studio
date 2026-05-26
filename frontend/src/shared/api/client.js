const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function getJson(path) {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }
  return response.json();
}

export const apiClient = {
  readSnapshot: () => getJson('/api/overview/snapshot'),
  readStudyPlan: () => getJson('/api/planner/subjects'),
  readQueue: () => getJson('/api/tasks/queue'),
  readPracticeSets: () => getJson('/api/practice/sets'),
  readTrend: () => getJson('/api/insights/trend')
};
