import type { Schema, Attribute } from '@strapi/strapi';

export interface ArticleSlicesRichText extends Schema.Component {
  collectionName: 'components_article_slices_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'feather';
    description: '';
  };
  attributes: {
    content: Attribute.Blocks & Attribute.Required;
  };
}

export interface FooterLinksSection extends Schema.Component {
  collectionName: 'components_footer_links_sections';
  info: {
    displayName: 'Links section';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    links: Attribute.Component<'shared.link', true> & Attribute.Required;
  };
}

export interface SharedButton extends Schema.Component {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'button';
    icon: 'cursor';
    description: '';
  };
  attributes: {
    link: Attribute.Component<'shared.link'> & Attribute.Required;
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
  };
}

export interface SharedLink extends Schema.Component {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
    icon: 'link';
    description: '';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    text: Attribute.String & Attribute.Required;
    openInNewTab: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface SharedMetadata extends Schema.Component {
  collectionName: 'components_shared_metadata';
  info: {
    displayName: 'metadata';
    icon: 'information';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media;
    type: Attribute.Enumeration<['website', 'article']>;
  };
}

export interface SlicesBlogSection extends Schema.Component {
  collectionName: 'components_slices_blog_sections';
  info: {
    displayName: 'Blog section';
    icon: 'medium';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    link: Attribute.Component<'shared.link'> & Attribute.Required;
    articleCount: Attribute.Integer & Attribute.DefaultTo<4>;
  };
}

export interface SlicesHomeHero extends Schema.Component {
  collectionName: 'components_slices_home_heroes';
  info: {
    displayName: 'Home Hero';
    icon: 'crown';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    intro: Attribute.Blocks;
    socialNetworks: Attribute.Relation<
      'slices.home-hero',
      'oneToMany',
      'api::social-network.social-network'
    >;
    color: Attribute.Relation<
      'slices.home-hero',
      'oneToOne',
      'api::color.color'
    >;
  };
}

export interface SlicesLargeImage extends Schema.Component {
  collectionName: 'components_slices_large_images';
  info: {
    displayName: 'Large image';
    icon: 'picture';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    caption: Attribute.String;
  };
}

export interface SlicesWorkSection extends Schema.Component {
  collectionName: 'components_slices_work_sections';
  info: {
    displayName: 'Work section';
    icon: 'briefcase';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    color: Attribute.Relation<
      'slices.work-section',
      'oneToOne',
      'api::color.color'
    >;
    content: Attribute.Blocks;
    link: Attribute.Component<'shared.link'> & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'article-slices.rich-text': ArticleSlicesRichText;
      'footer.links-section': FooterLinksSection;
      'shared.button': SharedButton;
      'shared.link': SharedLink;
      'shared.metadata': SharedMetadata;
      'slices.blog-section': SlicesBlogSection;
      'slices.home-hero': SlicesHomeHero;
      'slices.large-image': SlicesLargeImage;
      'slices.work-section': SlicesWorkSection;
    }
  }
}
