const LocalStorageService = (function () {

    let _service

    function _getService () {
        if(!_service){
            _service = this
        }
        return _service
    }
    function _setToken (token) {
        localStorage.setItem('authToken', token)
    }
    function _getToken () {
        const token = localStorage.getItem('authToken')
        return token
    }
    function _resetToken() {
        localStorage.removeItem('authToken')
    }


    return {
        getService: _getService,
        setToken: _setToken,
        getToken: _getToken,
        reset: _resetToken
    }

})()

export default LocalStorageService