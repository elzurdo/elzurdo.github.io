---
layout: post
title: "🛑⚖️ Don't Stop 'til You Get Enough — Reintroducing the “Precision is the Goal” Stopping Criterion, and Making It Decisive"
---

<!-- Useful unicode: ω, Δ, θ, ≈ -->

<!-- Notes:
* analysts don't always know what they want at first
* N is never enough .... 
* The concept where "the rules are creaetd by the body that doesn't use the rules" (e.g as in Sortism)
-->



<!-- ===========================================================================
     CONTEXT FOR EDITING (not rendered)

     TARGET READER: someone running A/B tests or hypothesis tests who may not fully understand the
     stopping rule they are already using.

     SECOND AUDIENCE: readers already fluent in Bayesian testing. The short appendices after the
     summary and the preprint links are for them; the main thread never slows for them.

     FINISHED-DRAFT CHECKPOINT: could the target reader write Dirk Nachbar's ~200-word summary
     (linked in Resources) after reading this?

     HERO: Kruschke's PitG is the core idea; DPitG is this post's own tweak, presented modestly.

     Each LaTeX expression carries its unicode twin in an adjacent
     <!- - medium: … - -> comment, for regenerating the Medium version.
     =========================================================================== -->

<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="zurdo" data-description="Support me on Buy me a coffee!" data-message="Buy me a slice of pizza! 🍕" data-color="#40DCA5" data-position="Right" data-x_margin="18" data-y_margin="18"></script>

#### Know when you have enough data, and when a null result is a real finding. Interactive simulations and a calculator included. 🕹️🧮

> “How much data is required?”

This is one of the most common questions in hypothesis and A/B testing, and it can be asked at two different moments.

Before any data is collected, it is a planning question. The standard answer is a *power analysis*: supply a minimum effect size and how often you are willing to be wrong in each direction, and out comes a sample size. It is a sensible place to start. But what if the true effect is much stronger than you assumed, and you could have stopped weeks earlier? Or what if, halfway through a clinical trial, a treatment shows signs of doing harm?

The more flexible alternative is to check as the data arrives, known as *sequential hypothesis testing*, or sequential testing for short. It asks a different question:

> “Have we collected enough data yet?”

As tempting as sequential hypothesis testing is, it has a well-known failure mode. Peek often enough, and sooner or later an early, unrepresentative stretch of data will meet the stopping rule. In most standard methods that same rule also decides the verdict, so the experiment stops precisely when the data happen to look most convincing. The result is a form of *confirmation bias*: the data appear to confirm a finding that is really just a lucky fluctuation, and no ill intent is needed for it to happen. Why this happens is well understood, and it can be corrected for.

That correction is the focus of this post: a rule that tells you when you can confidently stop an experiment already under way.
A welcome side effect is that error rates stay low, and when there truly is no meaningful difference, you can say so,
accepting the null hypothesis with near-zero false rejections.
A companion post will show that the same machinery also works before a study starts, to plan how much data to collect in the first place.

<!-- READER CONTRACT. -->

This post is for anyone who runs experiments and has to decide both when to stop them and how to interpret the result: A/B testers, analysts, data scientists, researchers, and anyone who has ever stared at a dashboard wondering whether today is the day to call it.

No prior knowledge of Bayesian statistics is required, just a basic understanding of probabilities. If you have a rough idea of what a p-value is, you already know more than enough. (If you don't, that's fine too — and it may save you some unlearning.)


By the end you will be able to:

- 🛑⚖️ **Tell stopping apart from deciding**, and see why using one rule for both turns lucky streaks into false verdicts, even with Bayesian tools.
- 📏 **Quantify what counts as "close enough"** to the null hypothesis, and hold to it, rather than letting the effect size you planned around be quietly forgotten between the planning meeting and the write-up.
- ✅ **Accept the null hypothesis**, instead of awkwardly failing to reject it, whenever "no meaningful difference" is the finding you actually need.
- 🎯 **Stop on precision rather than on the verdict**, using John Kruschke's *Precision is the Goal*, plus a small tweak of mine that makes it reliably conclusive.
- 💰 **See why precision costs data, and check whether you have enough**, and if not, how much more you need; the companion post takes this further into full study planning.

Along the way you can play with two interactive simulations 🕹️ and try a calculator on your own data 🧮.

If you are already comfortable with posteriors, HDIs and ROPEs, the main thread will feel slow in places, and the short appendices after the summary go a little further.

For the full technical treatment, I have also written this up as an arXiv preprint. You won't need it to follow along, but it is there as a reference for the finer details.

