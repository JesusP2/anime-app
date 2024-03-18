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
export function getDefaultState(): FormState {
  return {
    q: '',
    search_type: 'short',
    typee: [],
    subtype: [],
    status: [],
    authors: [],
    genres: [],
    themes: [],
    demographics: [],
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
