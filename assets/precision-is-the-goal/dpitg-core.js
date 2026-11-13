// Shared maths for the "Don't Stop 'til You Get Enough" interactive widgets.
// Posterior Beta(s, f) as in the preprint. The HDI uses a grid zoomed onto the posterior
// (±10 sd, 2,000 cells, ties broken by enclosed mass, bounds at cell edges), which matches exact
// HDIs to ~4 decimals and reproduces the hand-picked stops at 126 / 598 / 804.
(function (root) {
  "use strict";
  const R0 = 0.45, R1 = 0.55, NMIN = 30, G = 2000, CRED = 0.95;
  const gx = new Float64Array(G), gp = new Float64Array(G), gc = new Float64Array(G);

  function hdi(a, b) {
    const m = a / (a + b), sd = Math.sqrt(a * b / ((a + b) * (a + b) * (a + b + 1)));
    const x0 = Math.max(0, m - 10 * sd), x1 = Math.min(1, m + 10 * sd), dx = (x1 - x0) / G;
    let mx = -Infinity;
    for (let i = 0; i < G; i++) {
      const x = x0 + (i + 0.5) * dx; gx[i] = x;
      const l = (a - 1) * Math.log(x) + (b - 1) * Math.log1p(-x); gp[i] = l; if (l > mx) mx = l;
    }
    let s = 0; for (let i = 0; i < G; i++) { s += Math.exp(gp[i] - mx); gc[i] = s; }
    for (let i = 0; i < G; i++) gc[i] /= s;
    let j = 0, best = 1e9, bm = 0, bi = 0, bj = G - 1;
    for (let i = 0; i < G; i++) {
      const pr = i ? gc[i - 1] : 0;
      while (j < G && gc[j] - pr < CRED) j++;
      if (j >= G) break;
      const w = j - i, mass = gc[j] - pr;
      if (w < best || (w === best && mass > bm)) { best = w; bm = mass; bi = i; bj = j; }
    }
    return [gx[bi] - dx / 2, gx[bj] + dx / 2];
  }

  // Unnormalised log posterior density, for drawing curves.
  function logPdf(a, b, x) { return (a - 1) * Math.log(x) + (b - 1) * Math.log1p(-x); }

  function dec(lo, hi) {
    if (lo >= R0 && hi <= R1) return "acc";
    if (hi < R0 || lo > R1) return "rej";
    return "inc";
  }

  function mulberry(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function lgamma(z) {
    const c = [76.18009172947146, -86.50532032941677, 24.01409824083091,
      -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
    let y = z, t = z + 5.5; t -= (z + 0.5) * Math.log(t);
    let s = 1.000000000190015; for (const k of c) s += k / ++y;
    return -t + Math.log(2.5066282746310005 * s / z);
  }

  // Exact two-sided binomial test p-value, as in scipy.stats.binomtest: sums the probabilities of
  // every outcome no more likely than the one observed.
  function pValue(k, n, t0) {
    t0 = t0 === undefined ? 0.5 : t0;
    const ln = lgamma(n + 1), la = Math.log(t0), lb = Math.log1p(-t0);
    const lp = j => ln - lgamma(j + 1) - lgamma(n - j + 1) + j * la + (n - j) * lb;
    const ref = lp(k) + 1e-7; let s = 0;
    for (let j = 0; j <= n; j++) { const v = lp(j); if (v <= ref) s += Math.exp(v); }
    return Math.min(1, s);
  }

  root.DPITG = {
    R0, R1, NMIN, hdi, logPdf, dec, mulberry, pValue,
    DN: { acc: "ACCEPT", rej: "REJECT", inc: "INCONCLUSIVE" },
    COLORS: { R: "#d62728", P: "#7b2d8e", D: "#2ca02c", A: "#c98a00", rope: "#f5a623", acc: "#2ca02c", rej: "#d62728", inc: "#c98a00" }
  };
})(window);
