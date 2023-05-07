---
layout: default
title: "Game of Life GL"
permalink: /projects/game-of-life-gl
banner: /assets/img/game-of-life/part-1-banner.png
github: https://github.com/theultimat/game-of-life-gl
---

# Summary

An implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
in [GLSL](https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)) and
[C](https://en.wikipedia.org/wiki/C_(programming_language)). Full source code
is available on [GitHub](https://github.com/theultimat/game-of-life-gl). This
project was completed in four days after work as a personal challenge to complete
a simple programming project in a week.

# Features

- Simulation of Conway's Game of Life on the GPU using [OpenGL](https://www.opengl.org/).
- Configurable zoom factor and simulation tick rate.
- Left-to-right and top-to-bottom wrapping of the simulated world.
- Load initial state from [PBM](https://en.wikipedia.org/wiki/Netpbm) file or randomise.

# Technologies

- Host source to drive the simulation written in [C11](https://en.wikipedia.org/wiki/C11_(C_standard_revision)).
- Simulation of the Game of Life's rules written in [GLSL](https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)) for OpenGL 3.3 Core.
- [GLFW](https://www.glfw.org/) for window and OpenGL context management.
- [GLAD](https://github.com/Dav1dde/glad/) for OpenGL loading.
- Built using [CMake](https://cmake.org/).

# Showcase

<iframe width="790" height="444" src="https://www.youtube.com/embed/QOWz6egFPLo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
