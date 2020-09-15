import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayMethodPage } from './pay-method.page';

describe('PayMethodPage', () => {
  let component: PayMethodPage;
  let fixture: ComponentFixture<PayMethodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayMethodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayMethodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
