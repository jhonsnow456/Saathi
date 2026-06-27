import React from 'react';
import { Helmet } from 'react-helmet';

import { title as appTitle } from '../../config';

interface MetaProps {
  description?: string;
  meta?: Array<{ name?: string; property?: string; content: string }>;
  title?: string;
  image?: string;
}

function Meta({ description, meta = [], title, image }: MetaProps) {
  const _title = `${appTitle} ${title ? '| ' + title : ''}`;
  const defaultImage = `${window.location.origin}/images/cover.png`;

  return (
    <Helmet
      title={_title}
      meta={[
        {
          name: 'description',
          content: description || '',
        },
        {
          property: 'og:title',
          content: _title,
        },
        {
          property: 'og:description',
          content: description || '',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: image || defaultImage,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: _title,
        },
        {
          name: 'twitter:description',
          content: description || '',
        },
        ...meta,
      ]}
    />
  );
}

export default Meta;
