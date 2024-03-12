import { FiMenu } from 'react-icons/fi';

import { Button } from '@repo/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from '@repo/shadcn/dropdown-menu';
import type { z } from 'zod';
import { postSchema } from '@/lib/schemas';
import { apiFetch } from '@/lib/utils/fetch';

type Data<T> = {
  [k in keyof T]: T[k] | undefined;
};
async function trackEntity(data: Data<z.infer<typeof postSchema>>) {
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
    <div className="flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <FiMenu size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Move to:</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() =>
                trackEntity({
                  ...props.data,
                  entityStatus: 'COMPLETED',
                })
              }
            >
              <span>Completed</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() =>
                trackEntity({
                  ...props.data,
                  entityStatus: 'WATCHING',
                })
              }
            >
              Watching
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() =>
                trackEntity({
                  ...props.data,
                  entityStatus: 'PLANNING',
                })
              }
            >
              Planning to watch
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() =>
                trackEntity({
                  ...props.data,
                  entityStatus: 'DROPPED',
                })
              }
            >
              Dropped
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() =>
                trackEntity({
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
              <DropdownMenuItem asChild>
                <a
                  href={`/me/${props.data.entityType}/${props.entityId}`}
                  className="focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-zinc-100"
                >
                  View your stats
                </a>
              </DropdownMenuItem>
            </>
          : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
