import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleSlicesRichText extends Struct.ComponentSchema {
  collectionName: 'components_article_slices_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'feather';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface FooterLinksSection extends Struct.ComponentSchema {
  collectionName: 'components_footer_links_sections';
  info: {
    description: '';
    displayName: 'Links section';
    icon: 'bulletList';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.link', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    description: '';
    displayName: 'button';
    icon: 'cursor';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'shared.link', false> &
      Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: '';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMetadata extends Struct.ComponentSchema {
  collectionName: 'components_shared_metadata';
  info: {
    description: '';
    displayName: 'metadata';
    icon: 'information';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['website', 'article']>;
  };
}

export interface SlicesBlogSection extends Struct.ComponentSchema {
  collectionName: 'components_slices_blog_sections';
  info: {
    description: '';
    displayName: 'Blog section';
    icon: 'medium';
  };
  attributes: {
    articleCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<4>;
    link: Schema.Attribute.Component<'shared.link', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SlicesHomeHero extends Struct.ComponentSchema {
  collectionName: 'components_slices_home_heroes';
  info: {
    description: '';
    displayName: 'Home Hero';
    icon: 'crown';
  };
  attributes: {
    intro: Schema.Attribute.Blocks;
    name: Schema.Attribute.String;
    socialNetworks: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-network.social-network'
    >;
  };
}

export interface SlicesLargeImage extends Struct.ComponentSchema {
  collectionName: 'components_slices_large_images';
  info: {
    displayName: 'Large image';
    icon: 'picture';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SlicesWorkSection extends Struct.ComponentSchema {
  collectionName: 'components_slices_work_sections';
  info: {
    description: '';
    displayName: 'Rich text section';
    icon: 'briefcase';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<
      ['green', 'blue', 'purple', 'rose', 'amber']
    > &
      Schema.Attribute.Required;
    content: Schema.Attribute.Blocks;
    link: Schema.Attribute.Component<'shared.link', false>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
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
