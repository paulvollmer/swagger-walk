# swagger-walk
swagger utility to walk through paths, methods and definitions.

## Usage
simple example how to use the `swagger-walk` utility.

```
const SwaggerWalk = require('swagger-walk')
// read swagger file
const spec = require('./swagger.json')

// create a new instance and set the swagger specification
let walker = new SwaggerWalk()
walker.setSpec(spec)

// walk all path methods
walker.walkPathMethods((index, path, method, data) => {
  console.log(path, method)
})
```

# License
Licensed under [MIT-License](LICENSE)
