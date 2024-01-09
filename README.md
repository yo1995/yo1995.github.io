## Main

This repository contains Jekyll rendered files.

It aims to exhibit some of my previous works and thoughts. Currently in 2023 it leans towards lifestyle blog posts.

The blog was not tuned for the best browsing performance, and could have *very* long loading time. Will optimize if I have good reasons to do it one day :joy:. <sub>(e.g. `gained popularity`/`want a front-end job`/`become an ecrivan`/`want to rebuild a new version`, etc.)</sub>

## References

### Jekyll Formatting syntax

[Doc](/html/helloworld-jekyll/)

### Ref or Footnote

```
[^1]

[^1]: [Title](http://example.com/)
```

[GitHub ref](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes)

### Music

```html
<audio src="/music/some.mp3" autoplay="autoplay" loop="loop" controls="controls">Your browser does not support the audio element.</audio>
```

### Alert

```
{: .alert .alert-info}

{: .alert .alert-success}

{: .alert .alert-warning}

{: .alert .alert-danger}
```

### Math

[MathJax with Jekyll](http://www.gastonsanchez.com/visually-enforced/opinion/2014/02/16/Mathjax-with-jekyll/)

### Video

- YouTube
```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/nFQy-qmyotc" frameborder="0" poster="/images/some.jpg" allowfullscreen></iframe>
```

- Inline
```html
<video src="/images/201711/nbalive95.mp4" controls preload="auto" poster="/images/201711/nbalive95_spurs.jpg" style="width:auto"></video> 
```

## Installing and Updating Procedure

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

cd jekyll build directory and bundle update.

When updating, bundle update [pack name]

## Changelog

- 240108: Change all filename to lowercase - some comments and PV will be lost
- 230808: Disallow GPTBot
- 230619: Page title: Manifestations of Ting Chen -> Ting's Étude
- 221221: Added Timeline template using https://stackoverflow.com/a/43190996/14369688

---

Created @ 201127
