---
layout: post
title: "🛑️⚖️ Don't Stop 'til You Get Enough — Reintroducing the “Precision is the Goal” Stopping Criterion"
---

<!-- ===========================================================================
     SCAFFOLD ONLY — every heading below carries one bracketed line of intent
     and no prose. The prose is yours. Full reasoning behind this structure:
     agentdocs/dpitg-post-outline.md

     TARGET READER: someone running A/B tests or hypothesis tests who does not
     fully understand the stopping criterion they are already using. They peek
     at a dashboard, stop when it goes green, and have never articulated that
     this is a stopping rule with a failure mode.

     SECOND AUDIENCE: readers already fluent in Bayesian testing. The ⚔️ block
     after the summary is sized for them. The spine never slows for them.

     FINISHED-DRAFT CHECKPOINT: could the target reader write Dirk Nachbar's
     200-word summary (_from_medium/dont-stop-til-you-get-enough/nachbar_post.md)
     after reading this?

     HERO: PitG. DPitG is a short final act, not a co-hero.
     ANALOGIES: 📷 camera answers the question (early). 🗳️ election dramatises
     the failure (later). Fair coin is the worked numeric example throughout.
     LENGTH TARGET: spine ~2,000–2,400 words. Everything heavy goes to ⚔️.

     Each LaTeX expression carries its unicode twin in an adjacent
     <!- - medium: … - -> comment, for regenerating the Medium version.
     =========================================================================== -->

<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="zurdo" data-description="Support me on Buy me a coffee!" data-message="Buy me a slice of pizza! 🍕" data-color="#40DCA5" data-position="Right" data-x_margin="18" data-y_margin="18"></script>

#### [SUBTITLE — one line promising a gain, not a summary. What will they be able to *do*? Decide when to stop collecting, and be able to say "no difference" out loud.]

<!-- FIGURE D (suggested, lead image): one sequence, three stops.
     A single iteration axis 1→1000 with three markers — 126 (HDI+ROPE, ⛔ wrong),
     598 (PitG, 🤷 inconclusive), 804 (DPitG, ✅ accept). The whole argument in one
     picture. If you build only one new figure, this or Figure A. -->

> [EPIGRAPH — Kruschke, standing named: "With infinite patience, NHST results in 100% false alarms."
> The spine cashes this in at the 🗳️ section.]

[READER CONTRACT — three parts, the most reliable feature of your corpus and the thing the old draft
lacks entirely:
 • who it's for — anyone running an A/B test, trial or poll who has never examined the rule by which
   they decide to stop
 • what they'll gain — a bulleted list of the five things they'll be able to do by the end
 • what's assumed — basic probability, no Bayes
Then one line for the second audience, which doubles as their skip signpost: *if you already know
your way around a posterior, the ⚔️ sections after the summary are where the detail is.*]

> [MOTIVATING QUESTION, on its own line, with cost already in it — when can we confidently stop,
> given that samples cost money?]

## You Already Have a Stopping Rule

[~150 words, no figure. THE HOOK. You check the dashboard each morning and stop when it goes green.
That *is* a stopping rule; you never chose it; it has a failure mode. Name it, promise the fix, move
on — the evidence arrives later at 🗳️. Without this the target reader has no reason to believe the
post is about them.]

## What I'm Talking About When I Talk About Accepting the Null

[Three bullets, one line each — replaces the three `[some details tbd]` stubs in the old draft:]

💊 [bioequivalence trials for generic drugs]

💻 [do-no-harm regression testing in software deployment]

📋 [futility stopping in programme evaluations]

[Then the frequentist limitation in ONE sentence: NHST can only reject, or awkwardly "not reject".
The formal treatment is fenced to ⚔️ — do not argue it here.]

## 📷 Focus First, Then Look

[~250 words. THE ANSWER, in picture form, before any Bayesian vocabulary. A blurry photo of a box:
you cannot tell what is inside. Sharpen first, then look. Two jobs, and most methods fuse them:

  • the **stopping rule** — when do we stop collecting?
  • the **decision rule** — what do we conclude once we have?

Then Kruschke's answer in one sentence: stop when the precision reaches a threshold. No formalism,
no vocabulary, no HDI, no ROPE yet.]

<!-- FIGURE B (suggested, nice-to-have): the camera pair.
     2×2 — blurry→sharp photo of a box, beside blurry→sharp posterior against a ROPE.
     Makes width-vs-position literal. The prose can carry this if you'd rather not build it. -->

## ⚖️ What Counts as "The Same"

[The ROPE, arriving as a consequence of the camera picture: to judge "is the object inside the box",
you first have to say where the box is. This is the one piece of machinery a practitioner already
has opinions about, which is why it comes before the posterior.

Carries the therapeutic example — 72.1% beneficial for males, 72.3% for females — and the pull quote:]

> [Given enough data] even a practically meaningless result may be statistically significant.

[Then width depends on the task: wider is less conservative, and cheaper. Replaces the two empty
bullets in the old draft.]

[THE MISCONCEPTION BLOCK — worth its own pull quote:]

> The decision method accepts/rejects the null **value**, not the sample value.

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

[THE HINGE OF THE PIECE, in one sentence: both of these criteria are stopping on the verdict.]

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
    <img src="{{ site.url }}/assets/dont-stop-til-you-get-enough/05-pitg-algorithm.png" alt="PitG stop criterion triggered at iteration 598" width="700">
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
     168–184    →  ⚖️ "What Counts as 'The Same'"
     186–204    →  split: informal HDI → "What a Posterior Is";
                   formal HDI → ⚔️ "What the HDI Actually Is"
     205–215    →  ⚖️ "What Counts as 'The Same'" (fill the two empty bullets)
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
