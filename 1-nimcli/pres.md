---
marp: true
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.jpg')
---

![bg left:40% 80%](../nimbella.png)

# **Lesson 1**

Jump Start with Nimbella

https://www.nimbella.com

---
# Plan

- signup with nimbella
- creating an action with FAAS Wars
- installing using the `nim` cli
- checking activation logs and results

---
![](img/011-setup.png)

---
# Install nim cli

---
# Create an Action

---
```js
function main(args) {
    return body: [
        {"turn_turret_left": 15, "shoot": true}
    ]
}
```

---
# Updating an Action

---
# Checking Activations

---
# Creating a Package

---
# Using Triggers

---
# Using Rules

---
# Creating a Project
