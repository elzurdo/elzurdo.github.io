---
layout: post
title: "🛑️⚖️ Don't Stop 'til You Get Enough — Reintroducing the “Precision is the Goal” Stopping Criterion for A/B and Hypothesis Testing"
---

<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="zurdo" data-description="Support me on Buy me a coffee!" data-message="Buy me a slice of pizza! 🍕" data-color="#40DCA5" data-position="Right" data-x_margin="18" data-y_margin="18"></script>

#### Replace your next Power Analysis with this method for more reliable decision making

> “How much data is required?”

This is a common question in Hypothesis and A/B testing.

[For non members note that the article is available free here.]

This is asked mostly prospectively, i.e, prior to collection of the data, but is also relevant retrospectively, i.e, after data has been collected: 🛑

> “Have we collected enough data yet?”

The standard interview answer is: plug in key parameters such as effect size and error rates into a *Power Analysis*. This is a useful go-to method for a rough estimate, but has two key limitations:

- It cannot be used to accept the null hypothesis, but only to reject it and awkwardly “not reject”.
- The key input effect size is normally later forgotten/ignored resulting in p-hacking and HARKing (hypothesizing after the results are known) resulting potentially less reliable decision making and in the scientific community one of the factor of the replication crisis.

Both of these are limitations for the popular Null Hypothesis Significance Testing (NHST; i.e, frequentist methods using *p-values*) and the latter for *Bayes Factor* heuristic.

One solution to this is buried in chapter 13.6 of John Kruschke's 2015 [***Doing Bayesian Data Analysis***](https://www.amazon.co.uk/Doing-Bayesian-Data-Analysis-Tutorial/dp/0124058884){:target="_blank"} (known as the book with the dogs 🐶) , and YouTube video (see appendix below) which, puts effect size at the centre of the whole process and yields, in my humble opinion, much more reliable decisions.

Being Bayesian in nature *Precision is the Goa*l (PitG) may accept the hypothesis. Whereas Bayes Factors can, too, PitG are more reliable as, e.g, if the null hypothesis happens to be true it can accept with potentially zero* (or near zero) false acceptance/rejection rates (otherwise known as false positive/negative rates FPR, FNR). The reason, which we will see throughout this post is that PitG is much less sensitive to non representative samples.

Since I first came across PitG in 2018, I have been wondering why it isn't more well known. E.g, in September 2026 I discussed it in a statistics conference and only one person of the 20+ attending knew of it. Once convinced of its utility I have been promoting it and in the process I came across a slightly improved variant, which I introduce here.

In this post you will learn why Precision is the Goal is useful for sample size estimation and when to apply. To facilitate adoption, in a companion article I present an online interactive calculator for advise on hypothesis / A-B test sample sizes.

## TL;DR

For those in a hurry:

