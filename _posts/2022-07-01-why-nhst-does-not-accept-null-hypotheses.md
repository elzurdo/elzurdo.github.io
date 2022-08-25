---
layout: post
title:  "Why the Null Hypothesis Signifiance Test Method Does Not Accept the Null Hypothesis"
---

Have you ever wondered why text book explanations of hypothesis texts emphasise that the *Null Hypothesis Significance Test* method (NHST), can only rule out the *null hypothesis* but not accept it? 

I haven't found an answer to this, but came across one in a random converation at a PyData conference. The reason is that *p-values are meaningless for accepting the null hypothesis*. As I demonstrate below, if the null hypothesis is true, p-values are just as likely to yield close to 0 (i.e, rejecting) as they are any other value, e.g, 0.9 (not rejecting). Not being able to find a rigorous theoretical explanation, here I present one anecdotal circumstance, which, in my opnion, is sufficient to prefer more reliable mechanisms methods, namely Bayesian.

A simplistic examination of Bernouli trials (or coin toss statistics) will clearly show the unreliability. We will exploit our ability to know in advance that ground truth in a simulation to  examine two scenarios:
* The null hypothesis is true
* The null hypothesis is not true

and see how the p-values respond the simulated data.


## Null Hypothesis is Untrue
I'll start with the case where p-values are somewhat useful, as in correctly ruling out an incorrect null hypothesis. 

* True value $\theta_{true}=0.65$
* Null hypothesis $\theta_{null}=0.5$



-----
Other items possibly to address:

* The NHST is by far the most popular method used. Unfortunately this frequentist approach has many flaws that, due to lack of understanding, causes it to be misused. This is the subject of another post (LINK). Here I briefly highlight key issues.

* Have you ever seen them explain why? I haven't come across an explanation (but would be delighted to see a reference!), but stumbled across one possible expalantion at a conference  

 
* The finikiness of p-values leads to awkwardness conversations with stakeholders. This may be solved by using Bayesian approaches.

* [Example paper? *COVID-19 Antibody Seroprevalence in Santa Clara County, California*](https://www.medrxiv.org/content/10.1101/2020.04.14.20062463v2)


* Non intuitive - most non experts who use the method do not understand it and just plug-n'-play wishing for the best (or *winging it* ...). This causes ??? since as [p-hacking](https://en.wikipedia.org/wiki/Misuse_of_p-values).
* Cannot accept null hypotheses
* Yields 100% false alarms (... with infinite patients ...) 


In a hisotircal sense NHST was created before the advent of the computer, when statisticians, e.g, its creator Fisher, calculated everything by hand. .... main point to stress: we have better technologies today, so should probably not use when dealing with small N.