import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { tap } from 'rxjs';
import { OrderApiService } from '../../../service/api_services/OrderApiService';
import { NotificationService } from '../../../service/NotificationService';
import { AuthService } from '../../../service/AuthService';
import { PackageApiService } from '../../../service/api_services/PackageApiService';
import { CompanyApiService } from '../../../service/api_services/CompanyApiService';
import { OrderStatus } from '../../../enum/OrderStatus';
import { PackageModel } from '../../../dto/PackageModel';
import { CompanyModel } from '../../../dto/CompanyModel';
import { OrderUpdateModel } from '../../../dto/OrderUpdateModel';
import { OrderModel } from '../../../dto/OrderModel';
import { OrderDetailUpdateModel } from '../../../dto/OrderDetailUpdateModel';
import {UserApiService} from "../../../service/api_services/UserApiService";
import {UserSearchModel} from "../../../dto/UserSearchModel";
import {UserModel} from "../../../dto/UserModel";
import {OrderSearchModel} from '../../../dto/OrderSearchModel';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule
  ],
  templateUrl: './OrderComp.html',
  styleUrls: ['./OrderComp.scss'],
  providers: [OrderApiService, PackageApiService, CompanyApiService, UserApiService]
})
export class OrderComp implements OnInit {
  orderFg: FormGroup = this.rxFormBuilder.formGroup(OrderUpdateModel);
  orderList: OrderModel[] = [];
  isEditMode = false;
  selectedOrderId: number | null = null;
  companyId: number | null = null;

