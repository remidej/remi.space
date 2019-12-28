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
* [Overreacted](https://overreacted.io) for the code syntax theme. I forked it to use the Tailwind color palette

## How I coded it

```jsx
class FlavorForm extends React.Component { // highlight-line
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // highlight-next-line
    this.setState({value: event.target.value});
  }

  // Cool comment
  // highlight-start
  handleSubmit(event) {
    const firstName = 'Rémi'
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
  // highlight-end

  render() {
    return (
      { /* highlight-range{1undefined4-9undefined12} */ }
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Here's a close up of some code

```ts
interface Person {
  age: number
  name: string
}
```

Pretty cool stuff!
