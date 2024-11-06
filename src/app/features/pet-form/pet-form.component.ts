import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pet } from 'src/app/model/pet';
import { PetService } from 'src/service/pet.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss'],
})
export class PetFormComponent implements OnChanges {
  @Input() petToEdit: Pet | null = null;
  @Output() petSaved = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  petForm: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private petService: PetService) {
    this.petForm = this.fb.group({
      ownerName: ['', Validators.required],
      petName: ['', Validators.required],
      breed: ['', Validators.required],
      service: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['petToEdit']) {
      if (this.petToEdit) {
        this.isEditing = true;
        this.petForm.patchValue(this.petToEdit);
      } else {
        this.isEditing = false;
        this.petForm.reset();
      }
    }
  }

  onSubmit(): void {
    if (this.petForm.invalid) return;

    const petData = {
      ...this.petForm.value,
      id: this.petToEdit ? this.petToEdit.id : undefined,
    };

    if (this.isEditing) {
      this.petService.updatePet(petData);
    } else {
      this.petService.addPet(petData);
    }

    this.petSaved.emit();
    this.cancelEdit.emit();
    this.petForm.reset();
    this.isEditing = false;
  }

  onCancel(): void {
    this.petForm.reset();
    this.isEditing = false;
    this.cancelEdit.emit();
  }
}