  packages: PackageModel[] = [];
  companies: CompanyModel[] = [];
  userList: UserModel[] = [];
  orderStatuses = Object.values(OrderStatus);

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private orderApiService: OrderApiService,
    private packageApiService: PackageApiService,
    private companyApiService: CompanyApiService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private userApiService: UserApiService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.loadDropdownData();
    this.setValuesFromSecurity();
    this.orderFg.patchValue({
      companyId: this.companyId,
      invoiceNo: this.getInvoiceNumber,
      status: OrderStatus.OrderPlaced
    })
  }

  get getInvoiceNumber(): string {
    const now = new Date();
    const year = now.getFullYear().toString(); // Last 2 digits of year
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');

    // Get unique 6-digit number from timestamp (milliseconds + random)
    const timestamp = now.getTime();
    const random = Math.floor(Math.random() * 1000);
    const unique = ((timestamp + random) % 100000).toString().padStart(8, '0');

    return `INV-${year}${month}${day}-${unique}`;
  }

  get orderDetails() {
    return this.orderFg.get('orderDetails') as FormArray;
  }

  loadOrders(): void {
    this.orderApiService.search(new OrderSearchModel({companyId: this.companyId}))
      .pipe(
        tap((data: OrderModel[]) => {
          this.orderList = data;
        })
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error('Failed to load orders');
        }
      });
  }

  loadDropdownData(): void {
    this.packageApiService.getList().subscribe(data => this.packages = data);
    this.companyApiService.getList().subscribe(data => this.companies = data);
  }

  setValuesFromSecurity(): void {
    const payload = this.authService.getJwtPayload();
    if (payload && payload.CompanyId) {
      this.companyId = parseInt(payload.CompanyId, 10);
    } else {
      this.notificationService.error('Unable to determine user company');
    }
  }

  addDetail(): void {
    if (this.orderDetails.length > 0) {
      const lastIndex = this.orderDetails.length - 1;
      const lastDetail = this.orderDetails.at(lastIndex) as FormGroup;

      /*    if (lastDetail.invalid) {
            lastDetail.markAllAsTouched();

            const detailValue = lastDetail.value;
            const rowNum = this.orderDetails.length;

            if (!detailValue.packageId) {
              this.notificationService.error(`Package is required at row ${rowNum}`);
              return;
            }
            if (!detailValue.price) {
              this.notificationService.error(`Price is required at row ${rowNum}`);
              return;
            }
            if (!detailValue.discount) {
              this.notificationService.error(`Discount is required at row ${rowNum}`);
              return;
            }
            if (!detailValue.netPrice) {
              this.notificationService.error(`Net Price is required at row ${rowNum}`);
              return;
            }

            this.notificationService.error(`Please fill all required fields correctly at row ${rowNum}`);
            return;
          }*/
    }

    const detail = new OrderDetailUpdateModel();
    this.orderDetails.push(this.rxFormBuilder.formGroup(detail));
  }

  removeDetail(index: number, detail: AbstractControl): void {
    const idControl = detail.get('id');
    if (idControl && idControl.value) {
      this.deleteOrderDetail(idControl.value, index);
    } else {
      this.orderDetails.removeAt(index);
    }
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const model = new OrderUpdateModel(this.orderFg.value);

    if (this.isEditMode && this.selectedOrderId) {
      model.id = this.selectedOrderId;
      this.orderApiService.update(model).subscribe({
        next: () => {
          this.notificationService.success('Order updated successfully');
          this.resetForm();
          this.loadOrders();
        },
        error: (err) => {
          this.notificationService.error(err.error?.message || 'Update failed');
        }
      });
    } else {
      model.status = OrderStatus.OrderPlaced;
      this.orderApiService.create(model).subscribe({
        next: () => {
          this.notificationService.success('Order created successfully');
          this.resetForm();
          this.loadOrders();
        },
        error: (err) => {
          this.notificationService.error(err.error?.message || 'Creation failed');
        }
      });
    }
  }

  validate(): boolean {
    this.orderFg.patchValue({ companyId: this.companyId });

    if (!this.orderFg.value.invoiceNo) {
      this.notificationService.error('Invoice No is required');
      return false;
    }
    if (!this.orderFg.value.fullName) {
      this.notificationService.error('Full Name is required');
      return false;
    }
    if (!this.orderFg.value.userId) {
      this.notificationService.error('User is required');
      return false;
    }
    if (!this.orderFg.value.pilgrimCompanyId) {
      this.notificationService.error('Pilgrim Company is required');
      return false;
    }

    if (!this.orderFg.value.date) {
      this.notificationService.error('Date is required');
      return false;
    }
    if (!this.orderFg.value.status) {
      this.notificationService.error('Status is required');
      return false;
    }

    const details = this.orderFg.value.orderDetails as any[];
    if (details && details.length > 0) {
      for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        const rowNum = i + 1;
        if (!detail.packageId) {
          this.notificationService.error(`Package is required at row ${rowNum}`);
          return false;
        }
        if (!detail.price) {
          this.notificationService.error(`Price is required at row ${rowNum}`);
          return false;
        }
        if (detail.discount === null || detail.discount === undefined) {
          this.notificationService.error(`Discount is required at row ${rowNum}`);
          return false;
        }
        if (!detail.netPrice) {
          this.notificationService.error(`Net Price is required at row ${rowNum}`);
          return false;
        }
      }
    }

    if (this.orderFg.invalid) {
      this.orderFg.markAllAsTouched();
      this.notificationService.error('Please fill all required fields correctly');
      return false;
    }
    return true;
  }

  editOrder(order: OrderModel): void {
    this.isEditMode = true;
    this.selectedOrderId = order.id;

    // Convert dates for bsDatepicker if needed
    const orderData = {
      ...order,
      date: order.date ? new Date(order.date) : null
    };

    // Reset and patch
    this.orderFg = this.rxFormBuilder.formGroup(OrderUpdateModel, orderData);
  }

  deleteOrder(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this order?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.orderApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Order deleted successfully');
              this.loadOrders();
            },
            error: (err) => {
              this.notificationService.error(err.error?.message || 'Delete failed');
            }
          });
        }
      });
  }

  deleteOrderDetail(id: number | null, index: number): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this order detail?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.orderApiService.deleteOrderDetail(id).subscribe({
            next: () => {
              this.notificationService.success('Order detail deleted successfully');
              this.orderDetails.removeAt(index);
            },
            error: (err) => {
              this.notificationService.error(err.error?.message || 'Delete failed');
            }
          });
        }
      });
  }

  searchUser(companyId: number): void {
    this.userApiService.search(new UserSearchModel({companyId}))
      .subscribe(data => this.userList = data);
  }

  resetForm(): void {
    this.orderFg = this.rxFormBuilder.formGroup(OrderUpdateModel);
    this.isEditMode = false;
    this.selectedOrderId = null;
  }

  onChangeCompany() {
    if (this.orderFg.value.pilgrimCompanyId) {
      this.searchUser(this.orderFg.value.pilgrimCompanyId);
    } else {
      this.userList = [];
    }
  }

  onChangeUser(user: UserModel) {
    console.log(user);
    if (user) {
      this.orderFg.patchValue({
        fullName: user.firstName + ' ' + user.lastName,
        mobileNo: user.mobile,
        email: user.email,
        country: user.country
      });
    } else {
      this.orderFg.patchValue({
        fullName: null,
        contactNo: null,
        email: null,
        country: null
      });
    }
  }
}
