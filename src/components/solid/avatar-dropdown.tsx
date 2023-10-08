import { As } from "@kobalte/core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CgProfile } from "solid-icons/cg";
import { FiSettings } from "solid-icons/fi";
import { IoLogOutOutline } from "solid-icons/io";

export function AvatarDropdown(props: {
  src: string;
  name: string;
  alt: string;
}) {
  // TODO: this looks like shit
  return (
    <DropdownMenu>
      <DropdownMenuTrigger class="ml-4 flex gap-x-4 items-center">
        <img src={props.src} class="rounded-full" width="40" alt={props.alt} />
        <div>{props.name}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          class="flex gap-x-2"
          asChild
          onSelect={() => window.location.replace("/profile")}
        >
          <As component="a" href="/profile">
            <CgProfile size={17} />
            Profile
          </As>
        </DropdownMenuItem>
        <DropdownMenuItem
          class="flex gap-x-2"
          asChild
          onSelect={() => window.location.replace("/settings")}
        >
          <As component="a" href="/settings">
            <FiSettings size={17} />
            Settings
          </As>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          class="flex gap-x-2"
          asChild
          onSelect={() => window.location.replace("/auth/signout")}
        >
          <As component="a" href="/auth/signout">
            <IoLogOutOutline size={17} />
            Logout
          </As>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
