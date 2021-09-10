class PaginationOptions {
  
    constructor(page = 1, limit = 10) {
      this.page = page;
      this.limit = limit;
    }
  
    limit(){
      return this.limit;
    }
  
    getPage(){
      return this.page;
    }
  
    offset(){
      return (this.page - 1) * this.limit();
    }
  }
  
  export default PaginationOptions;