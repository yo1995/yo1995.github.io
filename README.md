<p align="center">
    <img src="/img/logo.png" alt="logo"/>
</p>

<p align="center">
    <a href="https://github.com/yo1995/yo1995.github.io/actions/workflows/pages/pages-build-deployment">
        <img src="https://github.com/yo1995/yo1995.github.io/actions/workflows/pages/pages-build-deployment/badge.svg" alt="GitHub Pages deployment status"/>
    </a>
</p>

# Ting's Blog

Jekyll rendered files for my blog. One of the last bastions for human crafted content on Simplified Chinese Internet.

## Changelog

- 260509: Add search page to the blog
- 260509: Migrate my blog deployment system to macOS
  - clean up README
  - set up new environment on Mac Studio, farewell Windows 🥲
  - update robots.txt to block AI crawling. stop training slop with gems 💎
  - rename branch `master` > `main`
- 241006: Hide search bar in the side bar for tags, categories and timeline

```html
<aside class="widget-wrap widget-search">
    <h4 class="widget-title">
        <span>Looking around?</span>
    </h4>
    {% include jekyll-search.html %}
    <div onclick="keyinsearch()" class="search-form" id="search-container">
        <input type="text" id="search-input" placeholder="search...">
        <i class="fa fa-search"></i>
        <ul id="results-container" style="list-style:square"></ul>
    </div>
</aside>
```

- 241006: Change `toc: true` > `toc on`; clean up all tag delimiters
- 241002: Fixed the post author blog layout downcase href issue
- 240108: Change all filename to lowercase - some comments and PV will be lost
- 230808: Disallow GPTBot
- 230619: Page title: Manifestations of Ting Chen -> Ting's Étude
- 221221: Added Timeline template using https://stackoverflow.com/a/43190996/14369688

## Prerequisites

Note to myself: To build local sources with Jekyll, here are the dependencies.

### macOS

1. `brew install ruby`
2. `echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc`
3. `source ~/.zshrc`
4. `gem install bundler jekyll`
5. Remove Gemfile.lock to use the latest plugins
6. `bundle install`, then resolve all build problems
7. Verify with `jekyll -v` and `bundle -v`
8. `bundle exec jekyll serve`

### Windows (deprecated)

1. git scm
2. ruby26
3. ruby devkit
    - To install RubyGems: `gem update --system`
4. gem install jekyll (Sometime blocked by GFW)
5. gem install bundler (To use bundler as the additional gem-package manager)
    - `gem list`: To check current gem list
    - if cannot install, remove previous gemfile.lock
    - `gem install bundler jekyll`
6. (bundle init)  `bundle install`
7. `bundle exec jekyll serve`

cd jekyll, build directory and bundle update.

When updating, bundle update [pack name]

## References

### Jekyll Formatting syntax

- [Blogpost on Jekyll Hello World](/html/helloworld-jekyll/)

### Ref or Footnote

```md
[^1]

[^1]: [Title](http://example.com/)
```

[GitHub ref](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes)

### Music

```html
<audio src="/music/some.mp3" autoplay="autoplay" loop="loop" controls="controls">
    Your browser does not support the audio element.
</audio>
```

### Alert

```
{: .alert .alert-info}

{: .alert .alert-success}

{: .alert .alert-warning}

{: .alert .alert-danger}
```

### Math

- [MathJax with Jekyll](http://www.gastonsanchez.com/visually-enforced/opinion/2014/02/16/Mathjax-with-jekyll/)

### Video

- YouTube

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/nFQy-qmyotc" frameborder="0" poster="/images/some.jpg" allowfullscreen></iframe>
```

- Inline

```html
<video src="/images/201711/nbalive95.mp4" controls preload="auto" poster="/images/201711/nbalive95_spurs.jpg" style="width:auto"></video> 
```

---

Created @ 201127
