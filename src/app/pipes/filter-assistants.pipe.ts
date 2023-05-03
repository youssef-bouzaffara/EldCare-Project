import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAssistants'
})

export class FilterAssistantsPipe implements PipeTransform {

  transform(assistantsTable: any, term:any){
    if (term === undefined) {
      return assistantsTable;
    }
    return assistantsTable.filter((obj)=>{
      return(
        obj.firstName.toLowerCase().includes(term.toLowerCase()) ||
        obj.lastName.toLowerCase().includes(term.toLowerCase()) ||
        obj.address.toLowerCase().includes(term.toLowerCase()) ||
        obj.status.toLowerCase().includes(term.toLowerCase())
      );
    });
  }

}
