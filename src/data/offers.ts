import { Offer } from '@/types';

export const offers: Offer[] = [
  {
    id: 1,
    name: "ОГРАНИЧЕНА ОФЕРТА ЗА РЕМОНТНИ ЧАСТИ",
    image_url: "https://blog.bindy.com/wp-content/uploads/2022/10/shutterstock_1124428316-1024x682.jpg",
    description: "Получете до 50% отстъпка на всички ремонтни части. Ограничена във времето оферта за спирачни накладки, филтри и двигателни компоненти.",
    discount_percentage: 50,
    valid_until: "2024-12-31"
  },
  {
    id: 2,
    name: "НАЙ-ДОБРА ОФЕРТА ЗА ЧАСТИ ЗА КАРОСЕРИЯТА",
    image_url: "https://di-uploads-pod14.dealerinspire.com/toyotaoforlando/uploads/2021/08/auto-repairs-1024x683.jpeg",
    description: "Специална отстъпка за части за каросерията, включително предни и задни брони, огледала и панели. Безплатна доставка за поръчки над 200 лв.",
    discount_percentage: 30,
    valid_until: "2024-12-31"
  }
];
