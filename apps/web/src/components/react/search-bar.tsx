import { GoSearch } from 'react-icons/go';
import { LuSettings2 } from 'react-icons/lu';
import { Button } from '@repo/ion/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/shadcn/dialog';
import { cn } from '@/lib/utils';
import { useReducer } from 'react';

type FormState = {
  search: string;
  entityType: string[];
  entitySubtype: string[];
  entityStatus: string[];
};

type OverwriteAction = {
  type: 'OVERWRITE_STATE';
  payload: FormState;
};
type Action = {
  type:
    | 'UPDATE_SEARCH'
    | 'TOGGLE_ENTITY_TYPE'
    | 'TOGGLE_ENTITY_SUBTYPE'
    | 'TOGGLE_ENTITY_STATUS';
  payload: string;
};

function toggleArray(arr: string[], value: string) {
  if (arr.includes(value)) {
    return arr.filter((type) => type !== value);
  }
  return [...arr, value];
}
function reducer(state: FormState, action: Action | OverwriteAction) {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return { ...state, search: action.payload };
    case 'TOGGLE_ENTITY_TYPE':
      return {
        ...state,
        entityType: toggleArray(state.entityType, action.payload),
      };
    case 'TOGGLE_ENTITY_STATUS':
      return {
        ...state,
        entityStatus: toggleArray(state.entityStatus, action.payload),
      };
    case 'TOGGLE_ENTITY_SUBTYPE':
      return {
        ...state,
        entitySubtype: toggleArray(state.entitySubtype, action.payload),
      };
    case 'OVERWRITE_STATE':
      return {
        ...action.payload,
        entityStatus: [...action.payload.entityStatus],
        entityType: [...action.payload.entityType],
        entitySubtype: [...action.payload.entitySubtype],
      };
    default:
      return state;
  }
}

function getDefaultState() {
  return {
    search: '',
    entityType: [],
    entitySubtype: [],
    entityStatus: [],
  };
}

export function FilterButton({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      className={cn(
        'rounded-[4px] px-6 active:bg-inherit',
        isActive ?
          'bg-primary-lighter focus:bg-primary-lighter'
        : 'focus:bg-white',
      )}
      onClick={onClick}
      emphasis="medium"
    >
      {children}
    </Button>
  );
}
const mediaTypes = ['anime', 'manga', 'character'];
const animeSubtypes = ['tv', 'movie', 'ova', 'special', 'ona', 'music'];
const mangaSubtypes = [
  'manga',
  'novel',
  'lightnovel',
  'oneshot',
  'doujin',
  'manhwa',
  'manhua',
];
const animeStatuses = ['airing', 'complete', 'upcoming'];
const mangaStatuses = [
  'publishing',
  'complete',
  'hiatus',
  'discontinued',
  'upcoming',
];
export function SearchBar() {
  const [state, dispatch] = useReducer(reducer, getDefaultState());
  const [modalState, modalDispatch] = useReducer(reducer, getDefaultState());
  return (
    <div className="h-12 bg-gray-100 border-0 outline-none p-3 rounded-sm flex items-center mt-4 gap-x-2">
      <GoSearch size={22} className="text-neutral-500" />
      <input
        type="search"
        placeholder="Jujutsu kaisen, Naruto, Tokyo Revengers..."
        className="border-0 outline-none bg-inherit text-neutral-500 w-full"
        value={state.search}
        onChange={(e) =>
          dispatch({ type: 'UPDATE_SEARCH', payload: e.target.value })
        }
      />
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            modalDispatch({ type: 'OVERWRITE_STATE', payload: state });
          }
        }}
      >
        <DialogTrigger asChild>
          <Button className="bg-white active:bg-black active:text-gray-100 focus:bg-white focus:text-black hover:bg-black border-0 hover:text-gray-100 rounded-sm text-sm h-[34px] gap-x-1 ">
            <LuSettings2 size={17} />
            Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-sm text-black">
          <DialogHeader>
            <DialogTitle className="text-black font-inter text-left">
              Filters
            </DialogTitle>
            <DialogDescription className="text-left text-gray-500"></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <h4 className="text-gray-500 text-inter">Media</h4>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] mt-3 gap-2 gap-x-4 max-w-[375px]">
                {mediaTypes.map((type) => (
                  <FilterButton
                    isActive={modalState.entityType.includes(type)}
                    onClick={() =>
                      modalDispatch({
                        type: 'TOGGLE_ENTITY_TYPE',
                        payload: type,
                      })
                    }
                  >
                    {type}
                  </FilterButton>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-gray-500 text-inter">Select media type</h4>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] mt-3 gap-2 gap-x-4 max-w-[375px]">
                {[...animeSubtypes, ...mangaSubtypes].map((type) => (
                  <FilterButton
                    isActive={modalState.entitySubtype.includes(type)}
                    onClick={() =>
                      modalDispatch({
                        type: 'TOGGLE_ENTITY_SUBTYPE',
                        payload: type,
                      })
                    }
                  >
                    {type}
                  </FilterButton>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-gray-500 text-inter">Select media status</h4>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] mt-3 gap-2 gap-x-4 max-w-[375px]">
                {[...new Set([...animeStatuses, ...mangaStatuses])].map(
                  (type) => (
                    <FilterButton
                      isActive={state.entityStatus.includes(type)}
                      onClick={() =>
                        dispatch({
                          type: 'TOGGLE_ENTITY_STATUS',
                          payload: type,
                        })
                      }
                    >
                      {type}
                    </FilterButton>
                  ),
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="rounded-sm text-white"
              color="primary"
              type="button"
              onClick={() =>
                dispatch({ type: 'OVERWRITE_STATE', payload: modalState })
              }
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button className="bg-black rounded-sm h-[34px] hover:bg-black border-0">
        <GoSearch size={17} className="text-white font-bold" />
      </Button>
    </div>
  );
}
