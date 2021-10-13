---
layout: post
title:  "Start Asking Your Data 'Why?' - A Gentle Intro To Causal Inference (part 1/4)"
---

This is the first of a four part series aimed at decision makers, technical or managerial, who would like to improve their skills by adding causal intuition to their tool box. 

Here we describe the importance of causal thinking and what to expect from this series.

## Part 1 of 4 - Why Ask *“Why?”*
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
<center> Figure 1: We now appreciate that smoking adds risk to lung cancer, but this was not the case in the 1950s. </center><br>

Test text{: style="color:gray; font-size: 80%; text-align: center;"}

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

Research inconclusiveness and machine learning hiccups make it not uncommon to hear scientists 
and machine learning practitioners apologetically claim that 

<center> “Correlation does not imply Causation” </center><br>

But, as it turns out, we can do better. 
With some simple ingenious tricks that have been developed in the past 30 years, 
one can unveil causal relationships with readily available data, 
without having to resort to expensive randomised control trials.[^2]

[^2]: Randomised Control Trials are considered the golden standard for causal analysis in many experimental settings by controlling for confounding factors. Their main setback, however, is that these tend to be either very expensive, or not feasible, or both. In causal inference we are interested in finding causal relationships in more readily available and cheaper data sets, often referred to as “observational data”.
 
In this series of posts you will learn how to add causal reasoning to your tool box.

In the second post you will learn about the importance of describing 
***the story behind the data*** which will enable you to draw more meaningful conclusions.

This will be followed up by a post introducing ***Graph Models*** as a simple to understand 
yet powerful visual aid to portray ***the story behind the data***. 
This will enable practitioners to both better interpret their experiments as well as design them.

In the fourth and final post we will discuss a classic case of data misinterpretation 
called ***Simpson’s paradox***, where you will learn how to identify and resolve it by controlling for confounding factors.

For the more technical minded we will also provide pointers at how to climb the 
***Causality Ladder*** from the lowest rung of the common associative method of analysis, 
via cohort causal inference (c.f, *interventions*), and ultimately to causality on 
individuals (c.f, *counterfactuals*). 
To illustrate this last point, imagine that instead of quantifying the benefit of taking medicine 
for the average female in the age range of 35-40, to be able to predict for your own family member.

---

## Anymore for anymore?

The content of this blog post and further information and resources are provided in
my presentation: *Start Asking Your Data 'Why?' - A Gentle Introduction to Causal Inference*
* [Slide Deck](https://bit.ly/start-ask-why){:target="_blank"}
* [Recording of presentation at EuroPycon 2021](https://bit.ly/start-ask-why-europython){:target="_blank"}


{:refdef: style="text-align: center;"}
<img src="https://ep2021.europython.eu/static/img/ep2021-social-online-card.jpg" width="500"> 
{: refdef} 

---