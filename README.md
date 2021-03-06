# JSON Template Generator

[![Build Status](https://travis-ci.org/bripkens/json-template-generator.svg?branch=master)](https://travis-ci.org/bripkens/json-template-generator)
![Dependency Status](https://david-dm.org/bripkens/json-template-generator.png)

[![browser support](https://ci.testling.com/bripkens/json-template-generator.png)
](https://ci.testling.com/bripkens/json-template-generator)

JSON schema can be used to validate input and to document JSON-consuming APIs.
The `json-schenma-generator` aims to generate JavaScript objects which match a
provided JSON schema. These JavaScript objects can be used to provide
users of API exploration tools such as
[Swagger](https://helloreverb.com/developers/swagger) and
[RAML](http://raml.org/) with request body samples.

See the following example which shows a RAML console integration. Note the
selected `application/json` content type, the
*Prefill with schema based template* link and the body input field which has
been filled out with the help of `json-template-generator`.
![Documentation of a very simple RAML API endpoing](raml-example.png)


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

Further examples can be seen in the
[tests](https://github.com/bripkens/json-template-generator/blob/master/test/_test.js).

## Known Limitations

 - validation rules are not taken into account
 - JSON references (`$ref`) are not followed

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
