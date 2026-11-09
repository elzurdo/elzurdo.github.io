---
layout: post
title: "🛑️⚖️ Don't Stop 'til You Get Enough — Reintroducing the “Precision is the Goal” Stopping Criterion"
---

<!-- Useful unicode: ω, Δ, θ -->

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

Perhaps the best way to understand the HDI+ROPE decision rule is by the following illustration:


<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/conclusive_outcomes.png" alt="Three Conclusive HDI+ROPE scenarios" width="700">
</div>

*The curves are posteriors where the vertical lines in each are the HDI borders.The gray boxes are the ROPEs around the null hypothesis value. In the left/right panels the HDI is outside left/right of the ROPE so the null hypothesis is rejected. In the center the HDI is completely within the ROPE so the null hypothesis is accepted.*

For the HDI+ROPE decision rule to reject the null hypothesis the HDI is required to
be completely **outside** of the ROPE as the left and right panels. To accept the null the HDI is required to be
completely **inside** the ROPE as in the middle panel.

This figure illustrates the three scenarios where HDI+ROPE decision
rule results in a conclusive outcome. Let's examine the another three where it results
in an inconclusive outcome and how to act on indecisiveness.

### Inconclusive Outcomes

Whereas the three scenarios above may be considered *Conclusive* results the following
are when the HDI straddles the ROPE boundaries may be considered *Inconclusive*:



<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/inconclusive_outcomes.png" alt="Three Conclusive HDI+ROPE scenarios" width="700">
</div>

*Similar to above but the HDI straddles the ROPE boundaries.*


The action following an inconclusive results depends on the experiement budget. If one
can collect more data points, it might be worth further reducing uncertainty.
If the experiment budget is drained, one must conduct a risk assessment, which is
domain specific and beyond the scope of this post. [TK: create footnote to mentioned that the calculator addresses this]
Below we go further into detail on acting on inconclusive outcomes with extra budget.

### Applying the HDI+ROPE Decision to a Fair Coin Sequence

To further appreciate the point of in/conclusiveness in sequential hypothesis
let's examine a set of consecutive fair coin tosses. Instead of the M=200 of before
we will now focus on a randomly generated but hand picked sequence [TK: footnoe with link to the actual sequence] that is useful
to explain differences of outcomes as a function of the stop iteration.

For our purposes we will define the ROPE region as [0.45, 0.55] and explore the HDI+ROPE
decision in three different scenarios.

The PDF at iteration n=126 is shown below where the HDI sits fully outside the ROPE,
where the HDI region is clearly outside of the ROPE.
The HDI+ROPE decision 


<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/04-coupling-problem.png" alt="HDI fully outside the ROPE at iteration 126" width="700">
</div>

*[CAPTION NEEDED — state the claim: at N=126 the HDI is fully outside the ROPE, so a coupled algorithm stops and rejects a coin we know to be fair.]*

That means that the HDI+ROPE decision algorithm will incorrectly reject what we know
to be a fair coin. We will later discuss false rejection rates, but for now show that
if pieked later, say at iteration 598 we obtain the following posterior that straddles
the ROPE:


<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/05-pitg-algorithm.png" alt="PitG stopping rule met at iteration 598" width="700">
</div>

*[CAPTION NEEDED — state the claim: PitG ignores the verdict and keeps collecting until the HDI is narrow enough, reaching ωGoal at iteration 598.]*

Given extra budget the experiment should continue until the HDI is completely within
or outside of the ROPE. This happens at iteration 804 as seen here:


<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/07-dpitg-stop.png" alt="DPitG stops at iteration 804" width="700">
</div>

*[CAPTION NEEDED — state the claim: DPitG carries on past 598 and stops at 804, where the HDI is both narrow enough and fully inside the ROPE, accepting the null.]*

These iteration value were not randomly chosen but rather represent stop iterations
for three different stopping algorithms which is the focus of this post.

## Three Stopping Algorithms

So far we have discussed how to use the relative location information of the HDI and
ROPE heuristics to determine an outcome when looking at the data. Now we focus
on the key aspect of sequential hypothesis testing which is when to dedice to look.

### 🛑 HDI + ROPE Coupled as a Stopping and Decision Criteria

The HDI+ROPE stopping algorithm, similar to that of NHST and Bayes Factor, conflates
both the stopping and decision rules into the same criterion.

That means that once the HDI is fully outside (or inside) the ROPE we will stop collrecting
data and reject (or accept) the null hypothesis.

In the handpicked fair coin sample we've seen this actually in action stopping at iteration
126 and incorrectly rejecting the null hypothesis 🤥. [TK: Reference to relevant pdf figure]

How representative is this false rejection rate?
Testing on M=5,000 sequences we find this to happen 6.3% of the time. [TK: footnote mention that this is a function of Nmax=30.
a lower value will yield higher false rejection rates, where higher limit would yield lower rates]

The key problem, as mentioned before, is the dual usage of the heuristic. Next we will
see how to use the HDI width, regardless of its location, as an independent measure
to substantially reduce this confirmation bias.

### 🛑 Precision is the Goal

One way to decouple the stopping and decision criteria is by setting the parameter precision
as the stopping goal. John Kruskche demonstrated that by predetermining a minimum
width for the HDI as a stopping criterion we can substnatilly reduce the risk of peeking
too early and hence minimise confirmation bias as well as obtain more accurate sample values at the stopping iteration.

