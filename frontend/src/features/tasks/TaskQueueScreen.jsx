import { useCallback } from 'react';
import { apiClient } from '../../shared/api/client';
import { useRemoteData } from '../../shared/hooks/useRemoteData';
import SectionIntro from '../../shared/ui/SectionIntro';
import AsyncNotice from '../../shared/ui/AsyncNotice';

export default function TaskQueueScreen() {
  const loadQueue = useCallback(() => apiClient.readQueue(), []);
  const { data, loading, error } = useRemoteData(loadQueue, []);

  return (
    <div className="screen-grid two-column-layout">
      <section className="panel">
        <SectionIntro
          tag="Tasks"
          title="A queue that feels realistic"
          text="Short tasks, clear outcomes and no fake productivity clutter."
        />
        <AsyncNotice loading={loading} error={error} />
        <div className="task-stack">
          {data.map((task) => (
            <article key={task.id} className="task-card task-card-lg">
              <div>
                <h4>{task.title}</h4>
                <p>{task.subject}</p>
              </div>
              <div className="task-meta-row">
                <span>{task.status}</span>
                <span>{task.duration}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <SectionIntro tag="Notes" title="What to keep in mind" />
        <ul className="plain-list">
          <li>Do the hardest revision first while focus is still fresh.</li>
          <li>Keep one short win in the queue to avoid losing momentum.</li>
          <li>Review mistakes on the same day instead of postponing them.</li>
        </ul>
      </section>
    </div>
  );
}
