import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificarPlatillosPage } from './modificar-platillos.page';

describe('ModificarPlatillosPage', () => {
  let component: ModificarPlatillosPage;
  let fixture: ComponentFixture<ModificarPlatillosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarPlatillosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarPlatillosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
