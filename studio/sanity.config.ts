import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

/**
 * Emanuel's Chapel — content Studio.
 *
 * Project id and dataset come from the environment so this file holds no account-specific
 * value. Fill studio/.env from studio/.env.example after `sanity init` (see README).
 */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

if (!projectId) {
  throw new Error('SANITY_STUDIO_PROJECT_ID is not set — copy studio/.env.example to studio/.env');
}

export default defineConfig({
  name: 'emanuels-chapel',
  title: "Emanuel's Chapel",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('obituary')
              .title('Obituaries')
              .child(
                S.documentTypeList('obituary')
                  .title('Obituaries')
                  .defaultOrdering([{ field: 'dateOfPassing', direction: 'desc' }]),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
