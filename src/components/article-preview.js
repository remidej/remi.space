import React from 'react'
import { Link } from 'gatsby'
import { FiArrowRight } from 'react-icons/fi'

const ArticlePreview = ({ article }) => {
  const title = article.frontmatter.title
  return (
    <article key={article.fields.slug} className="text-xl mb-8 last:mb-0">
      <header>
        <h3 className="text-2xl font-medium hover:text-blog-700">
          <Link to={article.fields.slug}>{title}</Link>
        </h3>
        <p className="uppercase tracking-wide text-sm font-semibold text-gray-500 my-1">
          {article.frontmatter.date} • {article.timeToRead} min read
        </p>
      </header>
      <section className="text-gray-700 text-lg">
        <p
          dangerouslySetInnerHTML={{
            __html: article.frontmatter.description || article.excerpt,
          }}
        />
      </section>
      <Link to={article.fields.slug} className="hover:text-blog-700 text-lg font-medium">
        Read <FiArrowRight className="inline" size="1em" />
      </Link>
    </article>
  )
}

export default ArticlePreview
