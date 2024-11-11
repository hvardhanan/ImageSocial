import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient(
    {
        projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
        dataset: 'production',
        apiversion: '2024-11-01',
        useCdn: true,
        token: import.meta.env.VITE_SANITY_TOKEN
    }
);

const builder = imageUrlBuilder(client);

export const urlfor = (source) => builder.image(source);