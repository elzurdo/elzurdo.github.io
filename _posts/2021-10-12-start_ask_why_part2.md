---
layout: post
title:  "Start Asking Your Data 'Why?' - The Importance of the Story Behind the Data (part 2/4)"
---

This is the second of a four part series aimed at decision makers, technical or managerial, who would like to improve their skills by adding causal intuition to their tool box. 

Here we describe the importance of the narrative behind the data.

## Part 2 of 4 - The Importance of the Story Behind the Data
**Causality is derived from understanding the essence of the data.**

As a researcher, I consider data access as a first great step. Before drawing conclusions, however, I diligently conduct an exploratory phase where I ensure to understand the essence of the data, as much as possible. What is the context? How was it collected? Are there any known biases to be accounted for?

To better illustrate these points, let’s examine three systems and their data from different areas:
* Lifeguard duty scheduling 
* Home security devices
* Health

Throughout these examples I’ll illustrate where such diligence, as in understanding the story behind the data, is beneficial.

Those familiar with his writings and learnings will identify that we borrow some memorable examples illustrated by Jueda Pearl, who is considered the Godfather of Causal Inference. The topic of this post is framed around a paraphrasing of his quote:

<center> “The [story behind the] collection of information is as important as the information itself.” </center><br>

### Avoiding Spurious Correlations by Understanding Common Causes

Imagine that you work in a council of a city with a beach and want to reduce drowning rates by improving the scheduling for lifeguards. How would you budget for their schedules? What seems like a quite obvious question for human beings is not for a machine.

If you feed a standard associative algorithm (e.g. linear regression, neural network or a graph   model) drowning rate data, and other variables in the city, if available, it would highlight a strong correlation with the sales of ice cream. In Figure 1 we visualise such a correlation using made up, but plausible, data, where each point is the value of drowning rates and ice cream sales for a given week.


[To be continued ...]