import { createSignal } from 'solid-js';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import clsx from 'clsx';

export function SelectSearchType(props: {
  defaultValue?: string;
  options: string[];
  name: string;
}) {
  const [value, setValue] = createSignal(props.defaultValue || 'all');
  return (
    <>
      <Select
        name={props.name}
        value={value()}
        onChange={setValue}
        placeholder="All"
        options={props.options}
        itemComponent={(props) => (
          <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
        )}
      >
        <SelectTrigger
          class={clsx('w-32 rounded-l-md flex-none text-gray-500 h-10')}
        >
          <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
        </SelectTrigger>
        <SelectContent class={clsx('w-40 h-[9.5rem] bg-white')} />
      </Select>
      <input name={props.name} hidden value={value()} />
    </>
  );
}
