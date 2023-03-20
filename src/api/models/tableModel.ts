class Table {

    // properties
    private id: number | null
    private created: Date | null
    private modified: Date | null
    private name: string | null


    constructor(id: number | null, name: string | null, created?: Date | null, modified?: Date | null) {
        if(id == null || name == null) {
            this.id = null
            this.created = null
            this.modified = null
            this.name = null
        } else {
            this.id = id
            this.name = name
            this.created = created
            this.modified = modified
        }
    }

    // getters
    get _id() : number | null {
        return this.id
    }
    get _created() : Date | null {
        return this.created
    }
    get _modified() : Date | null {
        return this.modified
    }
    get _name() : string | null {
        return this.name
    }




    // setters (x = value)
    set _id(x: number | null) {
        this.id = x
    }
    set _name(x : string | null) {
        this.name = x
    }
    set _created(x : Date | null) {
        this.created = x
    }
    set _modified(x : Date | null) {
        this.modified = x
    }

    // methods

}
export { Table }