import { useCallback } from 'react';
import { apiClient } from '../../shared/api/client';
import { useRemoteData } from '../../shared/hooks/useRemoteData';
import SectionIntro from '../../shared/ui/SectionIntro';
import AsyncNotice from '../../shared/ui/AsyncNotice';

const upcomingFocus = [
  'Revisit probability shortcuts before tomorrow evening.',
  'Keep physics revision earlier in the day while energy is high.',
  'Do one complete timed set before the weekend.'
];

const subjectPreview = [
  { name: 'Mathematics', topic: 'Probability', progress: 78, date: 'May 30' },
  { name: 'Physics', topic: 'Optics', progress: 69, date: 'Jun 2' },
  { name: 'English', topic: 'Essay structure', progress: 84, date: 'Jun 5' }
];

export default function OverviewScreen() {
  const loadSnapshot = useCallback(() => apiClient.readSnapshot(), []);
  const { data, loading, error } = useRemoteData(loadSnapshot, null);

  const cards = [
    { label: 'Readiness', value: data ? `${data.readinessScore}%` : '--', note: 'Up from last week' },
    { label: 'Study hours', value: data ? `${data.studyHours}h` : '--', note: 'Better consistency' },
    { label: 'Open tasks', value: data ? data.openTasks : '--', note: 'Queue is manageable' },
    { label: 'Next exam', value: data?.nextExamLabel || '--', note: 'Closest deadline first' }
  ];

  return (
    <div className="screen-grid">
      <section className="panel panel-span-8">
        <SectionIntro
          tag="Overview"
          title="A calm view of what matters this week"
          text="This screen is built for quick orientation before a study block, not for busywork."
        />
        <AsyncNotice loading={loading} error={error} />
        <div className="metric-grid">
          {cards.map((card) => (
            <article key={card.label} className="metric-card">
              <p>{card.label}</p>
              <strong>{card.value}</strong>
              <span>{card.note}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel-span-4 panel-accent">
        <SectionIntro
          tag="Focus"
          title={data?.nextExamTitle || 'Mathematics final is approaching'}
          text={data?.focusMessage || 'One targeted revision session today is worth more than scattered studying.'}
        />
        <ul className="plain-list">
          {upcomingFocus.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="panel panel-span-7">
        <SectionIntro tag="Subjects" title="Preparation snapshot" />
        <div className="subject-stack">
          {subjectPreview.map((subject) => (
            <article key={subject.name} className="subject-card">
              <div>
                <h4>{subject.name}</h4>
                <p>Current weak area: {subject.topic}</p>
              </div>
              <div className="subject-meta">
                <span>{subject.date}</span>
                <div className="progress-bar"><i style={{ width: `${subject.progress}%` }} /></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel-span-5">
        <SectionIntro tag="Today" title="Suggested queue" />
        <div className="task-stack">
          {[
            ['Solve one mixed probability set', 'Mathematics', '45 min'],
            ['Review optics flashcards', 'Physics', '25 min'],
            ['Rewrite one essay opening', 'English', '20 min']
          ].map(([title, area, time]) => (
            <article key={title} className="task-card">
              <div>
                <h4>{title}</h4>
                <p>{area}</p>
              </div>
              <span>{time}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
