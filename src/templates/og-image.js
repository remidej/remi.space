import React from 'react'
// import { graphql } from 'gatsby'

const OpenGraphImageTemplate = ({ data, pageContext }) => {
  console.log(`TEMPLATE RUNNING`)
  return <p>hello</p>
  // const post = data.markdownRemark
  // const title = post.frontmatter.title
  // const { width, height } = pageContext

  // return (
  //   <div style={{ width, height }} className="bg-gray-100 border-2 border-teal-200">
  //     {/* Site header */}
  //     <div className="inline-flex flex-row items-center">
  //       <div className="w-16 h-16 bg-teal-200 rounded-full"></div>
  //       <h1 className="font-bold -ml-10 text-3xl text-gray-800 hover:text-black">
  //         Rémi de Juvigny
  //       </h1>
  //     </div>
  //     {/* Article title */}
  //     <h1 className="text-3xl">{title}</h1>
  //   </div>
  // )
}

export default OpenGraphImageTemplate

// export const pageQuery = graphql`
//   query BlogPostShareImage($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       excerpt(pruneLength: 160)
//       timeToRead
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//         description
//       }
//     }
//   }
// `
