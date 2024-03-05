import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { BsThreeDots } from 'solid-icons/bs'

export function AvatarDropdown(props: { mal_id: number; removeOption?: boolean; }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BsThreeDots />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          class="flex gap-x-2"
        >
          Move to queue
        </DropdownMenuItem>
        <DropdownMenuItem
          class="flex gap-x-2"
        >
          Start watching
        </DropdownMenuItem>
        <DropdownMenuItem
          class="flex gap-x-2"
        >
          Move to finished
        </DropdownMenuItem>
        <DropdownMenuItem
          class="flex gap-x-2"
        >
          Move to dropped
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
