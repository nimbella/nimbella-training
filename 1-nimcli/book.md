---
title: Jump Start with Nimbella
---

I am starting a series of posts, that is going to cover the Nimbella Serverless, an open-source serverless platform.

We start learning how to do the signup in Nimbella, which offers a free account for development. We are going to install the `nim` tool, the command-line interface to interact with Nimbella. Nimbella is also available on-premises in private clouds.

Then we go through *actions*, which are the building blocks of Nimbella applications. We will see how to create and update actions. Furthermore, actions can be invoked. Each invocation leaves a track as an *activation*. We are going to see how to check those activations, inspecting logs and results.

Nimbella also includes event handling, in the form of *trigger* and *rule*. We complete the chapter going into the details, with an example using slack, and another using timed execution.

# Nimbella in a nutshell

So you may wonder what is Nimbella.



Nimbella is a serverless development platform, similar to Amazon Lambda and similar serverless offerings by other cloud providers.



The distinctive feature of Nimbella is that is based on open-source software, [Apache OpenWhisk](https://openwhisk.apache.org/) and it is portable among different cloud providers, so you can also install it in your private cloud on-premises.


Nimbella's goal is to make easy cloud-native development and provide an awesome development experience. Developers are entitled to build their applications with microservices from the ground up.

Nimbella offerings include the multi-tenant public offering allowing developers to build their applications in the cloud. 

Their applications can then be deployed in a private cloud, either on-premises or in any other public that provides a Kubernetes cluster.

