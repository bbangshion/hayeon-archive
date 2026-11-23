import { useI18n } from '../i18n/I18nContext';
import { ArrowIcon } from './Icons';
import { ProfileHistory } from './ProfileHistory';

type L = 'ko'|'en'|'ja';
type LText = Record<L,string>;
const text = (ko:string, en:string, ja:string): LText => ({ko,en,ja});
const facts = [
  {name:text('본명','Full name','本名'), value:text('정하연','Jeong HaYeon','チョン・ハヨン')},
  {name:text('활동명','Stage name','活動名'), value:text('하연 · HaYeon','HaYeon','ハヨン')},
  {name:text('소속 그룹','Group','所属グループ'), value:text('tripleS','tripleS','tripleS')},
  {name:text('멤버 번호','Member number','メンバー番号'), value:text('S19','S19','S19')},
  {name:text('생일','Birthday','誕生日'), value:text('2007년 8월 1일','August 1, 2007','2007年8月1日')},
  {name:text('첫 공개','First reveal','初公開'), value:text('2023년 12월 23일','December 23, 2023','2023年12月23日')},
  {name:text('대표 컬러','Member color','メンバーカラー'), value:text('Medium Turquoise · #52D9BB','Medium Turquoise · #52D9BB','ミディアムターコイズ · #52D9BB')},
];
const units = [
  {id:'NXT', years:'2023 —', mark:'UNIT 01', title:text('넥스트 · 첫 유닛','NXT · first unit','NXT・最初のユニット'),
   members:'린 · 주빈 · 하연 · 시온', song:'Just Do It', link:'https://triplesfans.com/dimensions/nxt',
   desc:text('2023년 12월 공개된 네 멤버로 결성된 유닛. 〈Just Do It〉으로 활동을 시작했습니다.','Four-member unit with Lynn, JooBin, HaYeon and ShiOn.','リン・ジュビン・ハヨン・シオンによる4人ユニット。')},
  {id:'Alphie', years:'2025', mark:'TOUR', title:text('알피 · Alpha Percent','Alphie · Alpha Percent','Alphie・Alpha Percent'),
   members:'김유연 · 코토네 · 니엔 · 린 · 정하연 · 박시온 · 김채원 · 지연',song:'Lit Pop',link:'https://triples.fandom.com/wiki/Alphie',
   desc:text('2025년 투어를 위해 구성된 프로젝트 유닛.','Project unit formed for the 2025 Alpha Percent tour.','2025年ツアーのプロジェクトユニット。')},
  {id:'zenith',years:'2025 —',mark:'MSNZ', title:text('제니스 · msnz','zenith · msnz','zenith・msnz'),
   members:'정하연 · 공유빈 · 이지우 · 김수민 · 곽연지 · 주빈',song:'Q&A',link:'https://triplesfans.com/dimensions/zenith',
   desc:text('msnz의 6인 유닛으로 〈Q&A〉를 발표했습니다.','Six-member msnz unit that released Q&A.','msnzの6人ユニット。「Q&A」をリリースしました。')},
];
const references = [
  {label:'tripleS Official Profile', url:'https://www.triples-official.jp/profile/'},
  {label:'tripleS Wiki — Jeong HaYeon', url:'https://triples.fandom.com/wiki/Jeong_HaYeon'},
  {label:'tripleS WAV — HaYeon', url:'https://triplesfans.com/members/hayeon'},
  {label:'tripleS msnz · Beyond Beauty', url:'https://www.koreatimes.co.kr/entertainment/k-pop/20251124/triples-returns-with-full-24-member-lineup-in-unit-driven-album-beyond-beauty'},
];
export function ProfilePage() {
  const {language} = useI18n();
  const t=(value:LText)=>value[language];
  return <section className="shion-profile animate-appear pb-12" aria-labelledby="profile-heading">
    <header className="shion-page-heading">
      <span className="shion-page-kicker">S19 / PROFILE</span>
      <h1 id="profile-heading">{t(text('정하연','Jeong HaYeon','チョン・ハヨン'))}</h1>
      <p>tripleS · HaYeon</p>
    </header>
    <nav aria-label={t(text('프로필 목차','Profile sections','プロフィール目次'))} className="-mx-1 mb-10 flex gap-2 overflow-x-auto px-1 pb-3 sm:mb-12">
      {[['basic',text('소개','About','紹介')],['units',text('유닛','Units','ユニット')],['history',text('활동 기록','History','活動記録')],['references',text('출처','Sources','出典')]] .map(([id,label])=><a key={id as string} href={`#profile-${id}`} onClick={e=>{e.preventDefault();document.getElementById(`profile-${id}`)?.scrollIntoView({behavior:'smooth',block:'start'});}} className="shrink-0 rounded-sm border border-white/[.12] bg-white/[.025] px-3.5 py-2.5 text-[12px] text-[#cfc6cf] hover:border-[#52D9BB] hover:text-white">{t(label as LText)}</a>)}
    </nav>
    <div id="profile-basic" className="shion-profile-intro scroll-mt-28">
      <figure className="shion-profile-portrait">
        <img src={`${import.meta.env.BASE_URL}images/hayeon-home.jpg`} alt={t(text('정하연 프로필 커버 이미지','HaYeon portrait','ハヨンのポートレート'))} width="1152" height="1536" loading="eager" decoding="async" />
        <figcaption>Jeong HaYeon · S19</figcaption>
      </figure>
      <div className="shion-profile-info">
        <span className="shion-page-kicker">TRIPLES / S19</span>
        <h2>Jeong HaYeon</h2>
        <p className="shion-profile-sub">{t(text('tripleS의 열아홉 번째 멤버. NXT, Alphie, msnz zenith를 거쳐 서로 다른 무대에서 하연만의 장면을 쌓아가고 있습니다.',
          'The nineteenth member of tripleS, with projects spanning NXT, Alphie and msnz zenith.',
          'tripleSの19番目のメンバー。NXT、Alphie、msnz zenithで活動。'))}</p>
        <div className="mb-8 flex flex-wrap gap-2">{['S19','NXT','Alphie','zenith'].map(v=><span key={v} className="inline-flex min-h-8 items-center rounded-sm border border-[#52D9BB]/30 bg-[#52D9BB]/[.07] px-3 py-1.5 text-[11px] text-[#b5efde]">{v}</span>)}</div>
        <dl className="shion-fact-grid">{facts.map(row=><div key={row.name.ko}><dt>{t(row.name)}</dt><dd>{t(row.value)}</dd></div>)}</dl>
        <a className="shion-official-link" href="https://www.triples-official.jp/profile/" target="_blank" rel="noopener noreferrer">{t(text('공식 프로필','Official profile','公式プロフィール'))} <ArrowIcon width={16} height={16}/></a>
      </div>
    </div>
    <section id="profile-units" className="mt-20 scroll-mt-28 sm:mt-28">
      <span className="shion-page-kicker">DIMENSIONS</span>
      <h2 className="mt-2 mb-2 text-[clamp(27px,4vw,40px)] font-medium tracking-[-.04em]">{t(text('활동 유닛','Units','ユニット'))}</h2>
      <p className="mb-7 max-w-2xl text-sm leading-7 text-ash">{t(text('유닛을 누르면 곡과 구성원을 확인할 수 있습니다.','Open a unit for members and releases.','ユニットを開いてメンバーと楽曲を確認できます。'))}</p>
      <div className="divide-y divide-white/[.12] border-y border-white/[.13]">{units.map(unit=><details className="group" key={unit.id}>
        <summary className="flex cursor-pointer list-none items-center gap-3 py-6 sm:gap-6 [&::-webkit-details-marker]:hidden">
          <span className="w-14 shrink-0 text-[11px] text-ash">{unit.years}</span>
          <span className="min-w-0 flex-1"><strong className="block text-[21px] font-medium tracking-tight text-paper sm:text-[25px]">{unit.id}</strong><span className="text-xs text-ash">{t(unit.title)}</span></span>
          <span className="shrink-0 border border-[#52D9BB]/40 px-2 py-1 text-[10px] text-[#a9ecda]">{unit.mark}</span>
          <span aria-hidden className="text-xl text-[#a9ecda] group-open:rotate-45">+</span>
        </summary>
        <div className="pb-8 text-sm leading-7 text-ash sm:pl-20">
          <p className="max-w-2xl">{t(unit.desc)}</p>
          <p className="mt-4"><span className="text-[#a9ecda]">{t(text('멤버','Members','メンバー'))}</span> · {unit.members}</p>
          <p><span className="text-[#a9ecda]">{t(text('대표곡','Song','楽曲'))}</span> · {unit.song}</p>
          <a className="mt-4 inline-flex items-center gap-2 text-[#b3ecda] underline underline-offset-4" href={unit.link} target="_blank" rel="noopener noreferrer">{t(text('자료 확인','View source','出典を見る'))}<ArrowIcon width={15} height={15}/></a>
        </div>
      </details>)}</div>
    </section>
    <div id="profile-history" className="mt-20 scroll-mt-28 sm:mt-28"><ProfileHistory/></div>
    <section id="profile-references" className="mt-16 scroll-mt-28">
      <span className="shion-page-kicker">REFERENCES</span>
      <h2 className="mt-2 text-2xl">{t(text('자료와 출처','Sources','出典'))}</h2>
      <p className="mt-3 mb-5 text-xs text-ash">{t(text('공개된 자료를 바탕으로 정리하며, 확인되지 않은 정보는 임의로 추가하지 않습니다.','This archive references public sources; unverified details are not invented.','公開資料に基づき、未確認情報を推測で補いません。'))}</p>
      {references.map(ref=><a className="flex min-h-12 items-center justify-between gap-3 border-b border-white/[.10] py-3 text-[13px] text-[#cfddd8] hover:text-[#52D9BB]" target="_blank" rel="noopener noreferrer" href={ref.url} key={ref.url}>{ref.label} <ArrowIcon width={16} height={16}/></a>)}
    </section>
  </section>;
}
