import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableauDeBordComponent } from './tableau-de-bord.component';
import { By } from '@angular/platform-browser';

describe('TableauDeBordComponent', () => {
  let component: TableauDeBordComponent;
  let fixture: ComponentFixture<TableauDeBordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauDeBordComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableauDeBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher les boutons de filtres pour chaque pandémie', () => {
    component.pandemiesDisponibles = ['COVID-19', 'MPOX'];
    fixture.detectChanges();

    const boutons = fixture.debugElement.queryAll(By.css('.filtres button'));
    expect(boutons.length).toBe(3); // 2 pandémies + 1 bouton "Toutes les données"
  });

  it('doit changer selectedPandemie quand on clique sur un filtre', () => {
    component.pandemiesDisponibles = ['COVID-19', 'MPOX'];
    fixture.detectChanges();

    const boutons = fixture.debugElement.queryAll(By.css('.filtres button'));
    boutons[0].nativeElement.click(); // Clique sur "COVID-19"
    fixture.detectChanges();

    expect(component.selectedPandemie).toBe('COVID-19');
  });
});
