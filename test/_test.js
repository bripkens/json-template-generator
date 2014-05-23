var assert = require('assert');

module.exports = function(jsonTemplateGenerator, minified) {
  function check(name, schema, expected) {
    name = name + (minified ? ' (minified)' : '');
    it(name, function() {
      var actual = jsonTemplateGenerator(schema);
      assert.deepEqual(actual, expected);
    });
  }

  describe('invalid schemas', function() {
    check('null schema', null, undefined);
    check('empty schema object', {}, undefined);
    check('unknown type', {
      type: 'unknown'
    }, undefined);
  });

  describe('simple values', function() {
    check('object', {
      'type': 'object'
    }, {});

    check('array', {
      'type': 'array'
    }, []);

    check('strings', {
      'type': 'string'
    }, 'TODO');

    check('boolean values', {
      'type': 'boolean'
    }, false);

    check('integers', {
      'type': 'integer'
    }, 0);

    check('numbers', {
      'type': 'number'
    }, 0.1);

    check('null values', {
      'type': 'null'
    }, null);
  });

  describe('nested properties', function() {
    check('all standard properties', {
      'type': 'object',
      'properties': {
        'name': {
          'type': 'string'
        },
        'int': {
          'type': 'integer'
        },
        'num': {
          'type': 'number'
        },
        'nil': {
          'type': 'null'
        },
        'bool': {
          'type': 'boolean'
        },
        'arr': {
          'type': 'array'
        }
      }
    }, {
      'name': 'TODO',
      'int': 0,
      'num': 0.1,
      'nil': null,
      'bool': false,
      'arr': []
    });

    check('nested objects', {
      'type': 'object',
      'properties': {
        'a': {
          'type': 'object',
          'properties': {
            'b': {
              'type': 'string'
            }
          }
        }
      }
    }, {
      'a': {
        'b': 'TODO'
      }
    });
  });


  describe('array values', function() {
    check('string values', {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    }, ['TODO']);

    check('boolean values', {
      'type': 'array',
      'items': {
        'type': 'boolean'
      }
    }, [false]);

    check('multiple defined array items', {
      'type': 'array',
      'items': [{
        'type': 'boolean'
      }, {
        'type': 'string'
      }, {
        'type': 'number'
      }]
    }, [false, 'TODO', 0.1]);
  });

  describe('README examples', function() {
    check('example from json-schema.org', {
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
    }, {
      'firstName': 'TODO',
      'lastName': 'TODO',
      'age': 0
    });
  });

};
