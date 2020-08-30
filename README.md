# Codemod styled-theme-color

Автоматический заменяет hex цвет в styled компоненте на алиас из темы.

### Использование
Для того чтобы применить `codemod` к всем файлам в папке выполните код ниже:

```
$ THEME_PATH=./transform/theme.ts IMPORT_PATH=@root/theme\
  npx jscodeshift ./folder -t ./styled-theme-color.js -d -p
```

Переменные окружения:
- `THEME_PATH` - путь от корня проекта к файлу темы;
- `IMPORT_PATH` - пусть на который будет использоваться при добавлении импорта темы;

Файл темы должен экспортиться именованно:
```ts
export const theme = {
    primary: '#000',
    secondary: '#fff',
}
```

### Установка

Необходимо устновить:
- Node.js - версия не ниже v13.2.0;
- npm - версия не ниже 6.13.1; 

После успешной установки всего вышеперечисленного, открываем консоль в текушей дирректории и пишем:
```bash
$ npm i
```

### Запуск тестов
Для запуска тестов достаточно выполнить команду:
```bash
$ npm test
```

### Полезные ссылки
- [AST Explorer](https://astexplorer.net/)
- [jscodeshift](https://github.com/facebook/jscodeshift)
- [codemod examples](https://github.com/cpojer/js-codemod/tree/master/transforms)


