---
layout: post
title:  "Don't Stop 'till You Get Enough - Hypothesis Testing Stop Criterion with 'Precision Is The Goal'"
---

# Don't Stop 'till You Get Enough
*Demystifying  the Dark Art of Hypothesis Testing*


In hypothesis testing the stopping criterion for data collection is a non-trivial question that puzzles many analysts. 

This is especially true with sequential testing where demands for quick results may lead to biassed ones. 

Hypothesis testing may come off as a dark art. On the one hand, data collection is expensive. On the other, small data sets may not yield enough statistical significance to draw meaningful conclusions. Combining these constraints with stakeholder requirements for quick answers from data makes the task of choosing the sample size stopping criterion a challenging balancing act.

This is especially true if the data is collected in a sequential manner, where a person, or an algorithm, needs to determine when to stop collecting data to satisfy the project requirements without introducing confirmation bias, i.e, disproportionately supporting the researchers prior beliefs.

This post is targeted to anyone involved in experimentation, technical or managerial, and is interested in improving how they plan an experiment budget and conduct post data collection interpretation. 

[//]: <>  (A basic understanding of statistics and hypothesis testing experience are nice-to-haves but not essential as I will outline the basics.)  

[//]: <>  (You will learn why even though Bayesian approaches are more reliable than Frequentist ones for small data sets they do not magically solve the problem of confirmation bias. )

The main theme is around John Kruschke's “Precision is the Goal” method, who showed that one may obtain robust  unbiased results by determining **in advance** the experiment expected precision level.

## Hypothesis Testing in a Nutshell
Hypothesis testing is a scientific methodology to answer a question about a system by the collection and interpretation of relevant data.

Two common goals of hypothesis testing are:
* To rule out a baseline hypothesis, often referred to as a *null hypothesis*
* To accept a hypothesis be it the *null* or an alternative.

  
This method is applicable for nearly any industry, just to name a few examples:
* Drug discovery - is one therapeutic better than another/a placebo?
* Polling - is one candidate more likely to win over another?
* Marketing - is this promotion scheme likely to improve results over doing nothing or an alternative promotion? 

When discussing Hypothesis Testing with stakeholders, I try to simplify the challenges to main points

1. **Sample** results are indicative of the **population**, but not equal
2. Accuracy/precision is expensive

It's worth going into a bit of detail into these two points.


### Sample Results Are An Estimate Of The Truth, Not Equal

Most of the stakeholders kind of understand this, but because it is not intuitive it's worth emphasising.

The challenge lies, of course, in the fact that in most scenarios the hypothesis may not be applied to the whole population, but rather a sample.    

A clinician cannot test all men for a new cure for prostate cancer.  
A pollster cannot ring every phone in a district.   
A company would lose a lot of money trying to reach out to every potential customer.

When interpreting results of a sample it is important to remember that sample variance may yield an extreme result. This may be reduced by collecting more data. 

Hence, one of the key questions for the designer of an experiment is the sample size. 

### Stop Criterion - Decision Rule for "Enough"

When designing an experiment normally desires **reliable results** at **minimal cost**, which is normally a balancing act because on the one hand data might be costly, in monetary terms, time or both. 
On the other, statistical power, the probability of the sample result to convey the truth of the population,
benefits from more data.  

In some domains there is also a need to stop collecting as soon as possible for ethical reasons. 
E.g, a clinician that suspsects that a new drug might have deleterious effects.

Knowing when to stop collecting data is a dark art. Many analysts *wing it* by searching online for a convinient power calculator, use default or adjust a few parameters, pull the desired *n*. I suspect, based on my own experience in my first A/B test, is that they later might forget these step in their analysis.

This concludes a brief 101 on Hypothesis Testing. In the next parts we'll discuss problems with commonly used Frequentis and Bayesian methods and suggest an alternative.

##  The Popular NHST Is Very Problematic

The *Null Hypothesis Significance Test* (NHST) is by far the most popular method used. Unfortunately this frequentist approach has many flaws that, due to lack of understanding by non experts, causes it to be misused. This is the subject of [a separate post]({% post_url 2022-07-01-why-nhst-does-not-accept-null-hypotheses %}){:target="_blank"}. Here I briefly highlight key issues.

* Notoriously non intuitive - most non experts who use the method do not understand it and just plug-n'-play wishing for the best (or *winging it* ...). The Wikipedia [p-hacking entry](https://en.wikipedia.org/wiki/Misuse_of_p-values){:target="_blank"} contains a list of common misconceptions which mostly boils down to confusing likelihoods with posteriors.
* Cannot accept null hypotheses.  The NHST only can only be used to reject the null hypothesis or ***not reject*** it, but never accept it. [This is a subject of another post]({% post_url 2022-07-01-why-nhst-does-not-accept-null-hypotheses %}){:target="_blank"}
* In terms of confirmation bias, given enough time, NHST yields 100% false alarms

This last point was highlighted by JK, and worth going over to build an understanding of the subsequent sections.
In brief - in the case where the null hypothesis is true, using the p-value as the stopping criterion will, eventually, incorrectly reject the null hypothesis (i.e, if one tests outcomes long enough).

Let's learn by an example.

For our empirical examinations throughout this post we will explore Bernouli trials (or coin toss statistics) as these are well defined and are useful as an analogy for many dichotomic systems, i.e, those with two options success and fail (e.g, HEAD or TAILS of a coin toss, recovered or not recovered in medicine). The statistic of interest is the success rate denoted as $\theta$. 

The following chart summarises simulated results of a fair coin ($\theta_\text{true}=0.5$) tossed 1,500 times in sequence. In each iteration the cumsum average is taken (top chart) and the p-value is calculated assuming a null hypothesis of $\theta_\text{null}=0.5$. The blue "x"s on the bottom slide indicate when the p-value is below a commonly used stopping criterion threshold of 5%.

<img width="661" alt="Screenshot 2022-09-15 at 07 26 56" src="https://user-images.githubusercontent.com/6064016/190330145-1d5cb3a0-41e1-481f-99cb-5c1fa999d9ff.png">

In this particular test we clearly see that this is an extreme case where most tests are failures (or Tails of a coin). 

Since we know that this is a fiar coin, given enough time, it will asymptote to the true success rate of 0.5.  But in real life we do not know this and the according to the bottom diagram we would be bound to adhere to the stopping criterion just before the 400th toss. If we suspected the is not fair this would be considered *confirmation bias*.

This point has been made in multiple posts, where the main idea is that we have not corrected for sensitivity of exterme cases, as this cherry picked one.

Considering that the presented simulation was chosen to drive this point, you would be correct to ask - how representative is this sort of situation?

For this purpose I have conducted 1,000 similar simulations, end let each continue generating tests until it meets the stopping criterion:  

<p align="center">
<b> Collect data until p-value $<\alpha$ </b>
</p>

The metric of interest is for a given sequence iteration, what is the rate of rejecting the null hypothesis (or not rejecting) at the iteration ***or before***. E.g, in the first simulation we would have marked that as of iteration XX (where we marked the first X in the previous chart), all iterations prior would be marked as "not reject" and onwards would be considered "reject" because we stopped collecting data due to the stop criterion. We do this for all 1,000 simulations and then determine the cumulative proportions of these decisions.


(here we use the term "inconclusive")

The following diagram summarises the results. The horizontal axis is still the sequence iteration but the vertical axis is the cumulative proportion of decisions. (Note that we label "not reject" as "inconclusive" as this will be more consistent with what is to follow.)

<img width="659" alt="Screenshot 2022-09-15 at 07 38 40" src="https://user-images.githubusercontent.com/6064016/190332304-4c9d4002-d3f8-4601-bb97-0772fceefe5c.png">

To answer the question "how representative is it for a fair coin simulation to stop an reject the null hypothesis incorrectly after XX tests or prior" we see that this roughly happens over 30% of the time!

We notice an intersesting trend in which if we wait long enough using the p-value as the stop criterion one would eventually (as JK says: "with enough patients") incorrectly reject the null hypothesis 100% of the time!  This is because even though the statistical significance is getting smaller, the p-value gets more sensitive at picking up deviations.

We have seen here and in [a dedicated post]({% post_url 2022-07-01-why-nhst-does-not-accept-null-hypotheses %}){:target="_blank"} that the Frequentist NHST method, even though convinient and popular, has major limitations (e.g, never accepting the null hypothesis) flaws (in the case of the fair coin will eventually always incorrectly reject the null hypothesis).In what follows we shall see that the more descriptive Bayesian methods overcome these (e.g, may be used to accept and reject hypothesises). If not careful, however, also Bayesian methods may introduce confirmation bias, as we show below.

## Bayesian is Better but does not Magically Rid of Bias

We are in the midst of the Bayesian statistical revolution which provides richer in detail information in analysis. Some think that using a Bayesian approach, which I'll later define, magically solves for problems stated above. In the following I argue that the most common Bayesian methods, even though they are better than Frequentist (by virtue of providing more information), still pertain confirmation bias.

For those interested in understanding the key differences between Bayes and Frequentist approaches I wrote a [short post]({% post_url 2022-06-28-frequentist-vs-bayesian %}){:target="_blank"}.

We will start by examining a popular Bayesian approach called *HDI with ROPE* which allows for accepting null hypotheses, but, unfortunately still may yield confirmation bias.

### HDI with ROPE Stop Criterion

In the most simplest sense, to determine if to accept a hypothesis (null or otherwise), the HDI with ROPE examines if the lion's share of the posterior (called the *Highest Density Interval* or HDI) is within a range of interest (called the *Region or Practical Equivalence* or ROPE).

#### Highest Density Interval (HDI)
The Highest Density Interval is a popular Bayesian way to calculate a region called a *credible interval* (somewhat similar to the *confidence interval* that Frequentists use). 

It is defined as the interval where a percentage of the mass of the posterior lays when scanning from above. The percentage is chosen by the user, common choices are 95% in analytical solutions where non analytical might choose 94% for further stability (although 89% has been suggested to highlight how arbitrary this choice is; It's the highest prime below 95%; Why? Why not?!).


For an even better visual see the one in 3.1.1 of Claudiobellei's [Baysian AB testing post](http://www.claudiobellei.com/2017/11/02/bayesian-AB-testing/){:target="_blank"}.


#### Region of Practical Equivalence (ROPE)
The Region of Practical Equivalence, as mentioned by JK,  
 
> indicates a small range of parameter values that are considered to be practically equivalent to the null value for purposes of a particular application.

In other words, take the null value, and decide the upper and lower boundaries that the case study consideres to be for all practical reasons and considerations equivalent.

E.g, ....

#### HDI+ROPE Stop Criterion
The stop criterion is the decision algorithm to determine when to stop collecting data as well as the consequence of the result. ((Perhaps this should be further up)) 

The decision to stop collecting data in the case of HDI + ROPE is:  

<p align="center">
<b> Collect data until the HDI is <u>completely within</u> the ROPE or <u>completely outside</u> of it.</b>
</p>

This may be illustrated here:

![Screenshot 2022-09-26 at 20 31 18](https://user-images.githubusercontent.com/6064016/192365918-5454aac5-e8ab-4d3d-8b78-c9a8c09f0e16.png)



If the HDI is **completely** within the ROPE we accept the null hypothesis.    
If it is **completely** outside of the ROPE we reject the null hypothesis.  
If there is **overlap** the result is inconclusive.  We will later discuss how to deal with inconclusiveness.

It is instructive to visualse all six scenarios (two of which were presented in the previous visual): 

![Screenshot 2022-09-26 at 20 48 52](https://user-images.githubusercontent.com/6064016/192366854-c23984b2-8b82-4e93-92f7-69ad6238f0cb.png)

This visual is the most straight forward and intuitive. We see that the HDI regions are completely out of the ROPE, hence one rejects the null hypothesis.

![Screenshot 2022-09-26 at 20 49 06](https://user-images.githubusercontent.com/6064016/192366928-6edbe967-de48-4b18-a352-2934aaddb1de.png)

This is where Bayesian in general, and HDI+ROPE in particular, is more useful than the NHST - when the HDI is fully within the ROPE we can accept the null hypothesis value. JK emphasises, though, not the other values in the ROPE, just the value in the center.

![Screenshot 2022-09-26 at 20 49 34](https://user-images.githubusercontent.com/6064016/192366960-c680cc82-bc5e-44c5-a2dc-6bb88dd88757.png)

Here we see that we need a third cateogry: ***Inconclusive***. 

This is may be considered a slight limitation of the method, since many stakeholders prefer a conclusive decision to made accept/reject. I will address this point later on (LINK).  


#### Case Study: Binomial Tests
As before we examine binomial tests. 

We first examine the cherry picked similation in the NHST section but this time using the HDI+ROPE selection criterion. 
As a reminder we are using a fair coin ($\theta_\text{true}=0.5$) with a null hypothesis of the same value ($\theta_\text{null}=0.5$).
We obtain the following graphs, where the top is the same ....

We next rerun the same 1,000 simulations of $\theta_\text{true}=0.5=\theta_\text{null}$ as before using the HDI+ROPE and obtain the following cummulalative proportion of decisions: 

![Screenshot 2022-09-27 at 21 10 36](https://user-images.githubusercontent.com/6064016/192625732-f5f2264f-eae2-4857-8fcc-0df552ac0100.png)

In it we see a few interesting features:
* Below 400 tests the null hypothesis is either rejected (20% of the time) or inconclusive (80% of the time).
* Between 400 and 1,500 there is a transition period where inconclusiveness deminishes while acceptance grows.
* After 1,500 tests the null hypothesis is accepted 80% and 20% of the time is rejected! (why so much rejection? ...)

To build an intuition it is constructive to compare these results to those obtaind with simulations with $\theta_\text{true}=0.65$, $\theta_\text{null}=0.5$, ROPE=0.45-0.55, which the results are shown here:


![Screenshot 2022-09-27 at 21 19 03](https://user-images.githubusercontent.com/6064016/192627114-d2635315-ec28-426e-968f-41335971a97f.png)

It appears that in terms of decision making, one might conclude that if the null hypothesis is far from the truth one is likely to make the correct decsion.

There are two problems with such an approach, though:  
* The most obvious one is that the truth which is known in a simulation setting is not likely to be known in a real world one 
* A more subtle point - the sample value, which one might want to use as a proxy for the population may be highly skewed. 

We examine this last point in the next figure where we display for $\theta_\text{true}=0.65$, $\theta_\text{null}=0.5$, ROPE=0.45-0.55 simulations a histogram of the sample success rate at the time of making a decision. The the filled triangle is the mean of all samples (rate at the decision $\hat{\theta}$), $\overline{\hat{\theta}}$, where the nonfilled is $\theta_\text{true}$. 

![Screenshot 2022-09-27 at 21 20 14](https://user-images.githubusercontent.com/6064016/192627345-0edb1b96-d094-404d-9ca1-bed9853679c4.png)

We clearly see that $\overline{\hat{\theta}} = 0.72 > \theta_\text{true} = 0.65$, that is, there is a strong bias towards higher means. The reason is apparent by the cluster of results of $\hat{\theta} > 0.85$. These particular simulations happened to be sampled at high success rates where they successfully passed the criterion (HDI region larger than ROPE). The problem with the mean value, however is that this is not balanced at the other side. If we consider the results at $\hat{\theta} < 0.45$ (the mirror region of  $\hat{\theta} > 0.85$ around $\theta_\text{true}=0.65$), these would not pass the criterion (as part of the HDI will be within the ROPE).

This is, of course, quite concerning for setups that rely on using the sample result as a proxy of the population. Here we see that there is still a bias: The null hypothesis is correctly rejected ($\theta_\text{null}=0.5$), but it is weighed too high. 

To summarise this section, we learn that one of the most common Bayesian methods for A/B testing, HDI+ROPE, on the one hand has the advantage of accepting the null hypothesis as well as provides a descriptive credible interval. On the other hand, we also learned two limitations:
* In the fair coin test it may incorrectly reject the null hypothesis (for we saw that this happens 20% of the time)
* In the unfair coin test (our case of $\theta_\text{true}=0.65$, ROPE=0.45-0.55) it correctly rejects the null hypothesis after certain number of tests (~200), but the sample success rate at the time of decision is biased ($\overline{\hat{\theta}} = 0.72$)

To solve for both of these we turn to JK's improved method called "Precision is the Goal", which, as it's name suggests focuses on the expected precision of the sample.

## Precision Is The Goal

If you understood HDI+ROPE, the idea behind this method is quite simple - we collect data until the HDI is smaller than a predefined precision.

<p align="center">
<b> Collect data until HDI < Precision Goal.</b>
</p>

We use the ROPE for two parts. First we use it to determine the *Precision Goal*. A common choice is Precision Goal is 80% of the ROPE.  
Once the sample passes the criterion the precision criterion, we use the ROPE, as before in the HDI+ROPE method to determine the decision: reject, accept, inconclusive.

That is it! A small computational change (one or two lines of code), but conceptually more powerful.

Let's see this change in action in both of our fair and unfair tests.

### Dealing With Inconclusiveness




## Precision is the Goal

* Ensures non biased outcomes
* If the truth is the null hypothesis - may be highly inconclusive