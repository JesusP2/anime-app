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
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly GOOGLE_REDIRECT_URI: string;
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
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly GOOGLE_REDIRECT_URI: string;
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
