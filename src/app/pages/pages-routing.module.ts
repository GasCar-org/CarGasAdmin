import { CompanyCommisionComponent } from "./reports/company-commision/company-commision.component";
import { SendnotificationComponent } from "./sendnotification/sendnotification.component";
import { timesComponent } from "./times/times.component";
import { TunckOrderComponent } from "./Orders/tunck-order/tunck-order.component";
import { AuthGuardService } from "./service/auth-guard.service";
import { RevenuComponent } from "./reports/revenu/revenu.component";
import { AdminComponent } from "./admin/admin.component";
import { ChatComponent } from "./Orders/chat/chat.component";
import { CouponComponent } from "./coupon/coupon.component";
import { AddofferquotComponent } from "./offer/offerquot/addofferquot/addofferquot.component";
import { AddbasketComponent } from "./offer/basket/addbasket/addbasket.component";
import { BasketComponent } from "./offer/basket/basket.component";
import { ClientComponent } from "./Users/client/client.component";
import { AdvsComponent } from "./advs/advs.component";
import { AddProductComponent } from "./product/products/add-product/add-product.component";
import { SupplierProductsComponent } from "./product/supplier-products/supplier-products.component";
import { SupplierComponent } from "./product/supplier/supplier.component";
import { ProductsComponent } from "./product/products/products.component";
import { CategoryComponent } from "./product/category/category.component";
import { StaticpageComponent } from "./staticpage/staticpage.component";
import { ContactinfoComponent } from "./contactinfo/contactinfo.component";
import { DeliveryoptionsComponent } from "./deliveryoptions/deliveryoptions.component";
import { BuyoptionsComponent } from "./buyoptions/buyoptions.component";
import { BuyunitsComponent } from "./buyunits/buyunits.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ECommerceComponent } from "./e-commerce/e-commerce.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { PostsComponent } from "./posts/posts.component";
import { SociallinksComponent } from "./sociallinks/sociallinks.component";
import { AddSupplierProductComponent } from "./product/supplier-products/add-supplier-product/add-supplier-product.component";
import { SubCategoryComponent } from "./product/category/sub-category/sub-category.component";
import { OfferquotComponent } from "./offer/offerquot/offerquot.component";
import { PointsComponent } from "./points/points.component";
import { PointsManageComponent } from "./points/points-manage/points-manage.component";
import { OrderManageComponent } from "./Orders/order-manage/order-manage.component";
import { CustomerMapComponent } from "./Orders/customerMap/customerMap.component";
import { DriverComponent } from "./driver/driver.component";
import { TrackingComponent } from "./Orders/tracking/tracking.component";
import { RatesComponent } from "./Orders/rates/rates.component";
import { OrdermapComponent } from "./reports/ordermap/ordermap.component";
import { OrderstatusComponent } from "./reports/orderstatus/orderstatus.component";
import { DriverMapComponent } from "./reports/driver-map/driver-map.component";
import { DailyOrdersComponent } from "./reports/daily-orders/daily-orders.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: ECommerceComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "iot-dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "constant",
        children: [
          {
            path: "buyunits",
            component: BuyunitsComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات"] },
          },
          {
            path: "unitsoptions",
            component: BuyoptionsComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات"] },
          },
          {
            path: "deliverytime",
            component: timesComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات"] },
          },
          {
            path: "delivery",
            component: PostsComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات"] },
          },
          {
            path: "deliveryoptions",
            component: DeliveryoptionsComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات"] },
          },
          {
            path: "sociallink",
            component: SociallinksComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات"] },
          },
          {
            path: "contactinfo",
            component: ContactinfoComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات"] },
          },
          {
            path: "staticpage/:id",
            component: StaticpageComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات"] },
          },
          {
            path: "staticpage",
            component: StaticpageComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات"] },
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            path: "sendnotification",
            component: SendnotificationComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "ادارة مستخدمين النظام"] },
          },
          {
            path: "AddAdmin",
            component: AdminComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "ادارة مستخدمين النظام"] },
          },
          {
            path: "AddAdmin/:id",
            component: AdminComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "ادارة مستخدمين النظام"] },
          },
        ],
      },
      {
        path: "product",
        children: [
          {
            path: "subcategory/:id",
            component: SubCategoryComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الشركات والأصناف"] },
          },
          {
            path: "subcategory",
            component: SubCategoryComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الشركات والأصناف"] },
          },
          {
            path: "category/:id",
            component: CategoryComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الشركات والأصناف"] },
          },
          {
            path: "category",
            component: CategoryComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الشركات والأصناف"] },
          },
          {
            path: "supplier/:id",
            component: SupplierComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الشركات والأصناف"] },
          },
          {
            path: "supplier",
            component: SupplierComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الشركات والأصناف"] },
          },
          {
            path: "product/:id",
            component: AddProductComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "المنتجات"] },
          },
          {
            path: "product",
            component: AddProductComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "المنتجات"] },
          },
          {
            path: "products",
            component: ProductsComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "المنتجات"] },
          },
          {
            path: "addsupplierproducts/:id",
            component: AddSupplierProductComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "المنتجات"] },
          },
          {
            path: "addsupplierproducts",
            component: AddSupplierProductComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "المنتجات"] },
          },
          {
            path: "supplierproducts",
            component: SupplierProductsComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "المنتجات"] },
          },
        ],
      },
      {
        path: "adv",
        children: [
          {
            path: "AddAdv/:id",
            component: AdvsComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الاعلانات والعروض"] },
          },
          {
            path: "AddAdv",
            component: AdvsComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الاعلانات والعروض"] },
          },
        ],
      },
      {
        path: "basket",
        children: [
          {
            path: "addbasket/:id",
            component: AddbasketComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الاعلانات والعروض"] },
          },
          {
            path: "addbasket",
            component: AddbasketComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الاعلانات والعروض"] },
          },
          {
            path: "basket",
            component: BasketComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الاعلانات والعروض"] },
          },
        ],
      },
      {
        path: "Coupon",
        children: [
          { path: "addcoupon/:id", component: CouponComponent },
          { path: "addcoupon", component: CouponComponent },
        ],
      },
      {
        path: "offer",
        children: [
          {
            path: "addoffer/:id",
            component: AddofferquotComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الاعلانات والعروض"] },
          },
          {
            path: "addoffer",
            component: AddofferquotComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الاعلانات والعروض"] },
          },
          {
            path: "offer",
            component: OfferquotComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "الاعلانات والعروض"] },
          },
        ],
      },
      {
        path: "Coupon",
        children: [
          {
            path: "addcoupon/:id",
            component: CouponComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "النقاط"] },
          },
          {
            path: "addcoupon",
            component: CouponComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "النقاط"] },
          },
          {
            path: "addPoints",
            component: PointsComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "النقاط"] },
          },
          {
            path: "Points",
            component: PointsManageComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "النقاط"] },
          },
        ],
      },
      {
        path: "order",
        children: [
          {
            path: "orders",
            component: OrderManageComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "ادارة الطلبات"] },
          },
          {
            path: "tunckorders",
            component: TunckOrderComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "ادارة الطلبات"] },
          },
          {
            path: "customerMap/:id",
            component: CustomerMapComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "ادارة الطلبات"] },
          },
          {
            path: "chat",
            component: ChatComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "ادارة الطلبات"] },
          },
          {
            path: "tracking/:id",
            component: TrackingComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "ادارة الطلبات"] },
          },
          {
            path: "rates",
            component: RatesComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "ادارة الطلبات"] },
          },
        ],
      },
      {
        path: "users",
        children: [
          {
            path: "clients",
            component: ClientComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "ادارة المستخدمين"] },
          },
          {
            path: "Drivers",
            component: DriverComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "ادارة المستخدمين"] },
          },
          {
            path: "Drivers/:id",
            component: DriverComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "ادارة المستخدمين"] },
          },
        ],
      },
      {
        path: "report",
        children: [
          {
            path: "map",
            component: OrdermapComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "التقارير"] },
          },
          {
            path: "drivermap",
            component: DriverMapComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "التقارير"] },
          },
          {
            path: "revenu",
            component: RevenuComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "التقارير"] },
          },
          {
            path: "orderstatus",
            component: OrderstatusComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "التقارير"] },
          },
          {
            path: "commision",
            component: CompanyCommisionComponent,
            canActivate: [AuthGuardService],
            data: { roles: ["كل الصلاحيات", "التقارير"] },
          },
        ],
      },
      {
        path: "charts",
        loadChildren: "./charts/charts.module#ChartsModule",
      },
      {
        path: "editors",
        loadChildren: "./editors/editors.module#EditorsModule",
      },
      {
        path: "forms",
        loadChildren: "./forms/forms.module#FormsModule",
      },
      // {
      //   path: 'miscellaneous',
      //   loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
      // },
      {
        path: "404",
        component: NotFoundComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
