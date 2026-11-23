/** HAYEON ARCHIVE 2.0 — read-only, source-based overview.
 * Reuse SEARCH OS normalization, so PHOTO and FILM counts are from current JSON.
 * Failures are independent: if one endpoint fails, the other sections remain usable.
 */
import { indexFilms, indexPhotos } from './searchIndex';
import type { SearchEntry, SearchLabel } from './searchIndex';

export type Overview = {
  photos: SearchEntry[];
  films: SearchEntry[];
  photoError: boolean;
  filmError: boolean;
};
export type TimelineKind = 'milestone' | 'photos' | 'film';
export type TimelineEntry = {
  key: string;
  date: string;
  kind: TimelineKind;
  title: SearchLabel;
  description: SearchLabel;
  entries: SearchEntry[];
  source?: string;
};
const BASE = import.meta.env.BASE_URL;
const emptyOverview: Overview = { photos: [], films: [], photoError: true, filmError: true };
let cachedRequest: Promise<Overview> | undefined;

const validDate = (date: string | null): date is string => {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
};
const getJSON = async (name: 'photos' | 'films'): Promise<unknown> => {
  const response = await fetch(`${BASE}data/${name}.json`, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  return response.json() as Promise<unknown>;
};
/** Shared request across HOME and TIMELINE; no duplicated downloads on tab switching. */
export function loadOverview(): Promise<Overview> {
  if (!cachedRequest) {
    cachedRequest = Promise.allSettled([getJSON('photos'), getJSON('films')])
      .then(([photoResult, filmResult]): Overview => {
        const photos = photoResult.status === 'fulfilled' ? indexPhotos(photoResult.value) : [];
        const films = filmResult.status === 'fulfilled' ? indexFilms(filmResult.value) : [];
        // Exclude undated items only from the date-based timeline, not from totals.
        return {
          photos: photos.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '')),
          films: films.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '')),
          photoError: photoResult.status === 'rejected',
          filmError: filmResult.status === 'rejected',
        };
      }).catch(() => emptyOverview);
  }
  return cachedRequest;
}
export function retryOverview(): Promise<Overview> {
  cachedRequest = undefined;
  return loadOverview();
}

/** Historically sourced milestones. Do not infer a milestone from photo upload dates. */
export const MILESTONES: readonly TimelineEntry[] = [
  { key:'hayeon-s19-reveal', date:'2023-12-23', kind:'milestone',
    title:{ko:'S19 정하연 공개',en:'HaYeon revealed as S19',ja:'S19 チョン・ハヨン公開'},
    description:{ko:'tripleS 열아홉 번째 멤버 공개',en:'The nineteenth member introduced',ja:'tripleSの19番目のメンバー'},
    entries:[],source:'https://triples.fandom.com/wiki/Jeong_HaYeon' },
  { key:'hayeon-msnz-zenith', date:'2025-11-24', kind:'milestone',
    title:{ko:'msnz zenith 〈Q&A〉',en:'msnz zenith — Q&A',ja:'msnz zenith〈Q&A〉'},
    description:{ko:'정하연이 참여한 zenith의 음악 활동',en:'Music release featuring HaYeon',ja:'ハヨン参加のユニット活動'},
    entries:[],source:'https://www.youtube.com/watch?v=TvmLPQ7iBLQ' },
];

/** Create *archive records*, not invented biographical events. */
export function buildTimeline(overview: Overview): TimelineEntry[] {
  const groups = new Map<string, SearchEntry[]>();
  for (const item of [...overview.photos, ...overview.films]) {
    if (!validDate(item.date)) continue;
    const key = `${item.date}:${item.category}`;
    const list = groups.get(key);
    if (list) list.push(item);
    else groups.set(key, [item]);
  }
  const archiveEntries: TimelineEntry[] = [];
  for (const [key, entries] of groups) {
    const first = entries[0];
    if (!first || !first.date) continue;
    const isPhoto = first.category === 'photos';
    archiveEntries.push({
      key, date: first.date, kind: isPhoto ? 'photos' : 'film',
      title: isPhoto
        ? { ko: `사진 ${entries.length}장`, en: `${entries.length} photo${entries.length === 1 ? '' : 's'}`, ja: `写真 ${entries.length}枚` }
        : { ko: `영상 ${entries.length}개`, en: `${entries.length} video${entries.length === 1 ? '' : 's'}`, ja: `動画 ${entries.length}本` },
      description: isPhoto
        ? { ko: '해당 날짜로 분류된 사진 자료', en: 'Photos indexed under this date', ja: 'この日付で分類された写真資料' }
        : { ko: '해당 날짜로 분류된 공개 영상', en: 'Public videos indexed under this date', ja: 'この日付で分類された公開動画' },
      entries,
    });
  }
  return [...MILESTONES, ...archiveEntries].sort((a, b) =>
    b.date.localeCompare(a.date) || (a.kind === 'milestone' ? -1 : b.kind === 'milestone' ? 1 : a.kind.localeCompare(b.kind))
  );
}
