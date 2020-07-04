---
layout: post
title:  "GitHub Hosted Web Page Using Jekyll"
date:   2020-02-06 12:47:57 +0000
categories: jekyll update
---

I have decided to create a web page to commnicate and document projects and personal experiences in the fascinating world of Data Science. Fortunately Github hosts web pages that are connected to an account and you can use the [Jekyll][jekyll-docs] platform to convert Markdown text to stylish pages. This is useful, so one doesn't have to dig deep into JavaScript to get something reasonable runnign a in short amount of time. 


{% highlight print %}
print('Jekyll also offers powerful support for code snippets :-)')
{% endhighlight %}

Jekyll have [walk-trough videos](https://jekyllrb.com/tutorials/video-walkthroughs/) and I used part of [this tutorial](https://programminghistorian.org/en/lessons/building-static-sites-with-jekyll-github-pages) to do the set up in the GitHub pages.

My only other advice is adding to `.gitignore` the following 

```
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
.DS_Store   # Mac users, you know what I'm talking about :-)
```

## Commenting  
`[//]: # (This may be the most platform independent way to add a comment)` 

`[//]: <> (Another comment option.)`  

`[comment]: <> (yet one more)` 

## Images  

In order to display an image and control for its size, the markdown looks something like 
{% highlight print %}
![](https://upload.wikimedia.org/wikipedia/commons/6/65/Hypsibiusdujardini.jpg){:width="300"}
{% endhighlight %}
which results in:  
![](https://upload.wikimedia.org/wikipedia/commons/6/65/Hypsibiusdujardini.jpg){:width="300"}

For an asset image the markdown looks like  
{% highlight print %}
![image]({{ site.url }}/assets/much-about-a-bump.png){:width="400"}   
{% endhighlight %}   
(note that the url part displayed above (on laptop, e.g, `http://localhost:4000`) is actually scripted as `{ site.url }`), and yields something like:  
![image]({{ site.url }}/assets/much-about-a-bump.png){:width="400"}   


[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
