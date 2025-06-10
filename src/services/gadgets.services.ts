import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient()

interface gadget {
    name: string
}

interface Gadget {
    id: string,
    name: string,
    status: "AVAILABLE" | "DECOMMISSIONED" | "DESTROYED" | "DEPLOYED",
    destructOtp: string,
    destroyedAt: Date | null,
    createdAt: Date,
    updatedAt: Date
}

const create = async (data: gadget): Promise<Gadget> => {
    const gadget = await prisma.gadget.create({
        data: {
            name: data.name
        }
    })
    return gadget
}

const getGadgets = async (): Promise<Gadget[]> => {
    const gadgets = await prisma.gadget.findMany()
    return gadgets
}

const updateName = async (id: string, data: gadget): Promise<Gadget> => {
    const gadget = await prisma.gadget.update({
        where: { id },
        data: {
            name: data.name,
            updatedAt: new Date()
        }
    })
    return gadget
}

const updateStatus = async (id: string): Promise<Gadget> => {
    const gadget = await prisma.gadget.update({
        where: { id },
        data: {
            status: "DECOMMISSIONED"
        }
    })
    return gadget
}

const destructor = async (id: string, otp: string): Promise<Gadget | null> => {
    const gadget = await prisma.gadget.update({
        where: { id, destructOtp: otp },
        data: {
            status: "DESTROYED"
        }
    })
    return gadget
}

export { create, getGadgets, updateName, updateStatus, destructor }