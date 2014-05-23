# JSON Template Generator

[![Build Status](https://travis-ci.org/bripkens/json-template-generator.svg?branch=master)](https://travis-ci.org/bripkens/json-template-generator)
![Dependency Status](https://david-dm.org/bripkens/json-template-generator.png)

[![browser support](https://ci.testling.com/bripkens/json-template-generator.png)
](https://ci.testling.com/bripkens/json-template-generator)


## Installation

 - Bower: `bower install --save bripkens/json-template-generator`
 - Node / NPM: `npm install --save bripkens/json-template-generator`
 - Download:
   - [Development](https://raw.githubusercontent.com/bripkens/json-template-generator/master/dist/json-template-generator.js)
   - [Production](https://raw.githubusercontent.com/bripkens/json-template-generator/master/dist/json-template-generator.min.js)

## Usage

You can generally run `json-template-generator` in both a browser and Node.js
context. To do so you can access the global `jsonTemplateGenerator` variable
or `require('json-template-generator')`. Now you simply need to call the
function with a JSON schema in order to create a template from this schema.

```
var template = jsonTemplateGenerator({
  'title': 'Example Schema',
  'type': 'object',
  'properties': {
    'firstName': {
      'type': 'string'
    },
    'lastName': {
      'type': 'string'
    },
    'age': {
      'description': 'Age in years',
      'type': 'integer',
      'minimum': 0
    }
  },
  'required': ['firstName', 'lastName']
});

// Results in the following object:
{
  'firstName': 'TODO',
  'lastName': 'TODO',
  'age': 0
}
```

## Executing the tests

```
npm install -g gulp testling

# Run unit tests in a node context
gulp

# Run tests in a browser context
testling
```

## License (MIT)

    The MIT License

    Copyright (c) 2014 Ben Ripkens http://bripkens.de

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
