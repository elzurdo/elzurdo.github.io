---
layout: post
title:  "Don't Stop 'till You Get Enough - Hypothesis Testing Stop Criterion with 'Precision Is The Goal'"
---

# Don't Stop 'till You Get Enough
*Demystifying  the Dark Art of Hypothesis Testing*


In hypothesis testing the stopping criterion for data collection is a non-trivial question that puzzles many analysts. 

This is especially true with sequential testing where demands for quick results may lead to biassed ones. 

Hypothesis testing may come off as a dark art. On the one hand, data collection is expensive. On the other, small data sets may not yield enough statistical significance to draw meaningful conclusions. Combining these constraints with stakeholder requirements for quick answers from data makes the task of choosing the sample size stopping criterion a challenging balancing act.

This is especially true if the data is collected in a sequential manner, where a person, or an algorithm needs to determine when to stop collecting data to satisfy the project requirements without introducing confirmation bias.

This post is targeted to anyone involved in experimentation, technical or managerial, and is interested in improving how they plan an experiment budget and conduct post data collection interpretation. 

[//]: <>  (A basic understanding of statistics and hypothesis testing experience are nice-to-haves but not essential as I will outline the basics.)  

[//]: <>  (You will learn why even though Bayesian approaches are more reliable than Frequentist ones for small data sets they do not magically solve the problem of confirmation bias. )

The main theme is around John Kruschke's “Precision is the Goal” method, who showed that by determining in advance the experiment expected precision level yields robust results.

## Hypothesis Testing in a Nutshell
Hypothesis testing may be considered a scientific methodology to answer a question about a system by the collection and interpretation of relevant data.

Two common goals of hypothesis testing are:
* To rule out a baseline hypothesis, often referred to as a *null hypothesis*
* To accept a hypothesis. 

The former is more common due to the popular NHST method that is used.  
One of the objectives of this post is to make people more aware that this method 
does not enable the latter, and promote methods that do.

This method is applicable for nearly any industry, just to name a few examples:
* Drug discovery - is one therapeutic better than another/a placebo?
* Polling - is one candidate more likely to win over another?
* Marketing - is this promotion scheme likely to improve results over doing nothing or an alternative promotion? 



[//]: # (For most practiionares hypothesis testing is a means to "rule out a *null hypothesis*", i.e a baseline hypothesis, like:)
[//]: # (* Drug discovery: "Results of this new therapeutic are indistinguishable from a plaebo")
[//]: # (* Polling: "Both candidates are equally likely to win")
[//]: # (* Marketing: "Gifting a coupon has no impact on churn rates")



### Main Challenge

In most scenarios the hypothesis may not be applied to the whole population, but rather a sample. 
A clinician cannot test all men for a new cure for prostate cancer.  
A pollster cannot ring every phone in a district. 
A company would lose a lot of money trying to reach out to every potential customer.

When interpreting results of a sample it is important to remember:
* whereas sample results are indicative of those of the population, they are not equal
* sample variance may yield an extreme result
* to avoid misinterpretation the analyst should guard themselves with statistical tools

### Stop Criterion - Decision Rule for "Enough"

One of the key questions for the designer of an experiment is the sample size.  

Stakeholders want reliable results at minimal cost, which is normally a balancing act because on 
the one hand data might be costly, in monetary terms, time or both. 
On the other, statistical power, the probability of the sample result to convey the truth of the population,
benefits from more data.  

In some domains there is also a need to stop collecting as soon as possible for ethical reasons. 
E.g, a clinician that suspsects that a new drug might have deleterious effects.


### Coin Flipping Statistics

## The Problem with the Most Common Method - NHST

The *Null Hypothesis Significance Test* (NHST) is by far the most popular method used. Unfortunately this frequentist approach has many flaws that, due to lack of understanding, causes it to be misused. This is the subject of another post (LINK). Here I briefly highlight key issues.

* Non intuitive - most non experts who use the method do not understand it and just plug-n'-play wishing for the best (or *winging it* ...). This causes ??? since as [p-hacking](https://en.wikipedia.org/wiki/Misuse_of_p-values).
* Cannot accept null hypotheses
* Yields 100% false alarms (... with infinite patients ...) 


In a hisotircal sense NHST was created before the advent of the computer, when statisticians, e.g, its creator Fisher, calculated everything by hand. .... main point to stress: we have better technologies today, so should probably not use when dealing with small N.


## Bayesian is Better but does not Magically Rid of Bias

We are in the midst of the Bayesian statistical revolution which provides richer in detail information in analysis. Some think that using a Bayesian approach, which I'll later define, magically solves for problems stated above. In the following I argue that there are multiple Bayesian approaches, and that the most common ones, even though better than Frequentist (by virtue of providing more information), still pertain confirmation bias.

For those interested in understanding the key differences between Bayes and Frequentist approaches I wrote a [short post]({% post_url 2022-06-28-frequentist-vs-bayesian %}){:target="_blank"}.

We will start by examining a popular Bayesian approach called *HDI with ROPE* which allows for accepting null hypotheses, but, unfortunately still may yield confirmation bias.

### HDI with ROPE Stop Criterion

The HDI with ROPE in the most simplest terms examines if the lion's share of the posterior (called the *Highest Density Interval* or HDI) is within a range of interest (called the *Region or Practical Equivalence* or ROPE).

#### Highest Density Interval (HDI)
The Highest Density Interval is a popular Bayesian way to calculate a region called a *credible interval* (somewhat similar to the *confidence interval* that Frequentists use). 

It is defined as the interval where a percentage of the mass of the posterior lays when scanning from above. The percentage is chosen by the user, common choices are 95% in analytical solutions where non analytical might choose 94% for further stability (although 89% has been suggested to highlight how arbitrary this choice is; It's the highest prime below 95%; Why? Why not?!).


For an even better visual see the one in 3.1.1 of Claudiobellei's [Baysian AB testing post](http://www.claudiobellei.com/2017/11/02/bayesian-AB-testing/){:target="_blank"}.


#### Region of Practical Equivalence (ROPE)
The Region of Practical Equivalence, as mentioned by JK,  
 
> Indicates a small range of parameter values that are considered to be practically equivalent to the null value for purposes of a particular application.

In other words, take your null value, and decide the upper and lower boundaries that your case study consideres to be for all practical reasons and considerations equivalent.

E.g, ....

#### The Stop Criterion
The stop criterion is the decision algorithm to determine when to stop collecting data as well as the consequence of the result. ((Perhaps this should be further up)) 

The decision to stop collecting data in the case of HDI + ROPE is:  
> Collect data until the HDI is completely within the ROPE or completely outside of it.

This may be illustrated here:


If the HDI is **completely** within the ROPE we accept the null hypothesis.    
If it is **completely** outside of the ROPE we reject the null hypothesis.  
If there is **overlap** the result is inconclusive.  We will later discuss how to deal with inconclusiveness.

#### Case Study: Binomial Tests
As before we examine

* Can accept null hypotheses
* May incorrectly reject the null hypothesis 


### Dealing With Inconclusiveness




## Precision is the Goal

* Ensures non biased outcomes
* If the truth is the null hypothesis - may be highly inconclusive