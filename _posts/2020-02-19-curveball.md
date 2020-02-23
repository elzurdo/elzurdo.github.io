---
layout: post
title: "CurveBall - Loss Function Optimisation With Fast 2nd Order Derivatives"
--- 
**SGD's Long Lived Rein Is About To End**


I just heard an amazing talk at the [ML London meetup group](https://www.meetup.com/London-Machine-Learning-Meetup/events/268395906/).


Dr. Joao Henriques talked about a new optimisation scheme which they call [CurveBall](http://www.robots.ox.ac.uk/~vgg/research/curveball/) which takes into account second derivatives and by so will make finding the optimum weights much quicker.

If I understood correctly, it might be the next meaningful step in speeding up optimisation of the loss function.
The current SGD has been doing the same thing for the past decade, effectively: 1st derivative with some corrections for direction/momentum.


People have known that the 2nd derivative (Hessian) should be better per epoch, but it is very expensive to calculate, store in memory and invert.


It seems like this group came up with practical heuristics that overcome these hardships.


One extra sweet aspect is that they claim that there will no longer be a need to fine tune for a learning rate hyper parameter.
This could potentially be implemented in all the NN platforms (TF, PyTorch, etc.).