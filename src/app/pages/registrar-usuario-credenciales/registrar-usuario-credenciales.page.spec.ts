import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistrarUsuarioCredencialesPage } from './registrar-usuario-credenciales.page';

describe('RegistrarUsuarioCredencialesPage', () => {
  let component: RegistrarUsuarioCredencialesPage;
  let fixture: ComponentFixture<RegistrarUsuarioCredencialesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarUsuarioCredencialesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarUsuarioCredencialesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
