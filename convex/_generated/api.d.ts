/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as bofuPages from "../bofuPages.js";
import type * as caseStudies from "../caseStudies.js";
import type * as crons from "../crons.js";
import type * as discover from "../discover.js";
import type * as generate from "../generate.js";
import type * as leads from "../leads.js";
import type * as media from "../media.js";
import type * as posts from "../posts.js";
import type * as queue from "../queue.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  bofuPages: typeof bofuPages;
  caseStudies: typeof caseStudies;
  crons: typeof crons;
  discover: typeof discover;
  generate: typeof generate;
  leads: typeof leads;
  media: typeof media;
  posts: typeof posts;
  queue: typeof queue;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
