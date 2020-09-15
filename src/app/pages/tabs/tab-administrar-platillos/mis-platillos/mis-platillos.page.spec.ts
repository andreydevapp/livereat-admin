import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisPlatillosPage } from './mis-platillos.page';

describe('MisPlatillosPage', () => {
  let component: MisPlatillosPage;
  let fixture: ComponentFixture<MisPlatillosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPlatillosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisPlatillosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
