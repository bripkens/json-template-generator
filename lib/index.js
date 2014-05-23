(function(context) {
  'use strict';

  var toString = Object.prototype.toString;

  function always(val) {
    return function() { return val; };
  }

  function isArray(arg) {
    return toString.call(arg) === '[object Array]';
  }

  /*
   * The JSON-schema-validation spec describes a few string formats. We can
   * use this format information to provide format based default strings.
   *
   * Reference:
   * http://json-schema.org/latest/json-schema-validation.html#rfc.section.7
   */
  var formatExamples = {
    'date-time': new Date().toISOString(),
    'email': 'john.doe@example.com',
    'hostname': 'example.com',
    'ipv4': '127.0.0.1',
    'ipv6': '0:0:0:0:0:0:0:1',
    'uri': 'http://example.com'
  };

  var strategies = {};

  strategies['boolean'] = always(false);
  strategies['integer'] = always(0);
  strategies['number'] = always(0.1);
  strategies['null'] = always(null);

  strategies['string'] = function(schema) {
    var example = formatExamples[schema['format']];
    if (example) {
      return example;
    }
    return 'TODO';
  };

  strategies['enum'] = function(schema) {
    return schema['enum'][0];
  };

  strategies['object'] = function(schema) {
    var template = {};

    var properties = schema['properties'];
    if (properties) {
      Object.keys(properties).forEach(function(property) {
        var value = jsonTemplateGenerator(properties[property]);
        if (value !== undefined) {
          template[property] = value;
        }
      });
    }

    return template;
  };

  strategies['array'] = function(schema) {
    var template = [];

    if (schema['items']) {
      var itemSchemas = [];
      if (isArray(schema['items'])) {
        itemSchemas = itemSchemas.concat(schema['items']);
      } else {
        itemSchemas.push(schema['items']);
      }

      itemSchemas.forEach(function(schema) {
        var item = jsonTemplateGenerator(schema);
        if (item !== undefined) {
          template.push(item);
        }
      });
    }

    return template;
  };

  function jsonTemplateGenerator(schema) {
    if (!schema) {
      return undefined;
    } else if (schema['default'] !== undefined) {
      return schema['default'];
    } else if (isArray(schema['enum'])) {
      return strategies['enum'](schema);
    } else if (!!schema.type) {
      var strategy = strategies[schema.type];
      if (!strategy) return undefined;
      return strategy(schema);
    }

    return undefined;
  }

  /*
   * Exporting the public API
   */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = jsonTemplateGenerator;
  } else if (typeof define === 'function') {
    define(function() {
      return jsonTemplateGenerator;
    });
  } else {
    /*
     * In case the global variable jsonTemplateGenerator needs to be reset
     * to its previous value, the jsonTemplateGenerator library is returned
     * by this method.
     */
    var previousJsonTemplateGenerator = context['jsonTemplateGenerator'];
    jsonTemplateGenerator['noConflict'] = function() {
      context['jsonTemplateGenerator'] = previousJsonTemplateGenerator;
      return jsonTemplateGenerator;
    };

    context['jsonTemplateGenerator'] = jsonTemplateGenerator;
  }

})(this);