By setting a precision goal of $\omega_{\rm Goal}$ comparing the HDI width $\omega_{\rm HDI}$
to it the stopping rule becomes:
* $\omega_{\rm HDI} \le \omega_{\rm Goal}$: criterion met - stop and decide
* $\omega_{\rm HDI} \gt \omega_{\rm Goal}$: not met - continue collecting (or conduct risk assessment to decide.)

The key difference in sequential hypothesis testing is that in this
*Precision is the Goal* method the analysts examines the width of the parameter posterior.
This is in contrast to the standard methods 
(NHST, Bayes Factor as well as HDI+ROPE) which monitor only the location information. 

In the fair coin case Kruskche demonstrated that 1,000 experiment sequences resulted
in zero false rejections. Below I display this by analysing 5,000 sequences.
In addition he has shown that the sample parameter at the stop iteration is much more accurate
for loaded coins as confirmation bias is impacted by extereme results. [TK: This is beyond of the scope of this article
but may be found ...]

#### 🤷 Precision Isn't Enough

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
the DPitG stoping rule is effectively a hybrid by coservatibely coupling those of PitG and the HDI+ROPE
in an AND relationship.

We next briefly explore their performance for the fair coin test demonstrating the
advantages of going from one to another.

## Revisiting the Fair Coin Test

To understand the differences between these stopping algorithms it's instructive to examine
both a specific case as well as trends in large samples.

We start by reexamining the hand picked sequence from before. The following image
shows its first 1,500 results where the gray band represents the 95% HDI credible interval
at each point and we highlight iterations of interest. In particular we highlight with green vertical
lines when the HDI is conclusively inside the ROPE (horizontal dashed orange lines) or outside of it (red).
We also highlight with purple dots when the precision goal, set at $\omega_{\rm Goal}=0.08$ is met.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/handpicked_sequence_stats_dpi350.png" alt="Decision statistics for the three algorithms" width="750">
</div>

We see at iteration 126 that the HDI is completely outside the ROPE. This is the case
in which the HDI+ROPE stopping rule decides incorrectly to rejects the null hypothesis
of a fair coin due to an outlier sampling. 
If we abide to the Precision is the Goal mechanism we have to wait until iteration 598.
As previously seen the HDI straddles the ROPE and hence renders inconclusive. DPitG
continuese sampling until at iteration 824 both conditions are met and correctly accepts
the null hypothesis.

As mentioned before, this particular sequence, even though randomly generated, has been 
chosen specifically to demonstrate the possibility of the three algorithms resulting in
different outcomes.

We next generate at total of M=5,000 sequences of length 1,500 and quantify, as before,
the decision rates and compare the three algorithms.



[THE THREE NUMBERS, stated plainly: 2.2% inconclusive (down from 62.1%), zero false positives,
median +4.7% data. The 11-scenario catalogue goes to ⚔️.]

*[CAPTION NEEDED — DPitG is a hybrid: PitG's precision criterion, then HDI+ROPE's conclusiveness criterion.]*

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/09-three-algorithm-rates.png" alt="Decision statistics for the three algorithms" width="750">
</div>

*[CAPTION NEEDED — this figure carries the central claim; it needs a caption more than any other.]*

[One scope fence: p-values and Bayes Factors aren't in this comparison because their decision
heuristic is different — see ⚔️.]


Regarding the conclusive outcomes, its worth pausing to address the question of 
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


<!-- TK: for companion paper when we discuss preplanning. This is not only a laboratory concern. It is one of the quieter engines behind the *replication crisis*, where a great many published findings fail to reappear when somebody runs the study again: when the Open Science Collaboration repeated one hundred psychology experiments in 2015, only about a third came back with the original result. -->

Two things are needed to avoid these false alarms. The first is to fix a minimum meaningful effect size in advance and actually hold to it, which is also what lets us accept a null hypothesis rather than merely fail to reject it. The second, which turns out to matter just as much, is to stop collecting data for a reason that has nothing to do with the verdict. 

The second asks us to stop without consulting the result, which sounds like a strange way to run an experiment. Neither, though, can even be stated until we have a way of describing what the data supports at any given moment. 

<!-- THIS SHOULD GO IN THE COMPANION PAPER: A stopping rule that doubles as a verdict is worth sitting with, because it is one of the quieter engines behind the *replication crisis*. The crisis is the discovery, across psychology, medicine and economics, that a great many published findings simply do not reappear when somebody runs the study again. When the Open Science Collaboration repeated one hundred well-known psychology experiments in 2015, only about a third came back with the original result.

The terms of art for how this happens are *p-hacking* and *HARKing* (hypothesising after the results are known), and both sound like accusations of dishonesty. Mostly they are not. Mostly they are a competent person looking at a dashboard, seeing a result, and stopping, which is exactly what the dashboard was built to let them do. -->



 





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

> My favourite word in English is pROPEr, and you can't spell it without ROPE ...

## 🧮 A Companion: The Calculator

[One short paragraph. The closed-form $N_{Goal}$ means this isn't only a sequential method — it also
plans prospectively and audits retrospectively, and that is what the calculator does. A companion
post, not a series: no "you are here" marker, no part numbers.



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
