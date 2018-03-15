# The Process of Texture Feedback

There is a scene for each post process layer, to allow for a
render-to-texture process.

First, a primary scene is defined (`scene`), upon which the final
render is output.

## feedback

The feedback is produced by rendering a texture continuously feeding a
texture into the same shader, within which the fed-back source is
diminished by a certain factor.

## scenes

For simple feedback, there are three required scenes.

Scene A. A standard scene. This scene is what is typically drawn to, and can involve
3d objects and textures of any kind.

Scene B. A feedback scene, within which a plane buffer object is rendered, on which,
a texture from scene A is projected. This plane buffer object will use the
feedback shader to process the output of Scene A.

Scene C. An output scene, in which a simple quad is rendered, on which, a texture
is mapped. This is the final viewing quad, and only serves as a destination.

## textures

Since this technique involves render-to-texture, a texture is required as the output
of each scene.

When the feedback effect is produced, the initial input of the feedback shader is
Texture A. The secondary input is the Main Texture (output from Scene A).
