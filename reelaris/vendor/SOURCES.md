# Источники Reelaris

Оба исходных репозитория целиком включены обычными папками в `../upstream/`. Их коммиты, хеши деревьев и число файлов записаны в [SOURCES.json](../upstream/SOURCES.json). Эти папки содержат оригинальные файлы с исходными именами и структурой.

- **rea-video, JuneYaooo.** [Коммит fabf832](https://github.com/JuneYaooo/rea-video/tree/fabf832d6b136672be4ed9bff1739d0e6d6788af). Движок разбора, документация, тесты, примеры, видео и GIF. [Apache-2.0](../upstream/rea-video/LICENSE) · [NOTICE](../upstream/rea-video/NOTICE)
- **Awesome Claude Video Skills, zhuyansen.** [Коммит 84d8681](https://github.com/zhuyansen/awesome-claude-video-skills/tree/84d86811a655d7eba91115e669c97fcd4e068d55). Включены весь каталог, оригинальные README, данные и все превью. [Лицензия каталога](../upstream/awesome-claude-video-skills/LICENSE) · [Авторы и лицензии превью](../upstream/awesome-claude-video-skills/assets/previews/NOTICE.md)
- **Codex Animation Studio, Лео Бакерин / @leo_ai_content.** [Оригинальный ZIP](../upstream/Codex_Animation_Studio-original.zip) сохранён целиком. Десять спецификаций стилей входят в рабочий скилл. Локальный HTML-рендер адаптирован под имя Reelaris.
- **Vertical Video Editing.** [Коммит c620fa0](https://github.com/adriiita/vertical-video-editing-skill/tree/c620fa0b8e98d53edbf9d005a9fb4ca7e333e2e8). Дополнительный модуль монтажа, точка входа названа `UPSTREAM_SKILL.md`. [MIT](vertical-video-editing-skill/LICENSE)
- **Agent Video Editor.** [Коммит 8e32c0a](https://github.com/kmilo93sd/agent-video-editor/tree/8e32c0aff64c445ef1e2b87bc04408a34d68c973). Модуль монтажа и библиотека звуков. [MIT](agent-video-editor/LICENSE) · [Аудио CC0](agent-video-editor/skills/editing-videos/library/LICENSES.md) · [Графика CC0](agent-video-editor/skills/editing-videos/graphics/LICENSES.md)

Галерея в README содержит примеры авторов перечисленных проектов с ссылками на источники. Примеры разборов и сравнений rea-video сохраняют авторские пояснения о происхождении материалов. Собственные анимации Reelaris находятся в `showcase/` в корне репозитория. В компактном ZIP для Claude опущены медиабиблиотеки и галерея, а рабочие инструкции, исходники движка и каталог сохранены.

HyperFrames, GSAP, Remotion, FFmpeg, Playwright и ElevenLabs подключаются для выбранного процесса на условиях соответствующих продуктов.
