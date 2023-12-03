import type { Schema, Attribute } from '@strapi/strapi';

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
  };
  attributes: {
    name: Attribute.String;
    color: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    intro: Attribute.Blocks;
    social_networks: Attribute.Relation<
      'slices.home-hero',
      'oneToMany',
      'api::social-network.social-network'
    >;
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
      'footer.links-section': FooterLinksSection;
      'shared.button': SharedButton;
      'shared.link': SharedLink;
      'slices.blog-section': SlicesBlogSection;
      'slices.home-hero': SlicesHomeHero;
      'slices.work-section': SlicesWorkSection;
    }
  }
}
