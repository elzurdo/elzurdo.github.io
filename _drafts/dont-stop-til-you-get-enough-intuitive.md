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

> *"He would see after the first few thousand or even few hundred [rounds] that the experiment need not be completed, either because the new method is obviously inferior or because it is obviously superior beyond what was hoped for."*
> — W. Allen Wallis, recalling Captain Garret L. Schuyler's objection, 1943


<!-- SLOT 4 of 6 — THE TWO QUESTIONS. Carried up from the old draft, where they opened the piece.
     They are the post's two uses: the prospective one is the planning tool and the companion
     calculator, the retrospective one is the stopping rule. Keeping both makes the structure
     visible from the first screen. Nachbar's cost framing is folded into the second question.

     NOTE: these two sentences now come BEFORE the context paragraph, inverting the corpus pattern
     (Shannon's story before "How can we quantify communication?"). Deliberate: Shannon needed
     setup, this question doesn't, and the Power Analysis beat works better as the answer to the
     question than as a preamble to it. -->

> “How much data is required?”

This is one of the most common questions in hypothesis and A/B testing, and it gets asked at two very different moments. Before any data is collected, it is a planning question. 

<!-- SLOT 5 of 6 — POWER ANALYSIS, as the bridge into the contract. Names the standard answer
     without attacking it; the critique is held back for the 🗳️ section. -->

The standard answer is a *Power Analysis* calculation: supply a minimum effect size and how often you are willing to be wrong in each direction, and out comes a sample size. It is a sensible place to start. But what if the true effect is much stronger than you assumed, and you could have stopped weeks earlier? Or reduced harm, by cutting short a clinical trial once the treatment shows signs of doing damage?

Checking as the data arrives is tempting, and it has a name: *sequential hypothesis testing*, often shortened to sequential testing. This method addresses the question:

> “Have we collected enough data yet?”

It also has a well known failure mode. Peek often enough and sooner or later an early, unrepresentative sample meets the stopping rule. In most standard methods that same rule is also what decides the verdict, so the call gets made on exactly the sample that should not have been trusted. This is one route to confirmation bias. The reason it happens is well understood, and it can be corrected for.

That correction is the focus of this post: a rule that tells you when you can confidently stop an experiment already under way. In a companion post we'll show that the same machinery works before a study starts, for planning how much data to collect in the first place.

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

- 🏀 **Separate the two questions** that most methods answer with a single number: when do we stop collecting, and what do we conclude?
- ⚖️ **Quantify what counts as "close enough"** (the ROPE), and hold to it, rather than letting the effect size you planned around be quietly forgotten between the planning meeting and the write-up.
- 🛑 **Stop on precision rather than on the verdict**, using John Kruschke's *Precision is the Goal*. That one change removes a bias you probably didn't know you had.
- ✅ **Accept the null hypothesis**, instead of awkwardly failing to reject it. This matters whenever "no meaningful difference" is the finding you actually need.
- 🧮 **Estimate how much data you'll need** before collecting any of it, from a closed-form formula.

If you are already comfortable with posteriors, HDIs and ROPEs, the main thread will feel slow in places. The ⚔️ supplementary sections after the summary are where the detail lives.

## How Experiments Actually End

How did your last experiment actually end?

In large-scale A/B testing the answer is rarely "when we reached the sample size we planned for". Results accumulate continuously, a dashboard reports them as they arrive, and nothing stands between seeing a number and acting on it. Tests get watched, and they get stopped once the numbers look convincing. Those numbers are *heuristics*: convenient stand-ins for the thing that actually matters, usually a p-value, sometimes a confidence interval or a Bayes Factor.

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

Both of those are stopping rules. The researcher's was chosen in advance; the A/B one was made on the fly. That is not to say nothing was decided: somebody picked the heuristic, and somebody picked the threshold it has to cross. What nobody picked was when to look, or how many looks to allow. That part came free with the dashboard. 👀

### One Heuristic, Two Jobs

Look at what that stopping rule is made of. The heuristic that signals when to stop is the same one that delivers the verdict: the experimenter stops because the result has turned *statistically significant*, and concludes that it is *meaningful*. (Those are two different claims, and we will come back to how far apart they can be.) Given enough looks, something will eventually cross that line, whether or not there is anything there to find.

John Kruschke, author of *Doing Bayesian Data Analysis*, puts the consequence for p-value stopping rules in one line:

> *"With infinite patience, NHST results in 100% false alarms."*

*NHST* is Null Hypothesis Significance Testing, the framework built on p-values. As a stopping rule it amounts to this: carry on until the p-value (which quantifies how surprising the data would be if the null hypothesis were true) falls below an agreed threshold, usually 0.05, sometimes stricter.

What he means is that chance alone keeps producing small deviations from the null, and as data accumulates one of them will eventually be extreme enough to clear that threshold. Wait long enough and every experiment reports a finding, including the ones with nothing to find.

This is not only a laboratory concern. It is one of the quieter engines behind the *replication crisis*, where a great many published findings fail to reappear when somebody runs the study again: when the Open Science Collaboration repeated one hundred psychology experiments in 2015, only about a third came back with the original result.

Two things are needed to avoid this. The first is to fix a minimum meaningful effect size in advance and actually hold to it, which is also what lets us accept a null hypothesis rather than merely fail to reject it. The second, which turns out to matter just as much, is to stop collecting data for a reason that has nothing to do with the verdict. 

The second asks us to stop without consulting the result, which sounds like a strange way to run an experiment. Let's take it first.

<!-- THIS SHOULD GO IN THE COMPANION PAPER: A stopping rule that doubles as a verdict is worth sitting with, because it is one of the quieter engines behind the *replication crisis*. The crisis is the discovery, across psychology, medicine and economics, that a great many published findings simply do not reappear when somebody runs the study again. When the Open Science Collaboration repeated one hundred well-known psychology experiments in 2015, only about a third came back with the original result.

The terms of art for how this happens are *p-hacking* and *HARKing* (hypothesising after the results are known), and both sound like accusations of dishonesty. Mostly they are not. Mostly they are a competent person looking at a dashboard, seeing a result, and stopping, which is exactly what the dashboard was built to let them do. -->


## 🏀 Gotta Keep 'em Separated: First Settle, Then Call

Let's follow a professional basketball player, unnamed but real, ten years into his career. Across more than five thousand free throws he has made 81% of them. Then he ruptures an Achilles tendon, has surgery, misses the rest of the season, and comes back.[^player]

Has the injury taken something away?

Three weeks into the comeback it looks that way. He has attempted forty free throws and made twenty-nine, a rate of 72%, nine percentage points below his career record. The write-ups begin.

But forty attempts is almost nothing. A player who is exactly the shooter he always was will have a stretch this poor about one time in ten, for the same reason a fair coin sometimes throws a long run of tails. Account for that properly and those forty shots are consistent with a true rate anywhere between about 58% and 85%.[^raterange] His old 81% sits comfortably inside that span. So does a genuine collapse to 60%. The data cannot yet tell the two apart.[^prior]

<!-- TK (yours): add a Beta distribution visual pointing at the values quoted here, and
     refer to it in the text.
     NOTE: this is very close to FIGURE A ("posterior 101"), currently planned for
     "What a Posterior Is" using the fair-coin sequence. Worth deciding once: either
     build Figure A on these free throws, so the running example carries the teaching
     and the coin arrives later as the clean simulation case, or keep the coin and let
     this section stay prose-only. Two narrowing-posterior figures a few sections apart
     would be one too many. -->

By the end of the season he has attempted 627 and made 82.8% of them. The span of rates consistent with the data now runs from about 80% to 86%, and each new shot barely moves it. There was no way to arrive here sooner: the only source of more attempts is more basketball.

Two separate judgements follow, and the distinction between them is what the rest of this post rests on.

**Has the span stopped moving?** This asks nothing about whether he is back to his old self. It asks how much the estimate would still shift if the season carried on.

**What does the span say?** A real change in his shooting, or none worth worrying about.

The first is a **stopping rule**: when to stop collecting. The second is a **decision rule**: what to conclude once we have stopped. Kruschke's answer to the first is to settle in advance how narrow that span has to be, then carry on until it is that narrow, whatever it turns out to say. How narrow it is has a name: *precision*.

The first judgement is now answerable; the second is not. The span has settled, but settled around what? To say whether 82.8% against a career record of 81% counts as a change in the player, we have to decide how large a change would matter, and decide it before the data arrives rather than after. That is the next section.

[^player]: The numbers are Dominique Wilkins's. Nine-time All-Star, Hall of Famer, nicknamed the Human Highlight Film, and averaging 28.1 points a game when he ruptured his Achilles tendon against Philadelphia on 28 January 1992, aged 32. He returned the following season and averaged 29.9, second in the league behind Michael Jordan. I considered using Kevin Durant, whose Achilles ruptured in the 2019 Finals, but his comeback season was cut to 35 games and 238 free throws, too few to settle the question either way. We will come back to why that matters.

[^raterange]: Every range quoted in this post is a 95% *credible interval*: the span of values most plausible given the data. It is the Bayesian cousin of the frequentist confidence interval. For a success rate like this one it comes from a Beta distribution, and later we will meet the particular flavour of credible interval this method uses, the highest density interval.

[^prior]: We keep things simple with a flat prior, which treats every rate as equally plausible before the comeback season starts. A fuller analysis might bring in how other players' free-throw shooting has changed after returning from similar injuries. His own career record is deliberately *not* used as a prior: it is the baseline we are testing against, and feeding it in at both ends would quietly tilt the answer towards "nothing has changed".

<!-- WHY THE PLAYER IS ANONYMOUS in the body: the argument is about a baseline and a
     comeback season, and a famous name invites the reader to bring their own opinion about
     whether he came back the same. The footnote keeps the provenance honest.

     ⚠️ BASELINE CHOICE, still open and it matters. 81% is his WHOLE pre-injury career
     (4,494/5,557 = 80.9%), which is dragged down by three developing seasons (68%, 77%,
     81%). His prime-years baseline, 1986-87 onwards, is 82.5% (2,819/3,416), which is the
     fairer like-for-like comparison.
     This does not bite in THIS section, but it decides the verdict in ⚖️ and beyond:
       · vs 80.9%, ROPE ±5pp → HDI [79.7, 85.6] sits inside [75.9, 85.9] by only 0.3pp
       · vs 82.5%, ROPE ±5pp → comfortably inside [77.5, 87.5]
     The second is the robust worked example. Settle this before writing ⚖️.

     All figures, both players, every season, and the derived HDIs are in
     agentdocs/freethrow-example-data.md, with verification warnings. -->


<!-- FIGURE B (suggested) — respecified for the single-group version.
     One chart. Attempts on the x axis (1 → 627), his running make-rate as a line with a
     credible-interval band, and a horizontal line at the 81% career baseline.
     Early: the band is enormous and the line sits well below the baseline, so the slump
     looks real. Late: the band is narrow and straddles the baseline.
     That is the whole section in one picture, and the horizontal baseline makes the
     single-group framing visible at a glance.
     (Was specified for two players' lines converging; that was the old between-group
     version of the analogy.) -->

## ⚖️ Quantifying "Close Enough"

<!-- TK image idea: Someone doing Six Seven -->

<!-- TITLE: echoes the information-theory series (Quantifying Surprise / Uncertainty /
     Misalignment / Dependence / Gain), and the link is real rather than cosmetic — that
     series puts numbers on things treated as unmeasurable, and this section does it for
     sameness, the one verdict NHST structurally cannot deliver.

     "Close enough" rather than "the same" on purpose: it is self-evidently a judgement
     call, so it does not promise a derivation, and it is a truer gloss of *practical
     equivalence* than "the same", since the ROPE exists precisely for values that are
     not identical.

     ⚠️ REQUIRED DISCLAIMER, early in this section. In the series "Quantifying X" always
     means a formula computed from data. The ROPE is the opposite: a number chosen from
     domain knowledge before any data arrives. One sentence saying so, near the top,
     otherwise the title primes the reader for a derivation that never comes — and the
     section's central claim is that no derivation exists. -->

[THE DISCLAIMER FIRST, one or two sentences: unlike the quantities in the information theory
series, this number is not computed from anything. It is chosen, in advance, from knowledge of
the domain. The rest of the section is about how to choose it well.]

[Then the ROPE, arriving as a consequence of the free-throw question the previous section left open:
the span has settled, but settled around *what*? To say whether 82.8% against a baseline of 81%
counts as a change, we first have to say how large a change would matter. That is the ROPE, and it
has to be fixed before the data arrives, not after.

The running example gives this for free: a 5pp drop would mean a different tier of shooter; 1.8pp is
the kind of wobble any shooter has between seasons. This is the one piece of machinery a
practitioner already has opinions about, which is why it comes before the posterior.

⚠️ Settle the baseline first — see the comment in the 🏀 section. Against his whole-career 80.9%
the verdict is Accept by only 0.3pp; against his prime-years 82.5% it is comfortable. Use 82.5%
unless you have a reason not to.

Carries the therapeutic example — 72.1% beneficial for males, 72.3% for females — and the pull quote:]

> [Given enough data] even a practically meaningless result may be statistically significant.

[Then width depends on the task: wider is less conservative, and cheaper. Replaces the two empty
bullets in the old draft.]

[THE MISCONCEPTION BLOCK — worth its own pull quote:]

> The decision method accepts/rejects the null **value**, not the sample value.

### What I'm Talking About When I Talk About Accepting the Null

<!-- MOVED here from its own ## section between "How Experiments Actually End" and 📷.
     Two reasons. (1) It was standing between "One Heuristic, Two Jobs" and "Focus First,
     Then Look", which are a question and its answer — nothing should sit in that gap.
     (2) Accepting the null only becomes picturable once the ROPE exists: it is what
     happens when the posterior sits wholly inside the region. Motivating it earlier meant
     motivating something undefined.

     Note it now does double duty — bioequivalence is the canonical argument for wanting a
     region of practical equivalence at all, so these bullets justify the ⚖️ machinery as
     well as the capability. The capability itself is delivered two sections later, at
     "Inside, Outside, or Straddling". -->

[Three bullets, one line each — replaces the three `[some details tbd]` stubs in the old draft:]

💊 [bioequivalence trials for generic drugs]

💻 [do-no-harm regression testing in software deployment]

📋 [futility stopping in programme evaluations]

[Then the frequentist limitation in ONE sentence: NHST can only reject, or awkwardly "not reject".
The formal treatment is fenced to ⚔️ — do not argue it here.]

## What a Posterior Is

[The section the old draft is missing entirely, and the reason a beginner can follow the rest.
Taught on the running coin sequence: the curve of values still plausible after the data, narrowing
as tosses accumulate. The HDI arrives here informally — "the narrowest band holding 95% of it".
The formal definition is ⚔️.]

<!-- FIGURE A (suggested, HIGHEST PRIORITY): posterior 101.
     Four panels of the same coin sequence at N=10, 30, 126, 598 — the curve narrowing.
     One image teaches "posterior", "more data → narrower" and "HDI = the shaded band".
     Without it the post has no answer to "what is that curve?" -->

## Inside, Outside, or Straddling

[The decision rule as THREE outcomes, so `Inconclusive` 🤷 is a first-class citizen from the start
rather than a surprise two-thirds in, as it is in the old draft.]

<!-- FIGURE E (suggested): accept / reject / inconclusive.
     Three-panel cartoon of HDI vs ROPE. The figure below shows only 2 of 6 scenarios and
     doesn't include the straddler, which is the one a beginner most needs named. -->

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/03-hdi-rope-scenarios.png" alt="Two of six HDI+ROPE scenarios" width="700">
</div>

*Demonstrating 2 of 6 scenarios. The lines are posteriors where the vertical lines in each are the HDI borders. The gray boxes are the ROPEs around the null hypothesis value. In the left the HDI is outside the ROPE so the null hypothesis is rejected. In the right the HDI is completely within the ROPE so the null hypothesis is accepted*

## 🗳️🤥 Calling It Early

[The election-night framing: networks call a race on precincts that aren't representative yet. Then
the same failure shown twice — first in the reader's own language, then in the surprising one.]

### Your stopping rule, simulated

[~250 words. The dashboard rule from the hook, run on fair coins, peeked at every toss, with the
false-alarm rate climbing without limit. This is the payoff on the recognition beat. Call out what
to look at: at iteration 100, ~20% of 200 fair-coin experiments have already "found" an effect.
Then the Kruschke line again as the punchline. The p-value *definition* figure and the formal
treatment are ⚔️ — resist explaining p-values here.]

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/02-pvalue-decision-rates.png" alt="Sequential hypothesis decision rates for fair coins using p-values" width="700">
</div>

*Sequential hypothesis decision rates for fair coins using p-values for stopping and deciding.*

### And going Bayesian doesn't fix it

[The worked sequence at N=126: the HDI sits fully outside the ROPE, so the algorithm stops and
rejects a **fair** coin 🤥. Then the rate — 6.3% over 5,000 simulations, not the 5% intuition
suggests. Call out in the text what to look at: the HDI is narrow enough to *look* decisive and
isn't.]

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/04-coupling-problem.png" alt="HDI fully outside the ROPE at iteration 126" width="700">
</div>

*[CAPTION NEEDED — state the claim: at N=126 the HDI is fully outside the ROPE, so a coupled algorithm stops and rejects a coin we know to be fair.]*

[THE HINGE OF THE PIECE, in one sentence: both of these rules are stopping on the verdict.]

## 🛑 Precision is the Goal

[THE HERO. The fix, stated as the inversion of the hinge: stop on **width**, not on verdict.

Introduce the precision goal $\omega_{Goal}$ <!-- medium: ωGoal -->, the rule
$\omega_{HDI} \le \omega_{Goal}$ <!-- medium: ωHDI ≤ ωGoal -->, and the constraint below with one
line of why — a goal wider than the ROPE can never resolve:]

> $\omega_{Goal} \le \Delta_{ROPE}$ <!-- medium: ωGoal ≤ ΔROPE -->

[Working values: ROPE = [0.45, 0.55], so $\Delta_{ROPE} = 0.10$ <!-- medium: ΔROPE = 0.10 --> and
$\omega_{Goal} = 0.08$ <!-- medium: ωGoal = 0.08 -->, 80% of the ROPE width. Then the same sequence
now running to 598 rather than stopping at 126.]

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/05-pitg-algorithm.png" alt="PitG stopping rule met at iteration 598" width="700">
</div>

*[CAPTION NEEDED — state the claim: PitG ignores the verdict and keeps collecting until the HDI is narrow enough, reaching ωGoal at iteration 598.]*

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

The worked sequence runs to 804 — 34% more than 598 — but say immediately that this hand-picked
example is on the high side; the median is +4.7%.]

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/07-dpitg-stop.png" alt="DPitG stops at iteration 804" width="700">
</div>

*[CAPTION NEEDED — state the claim: DPitG carries on past 598 and stops at 804, where the HDI is both narrow enough and fully inside the ROPE, accepting the null.]*

[THE THREE NUMBERS, stated plainly: 2.2% inconclusive (down from 62.1%), zero false positives,
median +4.7% data. The 11-scenario catalogue goes to ⚔️.]

## Three Methods, Side by Side

[One-sentence reading of each row, then the two figures. Figure D (the lead image) does most of this
work if you build it.]

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/08-three-algorithm-comparison.png" alt="Comparison table of the three algorithms" width="750">
</div>

*[CAPTION NEEDED — DPitG is a hybrid: PitG's precision criterion, then HDI+ROPE's conclusiveness criterion.]*

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/09-three-algorithm-rates.png" alt="Decision statistics for the three algorithms" width="750">
</div>

*[CAPTION NEEDED — this figure carries the central claim; it needs a caption more than any other.]*

[One scope fence: p-values and Bayes Factors aren't in this comparison because their decision
heuristic is different — see ⚔️.]

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

## ⚔️ All Eleven Scenarios

[Old draft lines 299–303 and 329–339. HDI+ROPE has 6; adding ωGoal makes 11. The yellow dashed box
is the precision goal — introduce it properly here, since the main thread never does.]

<div style="text-align:center">
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/06-dpitg-scenarios.png" alt="Two DPitG scenarios" width="700">
</div>

*[CAPTION NEEDED — in both panels the precision goal is met (HDI well inside the yellow dashed box). Left: a straddler, so keep collecting. Right: HDI fully within the ROPE, so accept.]*

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
