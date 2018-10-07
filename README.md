# Impossible Objects

Based on the papers by [Kokichi Sugihara](http://www.isc.meiji.ac.jp/~kokichis/Welcomee.html), I have implemented
the calculations to make various ambiguous cylinders. The end product is an exhibition for [Bekk](https://www.bekk.no/)
at Teknisk Museum in Oslo, with various figures 3D-printed.

`src` is a folder containing the web-app. Run with `npm install` and `npm run watch` from root.
The frontend does the calculations and allow easy visualization of the paths.

`poster` contains files and description (in Norwegian) for a poster to accompany the exhibition.

`3dfiles` contains the end result and vector files. `svgshapes.ai` contains the 2D shapes, that is then exported to SVG-strings for the webapp.
The various `*.obj` files are output from the webapp, giving the shapes needed for the illusions to work.
The obj files are then imported into [Blender](https://www.blender.org/), and further edited. From there the shapes are exported as
`*.stl` files to be opened in Ultimaker Cura and printed.