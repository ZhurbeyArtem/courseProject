class ApiErrors extends Error{
    constructor(status, message) {
super()
        this.status = status
        this.message = message
    }
    static badRequest(message){
        return new ApiErrors(404,message)
    }
    static internal(message){
        return new ApiErrors(500,message)
    }
    static forbiden(message){
        return new ApiErrors(403,message)  // немає доступа
    }
}

module.exports = ApiErrors