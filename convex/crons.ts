import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

// Weekly on Monday at 6am UTC — discover new low-competition keywords via SEMrush
crons.weekly(
    "keyword-discovery",
    { dayOfWeek: "monday", hourUTC: 6, minuteUTC: 0 },
    api.discover.discoverKeywords
);

// Daily at 7am UTC — pick next pending keyword, write article, generate image, publish
crons.daily(
    "article-generation",
    { hourUTC: 7, minuteUTC: 0 },
    api.generate.generateNextPost
);

export default crons;
