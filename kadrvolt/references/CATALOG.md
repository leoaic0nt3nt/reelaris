# Каталог дополнений

Встроенный [снимок каталога](../vendor/catalog.json) содержит 469 ссылок из [awesome-claude-video-skills](https://github.com/zhuyansen/awesome-claude-video-skills). Это список проектов с собственными зависимостями и условиями. Ищи по делу, затем открывай первичный README и проверяй подходящий модуль и лицензию. Полные описания, примеры и видео авторов доступны у [источника](https://agentskillshub.top/best/claude-video-skills/).

```sh
python3 "$STUDIO/scripts/catalog.py" --category editing
python3 "$STUDIO/scripts/catalog.py" remotion
python3 "$STUDIO/scripts/catalog.py" --category motion --all
```

| Задача | Кандидаты |
|---|---|
| HTML-анимация и монтаж с графикой | [HyperFrames](https://github.com/heygen-com/hyperframes) |
| React-композиции | [Remotion Skills](https://github.com/remotion-dev/skills) |
| Широкий набор внешних монтажных пайплайнов | [OpenMontage](https://github.com/OpenMontageInc/OpenMontage) |
| Сценарий, короткие ролики и видеовставки | [Раздел коротких видео](https://github.com/zhuyansen/awesome-claude-video-skills#type-shorts) |
| Презентации продуктов, интерфейсы и промо | [Раздел промо](https://github.com/zhuyansen/awesome-claude-video-skills#type-promo) |
| Аватары | [Раздел аватаров](https://github.com/zhuyansen/awesome-claude-video-skills#type-avatar) |
| Моушн-дизайн | [Раздел графики](https://github.com/zhuyansen/awesome-claude-video-skills#type-motion) |

При объяснении выбора свяжи дополнение с конкретной недостающей возможностью. Используй доступные инструменты проекта и точечную установку нужного модуля. Для новой внешней интеграции сообщи, какие данные, ключи, платные вызовы и зависимости она использует.

## Модули внутри архива

- [Vertical Video Editing](../vendor/vertical-video-editing-skill/skills/video-editing/UPSTREAM_SKILL.md) — когда есть съёмка для Reels. Используй руководство по ритму, перебивкам, композиции и визуальной проверке. Собирай результат в HyperFrames при подходящем проекте.
- [Agent Video Editor](../vendor/agent-video-editor/skills/editing-videos/UPSTREAM_SKILL.md) — редакторская проверка темпа, переходов, цвета, звука и графики. Загружай только разделы, подходящие к задаче.

Внешние установщики, платные сервисы и сетевые шаги из вложенных руководств запускаются по условиям основного SKILL.md и запроса пользователя. Источники и версии — в [SOURCES](../vendor/SOURCES.md).

В компактной сборке для Claude браузерной версии доступны руководства и каталог, а звуковые файлы из библиотеки Agent Video Editor лежат в полной локальной сборке. Если модуль предлагает отсутствующий файл, используй согласованный материал пользователя или полную сборку.