- Bayesian hypothesis testing enables the acceptance of the null hypothesis.
- Precision is the Goal ensures more reliable sample size calculation by ensuring the effect size is accounted for throughout the process: sample size estimation and the result decision stage.
- A close-formed formula enables the Precision is the Goal to be useful beyond its original sequential hypothesis testing designation but also for prospective and retrospective calculations.
- Below is an [online interactive calculator](https://r-w-t-y.streamlit.app/){:target="_blank"} for better prospective sample size calculations as well as retrospective/sequential calculations: plug summary stats and see if you can accept or reject the null hypothesis. Careful thought of the Effect Size is required.

<!-- To embed the calculator live instead of linking to it, delete the screenshot block
     below and uncomment this iframe. Free Streamlit apps sleep when idle, so a visitor
     may land on a wake-up screen rather than the calculator.
<iframe src="https://r-w-t-y.streamlit.app/?embed=true" width="100%" height="630" frameborder="0" scrolling="no"></iframe>
-->

<div style="text-align:center">
    <a href="https://r-w-t-y.streamlit.app/" target="_blank"><img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/00-streamlit-calculator.png" alt="Interactive sample size calculator" width="560"></a>
</div>

*Click through to the live calculator at [https://r-w-t-y.streamlit.app/](https://r-w-t-y.streamlit.app/){:target="_blank"}*

For those interested in the details in how the sausage is made 🌭 …

## What I'm Talking About When I Talk About Accepting the Null Hypothesis

TK: put into context

Scientific incentives and business settings often favour the discovery of new effects/findings, however rigorous confirmation of the null is equally critical in many fields, e.g,:

💊 bioequivalence trials for generic drugs: [some details tbd]

💻 to do-no-harm regression testing in software deployment [some details tbd]

📋 futility stopping in programme evaluations. [some details tbd]

## Hypothesis Testing Basics

Empirical testing is foundational for progress of scientific findings.

One key challenge is knowing when enough data has been collected to make a reliable decision (the subject of this post).

The most popular method by far is the frequentist *Power Analysis* in which one pre-determines the sample size required providing the desired:

- Minimum effect size
- False Positive Rate (incorrectly rejecting null hypothesis)
- False Negative Rate (incorrectly **not** rejecting null hypothesis)

Stronger effects require smaller sample sizes. Smaller error rates (FPR, FPN) requires larger sample sizes.

One main limitation of Power Analysis in practice is the fact that the same minimum effect size is later ignored when the data is collected making this stopping criteria misleading. We will later address this but first we need to discuss limitations of fixed predetermined sample sizes.

### Practical Considerations in Data Collection

Collecting data may be time consuming and expensive 💰.

Stakeholders want reliable results fast ⌛ at minimal cost. E.g, in large scale A/B testing.

In other words, if the answer is in the data, it might be a waste of time and money to continue collecting.

In some settings there may also be ethical issues. E.g, clinicians testing for drugs might be ethically inclined to stop as soon as possible to avoid deleterious effects.

For these instances one might want to peek and see to which direction the needle may be pointing.

### Sequential Hypothesis Testing

Sequential hypothesis testing is a flexible alternative method of allowing evaluation while data is being accumulated.

It is used in many domains such as

[TK explanations for each]

💊 Clinical trial —

✅ Quality Control

🅰️ / 🇧 Testing

🗳️ Polling

Depending on the setup sequential hypothesis testing enables examining the result after every batch is collect (in our simulations below we do batches of n=1, but any size should do).

Whereas in predetermined sample size experiments one determine waits for all the samples to be collected, in the sequential method there are two key criterion that are required to be fulfilled dynamically:

- Stopping: When do we stop collecting data
- Decision: Assume we've collected enough data should the null hypothesis be rejected or accepted?

Most practitioners will be surprised by this separation between Stopping and Deciding, because most sequential hypothesis methods (e.g, NHST and Bayes Factors) these two are coupled.

The main concern with these methods is that 👀 *early peeking* may lead to *confirmation bias*. [TK expand on this a bit]

The reason for confirmation bias happens is quite simple: a non representative sample eluded the stopping criterion. Being also the decision criterion an error is likely to be made for this sample.

To better gain an intuition let's examine the popular p-value serving as both the stopping and decision criterion in sequential hypothesis testing.

### P-values as a Coupled Stopping + Decision Criterion

The p-value quantifies as the probability of obtaining a certain result or more extreme given a null hypothesis value.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/01-pvalue-binomial.png" alt="Visualising the p-value for a binomial test" width="636">
</div>

*Visualising the p-value for a binomial test: One tosses a coin n=30 times in which k=24 of them result in HEADS. Assuming a fair coin, the p-value of a two sided test is 0.14%. (note that the y axis is in a logarithmic scale)*

Given a data set of size *N*, most p-value based sequential hypothesis testing give it dual purpose:

- **Deciding** if to reject the null hypothesis (it does not contain the information to accept the null).
- **Stopping** if it is found that the decision is to reject the null. If it cannot collect keep collecting until an ultimate budget limit is reached.

The key flaws in the p-value method can be shown by the simplest of tests: fair coin experiments. By tossing a coin (i.e, simulating single-group binomial data) we can stop at each toss and examine if the accumulated data can be used to reject a null hypothesis of a fair coin or not.

At each toss there are two decisions to be made: (1) reject the null and stop collecting (2) not to reject and continue collecting.

Since this is a fair coin we should not be rejecting. A rejection is considered a ***false rejection*** (normally referred to as a ***false positive***, but I prefer to be explicit). The following graph shows the false rejection rate (in red) against the no-rejection rate. It may also be referred to as the “inconclusive” rates since p-values cannot accept the null hypothesis. The x axis is the iteration number. The y value is the proportion of experiments at the iteration or before in which the null has been rejected (red solid) or not (gray dashed). For this purpose we used 200 fair coin experiments, each that may go up to 30,000 coin tosses. We also use the unfortunately popular threshold of p<0.05 (which in words mean: “I'm fine of being wrong on average every 20 experiments”; using a more conservative threshold of 0.005 or lower yields similar trend but with lower error rates.) Note that in this analysis once an individual experiment has rejected the null hypothesis it stops tossing more coins but its decision of rejected are propagated to the future iterations.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/02-pvalue-decision-rates.png" alt="Sequential hypothesis decision rates for fair coins using p-values" width="700">
</div>

*Sequential hypothesis decision rates for fair coins using p-values for stopping and deciding.*

An example read it shows that at iteration 100, of the 200 experiments, about 20% (i.e., 40 experiments) have incorrectly rejected the null hypothesis at iteration $N \le 100$ <!-- medium: N≤100 -->. That doesn't mean that all 40 false rejections happened at iteration 100, but rather up to and including iteration 100. This simulates the researcher that examines (by eye or has an automated algorithm) the results at each data point.

We see that the rejection rate increases with every iteration indicating that p-values are a poor choice for a decide-and-stop heuristic.

John Kruschke's has a ringing interpretation to this observation (where he calls false rejections “false alarms”):

> *With infinite patience NHST results in **100% false alarms***

Going Bayes, does not magically resolve the false rejection problem. Although Bayes mechanisms may accept the null hypothesis (more on this below) when using Bayes mechanisms in fair coin sequential hypothesis testing, one still results in false rejection rates. Below we demonstrate this for one method called HDI+ROPE (defined below). John Kruschke shows in [reference] that in the fair coin experiment [tk result] ….

As we argue below, methods that use a heuristic (p-value, Bayes Factors, or HDI+ROPE defined below) which serve simultaneously as Stopping and Decision criteria are subject to confirmation bias. We demonstrate that this may be ameliorated by decoupling the Stopping Criterion and the Decision Criterion and accounting for the effect size throughout.

### The Importance of Effect Size

One aspect of hypothesis testing that is often lost on junior and even advanced data scientists and researchers is that “statistically significant” result may be **practically meaningless.**

With a very large sample, even a tiny departure from expectation can produce a small p-value (or notable Bayes Factor). This is exactly what we've shown above in the fair coin experiment p-value decision rate chart.

> [Given enough data] even a practically meaningless result may be statistically significant.

Consider a hypothetical scenario where a researcher examines whether a therapeutic differs in impact by gender. Even if the data yield a “statistically significant” result (say, the drug is 72.1% beneficial for males and 72.3% for females), a practitioner may consider this equivalent for all practical purposes.

We discussed minimum effect size as a key input to Power Analysis to pre-determine a sample size required. In practice, however, most researchers ignore this minimum effect size in the final verdict and quote their p-value (or Bayes Factor) disregarding the fact that it contains no information of the input effect size planned.

This also happens in sequential hypothesis testing where the p-values (or Bayes Factors) serve both as a stopping and decision criterion. Not containing effect size information, these heuristics are vulnerable to biased extreme cases and hence are susceptible to confirmation bias.

Fortunately, John Kruschke demonstrated that we can do better by decoupling the stopping criterion and the decision Criterion. We will discuss these in detail but in brief, the stopping criteria is determined by the posterior precision (which should be equal or smaller than the minimum effect size) and the decision criteria by its positional relationship to the minimal effect size.

In what follows we will first discuss an alternative Bayesian decision criterion called HDI+ROPE and then discuss the stopping criterion *Precision is the Goal*.

## ⚖ Decision Criterion: HDI + ROPE

The HDI+ROPE method, as its name implies has two components

### Characterising the Posterior with the HDI

The *High Density Interval* (HDI) is a Bayeian *credible interval* (think of it as the cousin of the frequentist confidence interval) which is defined as the smallest region where most of the posterior resides.

One way of putting is is that all points within the HDI have a higher probability density than outside of it.

[Insert Visual]

For a formal definition see my paper, or check out this python algorithm by [reference].

As a heuristic the HDI characterises the posterior:

- **Location**: below we will see that its borders $HDI_{min}$, $HDI_{max}$ <!-- medium: HDImin, HDIma --> may be used in then decision criteria when compared to the ROPE boundaries.
- **Width**: $\omega_{HDI} = HDI_{max} - HDI_{min}$ <!-- medium: *ω*HDI = HDImax - HDImin --> may be used as in stopping criterea

### Accounting for the Minimal Effect Size with the ROPE

The *Region of Practical Equivalence* (ROPE) is the range of parameter values that are “similar enough” to null hypothesis $\theta_{null}$ <!-- medium: *θ*null --> such that if the true value is within this area, it is effectively the same as the null hypothesis. In other words if the true value is within the ROPE decision regarding the null would still apply to values within the ROPE.

By doing so it ensures the effect size is accounted for in stop and decision criteria.

-

- Width depends on task: wider is less conservative (less expensive)

-

### Rejecting/Accepting the Null Hypothesis

The HDI+ROPE as a Decision Criterion accounts for minimum effect size by addressing the question: *“Is the **HDI** completely **inside** or **outside** the **ROPE**?”*

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/03-hdi-rope-scenarios.png" alt="Two of six HDI+ROPE scenarios" width="700">
</div>

*Demonstrating 2 of 6 scenarios. The lines are posteriors where the vertical lines in each are the HDI borders. The gray boxes are the ROPEs around the null hypothesis value. In the left the HDI is outside the ROPE so the null hypothesis is rejected. In the right the HDI is completely within the ROPE so the null hypothesis is accepted*

A common misconception is what is being accepted/rejected. The statement of accepting or rejecting refers to the null hypothesis value and doesn't say anything about the sample value.

In other words:

> The HDI+ROPE Decision method accepts/rejects the null value not the sample value.

This decision mechanism is triggered after we've collected enough data. How do we know when to stop?

### 🤥 The Problem with Coupling Stopping with Decision Criteria

One algorithm called the HDI+ROPE simply couples its decision criterion we've just discussed with the stopping one. In practice that means that the algorithm stops collecting data when the prior HDI is fully within or outside the ROPE, and then make the decision.

Even though this coupling of criteria may seem intuitive it makes HDI+ROPE sensitive to outlier examples and hence prone to errors such as false null acceptance rates (more commonly known as *false positive rates*; further on we will refer o as ***false acceptance***) or false null rejections rates (known as *false negative rates*; we will call ***false rejection***).

To demonstrate false acceptance, we turn to examine a coin toss experiment which simulates single-group binomial settings (e.g, TKA example). For simplicity we assume a fair coin, i.e where the null hypothesis happens to be equal to the true value (which the researcher isn't supposed to actually know) of $prob(heads) = \theta = 0.5$ <!-- medium: prob(heads)=theta=0.5 -->.

We'll focus on a sequence which I randomly generated but hand-selected due to it being illustrative to demonstrate different outcomes of HDI+ROPE with Precision Goal based methods which we will later describe.

This sequence is of length 1,500, but we will make our point below under 1,000 iterations of stopping and deciding where 1's are heads and 0's are tails:

```
101101000110010000101111111110010101101110001111110010100110111111110111001111001110011110001010001011110101111110001111111111100000101001001100000001101000100010000000010010111001110100111000010010110011010000101011110011111111011100101011011100100101010011110101001111011100101110010011001010010001001011010101010100111100110011011011101110010100010110011001100101111001111101110101010001101110111100010110101010101010111100001000111011001010101100100110010001101101111100111000010011001000001010110010101101000001100101000110101110010101101000100110100100100110110100101011100001101000111111001001111100100011100011000101001010101110010000110111101111011100111011010010001001001111011100100000100011100000010010111111011110101000110110010001100101011110000001001101111100000001010011001001110001010100000101111100101110011011010111001000011110010011111110011111111100111011010000101110110001100111001000010011101100111000110010100000001101110000110011100111011100101001101010011001010100011000000011001100101100101000001101100111000000101010000110100100111110101101110010000100011101011011001110011100111011101010100101100001101100010111010010101000011000100111111010010111001100001001000110111011001011100100001001011111010011111101111001010000110011010101111001011110100001000100000010000011001110100110100100101000001100110111011011111010100111101111101010001010110010001000110111000101000010001011000100001101111011000000111010011000101001011110111101111010011101010111001111010101111011000110
```

We will follow the process of sequential hypothesis testing where we will set a lower sample size of $N_{min} = 30$ <!-- medium: N_min=30 --> (as per most textbook recommendations) and then peek with every new data point. Before starting however, we must determine the desired effect size. We'll set is as 0.05 on each side of the null, i.e, $ROPE_{min} = 0.45$, $ROPE_{max} = 0.55$ yielding a $\Delta_{ROPE} = ROPE_{max} - ROPE_{min} = 0.10$ <!-- medium: ROPE_min=0.45, ROPE_max=0.55 yielding a **ΔROPE**=ROPEmax — ROPEmin=0.10 -->.

- At N=30 (101101000110010000101111111110): 17/30 heads/total, HDI_min=, HDI_max

A visual is useful in this sense.

[insert visual]

flip another coin wand we get

- At N=31: 17/31 heads/total, HDI_min=, HD_max=

…

We continue flipping and examining until we get to iteration 126 where we finally get a decisive decision

- At N= 126: 80/126: HDI_min=, HDI_max=

In the next visual we see that the posterior HDI is fully outside the ROPE.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/04-coupling-problem.png" alt="HDI fully outside the ROPE at iteration 126" width="700">
</div>

For this reason the algorithm does two things (1) It stops collecting data (2) It incorrectly rejects the null hypothesis 🤥. How common is this?

Since we are using a 95% HDI common sense would think the false rejection rate would be 5%. I found with 5,000 simulations the rate to be 6.2%. This false acceptance rate varies with the choice of relationship of $ROPE_{min}$, $ROPE_{max}$ in relation to the true parameter value. E.g, if the truth is closer to a ROPE boundary the false acceptance rate could be as a high as [TK] … (See preprint for examples in the “General Trends” section).

This decision error at sample 126 shows the key flaw in HDI+ROPE (which is similar for p-value and Bayes Factors): algorithms that couple the stopping and decision criterion are sensitive to outliers.

The Precision is a Goal paradigm addresses this issue by decoupling the decision and stopping criteria.

## 🛑️ Stopping Criterion: Precision is the Goal

The Precision is the Goal method decouples the stopping criterion from the decision one by introducing a new variable which describes the target posterior goal, otherwise called the precision goal $\omega_{Goal}$ <!-- medium: ***ω***Goal -->. The objective then is to collect data until the posterior width is smaller than this predetermined precision goal, or: $\omega_{HDI} \le \omega_{Goal}$ <!-- medium: ***ω***HDI≤***ω***Goal -->.

Just as the ROPE values depend on the domain, so does $\omega_{Goal}$, but it should be smaller or equal to the ROPE width $\Delta_{ROPE} = ROPE_{max} - ROPE_{min}$ <!-- medium: **ΔROPE=ROPEmax — ROPEmin** -->.

> $\omega_{Goal} \le \Delta_{ROPE}$ <!-- medium: ***ω*Goal**≤**ΔROPE** -->

In our working example, e.g, we will set $\omega_{Goal}$ to be 80% of the ROPE width $\omega_{Goal} = 0.08$ <!-- medium: ***ω***Goal=0.08 -->.

In the example above in iteration 126 we see that precision goal has not been met. The posterior HDI width $\omega_{HDI} = 0.167$ is double that of $\omega_{Goal} = 0.08$ <!-- medium: ***ω***HDI=0.167 is double that of ***ω***Goal=0.08 -->.

### Precision is the Goal Algorithm: Stop Then Decide

The PitG algorithm will continue to collect data until the precision goal is met. After that it applies the same HDI+ROPE decision mechanism.

Let's reexamine the cartoonish version of the posterior and the ROPE.

Whereas for HDI+ROPE there were 6 scenarios, the introduction of the $\omega_{Goal}$ parameters means there are now 11, here we show two:

[TK add graph and explanation]

In the working fair coin example PitG triggers the stop criterion at iteration 598 as shown here where $\omega_{HDI} = \omega_{Goal} = 0.08$ <!-- medium: ***ω***HDI=***ω***Goal=0.08 -->:

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/05-pitg-algorithm.png" alt="PitG stop criterion triggered at iteration 598" width="700">
</div>

In John's 1,000 simulation as well as the 5,000 simulations I've tested the PitG never reject the null hypothesis. In other words the simulations are highly suggestive of zero false acceptance rate in the fair coin case. (I'm sure there is a mathematical proof for this case, and perhaps more in general when the null hypothesis is true, but I haven't derived it. The simulations, though, are highly suggestive.)

The hawk eyed might notice a problem with this last posterior. Given its $HDI_{min}$ = and $HDI_{max}$ it is actually straddling the ROPE. Since the algorithm is instructed to stop collecting and make a decision — what is the result?

### The Third Decision Option: Inconclusive

The HDI is neither fully inside nor outside the ROPE. This means that the Decision algorithm yields not only `Accept` ✅ and `Reject` ⛔️ outcomes but a third `Inconclusive` 🤷‍♀.

There are two practical things one can do:

- **Risk assessment** — a human-in-the-loop, or an algorithm would assess the need to collect more and decide based on the posterior. We'll defer from this as this can vary be domain (but it is addressed in the preprint and in the calculator)
- Collect more data — this is the subject of the next variant.

But before presenting the variant, we need to address the question, how prevalent is this inconclusive outcome? For our settings, based on the 5,000 simulations I've calculated this to be a whopping 62% of the time!

<!-- Medium had an empty heading here, before the next section. Removed because
     an empty `###` renders as literal text. Add a title back if one was intended. -->

### Decisive Precision is the Goal: Stop Decisively

In this new variant, which I call Decisive Precision is the Goal (DPitG) we reconfigure the two-step process of Stop-then-Decide to Stop Decisively. What that means is that if PitG yields an inconclusive outcome we continue collecting data until it is conclusive.

[TK: if we don't do the same cartoon for PitG we need to introduce the yellow box …]

DPitG still has the same 11 scenarios of PitG (is that correct?), but the decisions are different for the straddlers: if the HDI straddles the ROPE we continue to collect more data, otherwise if the HDI is completely inside (or outside) the ROPE we can decisively to accept (reject). The following demonstrates two of these scenarios, where in both the precision goal has been met (HDI lines well inside the yellow dashed line box). In the left panel the posterior is a straddler and hence it should keep collecting data. In the right panel the HDI is completely within the ROPE and hence we can conclusively accept the null hypothesis.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/06-dpitg-scenarios.png" alt="Two DPitG scenarios" width="700">
</div>

Turning back to our fair coin sequence we collect 206 more data points (i.e, 34% more than the 598 when the precision goal was met) and stop at iteration 804 when the HDI is completely within the ROPE as shown here:

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/07-dpitg-stop.png" alt="DPitG stops at iteration 804" width="700">
</div>

### Much More Conclusive and Not Much More Expensive

We turn to the outcome of 5,000 sequences tested to address the expected conclusiveness rates and how much additional data going from PitG to DPitG.

One key parameter that should be mentioned at this stage is $N_{max}$ <!-- medium: N_max --> which represents the researcher's ultimate budget. If the stopping criteria isn't triggered by this stage for DPitG (and HDI+ROPE algorithm) we call this an inconclusive outcome and need to defer to a risk assessment of how to decide.

We mentioned that the inconclusiveness rate of PitG for these simulations was at 62.1%. For PitG this is reduced substantially to only 2.2%. That means that just two percent of the sequences tested reached $N_{max}$ where the posterior HDI was still straddling the ROPE.

But how much is this costing?

To first address this we must know the expected iteration stop of PitG. All of them stopped either at iteration 598 or 599. Below we show how this insight may be beneficial for both prospective and sequential planning.

It turns out that the hand-picked example 34% additional cost (stopping at iteration 804) is not representative on the high side. The median stop was at 627 which is just under 5% more data. The interquartile range was between 598–794. Actually we know that PitG had a conclusive rate of 37.9%, meaning that 37.9% of the DPitG stops were at the same 598–599 cutoffs and extra budget was required for the remaining 62.1% with the said median of 5% and top 75th percentile at 32.7% more (794/598).

## Three Algorithm Comparison

The following table examines the three different algorithms analysed here.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/08-three-algorithm-comparison.png" alt="Comparison table of the three algorithms" width="750">
</div>

The main takeaway is that the DPitG method is a hybrid of PitG and HDI+ROPE. DPitG acts as PitG in terms of the precision goal criterion, and once that's met it acts as HDI+ROPE conclusiveness criterion.

This manifests in decision statistics displayed in the next plot.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/09-three-algorithm-rates.png" alt="Decision statistics for the three algorithms" width="750">
</div>

(Note that we do not compare here with p-values and Bayes Factors due to their different decision making heuristic, but address below in and Appendix)

HDI+ROPE disregards posterior precision and is location based only (i.e, where the posterior is relative to the ROPE). Similar to p-value and Bayes Factors (not shown here) its stopping and decision criteria are coupled. This may result in false positives due to non representative samples especially if the true parameter value is in the ROPE or nearby outside of it.

PitG decouples them in a two step process. First precision for stopping and then location for deciding. On the one hand this substantially reduces the false acceptence rate (when null within the ROPE) and false rejection rates (when null nearby outside of the ROPE). On the other it can yield a lot of inclusiveness when the null hypothesis is within the ROPE.

DPitG is PitG but if inconclusive will continue to collect data until conclusive. This maintains the low false acceptence/rejection rates while resulting in high conclusiveness rates.

## A Useful Close Form Planning Formula

The fact that PitG triggers at effectively one iteration is not surprising. Assuming, for simplicity, an underlying *aleatoric uncertainty* (or *irreducible error*; i.e, variance that will not improve by collecting more data) the following formula describes how much data is required to obtain a posterior HDI width equal $\omega_{Goal}$ <!-- medium: wGoal -->:

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/10-planning-formula.png" alt="Closed form planning formula" width="700">
</div>

where

- *V* is aleatoric uncertainty (irreducible error)
- $z^{\*}$ <!-- medium: z* --> is the critical value (e.g, for the credibility level of 95% one uses $z^{\*} = 1.96$ <!-- medium: z*=1.96 -->)

The aleatoric uncertainty *V* depends on the data itself. An illustrative example is that of the coin toss (single-group binomial) where $V(\theta) = \theta(\theta-1)$ <!-- medium: *V*(*θ*)=*θ*(*θ*-1) -->. For varying $\omega_{Goal}$ we show the expect values here:

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/11-planning-formula-validation.png" alt="Expected sample size for varying precision goals" width="700">
</div>

From here we clearly see that:

- Increased precision (reduced $\omega_{Goal}$) requires more data
- The fair coin case has the highest variance and hence requires the most data.

This is where Sequential Hypothesis Testing shines. If you assume a null hypothesis of a fair coin but the actual is loaded at high signal, say 0.8, one can collect substantially less data to make a reliable decision.

The discussion in this section so far discusses when one should stop for PitG. Recall, however, that PitG is highly inconclusive at its stop point and DPitG ameliorates for this by collecting until conclusive.

TK: Mention that for DPitG $N_{Goal}$ serves as a minimum bound (assuming the correct uncertainty.

See Appendix for other data types: single-group continuous and between group binomial/continuous.

## Further Tests

Other topics discussed in the preprint in detail which I will just provide executive summaries here

- Sensitivity testing of $\omega_{Goal}$ <!-- medium: Wgoal --> — highly impact the stopping.
- Generalising to loaded coins
- $N_{Goal}$ <!-- medium: N_goal --> varies by the true value

### Sensitivity testing of $\omega_{Goal}$

tbd

### Generalising to loaded coins

tbd

## When is DPitG Most Useful?

### When Data is Relatively Cheap

DPitG is most suitable when **at least** $N_{Goal}$ is within budget.

This means it is suitable for

- large-scale digital A/B testing
- opinion polling
- automated quality-control pipelines

### Epistemic Honesty for those on a Budget

When is $N_{Goal}$ is beyond the budget is makes explicit

- what precision is achievable
- what conclusions the data can and cannot support
- both **prospectively** (before collection begins) and **retrospectively** (to audit the precision of a completed study)

This is most suitable for:

- longitudinal studies
- clinical trials
- expensive policy evaluations

## Summary

- The Precision is the Goal method accounts for effect size and being Bayesian enables accepting/rejection of the null hypothesis
- DPitG maintains PitG **low error rate** but more **reliable** as **highly conclusive** at **moderate increase in sample size**
- We emphasised here single-group binomial data (coin tosses), but it generalises to **binary/continuous** data as well as **single/between-group**
- For analytic distributions the precision method may be quantified in closed-form formula for **prospective** planning/**retrospective** analysis.

In a companion blog post we capitalise on this last point and facilitate adoption with an online calculator.

### Other Data Types

Here we demonstrated using coin tosses which simulate the case of single-group binomial data … tbd

## Appendix: Original Precision is the Goal Video

<div style="text-align:center">
    <iframe width="640" height="480" src="https://www.youtube.com/embed/lh5btlAvrLs" title="Precision is the Goal" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

[**Precision and Decisiveness as Goals: Reliable Sequential Hypothesis Testing with a Dual Stopping…**](https://arxiv.org/abs/2608.05301){:target="_blank"}
*Sequential hypothesis testing offers flexibility over fixed-sample designs, but stopping rules coupled to decision…* — arxiv.org

[![arXiv](https://img.shields.io/badge/arXiv-2608.05301-b31b1b?logo=arxiv&logoColor=white)](https://arxiv.org/abs/2608.05301){:target="_blank"}  [![PDF](https://img.shields.io/badge/PDF-arXiv-b31b1b?logo=adobeacrobatreader&logoColor=white)](https://arxiv.org/pdf/2608.05301){:target="_blank"}

<!-- ==========================================================================
     SCRATCH AREA — carried over verbatim from the end of the Medium export.
     On Medium this sat below the appendix as drafting notes rather than
     finished flow, so it is commented out here to keep it out of the rendered
     page without losing it. Uncomment or delete as you work through it.

Appendix: NHST and Bayes Factor

— — — -

(Also mention above that Precisioin is the Goal is focused on Sequential Hypothesis testing, but thanks to a closed formed formula it may be used also Prospective calculations.)

— — — — -

For data practitioners it is well known that one of the key parameters is the expected effect size: the larger the effect, the less data is required to see a clear signal.

And vice versa: the smaller the effect the more data required.

One methodological problem however, is that at the analysis phase many analysts and scientists disregard the said input effect size. This is where p-hacking and even HARKing (hypothesizing after the results are known) starts. Given pressure to publish in academia, and to "report something" in the private sector, this leads to what is known as the replication crisis in which unreliable results are considered trust worthy and incorrect, and potentially costly, decisions are more likley to be made.

Another limitation of the very popular Null Hypothesis Significance Testing methods (NHST i.e, frequentist methods using p-values) is that it can either reject the null hypothesis or awkwardly "not reject". Those who understand what p-values are versed uncomfortable phrasing of the conclusion of a result and get frustated when their colleagues over simplify a borderline result which has p=0.03 as a result.

It is known that Bayesian methods may be used to accept the null hypothesis.

It turns out that the null hypothesis may be accepted with a zero false positive rate, i.e, without rejecting the null hypothesis incorrectly. This is not possible with the popular Bayes Factor, but using a method that has been overlooked this past decade.

Burried in Kruskce's Doinng Bayesian Analysis is a method he devised called PRecision is the Goal. …s

Sequential Hypothesis Testing offers flexibility over fixed-sample designs but often risks confirmation bias due to "early peeking" on unrepresentative samples 👀. In this post, I discuss the limitations of the common Power Analysis method (and the frequentist approach in general)

I propose a refined framework: Decisive Precision is the Goal (DPitG).

Frequentist Null Hypothesis Significance Testing (NHST) is limited to only rejecting the null hypothesis. Bayesian methods, however, allow us to positively accept the null, which is particularly valuable whenever proving "no meaningful change" is just as critical as discovering a new effect. This is essential for, e.g:

     ========================================================================== -->
