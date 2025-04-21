class GeneranteCodeUnique {
    constructor(id,type){
        this.split_id = id.split('-')[1]
        this.type = type
        this.types = {
            'leader':'L',
            'zone':'Z',
            'citizen':'C',
            'service':'S'
        }
    }

    toGenerate(extra=''){
        return `${this.types[this.type]}${extra}${this.split_id}`
    }
}

module.exports = {GeneranteCodeUnique}