---
layout: default
title: "Real-Time Hair Simulation"
permalink: /projects/real-time-hair
banner: /assets/img/hair-sim/cover.png
---

# Summary

Proposal and implementation of a real-time hair simulation and rendering technique
operating entirely on the GPU. Completed as my final dissertation project at
the [University of Bristol](https://www.bristol.ac.uk/) in 2017
using [OpenGL](https://www.opengl.org/) and [C++](https://en.wikipedia.org/wiki/C%2B%2B).
While the source code is not currently available the full paper can be found [below](#paper).

# Features

- Simulation of hair dynamics including internal friction using [compute shaders](https://www.khronos.org/opengl/wiki/Compute_Shader).
- Interpolation of key hairs for rendering using [hardware tessellation](https://www.khronos.org/opengl/wiki/Tessellation).
- Local shading using a combination of the [Kajiya-Kay](https://dl.acm.org/doi/abs/10.1145/74334.74361) and [Marschner](https://dl.acm.org/doi/abs/10.1145/882262.882345) models.
- [Self-shadowing](https://en.wikipedia.org/wiki/Self-shadowing) by ray marching through a 3D density texture.

# Technologies

- Host program and reference CPU simulation written in [C++14](https://en.wikipedia.org/wiki/C%2B%2B14).
- Simulation and rendering shaders written in [GLSL](https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)) for OpenGL 4.3 Core.
- [GLFW](https://www.glfw.org/) for window and OpenGL context management.
- [GLEW](https://glew.sourceforge.net/) for OpenGL loading and runtime extension support.
- Base meshes for hair growth created in [Blender](https://www.blender.org/).
- Paper created using [LaTeX](https://www.latex-project.org/).

# Showcase

<iframe width="790" height="444" src="https://www.youtube.com/embed/AhfnE9120nw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

![Colour Examples](/assets/img/hair-sim/showcase0.png)
![Self-Shadowing](/assets/img/hair-sim/showcase1.png)

# Paper

<embed width="790" height="1117" type="application/pdf" src="/assets/pdf/dissertation.pdf" />
