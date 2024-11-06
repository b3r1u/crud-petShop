import { Injectable } from '@angular/core';
import { Pet } from 'src/app/model/pet';
@Injectable({
  providedIn: 'root',
})
export class PetService {
  private storageKey = 'pets';

  getPets(): Pet[] {
    const petsData = localStorage.getItem(this.storageKey);
    return petsData ? JSON.parse(petsData) : [];
  }

  addPet(pet: Pet): void {
    const pets = this.getPets();
    pet.id = pets.length ? pets[pets.length - 1].id + 1 : 1;
    pets.push(pet);
    localStorage.setItem(this.storageKey, JSON.stringify(pets));
  }

  updatePet(updatedPet: Pet): void {
    const pets = this.getPets().map((pet) =>
      pet.id === updatedPet.id ? updatedPet : pet
    );
    localStorage.setItem(this.storageKey, JSON.stringify(pets));
  }

  deletePet(id: number): void {
    const pets = this.getPets().filter((pet) => pet.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(pets));
  }

  getPetById(id: number): Pet | undefined {
    return this.getPets().find((pet) => pet.id === id);
  }
}
