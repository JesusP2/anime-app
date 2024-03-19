import { GoSearch } from 'react-icons/go';
import { Button } from '@repo/ion/button';
import { useMemo, useReducer, useState } from 'react';
import { startWebsocket } from '@/lib/search-functionality';
import { getDefaultState, reducer } from './form';
import { FiltersDialog } from './dialog';
import { DebouncedInput } from './debounce-input';
import { z } from 'zod';
import { Command } from 'cmdk';

import clsx from 'clsx';

function setSearchParam(key: string, value: string | string[]) {
  const params = new URLSearchParams(window.location.search);
  if (Array.isArray(value)) {
    params.delete(key)
    value.map((v) => params.append(key, v));
  } else {
    params.set(key, value);
  }
  const newUrl =
    window.location.origin + window.location.pathname + '?' + params.toString();
  window.history.pushState({ path: newUrl }, '', newUrl);
}

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
  const [state, dispatch] = useReducer(reducer, null, getDefaultState);
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
    const properties = Object.keys(state);
    const payload = {
      q: value,
    } as Record<string, string[] | string>;
    for (const _key of properties) {
      const key = _key as keyof typeof state;
      const filters = state[key];
      if (Array.isArray(filters)) {
        payload[key] = filters.map(({ value }) => value);
        setSearchParam(key, payload[key] as string[]);
      } else if (filters) {
        setSearchParam(key, filters)
      } else if (value) {
        setSearchParam(key, value)
      }
    }
    dispatch({
      type: 'UPDATE_SEARCH',
      field: 'q',
      payload: value,
    });
    setStatus('loading');
    ws.send(JSON.stringify(payload));
  }
  return (
    <Command className="rounded-lg border shadow-md mt-4 outline-none">
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
      <Command.List className={clsx('px-1 has-[.children]:py-1')}>
        {status === 'fetched' && state.q ?
          <Command.Empty>No results found.</Command.Empty>
        : null}
        <Command.Group>
          {searches?.map((item) => (
            <Command.Item
              value={item.mal_id?.toString()}
              className="w-full flex justify-between items-center cursor-pointer text-zinc-700 text-sm py-[4px] px-2 outline-none rounded-sm data-[selected=true]:bg-zinc-100"
              key={item.mal_id}
              asChild
            >
              <a
                href={`/anime/${item.mal_id}`}
                className="flex gap-x-2 items-center children"
              >
                <div className="flex gap-x-2 items-center children">
                  <img src={item.image_url} width={20} height={20} />
                  {item.title}
                </div>
                {item.type}
              </a>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command>
  );
}
