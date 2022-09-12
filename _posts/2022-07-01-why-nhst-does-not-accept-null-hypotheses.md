---
layout: post
title:  "Why the Null Hypothesis Signifiance Test Method Does Not Accept the Null Hypothesis"
---

Have you ever wondered why text book explanations of hypothesis tests emphasise that the *Null Hypothesis Significance Test* method (NHST) can only rule out the *null hypothesis* but not accept it? 

I haven't found a clear answer to this, but I randomly stumbled across a possible one in a converation at the PyData London 2022 conference. 

The bottom line is that, althouh p-values are somewhat useful to rule out null hypotheses, they are quite meaningless for accepting them. The observation leading to this conclusion is that in scenarios where the null hypothesis is true, the resulting p-values are just as likely to yield close to 0 (i.e, rejecting) as they are any other value, e.g, 0.9 (interpreted as not rejecting). 

Not being able to find a rigorous theoretical explanation, here I demonstrate on an anecdotal circumstance, which, in my opinion, is sufficient to prefer more reliable mechanisms methods, namely Bayesian.

I do this by a simplistic examination of Bernouli trials (or coin toss statistics) which clearly shows the unreliability of p-values. Within I will exploit our ability to know in advance the ground truth in a simulation to examine two scenarios:
* when the null hypothesis is true
* when the null hypothesis is not true

and see how the p-values respond the simulated data.

We'll begin with a brief explanation of how p-values are calculated and then we will examine the results of the said simulations.

*Disclaimer: To reiterate, the explantion here is by no means mathematically rigourous but rather here to serve for qualitative arguments.*


## Calculating p-values
Let's first examine how the sussage is made. The p-value quantifies *"assuming a null hypothesis the probability of obtaining the observed data or more extreme"*. 

Throughout this post we will assume the two sided test, but conclusions should be similar one-sided tests. 
For simplicity we will also limit our analysis to Bernouli trials in the context of the [Binomial test](https://en.wikipedia.org/wiki/Binomial_test), which is a well defined problem and may be used as a perfect (or near perfect) analogy for systems with success-failure outcomes, e.g, toss of a coin.

We define:

* $n$ as the number Bernouli trials, of which
* $k$ are successful (i.e, $0 \le k \le n$)
* $p$ the null hypothesis success rate being examined 

Let's examine an example where we assume a fair trial/coin ($p=0.5$) and conduct $n=10$ trials (e.g, coin tosses) of which $k=8$ are successes (e.g, land on heads).

The question that the p-value attempts to answer is: *"If we assume a null hypothesis of a success rate of $p=0.5$ and conduct $n=10$ trials, how likely should we expect results equal or more extreme than those obtained by our observation of k=8 successes?"*.  

By *equal or more extreme* I am referring to outcomes that are as probable or less probable than the observation, in our case, observations $i$ where $P(i)\le P(k=8)$.

The following visualisation assists to understand the calculation of the p-value, where the horizontal axis are the possible success values $k$ from 0 to $n=10$, where the vertical access is the $P(k)$ assuming $p=0.5$ (shown in log space to highlight the smaller probability values).


![k_logPk_10_8_0pt5](https://user-images.githubusercontent.com/6064016/187026769-43b29e47-8f47-4691-87ad-6e564f5164a1.png)

The p-value is calculated by summing the filled red bars, which in our case is the sum of probabilities of $k=0,1,2,8,9,10$ because they are as likely or more extreme (less probability) than the obsevation of $k=8$.

We obtain a p-value of 10.93% which leads us to the decision phase, should we reject the null hypothesis of $p=0.05$? We'll address the decision making later on.

Note that here we examined one experiment of small test of $n$ trials. The benefit of low $n$ was for visualisation purposes of the diagram above. To draw meaningful conclusions, however, we are required to run many simulations. To see clearer results we will also examine a much larger value of $n$ which will enable us to clearly see where $p$-values are useful and where they are not.


## Case Study: Null Hypothesis is Untrue
I'll start with the case where p-values are somewhat useful, as in correctly ruling out an incorrect null hypothesis.

In the simulations I set:
* True value $\theta_{true}=0.55$
* Null hypothesis $\theta_{null}=0.5$


We first examine the case where $n=256$ and get the following distribution of p-values for 5,000 simulations:  

![true_0pt55_null0pt5_5000_only256tossesexp](https://user-images.githubusercontent.com/6064016/186759777-88275e57-8d27-44a0-8956-959a782ece5d.png)

We clearly see that 50% of the p-values fall within the bin of 0%-10% (labelled as 0-0.099). 
Let's assume that the threshold for rejecting the null hypothesis is p-value smaller than 10% 
(note that most studies use 5% or 1%, we use here 10% just for simplicity of labelling the charts).  
That means that 50% of the time the p-values will reject the null hypothesis, but the other 50% we still cannot reject.  

What do things like if we collect more of the similar data? 

The following is for tests of size $n=4,096$ (same 5,000 simultations):

![true_0pt55_null0pt5_5000_256_4096tossesexp](https://user-images.githubusercontent.com/6064016/186954686-36dc4c7b-4f79-4b5d-97c8-c5eea9ba161f.png)

We clearly seåe that by collecting more data we can confidently reject the null hyptohesis (correctly!) all the time.

Now we'll reverse the tables and examine the case where Null Hypothesis is true.


## Case Study: Null Hypothesis is True
To drive our point home now we will examine the case where the null hypothesis is true which will show that p-values may mislead us to the wrong interpretation.

In the simulations I set both the the same value:
* True value $\theta_{true}=0.5$
* Null hypothesis $\theta_{null}=0.5$

The following is the p-value distribution of 5,000 binomial tests with $n=256$ and $n=4,096$ as indicated in the legend.

![true_0pt5_null0pt5_5000_256_4096tossesexp](https://user-images.githubusercontent.com/6064016/186955051-bd8e223c-1df8-427f-a566-cd306354bd33.png)


## Older txt


First, I'll virtually toss a coin $n=256$ times. In this case we expected to get HEADS (or 1) 128 times ($\theta_{null} \cdot n$) .  In the first set I get HEADS (or 1)130 times which yields a 2 sided p-value of 85% (i.e, reject). In a second set of 256 I obtain  heads 148 times (p-value of 1.46%; so depends on ones limit if to reject or not). 

Conducting this trial of 256 tossess 5,0000 times I get a distribution that looks something like the following.



p-value distribution of 5,000 binomial tests with $n=256$.

Even though we know that $\theta_{true}>\theta_{null}$, assuming a limit of 10% cutoff, one would rule out the null hypothesis X% of the time. In order to detect the known 5% effect size, one needs to collect more data. 










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


More values



![true_0pt55_null0pt5_5000exp](https://user-images.githubusercontent.com/6064016/186759345-6f7fed93-5685-4ef4-af6b-6078c9d88d81.png)

![true_0pt5_null0pt5_5000exp](https://user-images.githubusercontent.com/6064016/186758953-aca5f50b-d18d-4cbf-ab25-6216eda4e364.png)
