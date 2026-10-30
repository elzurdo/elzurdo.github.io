---
layout: post
title: "🛑️⚖️ Don't Stop 'til You Get Enough — Reintroducing the “Precision is the Goal” Stopping Criterion"
---

<!-- Notes:
* analysts don't always know what they want at first
* N is never enough .... -->

<!-- ===========================================================================
     SCAFFOLD ONLY — every heading below carries one bracketed line of intent
     and no prose. The prose is yours. Full reasoning behind this structure:
     agentdocs/dpitg-post-outline.md

     TARGET READER: someone running A/B tests or hypothesis tests who does not
     fully understand the stopping rule they are already using. They peek
     at a dashboard, stop when it goes green, and have never articulated that
     this is a stopping rule with a failure mode.

     SECOND AUDIENCE: readers already fluent in Bayesian testing. The ⚔️ block
     after the summary is sized for them. The spine never slows for them.

     FINISHED-DRAFT CHECKPOINT: could the target reader write Dirk Nachbar's
     200-word summary (_from_medium/dont-stop-til-you-get-enough/nachbar_post.md)
     after reading this?

     HERO: PitG. DPitG is a short final act, not a co-hero.
     EMOJI LOCK: the five bullets in the reader contract use 🏀 ⚖️ 🛑 ✅ 🧮, and each reappears
     as the heading of the section that delivers that promise. Change one, change both.
     
     ANALOGIES: 🏀 free throws answer the question (early). 🗳️ election dramatises
     the failure (later). Fair coin is the worked numeric example from "What a
     Posterior Is" onwards. 
     LENGTH TARGET: spine ~2,000–2,400 words when excluding the footnotes. Everything heavy goes to ⚔️.

     Each LaTeX expression carries its unicode twin in an adjacent
     <!- - medium: … - -> comment, for regenerating the Medium version.
     =========================================================================== -->

<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="zurdo" data-description="Support me on Buy me a coffee!" data-message="Buy me a slice of pizza! 🍕" data-color="#40DCA5" data-position="Right" data-x_margin="18" data-y_margin="18"></script>

<!-- OPENER, 6 SLOTS. Order taken from all ten Medium pieces, which are consistent:
     title → subtitle → epigraph → context → motivating question → contract.
     The question is never first; it always follows a beat of context. -->

<!-- SLOT 2 of 6 — SUBTITLE. -->

<!-- #### [SUBTITLE — one line promising a gain, not a summary. What will they be able to *do*? Decide when to stop collecting, and be able to say "no difference" out loud. It has to counterweight the Kruschke epigraph below, which is a negative claim about NHST; if both pull the same way the piece reads as an anti-frequentist polemic it never delivers.] -->

#### Know when you have enough data, and when a null result is a real finding. Interactive calculator provided. 🧮

