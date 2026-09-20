import { defineField, defineType } from 'sanity';

/**
 * One obituary. Fields mirror what the site already renders on ObituaryCard, plus what a
 * tribute page needs (portrait, full obituary text). Names below are the field names the
 * frontend queries — see src/lib/sanity.ts — so rename with care.
 */
export default defineType({
  name: 'obituary',
  title: 'Obituary',
  type: 'document',
  groups: [
    { name: 'person', title: 'The person', default: true },
    { name: 'service', title: 'Service details' },
    { name: 'livestream', title: 'Livestream' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      group: 'person',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      group: 'person',
      description: 'Made from the name. This becomes the tribute page link — avoid changing it once shared.',
      options: { source: 'name', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      group: 'person',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Describe the photo', type: 'string',
          description: 'For screen readers, e.g. "Earl smiling in his garden".' }),
      ],
    }),
    defineField({
      name: 'dateOfBirth',
      title: 'Date of birth',
      type: 'date',
      group: 'person',
      options: { dateFormat: 'MMMM D, YYYY' },
    }),
    defineField({
      name: 'dateOfPassing',
      title: 'Date of passing',
      type: 'date',
      group: 'person',
      options: { dateFormat: 'MMMM D, YYYY' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'shortBio',
      title: 'Short tribute',
      type: 'text',
      group: 'person',
      rows: 3,
      description: 'One or two sentences. Shown on the obituary card and at the top of the tribute page.',
      validation: r => r.required().max(320),
    }),
    defineField({
      name: 'body',
      title: 'Full obituary',
      type: 'array',
      group: 'person',
      of: [{ type: 'block' }],
      description: 'The full text, as it would appear in print.',
    }),

    defineField({
      name: 'serviceDate',
      title: 'Service date and time',
      type: 'datetime',
      group: 'service',
      options: { dateFormat: 'dddd, MMMM D, YYYY', timeFormat: 'h:mm A' },
    }),
    defineField({
      name: 'serviceEnd',
      title: 'Service ends (optional)',
      type: 'datetime',
      group: 'service',
      options: { dateFormat: 'dddd, MMMM D, YYYY', timeFormat: 'h:mm A' },
    }),
    defineField({
      name: 'serviceLocation',
      title: 'Service location',
      type: 'string',
      group: 'service',
      description: "E.g. Emanuel's Chapel, Main Chapel — or the name and address of another venue.",
    }),
    defineField({
      name: 'visitation',
      title: 'Visitation (optional)',
      type: 'string',
      group: 'service',
      description: 'E.g. "Friday 4–8 PM, Emanuel\'s Chapel".',
    }),

    defineField({
      name: 'livestreamEnabled',
      title: 'Offer a livestream for this service',
      type: 'boolean',
      group: 'livestream',
      initialValue: false,
      description: 'Turn on to show a "Watch Livestream" button. Turn off to hide it — the link is kept.',
    }),
    defineField({
      name: 'livestreamUrl',
      title: 'Livestream link',
      // A plain string, not Sanity's `url` type: that type refuses anything without
      // "https://" in front, so pasting "youtube.com/live/abc" blocked the whole document
      // from saving. This accepts the link as people actually paste it; the website adds
      // https:// itself when it builds the button (see livestreamHref in src/lib/sanity.ts).
      type: 'string',
      group: 'livestream',
      description: 'Paste the link as-is — "youtube.com/live/…", "facebook.com/…", with or without https://.',
      hidden: ({ document }) => !document?.livestreamEnabled,
      validation: r =>
        r.custom((value, ctx) => {
          const on = (ctx.document as { livestreamEnabled?: boolean } | undefined)?.livestreamEnabled;
          const v = (value ?? '').trim();
          if (!on) return true;
          if (!v) return 'Add the livestream link, or turn the livestream off.';
          // something.tld[/path] — with or without a scheme; no spaces
          if (!/^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(v)) {
            return 'That does not look like a web address. Example: youtube.com/live/abc123';
          }
          return true;
        }),
    }),
  ],
  orderings: [
    { title: 'Most recent passing', name: 'passingDesc', by: [{ field: 'dateOfPassing', direction: 'desc' }] },
    { title: 'Name A–Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', passing: 'dateOfPassing', media: 'portrait', live: 'livestreamEnabled' },
    prepare: ({ title, passing, media, live }) => ({
      title,
      subtitle: [passing, live ? 'Livestream on' : null].filter(Boolean).join(' · '),
      media,
    }),
  },
});
