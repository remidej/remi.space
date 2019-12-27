---
title: How I rebooted my portfolio
date: "2019-12-26"
description: "The story, motivation and inspiration behind remi.space v4.0"
---

In `2015-04-23` my bother called me

>My domain registrar is offering me a free *.space* domain. Do you want it?

I was 15 and didn't know what to do with it, but I thought I'd figure that out along the way. So **I booked remi.space**, and built my first personal portfolio, despite having no projects to showcase.

## The 2020 reboot was the greatest thing

I had many sources of inspiration:

* [Travis Neilson's old portfolio](https://www.youtube.com/playlist?list=PLqGj3iMvMa4KeBN2krBtcO3U90_7SOl-A) for the the homepage's storytelling
* [Kent C. Dodds](https://kentcdodds.com/) for the personal branding strategy
* [Supermood](https://supermood.fr/) for the colorful homepage palette
* [HeyDesigner](https://heydesigner.com/) for the minimalist desktop navbar
* [The Outline](https://theoutline.com/) for the bold mobile hamburger menu

## How I coded it

```jsx
const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
    </Layout>
  )
}
```
