import { NbMenuItem } from '@nebular/theme';
import { CouponComponent } from './coupon/coupon.component';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'الرئيسية',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'النظام',
    group: true,
  },
  {
    title: 'مستخدمين النظام',
    icon: 'nb-person',
    children: [
      {
        title: 'ادارة المستخدمين',
        link: '/pages/admin/AddAdmin',
      }
    ]
  },
  {
    title: 'التنبيهات والخصومات',
    group: true,
  },
  {
    title: 'التنبيهات والخصومات',
    icon: 'nb-notifications',
    children: [
      {
        title: 'ارسال تنبيه',
        link: '/pages/admin/sendnotification',
      },
      {
        title: 'ادارة الكوبونات',
        link: '/pages/Coupon/addcoupon',
      }
    ]
  },
  {
    title: 'الثوابت',
    group: true,
  },
  {
    title: 'الثوابت',
    icon: 'nb-keypad',
    link: '/pages/constant',
    children: [
      {
        title: 'الاعلانات',
        link: '/pages/adv/AddAdv',
      },
      {
        title: 'اعدادات عامة',
        link: '/pages/constant/delivery',
      },
      {
        title: 'ادارة اوقات التوصيل',
        link: '/pages/constant/deliverytime',
      },
      {
        title: 'ادارة المدن',
        link: '/pages/constant/deliveryoptions',
      },
      {
        title: 'السوشيال ميديا',
        link: '/pages/constant/sociallink',
      },
      {
        title: 'معلومات التواصل',
        link: '/pages/constant/contactinfo',
      },
      {
        title: 'ادارة الصفحات الثابتة',
        link: '/pages/constant/staticpage',
      }
    ],
  },
  {
    title: 'الأصناف والشركات',
    group: true,
  },
  {
    title: 'الاصناف والشركات',
    icon: 'nb-e-commerce',
    children: [
      {
        title: 'ادارة الأصناف الرئيسية',
        link: '/pages/product/category',
      },
      {
        title: 'ادارة الشركات',
        link: '/pages/product/supplier',
      }
    ],
  },
  {
    title: 'المنتجات',
    icon: 'nb-tables',
    children: [
      {
        title: 'اضافة منتج',
        link: '/pages/product/product',
      },
      {
        title: 'ادارة المنتجات',
        link: '/pages/product/products',
      }
    ],
  },
  {
    title: 'النقاط',
    icon: 'nb-compose',
    children: [
      {
        title: 'ادارة النقاط',
        link: '/pages/Coupon/Points',
      }
    ],
  },
  {
    title: 'العملاء',
    group: true,
  },
  {
    title: 'المستخدمين',
    icon: 'nb-person',
    children: [
      {
        title: 'ادارة المستخدمين',
        link: '/pages/users/clients',
      },
      {
        title: 'ادارة السائقين',
        link: '/pages/users/Drivers',
      }
    ],
  },
  {
    title: 'الطلبات',
    group: true,
  },
  {
    title: 'الطلبات',
    icon: 'nb-e-commerce',
    children: [
      {
        title: 'ادارة الطلبات',
        link: '/pages/order/orders',
      },
      {
        title: 'ادارة طلبات الخزانات',
        link: '/pages/order/tunckorders',
      },
      {
        title: 'التقييمات',
        link: '/pages/order/rates',
      }
    ],
  },
  {
    title: 'التقارير',
    group: true,
  },
  {
    title: 'التقارير',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'العمولات المستحقة',
        link: '/pages/report/commision',
      },
      {
        title: 'الطلبات والحالات',
        link: '/pages/report/orderstatus',
      },
      {
        title: 'العائدات',
        link: '/pages/report/revenu',
      },
      {
        title: 'التوزيع الجغرافي للطلبات',
        link: '/pages/report/map',
      },
      {
        title: 'التوزيع الجغرافي للسائقين',
        link: '/pages/report/drivermap',
      }
    ]
  }
];