[![arXiv](https://img.shields.io/badge/arXiv-2608.05301-b31b1b?logo=arxiv&logoColor=white)](https://arxiv.org/abs/2608.05301v1){:target="_blank"}

### 🎬 Prelude: What I'm Talking About When I Talk About Accepting the Null

Most of us learned hypothesis testing as a hunt for differences.
Before we look at how experiments end in practice, let's add a tool that's often missing from the kit:
a way to conclude that there is no difference worth acting on.
Sometimes that is exactly the finding you need:

* 💻 **Do no harm.** A new release, a refactor, cheaper infrastructure or an updated model should not hurt a key metric such as conversion, latency or accuracy.
* 💊 **Generic drugs.** A generic must be shown to work like the brand-name drug, within margins set by regulators.
* 📋 **Futility.** A programme or trial is stopped once it is clear that its effect, if any, is too small to be worth pursuing.

A standard significance test cannot deliver this.
It can only reject the null hypothesis or, awkwardly, "not reject" it, and not rejecting may simply mean too little data:
absence of evidence is not evidence of absence.[^tost]
To conclude that there is no difference *worth acting on*, rather than none at all, you first need to decide what counts as "close enough".
And as we'll see, that same decision also changes when you can safely stop collecting data.

[^tost]: Frequentist statistics does have a way to show equivalence, the Two One-Sided Tests (TOST) procedure, which, like the approach in this post, needs an equivalence margin fixed in advance. Bayes Factors can also favour the null, but usually a point null of no effect at all, weighed against a specific alternative, rather than a practical margin (see the [appendix on Bayes Factors](#appendix-bayes-factors-and-why-theyre-not-in-the-comparison)). What the precision-based approach in this post adds is a design built for looking as the data arrives: its stopping rule never consults the verdict, so there is no need to correct for the number of looks, as sequential frequentist designs must. It also delivers accept, reject or inconclusive within one framework, as a direct probability statement about the parameter. See the [preprint's practical guidance appendix](https://arxiv.org/html/2608.05301v1#A7){:target="_blank"}.

## How Experiments Actually End

How did your last experiment actually end?

In large-scale A/B testing, results are typically watched as they come in, and a test is stopped once a *heuristic*,
such as a p-value, a confidence interval or a Bayes Factor, crosses a predetermined threshold.[^johari]

[^johari]: Continuous monitoring is standard practice in industry A/B testing. Johari, Koomen, Pekelis and Walsh build their method around it in [*Always Valid Inference: Continuous Monitoring of A/B Tests*](https://doi.org/10.1287/opre.2021.2135){:target="_blank"} (Operations Research, 2022), noting that A/B tests are typically analysed with p-values and confidence intervals, yet "these inferences are wholly unreliable if users endogenously choose sample sizes by continuously monitoring their tests".

Scientific research mostly runs the other way round.[^simmons] The sample size is fixed in advance, usually by a power analysis, and the study runs to the end. Its characteristic failure arrives later, once the data is in: the minimum effect size that went into the planning calculation appears nowhere in the heuristics that are reported, so it quietly drops out of the conclusion.[^asa] That second failure is the subject of the companion post. This one is about the first: continuous monitoring.

[^simmons]: Mostly, but not always: researchers peek too. Simmons, Nelson and Simonsohn showed in [*False-Positive Psychology*](https://doi.org/10.1177/0956797611417632){:target="_blank"} (Psychological Science, 2011) that starting with 10 observations per condition and testing after every new one finds a "significant" effect 22% of the time when there is nothing there.

[^asa]: The American Statistical Association's [statement on p-values](https://doi.org/10.1080/00031305.2016.1154108){:target="_blank"} (Wasserstein and Lazar, The American Statistician, 2016) is explicit on this: a p-value does not measure the size of an effect or the importance of a result.

### One Heuristic, Two Jobs

The most popular heuristic by far is the *p-value*, from the *Null Hypothesis Significance Testing* framework (*NHST*).
Briefly, the p-value quantifies how surprising the data would be if the null hypothesis were true.

Used as a stopping rule in sequential testing, it means recalculating the p-value as the data comes in,
until it falls below an agreed threshold, usually 0.05 and sometimes stricter.
That same threshold is also the *decision rule*: once the p-value is below it, the null hypothesis is rejected.
The same is true of other heuristics, such as Bayes Factors: the thresholds differ, but stopping and deciding remain one and the same.

In other words, the heuristic that signals when to stop collecting data is the same one that delivers the verdict.
The experimenter stops because the result has turned "statistically significant",
and many will unwittingly conclude that it is also *meaningful*.

### "Statistically Significant" Does Not Imply Meaningful

A common misconception is to confuse "statistical significance" with a meaningful outcome.
A p-value below the threshold says only that the data would be unlikely if the null hypothesis were true.
It says nothing about whether the difference is large enough to matter.

Think of a researcher asking whether a therapeutic works differently for men and women, who finds it beneficial in 72.1% of one group and 72.3% of the other.
With enough patients, even that 0.2 percentage point gap will become "statistically significant", whether judged by a p-value or a Bayes Factor.
In practice, however, no clinician would prescribe differently because of it.
Why does a gap that small cross the threshold? With more data the estimate becomes ever more precise,
so even a tiny but real departure from the null eventually produces a p-value below the threshold.
You'll be able to see this for yourself in the explorer further down, with its *p-value rejects, ROPE accepts* button.

The key takeaway is that a deviation from the null hypothesis should be large enough to justify acting on it, for example by changing the status quo.

Tiny real effects are one way a p-value can mislead. Repeated looking is another, and it misleads even when there is no effect at all,
as the simplest sequential hypothesis test shows: a fair coin toss.

### NHST Catastrophically Fails the Fair Coin Test

*[Title options to choose from: "Peeking at P-Values: The Fair Coin Test" · "The Fair Coin Test: Where Peeking Goes Wrong" · "Peek Long Enough, and a Fair Coin Looks Loaded" · "A Fair Coin, an Impatient Analyst, and the P-Value"]*

The beauty of tossing a virtual fair coin is that we know the ground truth, which makes it a useful testbed for any hypothesis-testing mechanism, sequential or otherwise.
For a fair coin, the null hypothesis that it is fair should be accepted; for a heavily loaded coin, the same null hypothesis should be rejected.

The first limitation of NHST shows up straight away: the p-value carries no information for accepting the null
(for details see the [appendix on why p-values cannot accept the null](#appendix-why-p-values-cannot-accept-the-null-hypothesis)).
For a fair coin, the best it can offer is the awkward double negative of "not rejecting" it.
We will later meet Bayesian mechanisms that can accept the null.

But even if we settle for NHST's ability to reject, it fails the sequential fair coin test badly.
To see this, we simulated 200 fair coin sequences of 30,000 tosses each, and peeked at the p-value after every toss:

* If p < 0.05, we stop collecting data and reject the null hypothesis, incorrectly, since the coin is fair.
* If p ≥ 0.05, we do not reject it (an inconclusive outcome) and toss again.

<!-- TODO (Eyal): consider regenerating 02-pvalue-decision-rates.png with peeking only from N_min = 30, to match the HDI+ROPE setup later in the post. The current figure peeks from the first toss. -->

How often should we expect to wrongly reject a fair coin?
Naïvely, 5% of the time, as per the threshold.
That is true for a single look. But every look is another chance for a random fluctuation to dip below 0.05, and over many looks those chances add up.

The figure below shows the cumulative decision rates as the tosses accumulate: rejections in red and non-rejections in gray, summing to 100% at every point.
Once a sequence is rejected it stops, so its rejection is carried forward to every later toss.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/02-pvalue-decision-rates.png" alt="Cumulative decision rates for 200 fair coin sequences using p-values: false rejections climb from near zero to over 60% by 30,000 tosses, far above the 5% threshold line" width="700">
</div>

*Cumulative decision rates for 200 fair coin sequences when the p-value is used both to stop and to decide (note the logarithmic x-axis). The dash-dotted line marks the nominal 5% false positive rate. The code is in [this notebook](https://github.com/elzurdo/dpitg/blob/main/notebooks/nhst_fair_coin_experiments.ipynb){:target="_blank"}.*

The false rejection rate, otherwise known as the *false positive rate*, climbs far past the nominal 5%:
to about 20% within the first hundred tosses, and to over 60% by 30,000. And it keeps climbing.
Under a true null hypothesis the p-value wanders between 0 and 1 as tosses accumulate, and given enough looks it eventually wanders below any threshold.

John Kruschke, author of *Doing Bayesian Data Analysis*, demonstrated this vividly for the fair coin, and summed it up with a quip:

> *"With infinite patience, NHST results in 100% false alarms."*

<!-- NOTE (Eyal): the problem long predates Kruschke. Early treatments:
     · Anscombe (1954), "Fixed-Sample-Size Analysis of Sequential Observations", Biometrics, doi:10.2307/3001665
     · Armitage, McPherson & Rowe (1969), "Repeated Significance Tests on Accumulating Data",
       Journal of the Royal Statistical Society Series A, doi:10.2307/2343787, the classic quantification
       of how repeated looks inflate the false positive rate. -->

A natural first fix is a Bayesian heuristic that can accept the null hypothesis, such as the Bayes Factor.
It turns out not to be enough: used both to stop and to decide, it runs into the same confirmation bias.
In Kruschke's fair coin simulations it falsely rejected the null about 20% of the time,
and for a loaded coin with a true rate of 0.65 it falsely accepted the null about 40% of the time, what is known as a *false negative*
(see the [appendix on Bayes Factors](#appendix-bayes-factors-and-why-theyre-not-in-the-comparison)).

The root issue is shared by the p-value and the Bayes Factor alike: the heuristic that decides is also the one that stops.

### 🛑 Gotta Keep 'em Separated ⚖️

The fix is to keep the two jobs apart, by giving each its own heuristic.
Using one heuristic for both is convenient, but it is exactly what lets a statistical fluke through:
given enough looks, a chance fluctuation will eventually cross the line, and the experiment stops right there, with a verdict to match.

It's like letting whichever team happens to be ahead decide when the game ends.
In sport, the end is set by a rule agreed before the game starts, such as the clock in basketball or the target score in volleyball,
however the game happens to be going at any given moment.

The principle, then, is that the stopping rule must never be the verdict alone.
(We'll see later that the two can be recombined, carefully.)
In the approach we'll explore:

* 🛑 **Stopping** depends on how certain we are about the parameter, regardless of where its estimate sits relative to the null.
* ⚖️ **Deciding** depends on where the estimate sits relative to a "close enough" region around the null, agreed in advance.

To make both precise, we first need two key properties of a posterior: its width and its location.

## The HDI: A Posterior's Width and Location

Everything the data tells us about a parameter is held in its
*posterior distribution* $p(\theta \mid {\rm data})$ <!-- medium: p(θ|data) -->: how plausible
each possible value is, given what we have observed so far.
Two of its properties do most of the work in hypothesis testing:

* **Width**: how uncertain we still are. A wide posterior means many values remain plausible, a sign we may not have collected enough data.
* **Location**: where the plausible values sit, which we can compare to the null value.

These map neatly onto the separation above: width will drive the stopping rule, and location the decision rule.

To get a feel for both, let's watch a posterior narrow as data piles up, using one of the
most famous weaknesses in basketball: the free throws of Shaquille O'Neal.
Shaq dominated play close to the basket for nearly 20 years,
but was so unreliable from the line that opposing teams fouled him on purpose, a tactic known as *Hack-a-Shaq*.[^hack]
A free throw either goes in or it doesn't, so it behaves like the toss of a (possibly loaded) coin:
the same binomial data as a conversion in an A/B test, or a defective item coming off a production line.

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

The higher a curve at a given value, the more plausible that value is as Shaq's true, underlying success rate.
<!-- Parked prior footnote, for readers wondering about priors:
[^prior]: The posteriors in this post are Beta(s, f), for s successes and f failures. That corresponds to the improper Haldane prior Beta(0, 0); a flat Beta(1, 1) prior would give Beta(s + 1, f + 1) instead. With hundreds of attempts the difference is negligible. -->

The shaded region is a *credible interval*, the Bayesian counterpart of the frequentist confidence interval,[^ci]
marking where most of the posterior lies. Throughout this post we use 95% of it.
There are several ways of choosing *which* 95%, and we use the *Highest Density Interval* (HDI).
Picture a horizontal waterline slowly lowered from the peak of the curve: the HDI is the stretch between the two points
where the line crosses the curve, at the moment the area beneath it first reaches 95%.
Every value inside the HDI is therefore more plausible than any value outside it.
(See the [preprint's Appendix A](https://arxiv.org/html/2608.05301v1#A1){:target="_blank"} for a formal definition.)

An HDI is summarised by its two boundaries, $\rm HDI_{min}$ and $\rm HDI_{max}$ <!-- medium: HDImin and HDImax -->,
which give its location, and by the distance between them, which gives its width:

$$\omega_{\rm HDI} \equiv {\rm HDI_{max}} - {\rm HDI_{min}}$$ <!-- medium: ωHDI ≡ HDImax − HDImin -->

### Width: More Data, More Certainty

The most striking difference between the two panels is their width:
$\omega_{\rm HDI}=7.1\%$ <!-- medium: ωHDI = 7.1% --> for the single season, against $1.8\%$ <!-- medium: 1.8% --> for the full career.
Roughly fifteen times as many attempts produced a posterior roughly four times narrower.

That is no coincidence: the width shrinks in proportion to $1/\sqrt{N}$ <!-- medium: 1/√N -->, where $N$ is the sample size, and $\sqrt{15} \approx 3.9$ <!-- medium: √15 ≈ 3.9 -->.
This is the precise sense in which more data means more certainty, and it comes with a price tag:
halving the width takes four times the data. We'll return to that price later on.

Note that the width says nothing about *where* the posterior sits, only how sure we are of it.
That is exactly the property a reliable stopping rule needs.

### Location: Where the Plausible Values Sit

The location is read off the HDI boundaries.
For Shaq's 2004/5 season freethrow rate the HDI spans 42.6%–49.7%: given that season's data, there is a 95% probability that his underlying success rate lay within this range.
For his career it spans 51.8%–53.7%.[^seasons]

These numbers invite a question:

> "Was Shaq's free throw ability better or worse than the toss of a fair coin?"

The career panel answers *better*, but only slightly: by about 2.7 percentage points, give or take one.
With 11,252 attempts, though, even a far tinier departure from 50% would have been told apart from it.
The more useful question is:

> "Was Shaq's free throw ability **meaningfully** better or worse than the toss of a fair coin?"

To answer it, we first have to decide what "meaningful" means.

[^hack]: Fouling him gave up two free throws instead of a regular possession, and at his career rate of 52.7% those were worth on average $2 \times 52.7\% \approx 1.05$ <!-- medium: 2 × 52.7% ≈ 1.05 --> points. It was a good trade only if that fell short of what his team would otherwise score, itself a question of what counts as a meaningful difference. <!-- Personal reference, removed as unverified: an earlier draft added that 1.05 points "is roughly what an average NBA possession yielded at the time. Whether the tactic paid off therefore hinged on a few percentage points either side of 50%." -->

[^ci]: The resemblance is only partial. A credible interval is a direct probability statement about the parameter ("95% probability that the true rate lies here"), which a frequentist confidence interval, despite appearances, does not offer.

[^seasons]: Curiously, the two intervals sit on opposite sides of 50%. This is not a contradiction: a single season is not a random sample of a career, and his shooting varied over the years.

## 📏 Quantifying "Close Enough"

If Shaq's underlying rate was $\theta=0.501$ <!-- medium: θ=0.501 -->,
would you consider it **practically** a fair coin toss? How about 0.51? Or 0.53?
At the end of the day this is a subjective call, and that's fine. Part of analysing data is being aware of making such calls, as long as one can justify them.

For argument's sake, let's say that any success rate between 45% and 55% is practically a fair coin toss,
and redraw Shaq's career posterior with these boundaries as a gray band.

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/oneal_career_freethrows_pdf_rope.png" alt="Shaq's career posterior with its HDI sitting entirely inside a gray band from 45% to 55%" width="700">
</div>

*Shaq's career posterior. The gray band marks 45%–55%, the success rates we consider practically a fair coin toss. The HDI (shaded) sits entirely inside it.*

The career HDI, 51.8%–53.7%, sits entirely within the band.
So, for all practical purposes, Shaq's free throw success was like a fair coin toss.
(We chose the band here after seeing the data. In a real experiment the order must be the other way round, as we'll see shortly.)

The same question arises in every experiment: what change is large enough to be worth acting on?
A meaningful effect is one large enough to justify a real-life decision, so which effects qualify depends on the decision.
What we need is a way to state that, and to state it in advance.

### The ROPE: Committing to "Close Enough" in Advance

*[Subheading options to choose from: "ROPE: Drawing the Line Before the Data Arrives" · "The ROPE: Where 'No Difference' Lives" · "Region of Practical Equivalence: Naming What Doesn't Matter" · "ROPE: A Minimum Effect Size You Can Actually Hold To"]*

The gray band has a name: the *Region of Practical Equivalence*, or ROPE.
It is a region around the null value, wide enough to hold every value we would consider no meaningful change.
If the truth sits anywhere inside the ROPE, the honest report is that nothing meaningful happened.
Given its boundaries $\rm ROPE_{min}$ and $\rm ROPE_{max}$ <!-- medium: ROPEmin and ROPEmax -->,
its width is $\omega_{\rm ROPE}\equiv \rm ROPE_{max} - ROPE_{min}$ <!-- medium: ωROPE ≡ ROPEmax − ROPEmin -->.

How wide should the ROPE be? There is no general answer, and that is the whole point:
the width *is* the domain-specific question of what a meaningful minimal effect size is.

Consider a dice manufacturer with two clients.
A board-game publisher such as Hasbro, makers of Monopoly, needs dice fair enough that no player notices a bias.
A casino needs dice fair enough to satisfy a gaming regulator, a far stricter standard.
Testing a batch amounts to rolling and counting sixes, a binomial experiment whose null value is a probability of 1/6 ≈ 16.7%.[^dice]
Same factory, same dice, same test, yet the casino's ROPE around 1/6 has to be much narrower than Hasbro's,
and a batch may be practically fair for one client and not for the other.

[^dice]: Counting sixes checks only one face: a die biased between other faces would pass. A fuller test looks at all six faces at once, for example with a goodness-of-fit test, or by checking how close the entropy of the outcomes is to its maximum of $\log_2 6 \approx 2.585$ <!-- medium: log₂6 ≈ 2.585 --> bits.

So the ROPE boundaries are not computed but chosen, before any data arrives, from what we already know about the domain.
That is the discipline of it: we commit to what counts as a meaningful change while the result is still unknown,
so that the commitment cannot later be shaped by the result it is meant to judge.
(For established ways of choosing a ROPE, see the [appendix on choosing a ROPE in practice](#appendix-choosing-a-rope-in-practice).)

With both the HDI and the ROPE in hand, we can put them together:
first their locations, into a decision rule, and then the HDI's width alone, into a reliable stopping rule.

## ⚖️ The HDI+ROPE Decision Rule

We have already seen one decision in action: Shaq's career HDI sat entirely within the ROPE,
so we concluded that his free throws were, for all practical purposes, a fair coin toss.
Let's generalise.
The *HDI+ROPE decision rule* compares the location of the HDI with that of the ROPE,
and the outcome is either conclusive or inconclusive.

### Conclusive Outcomes

The conclusive outcomes are easiest to see in an illustration:

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/conclusive_outcomes.png" alt="Three conclusive HDI+ROPE scenarios: HDI fully left of the ROPE, fully inside it, and fully right of it" width="700">
</div>

*The three conclusive outcomes. Curves are posteriors, with ticks marking the HDI boundaries; gray boxes are the ROPEs around the null value. Left and right: the HDI is entirely outside the ROPE, so the null is rejected. Centre: the HDI is entirely inside the ROPE, so the null is accepted.*

Two of these outcomes reject the null hypothesis and one accepts it:

* ✅ **Accept the null**: the HDI is completely **inside** the ROPE,
  ${\rm ROPE_{min}} \le {\rm HDI_{min}} \lt {\rm HDI_{max}} \le {\rm ROPE_{max}}$ <!-- medium: ROPEmin ≤ HDImin < HDImax ≤ ROPEmax -->.
* ❌ **Reject the null**: the HDI is completely **outside** the ROPE, on either side,
  ${\rm HDI_{max}} < {\rm ROPE_{min}}$ or ${\rm ROPE_{max}} < {\rm HDI_{min}}$ <!-- medium: HDImax < ROPEmin or ROPEmax < HDImin -->.

Note that accepting the null can be a finding in its own right, rather than a failure to detect something.
This is exactly what the p-value could not offer.

### Inconclusive Outcomes

The three remaining outcomes are all inconclusive:

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/inconclusive_outcomes.png" alt="Three inconclusive HDI+ROPE scenarios where the HDI straddles the ROPE boundaries" width="700">
</div>

*The three inconclusive outcomes. Left and right: the HDI crosses one ROPE boundary. Centre: the HDI is wider than the ROPE and spills over both boundaries.*

They share one feature:

* 🤷 **Inconclusive**: the HDI **straddles** at least one ROPE boundary, sitting partly inside and partly outside.

The centre panel is worth a closer look.
Its HDI is wider than the ROPE, $\omega_{\rm HDI} > \omega_{\rm ROPE}$ <!-- medium: ωHDI > ωROPE -->,
so wherever it sits it can never fit inside it.
Where it is now, it can neither accept nor reject.
Shifted well away from the null, a posterior this wide could still reject, but it can never accept.
In other words, being able to say "no meaningful difference" requires an HDI narrower than the ROPE,
a point we'll return to when deciding when to stop.

What to do with an inconclusive result depends on the experiment's budget.
If more data can be collected, it narrows the HDI and may well resolve the straddle.
If the budget is spent, a decision can still be forced, but it then becomes a risk assessment
that weighs the cost of being wrong in each direction, which is domain specific and beyond the scope of this post.[^forced]
Much of the rest of this post is about the first option: when to keep collecting, and when it is safe to stop.

[^forced]: The companion calculator offers two such forced decisions, under *Decide Now!*🎲 in its *Let Me Peek!*👀 tab. The *posterior tail probability* reports how much of the posterior lies on the observed side of the null, e.g. $P(\theta > \theta_{\rm null} \mid {\rm data})$, a Bayesian cousin of the one-sided p-value. The *Bayesian expected loss* weighs the posterior mass inside and outside the ROPE by the relative costs of a false accept and a false reject, and picks the cheaper verdict.
 <!-- medium: P(θ > θnull | data) -->

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

* **After 126 tosses**: $\hat\theta=0.635$ <!-- medium: θ̂=0.635 -->, and the HDI spans 0.551–0.718, entirely above the ROPE. ❌ Reject the null, just like the right-hand conclusive cartoon, even though this HDI ($\omega_{\rm HDI}=0.167$ <!-- medium: ωHDI=0.167 -->) is wider than the ROPE.
* **After 598 tosses**: $\hat\theta=0.525$ <!-- medium: θ̂=0.525 -->, and the narrower HDI ($\omega_{\rm HDI}=0.080$ <!-- medium: ωHDI=0.080 -->) straddles the upper ROPE boundary. 🤷 Inconclusive.
* **After 804 tosses**: $\hat\theta=0.515$ <!-- medium: θ̂=0.515 -->, and the HDI spans 0.480–0.549, entirely inside the ROPE. ✅ Accept the null, if only by a hair (0.549 against a boundary of 0.55).

Same coin, same tosses, three different verdicts.
The only thing that differed was *when* we stopped to look.
Which raises the question this post is really about: when *should* we stop?
Before we get there, the verdicts above deserve a closer look.

[^handpicked]: The sequence is `SEQUENCE_HANDPICKED` in the open-source [dpitg repository](https://github.com/elzurdo/dpitg/blob/main/py/utils_experiments_binomial.py#L33){:target="_blank"}, and these figures can be reproduced with the notebook [fair_coin_handpicked.ipynb](https://github.com/elzurdo/dpitg/blob/main/notebooks/fair_coin_handpicked.ipynb){:target="_blank"}.

### What Exactly Are We Accepting/Rejecting?

When a verdict comes in, it is tempting to read it as a verdict on the sample value. It isn't.

After 804 tosses we accept the null, $\theta_{\rm null}=0.5$ <!-- medium: θnull=0.5 -->, **not** the sample value of 0.515.
What we are accepting is that the true rate is practically equivalent to 0.5, within the ROPE we committed to.

After 126 tosses we reject the null, but that is **not** an endorsement of 0.635.
Here the point is sharper, because we know the true value is 0.5, and it isn't even inside the HDI.
Rejecting the null says only that the plausible values sit meaningfully away from it.

> The decision rule accepts or rejects the **null value**, not the sample value.

That 126-toss verdict was also simply wrong, which brings us to the two ways a conclusive verdict can be incorrect:

* A *false reject*: we reject the null although the true value lies inside the ROPE.
  This is what is usually called a *false positive* (or Type I error), just named more literally, with the null now a region rather than a single point.
* A *false accept*: we accept the null although the true value lies outside the ROPE.
  This is the *false negative* (or Type II error) idea, with one difference: a classic false negative merely fails to reject a false null, whereas a false accept actively accepts it.

An inconclusive verdict, by contrast, is never wrong. It just isn't a verdict yet.

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

How $N_{\rm goal}$ <!-- medium: Ngoal --> varies with the goal and with the true value is in the preprint's [Section 2.3](https://arxiv.org/html/2608.05301v1#S2.SS3){:target="_blank"} and [Appendix C](https://arxiv.org/html/2608.05301v1#A3){:target="_blank"},
and using it to plan a study before any data is collected is the focus of the companion post.

Everything in this post used single-group binary data, but the same logic extends to continuous data
and to comparisons between groups, where what changes is mostly $V$ <!-- medium: V -->.
The preprint derives these extensions, although, unlike the coin, they have not yet been put through
large-scale simulations (see the preprint's Appendices [C](https://arxiv.org/html/2608.05301v1#A3){:target="_blank"} and [D](https://arxiv.org/html/2608.05301v1#A4){:target="_blank"}).
The companion calculator below lets you try them on your own numbers.

## When Precision is Worth Using

Asking for precision before a verdict costs data. So when is it worth paying for?

### A Stopping Rule, or a Planning Tool

It depends mostly on how expensive the data is, which gives the method two complementary roles.

**As a stopping rule**, it is best suited to settings where data is relatively cheap and the budget comfortably
exceeds $N_{\rm goal}$ <!-- medium: Ngoal -->:
large-scale A/B testing, opinion polling and automated quality-control pipelines are typical examples.
For A/B testers there is a bonus: unlike frequentist sequential designs, it needs no correction for how often
you peek, nor for running many tests in parallel (see the [preprint's Appendix E](https://arxiv.org/html/2608.05301v1#A5){:target="_blank"}).

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

## Simplified, Not Simplistic: What This Post Leaves Out

This post kept things deliberately simple, a single coin and a handful of ideas, to make the concepts stick.
That doesn't mean the harder questions were ignored. For those keen to dig deeper is where they are addressed.🪏
(If you're not keen, feel free to skip this section.)

* **Priors**: flat versus informative priors, and the risk of a wrong prior. See the [preprint's discussion](https://arxiv.org/html/2608.05301v1#S4){:target="_blank"}.
* **Multiple hypothesis testing**: why no correction is needed when running many tests at once. See the [preprint's Appendix E](https://arxiv.org/html/2608.05301v1#A5){:target="_blank"}.
* **Comparisons with NHST and Bayes Factors**: see the preprint's Appendices [B](https://arxiv.org/html/2608.05301v1#A2){:target="_blank"} and [F](https://arxiv.org/html/2608.05301v1#A6){:target="_blank"}, and the appendices below on [p-values](#appendix-why-p-values-cannot-accept-the-null-hypothesis) and [Bayes Factors](#appendix-bayes-factors-and-why-theyre-not-in-the-comparison).
* **Relating to power analysis**: prospective, retrospective and replication power. See the [preprint's Appendix E](https://arxiv.org/html/2608.05301v1#A5){:target="_blank"}, and the companion post.
* **Choosing the ROPE and ω<sub>goal</sub>** (🧠 cognitive effort warning ⚠️): see the [preprint's Appendix G](https://arxiv.org/html/2608.05301v1#A7){:target="_blank"}, the [appendix below](#appendix-choosing-a-rope-in-practice), and the calculator's 🧭 guide.
* **Non-analytical posteriors (e.g. MCMC)**: when the HDI itself has to be estimated from samples. See the [preprint's discussion](https://arxiv.org/html/2608.05301v1#S4){:target="_blank"} and its [note on the HDI](https://arxiv.org/html/2608.05301v1#S2.SS1.SSS2){:target="_blank"}.
* **Risk assessment for ROPE straddlers**: what to do when the budget runs out on an inconclusive result. The calculator's *Decide Now!*🎲 offers a posterior tail probability and a Bayesian expected loss.

And while the coin made a handy example, the method reaches well beyond it.
It is a way of thinking about evidence that applies wherever statistics informs a decision,
and in particular anywhere p-values and Bayes Factors are used today.
In their place it offers something more reliable, a stopping rule that never consults the verdict,
and more informative: accept, reject or inconclusive, judged against a "close enough" agreed in advance.

## Summary

<!-- Thesis alternatives:
     · Commit to what matters before you look, and let precision, not the verdict, tell you when to stop.
     · Stop when you know enough, not when you like the answer.
     · A verdict is only as good as the reason you stopped collecting data. -->

Precision is the Goal is about deciding what counts as meaningful before you look,
and stop for precision, not for the verdict.


The five takeaways:

🛑⚖️ **Stopping and deciding are two different jobs.** When one heuristic does both, peeking turns lucky streaks into verdicts. That is the confirmation bias behind the p-value's false alarms, and a Bayesian HDI+ROPE rule is not immune to it either.  

📏 **Falling below a p-value threshold is not the same as meaningful.** Decide what counts as "close enough", the ROPE, before the data arrives, and hold to it.  

✅ **You can accept the null.** With a ROPE, "no meaningful difference" is a finding in its own right. Both verdicts are statements about the null value, not the sample value, and "inconclusive" is an honest third outcome.  

🎯 **Stop on precision, then insist on a conclusion.** Precision is the Goal stops once the HDI is narrow enough, wherever it sits; Decisive Precision is the Goal also waits for a conclusive verdict. On a fair coin that meant zero false rejections, and rarely a verdict with nothing to say, for a little more data.  

💰 **Precision costs data, but the cost is predictable.** The sample size a precision goal requires can be calculated in advance, and refusing to rule on an imprecise posterior is not a flaw but a form of honesty.  

> You can't spell proper without ROPE ...

We opened with two questions, and answered the second: *"Have we collected enough data yet?"*
That is the sequential, retrospective view, for an experiment already under way.
The first, *"How much data is required?"*, is about planning before a single data point is collected,
and it is the subject of a companion post: how to use $N_{\rm goal}$ <!-- medium: Ngoal --> and the calculator's prospective mode
to plan a study around the precision you need.

To catch it when it's out, follow me on [LinkedIn](https://www.linkedin.com/in/eyal-kazin){:target="_blank"} or [Medium](https://medium.com/@eyal-kazin){:target="_blank"}.

---

# Supplementary Sections

A few short asides for the curious. None are needed for the main points, and everything else lives in the [preprint](https://arxiv.org/html/2608.05301v1){:target="_blank"}.

## Appendix: Why P-Values Cannot Accept the Null Hypothesis

The short answer is that a p-value does not carry that information.

A p-value is calculated by assuming that the null hypothesis is true, and asks how surprising the data would be if it were.
But if the null hypothesis really is true, p-values are spread evenly between 0 and 1: a p-value near 0.9 is about as likely as one near 0.05.
A large p-value is therefore not evidence that the null holds. It is simply what a true null, or too little data, tends to produce.

I first heard this put memorably by a statistician at PyData London 2022:

> [In the fair coin case] the probability of a p-value < 0.1 is similar to that of a p-value > 0.9.

It inspired me to test the idea with some code, and I reported the findings at PyData Global 2022. Check out the talk if you're interested:

<div style="position:relative; width:100%; max-width:640px; margin:0 auto; aspect-ratio:16/9;">
    <iframe src="https://www.youtube.com/embed/QVfgqkTv7b8?start=6" title="Eyal Kazin - Everything That You Wanted To Know About P-Values But Were Afraid To Ask" style="width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

If you'd like a full post on the topic, [drop me a line](https://www.linkedin.com/in/eyal-kazin){:target="_blank"}.

## Appendix: Bayes Factors, and Why They're Not in the Comparison

A Bayes Factor measures how much better one hypothesis predicts the data than another.
Unlike the p-value, it *can* favour the null hypothesis.
As a stopping rule, though, it shares the coupling problem: in Kruschke's fair-coin simulations, stopping on a Bayes Factor settles at just over 20% false alarms.
That is far better than the p-value's climb towards 100%, but well short of the zero achieved by the precision-based rules.
It also has no explicit "close enough" and no precision goal, so it can accept the null on precise and imprecise data alike.
That is why it is not part of the comparison here; see the [preprint's Appendix F](https://arxiv.org/html/2608.05301v1#A6){:target="_blank"} for more.

## Appendix: Choosing a ROPE in Practice

Where a domain standard exists, start from it.
Medicine has the *minimal clinically important difference* (MCID), the smallest change a patient or clinician would consider meaningful;
regulators judge generic drugs bioequivalent when the ratio to the brand-name drug sits within 80–125%;
and quality control has its engineering tolerances.
Where no standard exists, check how robust the verdict is across a range of ROPE widths.
The precision goal is then set as a fraction of the ROPE width: this post used $\omega_{\rm goal}=0.8\,\omega_{\rm ROPE}$ <!-- medium: ωgoal = 0.8·ωROPE -->,
and the preprint's sensitivity analysis shows that at or below about $0.7\,\omega_{\rm ROPE}$ <!-- medium: 0.7·ωROPE --> DPitG needs little data beyond $N_{\rm goal}$ <!-- medium: Ngoal -->.
The calculator's 🧭 guide walks through both choices, with presets for popular domains.
For more, see the [preprint's Appendix G](https://arxiv.org/html/2608.05301v1#A7){:target="_blank"}.

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
     MATERIAL CONSIDERED BUT NOT USED
     =========================================================================== -->

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

<!-- Parked Wald callback, goes with the epigraph above: Wald's 1943 sequential test also allowed
     exactly three decisions — accept, reject, or carry on collecting. -->
