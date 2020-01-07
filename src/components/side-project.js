import React from 'react'
import { Link } from 'gatsby'
import { FiArrowRight } from 'react-icons/fi'
import { monthNames } from '../utils/dates'

const SideProject = ({ name, type, tools, date, slug, pitch, link, repoLink }) => {
  const jsDate = new Date(date)
  return (
    <article>
      <header>
        <h3 className="text-2xl font-medium hover:text-projects-700">
          <Link to={link}>{name}</Link>
        </h3>
        <p className="uppercase tracking-wide text-sm font-semibold text-gray-500 my-1">
          {`${monthNames[jsDate.getMonth()]} ${jsDate.getFullYear()}`} • {tools.join(', ')}
        </p>
      </header>
      <Link to={link} className="hover:text-projects-700 text-lg">
        View project <FiArrowRight className="inline" size="1em" />
      </Link>
      {repoLink && (
        <Link to={repoLink} className="hover:text-projects-700 text-lg">
          View code <FiArrowRight className="inline" size="1em" />
        </Link>
      )}
    </article>
  )
}

export default SideProject
