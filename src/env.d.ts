///// <reference types="@astrojs/image/client" />
/// <reference types="vite/client" />
interface ImportMeta {
  env: {
    readonly ANIME_API: string;
    readonly DATABASE_URL: string;
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly PROD: boolean;
    readonly DEV: boolean;
    readonly SSR: boolean;
  };
}

interface ImportMetaEnv {
  env: {
    readonly ANIME_API: string;
    readonly DATABASE_URL: string;
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly PROD: boolean;
    readonly DEV: boolean;
    readonly SSR: boolean;
  };
}
declare namespace Lucia {
  type Auth = import("./lib/db/lucia").Auth;
  type DatabaseUserAttributes = {
    username: string;
  };
  type DatabaseSessionAttributes = {};
}

declare namespace App {
	interface Locals {
		auth: import("lucia").AuthRequest;
	}
}
