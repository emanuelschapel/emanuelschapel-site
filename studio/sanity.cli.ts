import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  // Hosted Studio address: https://<studioHost>.sanity.studio
  studioHost: 'emanuels-chapel',
  // Assigned by the first `sanity deploy`; keeps later deploys from prompting.
  deployment: { appId: 'qce6w228mtz9b2jjwmey3pn3' },
});
