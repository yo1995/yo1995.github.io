## Main

Jekyll rendered files.

This repository aims to exhibit some of my previous works and thoughts. Currently it seems to contain more life-related blog posts than tech reviews.

The blog was not fully tuned for the maximum performance, hence could be slow during loading. Will optimize if I have adequate reasons to do it. (e.g. `want popularity`/`want a front-end job`/`become an ecrivan`/`want to rebuild a new version`, etc. :joy:)

## References

### Formatting syntax

[Doc](/html/helloworld-jekyll/)

#### Ref

```
[^1]

[^1]: [Title](http://example.com/)
```

#### Music

```html
<audio src="/music/some.mp3" autoplay="autoplay" loop="loop" controls="controls">Your browser does not support the audio element.</audio>
```

#### Alert

```
{: .alert .alert-info}

{: .alert .alert-success}

{: .alert .alert-warning}

{: .alert .alert-danger}
```

#### Math

[MathJax with Jekyll](http://www.gastonsanchez.com/visually-enforced/opinion/2014/02/16/Mathjax-with-jekyll/)

#### Video

- YouTube
```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/nFQy-qmyotc" frameborder="0" poster="/images/some.jpg" allowfullscreen></iframe>
```

- Inline
```html
<video src="/images/201711/nbalive95.mp4" controls preload="auto" poster="/images/201711/nbalive95_spurs.jpg" style="width:auto"></video> 
```

### Installing and Updating Procedure

1. git scm
2. ruby26
3. ruby devkit
  To install RubyGems: `gem update --system`
4. gem install jekyll (Sometime blocked by GFW)
5. gem install bundler (To use bundler as the additional gem-package manager)
gem list: To check current gem list
if cannot install, remove previous gemfile.lock
6. bundle init
  bundle install

cd jekyll build directory and bundle update, remember to do twice to both servers! (Will fix that one day! :disappointed_relieved:)

When updating, bundle update [pack name]

---

200718
