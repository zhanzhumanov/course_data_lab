import type { Db } from "mongodb"

export class Employee {
	_id: string
	name: string
	position: string
	managerId?: string
	constructor(_id: string, name: string, position: string, managerId?: string) {
		this._id = _id
		this.name = name
		this.position = position
		this.managerId = managerId
	}
}

export interface ManagementEmployee {
	_id: string
	name: string
	position: string
	level: number
}


export async function get_management_chain(
    db: Db,
    employeeId: string
): Promise<ManagementEmployee[]> {
    const result = await db.collection("employees").aggregate([
        {
            $match: {
                _id: employeeId
            }
        },
        {
            $graphLookup: {
                from: "employees",
                startWith: "$managerId",
                connectFromField: "managerId",
                connectToField: "_id",
                as: "managementChain",
                depthField: "level"
            }
        },
        {
            $unwind: "$managementChain"
        },
        {
            $replaceRoot: {
                newRoot: "$managementChain"
            }
        }
    ]).toArray()

    return result as ManagementEmployee[]
}