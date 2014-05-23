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

  describe('default values', function() {
    check('for strings', {
      type: 'string',
      'default': 'foo'
    }, 'foo');

    check('when null', {
      type: 'string',
      'default': null
    }, null);

    check('for integers', {
      type: 'integer',
      'default': 42
    }, 42);
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

  describe('complex examples', function() {
    check('smd-service', require('./examples/smd-service.json'), {
      transport: 'POST',
      envelope: 'URL',
      contentType: 'application/json',
      target: 'http://example.com',
      parameters: [],
      name: 'TODO'
    });

    check('unix', require('./examples/unix.json'), {
      storage: {},
      fstype: 'ext3',
      options: ['TODO'],
      readonly: false
    });
  });
};
