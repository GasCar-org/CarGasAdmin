import { Component, OnDestroy } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { OrderService } from '../../service/order.service';
import { appConstant } from '../../service/_constant/appConstant';

@Component({
  selector: 'ngx-country-orders',
  styleUrls: ['./country-orders.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.md ? 'medium' : 'xxlarge'">
      <nb-card-header>المدن الأكثر تسجيلا</nb-card-header>
      <nb-card-body>
 
      <ngx-charts-bar-vertical class="chart-container" [view]="view2" [scheme]="colorScheme2" [schemeType]="schemeType2"
      [results]="single2" [animations]="true" [gradient]="false" [xAxis]="true"
      [yAxis]="true" [legend]="true" [legendTitle]="'المعرف'" [showXAxisLabel]="true" [showYAxisLabel]="true"
      [tooltipDisabled]="false" [xAxisLabel]="'المدينة'" [yAxisLabel]="'المستخدمين'" [showGridLines]="true" [barPadding]="8"
      [roundDomains]="false" (select)="select($event)" (legendLabelClick)="onLegendLabelClick($event)">
      <!-- <ng-template #tooltipTemplate let-model="model">
        <h1>
          {{getFlag(model.name)}}
        </h1>
        <h2>{{model.name}}: {{model.value}}</h2>
      </ng-template> -->
    </ngx-charts-bar-vertical>

      </nb-card-body>
    </nb-card>
  `,
})
export class CountryOrdersComponent implements OnDestroy {

  private alive = true;



  colorScheme2 = 'forest'
  schemeType2: string = 'ordinal';
  customColors2
  single2
  view2
  width2: number = 1000;
  height2: number = 300;
  yScaleMax: number;


  private getRandomData(nPoints: number): number[] {
    return Array.from(Array(nPoints)).map(() => {
      return Math.round(Math.random() * 20);
    });
  }

  countryName = 'SAU';
  countryData = [];
  countriesCategories = [];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;

  constructor(private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private service: OrderService
  ) {

    // this.service.rpt_getTop5RegisterCities().subscribe((res) => {
    //   let items = res[appConstant.ITEMS] as any[]
    //   this.single2 = items
    //   this.view2 = [this.width2, this.height2];

    // })



    // this.service.rpt_getTop5RegisterCities().subscribe((res) => {
    //   let items = res[appConstant.ITEMS] as any[]
    //   items.forEach(element => {
    //     this.countryData.push(element.value)
    //     this.countriesCategories.push(element.name)
    //   });
    //   this.countriesCategories = [...this.countriesCategories]
    //   this.countryData = this.getRandomData(this.countriesCategories.length);

    //   this.countryData = [...this.countryData]
    //   this.selectCountryById(this.countryName)
    // })

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  selectCountryById(countryName: string) {
    const nPoint = this.countriesCategories.length;

    console.log(nPoint)
    this.countryName = countryName;
    this.countryData = this.getRandomData(nPoint);
    // console.log(this.countryData)
  }


  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }


  ngOnDestroy() {
    this.alive = false;
  }
}
