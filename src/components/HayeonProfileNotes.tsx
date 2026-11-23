import { useI18n } from '../i18n/I18nContext';

type Lang = 'ko' | 'en' | 'ja';
type Copy = { heading:string; intro:string; labels:[string,string,string]; descriptions:[string,string,string]; source:string };
const TEXT: Record<Lang,Copy> = {
  ko: { heading:'하연의 기록', intro:'공개된 활동과 확인 가능한 출처를 중심으로 정리했습니다.',
    labels:['S19 · REVEAL','NXT · UNIT','msnz · zenith'],
    descriptions:['2023년 12월 23일, tripleS의 열아홉 번째 멤버로 공개.',
      '2023년 공개된 NXT의 멤버로서 〈Just Do It〉 활동.',
      '2025년 msnz zenith에 참여해 〈Q&A〉 활동.'], source:'자료 보기' },
  en: { heading:'The HaYeon Record', intro:'A concise guide to documented activities and their public sources.',
    labels:['S19 · REVEAL','NXT · UNIT','msnz · zenith'],
    descriptions:['Introduced as the nineteenth member on December 23, 2023.',
      'Member of NXT, introduced in 2023 with “Just Do It”.',
      'Joined msnz zenith for “Q&A” activities in 2025.'], source:'View source' },
  ja: { heading:'ハヨンの記録', intro:'公開された活動と出典に基づいて整理しました。',
    labels:['S19 · REVEAL','NXT · UNIT','msnz · zenith'],
    descriptions:['2023年12月23日にtripleSの19番目のメンバーとして公開。',
      '2023年に公開されたNXTのメンバー。「Just Do It」で活動。',
      '2025年、msnz zenithとして「Q&A」で活動。'], source:'出典を見る' },
};
const REFERENCES = [
  'https://triples.fandom.com/wiki/Jeong_HaYeon',
  'https://triplesfans.com/dimensions/nxt',
  'https://triplesfans.com/dimensions/zenith',
];

export default function HayeonProfileNotes() {
  const { language } = useI18n();
  const copy = TEXT[language];
  return <section className="hayeon-profile-notes" aria-labelledby="hayeon-profile-notes-title">
    <header className="hayeon-profile-notes-head">
      <div><span>MEMBER ARCHIVE / S19</span><h2 id="hayeon-profile-notes-title">{copy.heading}</h2></div>
      <p>{copy.intro}</p>
    </header>
    <div className="hayeon-profile-notes-grid">
      {copy.labels.map((label, index) => <article key={label}>
        <small>{String(index + 1).padStart(2,'0')} / {label}</small>
        <h3>{label.split(' · ')[0]}</h3>
        <p>{copy.descriptions[index]}</p>
        <a href={REFERENCES[index]} target="_blank" rel="noopener noreferrer">{copy.source} ↗</a>
      </article>)}
    </div>
  </section>;
}
