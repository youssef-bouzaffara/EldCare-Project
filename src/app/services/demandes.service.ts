import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {

  demandeUrl: string = "http://localhost:3001/demandes";

  constructor(
    private httpClient: HttpClient
  ) { }


  addDemande(obj) {
    return this.httpClient.post<{ message: string, isAdded: boolean }>(this.demandeUrl + "/addNewDemande", obj);
  }

  getAllDemandes() {
    return this.httpClient.get<{ message: string, demandes: any }>(this.demandeUrl+"/getAllDemandes");
  }

  getDemandeById(id){
    return this.httpClient.get<{demande: any, isFinded: boolean}>(`${this.demandeUrl}/getDemande/${id}`);
  }

  deleteDemandeById(id){
    return this.httpClient.delete<{message: string, isDeleted: boolean}>(`${this.demandeUrl}/deleteDemande/${id}`);
  }

  editDemandeById(obj){
    return this.httpClient.put<{message: string, isEdited: boolean}>(this.demandeUrl+"/editDemande",obj);
  }
}
