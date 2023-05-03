import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(usersTable: any, term: any) {
    if (term === undefined) {
      return usersTable
    }
    return usersTable.filter((obj)=>{
      return(obj.firstName.toLowerCase().includes(term.toLowerCase()) || 
      obj.lastName.toLowerCase().includes(term.toLowerCase()) || 
      obj.address.toLowerCase().includes(term.toLowerCase()) ||
      obj.status.toLowerCase().includes(term.toLowerCase())
      );
    });
  }

}
