import { db } from '../config/database'
import { Table } from './tableModel'

class TableTip {

    private _id: number | null
    private _created: Date | null
    private _modified: Date | null
    private _tips: number | null
    private _table: Table | null
    private _service: number | null

    constructor(d : TableTip) {
        if(d == null) {
            this._id = null
            this._created = null
            this._modified = null
            this._tips = null
            this._table = null
            this._service = null
        } else {
            this._id = d.id
            this._created = d.created
            this._modified = d.modified
            this._tips = d.tips
            this._table = d.table
            this._service = d.service
        }
    }

    // getters
    get id() : number | null{
        return this._id
    }
    get created() : Date | null {
        return this._created
    }
    get modified() : Date | null {
        return this._modified
    }
    get tips() : number | null {
        return this._tips
    }
    get table() : Table | null {
        return this._table
    }
    get service() : number | null {
        return this._service
    }


    // setters (x = value)
    set id(x : number | null) {
        this._id = x
    }
    set created(x : Date | null) {
        this._created = x
    }
    set modified(x : Date | null) {
        this._modified = x
    }
    set tips(x : number | null) {
        this._tips = x
    }
    set table(x : Table | null) {
        this._table = x
    }
    set service(x : number | null) {
        this._service = x
    }


    // methods

    static getAllTableTips = async (callback: Function) => {

        db.query('SELECT tip.`tips`,tip.`id_restaurantTable`,`id_service`,tip.`created_at`,tip.`modified_at`, tabl.name FROM tableTips tip JOIN restauranttable tabl ON tip.id_restaurantTable = tabl.id JOIN services s ON tip.id_service = s.id', (err, result) => {
            if(err) {
                callback(err, null, 500)
            } else {
                // on crée un objet table pour chaque table
                 for(let i = 0; i < result.length; i++){ 
                    let table = new Table(result[i].id_restaurantTable, result[i].name);
                    result[i].table = table;
                }
                // ensuite on nettoie l'ojet pour ne pas avoir de doublons
                result.forEach((element: any) => {
                    delete element.id_restaurantTable;
                    delete element.name;
                });
                callback(null, result , 200)
            }
        })

    }

    static getOneTableTip = async (id: number, callback: Function) => {

        db.query('SELECT tip.`tips`,tip.`id_restaurantTable`,`id_service`,tip.`created_at`,tip.`modified_at`, tabl.name FROM tableTips tip JOIN restauranttable tabl ON tip.id_restaurantTable = tabl.id JOIN services s ON tip.id_service = s.id WHERE tip.id = ?', [id], (err, result) => {
            if(err) {
                callback(err, null, 500)
            }
            else if(result.length == 0) {
                callback(new Error("Pourboire introuvable"), null, 404)
            }
            else {
                // on crée un objet table pour chaque table
                 for(let i = 0; i < result.length; i++){ 
                    let table = new Table(result[i].id_restaurantTable, result[i].name);
                    result[i].table = table;
                }
                // ensuite on nettoie l'ojet pour ne pas avoir de doublons
                result.forEach((element: any) => {
                    delete element.id_restaurantTable;
                    delete element.name;
                });
                callback(null, result, 200)
            }
        })

    }


    static createTableTip = async (newTableTip: TableTip, callback: Function) => {
            
            db.query('INSERT INTO tabletips (tips, id_restaurantTable, id_service) VALUES (?, ?, ?)', [newTableTip.tips, newTableTip.table, newTableTip.service], (err: Error, result: TableTip) => {
                if(err) {
                    callback(err, null, 500)
                } else {
                    callback(null, result, 201)
                }
            })
    
        }

    static updateTableTip = async (id: number, updatedTableTip: TableTip, callback: Function) => {
            
            db.query('UPDATE tabletips SET tips = ?, id_restaurantTable = ?, id_service = ? WHERE id = ?', [updatedTableTip.tips, updatedTableTip.table, updatedTableTip.service, id], (err, result) => {
                if(err) {
                    callback(err, null , 500)
                }
                else if(result.affectedRows == 0) {
                    callback(new Error("Ce pourboire n'existe pas"), null, 404)
                }
                else {
                    callback(null, result, 200)
                }
            })
    
        }

    static deleteTableTip = async (id: number, callback: Function) => {

        db.query('DELETE FROM tabletips WHERE id = ?', [id], (err: Error, result) => {
            if(err) {
                callback(err, null, 500)
            } 
            else if(result.affectedRows == 0) {
                callback(new Error("Ce pourboire n'existe pas"), null, 404)
            }
            else {
                callback(null, result, 200)
            }
        })

    }

    // static get sum of ALL tips
    static getSumOfTips = async (callback: Function) => {        
        db.query('SELECT SUM(tips) AS total FROM tabletips', (err, result) => {
            if(err) {
                callback(err, null, 500)
            } else {
                callback(null, result , 200)
            }
        })
    }

    

}
export {TableTip}