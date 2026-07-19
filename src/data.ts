// Shared data: contact links, photo locations, packages, reviews.

export const CONTACT_URL = 'https://t.me/kompanec_ph'
export const INSTAGRAM_URL = 'https://www.instagram.com/kompanec_ph?igsh=dTk0cnY5cnJ4NGg2'
export const WHATSAPP_URL = 'https://wa.me/380632326056'

// Real portrait used in the quote block and the CTA button avatar
export const parallaxImage = '/about.jpg'

// ---------------------------------------------------------------------------
// Package photo galleries: files live in public/packages/<id>/1.jpg … <count>.jpg
// The wedding gallery is shared by both wedding packages (МІНІ + МЕДІУМ).
// After adding/removing files, update `count` here.
// ---------------------------------------------------------------------------
export interface Gallery {
  id: string
  name: string
  count: number
}

export const galleries: Gallery[] = [
  { id: 'pack1', name: 'Індивідуальна', count: 9 },
  { id: 'pack2', name: 'Парна', count: 5 },
  { id: 'pack3', name: 'Сімейна', count: 7 },
  { id: 'pack4', name: 'Таїнство Хрещення', count: 6 },
  { id: 'wedding', name: 'Весільна зйомка', count: 7 },
]

export const galleryImages = (id: string) => {
  const gallery = galleries.find((g) => g.id === id)
  const count = gallery ? gallery.count : 5
  return Array.from({ length: count }, (_, i) => `/packages/${id}/${i + 1}.jpg`)
}

// ---------------------------------------------------------------------------
// Top marquee: photos live in public/marquee/1.jpg … <MARQUEE_PHOTOS>.jpg.
// If a file is missing, a photo from the package galleries is shown instead.
// ---------------------------------------------------------------------------
export const MARQUEE_PHOTOS = 24
export const marqueeImages: string[] = Array.from(
  { length: MARQUEE_PHOTOS },
  (_, i) => `/marquee/${i + 1}.jpg`,
)
export const marqueeFallbacks: string[] = [
  '/packages/pack1/1.jpg',
  '/packages/wedding/1.jpg',
  '/packages/pack3/1.jpg',
  '/packages/pack4/1.jpg',
  '/packages/pack1/2.jpg',
  '/packages/wedding/2.jpg',
  '/packages/pack3/2.jpg',
  '/packages/pack4/2.jpg',
]

// ---------------------------------------------------------------------------
// Review screenshots: public/reviews/1.jpg … <REVIEW_SCREENSHOTS>.jpg
// After adding/removing files, update the number here.
// ---------------------------------------------------------------------------
export const REVIEW_SCREENSHOTS = 27
export const reviewImages: string[] = Array.from(
  { length: REVIEW_SCREENSHOTS },
  (_, i) => `/reviews/${i + 1}.jpg`,
)

// ---------------------------------------------------------------------------
// Service packages (pricing cards). galleryId points to the photo block.
// ---------------------------------------------------------------------------
export interface ServicePackage {
  id: string
  galleryId: string
  name: string
  desc?: string
  price: string
  priceNote: string
  features: string[]
  featured?: boolean
}

export const packages: ServicePackage[] = [
  {
    id: 'pack1',
    galleryId: 'pack1',
    name: 'Індивідуальна',
    desc: 'Портретна зйомка для однієї людини.',
    price: '4 000 грн',
    priceNote: 'за 1 годину зйомки',
    features: [
      'Допомога в підборі локації',
      'Формування образів в одному стилі та кольоровій гамі — з власного гардеробу або оренда образів у Києві',
      'Допрацювання ідеї в цілісну картинку',
      '80+ фото в авторській обробці та легка ретуш обличчя',
      'Коротенькі відео формату рілс на професійну камеру',
      'Підготовка референсів до зйомки',
      'Допомога з позуванням і легка атмосфера',
      'Матеріал у гарній галереї для зручного завантаження',
    ],
  },
  {
    id: 'pack2',
    galleryId: 'pack2',
    name: 'Парна',
    desc: 'Лав сторі, мама й дитина, подружки. У кадрі — 2 людини.',
    price: '4 000 грн',
    priceNote: 'за 1 годину зйомки',
    features: [
      'Допомога в підборі локації',
      'Формування образів в одному стилі та кольоровій гамі — з власного гардеробу або оренда образів у Києві',
      'Допрацювання ідеї в цілісну картинку',
      '80+ фото в авторській обробці та легка ретуш обличчя',
      'Коротенькі відео формату рілс на професійну камеру',
      'Підготовка референсів до зйомки',
      'Допомога з позуванням і легка атмосфера',
      'Матеріал у гарній галереї для зручного завантаження',
    ],
  },
  {
    id: 'pack3',
    galleryId: 'pack3',
    name: 'Сімейна',
    desc: 'До 5 осіб у кадрі.',
    price: '4 000 грн',
    priceNote: 'за 1 годину зйомки',
    features: [
      'Допомога в підборі локації',
      'Формування образів в одному стилі та кольоровій гамі — з власного гардеробу або оренда образів у Києві',
      'Допрацювання ідеї в цілісну картинку',
      'Список атрибутів, які можна використати під час зйомки',
      '110+ фото в авторській обробці та легка ретуш обличчя',
      'Коротенькі відео формату рілс на професійну камеру',
      'Підготовка референсів до зйомки',
      'Допомога з позуванням і легка атмосфера',
      'Матеріал у гарній галереї для зручного завантаження',
    ],
  },
  {
    id: 'pack4',
    galleryId: 'pack4',
    name: 'Таїнство Хрещення',
    desc: 'Тривалість — 1 година ± 10 хвилин.',
    price: '4 500 грн',
    priceNote: 'за зйомку',
    featured: true,
    features: [
      'Зйомка самого процесу таїнства',
      'Вводини мами в храм',
      'Постановочні фото в храмі',
      'Загальне фото біля храму',
      '150+ фото в гарній галереї',
      'За бажанням — коротенькі відео формату рілс (пріоритет — фото)',
      'Рекомендації з підготовки до таїнства після бронювання',
      'Можливість замовити фотоальбом або холст (ціна окремо)',
    ],
  },
  {
    id: 'pack5',
    galleryId: 'wedding',
    name: 'Весільний — МІНІ',
    desc: '1 година зйомки.',
    price: '4 000 грн',
    priceNote: 'за зйомку',
    features: [
      'Фото розпису',
      'Фото біля РАЦСу — з рідними та пари',
      '1–2 коротенькі відео формату рілс за вашим бажанням',
      '100+ фото в авторській обробці + легка ретуш облич',
    ],
  },
  {
    id: 'pack6',
    galleryId: 'wedding',
    name: 'Весільний — МЕДІУМ',
    desc: '2 години зйомки.',
    price: '7 000 грн',
    priceNote: 'за зйомку',
    features: [
      'Фото розпису',
      'Фото біля РАЦСу з рідними',
      'Прогулянка на локації, яку ви оберете',
      '1–2 відео в РАЦСі + рілс під час прогулянки',
      '180+ фото в авторській обробці + легка ретуш облич',
      'Фото у гарній галереї',
      'Можливість замовити фотоальбом (ціна окремо)',
    ],
  },
]
