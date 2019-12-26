import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { FiArrowRight } from 'react-icons/fi'
import Image from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ArticlePreview from '../components/article-preview'

const SKEW_DEGREES = -1

const Home = ({ location }) => {
  // Get image
  const data = useStaticQuery(graphql`
    query {
      # Get the avatar image
      avatar: file(absolutePath: { regex: "/remi-hello.png/" }) {
        childImageSharp {
          fixed(width: 350) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      # Get last posts preview
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 3) {
        edges {
          node {
            fields {
              slug
            }
            timeToRead
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
          }
        }
      }
    }
  `)

  const articles = data.allMarkdownRemark.edges

  return (
    <Layout location={location}>
      <SEO title="Rémi de Juvigny" />
      {/* Big colorful header */}
      <header
        className="text-teal-100 overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(44,122,123,1) 0%, rgba(55,135,166,1) 100%)',
          transform: `skewY(${SKEW_DEGREES}deg)`,
          marginTop: '-4.7rem',
        }}
      >
        <div
          className="heroPattern pt-12" // Used in CSS
          style={{ transform: `skewY(${-SKEW_DEGREES}deg)` }}
        >
          <div className="container mx-auto pt-12">
            <div className="flex flex-row justify-between">
              <div className="text-3xl text-white font-medium flex flex-col justify-center">
                <p>Hello there! Rémi here.</p>
                <h2>I'm a Product Developer from France.</h2>
                <p>I build apps users won't hate, and tell people about it.</p>
              </div>
              <div className="w1/4 flex flex-col items-end">
                <Image fixed={data.avatar.childImageSharp.fixed} alt={`Rémi says hello`} />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Writing section */}
      <section className="container mt-10 mx-auto flex flex-row text-gray-800 items-baseline relative">
        <div className="w-5/12 sticky top-0">
          <p className="font-bold text-3xl font-medium">
            Sometimes I like to <span className="text-purple-500">write things down.</span>
          </p>
          <p className="text-lg text-gray-600 mt-4">
            I write about JavaScript, React, Node, career tips, and really just about anything I
            want.
          </p>
        </div>
        <div className="ml-10 flex-1">
          {articles.map(({ node }) => (
            <ArticlePreview article={node} key={node.fields.slug} />
          ))}
          <Link to="/blog" className="hover:text-purple-500 text-lg">
            View all articles <FiArrowRight className="inline" size="1em" />
          </Link>
        </div>
      </section>
      {/* Work section */}
      <section className="container mt-10 mx-auto flex flex-row text-gray-800 items-baseline">
        <div className="w-5/12 sticky top-0">
          <p className="font-bold text-3xl font-medium">
            I work with teams to <span className="text-teal-500">build products.</span>
          </p>
        </div>
        <div className="ml-10 flex-1">
          <p>
            The other section Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur
            voluptatibus rem quas animi, odit exercitationem nulla at quis eius, nobis vel iste
            obcaecati aut eum porro accusamus repellat esse magnam. Beatae, fugiat suscipit ab autem
            earum eius eligendi obcaecati porro, aperiam explicabo voluptates quas quam. Dolores
            veritatis, quidem necessitatibus laudantium incidunt molestiae est assumenda voluptas
            numquam maxime labore nostrum distinctio. Exercitationem quaerat vel, aut odio quo vitae
            eius ad mollitia necessitatibus magnam praesentium soluta minus dicta? Eius animi
            laborum, deserunt asperiores distinctio aut accusantium vel quasi laboriosam quam
            assumenda perferendis! Nesciunt consequuntur quae officiis sapiente quam est corrupti
            exercitationem. Possimus consequatur sapiente ullam tempora labore officia, iure et
            dicta consequuntur incidunt maxime quia magni dolorem voluptatem obcaecati minus
            nesciunt sit! Cupiditate, magni tempora? Nesciunt, recusandae? Hic obcaecati
            repudiandae, impedit porro recusandae commodi cupiditate, nulla placeat modi deleniti
            vitae ipsum nemo velit iusto dolor quae. Ab omnis ipsa repellat nisi eum. Cumque debitis
            aliquam amet perferendis rerum hic id saepe earum praesentium qui ullam explicabo
            pariatur consequuntur natus quas ad suscipit ab nesciunt, assumenda deserunt! Natus quia
            commodi cupiditate provident incidunt!
          </p>
        </div>
      </section>
      {/* Side projects section */}
      <section className="container mt-10 mx-auto flex flex-row text-gray-800 items-baseline">
        <div className="w-5/12 sticky top-0">
          <p className="font-bold text-3xl font-medium">
            I do experiments on <span className="text-indigo-500">side projects.</span>
          </p>
        </div>
        <div className="ml-10 flex-1">
          <p>
            The other section Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur
            voluptatibus rem quas animi, odit exercitationem nulla at quis eius, nobis vel iste
            obcaecati aut eum porro accusamus repellat esse magnam. Beatae, fugiat suscipit ab autem
            earum eius eligendi obcaecati porro, aperiam explicabo voluptates quas quam. Dolores
            veritatis, quidem necessitatibus laudantium incidunt molestiae est assumenda voluptas
            numquam maxime labore nostrum distinctio. Exercitationem quaerat vel, aut odio quo vitae
            eius ad mollitia necessitatibus magnam praesentium soluta minus dicta? Eius animi
            laborum, deserunt asperiores distinctio aut accusantium vel quasi laboriosam quam
            assumenda perferendis! Nesciunt consequuntur quae officiis sapiente quam est corrupti
            exercitationem. Possimus consequatur sapiente ullam tempora labore officia, iure et
            dicta consequuntur incidunt maxime quia magni dolorem voluptatem obcaecati minus
            nesciunt sit! Cupiditate, magni tempora? Nesciunt, recusandae? Hic obcaecati
            repudiandae, impedit porro recusandae commodi cupiditate, nulla placeat modi deleniti
            vitae ipsum nemo velit iusto dolor quae. Ab omnis ipsa repellat nisi eum. Cumque debitis
            aliquam amet perferendis rerum hic id saepe earum praesentium qui ullam explicabo
            pariatur consequuntur natus quas ad suscipit ab nesciunt, assumenda deserunt! Natus quia
            commodi cupiditate provident incidunt!
          </p>
        </div>
      </section>
      {/* Twitter section */}
      <section className="container mt-10 mx-auto flex flex-row text-gray-800 items-baseline">
        <div className="w-5/12 sticky top-0">
          <p className="font-bold text-3xl font-medium">
            I spend too much time <span className="text-blue-500">on Twitter.</span>
          </p>
        </div>
        <div className="ml-10 flex-1">
          <p>
            The other section Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur
            voluptatibus rem quas animi, odit exercitationem nulla at quis eius, nobis vel iste
            obcaecati aut eum porro accusamus repellat esse magnam. Beatae, fugiat suscipit ab autem
            earum eius eligendi obcaecati porro, aperiam explicabo voluptates quas quam. Dolores
            veritatis, quidem necessitatibus laudantium incidunt molestiae est assumenda voluptas
            numquam maxime labore nostrum distinctio. Exercitationem quaerat vel, aut odio quo vitae
            eius ad mollitia necessitatibus magnam praesentium soluta minus dicta? Eius animi
            laborum, deserunt asperiores distinctio aut accusantium vel quasi laboriosam quam
            assumenda perferendis! Nesciunt consequuntur quae officiis sapiente quam est corrupti
            exercitationem. Possimus consequatur sapiente ullam tempora labore officia, iure et
            dicta consequuntur incidunt maxime quia magni dolorem voluptatem obcaecati minus
            nesciunt sit! Cupiditate, magni tempora? Nesciunt, recusandae? Hic obcaecati
            repudiandae, impedit porro recusandae commodi cupiditate, nulla placeat modi deleniti
            vitae ipsum nemo velit iusto dolor quae. Ab omnis ipsa repellat nisi eum. Cumque debitis
            aliquam amet perferendis rerum hic id saepe earum praesentium qui ullam explicabo
            pariatur consequuntur natus quas ad suscipit ab nesciunt, assumenda deserunt! Natus quia
            commodi cupiditate provident incidunt!
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default Home
