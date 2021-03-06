---
layout: post
title:  "GitHub hosted web page using Jekyll"
date:   2020-02-06 12:47:57 +0000
categories: jekyll update
---

I have decided to create a web page to communicate and document projects and personal 
experiences in the fascinating world of Data Science. Fortunately Github hosts 
web pages that are connected to an account and you can use the 
[Jekyll][jekyll-docs]{:target="_blank"} platform to convert 
Markdown text to stylish pages. This is useful, 
so one doesn't have to dig deep into JavaScript to get something 
reasonable running a in short amount of time. 


{% highlight print %}
print('Jekyll also offers powerful support for code snippets :-)')
{% endhighlight %}

Jekyll have [walk-trough videos](https://jekyllrb.com/tutorials/video-walkthroughs/){:target="_blank"} 
and I used [this tutorial](https://programminghistorian.org/en/lessons/building-static-sites-with-jekyll-github-pages){:target="_blank"} 
to do the set up in the GitHub pages.

In order to display an image and control for its size, the markdown looks something like 
{% highlight print %}
![](https://upload.wikimedia.org/wikipedia/commons/6/65/Hypsibiusdujardini.jpg){:width="300"}
{% endhighlight %}
which results in:  
![](https://upload.wikimedia.org/wikipedia/commons/6/65/Hypsibiusdujardini.jpg){:width="300"}

For an asset image the markdown (ruby's kramdown) looks like  
{% highlight print %}
![image]({{ site.url }}/assets/much-about-a-bump.png){:width="400"}   
{% endhighlight %}   
(note that the url part displayed above (on laptop, e.g, `http://localhost:4000`) is actually scripted as `site.url` but within two sets of curly brackets `{}`), and yields something like:  
![image]({{ site.url }}/assets/much-about-a-bump.png){:width="400"}  

Similar idea but aligning to center 

{% highlight print %}
{:refdef: style="text-align: center;"}
![image]({{ site.url }}/assets/much-about-a-bump.png){:width="400"}
{: refdef} 
{% endhighlight %}   

{:refdef: style="text-align: center;"}
![image]({{ site.url }}/assets/much-about-a-bump.png){:width="400"}
{: refdef} 

And this is how you can embed multiple images side by side

{% highlight print %}
<p>
<img src="https://upload.wikimedia.org/wikipedia/en/8/83/Hamilton-poster.jpg" width="200">  
<img src="https://upload.wikimedia.org/wikipedia/en/7/70/Tina_musical_poster.png" width="230">  
</p>
{% endhighlight %} 


<p>
<img src="https://upload.wikimedia.org/wikipedia/en/8/83/Hamilton-poster.jpg" width="200">  
<img src="https://upload.wikimedia.org/wikipedia/en/7/70/Tina_musical_poster.png" width="230">  
</p>

Embedding a video from YouTube and aligning to center is as easy as 

{% highlight print %}
<p align="center">
<iframe width="840" height="630" src="http://www.youtube.com/embed/6GfOV_sL98A" 
frameborder="0" allowfullscreen>
</iframe>
</p>
{% endhighlight %}  

Note the `embed/[hash_number]` syntax when copying over from YouTube.

<p align="center">
<iframe width="840" height="630" src="http://www.youtube.com/embed/6GfOV_sL98A" 
frameborder="0" allowfullscreen>
</iframe>
</p>


My only other advices is adding to `.gitignore` the following 

```
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
.DS_Store   # Mac users, you know what I'm talking about :-)
```



[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
