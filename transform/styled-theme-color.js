// import {API, Collection, FileInfo, JSCodeshift} from 'jscodeshift/src/core';

const updateImports = (j, astRoot) => {
  const imports = astRoot.find(j.ImportDeclaration);

  const isThemeExist =
      imports.filter((path) => {
        return j.match(path, {
          source: {
            value: "@root/theme"
          }
        });
      }).length !== 0;

  if (!isThemeExist) {
    const newDeclaration = j.importDeclaration(
        [j.importSpecifier(j.identifier("theme"))],
        j.stringLiteral("@root/theme")
    );

    j(imports.at(imports.length - 1).get()).insertAfter(newDeclaration);
  }
}


const updateTemplateLiterals = (j, astRoot) => {
  const templates = astRoot.find(j.TaggedTemplateExpression).filter((path) => {
    return j.match(path, {
      tag: {
        object: {
          name: "styled"
        }
      }
    });
  });

  templates.replaceWith((path) => {
    const { quasi, tag } = path.node;

    const quasis = quasi.quasis;
    const expressions = quasi.expressions;

    const replaceColor = (str) => {
      var regExp = /#[0-9a-f]{3,6}/;
      var colorMap = str.match(regExp);

      if (!colorMap) {
        return "";
      }

      var newStr = colorMap.reduce((acc, value) => {
        return acc.replace(value, "${theme.primary}");
      }, str);

      return newStr;
    };

    var newQuasis = [];
    for (let i = 0; i < quasis.length; i++) {
      newQuasis.push(
          j.templateElement({
            raw: replaceColor(quasis[i].value.raw),
            cooked: replaceColor(quasis[i].value.cooked)
          }, quasis[i].tail)
      );
    }

    const newTemplateLiteral = j.templateLiteral(newQuasis, expressions);

    return j.taggedTemplateExpression(tag, newTemplateLiteral);
  });
};

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;

  const root = j(file.source);
  updateImports(j, root);
  updateTemplateLiterals(j, root);

  return root.toSource();
}

