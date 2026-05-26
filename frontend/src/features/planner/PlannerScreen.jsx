import { useCallback } from 'react';
import { apiClient } from '../../shared/api/client';
import { useRemoteData } from '../../shared/hooks/useRemoteData';
import SectionIntro from '../../shared/ui/SectionIntro';
import AsyncNotice from '../../shared/ui/AsyncNotice';

export default function PlannerScreen() {
  const loadPlan = useCallback(() => apiClient.readStudyPlan(), []);
  const { data, loading, error } = useRemoteData(loadPlan, []);

  return (
    <div className="screen-grid single-column">
      <section className="panel">
        <SectionIntro
          tag="Planner"
          title="Study plan with real priorities"
          text="The planner keeps weak topics visible so the next session has a clear purpose."
        />
        <AsyncNotice loading={loading} error={error} />
        <div className="table-wrap responsive-table">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Priority</th>
                <th>Exam date</th>
                <th>Progress</th>
                <th>Weak topic</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td data-label="Subject">{row.name}</td>
                  <td data-label="Priority">{row.priority}</td>
                  <td data-label="Exam date">{row.examDate}</td>
                  <td data-label="Progress">{row.progress}%</td>
                  <td data-label="Weak topic">{row.weakTopic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
