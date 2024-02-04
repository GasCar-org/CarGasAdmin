import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SuperClass } from "./SuperClass";

export class SupplierProduct extends SuperClass { 
    private supplier_id: string;
    private category_id: string;
    private sub_category_id: string;
    private product_id: string;
    private dt_end: string;
    private qty: number;
    private prices: any[];
    
    constructor(supplier_id?: string, category_id?: string , sub_category_id? :string, product_id?: string, dt_end?: string ,qty?:number , prices?:any[] ) {
        super();
        this.supplier_id = supplier_id;
        this.category_id = category_id;
        this.sub_category_id = sub_category_id;
        this.product_id = product_id;
        this.dt_end = dt_end;
        this.qty = qty;
        this.prices = prices;
    }

    // get getId(): number {
    //     return this.id;
    // }
    // set setId(value: number) {
    //     this.id = value;
    // }

    public update(supplier_id?: string, category_id?: string, product_id?: string, dt_end?: string ,qty?:number , prices?:any[] ) {
        this.supplier_id = supplier_id;
        this.category_id = category_id;
        this.product_id = product_id;
        this.dt_end = dt_end;
        this.qty = qty;
        this.prices = prices; 
    }


    public static buildForm(_fb: FormBuilder): FormGroup {
        return _fb.group({
            supplier_id: [null, Validators.required],
            category_id: [null, Validators.required],
            sub_category_id: [null, Validators.required],
            product_id: [null, Validators.required],
            dt_end: [null, Validators.required],
            qty: [null, Validators.required],
            prices: _fb.array([ ])
            // questionAnswers: fb.group({
            //     questionId: [null],
            //     answerId: [null]
            // })
            //prices: [null, Validators.required]
        });
    }
}