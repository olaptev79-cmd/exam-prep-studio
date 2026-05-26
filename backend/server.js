const express = require('express');
const cors = require('cors');
const overviewRoutes = require('./src/routes/overviewRoutes');
const plannerRoutes = require('./src/routes/plannerRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const practiceRoutes = require('./src/routes/practiceRoutes');
const insightRoutes = require('./src/routes/insightRoutes');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_, res) => {
  res.json({ ok: true, service: 'exam-prep-studio-api' });
});

app.use('/api/overview', overviewRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/insights', insightRoutes);

app.listen(port, () => {
  console.log(`API running on ${port}`);
});