<!-- Your TK: "no difference" could be misparsed as "no difference in enough data", because the
     two "when" clauses look parallel. "A null result" can't be read that way, and it covers the
     single-group case too (the worked example is coin tosses, so "tie"/"two options" would narrow
     it wrongly). It also avoids reusing bullet 4's exact wording. Alternatives if you prefer:
       · …and when it's safe to conclude there is no meaningful effect.
       · …and when "no change" is a finding rather than a failure.

     PARKED QUOTES, for use lower down (you said you're moving both):
       · Gelman, "N is never enough" — fits the ⚔️ planning-formula or the epistemic-honesty beat
         in "When This Is Worth Using".
       · Kruschke, "With infinite patience, NHST results in 100% false alarms" — belongs at 🗳️,
         where the simulation gives it the context it needs. ⚠️ source still unverified. -->


<!-- FIGURE D (suggested, lead image): one sequence, three stops.
     A single iteration axis 1→1000 with three markers — 126 (HDI+ROPE, ⛔ wrong),
     598 (PitG, 🤷 inconclusive), 804 (DPitG, ✅ accept). The whole argument in one
     picture. If you build only one new figure, this or Figure A. -->

<!-- SLOT 3 of 6 — EPIGRAPH. Never preceded by prose; it sits directly under the subtitle.
     4 of your 10 Medium pieces carry one (Pearl ×2, Shannon, F. Gump).

     This is the 1943 objection that created sequential analysis. Captain Garret L. Schuyler of the
     US Navy's Bureau of Ordnance was testing anti-aircraft fire; W. Allen Wallis was proposing a
     fixed-sample design. Schuyler's objection went to Wallis and Milton Friedman, who could not
     solve it and passed it to Abraham Wald, who produced the Sequential Probability Ratio Test.

     Why this one rather than Kruschke's "100% false alarms": it needs no statistical context to
     land, it is the post's exact subject stated by a practitioner rather than a statistician, and
     it is positive — a reason to want to stop early, not an attack on NHST — so it pulls with the
     subtitle instead of against it.

     Source: Milton & Rose Friedman, "Two Lucky People" (1998), quoting Wallis's account. Verified
     via https://python.quantecon.org/wald_friedman.html — worth a second check against the book
     before publishing. The "[rounds]" bracket is in the original. -->

<!-- > *"He would see after the first few thousand or even few hundred [rounds] that the experiment need not be completed, either because the new method is obviously inferior or because it is obviously superior beyond what was hoped for."*
> — W. Allen Wallis, recalling Captain Garret L. Schuyler's objection, 1943 -->


### What I'm Talking About When I Talk About Accepting the Null

TK: where would be best to place this?

[Three bullets, one line each — replaces the three `[some details tbd]` stubs in the old draft:]

💊 [bioequivalence trials for generic drugs]

💻 [do-no-harm regression testing in software deployment]

📋 [futility stopping in programme evaluations]

[Then the frequentist limitation in ONE sentence: NHST can only reject, or awkwardly "not reject".
The formal treatment is fenced to ⚔️ — do not argue it here.]


<!-- SLOT 4 of 6 — THE TWO QUESTIONS. Carried up from the old draft, where they opened the piece.
     They are the post's two uses: the prospective one is the planning tool and the companion
     calculator, the retrospective one is the stopping rule. Keeping both makes the structure
     visible from the first screen. Nachbar's cost framing is folded into the second question.

     NOTE: these two sentences now come BEFORE the context paragraph, inverting the corpus pattern
     (Shannon's story before "How can we quantify communication?"). Deliberate: Shannon needed
     setup, this question doesn't, and the Power Analysis beat works better as the answer to the
     question than as a preamble to it. -->

> “How much data is required?”

This is one of the most common questions in hypothesis and A/B testing, and it may be asked at different moments. Before any data is collected, it is a planning question. 

<!-- SLOT 5 of 6 — POWER ANALYSIS, as the bridge into the contract. Names the standard answer
     without attacking it; the critique is held back for the 🗳️ section. -->

The standard answer is a *Power Analysis* calculation: supply a minimum effect size and how often you are willing to be wrong in each direction, and out comes a sample size. It is a sensible place to start. But what if the true effect is much stronger than you assumed, and you could have stopped weeks earlier? Or reduced harm, e.g, by clinic cutting short a trial once a treatment shows signs of doing damage?

A more flexible option is checking as the data arrives is called *sequential hypothesis testing*, often shortened to sequential testing. This method addresses the question:

> “Have we collected enough data yet?”

As tempting as sequential hypothesis testing is it also has a well known failure mode. Peek often enough and sooner or later an early, unrepresentative sample meets the stopping rule. In most standard methods that same rule is also what decides the verdict, so the call gets made on exactly the sample that should not have been trusted. This is one route to confirmation bias. The reason it happens is well understood, and it can be corrected for.

That correction is the focus of this post: a rule that tells you when you can confidently stop an experiment already under way. In a companion post we'll show that the same machinery works before a study starts, for planning how much data to collect in the first place.

An interesting consequence of this correction is that one can complete an experiment with fairly low false positive/negative rates. In particular we'll see that if the null hypothesis happens to be true, one can accept it with near zero false rejections.

<!-- SLOT 6 of 6 — READER CONTRACT. -->

This post is targeted at anyone who runs experiments and has to decide when to stop them: A/B testers, analysts, data scientists, researchers, and anyone who has ever stared at a dashboard wondering whether today is the day to call it.

No prior knowledge of Bayesian statistics is required, just a basic understanding of probabilities. If you have a rough idea of what a p-value is, you already know more than enough. (If you don't, that's fine too — and it may save you some unlearning.)

<!-- At the final stage of revisions readdress the itemising to make sure still sensible

     KNOWN ISSUE for that pass — bullet 5 (🧮) contradicts the opener.
     The calculator is one app with two uses: this post is the RETROSPECTIVE / sequential use
     (plug in summary stats, get a verdict on an experiment already under way); the companion post
     is the PROSPECTIVE use (plan how much data to collect before starting).
     SLOT 5 now says "In a companion post we'll show that the same machinery works before a study
     starts, for planning how much data to collect in the first place" — but bullet 5 promises
     exactly that as a takeaway of THIS post. One of the two has to move.
     Suggested reword, keeping 🧮 here and the prospective promise in the companion:
       · 🧮 **Check an experiment you've already run** by plugging in its summary statistics, and
         see whether the data supports a verdict at all.
     The closed-form formula still appears here in ⚔️; the companion does the applied planning. -->


By the end you will be able to:

- 🏀 **Read a posterior**: the two things it tells you, where your estimate sits and how uncertain it still is.
- ⚖️ **Quantify what counts as "close enough"** (the ROPE), and hold to it, rather than letting the effect size you planned around be quietly forgotten between the planning meeting and the write-up.
- 🛑 **Stop on precision rather than on the verdict**, using John Kruschke's *Precision is the Goal*. That one change removes a bias you probably didn't know you had.
- ✅ **Accept the null hypothesis**, instead of awkwardly failing to reject it. This matters whenever "no meaningful difference" is the finding you actually need.
- 🧮 **Estimate how much data you'll need** before collecting any of it, from a closed-form formula.

If you are already comfortable with posteriors, HDIs and ROPEs, the main thread will feel slow in places. The ⚔️ supplementary sections after the summary are where the detail lives.

## How Experiments Actually End

How did your last experiment actually end?

In large-scale A/B testing results are watched, and they get stopped once a *heuristic*,
such as a p-value, confidence interval or Bayes Factor, passed a predetermined threshold. 

<!-- CITE: Johari, Koomen, Pekelis & Walsh (2022), "Always Valid Inference: Continuous
     Monitoring of A/B Tests", Operations Research. In references.bib as `johari2022`.

     WHY IT JUSTIFIES THE CLAIM (for your reference): the paper's own framing is that
     "A/B tests are typically analyzed via frequentist p-values and confidence intervals,
     but these inferences are wholly unreliable if users endogenously choose sample sizes
     by continuously monitoring their tests." Two things we need are in that sentence:
     (a) continuous monitoring is the normal practice in industry A/B testing, not an
     abuse — it is the premise the authors build a method for; (b) choosing the sample
     size by watching is what breaks the inference. So you are reporting documented
     practice rather than claiming personal experience, which was the concern.
     Their fix (always-valid inference) is a frequentist cousin of the decoupling this
     post argues for — worth one line in ⚔️ or the resources ladder. -->

Scientific research mostly runs the other way round. The sample size is fixed in advance, usually by a power analysis, and the study runs to the end. Its characteristic failure arrives later, once the data is in: the minimum effect size that went into the planning calculation appears nowhere in the heuristics that are reported, so it quietly drops out of the conclusion. That second failure is the subject of the companion post. This one is about the first: continuous monitoring.

<!-- CITE: Wasserstein & Lazar (2016), "The ASA Statement on p-Values: Context, Process,
     and Purpose", The American Statistician 70(2):129–133. In references.bib as
     `wasserstein2016`.

     WHY IT JUSTIFIES THE CLAIM (for your reference): this is the American Statistical
     Association's official position, which is why it carries institutional weight rather
     than being one methodologist's opinion. Its Principle 5 states that a p-value does
     not measure the size of an effect or the importance of a result. That is exactly the
     claim being made here — the planned effect size cannot survive into a conclusion
     reported as a p-value, because the p-value does not carry that information. You are
     citing the statistic's acknowledged limits, not accusing researchers of anything.

     HEDGE YOU MAY WANT: "research mostly preplans" is true as a norm but not universal.
     Simmons, Nelson & Simonsohn (2011), `simmons2011`, showed that a researcher starting
     with 10 observations per condition and testing after every new observation finds a
     "significant" effect 22% of the time when nothing is there. So researchers peek too.
     Left out of the body deliberately, because naming it blurs the two-failure split you
     asked for — but it is the honest qualifier if you want one, and it is a strong number. -->

<!-- Both of those are stopping rules. The researcher's sample size was chosen in advance; the A/B one was made on the fly. -->

### One Heuristic, Two Jobs

The most popular heuristic by far is the *p-value* in the 
*Null Hypothesis Significance Testing* framework (*NHST*). 
Briefly, the p-value quantifies how surprising the data would be if the null hypothesis were true. 

As a stopping rule in sequential hypothesis testing it means continuously examining the data p-value while data is being collected
until it falls below an agreed threshold, usually 0.05, sometimes stricter. This coincides with the *decision rule*:
if the p-value went under the threshold one can reject the null hypothesis. 
[TKA: this should be a footnote] Other heuristics like Bayes Factors have different interpretations and thersholds, but the stopping mechanisms is quite similar.

In other words the heuristic that signals when to stop collecting data is the same one
that delivers the verdict.
The experimenter stops because the result has turned *statistically significant*
and many unwittingly will conclude that it is also *meaningful*. 

[TK: add here example of drug tried on males and females]


### Statistically Significant Does Not Imply Meaningful

A popular misconception is confusing statistical significance with a meaningful outcome.

Think of a researcher asking whether a therapeutic works differently for men and women, and finds it beneficial in 72.1% of one group and 72.3% of the other. They collect enough patients and that 0.2 percentage points will be considered statistically significant,
say in terms of a p-value or Bayes Factor.
In practice, however, no clinician is going to prescribe differently on it.

They key takeaway is that the deviation from a null hypothesis should be large enough to
justify to act on it, e.g, by making a decision to change the status-quo.

To further understand why statistically significant does not necessarily mean a meaningful result we next turn to the simplest
sequential hypothesis test in which the NHST framework fails: a fair coin toss.


### NHST Catastrophically Fails the Fair Coin Test

The beauty of tossing a virtual fair coin multipel times is that we know the ground truth
and hence is a useful testbed for sequential hypothesis testing mechanisms.

In the case of the a true fair coin the null hypothesis (of it being a fair coin) should be accepted,
wherease that of a true loaded coin should rejected.

The first problem of the NHST mechanism is that in the case of a fair coin
the p-value does not contain acceptence
information and hence one can only awkwardly use a double-negative and "not reject"
the null hypothesis. We will later discuss Bayesian mechanisms that will be able to
accept the null hypothesis.

Even if we accept NHST as useful to be limited to rejecting the null hypothesis 
(or not rejectiong = being inconclusive), it completely fails in the fair coin sequential hypothesis testing.

To visualise this we've generated M=200 binomial sequences (of values 0, 1) of length N=30,000.
At each iteration n≥30 we peek at the data.

If p<0.5

* The stopping criterai is triggered and we stop collecting data
* The decision algorithm rejects the null hypothesis (incorrectly)

If p≥0.05 we do not reject the null hypothesis (which may be considered "inconclusive")
and move on to the next iteration.

How often do we expect to incorrectly reject the null hypothesis?
One would naïvely assume only 5% of the time as per the threshold.
Whereas this may be correct at one peaking point, in the sequential context this error compounds.

The following graph shows the cummulative decision rates 
as a function of iteration n.  Reject rates are in red or not reject in gray, their sum is 100% at each iteration.
(Note that when a sequence is rejected at a given iteration, e.g, n=100, that same rejection
is propagated to all subsequent iterations of that sequence, e.g n≥100, since we have stopped the experiment.)

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/02-pvalue-decision-rates.png" alt="Sequential hypothesis decision rates for fair coins using p-values" width="700">
</div>

*Sequential hypothesis decision rates for fair coins using p-values for stopping and deciding.* Python code to recreated this may be found here (TBD).

The figure clearly shows the the incorrect rection rate grows as a function of the iteration.

John Kruschke, author of *Doing Bayesian Data Analysis*, first demonstrated this limitation of p-value as 
a stopping in the fair coin case and quipped:

> *"With infinite patience, NHST results in 100% false alarms."*

The problem is that with more data the likelihood distribution (upon which the p-value is calculated)
is narrower and any slight shift from the null value results in a stronger (i.e, lower) p-value,
and hence is considered more "statistically significant", even though there is no meaningful difference
between the likelihood distribution and the null value.

One step to correct for this is using a Bayesian mechism with which one can accept the null hypothesis.
Bayes Factor is such a mechanism, but it turns out that is not sufficient since it runs
into similar confirmation bias problem. In his analysis
John quantified that in the fair coin case it can result in 20% false rejects. 
He also extend to testing loaded coins showing it incorrectly accepting the null
hypothesis 40% of the time.

The root issue is that both these mechanisms use the deciding heuristic as the stopping
criteria.

<!-- , but as we shall see it is not sufficient for the fair coin test. -->
<!-- 
### Bayes Factor Also Fails Coin Tests

[TK: briefly describe Bayes Factor]

[TK: add snapshot of Figure 13.6 from Krukche's book]

TL;DR

Bayes Factor
* Has a 20% FPR in the fair coin case
* Has a 40% FNR in the loaded coin case (of thetatrue =0.65, thetanull =0.5)

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/pvalue-bayesfactor-decision_rates_fair.png" alt="Sequential hypothesis decision rates for fair coins using p-values" width="700">
</div>


<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/pvalue-bayesfactor-decision_rates_loaded.png" alt="Sequential hypothesis decision rates for fair coins using p-values" width="700">
</div> -->


### 🛑 Gotta Keep 'em Separated ⚖️

Whereas it is tempting to apply the decision rule as the stopping rule, it is the source
of cofirmation bias. Given enough looks, a statistical fluke will eventually happen and
the decision/stopping line may be crossed, whether or not it is meaningful.

The soltion is that stopping criterion should be based on a different heuristic than the decision one.
John Kruskche's method puts the posterior width (i.e, the uncertainty in the parameter value) as the stopping critera
regardless of the decision criteria. 

As we shall see:

* The stopping criteria is a function of how un/certain we are about the parameter - regardless of its locaiton relative to the null
* The decision criteria depends both on the relative location of the parameter value relative to the null and a predetermined effect size.

To appreciate these we first need to understand two key properties of a probability posterior:
quantifying its location and its width.


## 🏀 HDI as a Posterior Width and Location Heuristic


The posterior distribution contains the information of what is known about a variable value given the data. 

In the context of a stopping criteria its useful to consider two properties:

* Width: a measure of un/certainty. If its too wide, we might not have collected enough data.
* Location: we can relate this to the null hypothesis: does is it in the vicinity of the null hypothesis?

As a running example let's consider the free throw success rate of Shaquille O'Neal,
a former professsional basketball player who dominated play close to the basket but
was a poor shooter from the line. This is a useful analogy for any experiment that uses
binomial data, i.e, that is testing the result similar to a flip of coin (fair or loaded).

In the figure below we display his the posterior probability distribution functions (PDF)
based on freethrow success rates in the 2004/5 season of 67 games (left panel) and full career
of 1,207 games (right panel).

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/oneal_freethrows.png" alt="Two PDFs: left wide, right narrow" width="700">
</div>


The posterior means the probability that the true value of the variable given the data
p(theta|data).
The shaded areas convey the *credible interval* of the posteriors. Think of it as the Bayesian
parralel of he frequentist confidence interval. The credible interval flags the region
where most of the mass resides. For the purpose of this post we'll use 95% of the mass. The heuristic
of choice is called the *High Density Interval* (HDI) which calculates where 95% of the mass
is inside is larger than the 5% outside of it. See dedicated section below for a formal definition.

Once the 95% HDI is defined we can use its boundaries $\rm HDI_{min}$ and $\rm HDI_{max}$
to define its location vicinity as well as its width $\omega_{\rm HDI} \equiv \rm HDI_{max}$ - $\rm HDI_{min}$.

The most obvious difference between these two PDFs is their width. The single season width
$\omega_{\rm HDI}^{\rm 2004/5}=7.1\%$ is much broader than the full career $\omega_{\rm HDI}^{\rm career}=1.8\%$.
This is a manifestation that with more data the uncertainty of the variable range of values decrease.
In the case of binomial data $\omega_{\rm HDI}$ decreases by $1/N^2$, where $N$ is the sample size.

The location information is quantfied as $\rm HDI_{min \ 2004/5}^{max}= _{42.6\%}^{49.7\%}$ for one season.
It addresses the question: "If Shaquile were to shoot more than 765 shots in 2004/5, 
everything consider even, we have 95% credability that the true value would be between 42.6-49.7%".

For the full career it is defined as $\rm HDI_{min \ career}^{max}= _{42.6\%}^{49.7\%}$.


These stats invite other questions like:

> "Was Shaquile's freethrow ability better or worse than a toss of a [fair] coin?"

<!-- Examining these stats it is tempting to make conclusions backed by two-sided p-values for
statistical significance. According to NHST in 2004/5 for the fair coin null hypothesis
we obtain a p-value of 0.033. In the full career results p-value < 0.001 (6e-9). Assuming
a false positive rate of  -->

As seen when sequentailly testing coin tosses, there is a key flaw to this question
since according to NHST one will eventually always reject the null hypothesis since

> [Given enough data] even a practically meaningless result may be considered "statistically significant".

This is relevant for both sequential hypothesis testing,
as well as retrospective analyses.

The solution to is to compare the posterior to an minimum effect size. In other words, we need to ask to rephrase the question to

> "Was Shaquile's freethrow ability **meaningfully** better or worse than a toss of a [fair] coin?"


Let's turn to see how to quantify "meaningful".

A more important question than did is the posterior higher or lower than a certain benchmark
value is: is it meaningfully higher or lower?


TK: discuss prior at some stage.[^prior]

[^prior]: We keep things simple with a flat prior, which treats every rate as equally plausible before the comeback season starts. A fuller analysis might bring in how other players' free-throw shooting has changed after returning from similar injuries. His own pre-injury record is deliberately *not* used as a prior: it is the baseline we are testing against, and feeding it in at both ends would quietly tilt the answer towards "nothing has changed".

## ⚖️ Quantifying "Close Enough"

<!-- TK image idea: Someone doing Six Seven -->


> In an experiment or a study, what counts as a meaningful change?



Above we discussed the fact that a statistically significant result does not imply
that it is meaingful. The observed effect is required to be large enough to justify making a real
life decision.

On the one hand this is domain specific, on the other hand there is a machinery that may
be applied which we explore next.

### ROPE as a Minimum Effect Size Heuristic

One method to quantify "close enough to the null hypothesis" is the 
 *Region of Practical Equivalence*, or ROPE: a region around the null hypothesis, wide enough
 to hold every result we would be content to consider a non result or not worthy of a change. If the truth sits anywhere inside the ROPE, the honest report is that nothing meaningful happened.
 Given its boundaries $\rm ROPE_{max}$ and $\rm ROPE_{min}$,
 its width is quantified as $\Delta_{\rm ROPE}\equiv \rm ROPE_{max} - ROPE_{min}$ <!-- medium: ΔROPE ≡ ROPEmax - ROPEmin -->.

How wide should the ROPE be? There is no general answer, and that is the whole point,
because the width *is* the domain-specific question of what a meaningful minimal effect size is.

This means that the ROPE boundary values are not computed but rather chosen, before any data arrives, out of what we already know about the domain.
That is the discipline of it. We commit to what counts as a meaningful change while the result is still unknown, so that the commitment cannot later be shaped by the result it is meant to judge.

 
Domains that need highly accurate measurements will demand narrower ROPEs around the null, we shall see that this means larger sample sizes,
because this means a smaller precision.

Let's consider playing dice accuracy. 
<!-- that are a useful anaology for ordinal data. A fair die should have 1/6 chance to land on any value.  -->
A board-game manufacturer needs its dice fair enough that no player notices any bias;
a casino needs them fair enough to satisfy a regulator which will be more strict. This means that the ROPE around fair dice metrics for someone manufacturing for a the Monte Carlo Casino need to be much tighter (i.e, larger sample size) for that manufacutring for Hasbro who owns and publishes the popular Monopoly game. 

Now that we've learned about the HDI and ROPE heuristics we are ready to see how we
can use them together. We'll start by exploring how the locational information of both may be
useful for a decision rule. After that we'll see how the HDI width may be used indepenetly as
as a reliable stopping rule.


## ⚖️ The HDI+ROPE Decision Rule 

Perhaps the best way to understand the HDI+ROPE decision rule is by the following illustration:

<!-- FIGURE E (suggested): accept / reject / inconclusive.
     Three-panel cartoon of HDI vs ROPE. The figure below shows only 2 of 6 scenarios and
     doesn't include the straddler, which is the one a beginner most needs named. -->

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/conclusive_outcomes.png" alt="Three Conclusive HDI+ROPE scenarios" width="700">
</div>

*The lines are posteriors where the vertical lines in each are the HDI borders.The gray boxes are the ROPEs around the null hypothesis value. In the left/right panels the HDI is outside left/right of the ROPE so the null hypothesis is rejected. In the center the HDI is completely within the ROPE so the null hypothesis is accepted.*

For HDI+ROPE decision rule to reject the null hypothesis the HDI is required to
be completely **outside** of the ROPE as the left and right panels. To accept the null the HDI is required to be
completely **inside** the ROPE as in the middle panel.

This figure illustrates only three of possible six scenarios where HDI+ROPE decision
rule results in a conclusive outcome. Let's examine the other three where its
inconclusive and how to act on indecisive outcomes.

### Inconclusive Outcomes

Whereas the three scenarios above may be considered *Conclusive* results the following
ones where the HDI straddles the ROPE boundaries may be considered *Inconclusive*:



<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/inconclusive_outcomes.png" alt="Three Conclusive HDI+ROPE scenarios" width="700">
</div>

*Similar to above but the posterior straddles the ROPE boundaries.*


The action following an inconclusive results depends on the experiement budget. If one
can collect more data points, it might be worth further reducing uncertainty.
If the experiment budget is drained, one must conduct a risk assessment, which is
domain specific and beyond the scope of this post. [TK: create footnote to mentioned that the calculator addresses this]
Below we go further into detail on acting on inconclusive outcomes with extra budget.

### Applying the HDI+ROPE Decision to a Fair Coin Sequence

To further appreciate the point of in/conclusiveness in sequential hypothesis
let's examine a set of consecutive fair coin tosses. Instead of the M=200 of before
we will now focuse on a randomly generated but hand picked sequence [TK: footnoe with link to the actual sequence] that is useful
to explain differences of outcomes as a function of the stop iteration.

For our purposes we will define the ROPE region as [0.45, 0.55] and explore the HDI+ROPE
decision in three different scenarios.

The PDF at iteration n=126 is shown below where the HDI sits fully outside the ROPE,
where the HDI region is clearly outside of the ROPE.
The HDI+ROPE decision 


<!-- so the algorithm stops and
rejects a **fair** coin 🤥. Then the rate — 6.3% over 5,000 simulations, not the 5% intuition
suggests. Call out in the text what to look at: the HDI is narrow enough to *look* decisive and
isn't.] -->

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/04-coupling-problem.png" alt="HDI fully outside the ROPE at iteration 126" width="700">
</div>

*[CAPTION NEEDED — state the claim: at N=126 the HDI is fully outside the ROPE, so a coupled algorithm stops and rejects a coin we know to be fair.]*

That means that the HDI+ROPE decision algorithm will incorrectly reject what we know
to be a fair coin. We will later discuss false rejection rates, but for now show that
if ppeked later, say at iteration 598 we obtain the following posterior that straddles
the ROPE:

<!-- 
[THE HINGE OF THE PIECE, in one sentence: both of these rules are stopping on the verdict.]


[Working values: ROPE = [0.45, 0.55], so $\Delta_{ROPE} = 0.10$ <!-- medium: ΔROPE = 0.10 --> and
$\omega_{Goal} = 0.08$ <!-- medium: ωGoal = 0.08 -->, 80% of the ROPE width. Then the same sequence
now running to 598 rather than stopping at 126.] -->

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/05-pitg-algorithm.png" alt="PitG stopping rule met at iteration 598" width="700">
</div>

*[CAPTION NEEDED — state the claim: PitG ignores the verdict and keeps collecting until the HDI is narrow enough, reaching ωGoal at iteration 598.]*

Given extra budget the experiment should continue until the HDI is completely within
or outside of the ROPE. This happens at iteration 804 as seen here:
<!-- 
The worked sequence runs to 804 — 34% more than 598 — but say immediately that this hand-picked
example is on the high side; the median is +4.7%.] -->

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/07-dpitg-stop.png" alt="DPitG stops at iteration 804" width="700">
</div>

*[CAPTION NEEDED — state the claim: DPitG carries on past 598 and stops at 804, where the HDI is both narrow enough and fully inside the ROPE, accepting the null.]*

These iteration value were not randomly chosen but rather represent stop iterations
for three different stopping algorithms which is the focus of this post.

## Three Stopping Algorithms

So far we have discussed how to use the relative location information of the HDI and
ROPE heuristics to determine an out come when looking at the data. Now we focus
on the key aspect of sequential hypothesis testing which is when to dedice to look.

### 🛑 HDI + ROPE as a Stopping and Decision Criteria

The HDI+ROPE stopping algorithm, similar to that of NHST and Bayes Factor conflates
both the stopping and decision rules into the same criterion.

That means that once the HDI is fully outside (or inside) the ROPE we will stop collrecting
data and reject (or accept) the null hypothesis.

In the handpicked fair coin sample we've seen this actually in action stopping at iteration
126 and incorrectly rejecting the null hypothesis. How representative is this false rejection rate?
Testing on M=5,000 sequences we find this to happen 6.2% of the time. 

The key problem, as mentioned before, is the dual usage of the heuristic. Next we will
see how to use the HDI width, regardless of its location, as an independent measure
to substantially reduce this confirmation bias.

### 🛑 Precision is the Goal

One way to decouple the stopping and decision criteria is by setting the parameter precision
as the stopping goal. John Kruskche demonstrated that by predetermining a minimum
width for the HDI as a stopping criterion we can substnatilly reduce the risk of peeking
too early and hence minimise confirmation bias.

By setting a precision goal of $\omega_{\rm Goal}$ comparing the HDI width $\omega_{\rm HDI}$
to it the stopping rule becomes:
* $\omega_{\rm HDI} \le \omega_{\rm Goal}$: stop and decide
* $\omega_{\rm HDI} \gt \omega_{\rm Goal}$: continue collecting (or conduct risk assessment to decide.)

The key difference in sequential testing is that the standard methods 
(NHST, Bayes Factor as well as HDI+ROPE) monitor the location information,
where in this *Precision is the Goal* method the analysts examines the width of the parameter posterior. 

In the fair coin case Kruskche showed that in 1,000 sequences there are zero false
positives. I verified this by analysing 5,000 sequences. This will be demonstrated below.
In addition he has shown that the sample parameter at the stop iteration is much more accurate
for loaded coins as confirmation bias is impacted by extereme results.

One aspect, however, that I found was overlooked by the original Precision is the Goal,
is the rate of inconclusive outcomes. Reproducing his original expeirmenets I found
that the original Precision is the Goal resulted in 63% inconclusive outcome in the
fair coin case.

I managed to resolve this by slightly tweeking to a new variant 
which reduces this inconclusive rate to about 2%.

### 🛑 Decisive Precision is the Goal

The modification is making the stopping rule a bit more conservative.
This is done by changing the STOP then DECIDE rule to STOP AND DECIDE where stopping
is still the original  $\omega_{\rm HDI} \le \omega_{\rm Goal}$ criteria, where in
the deciding phase we just address the quesetion: if we decide now would the result
be conclusive?

In other words this variant which I've called *Decisive Precision is the Goal* states:

Collect data until $(\omega_{\rm HDI} \le \omega_{\rm Goal})$ & (HDI Completely Inside/Outside ROPE).

If both criteria are met the standard HDI+ROPE ruling applies.

If both criteria are not met the result is considered "inconclusive" and if the budget
permits data collection continues. If not one must resort to a risk assessment.

A useful visual of this is below, similar to above but the yellow box around the posterior
has the width of $\omega_{\rm Goal})$ :

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/06-dpitg-scenarios.png" alt="Two DPitG scenarios" width="700">
</div>

*[CAPTION NEEDED — in both panels the precision goal is met (HDI well inside the yellow dashed box). Left: a straddler, so keep collecting. Right: HDI fully within the ROPE, so accept.]*

Note that this represents two of 11 scenarios. The 11 count is as follows:
All six HDI+ROPE scenarios above have two cases: $\omega_{\rm HDI} \le \omega_{\rm Goal}$ and $\omega_{\rm HDI} \gt \omega_{\rm Goal}$,
except for the middle inconclusive one which has only the $\omega_{\rm HDI} \gt \omega_{\rm Goal}$ case ...

In both panels the precision criteria is met $\omega_{\rm HDI} \le \omega_{\rm Goal}$.
The original PitG would stop at that point to decide and find that the left panel
is inconclusive. DPitG simply continues collecting data until the HDI is found to be
completely within or outside the ROPE as per the right panel.

### Stopping+Decision Algorithm Comparison

The following table summarises the three algorithms

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/08-three-algorithm-comparison.png" alt="Comparison table of the three algorithms" width="750">
</div>

As mentioned all three use the same HDI+ROPE decision algorithm, but differ in the stopping
criteria.

Whereas the PitG completely decouples the stopping and decision criteria,
the DPitG is effectively a hybrid of PitG and the HDI+ROPE by couping them back together
and by so being more conservative.

We next briefly explore their performance for the fair coin test demonstrating the
advantages of going from one to another.

## Revisiting the Fair Coin Test

[THE THREE NUMBERS, stated plainly: 2.2% inconclusive (down from 62.1%), zero false positives,
median +4.7% data. The 11-scenario catalogue goes to ⚔️.]

*[CAPTION NEEDED — DPitG is a hybrid: PitG's precision criterion, then HDI+ROPE's conclusiveness criterion.]*

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/09-three-algorithm-rates.png" alt="Decision statistics for the three algorithms" width="750">
</div>

*[CAPTION NEEDED — this figure carries the central claim; it needs a caption more than any other.]*

[One scope fence: p-values and Bayes Factors aren't in this comparison because their decision
heuristic is different — see ⚔️.]


Regading the conclusive outcomes, its worth pausing to address the question of 
what is actually being accept and as imported rejected.




## What do Conclusive Outcomes Accept/Reject?

When rejecting the null hypothesis it is tempting to accept the sample result.

It's worth emphasising that when the  accept or reject decisions are statements about
the null value, not the sample value.

When rejecting the null hypothesis we are not accpeting the sample value.

When the decsiion is to accept we should quote the null as being accepted, not the sample value. 

about the sample value, but rather th
, we are accepting the null
hypothesis, not the sample value (which is likely to differ). This is because of the contruct:
we are accepting that the true value is effectively similar to the null hypothesis.

<!-- Inside, Outside, or Straddling -->

[The decision rule as THREE outcomes, so `Inconclusive` 🤷 is a first-class citizen from the start
rather than a surprise two-thirds in, as it is in the old draft. ⚖️ has already shown the reader a
🤷 straddler on the ±2pp free-throw ROPE, so this section names and formalises an outcome they have
met rather than introducing one.

Free callback available here (see agentdocs/dpitg-post-outline.md, Epigraph): Wald's 1943 sequential
test also allowed exactly three decisions — accept, reject, or carry on collecting. Closing the loop
on the opening epigraph costs one sentence.]

[THE MISCONCEPTION BLOCK — worth its own pull quote. MOVED HERE from ⚖️ on 2026-10-11, because it is
a correction to the decision rule and in ⚖️ it arrived before the reader had an HDI, an accept, or a
reject to be wrong about. Source prose: old draft line 227. Paper source: methods.tex
§sec:accept_reject_meaning, which is the fuller treatment — neither verdict endorses the sample
estimate; both are statements about the null value, grounded in the pre-specified ROPE.]

> The decision method accepts/rejects the null **value**, not the sample value.


## 🗳️🤥 Calling It Early

[The election-night framing: networks call a race on precincts that aren't representative yet. Then
the same failure shown twice — first in the reader's own language, then in the surprising one.]

### Simulating the NHST Stopping Rule

[⚠️ OPEN THIS SECTION BY HANDING THE EXAMPLE OVER — one sentence, added 2026-10-11. The free
throws taught the posterior in 🏀 and carried the ROPE in ⚖️; from here on the worked example is
a simulated fair coin, because counting mistakes requires knowing the true answer and basketball
never tells us. Make the swap explicit or the reader will think they missed something.]

[~250 words. The dashboard rule from the hook, run on fair coins, peeked at every toss, with the
false-alarm rate climbing without limit. This is the payoff on the recognition beat. Call out what
to look at: at iteration 100, ~20% of 200 fair-coin experiments have already "found" an effect.
Then the Kruschke line again as the punchline. The p-value *definition* figure and the formal
treatment are ⚔️ — resist explaining p-values here.

PULL QUOTE RELOCATED HERE from ⚖️ on 2026-10-11 — it belongs under the figure that proves it,
since the chart no longer precedes ⚖️ in the new section order. Source prose: old draft lines
170–174. It sits below the figure, so the chart is the evidence and the quote is the verdict on it.]


What he means is that chance alone keeps producing small deviations from the null, and as data accumulates one of them will eventually be extreme enough to clear that threshold. Wait long enough and every experiment reports a finding, including the ones with nothing to find. In section Simulating the NHST Stopping Rule we'll see this in action with the flipping of a virtual fair coin.



<!-- TK: for companion paper when we discuss preplanning. This is not only a laboratory concern. It is one of the quieter engines behind the *replication crisis*, where a great many published findings fail to reappear when somebody runs the study again: when the Open Science Collaboration repeated one hundred psychology experiments in 2015, only about a third came back with the original result. -->

Two things are needed to avoid these false alarms. The first is to fix a minimum meaningful effect size in advance and actually hold to it, which is also what lets us accept a null hypothesis rather than merely fail to reject it. The second, which turns out to matter just as much, is to stop collecting data for a reason that has nothing to do with the verdict. 

The second asks us to stop without consulting the result, which sounds like a strange way to run an experiment. Neither, though, can even be stated until we have a way of describing what the data supports at any given moment. 

<!-- THIS SHOULD GO IN THE COMPANION PAPER: A stopping rule that doubles as a verdict is worth sitting with, because it is one of the quieter engines behind the *replication crisis*. The crisis is the discovery, across psychology, medicine and economics, that a great many published findings simply do not reappear when somebody runs the study again. When the Open Science Collaboration repeated one hundred well-known psychology experiments in 2015, only about a third came back with the original result.

The terms of art for how this happens are *p-hacking* and *HARKing* (hypothesising after the results are known), and both sound like accusations of dishonesty. Mostly they are not. Mostly they are a competent person looking at a dashboard, seeing a result, and stopping, which is exactly what the dashboard was built to let them do. -->



### And going Bayesian doesn't fix it

[

 

## 🛑 Precision is the Goal as a Stopping Criterion

<!-- TITLE: "Gotta Keep 'em Separated" moved here from 🏀 on 2026-10-11, where it was promising a
     decoupling three sections before the post could deliver one. Here it is literal — PitG's
     defining property IS that the stopping rule and the decision rule are separated. Kruschke's
     "Precision is the Goal" stays, since it is the method's name and it echoes the post title. -->

[THE HERO. The fix, stated as the inversion of the hinge: stop on **width**, not on verdict.

⚠️ THE WORD *PRECISION* IS FIRST DEFINED HERE (relocated from 🏀 on 2026-10-11, where it was
circular — "narrow enough" has no meaning until Δ_ROPE exists). Define it before using it: precision
is the width of the posterior's HDI, $\omega_{HDI}$, and nothing else.

🏀's location/width pair is the callback to land, and this is the second half of it: ⚖️ gave
**location** its yardstick (the ROPE), and this section gives **width** its yardstick (ωGoal). The
stopping rule / decision rule naming also lives here now, not in 🏀 — "One Heuristic, Two Jobs" made
the separation, and this is where it is finally enacted and can be named.

Introduce the precision goal $\omega_{Goal}$ <!-- medium: ωGoal -->, the rule
$\omega_{HDI} \le \omega_{Goal}$ <!-- medium: ωHDI ≤ ωGoal -->, and the constraint below with one
line of why — a goal wider than the ROPE can never resolve:]

> $\omega_{Goal} \le \Delta_{ROPE}$ <!-- medium: ωGoal ≤ ΔROPE -->


[THE HEADLINE — zero false rejections across 5,000 simulations. Keep your hedge intact; it's
load-bearing: you believe there's a proof for the fair-coin case and haven't derived it.]

[PERMISSION-TO-BE-CONFUSED BEAT belongs here — $\omega_{Goal} \le \Delta_{ROPE}$ and the
width-vs-position distinction are the two genuinely hard ideas in the post and the reader has just
met both. The move is *this took me a while too* (2018 → now), never *this is simple*.]

[SCOPE FENCES, one line each, somewhere in this stretch: flat Beta(1,1) prior throughout; MCMC-
estimated HDIs not characterised here; group-sequential alpha-spending and BFDA as the nearest
relatives. One line each, then move on.]

## 🤷 Precision Isn't Enough

[Short section. The hero has a problem: at 598 the HDI straddles the ROPE. 62% of the time PitG
stops precise and says nothing. Set up the third outcome as a real operational cost, not a curiosity.]

## Decisive Precision is the Goal

[~400 words. THE FINAL ACT and your contribution — a one-line change: keep collecting until precise
**and** conclusive. Same 11 scenarios as PitG; what differs is the straddlers.






## When This Is Worth Using

[Merges the old draft's two short sections into one. Two roles:

 • **As a stopping rule** — when data is cheap and the budget comfortably exceeds $N_{Goal}$
   <!-- medium: NGoal -->: large-scale A/B testing, opinion polling, automated QC pipelines.
 • **As a planning tool** — when $N_{Goal}$ is out of reach: longitudinal studies, clinical trials,
   expensive policy evaluations. It makes explicit what precision is achievable and what conclusions
   the data can and cannot support, prospectively and retrospectively.

Then the EPISTEMIC HONESTY argument, which is the strongest thing in the paper's discussion: an
imprecise posterior is inconclusive whatever method you run on it. PitG just refuses to pretend
otherwise. One 🗳️ callback to close.]

## Summary

[Thesis in one sentence, then what was covered, then the reader's next step:]

- [Bayesian testing lets you accept the null, not just fail to reject it]
- [PitG keeps effect size in the loop at both stages, and stops on precision rather than on verdict]
- [DPitG keeps PitG's low error rates, is highly conclusive, and costs little more]
- [Demonstrated on coin tosses; generalises to continuous data and between-group comparisons]
- [A closed-form formula makes it work prospectively and retrospectively, not just sequentially]

> You can't spell pROPEr without ROPE ...

## 🧮 A Companion: The Calculator

[One short paragraph. The closed-form $N_{Goal}$ means this isn't only a sequential method — it also
plans prospectively and audits retrospectively, and that is what the calculator does. A companion
post, not a series: no "you are here" marker, no part numbers.

NOTE: do NOT add a `post_url` tag pointing at the companion until that post exists — a broken one is
a hard build failure, not a 404. (Liquid parses that tag even inside square brackets and HTML
comments, so don't write it out here either.)]

<div style="text-align:center">
    <a href="https://r-w-t-y.streamlit.app/" target="_blank"><img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/00-streamlit-calculator.png" alt="Interactive sample size calculator" width="560"></a>
</div>

*Click through to the live calculator at [https://r-w-t-y.streamlit.app/](https://r-w-t-y.streamlit.app/){:target="_blank"}*

<!-- Alternative to the screenshot above: embed the calculator live. Free Streamlit apps sleep
     when idle, so a visitor may land on a wake-up screen rather than the calculator.
<iframe src="https://r-w-t-y.streamlit.app/?embed=true" width="100%" height="630" frameborder="0" scrolling="no"></iframe>
-->

---

# ⚔️ Supplementary Sections

[YOUR STANDARD FRAMING — "For the mathematically inclined ⚔️ I also provide supplementary sections
with short deep dives after the summary. (Note: These are not required to appreciate the main points
of the article.)" Everything below exists already in the old draft or the preprint; this is
relocation, not new writing.]

## ⚔️ What the HDI Actually Is

[Old draft lines 190–204, plus `appendix_hdi.tex` from the preprint. Formal definition — the smallest
region where most of the posterior resides; every point inside has higher density than any point
outside — and a pointer to a Python implementation.]

<!-- FIGURE C (suggested, only if Figure A doesn't absorb it): a single posterior with the
     HDI shaded, showing "smallest region containing 95%". Fills the old draft's [Insert Visual]. -->

## ⚔️ What a p-value Actually Is, and Why It Can't Accept the Null

[Old draft lines 129–144, plus `appendix_nhst.tex`. The definition, the figure, and the structural
limitation.]

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/01-pvalue-binomial.png" alt="Visualising the p-value for a binomial test" width="636">
</div>

*Visualising the p-value for a binomial test: One tosses a coin n=30 times in which k=24 of them result in HEADS. Assuming a fair coin, the p-value of a two sided test is 0.14%. (note that the y axis is in a logarithmic scale)*

## ⚔️ Bayes Factors, and Why They're Not in the Comparison

[`appendix_bayes_factors.tex`. No explicit effect-size criterion, no direct precision goal.]


## ⚔️ The Planning Formula

[Old draft lines 385–415. The closed form, its two inputs, and what it buys you — this is the bridge
to the companion post.]

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/10-planning-formula.png" alt="Closed form planning formula" width="700">
</div>

*[CAPTION NEEDED — state the formula in words: the sample size needed scales with the variance and with the inverse square of the precision goal.]*

[Where *V* is the aleatoric uncertainty (irreducible error) and $z^{\*}$ <!-- medium: z* --> is the
critical value — 1.96 for 95% credibility. For the coin toss,
$V(\theta) = \theta(1-\theta)$ <!-- medium: V(θ) = θ(1-θ) -->.]

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/11-planning-formula-validation.png" alt="Expected sample size for varying precision goals" width="700">
</div>

*[CAPTION NEEDED — two things to call out: more precision (smaller ωGoal) needs more data, and the fair coin is the worst case because its variance is highest.]*

[Then the note that for DPitG, $N_{Goal}$ <!-- medium: NGoal --> is a lower bound rather than the
expected stop.]

## ⚔️ Sensitivity to the Precision Goal and the Budget

[Old draft lines 417–431 plus `appendix_trends_detail.tex`. The key practical finding: conclusiveness
is more sensitive to $N_{max}$ <!-- medium: Nmax --> than to ωGoal, so setting the budget generously
is the main lever. Also: generalising to loaded coins, and how NGoal varies with the true value.]

## ⚔️ Other Data Types

[Old draft line 470 plus `appendix_extensions.tex`. Single-group continuous, and between-group for
both binomial and continuous. Carry the preprint's honest caveat: these are derivations, not yet
simulation-validated.]

## ⚔️ Why No Multiple-Comparisons Correction

[`appendix_multiple_comparisons.tex`. The Bayesian posterior is unaffected by how many parallel tests
you run — a structural advantage over NHST worth stating plainly.]

---

[CTA — "Loved this post? ❤️🍕" with a LinkedIn link. The Buy-Me-A-Coffee widget is already at the
top of the page.]

## The Story Behind This Post

[2018, finding it buried in §13.6 of Kruschke's *Doing Bayesian Data Analysis* — the book with the
dogs 🐶. A statistics conference where 1 of 20+ attendees had heard of it. Why that gap prompted
both the preprint and this post.

CLOSE ON DIRK NACHBAR: one attendee of the RSS talk went home, wrote his own summary, and extended
the method to continuous variables unprompted. That is the adoption this post is arguing for, already
happening — the strongest possible ending to a "why isn't this better known" origin.]

## Credits

[Unless otherwise noted, all images were created by the author. Named thanks — including Kruschke
for the 2022 correspondence, if he's content to be named.]

## 📚 Resources

[Annotated — every entry says *why* it's worth the reader's time, with the level named:]

- [Kruschke, *Doing Bayesian Data Analysis* — §13.6 is where PitG lives]
- [Kruschke's original video, below]
- [The preprint — badges below]
- [`github.com/elzurdo/dpitg` — the open-source implementation]
- [The calculator — `https://r-w-t-y.streamlit.app/`]
- [Dirk Nachbar's write-up — an independent practitioner's summary plus a continuous-variable
  implementation: `https://www.linkedin.com/pulse/precision-goal-dirk-nachbar-yfh5e/`]
- [Open Science Collaboration (2015), "Estimating the reproducibility of psychological science",
  *Science* **349**(6251), aac4716 — the replication study quoted in *You Already Have a Stopping
  Rule*. Annotate with why it is worth the reader's time; it is the empirical anchor for the
  replication crisis, and the one entry here that is about the problem rather than the method.
  `https://doi.org/10.1126/science.aac4716`
  ⚠️ Check the headline figure before publishing — the draft says "only about a third came back
  with the original result", which should match this paper's own reported replication rate.]

<div style="text-align:center">
    <iframe width="640" height="480" src="https://www.youtube.com/embed/lh5btlAvrLs" title="Precision is the Goal" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

*Kruschke's original "Precision is the Goal" video.*

[**Precision and Decisiveness as Goals: Reliable Sequential Hypothesis Testing with a Dual Stopping…**](https://arxiv.org/abs/2608.05301){:target="_blank"}
*Sequential hypothesis testing offers flexibility over fixed-sample designs, but stopping rules coupled to decision…* — arxiv.org

[![arXiv](https://img.shields.io/badge/arXiv-2608.05301-b31b1b?logo=arxiv&logoColor=white)](https://arxiv.org/abs/2608.05301){:target="_blank"}  [![PDF](https://img.shields.io/badge/PDF-arXiv-b31b1b?logo=adobeacrobatreader&logoColor=white)](https://arxiv.org/pdf/2608.05301){:target="_blank"}

<!-- ===========================================================================
     REUSE MAP — which prose in _drafts/dont-stop-til-you-get-enough.md moves
     where. Move it across rather than rewriting; most of it is already yours.

     old lines  →  new home
     ---------------------------------------------------------------------
      10–33     →  reader contract + motivating question (drop the Medium-ism
                   at line 14; move the 2018/conference story at line 31 down
                   to "The Story Behind This Post", where it belongs)
      35–42     →  Summary (it is already a summary; it was just at the top)
      62–68     →  "What I'm Talking About When I Talk About Accepting the Null"
      70–96     →  mostly CUT. The power-analysis and cost material is now
                   compressed into the hook and the motivating question.
      98–127    →  the stopping/decision distinction → 📷 "Focus First, Then Look"
     129–144    →  ⚔️ "What a p-value Actually Is"
     144–167    →  🗳️ "Your stopping rule, simulated"
     168–184    →  ⚖️ 'Quantifying "Close Enough"' 
     186–204    →  split: informal HDI → "What a Posterior Is";
                   formal HDI → ⚔️ "What the HDI Actually Is"
     205–215    →  ⚖️ 'Quantifying "Close Enough"' (fill the two empty bullets)
     217–233    →  "Inside, Outside, or Straddling" + the misconception quote
     235–281    →  🗳️ "And going Bayesian doesn't fix it"
                   (CUT the 1,500-character binary sequence at line 248)
     283–313    →  🛑 "Precision is the Goal"
     315–327    →  🤷 "Precision Isn't Enough"
     329–359    →  "Decisive Precision is the Goal"
     361–383    →  "Three Methods, Side by Side"
     385–415    →  ⚔️ "The Planning Formula"
     417–431    →  ⚔️ "Sensitivity to the Precision Goal and the Budget"
     433–457    →  "When This Is Worth Using"
     459–470    →  Summary + ⚔️ "Other Data Types"
     472–481    →  📚 Resources
     483–517    →  CUT (the commented-out scratch area)

     OPEN CONTENT DEBTS inherited from the old draft — see
     _from_medium/dont-stop-til-you-get-enough/review-checklist.md items 24–40.
     The ones that bite hardest here:
       • HDI_min / HDI_max values are unfilled at N=30, 31, 126 and in the
         straddling-posterior sentence
       • item 34: "For PitG this is reduced substantially to only 2.2%" —
         should be DPitG. This is the paper's central result and a reader stops
         on it.
       • item 35: a false *rejection* is demonstrated but described as a false
         *acceptance* rate two paragraphs later
       • item 37: a `*` footnote marker with no footnote
       • 7 of 11 figures still have no caption (marked CAPTION NEEDED above)
       • items 41: 5 figures are low-res Medium re-fetches — swap in your
         originals before publishing (see figure-manifest.md)
     =========================================================================== -->
