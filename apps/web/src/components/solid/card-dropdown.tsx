import { FiMenu } from 'solid-icons/fi';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroupLabel,
  DropdownMenuGroup,
} from './ui/dropdown-menu';
import type { z } from 'zod';
import type { postSchema } from '@/lib/schemas';
import type { JSX } from 'solid-js';
import { apiFetch } from '@/lib/utils/fetch';

type Data<T> = {
  [k in keyof T]: T[k] | undefined;
};
async function updateEntityClassification(
  data: Data<z.infer<typeof postSchema>>,
) {
  await apiFetch(`/api/anime`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
export function EntityClassificationDropdown(props: {
  data: Data<Omit<z.infer<typeof postSchema>, 'entityStatus'>>;
  entityId: string | undefined;
}) {
  return (
    <div class="flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger
          as={(props: { children: JSX.Element }) => (
            <Button variant="ghost" {...props} />
          )}
        >
          <FiMenu size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-48">
          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>Move to:</DropdownMenuGroupLabel>
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
          </DropdownMenuGroup>
          {props.entityId ?
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                as={() => (
                  <a
                    href={`/me/${props.data.entity}/${props.entityId}`}
                    class="focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-zinc-100"
                  >
                    View your stats
                  </a>
                )}
              ></DropdownMenuItem>
            </>
          : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
