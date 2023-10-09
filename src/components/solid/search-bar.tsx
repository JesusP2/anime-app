import { Show, createSignal } from 'solid-js';
import { SelectSearchType } from "./select-search-type"
import { AiOutlineSearch } from 'solid-icons/ai'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import clsx from 'clsx';

export function SearchBar() {
  const [searchType, setSearchType] = createSignal('anime');
  return (
    <form action="/search" method="get">
      <div class="flex relative">
        <Select
          name="searchType"
          value={searchType()}
          onChange={setSearchType}
          placeholder="anime"
          options={['anime', 'manga', 'character']}
          itemComponent={(props) => (
            <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
          )}
        >
          <SelectTrigger
            name="searchType"
            class={clsx(
              'w-32 rounded-l-md flex-none text-gray-500 h-10 rounded-r-none'
            )}
          >
            <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
          </SelectTrigger>
          <SelectContent class={clsx("w-40 bg-white h-[7.5rem]")} />
        </Select>
        <input
          name="q"
          class="flex border border-input bg-transparent px-3 py-2 file:border-0 file:bg-transparent file:text-sm placeholder:text-[14px] file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-500 w-full min-w-[100px] max-w-[288px] h-10 text-[14px] border-l-0 text-gray-500"
          placeholder="Search..."
        />
        <button
          class="inline-flex overflow-hidden relative items-center justify-center transitions-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-sm font-montserrat font-semibold text-white bg-neutral-800 hover:bg-neutral-900 rounded-none h-10 w-12 rounded-r-md p-0 flex-none"
        >
          <AiOutlineSearch size={18} />
        </button>
      </div>
      <p class="text-neutral-500 font-medium text-sm my-2">Filters:</p>
      <div class="flex gap-x-10">
        <Show when={searchType() === 'anime'}>
          <label class="text-neutral-500 text-sm">
            <p class="mb-2 font-medium">Type:</p>
            <SelectSearchType
              name="type"
              options={['all', 'tv', 'movie', 'ova', 'special', 'ona', 'music']}
            />
          </label>
          <label class="text-neutral-500 text-sm">
            <p class="mb-2 font-medium">Status:</p>
            <SelectSearchType
              name="status"
              options={['all', 'airing', 'complete', 'upcoming']}
            />
          </label>
        </Show>
        <Show when={searchType() === 'manga'}>
          <label class="text-neutral-500 text-sm">
            <p class="mb-2 font-medium">Type:</p>
            <SelectSearchType
              name="type"
              options={[
                'all',
                'manga',
                'novel',
                'lightnovel',
                'oneshot',
                'doujin',
                'manhwa',
                'manhua',
              ]}
            />
          </label>
          <label class="text-neutral-500 text-sm">
            <p class="mb-2 font-medium">Status:</p>
            <SelectSearchType
              name="status"
              options={[
                'all',
                'publishing',
                'complete',
                'hiatus',
                'discontinued',
                'upcoming',
              ]}
            />
          </label>
        </Show>
      </div>
    </form>
  )
}
