import { useCallback } from 'react';
import { apiClient } from '../../shared/api/client';
import { useRemoteData } from '../../shared/hooks/useRemoteData';
import SectionIntro from '../../shared/ui/SectionIntro';
import AsyncNotice from '../../shared/ui/AsyncNotice';

export default function PracticeScreen() {
  const loadSets = useCallback(() => apiClient.readPracticeSets(), []);
  const { data, loading, error } = useRemoteData(loadSets, []);

  return (
    <div className="screen-grid single-column">
      <section className="panel">
        <SectionIntro
          tag="Practice"
          title="Short sets that target weak areas"
          text="This section is designed around realistic preparation, not around generic quiz cards."
        />
        <AsyncNotice loading={loading} error={error} />
        <div className="practice-grid">
          {data.map((set) => (
            <article key={set.id} className="practice-card">
              <span className="pill">{set.difficulty}</span>
              <h4>{set.name}</h4>
              <p>{set.questions} questions</p>
              <strong>{set.score}% latest result</strong>
              <button className="primary-btn full-width">Open set</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
