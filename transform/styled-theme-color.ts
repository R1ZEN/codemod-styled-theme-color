import { API, FileInfo } from 'jscodeshift/src/core'
import { getColorPath, hasColorPath } from './get-color-path'
import { getImportPath } from './get-import-path'

const hexColorRegExp = /#(?:[0-9a-fA-F]{3}){1,2}/g
const hasColor = (text) =>
  (text.match(hexColorRegExp) || ['']).some((color) => hasColorPath(color))

const getTemplateElementWithColor = (j, root) => {
  return root.find(j.TemplateElement).filter((path) => {
    const { value } = path

    return hasColor(value.value.raw)
  })
}

const updateImports = (j, root) => {
  const imports = root.find(j.ImportDeclaration)
  const themePath = getImportPath()

  const isThemeExist =
    imports.filter((path) => {
      const isThemeNamedImportExist =
        j(path).find(j.Identifier).get('name').value === 'theme'
      const isThemePathExist =
        j(path).get('source', 'value').value === themePath
      return isThemeNamedImportExist && isThemePathExist
    }).length !== 0

  if (!isThemeExist) {
    const newDeclaration = j.importDeclaration(
      [j.importSpecifier(j.identifier('theme'))],
      j.stringLiteral(themePath)
    )

    if (!imports.length) {
      root.get().node.program.body.unshift(newDeclaration)
    } else {
      j(imports.at(imports.length - 1).get()).insertAfter(newDeclaration)
    }
  }
}

const replaceColor = (templateLiteral) => {
  return templateLiteral.match(hexColorRegExp).reduce((acc, color) => {
    const colorPath = getColorPath(color)

    if (!colorPath) {
      return acc
    }

    const colorIndex = templateLiteral.indexOf(color)
    if (colorIndex - 1 > 0 && templateLiteral[colorIndex - 1] === "'") {
      return acc.replace(`'${color}'`, '${' + getColorPath(color) + '}')
    }

    return acc.replace(color, '${' + getColorPath(color) + '}')
  }, templateLiteral)
}

const updateTemplateLiterals = (j, root) => {
  getTemplateElementWithColor(j, root).replaceWith((path) => {
    const { value } = path

    return j.templateElement(
      {
        raw: replaceColor(value.value.raw),
        cooked: replaceColor(value.value.cooked),
      },
      value.tail
    )
  })
}

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift

  const root = j(file.source)

  if (!getTemplateElementWithColor(j, root).length) {
    return file.source
  }

  updateImports(j, root)
  updateTemplateLiterals(j, root)
  // TODO: Add string literals
  // updateStringLiterals(j, root);

  return root.toSource({ quote: 'single', reuseWhitespace: false })
}
