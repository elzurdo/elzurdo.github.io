---
layout: post
title:  "Start Asking Your Data 'Why?' - A Gentle Intro To Causal Inference (Part 1/4)"
---
{:refdef: style="text-align: center;"}
![rube goldberg machine](https://user-images.githubusercontent.com/6064016/137504966-875c898b-6c09-4c45-a801-97c3ff240914.png)
{: refdef}

*This is the first of a four part series aimed at decision makers, technical or managerial, 
who would like to improve their skills by adding causal intuition to their tool box.*

*Here we describe the importance of causal thinking and what to expect from this series.*

## Why Ask *“Why?”*
**Causal inference techniques may result in more meaningful results than the common associative interpretation of data.**

Decision makers put a lot of trust in data. This confidence manifests in claims like “data does not lie”, “data is king”, “data is the new oil”, or best quipped by the statistician William E. Denim:
 
<center> “In [deity] we trust, all others bring data!” </center><br>

We are all beneficiaries of data driven decisions. 
We live healthier lives than our ancestors thanks to medical conclusions from biological research that suggest what we should and should not put into our bodies.

We also have access to all of human knowledge via pocket sized devices thanks to smart algorithms for effective communication of data. 
One common benefit is daily optimisation suggestions from applications. 
Navigation software, e.g, suggests the best routes from point A to B based on various assumptions made by the engineers on what is considered “optimal”.

However, when it comes to decision making, human or automated, a critical question is often overlooked  -  is data, in itself, really enough for making reasonable decisions on which to act? 

After all, a research lead might draw inconclusive or, even worse, incorrect conclusions from data. 
For example, even though we now know that smoking adds risk to developing lung cancer, 
in the 1950’s and 1960’s this was hotly debated, where many times data analyses were deemed inconclusive 
(see: [1](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5298160/){:target="_blank"}, [2](https://cebp.aacrjournals.org/content/16/6/1070.long){:target="_blank"}). 
Another example is the famous 2013 study on the benefits of the Mediterranean diet against 
heart disease that had to be retracted in 2018 by the most prestigious of medical journals, 
because not all participants were randomly recruited (see: [3](https://www.bmj.com/content/364/bmj.l341){:target="_blank"}, [4](https://phys.org/news/2018-07-beware-scientific-studiesmost-wrong.html){:target="_blank"}).  

{:refdef: style="text-align: center;"}
![image]({{ site.url }}/assets/start-ask-why/now_1950s.png){:width="600"}
{: refdef}
<center> <b>Figure 1</b>: Smoking added risk to lung cancer is now appreciated, but it wasn't in the 1950s. </center><br>

As for automated decision making, 
many modern algorithms, such as neural networks, 
excel at identifying patterns, but not context. 
It has recently been [quipped](https://www.economist.com/science-and-technology/is-it-smarter-than-a-seven-month-old/21804141){:target="_blank"} that the most sophisticated computer algorithms are not 
smarter than a seven month old. 
That’s why machine *learning* is not regarded as *understanding*.[^1]

[^1]:  Ironically my spelling corrector is doing an amazing job at pointing out grammar mistakes and making excellent suggestions, but does not comment on the fact that I am somewhat deriding it by pointing out the limitations of it and its non sentient siblings and cousins …

As a consequence, small changes to an algorithm’s settings may result in meaningless to deleterious outcomes. 
This manifests in toy examples as deep learning modules that outperform humans in video games but requires hours to days of recalibration when, 
e.g, the input is slightly modified, in a manner which makes no significant difference for a human. 
Imagine, e.g,  a game of Tetris or Breakout being modified by adding or subtracting one row of pixels. 

A more concerning example is dangerous situations that may arise from vulnerabilities of 
image recognition algorithms in self-driving cars. 
Something as simple as adding a post-it on a stop sign may cause confusion in a neural network 
which would result in it to confidently classify the sign as a yield, something that would never fool a human. 
Not only can mishaps be dangerous but even more worrisome vulnerabilities may be maliciously exploited.  

{:refdef: style="text-align: center;"}
![image]({{ site.url }}/assets/start-ask-why/stop_sign.png){:width="400"}
{: refdef}
<center> <b>Figure 2</b>: The post-it on this stop sign triggered an image recognition algorithm<br> 
to confidently declare it as a speed limit sign.<br>(Credit: <a href="https://www.wired.com/story/machine-learning-backdoors/" target="_blank">WIRED</a>)
 </center><br>


Research inconclusiveness and machine learning hiccups make it not uncommon to hear scientists 
and machine learning practitioners apologetically claim that 

<center> “Correlation does not imply Causation” </center><br>

But, as it turns out, we can do better. 
With some simple ingenious tricks that have been developed in the past 30 years, 
one can unveil causal relationships with readily available data, 
without having to resort to expensive randomised control trials.[^2]

[^2]: Randomised Control Trials are considered the golden standard for causal analysis in many experimental settings by controlling for confounding factors. Their main setback, however, is that these tend to be either very expensive, or not feasible, or both. In causal inference we are interested in finding causal relationships in more readily available and cheaper data sets, often referred to as “observational data”.
 
In this series of posts you will learn how to add causal reasoning to your tool box.

In the [second post]({% post_url 2021-10-12-start_ask_why_part2 %}){:target="_blank"} you will learn about the importance of describing 
***the story behind the data*** which will enable you to draw more meaningful conclusions.

This will be followed up by a post introducing ***Graph Models*** as a simple to understand 
yet powerful visual aid to portray ***the story behind the data***. 
This will enable practitioners to both better interpret their experiments as well as design them.

In the fourth and final post we will discuss a classic case of data misinterpretation 
called ***Simpson’s paradox***, where you will learn how to identify and resolve it by controlling for confounding factors.

For the more technical minded we will also provide pointers at how to climb the 
*Causality ladder*, as illustrated in Figure 3.

{:refdef: style="text-align: center;"}
![image]({{ site.url }}/assets/start-ask-why/causal_ladder.png){:width="400"}
{: refdef}
<center> <b>Figure 3</b>: Judea Pearl’s Causal Ladder. Each rung represents a<br>
different level of complexity of causal inference.<br> 
(Credit: <a href="http://bayes.cs.ucla.edu/WHY/" target="_blank">The Book of Why</a>)
 </center><br>
 
 We illustrate how the lowest rung symbolises the associative/correlation methods of analysis that 
 are commonly used in predictive modeling including advanced machine learning. 
 We describe how by understanding the **story behind the data** one advances to the next rung - 
 causal inference of cohorts. The highest rung is where the most powerful causal inference lies - 
 on individual cases. 
 To illustrate this last point, imagine that instead of quantifying the benefit of taking medicine 
 for the average female in the age range of 35-40, to be able to predict for your own family member.

Finally we emphasise that whereas causal inference is not always possible, 
it should be an inspiration of a goal to aim for in any analysis and data driven decision making.


In the [next post]({% post_url 2021-10-12-start_ask_why_part2 %}){:target="_blank"} you will learn about the importance 
of understanding the **story behind the data** to draw causal conclusions. 

---

## The Story Behind This Series

![image]({{ site.url }}/assets/bayes_tunbridge_wells.jpg){:width="200"} 

As a data scientist, in late 2020 I decided to add causal inference to my statistical toolbox 
to improve how I facilitate stakeholders to make data driven decisions.

For this purpose I formed in my company a study group in which we covered [Pearl's Primer textbook](http://bayes.cs.ucla.edu/PRIMER){:target="_blank"} 
within six sessions. This resulted in both improved interpretation of analyses as well 
as experiment design. 

I found myself advocating for the learnings from the study group in numerous circles so 
much so I figured, as the saying goes:

<center> “If you repeat something for a third time, you might as well write a blog post.” </center><br>


Hence this series.

To that I'd like to add

<center> “Fifth time? Write a talk proposal.” </center><br>
  
Which I did. In 2021 I was fortunate to have the opportunity to present both internally at work, 
as well as two outreach talks globally (virtually).

The content of this series and further information and resources are provided in
my presentation: *Start Asking Your Data 'Why?' - A Gentle Introduction to Causal Inference*
* [Slide Deck: `bit.ly/start-ask-why`](https://bit.ly/start-ask-why){:target="_blank"}
* [EuroPython recording: `bit.ly/start-ask-why-europython`](https://bit.ly/start-ask-why-europython){:target="_blank"}.


{:refdef: style="text-align: center;"}
<a href="https://ep2021.europython.eu/talks/3hhnEFT-a-gentle-introduction-to-causal-inference/" target="_blank">
<img src="https://ep2021.europython.eu/static/img/ep2021-social-online-card.jpg" width="400"> 
</a>
{: refdef} 

{:refdef: style="text-align: center;"}
<a href="https://pydata.org/global2021/schedule/presentation/29/start-asking-your-data-why-a-gentle-introduction-to-causal-inference/" target="_blank">
<img src="https://secure.meetupstatic.com/photos/event/e/1/d/600_498843613.jpeg" width="400"> 
</a>
{: refdef} 



Alternatively you can watch the EuroPython presentation here. No background in python or statistics is required.

{:refdef: style="text-align: center;"}
<iframe width="756" height="567" src="https://www.youtube.com/embed/NzcCDUs7OTc" frameborder="0" allowfullscreen> </iframe>
{: refdef} 

---