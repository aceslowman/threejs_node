# THREEjs Node Boilerplate

Modular THREEjs boilerplate based on a technique defined here: https://medium.com/@soffritti.pierfrancesco/how-to-organize-the-structure-of-a-three-js-project-77649f58fa3f

## How To Use
```
npm install
npm run dev
// or `npm run build` if production
npm run start
```

The example will be available at `localhost:3000`

## Webpack Configuration

I am utilizing config.optimization.SplitChunks so that in development, you will
not need to rebundle all of threejs. This definitely speeds up the wait time.

