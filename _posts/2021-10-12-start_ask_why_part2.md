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

![image]({{ site.url }}/assets/start-ask-why/ice-cream-drowning-rates-graph-unclassified.png){:width="400"}

In this graph we clearly identify the correlation picked up by the algorithm. 
But does one truly cause the other? Surely common intuition tells us that these two are independent, 
i.e, there is no meaningful cause and effect. 
If, e.g, something happens to an ice cream delivery which reduces the ice cream sales to zero, 
we don’t expect that to substantially impact drowning rates. 
This understanding of “how the world works” suggests that this apparent correlation, 
interesting as it is, is spurious.

What is it that us humans know that the machines do not? We have the story behind the data. 
That is to say, we understand the context behind these two parameters - 
drowning rates and ice cream sales do not depend on each other directly, 
but rather have a common cause factor - the weather.

We can draw the relationships in the form of a graph as in Figure 2, 
where the arrow indicates the direction of causality 
(the weather determines both drowning rates and ice cream sales, not vice versa).


[Image of simplistic ice cream PGM]

In Figure 3 we display the same data as in Figure 1 but use symbols to represent sunny 
(yellow suns faces) or chilli days (blue freezing faces).

![image]({{ site.url }}/assets/start-ask-why/ice-cream-drowning-rates-graph-classified.png){:width="400"}

This clearly shows that by controlling for the weather parameter, i.e by highlighting its importance, 
these parameters are independent. 
The sunny points may be considered randomly distributed as may the chilly ones. 

The lesson here is that one cannot just feed ice cream sales and drowning rates to an 
algorithm and expect a meaningful conclusion. A domain expert, 
in our example anybody who knows anything about how humans act in the summer and winter, 
is required to incorporate domain knowledge. 
Or in other words, feed, in addition to the data, the story behind it.

For completeness, in Figure 4 we illustrate a more detailed graph of the relationships 
between the target variable to improve (drowning rates), the intervention (life guards) 
as well as the story between the ice cream deliveries and the sales which requires demand and supply.

[Image of complex ice cream PGM]

The purpose of this figure is to show that between the three variables of interest ice cream sales, 
the intervention variable of life guards and the target variable of drowning rates, 
there might be a simple interpretation, or story, behind it. 
In the third post, when we formally introduce graph models, we will show how this is the missing ingredient in the mainstream statistics vocabulary to discuss causality.

[To be continued ...]
