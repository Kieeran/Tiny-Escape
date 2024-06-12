I. Introduction
- A tiny robot has to face hard challenges and go through struggles. His prizes are not only an antidote but also funny experiences.
- This idea originates from the “Grounded” game.
  + Adventure
  + Funny
  
II. Authors
- Lecturer: Cáp Phạm Đình Thăng
- Students:
  + Nguyễn Phạm Quốc Bảo - 21521856
  +  Trần Thị Thanh Dung - 21521984

III. Objectives
- Load 3D model (both static and animated model)
- Perform perspective projection and adjust near and far clipping plane coordinates
- Apply basic affine transformations to these basic shapes: rotation,..
- Light (full lighting, light source, shadow,.. ), texture, animations, ...

IV. Tools
- Threejs
- Cannonjs
- Blender
- Others: sketchfab, mixamo

V. Demo
- Link: https://github.com/Kieeran/Tiny-Escape/blob/master/video_demo.mp4
  
VI. Building
- Set up:
  ```
  git clone https://github.com/Kieeran/Tiny-Escape.git
  ```
- Install:
  ```
  # three.js
  npm install --save three
  npm install --save-dev vite
  ```
- Executed:
  ```
  npx vite
  ```
- How to use:
  + W, A, S, D: forward, left, backward, right
  + Space: jump
  + 1,2,3,4,5,6: animation of character.

