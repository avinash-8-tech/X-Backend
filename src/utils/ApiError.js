const ApiError = (statusCode, message) => {
    const error = new Error(message)
    error.statusCode = statusCode
    error.message = message
    error.success = false
    return error
}

export default ApiError