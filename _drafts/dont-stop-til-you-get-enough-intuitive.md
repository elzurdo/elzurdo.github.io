---
layout: post
title: "🛑️⚖️ Don't Stop 'til You Get Enough — Reintroducing the “Precision is the Goal” Stopping Criterion"
---

<!-- Useful unicode: ω, Δ, θ, ≈ -->

<!-- Notes:
* analysts don't always know what they want at first
* N is never enough .... 
* The concept where "the rules are creaetd by the body that doesn't use the rules" (e.g as in Sortism)
-->



<!-- ===========================================================================
     SCAFFOLD ONLY — every heading below carries one bracketed line of intent
     and no prose. The prose is yours. Full reasoning behind this structure:
     agentdocs/dpitg-post-outline.md

     TARGET READER: someone running A/B tests or hypothesis tests who might or not
     fully understand the stopping rule they are already using. 

     SECOND AUDIENCE: readers already fluent in Bayesian testing. The ⚔️ block
     after the summary is sized for them. The spine never slows for them.

     FINISHED-DRAFT CHECKPOINT: could the target reader write Dirk Nachbar's
     200-word summary (_from_medium/dont-stop-til-you-get-enough/nachbar_post.md)
     after reading this?

     HERO: PitG. DPitG is a short final act, not a co-hero.
     
     LENGTH TARGET: Long form with footnotes. Everything heavy goes to ⚔️.

     Each LaTeX expression carries its unicode twin in an adjacent
     <!- - medium: … - -> comment, for regenerating the Medium version.
     =========================================================================== -->

<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="zurdo" data-description="Support me on Buy me a coffee!" data-message="Buy me a slice of pizza! 🍕" data-color="#40DCA5" data-position="Right" data-x_margin="18" data-y_margin="18"></script>

<!-- #### [SUBTITLE — one line promising a gain, not a summary. What will they be able to *do*? Decide when to stop collecting, and be able to say "no difference" out loud. It has to counterweight the Kruschke epigraph below, which is a negative claim about NHST; if both pull the same way the piece reads as an anti-frequentist polemic it never delivers.] -->

#### Know when you have enough data, and when a null result is a real finding. Interactive calculator provided. 🧮

