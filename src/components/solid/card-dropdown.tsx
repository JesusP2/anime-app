import { BsMenuButtonWide } from 'solid-icons/bs';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import type { z } from 'zod';
import type { postSchema } from '@/lib/schemas/generic';

async function updateEntityClassification(data: z.infer<typeof postSchema>) {
  await fetch(`/api/anime`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
export function EntityClassificationDropdown(props: {
  data: Omit<z.infer<typeof postSchema>, 'entityStatus'>;
}) {
  return (
    <div class="flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger as={Button}>
          <BsMenuButtonWide />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-48">
          <DropdownMenuItem
            onSelect={() =>
              updateEntityClassification({
                ...props.data,
                entityStatus: 'COMPLETED',
              })
            }
          >
            <span>Completed</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() =>
              updateEntityClassification({
                ...props.data,
                entityStatus: 'WATCHING',
              })
            }
          >
            Watching
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() =>
              updateEntityClassification({
                ...props.data,
                entityStatus: 'PLANNING',
              })
            }
          >
            Planning to watch
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() =>
              updateEntityClassification({
                ...props.data,
                entityStatus: 'DROPPED',
              })
            }
          >
            Dropped
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() =>
              updateEntityClassification({
                ...props.data,
                entityStatus: 'ON_HOLD',
              })
            }
          >
            On hold
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
