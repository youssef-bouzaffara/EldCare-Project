import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDemandes'
})
export class FilterDemandesPipe implements PipeTransform {

  transform(demandesTable: any, term: any) {
    if (term === undefined) {
      return demandesTable
    }
    return demandesTable.filter((obj)=>{
      return(obj.demanderName.toLowerCase().includes(term.toLowerCase()) || 
      obj.assistantName.toLowerCase().includes(term.toLowerCase()) || 
      obj.status.toLowerCase().includes(term.toLowerCase()) 
      );
    });
  }

}