<!-- Your TK: 

     PARKED QUOTES, for use lower down (you said you're moving both):
       · Gelman, "N is never enough" — fits the ⚔️ planning-formula or the epistemic-honesty beat
         in "When This Is Worth Using". -->

<!-- SLOT 3 of 6 — EPIGRAPH.

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

---

### What I'm Talking About When I Talk About Accepting the Null

TK: where would be best to place this?

[Three bullets, one line each — replaces the three `[some details tbd]` stubs in the old draft:]

💊 [bioequivalence trials for generic drugs]

💻 [do-no-harm regression testing in software deployment]

📋 [futility stopping in programme evaluations]

[Then the frequentist limitation in ONE sentence: NHST can only reject, or awkwardly "not reject".
The formal treatment is fenced to ⚔️ — do not argue it here.]

---

> “How much data is required?”

This is one of the most common questions in hypothesis and A/B testing, and it may be asked at different moments.

Before any data is collected, it is a planning question, where the standard answer is a *Power Analysis* calculation: supply a minimum effect size and how often you are willing to be wrong in each direction, and out comes a sample size. It is a sensible place to start. But what if the true effect is much stronger than you assumed, and you could have stopped weeks earlier? Or reduced harm, e.g, by clinic cutting short a trial once a treatment shows signs of doing damage?

A more flexible option is checking as the data arrives is called *sequential hypothesis testing*, often shortened to sequential testing. This retrospective method addresses the question:

> “Have we collected enough data yet?”

As tempting as sequential hypothesis testing is it also has a well known failure mode. Peek often enough and sooner or later an early, a stastically unrepresentative sample may meet the stopping rule. In most standard methods that same rule is also what decides the verdict. This in turn result in
*confirmation bias*, when an analyst confirms what they were seeking even if its not true [TK revise this]. The reason sequential confirmation bias happens is well understood, and it may be corrected for.

That correction is the focus of this post: a rule that tells you when you can confidently stop an experiment already under way. In a companion post we'll show that the same machinery works before a study starts, for planning how much data to collect in the first place.

An interesting consequence of this correction is that one can complete an experiment with fairly low false positive/negative rates. In particular we'll see that if the null hypothesis happens to be true, one can accept it with near zero false rejections.

<!-- READER CONTRACT. -->

This post is targeted at anyone who runs experiments and has to decide both when to stop them
as well an the statistical result interpretation: A/B testers, analysts, data scientists, researchers, and anyone who has ever stared at a dashboard wondering whether today is the day to call it.

No prior knowledge of Bayesian statistics is required, just a basic understanding of probabilities. If you have a rough idea of what a p-value is, you already know more than enough. (If you don't, that's fine too — and it may save you some unlearning.)


By the end you will be able to:

- **Read a posterior**: the two things it tells you, where your estimate sits and how uncertain it still is.
- ⚖️ **Quantify what counts as "close enough"** (the ROPE), and hold to it, rather than letting the effect size you planned around be quietly forgotten between the planning meeting and the write-up.
- 🛑 **Stop on precision rather than on the verdict**, using John Kruschke's *Precision is the Goal*. That one change removes a bias you probably didn't know you had.
- ✅ **Accept the null hypothesis**, instead of awkwardly failing to reject it. This matters whenever "no meaningful difference" is the finding you actually need.
- 🧮 **Estimate how much data you'll need** before collecting any of it, from a closed-form formula.

If you are already comfortable with posteriors, HDIs and ROPEs, the main thread will feel slow in places. The ⚔️ supplementary sections after the summary are where the detail lives.

If you'd like the full technical treatment, I have also written this up as an arXiv preprint. You won't need it to follow along, but it is there as a reference for the finer details.

[![arXiv](https://img.shields.io/badge/arXiv-2608.05301-b31b1b?logo=arxiv&logoColor=white)](https://arxiv.org/abs/2608.05301v1){:target="_blank"}

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
The experimenter stops because the result has turned *``statistically significant"*
and many unwittingly will conclude that it is also *meaningful*. 

[TK: add here example of drug tried on males and females]


### Statistically Significant Does Not Imply Meaningful

A popular misconception is confusing ``statistical significance" with a meaningful outcome.

Think of a researcher asking whether a therapeutic works differently for men and women, and finds it beneficial in 72.1% of one group and 72.3% of the other. They collect enough patients and that the said 0.2 percentage points will be considered ``statistically significant",
say in terms of a p-value or Bayes Factor.
In practice, however, no clinician is going to prescribe differently on it.

They key takeaway is that the deviation from a null hypothesis should be large enough to
justify to act on it, e.g, by making a decision to change the status-quo.

To further understand why ``statistically significant" does not necessarily mean a meaningful result we next turn to the simplest
sequential hypothesis test in which the NHST framework fails: a fair coin toss.


### NHST Catastrophically Fails the Fair Coin Test

The beauty of tossing a virtual fair coin multiple times is that we know the ground truth
and hence serves as a useful testbed for hypothesis testing mechanisms, sequential or otherwise.

In the case of the a true fair coin the null hypothesis (of it being a fair coin) should be accepted,
wherease that of a true loaded coin the same null hypothesis should rejected.

The first problem of the NHST mechanism is that in the case of a fair coin
the p-value does not contain acceptence
information and hence one can only awkwardly use a double-negative and "not reject"
the null hypothesis. We will later discuss Bayesian mechanisms that will be able to
accept the null hypothesis.

Even if we accept NHST as useful to be limited to rejecting the null hypothesis,
it completely fails in the fair coin sequential hypothesis testing.

To visualise this we've generated M=200 binomial sequences (of values 0, 1) of length N=30,000.
At each iteration n≥30 we peek at the data.

If p<0.05

* The stopping criteria is triggered and we stop collecting data
* The decision algorithm rejects the null hypothesis (incorrectly)

If p≥0.05 we do not reject the null hypothesis (which may be considered "inconclusive")
and move on to the next iteration.

How often do we expect to incorrectly reject the null hypothesis?
One would naïvely assume only 5% of the time as per the threshold.
Whereas this may be correct at one peeking point, in the sequential context this error compounds.

The following graph shows the cummulative decision rates 
as a function of iteration n.  Reject rates are in red or not reject in gray, their sum is 100% at each iteration.
(Note that when a sequence is rejected at a given iteration, e.g, n=100, that same rejection
is propagated to all subsequent iterations of that sequence, e.g n≥100, since we have stopped that experiment of the 200.)

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/02-pvalue-decision-rates.png" alt="Sequential hypothesis decision rates for fair coins using p-values" width="700">
</div>

*Sequential hypothesis decision rates for fair coins using p-values for stopping and deciding.* Python code to recreated this may be found here (TBD).

The figure clearly shows that the incorrect *rejection rate*
(otherwise known as the false *positive rate*) grows as a function of the iteration.

John Kruschke, author of *Doing Bayesian Data Analysis*, first demonstrated this limitation of p-value as 
a stopping in the fair coin case and quipped:

> *"With infinite patience, NHST results in 100% false alarms."*

The problem is that with more data the likelihood distribution (upon which the p-value is calculated)
is narrower and any slight shift from the null value results in a stronger (i.e, lower) p-value,
and hence is considered more ``statistically significant", even though there is no meaningful difference
between the likelihood distribution and the null value.

[TK: insert image demonstrating this narrowness]

The first step to correct for this is using a Bayesian mechism with which one can accept the null hypothesis.
Bayes Factor, e.g, is such a heursitic, but it turns out that is not sufficient since it runs
into similar confirmation bias problem. The details of this metric is beyond the scope
of this post, but its results are of interest [TK refer to where they can learn more about it]. In his analysis
John quantified that in the fair coin case it can result in 20% false rejects. 
He also extend to testing loaded coins showing it incorrectly accepting the null
hypothesis 40% of the time (what is commonly referred to as *false negative* rate).

The root issue in sequential hypothesis testing is common mechanissms such as the NHST
p-value and Bayes Factors use the deciding heuristic as the stopping
criteria.

<!-- 
<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/pvalue-bayesfactor-decision_rates_fair.png" alt="Sequential hypothesis decision rates for fair coins using p-values" width="700">
</div>


<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/pvalue-bayesfactor-decision_rates_loaded.png" alt="Sequential hypothesis decision rates for fair coins using p-values" width="700">
</div> -->


### 🛑 Gotta Keep 'em Separated ⚖️

Whereas it is convinient to apply the same heuristic as both the stopping rule and
the decision rule, this is the source
of cofirmation bias in sequential hypothesis testing.

Given enough looks, a statistical fluke will eventually happen and
the decision/stopping line may be crossed, whether or not it is meaningful.

The solution, hence, is that the stopping criterion should be based on a different heuristic than the decision one.

In the mechanism we explore we shall see that:

* The stopping criteria is a function of how un/certain we are about the parameter - regardless of its locaiton relative to the null
* The decision criteria depends both on the location of the parameter posterior relative to a predetermined effect size around the null.

To appreciate these we first need to understand two key properties of a probability posterior:
quantifying its location and its width.


## The HDI: A Posterior's Width and Location

Everything the data tells us about a parameter is held in its
A *posterior distribution* $p(\theta \mid {\rm data})$ <!-- medium: p(θ|data) -->: how plausible
each possible value is, given what we have observed so far.
For hypothesis testing two of its properties do most of the work:

* **Width**: how uncertain we still are. A wide posterior means many values remain plausible, a sign we may not have collected enough data.
* **Location**: where the plausible values sit, which we can compare to the null value.

These map neatly onto the discussed separation: as we'll see, width drives the stopping rule and location the decision rule.

To get a feel for both, let's watch a posterior narrow as data piles up, using one of the
most famous weaknesses in basketball: the free throws of Shaquille O'Neal.
Shaq dominated play close to the basket for nearly 20 years,
but was so unreliable from the line that opposing teams fouled him on purpose, a tactic known as *Hack-a-Shaq*.[^hack]
A free throw either goes in or it doesn't, so it behaves like the toss of a (possibly loaded) coin.
This is the same binomial data as a conversion in an A/B test, or a defective item coming off a production line.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/lipofsky_shaquille_oneal.jpg" alt="Shaquille O'Neal shooting a free throw for the Los Angeles Lakers" width="200">
</div>

*Shaq at the free throw line for the Los Angeles Lakers, 1999. Photo: Steve Lipofsky, [Basketballphoto.com](https://commons.wikimedia.org/wiki/File:Lipofsky_Shaquille_O%27Neal.jpg){:target="_blank"}, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/){:target="_blank"}.*

The figure below shows the posterior of his free throw success rate $\theta$ <!-- medium: θ --> from two data sets:
the 2004/5 season, with 765 attempts in 73 games (left), and his full career, with 11,252 attempts in 1,207 games (right).

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/oneal_freethrows_pdfs.png" alt="Two posteriors of Shaq's free throw rate: a wide one for the 2004/5 season and a narrow one for his career" width="700">
</div>

*Posteriors of Shaq's free throw success rate. Shaded areas are the 95% HDIs and the dashed line marks 50%. Left: the 2004/5 season (765 attempts). Right: his full career (11,252 attempts). About fifteen times the data gives a posterior about four times narrower.*

Each curve is the posterior: the higher the curve at a given value,
the more plausible that value is as Shaq's true, underlying success rate.
<!-- Parked prior footnote, for readers wondering about priors:
[^prior]: We use a flat prior, which treats every success rate between 0% and 100% as equally plausible before any shot is taken. With hundreds of attempts the data dominates, so the choice of prior has little effect here. -->

The shaded region is a *credible interval*, the Bayesian counterpart of the frequentist confidence interval,
flagging where most of the posterior mass lies. Throughout this post we use 95% of the mass.
There are several ways of choosing *which* 95%, and we use the *Highest Density Interval* (HDI).
Picture a horizontal waterline slowly lowered from the peak of the curve. The HDI is the stretch between the two points
where the line crosses the curve, at the moment the area enclosed beneath it first reaches 95%.
Every value inside the HDI is therefore more plausible than any value outside it.
(See the ⚔️ section below for a formal definition.)

An HDI is summarised by its two boundaries $\rm HDI_{min}$ and $\rm HDI_{max}$ <!-- medium: HDImin and HDImax -->,
which give its location, and by the distance between them, which gives its width:

$$\omega_{\rm HDI} \equiv {\rm HDI_{max}} - {\rm HDI_{min}}$$ <!-- medium: ωHDI ≡ HDImax − HDImin -->

### Width: More Data, More Certainty

The most striking difference between the two panels is their width.
The single season gives $\omega_{\rm HDI}^{\rm 2004/5}=7.1\%$ <!-- medium: ωHDI(2004/5) = 7.1% -->,
whereas the full career gives $\omega_{\rm HDI}^{\rm career}=1.8\%$ <!-- medium: ωHDI(career) = 1.8% -->.
Roughly fifteen times as many attempts produced a posterior roughly four times narrower.

That is no coincidence: the width shrinks in proportion to $1/\sqrt{N}$ <!-- medium: 1/√N -->, where $N$ is the sample size, and $\sqrt{15} \approx 3.9$ <!-- medium: √15 ≈ 3.9 -->.
This is the precise sense in which more data means more certainty, and it comes with a price tag:
halving the width requires four times the data.
We'll lean on this later when estimating how much data a given precision requires.

Note that the width says nothing about *where* the posterior sits, only how sure we are of it.
Keep that in mind, because it is exactly the property that a reliable stopping rule needs.

### Location: Where the Plausible Values Sit

The location is read off the HDI boundaries.
For the 2004/5 season the HDI spans 42.6%–49.7%: given that season's data, there is a 95% probability that his underlying success rate
lay within this range.
This direct probability statement about the parameter is what a credible interval offers, and a frequentist confidence interval, despite appearances, does not.
For his career the HDI spans 51.8%–53.7%.

(Curiously, the two intervals sit on opposite sides of 50%. This is not a contradiction: a single season is not a random sample
of a career, and his shooting varied over the years. A precise answer is only as good as the question it answers.)

These numbers invite questions like:

> "Was Shaq's free throw ability better or worse than the toss of a fair coin?"

The career panel answers *better*, but only slightly: by about 2.7 percentage points, give or take one.
With 11,252 attempts, though, even a far tinier departure from 50% would have been told apart from it.
The more useful question is:

> "Was Shaq's free throw ability **meaningfully** better or worse than the toss of a fair coin?"

To answer it, we first have to decide what "meaningful" means.

[^hack]: The arithmetic behind Hack-a-Shaq: a foul sends him to the line for two shots, worth on average $2 \times 52.7\% \approx 1.05$ <!-- medium: 2 × 52.7% ≈ 1.05 --> points, which is roughly what an average NBA possession yielded at the time. Whether the tactic paid off therefore hinged on a few percentage points either side of 50%, a meaningful-difference question in its own right.

## ⚖️ Quantifying "Close Enough"

If Shaq's underlying rate was $\theta=0.501$ <!-- medium: θ=0.501 -->
would you consider it **practically** a fair coin toss? How about 0.51? Or 0.53?
At the end of the day this is a subjective call. Which is fine. Part of analysing data is being aware of making such calls, as long as one can justify them.

For argument's sake let's say that any success rate between 45% and 55% is practically a fair coin toss.
Let's redraw Shaq's career posterior with these boundaries as a gray band.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/oneal_career_freethrows_pdf_rope.png" alt="Shaq's career posterior with its HDI sitting entirely inside a gray band from 45% to 55%" width="700">
</div>

*Shaq's career posterior. The gray band marks 45%–55%, the success rates we consider practically a fair coin toss. The HDI (shaded) sits entirely inside it.*

The career HDI, 51.8%–53.7%, sits entirely within the band.
This allows us to state that, for all practical purposes, Shaq's free throw success was like a fair coin toss.

(We chose the band here after seeing the data. In a real experiment the order must be the other way round, as we'll see shortly.)

This generalises to the question:

> In an experiment or a study, what counts as a meaningful change? I.e, one that may be worth acting on.

Recall the therapeutic that was beneficial for 72.1% of one group and 72.3% of the other:
with enough patients the difference is "statistically significant", yet no clinician would prescribe differently on it.
A meaningful effect is one large enough to justify a real-life decision, and which effects qualify depends on the decision.
What we need is a way to state that in advance.

### The ROPE: Committing to "Close Enough" in Advance

<!-- Subheading alternatives, pick one:
     · The ROPE: Committing to "Close Enough" in Advance
     · ROPE: Drawing the Line Before the Data Arrives
     · The ROPE: Where "No Difference" Lives
     · Region of Practical Equivalence: Naming What Doesn't Matter
     · ROPE: A Minimum Effect Size You Can Actually Hold To -->

The gray band has a name: the *Region of Practical Equivalence*, or ROPE.
It is a region around the null value, wide enough to hold every value we would consider no meaningful change.
If the truth sits anywhere inside the ROPE, the honest report is that nothing meaningful happened.
Given its boundaries $\rm ROPE_{min}$ and $\rm ROPE_{max}$ <!-- medium: ROPEmin and ROPEmax -->,
its width is $\omega_{\rm ROPE}\equiv \rm ROPE_{max} - ROPE_{min}$ <!-- medium: ωROPE ≡ ROPEmax − ROPEmin -->.

How wide should the ROPE be? There is no general answer, and that is the whole point,
because the width *is* the domain-specific question of what a meaningful minimal effect size is.

Consider a dice manufacturer with two clients.
A board-game publisher such as Hasbro, makers of Monopoly, needs dice fair enough that no player notices a bias.
A casino needs dice fair enough to satisfy a gaming regulator, a far stricter standard.
Testing a batch amounts to rolling and counting sixes, a binomial experiment whose null value is a probability of 1/6 ≈ 16.7%.[^information_threory]
Same factory, same dice, same test, yet the casino's ROPE around 1/6 has to be much narrower than Hasbro's,
and a batch may be practically fair for one client and not for the other.

[^information_threory]: Or a more rigourous test would involve measuring for entropy to be as close as possible to -log2(6) bits. (TK: revise the -log2(6) number)

This means that the ROPE boundaries are not computed but rather chosen, before any data arrives, out of what we already know about the domain.
That is the discipline of it. We commit to what counts as a meaningful change while the result is still unknown,
so that the commitment cannot later be shaped by the result it is meant to judge.
(For established ways of choosing a ROPE, see the ⚔️ section on choosing a ROPE in practice.)

Now that we have both the HDI and the ROPE, we are ready to put them together.
We'll start with how their locations combine into a decision rule.
After that we'll see how the HDI width alone can serve as a reliable stopping rule.


## ⚖️ The HDI+ROPE Decision Rule

We have already seen one decision in action: Shaq's career HDI sat entirely within the ROPE,
so we concluded that his free throws were, for all practical purposes, a fair coin toss.
Let's generalise.
The *HDI+ROPE decision rule* compares the location of the HDI with that of the ROPE,
where the outcome decision may be either conclusive or inconclusive.

### Conclusive Outcomes

A useful way to understand the conclusive outcomes is by the following illustration:

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/conclusive_outcomes.png" alt="Three conclusive HDI+ROPE scenarios: HDI fully left of the ROPE, fully inside it, and fully right of it" width="700">
</div>

*The three conclusive outcomes. Curves are posteriors, with ticks marking the HDI boundaries; gray boxes are the ROPEs around the null value. Left and right: the HDI is entirely outside the ROPE, so the null is rejected. Centre: the HDI is entirely inside the ROPE, so the null is accepted.*

We see that two of these outcome reject the null hypothesis and one accepts:

* ✅ **Accept the null**: the HDI is completely **inside** the ROPE,
  ${\rm ROPE_{min}} \le {\rm HDI_{min}} \lt {\rm HDI_{max}} \le {\rm ROPE_{max}}$ <!-- medium: ROPEmin ≤ HDImin < HDImax ≤ ROPEmax -->.
  
* ❌ **Reject the null**: the HDI is completely **outside** the ROPE, on either side,
  ${\rm HDI_{max}} < {\rm ROPE_{min}}$ or ${\rm ROPE_{max}} < {\rm HDI_{min}}$ <!-- medium: HDImax < ROPEmin or ROPEmax < HDImin -->.


Note that accepting the null may be a finding in its own right, rather than a failure to detect something.
This is exactly what the p-value could not offer.

### Inconclusive Outcomes




The following illustration demonstrates the three remaining outcomes, all of which
result in an inconclusive outcome:

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/inconclusive_outcomes.png" alt="Three inconclusive HDI+ROPE scenarios where the HDI straddles the ROPE boundaries" width="700">
</div>

*The three inconclusive outcomes. Left and right: the HDI crosses one ROPE boundary. Centre: the HDI is wider than the ROPE and spills over both boundaries.*

They all follow the general trend:

* 🤷 **Inconclusive**: the HDI **straddles** a ROPE boundary, sitting partly inside and partly outside.


The centre panel is worth a closer look.
Its HDI is wider than the ROPE, $\omega_{\rm HDI} > \omega_{\rm ROPE}$ <!-- medium: ωHDI > ωROPE -->,
so wherever it sits it can never fit inside it.
According to the HDI+ROPE decision rule a posterior this wide may still reject the null, but it can never accept it.
In other words, being able to say "no meaningful difference" requires a HDI narrower than the ROPE,
a point we'll return to when deciding when to stop.

What to do with an inconclusive result depends on the experiment's budget.
If more data may be collected, it narrows the HDI and may well resolve the straddle.
If the budget is spent, a decision can still be forced, but it then becomes a risk assessment
that weighs the cost of being wrong in each direction, which is domain specific and beyond the scope of this post.[^forced]
Below we go into more detail on acting on inconclusive outcomes when there is budget to spare.

[^forced]: The companion calculator offers two such forced decisions, under *Decide Now! 🎲* in its *Let Me Peek! 👀* tab. The *posterior tail probability* reports how much of the posterior lies on the observed side of the null, e.g. $P(\theta > \theta_{\rm null} \mid {\rm data})$, a Bayesian cousin of the one-sided p-value. The *Bayesian expected loss* weighs the posterior mass inside and outside the ROPE by the relative costs of a false accept and a false reject, and picks the cheaper verdict.

### One Fair Coin, Three Verdicts

The cartoons above are idealised. To see the decision rule on real binary data, let's return to the
virtual fair coin from earlier, where we know the truth: $\theta_{\rm true}=0.5$ <!-- medium: θtrue=0.5 -->.
We use the same ROPE as for Shaq, [45%, 55%], and follow a single sequence of tosses.
This sequence was randomly generated but then hand-picked, because it shows all three outcomes.[^handpicked]
(Claims about how often each outcome happens will come later, from 5,000 sequences.)

Here is the posterior at three points along the same sequence:

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/handpicked_sequence_posteriors_dpi350.png" alt="Three stacked posteriors of the same fair coin sequence at iterations 126, 598 and 804, narrowing as data accumulates; vertical dashed lines mark the ROPE at 0.45 and 0.55" width="700">
</div>

*Posteriors of one fair coin sequence after 126, 598 and 804 tosses. Shaded areas are the 95% HDIs; vertical dashed lines mark the ROPE boundaries.*

* **After 126 tosses**: $\hat\theta=0.635$ <!-- medium: θ̂=0.635 -->, and the HDI spans 0.551–0.718, entirely above the ROPE. ❌ Reject the null, just like the right-hand conclusive cartoon. Note that this HDI ($\omega_{\rm HDI}=0.167$ <!-- medium: ωHDI=0.167 -->) is wider than the ROPE, yet it still rejects: a wide posterior can reject, it just can never accept.
* **After 598 tosses**: $\hat\theta=0.525$ <!-- medium: θ̂=0.525 -->, and the narrower HDI ($\omega_{\rm HDI}=0.080$ <!-- medium: ωHDI=0.080 -->) straddles the upper ROPE boundary. 🤷 Inconclusive.
* **After 804 tosses**: $\hat\theta=0.515$ <!-- medium: θ̂=0.515 -->, and the HDI spans 0.480–0.549, entirely inside the ROPE. ✅ Accept the null, if only by a hair (0.549 against a boundary of 0.55).

Same coin, same tosses, three different verdicts.
The only thing that differed was *when* we stopped to look.
Which raises the question this post is really about: when *should* we stop?
Before we get there, the verdicts above deserve a closer look.

[^handpicked]: The sequence is `SEQUENCE_HANDPICKED` in the open-source [dpitg repository](https://github.com/elzurdo/dpitg/blob/main/py/utils_experiments_binomial.py#L33){:target="_blank"}, and these figures can be reproduced with the notebook [fair_coin_handpicked.ipynb](https://github.com/elzurdo/dpitg/blob/main/notebooks/fair_coin_handpicked.ipynb){:target="_blank"}.

### What Exactly Are We Accepting?

When a verdict comes in, it is tempting to read it as a verdict on the sample value. It isn't.

After 804 tosses we accept the null, $\theta_{\rm null}=0.5$ <!-- medium: θnull=0.5 -->, **not** the sample value of 0.515.
What we are accepting is that the true rate is practically equivalent to 0.5, within the ROPE we committed to.

After 126 tosses we reject the null, but that is **not** an endorsement of 0.635.
Here the point is sharper, because we know the true value is 0.5, and it isn't even inside the HDI.
Rejecting the null says only that the plausible values sit meaningfully away from it.

> The decision rule accepts or rejects the **null value**, not the sample value.

That 126-toss verdict was also simply wrong, and it shows the two ways a conclusive verdict can be:

* A *false reject* is when we reject the null although the true value lies inside the ROPE: the counterpart of a false positive.
* A *false accept* is when we accept the null although the true value lies outside the ROPE: the counterpart of a false negative.

<!-- Parked Wald callback, pending the epigraph decision: Wald's 1943 sequential test also allowed
     exactly three decisions — accept, reject, or carry on collecting. -->

## Three Stopping Algorithms

So far we have discussed how to use the relative location of the HDI and the ROPE
to decide on an outcome once we look at the data. Now we turn to the key question of sequential
hypothesis testing: when to stop looking.

Remember the three snapshots of our fair coin, at 126, 598 and 804 tosses?
They were not chosen at random. Each is where one of three stopping algorithms stops.
All three share the HDI+ROPE decision rule above and differ only in *when* they stop:

<!-- <div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/08-three-algorithm-comparison.png" alt="Table comparing the three algorithms: HDI+ROPE stops when conclusive; Precision is the Goal stops when the HDI is narrow enough, then decides; Decisive PitG stops when the HDI is narrow enough and conclusive" width="750">
</div> -->

<!-- OPTION B: HTML reproduction of the table above. Keep one of the two.
     medium: Medium has no tables, use 08-three-algorithm-comparison.png -->
<table style="width:100%; max-width:750px; margin:0 auto 1.5em; border-collapse:collapse; border:2px solid #000; color:#333; font-size:1.05em;">
  <tr style="background:#fff2cc;">
    <th style="background:#fff2cc; border:1px solid #000; padding:8px; text-align:left;">Algorithm</th>
    <th style="background:#fff2cc; border:1px solid #000; padding:8px; text-align:center;">Steps</th>
    <th style="background:#fff2cc; border:1px solid #000; padding:8px; text-align:center;">🛑</th>
    <th style="background:#fff2cc; border:1px solid #000; padding:8px; text-align:center;">⚖️</th>
    <th style="background:#fff2cc; border:1px solid #000; padding:8px; text-align:center;">Logic</th>
  </tr>
  <tr style="background:#fff;">
    <td style="border:1px solid #000; padding:8px; font-weight:bold;">HDI + ROPE</td>
    <td style="border:1px solid #000; padding:8px; text-align:center; font-weight:bold;">1</td>
    <td colspan="2" style="border:1px solid #000; padding:8px; text-align:center; font-weight:bold; color:#1155cc;">Conclusive?</td>
    <td style="border:1px solid #000; padding:8px; text-align:center;">Location <b><i>only</i></b></td>
  </tr>
  <tr style="background:#d9d9d9;">
    <td style="background:#d9d9d9; border:1px solid #000; padding:8px; font-weight:bold;">Precision is the Goal</td>
    <td style="background:#d9d9d9; border:1px solid #000; padding:8px; text-align:center; font-weight:bold;">2</td>
    <td style="background:#d9d9d9; border:1px solid #000; padding:8px; text-align:center; color:#6aa84f;">$\omega_{\rm HDI} \le \omega_{\rm goal}$</td>
    <td style="background:#d9d9d9; border:1px solid #000; padding:8px; text-align:center; font-weight:bold; color:#1155cc;">Conclusive?</td>
    <td style="background:#d9d9d9; border:1px solid #000; padding:8px; text-align:center;">Precision <b><i>then</i></b> Location</td>
  </tr>
  <tr style="background:#fff;">
    <td style="background:#fff; border:1px solid #000; padding:8px; font-weight:bold;">Decisive PitG</td>
    <td style="background:#fff; border:1px solid #000; padding:8px; text-align:center; font-weight:bold;">1</td>
    <td colspan="2" style="background:#fff; border:1px solid #000; padding:8px; text-align:center;"><span style="color:#6aa84f;">($\omega_{\rm HDI} \le \omega_{\rm goal}$)</span> &amp; <b style="color:#1155cc;">(Conclusive)</b></td>
    <td style="background:#fff; border:1px solid #000; padding:8px; text-align:center;">Precision <b><i>and</i></b> Location</td>
  </tr>
</table>

*The three stopping algorithms. 🛑 marks the stop criterion and ⚖️ the decision rule. "Conclusive" means the HDI is completely inside or outside the ROPE; $\omega_{\rm HDI} \le \omega_{\rm goal}$ <!-- medium: ωHDI ≤ ωgoal --> means the HDI is at least as narrow as a precision goal set in advance.*

In short, HDI+ROPE stops on location alone, Precision is the Goal stops on width and only then looks at location,
and Decisive Precision is the Goal requires both at once.
Each of the following subsections fills in one row of the table.

### 🛑 HDI+ROPE: Stop When Conclusive

The simplest algorithm keeps collecting until the decision rule gives a conclusive outcome,[^nmin] and then stops and reports it.
That is, once the HDI is fully outside (or inside) the ROPE we stop collecting and reject (or accept) the null.
Like the p-value and the Bayes Factor, it conflates the stopping and decision rules into a single criterion.

On our hand-picked fair coin it stops at toss 126 (top panel of the three snapshots) and incorrectly rejects the null 🤥.
An early run of heads was enough to push a still-wide HDI past the ROPE, and the algorithm took the bait.
This is the same confirmation bias we saw with the p-value, now in Bayesian form:
the heuristic that signals when to stop is also the one that delivers the verdict.

[^nmin]: In practice we also require a minimum number of tosses before the first look, $N_{\rm min}$ <!-- medium: Nmin -->, which we set to 30, so that the very first handful of tosses cannot trigger a verdict. A lower $N_{\rm min}$ makes false rejections more likely, a higher one less so.

What we need is a reason to stop that does not consult the verdict. The HDI's width is exactly that.

### 🛑 Precision is the Goal: Stop When Narrow Enough

John Kruschke's *Precision is the Goal* (PitG) decouples the two criteria.
The stopping rule looks only at the width of the HDI, and the decision rule is applied only once stopped.

We set a precision goal $\omega_{\rm goal}$ <!-- medium: ωgoal --> in advance and, after each toss, compare the HDI width to it:

* $\omega_{\rm HDI} \le \omega_{\rm goal}$ <!-- medium: ωHDI ≤ ωgoal -->: criterion met. Stop, then apply the decision rule.
* $\omega_{\rm HDI} > \omega_{\rm goal}$ <!-- medium: ωHDI > ωgoal -->: not met. Continue collecting (or, if the budget is spent, conduct a risk assessment).

Following Kruschke's original analysis we use $\omega_{\rm goal}=0.08$, <!-- medium: ωgoal=0.08 -->.
<!-- TK: look up how Kruschke chose ωgoal=0.08 (Doing Bayesian Data Analysis, §13.6) and add one sentence on the reasoning. -->
which is, by definition, narrower than the ROPE ($\omega_{\rm ROPE}=0.1$ <!-- medium: ωROPE=0.1 -->).
As we saw earlier, an HDI wider than the ROPE could never accept the null.

The key difference from HDI+ROPE (and from the p-value and the Bayes Factor) is that PitG monitors
the *width* of the posterior rather than its location.
A lucky streak can shift where the posterior sits, but it barely changes how wide it is,
so there is no early, extreme moment for the stopping rule to pounce on.
In his fair coin simulations Kruschke found that, across 1,000 sequences (and shown below in a further 5,000 I've conducted), PitG made zero false rejections.
And because it does not stop on extreme runs, the sample value at the stop is also more accurate, including for loaded coins.[^kruschke]

[^kruschke]: Kruschke (2015), *Doing Bayesian Data Analysis*, 2nd edition, §13.3. For a range of loaded coins see also the [General Trends section of my preprint](https://arxiv.org/html/2608.05301v1#S3.SS2){:target="_blank"}.

#### 🤷 Precision Isn't Enough

Our hand-picked coin already shows the catch. PitG stops at toss 598 (middle panel of the three snapshots),
where the precision goal is met, but the HDI straddles the ROPE, so the verdict is inconclusive.

This is not a quirk of one sequence.
Kruschke noted in passing that PitG "did remain undecided in some cases".[^undecided]
Reproducing his experiments I found that for a fair coin this is the most common outcome:
more often than not, PitG stops with an inconclusive verdict.
In other words, it rarely says anything wrong, but often says nothing at all.

[^undecided]: Kruschke (2015), §13.3.2, page 391.

A small tweak, it turns out, resolves most of this, at the cost of a little more data.

### 🛑 Decisive Precision is the Goal: Stop When Narrow Enough *and* Conclusive

The tweak is to make the stopping rule a bit more conservative.
Instead of STOP **THEN** DECIDE, it is STOP **AND** DECIDE: stopping requires both the original
precision criterion, $\omega_{\rm HDI} \le \omega_{\rm goal}$ <!-- medium: ωHDI ≤ ωgoal -->, and a conclusive outcome.

In other words, this variant, which I've called *Decisive Precision is the Goal* (DPitG), states:

> Collect data until $\omega_{\rm HDI} \le \omega_{\rm goal}$ <!-- medium: ωHDI ≤ ωgoal --> **and** the HDI is completely inside or outside the ROPE.

Once both criteria are met, the HDI+ROPE decision rule applies as usual.
Until then, the result is inconclusive: if the budget permits, data collection continues; otherwise one must resort to a risk assessment.

A useful visual is below. It is similar to the cartoons above, but the yellow box around the posterior
has the width of $\omega_{\rm goal}$ <!-- medium: ωgoal -->, so an HDI that fits inside it meets the precision goal.
The two panels are two of eleven possible scenarios.[^eleven_scenarios]

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/06-dpitg-scenarios.png" alt="Two DPitG scenarios, both with the HDI inside the yellow precision-goal box: left, the HDI straddles the ROPE so a traffic light says continue collecting; right, the HDI is within the ROPE so it says stop collecting" width="700">
</div>

*Two DPitG scenarios. In both, the HDI fits inside the yellow dashed box of width $\omega_{\rm goal}$ <!-- medium: ωgoal -->, so the precision goal is met. Left: the HDI straddles the ROPE, so DPitG keeps collecting. Right: the HDI is fully inside the ROPE, so DPitG stops and accepts the null.*

In the left panel, the original PitG would stop with an inconclusive outcome.
DPitG simply continues collecting data until the HDI is completely within or outside the ROPE, as in the right panel.

[^eleven_scenarios]: Each of the six HDI+ROPE scenarios above (three conclusive, three inconclusive) can occur with the precision goal met, $\omega_{\rm HDI} \le \omega_{\rm goal}$ <!-- medium: ωHDI ≤ ωgoal -->, or not, $\omega_{\rm HDI} > \omega_{\rm goal}$ <!-- medium: ωHDI > ωgoal -->, giving twelve combinations. The exception is the centre inconclusive scenario, where the HDI is wider than the ROPE: since $\omega_{\rm goal} < \omega_{\rm ROPE}$ <!-- medium: ωgoal < ωROPE -->, such an HDI can never meet the precision goal, which leaves eleven. DPitG stops in only three of them: precision met and conclusive.

On our hand-picked coin this means carrying on past toss 598 until toss 804 (bottom panel of the three snapshots),
where the HDI is both narrow enough and inside the ROPE, and correctly accepting the null.

DPitG is thus a hybrid: it takes PitG's precision criterion *and* HDI+ROPE's conclusiveness criterion.
Because precision must be met first, it never stops on an early lucky streak.
And because it also requires a conclusive outcome, it rarely ends with nothing to say.

▶️ **Try it yourself.** The explorer below shows a single look at a coin's tosses.
Drag the number of tosses and the share of heads, and watch the posterior, its HDI and the decision rule respond,
together with what each stopping rule would do if this were the moment you looked.
The p-value's verdict is included for comparison.
The buttons jump to the three snapshots of our hand-picked coin, and to a few extreme cases worth a look.

<!-- medium: no live embeds on Medium. Link to https://elzurdo.github.io/assets/dont-stop-til-you-get-enough/decision-explorer.html instead. -->
<iframe class="dpitg-widget" src="{{ "/assets/dont-stop-til-you-get-enough/decision-explorer.html" | relative_url }}" title="Interactive explorer: where the HDI sits relative to the ROPE, and what each rule decides" width="100%" height="560" style="border:0;" loading="lazy"></iframe>
<script>
  // Size each embedded widget to its content. They are served from this site, so their documents
  // can be read directly.
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("iframe.dpitg-widget").forEach(function (f) {
      function fit() {
        try {
          var w = f.contentDocument && f.contentDocument.querySelector(".wrap");
          if (w) f.style.height = Math.ceil(w.getBoundingClientRect().bottom) + 14 + "px";
        } catch (e) {}
      }
      function init() {
        fit();
        try {
          new f.contentWindow.ResizeObserver(fit).observe(f.contentDocument.querySelector(".wrap"));
        } catch (e) {}
      }
      f.addEventListener("load", init);
      if (f.contentDocument && f.contentDocument.readyState === "complete" && f.contentDocument.querySelector(".wrap")) init();
      window.addEventListener("resize", fit);
    });
  });
</script>

<!-- LATER: a Bayes Factor row in the explorer (add an entry to RULES in decision-explorer.html),
     and possibly a ROPE-width slider. -->

## More Lessons from the Fair Coin Test

To understand the differences between these stopping algorithms it's instructive to examine
both a specific case and trends across many.

### One Coin, Toss by Toss

We start with our hand-picked sequence one last time, now following it toss by toss rather than at three snapshots.
The gray band is the 95% HDI after each toss and the orange dashed lines are the ROPE boundaries.
A red line marks where the HDI is conclusively outside the ROPE, a green line where it is conclusively inside,
and purple dots mark where the precision goal, $\omega_{\rm goal}=0.08$ <!-- medium: ωgoal=0.08 -->, is met.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/handpicked_sequence_stats_dpi350.png" alt="The HDI of one fair coin sequence over 1,500 tosses: a gray band narrowing around 0.5, a red line at toss 126, purple dots from toss 598, and green bands from toss 804, with orange dashed ROPE lines at 0.45 and 0.55" width="750">
</div>

*The 95% HDI (gray band) of our hand-picked fair coin sequence after each toss. Red: HDI fully outside the ROPE (orange dashed lines). Green: HDI fully inside it. Purple dots: precision goal met.*

Reading from left to right, all three stops sit on one timeline.
At toss 126 a run of heads pushes the HDI above the ROPE, and HDI+ROPE stops and wrongly rejects.
From toss 598 the purple dots appear: the precision goal is met, so PitG stops, but the HDI still straddles the ROPE, so its verdict is inconclusive.
DPitG keeps going until toss 804, the first point at which the HDI is both narrow enough and inside the ROPE, and correctly accepts.

Notice that the green does not stay on once it appears. Just after 804 the HDI drifts back across the boundary a few times
before settling inside it. An accept can come and go, and DPitG stops at the first one.

▶️ **Try it yourself.** The simulation below replays the same hand-picked coin, toss by toss.
Press *Play / pause* to watch it again, *Find a false reject* to search random fair coins until HDI+ROPE wrongly rejects one,
or *Find a PitG inconclusive* to see PitG's catch.
Raise the true rate above 0.55 and rejecting becomes the correct answer.

<!-- medium: no live embeds on Medium. Link to https://elzurdo.github.io/assets/dont-stop-til-you-get-enough/three-rules-sim.html instead. -->
<iframe class="dpitg-widget" id="dpitg-sim" src="{{ "/assets/dont-stop-til-you-get-enough/three-rules-sim.html" | relative_url }}" title="Interactive simulation: the same coin tosses under three stopping rules" width="100%" height="560" style="border:0;" loading="lazy"></iframe>

As mentioned before, this particular sequence was chosen to show the three algorithms reaching different outcomes.
To see how often each outcome happens, we need many sequences.

### 5,000 Fair Coin Sequences

We now generate 5,000 fair coin sequences, each with a budget of up to 1,500 tosses, and run all three algorithms on every one of them.
The figure below shows the resulting decision rates as the tosses accumulate.
As with the p-value figure earlier, the rates are cumulative: once a sequence stops, its verdict is carried forward to every later toss.
Since the coin is fair, accepting the null is the correct outcome and every rejection is a false one.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/09-three-algorithm-rates.png" alt="Three panels of cumulative decision rates over 1,500 tosses for 5,000 fair coins. HDI+ROPE: rejections level off near 6% early on, acceptances rise from about 380 tosses to over 90%. Precision is the Goal: a single step at about 600 tosses to under 40% accepted, the rest inconclusive, no rejections. Decisive Precision is the Goal: no rejections, acceptances jump at about 600 tosses and keep rising to about 98%" width="750">
</div>

*Cumulative decision rates for 5,000 fair coin sequences under each stopping algorithm. At every toss count the shares that have accepted the null (green solid), rejected it (red dashed) or are still inconclusive (gray dot-dashed) sum to 100%. Since the coin is fair, every rejection is a false one.*

**HDI+ROPE (left).** The red line climbs early, well before 250 tosses, and levels off at about 6% of the sequences,
fair coins wrongly rejected on an early lucky streak.[^asymptote]
The green line, meanwhile, only starts at about 380 tosses.
That is no coincidence: it is roughly when the HDI first becomes narrower than the ROPE,
and as we saw earlier, an HDI wider than the ROPE can never accept.
From then on the acceptances climb steadily.

**Precision is the Goal (middle).** Nothing at all happens until about 600 tosses,
where nearly every sequence meets the precision goal at once.
As we'll see shortly, where this step falls can be predicted in advance.
At the step just under 40% of the sequences accept and the rest are left inconclusive, where they stay, since PitG has stopped.[^sensitivity]
And there are no false rejections at all.[^symmetry]

**Decisive Precision is the Goal (right).** DPitG inherits PitG's zero false rejections and its start at about 600 tosses,
where again just under 40% accept straight away.
But rather than stopping inconclusive, the rest keep collecting, and the acceptances keep climbing,
to about 98% by the end of the budget.[^budget]
The price is modest: the median DPitG sequence stops after 627 tosses, compared with 599 for PitG, or about 5% more data.

In short, on a fair coin HDI+ROPE is decisive but sometimes wrong, PitG is never wrong but often says nothing,
and DPitG is both decisive and right, for a little more data.

[^asymptote]: Unlike the p-value's, this false rejection rate levels off. That isn't the ROPE's doing alone: Kruschke shows that stopping on Bayes Factors levels off too, albeit at just over 20% (see the [preprint's appendix on Bayes Factors](https://arxiv.org/html/2608.05301v1#A6){:target="_blank"}). What both have, and the p-value lacks, is a way to accept the null: every sequence that is accepted stops, and so leaves the pool of those still at risk of a false rejection.

[^sensitivity]: The exact split depends on the settings, in particular on how narrow the precision goal is relative to the ROPE. At the extreme of $\omega_{\rm goal}=\omega_{\rm ROPE}$ <!-- medium: ωgoal=ωROPE --> PitG is never conclusive, whereas DPitG stays at about 98%. See the [preprint's sensitivity analysis](https://arxiv.org/html/2608.05301v1#S3.SS1.SSS3){:target="_blank"}.

[^symmetry]: The zero false rejection rate of the precision-based methods is partly thanks to the perfect symmetry of the fair coin. In the preprint I show that they do make some false rejections when the true value sits close to a ROPE boundary. See the [preprint's general trends section](https://arxiv.org/html/2608.05301v1#S3.SS2){:target="_blank"}.

[^budget]: The inconclusive line is still falling at 1,500 tosses, so a larger budget would leave even fewer sequences inconclusive. In the preprint DPitG's conclusiveness turns out to be more sensitive to the budget than to the precision goal.


<!-- TO EXPLORE: slide 14 ("Planning calculator") of the DPitG 20-minute talk, as an in-browser
     N_goal calculator for this section (no Streamlit, so nothing to fall asleep). Same approach as
     three-rules-sim.html. May fit the companion post better. -->

## 💰 The Cost of Precision

Look back at the PitG and DPitG panels: both jump at about 600 tosses.
That step is no accident.
Because the width of the HDI barely depends on the luck of the draw, the sample size at which it reaches
the precision goal, $N_{\rm goal}$ <!-- medium: Ngoal -->, can be predicted before collecting any data:

$$N_{\rm goal} \approx \frac{4 z_*^2}{\omega_{\rm goal}^2} V(\theta)$$
<!-- medium: use 10-planning-formula.png (Ngoal ≈ 4z*² V(θ) / ωgoal²) -->

Besides the precision goal, it has two ingredients:

* $z_*$ <!-- medium: z* --> sets the credibility level: about 1.96 for a 95% HDI. Asking for more credibility widens the HDI, and so takes more data.
* $V(\theta)$ <!-- medium: V(θ) --> is the noise of a single observation, the *aleatoric* uncertainty that no amount of data removes. For a coin it is $V(\theta)=\theta(1-\theta)$ <!-- medium: V(θ)=θ(1−θ) -->.

For our fair coin and $\omega_{\rm goal}=0.08$ <!-- medium: ωgoal=0.08 --> this gives $N_{\rm goal} \approx 600$ <!-- medium: Ngoal ≈ 600 -->, right where the step is.
Two implications follow:

* **Precision is expensive.** $N_{\rm goal}$ <!-- medium: Ngoal --> grows with the inverse square of the goal, so halving $\omega_{\rm goal}$ <!-- medium: ωgoal --> roughly quadruples the data. This is the same $1/\sqrt{N}$ <!-- medium: 1/√N --> law we met with Shaq's free throws, read in reverse.
* **The fair coin is the worst case.** For binary data $V(\theta)$ <!-- medium: V(θ) --> is largest at $\theta=0.5$ <!-- medium: θ=0.5 -->, so planning with a 50/50 split gives an upper bound that covers the hardest scenario.

For DPitG, $N_{\rm goal}$ <!-- medium: Ngoal --> is a floor rather than the expected stop.
It can never stop before the precision goal is met, and the sequences whose HDI still straddles the ROPE keep going.
On our fair coin the median DPitG sequence stopped about 5% after $N_{\rm goal}$ <!-- medium: Ngoal -->.[^premium]

[^premium]: That 5% holds for our setting of $\omega_{\rm goal}=0.8\,\omega_{\rm ROPE}$ <!-- medium: ωgoal=0.8·ωROPE -->. In the [preprint's sensitivity analysis](https://arxiv.org/html/2608.05301v1#S3.SS1.SSS3){:target="_blank"} the premium is zero for tighter goals and rises to about 40% when the goal equals the ROPE width, while $N_{\rm goal}$ <!-- medium: Ngoal --> itself changes with the goal.

How $N_{\rm goal}$ <!-- medium: Ngoal --> varies with the goal and with the true value is in the ⚔️ planning formula section below,
and using it to plan a study before any data is collected is the focus of the companion post.

Everything in this post used single-group binary data, but the same logic extends to continuous data
and to comparisons between groups, where what changes is mostly $V$ <!-- medium: V -->.
The preprint derives these extensions, although, unlike the coin, they have not yet been put through
large-scale simulations (see the ⚔️ section on other data types below).
The companion calculator below lets you try them on your own numbers.

## When Precision is Worth Using

Asking for precision before a verdict costs data. So when is it worth paying for?

### A Stopping Rule, or a Planning Tool

It depends mostly on how expensive the data is, which gives the method two complementary roles.

**As a stopping rule**, it is best suited to settings where data is relatively cheap and the budget comfortably
exceeds $N_{\rm goal}$ <!-- medium: Ngoal -->:
large-scale A/B testing, opinion polling and automated quality-control pipelines are typical examples.
For A/B testers there is a bonus: unlike frequentist sequential designs, it needs no correction for how often
you peek, nor for running many tests in parallel (see the ⚔️ section on multiple comparisons below).

**As a planning tool**, it is useful even where data is expensive and $N_{\rm goal}$ <!-- medium: Ngoal --> may be out of reach:
longitudinal studies, clinical trials, costly policy evaluations.
Here the precision goal makes explicit what precision the budget can actually buy, and so what conclusions
the data can and cannot support.
That works both before collection begins and after it ends, to audit the precision of a completed study.
This is the focus of the companion post.

### Precision Is Honesty

The most common objection to Precision is the Goal is that it asks for too much data.
John Kruschke has observed that this is the worry he hears most often,
and that it usually stems from optimism: people overestimate how precise their measurements are,
and so are surprised by how much data a given precision takes.
In his words, "people are often shocked by the amount of noise in their data."[^kruschke_comm]
His advice is to be realistic about the precision one can hope to achieve, and to set the goal accordingly.

[^kruschke_comm]: Personal communication, 2022.

Arguably, the demand for data is not a flaw of the method but a form of honesty.
An imprecise posterior is inconclusive whatever algorithm you run on it.
Precision is the Goal simply refuses to pretend otherwise: rather than masking too little data behind a false rejection,
or quietly stopping with nothing to say, it holds off on a verdict until the posterior is genuinely informative.

### Precision IRL

🗳️ Finally, if the idea of choosing a sample size for its precision still sounds exotic, you have probably met it already.
A poll reported with a margin of error of ±3 points has a 95% interval about 6 points wide, and pollsters size their samples
to hit that width, before knowing any of the answers.
For a question split close to 50/50 that takes roughly 1,070 respondents, which is no coincidence: it is the same number
that a precision goal of $\omega_{\rm goal}=0.06$ <!-- medium: ωgoal=0.06 --> requires for our fair coin.
Pollsters, in other words, have been planning for precision all along.


## 🚗 Are We There Yet? Test Your Own Data for Precision

Pollsters have their margin-of-error tables. For everyone else, there is still the question this post opened with:
"Have we collected enough data yet?"
To help answer it for your own experiments there is a companion calculator that I created
for my own use which I call ``*Are We There Yet?*".

It has two modes:

* 🔍 **Retrospective, "I have data, is it enough?"** Enter the data collected so far and it tells you whether the precision goal is met and what the decision rule says, or whether to keep collecting, and how much. Re-enter it each time new data arrives and you are running the sequential test described in this post.
* 📐 **Prospective, "I'm planning a study."** Before any data is collected, it estimates $N_{\rm goal}$ <!-- medium: Ngoal -->, the sample size your precision goal will take. Planning a study this way is the focus of the companion post.

It handles binary and continuous data, for a single group or a comparison between two groups, as well as categorical data in retrospective mode.
There is no need to upload raw data, only summary numbers: counts of successes and failures for binary data,
or the mean, standard deviation and sample size for continuous data.
In return, it assumes that the data follows standard closed-form models.[^calc_models]

What it can't do is decide for you what counts as meaningful.
Before any verdict, it asks for a ROPE and a precision goal, and choosing them takes some thought.
That effort is the point: settling what "close enough" means before the result is in is what keeps the verdict honest.
For help, the 🧭 *Help me choose ROPE & Precision Goal* guide walks through a few short questions,
with presets for popular domains such as e-commerce conversion, clinical trials and election polling.

<!-- COMPANION POST idea: a subsection "### The Homework: Choosing a ROPE and a Precision Goal",
     walking through the 🧭 guide step by step (smallest meaningful effect → ROPE; precision as a
     % of the ROPE width → ωgoal; sample-size preview) with one or two domain presets as examples. -->

You can use it online at [r-w-t-y.streamlit.app](https://r-w-t-y.streamlit.app/){:target="_blank"},
or clone [the repository](https://github.com/elzurdo/are-we-there-yet){:target="_blank"} and run it locally.

[^calc_models]: Beta posteriors for binary data and Student-t posteriors for continuous data. Comparisons between two groups use a normal (CLT) approximation for binary data and Welch's unequal-variances approach for continuous data. In planning-formula terms, this is $V(\theta)$ <!-- medium: V(θ) --> taking a different form for each data type.

<div style="text-align:center">
    <a href="https://r-w-t-y.streamlit.app/" target="_blank"><img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/00-streamlit-calculator.png" alt="Home screen of the Are We There Yet? calculator: choose prospective or retrospective mode, binary or continuous data, and single group or between groups" width="560"></a>
</div>

*Click through to the live calculator at [https://r-w-t-y.streamlit.app/](https://r-w-t-y.streamlit.app/){:target="_blank"}*

<!-- Alternative to the screenshot above: embed the calculator live. Free Streamlit apps sleep
     when idle, so a visitor may land on a wake-up screen rather than the calculator.
-->

<iframe src="https://r-w-t-y.streamlit.app/?embed=true" width="100%" height="630" frameborder="0" scrolling="no"></iframe>

## Summary

[Thesis in one sentence, then what was covered, then the reader's next step:]


- [Bayesian testing lets you accept the null, not just fail to reject it]
- [PitG keeps effect size in the loop at both stages, and stops on precision rather than on verdict]
- [DPitG keeps PitG's low error rates, is highly conclusive, and costs little more]
- [Demonstrated on coin tosses; generalises to continuous data and between-group comparisons]
- [A closed-form formula makes it work prospectively and retrospectively, not just sequentially]

> My favourite word in English is pROPEr, and you can't spell it without ROPE ...

---

# ⚔️ Supplementary Sections

[TK: For the mathematically inclined ⚔️ I also provide supplementary sections
with short deep dives after the summary. (Note: These are not required to appreciate the main points
of the article.) Everything below exists already in the preprint; this is
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


## ⚔️ Choosing a ROPE in Practice

[`appendix_practical_guidance.tex`. Domain standards first: the minimal clinically important difference (MCID) in medicine, the 80–125% bioequivalence margins for generic drugs. When no standard exists, robustness checks across a range of ROPE widths.]


## ⚔️ The Planning Formula

[The formula, z* and V(θ), the two implications and the DPitG floor now live in 💰 The Cost of
Precision. What stays here: how $N_{\rm goal}$ <!-- medium: Ngoal --> varies with θ and the goal
(figure below), the caveat that the normal approximation can underestimate N for small samples or
skewed likelihoods (exact Binomial result in the preprint's Appendix C), and a pointer to the
derivation. This is the bridge to the companion post.]

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/11-planning-formula-validation.png" alt="Expected sample size for varying precision goals" width="700">
</div>

*[CAPTION NEEDED — two things to call out: more precision (smaller ωgoal) needs more data, and the fair coin is the worst case because its variance is highest.]*

## ⚔️ Sensitivity to the Precision Goal and the Budget

[Old draft lines 417–431 plus `appendix_trends_detail.tex`. The key practical finding: conclusiveness
is more sensitive to $N_{max}$ <!-- medium: Nmax --> than to ωgoal, so setting the budget generously
is the main lever. Also: generalising to loaded coins, and how Ngoal varies with the true value.]

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
