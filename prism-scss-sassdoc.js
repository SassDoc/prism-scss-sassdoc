(function () {
  // Match an annotation
  var annotation = {
    pattern: /^@\w+/gi,
    alias: 'atrule'
  };

  // Match a type (always following an annotation)
  var type = {
    pattern: /^(@\w+\s+){[^}]+}/gi,
    lookbehind: true,
    alias: 'string'
  };

  // Match a param (always following an annotation and optionally a type)
  var param = {
    pattern: /^(@\w+\s+({[^}]+}\s+)?)[\$%]?[\w\.]+/gi,
    lookbehind: true,
    alias: 'variable'
  };

  // Match a delimited URL
  var url = /<[^>]+>/g;

  Prism.languages.insertBefore('scss', 'comment', {
    'docblock': {
      pattern: /(^|[^\\])(\/\*\*[\w\W]*?\*\/|\/\/\/.*?(\r?\n|$))/g,
      lookbehind: true,
      alias: 'comment',
      inside: {

        // Annotation with param
        'annotation-param': {
          pattern: /@(access|example|group|alias|since|throws?|exception) .*/g,
          inside: {
            'param': param,
            'annotation': annotation,
            'url': url
          }
        },

        // Annotation with type and param
        'annotation-type-param-default': {
          pattern: /@(param|arg(ument)?|prop|requires|see) .*/g,
          inside: {
            'param': param,
            'type': type,
            'annotation': annotation,
            'default': {
              pattern: /\([^\(]+\)/,
              alias: 'string'
            },
            'url': url
          }
        },

        // Annotation with only type
        'annotation-type': {
          pattern: /@(returns?) .*/g,
          inside: {
            'type': type,
            'annotation': annotation,
            'url': url
          }
        },

        // Annation with an URL
        'annotation-url': {
          pattern: /@(link|source) .*/g,
          inside: {
            'annotation': annotation,
            'url': /[^ ]+/
          }
        },

        // Type annotation
        'annotation-type-custom': {
          pattern: /@(type) .*/g,
          inside: {
            'annotation': annotation,
            'type': {
              pattern: /.*/,
              alias: 'string'
            }
          }
        },

        // Other annotations
        'annotation-single': {
          pattern: /@(content|deprecated|ignore|output|author|todo) .*/g,
          inside: {
            'annotation': annotation,
            'url': url
          }
        },
      }
    }
  });
}());
