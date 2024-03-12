import { buttonVariants } from '@repo/shadcn/button';
import { cn } from '@/lib/utils';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscGroupByRefType } from 'react-icons/vsc';
import { IoPauseCircleOutline } from "react-icons/io5";
import { PiTrash } from "react-icons/pi";
import { GrPlan } from "react-icons/gr";
import { FiChevronDown } from 'react-icons/fi';
import { BsWindowStack } from 'react-icons/bs';
import { IoIosSearch } from "react-icons/io";
import { GoGear } from 'react-icons/go';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/shadcn/collapsible';
import { UserDropdown } from '@/components/react/user-dropdown';
import { SidebarLink } from './sidebar-link';

export function Sidebar({ pathname }: { pathname: string }) {

  return (
    <aside
      className={cn(
        'bg-white rounded-md delay-100 duration-200 h-screen overflow-hidden p-4 px-2 text-black flex flex-col justify-between group shadow-lg shadow-neutral-400 sidebar',
      )}
    >
      <div>
        <div className="flex justify-between items-start">
          <div className="flex gap-x-0">
            <span
              className={cn(
                'text-3xl font-bold text-left ml-3 mb-4 font-bungee',
              )}
            >
              G
            </span>
            <span
              className={cn(
                'text-3xl font-bold text-left w-full mb-4 whitespace-nowrap duration-200 sidebar-text delay-200 font-bungee',
              )}
            >
              aphite
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <SidebarLink pathname={pathname} href="/search">
            <IoIosSearch size={22} className="min-w-[22px]" />
            <span className="sidebar-text delay-200">Search</span>
          </SidebarLink>
          <SidebarLink pathname={pathname} href="/current-season">
            <BsWindowStack size={20} className="min-w-[20px]" />
            <span className="sidebar-text delay-200">Current season</span>
          </SidebarLink>
          <Collapsible>
            <CollapsibleTrigger
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'justify-between w-full gap-x-3 bg-white font-normal px-3',
              )}
            >
              <span className="flex gap-x-3">
                <VscGroupByRefType
                  size={20}
                  className="min-w-[20px] min-h-[20px]"
                />
                <span className="sidebar-text delay-200">Animes</span>
              </span>
              <FiChevronDown
                size={18}
                className={cn('rotate-180 sidebar-text delay-200')}
              />
            </CollapsibleTrigger>
            <CollapsibleContent
              className={cn(
                'border-l-[2px] border-slate-200 pl-4 ml-[1.3rem] sidebar-text delay-200',
              )}
            >
              <SidebarLink pathname={pathname} href="/animes/completed">
                <IoMdCheckmarkCircleOutline size={20} className="min-w-[20px]" />
                <span className="sidebar-text delay-200">Completed</span>
              </SidebarLink>
              <SidebarLink pathname={pathname} href="/animes/planning-to-watch">
                <GrPlan size={16} className="min-w-[20px]" />
                <span className="sidebar-text delay-200">Planning to watch</span>
              </SidebarLink>
              <SidebarLink pathname={pathname} href="/animes/dropped">
                <PiTrash size={20} className="min-w-[20px]" />
                <span className="sidebar-text delay-200">Dropped</span>
              </SidebarLink>
              <SidebarLink pathname={pathname} href="/animes/on-hold">
                <IoPauseCircleOutline size={20} className="min-w-[20px]" />
                <span className="sidebar-text delay-200">Paused</span>
              </SidebarLink>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'justify-between w-full gap-x-3 bg-white font-normal px-3',
              )}
            >
              <span className="flex gap-x-3">
                <VscGroupByRefType
                  size={20}
                  className="min-w-[20px] min-h-[20px]"
                />
                <span className="sidebar-text delay-200">Mangas</span>
              </span>
              <FiChevronDown
                size={18}
                className={cn('rotate-180 sidebar-text delay-200')}
              />
            </CollapsibleTrigger>
            <CollapsibleContent
              className={cn(
                'border-l-[2px] border-slate-200 pl-4 ml-[1.3rem] sidebar-text delay-200',
              )}
            >
              <SidebarLink pathname={pathname} href="/mangas/completed">
                <IoMdCheckmarkCircleOutline size={20} className="min-w-[20px]" />
                <span className="sidebar-text delay-200">Completed</span>
              </SidebarLink>
              <SidebarLink pathname={pathname} href="/mangas/planning-to-watch">
                <GrPlan size={16} className="min-w-[20px]" />
                <span className="sidebar-text delay-200">Planning to watch</span>
              </SidebarLink>
              <SidebarLink pathname={pathname} href="/mangas/dropped">
                <PiTrash size={20} className="min-w-[20px]" />
                <span className="sidebar-text delay-200">Dropped</span>
              </SidebarLink>
              <SidebarLink pathname={pathname} href="/mangas/on-hold">
                <IoPauseCircleOutline size={20} className="min-w-[20px]" />
                <span className="sidebar-text delay-200">Paused</span>
              </SidebarLink>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'justify-between w-full gap-x-3 bg-white font-normal px-3',
              )}
            >
              <span className="flex gap-x-3">
                <VscGroupByRefType
                  size={20}
                  className="min-w-[20px] min-h-[20px]"
                />
                <span className="sidebar-text delay-200">Light Novels</span>
              </span>
              <FiChevronDown
                size={18}
                className={cn('rotate-180 sidebar-text delay-200')}
              />
            </CollapsibleTrigger>
            <CollapsibleContent
              className={cn(
                'border-l-[2px] border-slate-200 pl-4 ml-[1.3rem] sidebar-text duration-1000',
              )}
            >
              <SidebarLink pathname={pathname} href="/light-novles/completed">
                <IoMdCheckmarkCircleOutline size={20} className="min-w-[20px]" />
                <span className="sidebar-text delay-200">Completed</span>
              </SidebarLink>
              <SidebarLink pathname={pathname} href="/light-novels/planning-to-watch">
                <GrPlan size={16} className="min-w-[20px]" />
                <span className="sidebar-text delay-200">Planning to watch</span>
              </SidebarLink>
              <SidebarLink pathname={pathname} href="/light-novels/dropped">
                <PiTrash size={20} className="min-w-[20px]" />
                <span className="sidebar-text delay-200">Dropped</span>
              </SidebarLink>
              <SidebarLink pathname={pathname} href="/light-novels/on-hold">
                <IoPauseCircleOutline size={20} className="min-w-[20px]" />
                <span className="sidebar-text delay-200">Paused</span>
              </SidebarLink>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="border-t border-dashed border-stone-300 mt-4 pt-4">
          <SidebarLink pathname="1" href={`/organization/1/overview`}>
            <GoGear size={20} className="min-w-[20px]" />
            <span className="sidebar-text delay-200">Settings</span>
          </SidebarLink>
        </div>
      </div>
      <div className="border-t border-dashed border-stone-300 mt-4 pt-4 child">
        <UserDropdown />
      </div>
    </aside>
  );
}
