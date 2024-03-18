import { GoSearch } from 'react-icons/go';
import { Button } from '@repo/ion/button';
import { useMemo, useReducer, useState } from 'react';
import { startWebsocket } from '@/lib/search-functionality';
import { getDefaultState, reducer } from './form';
import { FiltersDialog } from './dialog';
import { DebouncedInput } from './debounce-input';
import { z } from 'zod';
import { Command } from 'cmdk';

import {
  FiCalendar,
  FiCreditCard,
  FiSettings,
  FiSmile,
  FiUser,
} from 'react-icons/fi';
import { BsCalculatorFill } from 'react-icons/bs';
import clsx from 'clsx';

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
    'loading' | 'idle' | 'fetched' | 'error'
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
        (t) => t.value,
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
    <Command
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          console.log('Enter');
        }
      }}
      className="rounded-lg border shadow-md mt-4 outline-none"
    >
      <div className="h-12 bg-gray-100 border-0 outline-none p-3 rounded-sm flex items-center gap-x-2">
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
      <Command.List
        className={clsx(
          'px-1 has-[.children]:py-1',
        )}
      >
        {status === 'fetched' && state.q ?
          <Command.Empty>No results found.</Command.Empty>
        : null}
        <Command.Group>
          {searches?.map((item) => (
            <Command.Item
              value={item.mal_id?.toString()}
              className="w-full flex justify-between items-center cursor-pointer text-zinc-700 text-sm py-[4px] px-2 outline-none rounded-sm data-[selected=true]:bg-zinc-100"
              key={item.mal_id}
            >
              <div className="flex gap-x-2 items-center children">
                <img src={item.image_url} width={20} height={20} />
                {item.title}
              </div>
              {item.type}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command>
  );
}
