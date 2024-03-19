import type { MultiValue, SingleValue } from 'react-select';

export type FormStateItem = { value: string; label: string };
export type FormState = {
  q: string;
  search_type?: 'short' | 'full';
  typee: FormStateItem[];
  subtype: FormStateItem[];
  status: FormStateItem[];
  authors: FormStateItem[];
  genres: FormStateItem[];
  themes: FormStateItem[];
  demographics: FormStateItem[];
};

function createFormStateField(
  searchParams: URLSearchParams,
  field: string,
  type: 'string',
  isNew?: boolean,
): string;
function createFormStateField(
  searchParams: URLSearchParams,
  field: string,
  type: 'array',
  isNew?: boolean,
): FormStateItem[];
function createFormStateField(
  searchParams: URLSearchParams,
  field: string,
  type: 'string' | 'array',
  isNew?: boolean,
) {
  if (type === 'string') {
    return searchParams.get(field) || '';
  }
  const filters = searchParams.getAll(field);
  if (filters.length === 0) {
    return [] as FormStateItem[];
  }
  if (typeof isNew !== 'undefined') {
    return filters.map((filter) => ({
      value: filter,
      label: filter,
      __isNew__: isNew,
    }));
  }
  return filters.map((filter) => ({
    value: filter,
    label: filter,
  }));
}
export function getDefaultState(): FormState {
  const params = new URLSearchParams(window.location.search);
  return {
    q: createFormStateField(params, 'q', 'string'),
    search_type:
      createFormStateField(params, 'search_type', 'string') === 'short' ?
        'short'
      : 'full',
    typee: createFormStateField(params, 'typee', 'array'),
    subtype: createFormStateField(params, 'subtype', 'array'),
    status: createFormStateField(params, 'status', 'array'),
    authors: createFormStateField(params, 'authors', 'array'),
    genres: createFormStateField(params, 'genres', 'array'),
    themes: createFormStateField(params, 'themes', 'array'),
    demographics: createFormStateField(params, 'demographics', 'array'),
  };
}

type OverwriteAction = {
  type: 'OVERWRITE_STATE';
  payload: FormState;
};

type ToggleAction = {
  type: 'TOGGLE_FIELD';
  field: keyof Omit<FormState, 'q' | 'search_type'>;
  payload: SingleValue<FormStateItem> | MultiValue<FormStateItem>;
};

export type SearchAction = {
  type: 'UPDATE_SEARCH';
  field: 'q' | 'search_type';
  payload: string;
};

export type Action = ToggleAction | SearchAction | OverwriteAction;
export function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return { ...state, q: action.payload };
    case 'TOGGLE_FIELD':
      return { ...state, [action.field]: action.payload };
    case 'OVERWRITE_STATE':
      return action.payload;
    default:
      return state;
  }
}
