# Frontend Mentor - Blog preview card solution

This is a solution to the [Blog preview card challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/blog-preview-card-ckPaj01IcS). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - Blog preview card solution](#frontend-mentor---blog-preview-card-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
  - [Author](#author)
  - [🧞 Commands](#-commands)

## Overview

### The challenge

Users should be able to:

- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Solution](https://www.frontendmentor.io/solutions/)
- Live Site URL: [live site](https://rol4nd909.github.io/fm-blog-preview-card/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- [Astro](https://astro.build/) - The web framework for content-driven websites
- [CubeCSS Tailwind](https://piccalil.li/blog/a-css-project-boilerplate/) - For styling

### What I learned

Using css @property to make a smooth transition with a custom property

```css
@property --s {
    syntax: '<number>';
    inherits: false;
    initial-value: 0;
}

.card {
  --s: 0.5;
  
  box-shadow: calc(var(--s) * 1rem) calc(var(--s) * 1rem) 0 0 var(--color-neutral-900);
  transition: --s var(--transition-bounce);
  
  &:is(:hover) {
    --s: 1;
  }
}
```

## Author

- Frontend Mentor - [@rol4nd909](https://www.frontendmentor.io/profile/rol4nd909)
- Twitter - [@rolandfranke](https://www.twitter.com/rolandfranke)



## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |