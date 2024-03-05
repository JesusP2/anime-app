import { clsx } from 'clsx';
import { createSignal, type JSX } from 'solid-js';

export function Dropdown(props: { list: { href: string; label: JSX.Element }[]; title: string; }) {
  const [isActive, setActive] = createSignal();
  return (
    <div>
      <button
        onClick={() => setActive(!isActive())}
        class={clsx(
          'mt-2 flex gap-x-4 ml-7 hover:text-white p-2 text-neutral-300 items-center justify-between w-64',
        )}
      >
        {props.title}
        <DownArrow class="mr-2 hover:text-white" />
      </button>
      <ul
        class={clsx(
          isActive() ? 'h-48' : 'h-0',
          'overflow-hidden duration-300',
        )}
      >
        {props.list.map((item) => (
          <li class="mt-2 flex gap-x-4 ml-10 hover:text-white p-2 text-neutral-300">
            <a class="w-full" href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DownArrow(props: { class?: string }) {
  return (
    <svg
      class={props.class}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="#888888"
        d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062Z"
      />
    </svg>
  );
}
