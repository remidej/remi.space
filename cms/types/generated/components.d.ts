import type { Schema, Attribute } from '@strapi/strapi';

export interface ArticleSlicesRichText extends Schema.Component {
  collectionName: 'components_article_slices_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'feather';
  };
  attributes: {
    content: Attribute.Blocks;
  };
}

export interface FooterLinksSection extends Schema.Component {
  collectionName: 'components_footer_links_sections';
  info: {
    displayName: 'Links section';
    icon: 'bulletList';
  };
  attributes: {
    title: Attribute.String;
    links: Attribute.Component<'shared.link', true>;
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
  };
  attributes: {
    url: Attribute.String;
    text: Attribute.String;
    openInNewTab: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
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
    title: Attribute.String;
    color: Attribute.Relation<
      'slices.blog-section',
      'oneToOne',
      'api::color.color'
    >;
    link: Attribute.Component<'shared.link'>;
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
    link: Attribute.Component<'shared.link'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'article-slices.rich-text': ArticleSlicesRichText;
      'footer.links-section': FooterLinksSection;
      'shared.button': SharedButton;
      'shared.link': SharedLink;
      'shared.meta-social': SharedMetaSocial;
      'shared.metadata': SharedMetadata;
      'slices.blog-section': SlicesBlogSection;
      'slices.home-hero': SlicesHomeHero;
      'slices.large-image': SlicesLargeImage;
      'slices.work-section': SlicesWorkSection;
    }
  }
}
