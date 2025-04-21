function isVoidValue(value){
    if(value === ''){
        throw new Error("Não pode ser vazio")
    }
}


module.exports = {isVoidValue}