import React from 'react'
import { Link } from 'gatsby'
import { FiArrowRight } from 'react-icons/fi'

const ArticlePreview = ({ article }) => {
  const title = article.frontmatter.title
  return (
    <article key={article.fields.slug} className="text-xl mb-8 last:mb-0">
      <header>
        <h4 className="text-2xl font-semibold text-gray-800 leading-tight">
          <Link to={article.fields.slug} className="hover:underline">
            {title}
          </Link>
        </h4>
      </header>
      <section className="text-gray-600 text-lg mt-2 mb-1">
        <p
          dangerouslySetInnerHTML={{
            __html: article.frontmatter.description || article.excerpt,
          }}
        />
      </section>
      <Link to={article.fields.slug} className="hover:text-black text-lg text-gray-700">
        Read <FiArrowRight className="inline translate-y-1" size="1em" />
      </Link>
    </article>
  )
}

export default ArticlePreview
