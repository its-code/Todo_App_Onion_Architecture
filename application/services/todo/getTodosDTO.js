import PaginationOptions from '../../Domain/Utils/PaginationOptions';

class GetTodosDTO {
      
    constructor(page , limit) {
      this.paginationOptions = new PaginationOptions(page, limit);
    }
  
    getPaginationOptions(){
      return this.paginationOptions;
    }
  }
  
  export default GetTodosDTO;