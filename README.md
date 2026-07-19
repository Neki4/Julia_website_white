# Юлія Компанець — React-лендінг

Альтернативна версія сайту у стилі мінімалістичної студії (світла тема, вузька колонка, великі фото). React + TypeScript + Vite + Tailwind CSS 4 + lucide-react.

## Запуск

```
cd react-landing
npm install        # один раз
npm run dev        # http://localhost:5173
npm run build      # продакшн-збірка в dist/
```

## Структура

```
src/App.tsx                          — hero + marquee + порядок секцій
src/data.ts                          — УСІ тексти-дані: посилання, фото, проєкти, відгуки
src/components/Button.tsx            — кнопка (primary / secondary / tertiary)
src/components/TestimonialSection.tsx— цитата + фото з паралаксом
src/components/PricingSection.tsx    — дві цінові картки
src/components/TestimonialCarousel.tsx— автокарусель відгуків
src/components/ProjectsSection.tsx   — три проєкти-зйомки
src/components/PartnerSection.tsx    — CTA з фото-слідом за курсором
src/components/Footer.tsx            — футер з посиланнями
src/components/CopyrightBar.tsx      — рядок копірайту
src/components/BottomNav.tsx         — плаваюча нижня панель
src/hooks/useInViewAnimation.ts      — поява секцій при скролі
src/index.css                        — шрифти, marquee, анімації
```

## Куди класти фото

Фото лежать у `public/`, імена — послідовні числа:

```
public/packages/pack1/1.jpg … 9.jpg    — блок «Індивідуальна» (9 фото)
public/packages/pack2/1.jpg … 5.jpg    — блок «Парна» (поки порожньо — заглушки)
public/packages/pack3/1.jpg … 7.jpg    — блок «Сімейна» (7 фото)
public/packages/pack4/1.jpg … 6.jpg    — блок «Таїнство Хрещення» (6 фото)
public/packages/wedding/1.jpg … 7.jpg  — блок «Весільна зйомка» (спільний для МІНІ та МЕДІУМ)
public/reviews/1.jpg … 27.jpg          — скріншоти відгуків (карусель + збільшення по кліку)
public/marquee/1.jpg … 8.jpg           — стрічка вгорі (необов'язково: поки порожньо,
                                         показуються фото з галерей пакетів)
public/about.jpg                       — портрет у блоці цитати та аватар кнопки
```

**Додали чи прибрали фото?** Оновіть кількість у `src/data.ts`:
масив `galleries` (поле `count` для блоків пакетів) і константа
`REVIEW_SCREENSHOTS` для відгуків.
- **Посилання** — `CONTACT_URL` (Telegram), `INSTAGRAM_URL`, `WHATSAPP_URL` у `src/data.ts`.
- **Ціни** — `src/components/PricingSection.tsx`.
- **Тексти hero** — `src/App.tsx` (компонент `Hero`).
- **Проєкти і відгуки** — масиви `projects` і `testimonials` у `src/data.ts`.

## Шрифти

У референс-дизайні були PP Mondwest / PP Neue Montreal — вони не підтримують кирилицю,
тому використано Playfair Display (акцентний serif, клас `font-accent`) і Manrope (основний).
Підключення — у `index.html`, налаштування — у `src/index.css`.
