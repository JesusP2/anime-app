import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/shadcn/dialog';
import { LuSettings2 } from 'react-icons/lu';
import { Button } from '@repo/ion/button';
import CreatableSelect from 'react-select/creatable';
import Select, { type GroupBase } from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
import { useReducer } from 'react';
import { reducer, type Action, type FormState, type FormStateItem } from './form';

export const entityType = [
  { value: 'anime', label: 'anime' },
  { value: 'manga', label: 'manga' },
  { value: 'character', label: 'character' },
] as unknown as GroupBase<FormStateItem>[];
const animeSubtypes = [
  { value: 'TV', label: 'TV' },
  { value: 'Movie', label: 'Movie' },
  { value: 'OVA', label: 'OVA' },
  { value: 'Special', label: 'Special' },
  { value: 'ONA', label: 'ONA' },
  { value: 'Music', label: 'Music' },
] as unknown as GroupBase<FormStateItem>[];
const mangaSubtypes = [
  { value: 'Manga', label: 'Manga' },
  { value: 'Novel', label: 'Novel' },
  { value: 'Light Novel', label: 'Light Novel' },
  { value: 'One-shot', label: 'One-shot' },
  { value: 'Doujinshi', label: 'Doujinshi' },
  { value: 'Manhwa', label: 'Manhwa' },
  { value: 'OEL', label: 'OEL' },
] as unknown as GroupBase<FormStateItem>[];
const animeStatuses = [
  { value: 'Finished Airing', label: 'Finished Airing' },
  { value: 'Currently Airing', label: 'Currently Airing' },
  { value: 'Not yet aired', label: 'Not yet aired' },
] as unknown as GroupBase<FormStateItem>[];
const mangaStatuses = [
  { value: 'Finished', label: 'Finished' },
  { value: 'Publishing', label: 'Publishing' },
  { value: 'On Hiatus', label: 'On Hiatus' },
  { value: 'Discontinued', label: 'Discontinued' },
  { value: 'Not yet published', label: 'Not yet published' },
] as unknown as GroupBase<FormStateItem>[];

export function FiltersDialog({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<Action>;
}) {
  const [modalState, modalDispatch] = useReducer(reducer, state);
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          modalDispatch({ type: 'OVERWRITE_STATE', payload: state });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-white active:bg-black active:text-gray-100 focus:bg-white focus:text-black hover:bg-black border-0 hover:text-gray-100 rounded-sm text-sm h-[34px] gap-x-1 text-black">
          <LuSettings2 size={17} />
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-sm text-black">
        <DialogHeader>
          <DialogTitle className="text-black font-inter text-left">
            Filters
          </DialogTitle>
          <DialogDescription className="text-left text-gray-500"></DialogDescription>
        </DialogHeader>
        <div>
          <label>
            <span className="text-gray-500 text-inter text-sm">Media</span>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={modalState.typee}
              onChange={(value) =>
                modalDispatch({
                  type: 'TOGGLE_FIELD',
                  field: 'typee',
                  payload: value,
                })
              }
              isClearable
              isMulti
              options={entityType}
            />
          </label>
        </div>
        <div>
          <label>
            <span className="text-gray-500 text-inter text-sm">Type</span>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={modalState.subtype}
              onChange={(value) =>
                modalDispatch({
                  type: 'TOGGLE_FIELD',
                  field: 'subtype',
                  payload: value,
                })
              }
              isClearable
              isMulti
              options={[...animeSubtypes, ...mangaSubtypes]}
            />
          </label>
        </div>
        <div>
          <label>
            <span className="text-gray-500 text-inter text-sm">Status</span>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={modalState.status}
              onChange={(value) =>
                modalDispatch({
                  type: 'TOGGLE_FIELD',
                  field: 'status',
                  payload: value,
                })
              }
              isClearable
              isMulti
              options={[...animeStatuses, ...mangaStatuses]}
            />
          </label>
        </div>
        <div>
          <label>
            <span className="text-gray-500 text-inter text-sm">Genre</span>
            <CreatableSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={modalState.genres}
              onChange={(value) =>
                modalDispatch({
                  type: 'TOGGLE_FIELD',
                  field: 'genres',
                  payload: value,
                })
              }
              isClearable
              isMulti
            />
          </label>
        </div>
        <div>
          <label>
            <span className="text-gray-500 text-inter text-sm">Theme</span>
            <CreatableSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={modalState.themes}
              onChange={(value) =>
                modalDispatch({
                  type: 'TOGGLE_FIELD',
                  field: 'themes',
                  payload: value,
                })
              }
              isClearable
              isMulti
            />
          </label>
        </div>
        <div>
          <label>
            <span className="text-gray-500 text-inter text-sm">Author</span>
            <CreatableSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={modalState.authors}
              onChange={(value) =>
                modalDispatch({
                  type: 'TOGGLE_FIELD',
                  field: 'authors',
                  payload: value,
                })
              }
              isClearable
              isMulti
            />
          </label>
        </div>
        <div>
          <label>
            <span className="text-gray-500 text-inter text-sm">
              Demographic
            </span>
            <CreatableSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={modalState.demographics}
              onChange={(value) =>
                modalDispatch({
                  type: 'TOGGLE_FIELD',
                  field: 'demographics',
                  payload: value,
                })
              }
              isClearable
              isMulti
            />
          </label>
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
  );
}
