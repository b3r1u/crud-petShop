import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/model/pet';
import { PetService } from 'src/service/pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];
  petToEdit: Pet | null = null;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.pets = this.petService.getPets();
  }

  deletePet(id: number): void {
    this.petService.deletePet(id);
    this.loadPets();
  }

  editPet(pet: Pet): void {
    this.petToEdit = { ...pet };
  }

  onPetSaved(): void {
    this.loadPets();
    this.petToEdit = null;
  }

  onCancelEdit(): void {
    this.petToEdit = null;
  }
}
