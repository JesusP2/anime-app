import { GoSearch } from 'react-icons/go';
import { Button } from '@repo/ion/button';
import { useMemo, useReducer, useState } from 'react';
import { startWebsocket } from '@/lib/search-functionality';
import { getDefaultState, reducer } from './form';
import { FiltersDialog } from './dialog';
import { DebouncedInput } from './debounce-input';
import { z } from 'zod';

// typee: "anime" | "manga" | "character"
// search_type: "short" | "full"
// authors: open
// genres: open
// themes: open
// demographics: open
// anime
// status: "Finished Airing" | "Currently Airing" | "Not yet aired"
// subtype: "TV" | "OVA" | "Movie" | "Special" | "ONA" | "Music"
//
// manga
// status: "Finished" | "Publishing" | "On Hiatus" | "Discontinued" | "Not yet published";
// subtype: "Manga" | "Novel" | "Light Novel" | "One-shot" | "Doujinshi" | "Manhua" | "Manhwa" | "OEL" | null;

const searchSchema = z.object({
  episodes: z.coerce.number(),
  mal_id: z.coerce.number(),
  image_url: z.string(),
  score: z.coerce.number(),
  status: z.string(),
  title: z.string(),
  type: z.string(),
  aired: z.object({
    prop: z.object({
      from: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      to: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
    }),
  }),
});
export function SearchBar() {
  const [state, dispatch] = useReducer(reducer, getDefaultState());
  const [status, setStatus] = useState<
    'loading' | 'fetched' | 'error' | 'idle'
  >('idle');
  const [searches, setSearches] = useState<z.infer<typeof searchSchema>[]>([]);

  function updateSearches(data: any) {
    setSearches(data);
    setStatus('fetched');
  }

  const ws = useMemo(() => startWebsocket(updateSearches), []);
  function search(value: string) {
    const payload = {
      q: value,
      typee: (state.typee as unknown as { value: string }[]).map(
        (t) => t.value,
      ),
      subtype: (state.subtype as unknown as { value: string }[]).map(
        (t) => t.value,
      ),
      status: (state.status as unknown as { value: string }[]).map(
        (t) => t.value,
      ),
      authors: (state.authors as unknown as { value: string }[]).map(
        (t) => t.value,
      ),
      genres: (state.genres as unknown as { value: string }[]).map(
        (t) => t.value,
      ),
      themes: (state.themes as unknown as { value: string }[]).map(
        (t) => t.value,
      ),
      demographics: (state.demographics as unknown as { value: string }[]).map(
        (t) => t,
      ),
    };
    dispatch({
      type: 'UPDATE_SEARCH',
      field: 'q',
      payload: value,
    });
    setStatus('loading');
    ws.send(JSON.stringify(payload));
  }
  return (
    <div>
      <div className="h-12 bg-gray-100 border-0 outline-none p-3 rounded-sm flex items-center mt-4 gap-x-2">
        <GoSearch size={22} className="text-neutral-500" />
        <DebouncedInput
          type="search"
          placeholder="Jujutsu kaisen, Naruto, Tokyo Revengers..."
          className="border-0 outline-none bg-inherit text-neutral-500 w-full"
          value={state.q}
          onChange={search}
          delay={500}
        />
        <FiltersDialog state={state} dispatch={dispatch} />
        <Button className="bg-black rounded-sm h-[34px] hover:bg-black border-0">
          <GoSearch size={17} className="text-white font-bold" />
        </Button>
      </div>
      {status === 'fetched' && searches?.length ?
        <div className="absolute w-full space-y-1 py-1 px-2 shadow-md rounded-sm">
          {searches?.map((item, idx) => (
            <button
              aria-label={`search-results-${idx}`}
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = '/anime/' + item.mal_id;
                }
                // TODO: add arrow down and up functionality
                // if (e.key === 'ArrowDown') {
                // }
              }}
              className="w-full flex items-center gap-x-2 text-zinc-700 text-sm hover:bg-zinc-100 cursor-pointer py-1 px-2 focus:bg-zinc-100 outline-none rounded-sm"
              key={item.mal_id}
            >
              <img src={item.image_url} width={20} height={20} />
              {item.title}-{item.mal_id}
            </button>
          ))}
        </div>
      : null}
    </div>
  );
}
